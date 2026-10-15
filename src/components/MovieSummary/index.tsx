import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

//Icons
import { BsCalendarEvent, BsClock, BsGeoAlt, BsTrash, BsFillTicketFill } from "react-icons/bs";

//Context 
import { SeatContext } from "../../context/SeatContext";
import { PaymentContext } from "../../context/PaymentContext";
import { MovieContext } from "../../context/MovieContext";
import { clearCheckoutDraft } from "../../utils/checkoutStorage";

//components
import Loading from "../Loading";
import Modal from "../Modal";

interface MovieSummaryProps {
    nextStep: () => void;  
    prevStep: () => void;  
    onStep: number;
}

const MovieSummary = ({ nextStep, prevStep, onStep }: MovieSummaryProps) => {

    const paymentContext = useContext(PaymentContext)
    if(!paymentContext) throw new Error('Erro no Provider');
    const {selectedTickets, total, taxaTotal, resetPayment, selectedCombos} = paymentContext;
   
    const {selectedSeats, resetSeat} = useContext(SeatContext);
    const { selectedMovie, resetMovieSelection } = useContext(MovieContext);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    console.log('ASSENTO SELECIONADO', selectedSeats)
    console.log('INFORMAÇÃO DO FILME SELECIONADO ->', selectedMovie)

    //Formata a data
    const date = selectedMovie?.selectedDate || new Date().toISOString().split('T')[0]; 
    const [, month, day] = date.split("-");
    const formattedDate = `${day}/${month}`;

    const handleConfirmar = () => {
        setShowModal(false);
        setLoading(true);

        resetPayment();
        resetSeat();
        resetMovieSelection();
        clearCheckoutDraft();

        setTimeout( () => {
            setLoading(false)
            navigate('/')
        }, 1000);
    }

    const handleDelete = () => {
        setShowModal(true);
    }

    return(
        <div className="order-summary-panel p-5 flex flex-col h-full">

            {loading && <Loading />}

            <div className="flex-1">
                <div className="order-summary-header flex justify-between items-center mb-5">
                    <div>
                        <p className="order-summary-eyebrow">Sua sessão</p>
                        <h1 className="text-white text-[25px]">Resumo do pedido</h1>
                    </div>
                    <button type="button" className="order-summary-clear" onClick={handleDelete} aria-label="Excluir itens do carrinho"><BsTrash /></button>
                </div>

                 <div className="order-summary-movie flex md:flex-col lg:flex-row">
                    <div className="order-summary-poster mr-5 max-md:mr-5 max-lg:mr-0">
                        <img src={selectedMovie?.movie?.image} alt={selectedMovie?.movie?.title} className="w-60 min-w-[100px] max-md:w-72 max-lg:w-auto h-auto" />
                    </div>
                    <div className="order-summary-movie-info">
                        <h2 className="order-summary-movie-title text-white text-[18px] mb-4">{selectedMovie?.movie?.title}</h2>
                        <div className="order-summary-tags flex items-center gap-3 mb-4">
                            <span className={`order-summary-chip order-summary-rating p-2 rounded-[3px] text-[12px] text-white ${selectedMovie?.movie?.classification === 'Livre' ? 'bg-green-600' : selectedMovie?.movie?.classification === '+12' ? 'bg-orange-500' : selectedMovie?.movie?.classification === '+16' ? 'bg-blue-300' : 'bg-red-700'}`}>{selectedMovie?.movie?.classification}</span>
                            <span className={`order-summary-chip order-summary-language p-2 rounded-[3px] text-[12px] text-white uppercase ${selectedMovie?.language === 'dub' ? 'bg-purple-600' : 'bg-blue-600'}`}>{selectedMovie?.language}</span>
                            <span className="order-summary-genre text-white text-[20px]">{selectedMovie?.movie?.genre}</span>
                        </div>
                        <div className="order-summary-session-meta flex justify-between gap-5 text-white text-[12px]">
                            <span><BsGeoAlt /> {selectedMovie?.room?.name}</span>
                            <span><BsCalendarEvent /> {formattedDate}</span>
                            <span><BsClock /> {selectedMovie?.time}</span>
                        </div>
                        {selectedSeats.length > 0 && (
                            <div className="order-summary-seats mt-5 border-t-1 border-neutral-900 py-3">
                                <h3 className="text-white flex items-center gap-2 text-[12px]"><BsFillTicketFill size={14} className="mt-0.5" /> Assentos: {selectedSeats.length}</h3>
                                <div className="order-summary-seat-list flex flex-wrap gap-1 mt-3">
                                    {selectedSeats.map( seat => (
                                        <span key={seat} className="bg-green-800 rounded-[3px] text-white text-[8px] p-1 px-1.5 w-8">{seat}</span>
                                    ))}
                                </div>
                            </div>                            
                        )}
                    </div>
                </div>

                <div className="order-summary-details mt-6">
                    {selectedTickets.length > 0 && (
                        <div className="order-summary-section flex flex-col border-b-1 border-neutral-700">
                            <h2 className="text-white my-4 text-[18px]">Ingressos</h2>
                            {selectedTickets.map((ticket, index) => (
                                <div key={index} className="order-summary-item-row flex justify-between items-center mb-4 text-[14px]">
                                    <div className="flex flex-row items-center">
                                        <span className="order-summary-quantity bg-[#cb9c21] p-2 px-3 mr-4 rounded-[25px]">{ticket.quantity}x</span>
                                        <span className="order-summary-item-label text-[#cb9c21]">{ticket.type}</span>
                                    </div>
                                    <div>
                                        <span className="order-summary-item-price text-[#cb9c21]">R$ {ticket.value.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}  
                    
                    {selectedCombos.length > 0 && (
                        <div className="order-summary-section mt-1 border-b-1 border-neutral-700 pb-6">
                            <h2 className="text-white my-4 text-[18px]">Produtos</h2>
                            {selectedCombos.map(combo => (
                                <div className="order-summary-item-row flex justify-between mb-2 items-center" key={combo.id}>
                                    <div>
                                        <div>                                
                                            <h3 className="order-summary-combo-title text-[16px] text-[rgb(73,128,73)]"><strong>{combo.quantity}x</strong> {combo.title}</h3>
                                            <p className="order-summary-combo-description text-[#cb9c21] text-[12px]">{combo.description}</p>
                                        </div>
                                    </div>
                                    <div className="order-summary-item-price text-[#cb9c21] text-[12px]">
                                        <span>R$ {combo.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )} 
                </div>
               
            </div>
                        
            <div className="order-summary-footer flex flex-col">
                <div className="order-summary-totals flex flex-col gap-2 mt-5 text-white">
                    <div className="order-summary-total-row flex justify-between items-center">
                        <p>Quantidade de ingressos:</p>
                        <span>{selectedTickets.reduce((total, ticket) => total + ticket.quantity, 0)}</span>
                    </div>
                    <div className="order-summary-total-row flex justify-between items-center">
                        <p>Valor da Taxa:</p>
                        <span>R$ {taxaTotal.toFixed(2)}</span>
                    </div>
                    <div className="order-summary-total-row order-summary-total-highlight flex justify-between items-center">
                        <p>Total a pagar:</p>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>
                </div>
                <div className="order-summary-actions flex justify-between mt-6">
                    {onStep > 1 && <button onClick={prevStep} className="bg-neutral-800 hover:opacity-70 border-1 border-neutral-700 py-2 px-4 rounded-[3px] text-white cursor-pointer">Voltar</button>}
                    {onStep < 5 && <button onClick={nextStep} className="bg-neutral-800 hover:opacity-70 border-1 border-neutral-700 py-2 px-4 rounded-[3px] text-white cursor-pointer">Próximo</button>}
                </div>
            </div>

            {showModal && (
                <Modal title="Opss">
                    <h2>Deseja excluir esse item do seu carrinho?</h2>
                    <div className="flex justify-between items-center mt-4 gap-2">
                        <button onClick={handleConfirmar} className="bg-green-900 w-full p-1.5 cursor-pointer hover:opacity-80 transition delay-100">Confirmar</button>
                        <button onClick={() => setShowModal(false)} className="bg-neutral-950 w-full p-1.5 cursor-pointer hover:opacity-80 transition delay-100">Cancelar</button>
                    </div>
                </Modal>
            )}

        </div>
    )
}

export default MovieSummary
