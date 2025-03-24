import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

//Icons
import { BsCalendarEvent, BsClock, BsGeoAlt, BsTrash, BsFillTicketFill } from "react-icons/bs";

//Context 
import { SeatContext } from "../../context/SeatContext";
import { PaymentContext } from "../../context/PaymentContext";
import { MovieContext } from "../../context/MovieContext";

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
    const { selectedMovie } = useContext(MovieContext);

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

        setTimeout( () => {
            setLoading(false)
            navigate('/')
        }, 1000);
    }

    const handleDelete = () => {
        setShowModal(true);
    }

    return(
        <div className="p-5 flex flex-col h-full">

            {loading && <Loading />}

            <div className="flex-1">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-white text-[25px]">Resumo do pedido</h1>
                    <span className="text-[#990000] hover:text-[#dc0606] transition delay-75 text-[20px] cursor-pointer" onClick={handleDelete}><BsTrash /></span>
                </div>

                 <div className="flex md:flex-col lg:flex-row">
                    <div className="mr-5 max-md:mr-5 max-lg:mr-0">
                        <img src={selectedMovie?.movie?.image} alt={selectedMovie?.movie?.title} className="w-60 min-w-[100px] max-md:w-72 max-lg:w-auto h-auto" />
                    </div>
                    <div>
                        <h2 className="text-white text-[18px] mb-4">{selectedMovie?.movie?.title}</h2>
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`p-2 rounded-[3px] text-[12px] text-white ${selectedMovie?.movie?.classification === 'Livre' ? 'bg-green-600' : selectedMovie?.movie?.classification === '+12' ? 'bg-orange-500' : selectedMovie?.movie?.classification === '+16' ? 'bg-blue-300' : 'bg-red-700'}`}>{selectedMovie?.movie?.classification}</span>
                            <span className={`p-2 rounded-[3px] text-[12px] text-white uppercase ${selectedMovie?.language === 'dub' ? 'bg-purple-600' : 'bg-blue-600'}`}>{selectedMovie?.language}</span>
                            <span className="text-white text-[20px]">{selectedMovie?.movie?.genre}</span>
                        </div>
                        <div className="flex justify-between gap-5 text-white text-[12px]">
                            <span className="flex items-center gap-1"><BsGeoAlt /> {selectedMovie?.room?.name}</span>
                            <span className="flex items-center gap-1"><BsCalendarEvent /> {formattedDate}</span>
                            <span className="flex items-center gap-1"><BsClock /> {selectedMovie?.time}</span>
                        </div>
                        {selectedSeats.length > 0 && (
                            <div className="mt-5 border-t-1 border-neutral-900 py-3">
                                <h3 className="text-white flex items-center gap-2 text-[12px]"><BsFillTicketFill size={14} className="mt-0.5" /> Assentos: {selectedSeats.length}</h3>
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {selectedSeats.map( seat => (
                                        <span key={seat} className="bg-green-800 rounded-[3px] text-white text-[8px] p-1 px-1.5 w-8">{seat}</span>
                                    ))}
                                </div>
                            </div>                            
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    {selectedTickets.length > 0 && (
                        <div className="flex flex-col border-b-1 border-neutral-700">
                            <h2 className="text-white my-4 text-[18px]">Ingressos</h2>
                            {selectedTickets.map((ticket, index) => (
                                <div key={index} className="flex justify-between items-center mb-4 text-[14px]">
                                    <div className="flex flex-row items-center">
                                        <span className="bg-[#cb9c21] p-2 px-3 mr-4 rounded-[25px]">{ticket.quantity}x</span>
                                        <span className="text-[#cb9c21]">{ticket.type}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#cb9c21]">R$ {ticket.value.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}  
                    
                    {selectedCombos.length > 0 && (
                        <div className="mt-1 border-b-1 border-neutral-700 pb-6">
                            <h2 className="text-white my-4 text-[18px]">Produtos</h2>
                            {selectedCombos.map(combo => (
                                <div className="flex justify-between mb-2 items-center" key={combo.id}>
                                    <div>
                                        <div>                                
                                            <h3 className="text-[16px] text-[rgb(73,128,73)]"><strong>{combo.quantity}x</strong> {combo.title}</h3>
                                            <p className="text-[#cb9c21] text-[12px]">{combo.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-[#cb9c21] text-[12px]">
                                        <span>R$ {combo.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )} 
                </div>
               
            </div>
                        
            <div className="flex flex-col">
                <div className="flex flex-col gap-2 mt-5 text-white">
                    <div className="flex justify-between items-center">
                        <p>Quantidade de ingressos:</p>
                        <span>{selectedTickets.reduce((total, ticket) => total + ticket.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p>Valor da Taxa:</p>
                        <span>R$ {taxaTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p>Total a pagar:</p>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex justify-between mt-6">
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