import './Seats.css';
import { BsBan, BsCircleFill, BsPersonFillSlash, BsArrows, BsPersonWheelchair, BsInfoCircle } from 'react-icons/bs';
import { useState, useContext } from 'react';

//ContextAPi 
import { PaymentContext } from '../../context/PaymentContext';

//componets
import Resumo from '../../components/Resumo/Resumo';
import Modal from '../../components/Modal/Modal';
//pages
import Tickets from '../Tickets/Tickets';
import Bomboniere from '../Bomboniere/Bomboniere';
import Payments from '../Payments/Payments';
import PrintTickets from '../PrintTickets/PrintTickets';

const Seats = () => {

    const { totalSeats } = useContext(PaymentContext); 
    const [showModal, setShowModal] = useState(false); 

    // Definindo as filas e o número de assentos por fila
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; // 10 linhas
    const seatsPerRow = 18; // Total de assentos por fila (combinação de esquerda, centro e direita)

    // Estado para assentos selecionados
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [step, setStep] = useState(1); // Etapa inicial

    // Função para alternar seleção/desseleção de assentos
    const toggleSeat = (seat) => {
        setSelectedSeats(
            selectedSeats.includes(seat)
                ? selectedSeats.filter(s => s !== seat)
                : [...selectedSeats, seat]
        );
    };

    const handleNextStep = () => { 


        if (step === 1 && selectedSeats.length === 0) {
            setShowModal(true); // Mostra o modal para informar o usuário
            return; // Impede o avanço para o próximo step
        }
        
        if (step === 2) {
            // Validação: se o input de ingressos for menor que os assentos selecionados
            if (totalSeats < selectedSeats.length) {
                setShowModal(true); 
                return   
            }
        }

        if (step < 5) setStep(step + 1); // Limite até a última etapa
    };

    const handlePreviousStep = () => {
        if (step > 1) setStep(step - 1); // Voltar etapas
    };

    const progressPercentage = (step / 5) * 100;

    return (
        <div className='container'>

            {/* Barra de progresso */}
            <div className='progress-bar'>
                <div className='progress-bar-fill' style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <div className='groupContainer'>

                {step === 1 && (
                    <div className='container-seats'>
                        {rows.map(row => (
                            <div key={row} className='grid-seats'>
                                <span className='rows-seats right'>{row}</span>
                                {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                                    const seatNumber = `${row}-${seatIndex + 1}`; // Gera o assento com letra e número

                                    // Condição para adicionar assentos vazios após a poltrona 3 e 13
                                    const isEmptySeat = (seatIndex === 3 || seatIndex === 13);

                                    // Condição para assentos reservados para cadeirantes
                                    const isReservedForWheelchair = (row === 'J' && (seatIndex >= 4 && seatIndex <= 6 || seatIndex >= 11 && seatIndex <= 13)); 

                                    // Condição para assentos reservados para obesos
                                    const isReservedForObese = (row === 'J' && (seatIndex === 0 || seatIndex === 3 || seatIndex === 14 || seatIndex === 17)); 

                                    return (
                                        <>
                                            <button className={`btn-seats ${selectedSeats.includes(seatNumber) ? 'active' : ''}`} key={seatNumber} onClick={() => toggleSeat(seatNumber)}>
                                            {isReservedForWheelchair ? (
                                                <BsPersonWheelchair />
                                            ) : isReservedForObese ? (
                                                <BsArrows />
                                            ) : (                                          
                                                seatNumber.replace(/[^0-9]/g, '')
                                            )}
                                            
                                            </button>
                                            {isEmptySeat && (
                                                <button className="btn-seats empty-seat" disabled>
                                                    {/* Botão vazio visual */}
                                                </button>
                                            )}
                                        </>
                                    );
                                })}
                                <span className='rows-seats left'>{row}</span>
                            </div>
                        ))}
                        <div className="screen">TELA</div>

                        <div className="legend">
                            <h2>Legenda</h2>
                            <ul>
                                <li className='disponivel'><BsCircleFill /> Disponível</li>
                                <li className='selecionado'><BsCircleFill /> Selecionado</li>
                                <li><BsPersonFillSlash /> Ocupado</li>
                                <li><BsBan /> Bloqueado</li>
                                <li><BsPersonWheelchair /> Cadeirante</li>
                                <li><BsArrows /> Obeso</li>
                            </ul>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className='container-seats'>
                        <Tickets maxSeats={selectedSeats} />
                    </div>
                )}

                {step === 3 && (
                    <div className='container-seats'>
                        <Bomboniere />
                    </div>
                )}

                {step === 4 && (
                    <div className='container-seats'>
                        <Payments  />
                    </div>
                )}

                {step === 5 && (
                    <div className='container-seats'>
                        <PrintTickets onSelectedSeats={selectedSeats} />
                    </div>
                )}

                <Resumo onSelectedSeats={selectedSeats} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} onStep={step} />

                {showModal && (
                    <Modal>
                         <div className='modal-ingressos'>
                            <span className='close' onClick={() => setShowModal(false)}>x</span>
                            <BsInfoCircle />
                            <h2>Por favor, corrija a quantidade de ingressos</h2>
                            <p>Você selecionou <strong>{totalSeats}</strong> ingressos</p>
                            <div className="btns">
                                <button className='btn-cancelar' onClick={() => setShowModal(false)}>Ok</button>
                            </div>
                        </div>
                    </Modal>
                )}

            </div>
        </div>
    );
}

export default Seats;
 