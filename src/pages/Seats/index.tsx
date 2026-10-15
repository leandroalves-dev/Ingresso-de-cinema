
import { useState, useContext, useEffect } from "react"
import { CheckCircle2, CircleAlert, X } from "lucide-react"

//components
import Container from '../../components/Container'
import MovieSummary from "../../components/MovieSummary"
import SelectSeats from "../../components/SelectSeats"
import Modal from "../../components/Modal"

//context
import { SeatContext } from "../../context/SeatContext"
import { PaymentContext } from "../../context/PaymentContext"

//pages
import TicketPrices from "../TicketPrices"
import Combos from "../Combos"
import TypesPayments from "../TypesPayments"
import PrintTickets from "../PrintTickets"

//hook
import useAuth from '../../hooks/useAuth'

const Seats = () => {
    const paymentContext = useContext(PaymentContext)
    if(!paymentContext) throw new Error('Erro no provider')
    const {totalSeats} = paymentContext;
    const {selectedSeats} = useContext(SeatContext);
    
    const [step, setStep] = useState(1); 
    const [showModal, setShowModal] = useState(false); 
    const [modalType, setModalType] = useState("");

    const {user} = useAuth();

    const progressPercentage = (step / 5) * 100;

    // Recupera o step armazenado no localStorage, se existir
    useEffect(() => {
        const storedStep = localStorage.getItem("step");
        if (storedStep) {
            setStep(Number(storedStep)); // Converte para número e define o estado
        }
    }, []);

    // Atualiza o localStorage sempre que o step mudar
    useEffect(() => {
        localStorage.setItem("step", step.toString());
    }, [step]);

    // Função para validar se o usuário está logado
    const isUserLoggedIn = () => {
        const storedUser = localStorage.getItem("User");
        return storedUser ? JSON.parse(storedUser) : null;
    };

    const handleNextStep = () => {
       
        if(step === 1 && selectedSeats.length === 0){

            setModalType('seats')
            setShowModal(true);
            return;
        }
       
        if(step === 2){

            if(totalSeats < selectedSeats.length){
                setModalType('tickets')
                setShowModal(true);
                return;
            }
        }
        
        if (step === 3 && !user && !isUserLoggedIn()) {
            setModalType('login');
            setShowModal(true);
            return
        }
       
        if (step === 3 && (user || isUserLoggedIn())) {
            setStep(4);
            return;
        }

        if (step < 5) setStep(step + 1); 
    }

    const handlePreviousStep = () => {
        if (step > 1) setStep(step - 1); 
    }


    useEffect(() => {
        if (step < 5) {
            localStorage.setItem("step", step.toString());
        } else {
            localStorage.removeItem("step"); 
        }
    }, [step]);

    return (
        <Container>

            {/* Barra de progresso */}
            <div
                className="checkout-progress"
                role="progressbar"
                aria-label="Progresso da compra"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercentage}
            >
                <div className="checkout-progress-fill" style={{ width: `${progressPercentage}%` }} />
            </div>

            <div className="flex w-full flex-col md:flex-row gap-12 mb-5">
                <div className="md:w-3/5 bg-[#141414]">

                    {step === 1 && (
                        <SelectSeats  />
                    )}
                    {step === 2 && (
                        <TicketPrices maxSeats={selectedSeats} />
                    )}
                    {step === 3 && (
                        <Combos />
                    )}
                    {step === 4 && (
                       <TypesPayments />
                    )}
                    {step === 5 && (
                        <PrintTickets />
                    )}

                </div>
                
                <div className="md:w-2/5 bg-neutral-800">
                    {step >= 5 ? (
                        <div className="order-complete-panel flex flex-col justify-center text-center text-white items-center w-full h-full max-md:h-52">
                            <div className="order-complete-icon"><CheckCircle2 size={34} /></div>
                            <p className="order-complete-eyebrow">Compra confirmada</p>
                            <h2 className="text-2xl md:text-2xl lg:text-3xl px-6">Pedido finalizado com sucesso!</h2>
                            <p className="text-base md:text-lg lg:text-xl px-6">Obrigado por sua compra. Aproveite o filme!</p>
                        </div>
                    ) : (
                        <MovieSummary nextStep={handleNextStep} prevStep={handlePreviousStep} onStep={step} />
                    )}
                </div>
            </div>

            {showModal && modalType === "seats" && (
                <Modal title='Opsss!' className="seat-feedback-modal">
                    <button type="button" className="seat-feedback-close absolute right-5 top-5" onClick={() => setShowModal(false)} aria-label="Fechar aviso"><X size={18} /></button>
                    <div className="seat-feedback-message">
                        <CircleAlert className="seat-feedback-icon" size={22} aria-hidden="true" />
                        <p>Por favor, selecione pelo menos um assento.</p>
                    </div>
                </Modal>
            )}

            {showModal && modalType === "tickets" && (
                <Modal title='Opsss!' className="seat-feedback-modal">
                    <button type="button" className="seat-feedback-close absolute right-5 top-5" onClick={() => setShowModal(false)} aria-label="Fechar aviso"><X size={18} /></button>
                    <div className="seat-feedback-message">
                        <CircleAlert className="seat-feedback-icon" size={22} aria-hidden="true" />
                        <p>A quantidade de ingressos não corresponde ao número de assentos selecionados.</p>
                    </div>
                </Modal>
            )}

            {showModal && modalType === "login" && (
                <Modal title='Opsss!' className="seat-feedback-modal">
                    <button type="button" className="seat-feedback-close absolute right-5 top-5" onClick={() => setShowModal(false)} aria-label="Fechar aviso"><X size={18} /></button>
                    <div className="seat-feedback-message">
                        <CircleAlert className="seat-feedback-icon" size={22} aria-hidden="true" />
                        <p>Você precisa estar logado para continuar.</p>
                    </div>
                </Modal>
            )}

            
        </Container>
    )
}

export default Seats
