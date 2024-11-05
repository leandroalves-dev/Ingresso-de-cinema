import './Resumo.css';
import { BsClock, BsGeoAlt, BsCalendarEvent, BsTrash, BsInfoCircle } from 'react-icons/bs';
import { useLocation, useNavigate  } from 'react-router-dom';
import { useState, useContext } from 'react'; 

//ContextAPi 
import { PaymentContext } from '../../context/PaymentContext';

//components
import Modal from '../../components/Modal/Modal';
import Loading from '../Loading/Loading';

const Resumo = ({onSelectedSeats, onNextStep, onPreviousStep, onStep}) => {

    const { taxaTotal, total, selectedTickets, selectedCombos, resetPaymentData } = useContext(PaymentContext); 

    const location = useLocation(); 
    const { movie, room, time, language, day, month } = location.state; 
    const [showModal, setShowModal] = useState(false); 
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    console.log('movie', movie)
    console.log('room', room)
    console.log('time', time)
    console.log('language', language)
    console.log('day', day)
    console.log('month', month)
    // console.log('selectedTickets', selectedTickets)
    // console.log('selectedCombos', selectedCombos)

    // console.log('taxaTotal', taxaTotal) 
    // console.log('TOTAL A PAGAR', total);

    const handleDelete = () => {
        setShowModal(true);
    }

    const handleConfirmar = () => {
        setShowModal(false);
        setLoading(true);

        resetPaymentData();
        
        setTimeout( () => {
            setLoading(false);
            navigate('/')
        },1000)
    }

    // Exibe mensagem de finalização ao último step
    if (onStep === 5) {
        return (
            <div className="container-resumo finalizado">
                <h2>Pedido finalizado com sucesso!</h2>
                <p>Obrigado por sua compra. Aproveite o filme!</p>
            </div>
        );
    }
    

    return (

        <>
             {loading && <Loading />}

             <div className="container-resumo">
           
                <div className="grid-title">
                    <h2>Resumo do pedido</h2>                
                    <span className="close" onClick={handleDelete}><BsTrash /></span>
                </div>

                <div className="grid-resumo">

                        <div className="grid-description">
                            <div>
                                <div className="image">
                                    <img src={movie.image} alt={movie.title} />
                                </div>
                            </div>
                            
                            <div>
                                <h2>{movie.title}</h2>
                                <div className="item-1">
                                    <span className={`classification ${movie.classification === 'Livre' ? 'idade-livre' : movie.classification === '+12' ? 'idade-12' : movie.classification === '+16' ? 'idade-16' : 'idade-18' }`}>{movie.classification}</span>
                                    <span className={`${language === 'dub' ? 'dub' : 'leg' }`}>{language}</span>
                                    <span>{movie.genre}</span>
                                </div>
                                <div className="item-2">
                                    <span><BsGeoAlt /> {room?.name}</span>
                                    <span><BsCalendarEvent /> {day}/{month}</span>
                                    <span><BsClock /> {time}</span>
                                </div>

                                <div className='item-3'>
                                    <h3>Assentos: {onSelectedSeats?.length > 0 ? onSelectedSeats.length : '0'}</h3>
                                    <ul className='listSeats'>
                                        
                                        {onSelectedSeats.length > 0 && (
                                            onSelectedSeats.map((seat, index) => (
                                                <li key={index} className="seat">{seat}</li> // Adicionando uma classe CSS para estilização, se necessário
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                            
                        </div>

                        <div>
                            {selectedTickets.length > 0 && (
                                <div className="grid-ticket">
                                    <h3>Ingressos</h3>

                                    {selectedTickets.map(ticket => (
                                        <div key={`${ticket.type}-${ticket.quantity}`} className='list-ticket'>
                                            <div>
                                                <span className='qtda'>{ticket.quantity}x</span>
                                                <span>{ticket.type}</span>
                                            </div>
                                            <div>
                                                <span>R$ {(ticket.value * ticket.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                    
                                </div>
                            )}

                            {Object.keys(selectedCombos).length > 0 && (
                                <div className="grid-bomboniere">
                                    <h3>Produtos</h3>
                                    {Object.values(selectedCombos).map(produto => (
                                        <div key={produto.id} className='list-produto'>
                                            <div className='list-information'>
                                                <h4>{produto.quantity}x {produto.title}</h4> 
                                                <span>{produto.description}</span>
                                            </div>
                                            <div>
                                                <span>R$ {(produto.quantity * produto.price).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="grid-paymets">
                            <div>
                                <span>Quantidade de ingressos:</span>
                                <span>{onSelectedSeats.length > 0 ? onSelectedSeats.length : '0'}</span>
                            </div>
                            <div>
                                <span>Valor da taxa: </span>
                                <span>R$ {taxaTotal.toFixed(2)}</span>
                            </div>
                            <div>
                                <span>Total a pagar: </span>
                                <span>R$ {total.toFixed(2)}</span> 
                            </div>   
                        </div>
                </div>

                 {/* Botões de navegação */}
                 <div className='navigation-buttons'>
                    {onStep > 1 && <button onClick={onPreviousStep}>Voltar</button>}
                    {onStep < 5 && <button onClick={onNextStep}>Próximo</button>}
                </div>

                {showModal && (
                    <Modal>
                        <div className='modal-excluir'>
                            <span className='close' onClick={() => setShowModal(false)}>x</span>
                            <BsInfoCircle />
                            <h2>Deseja excluir esse item do seu carrinho?</h2>
                            <div className="btns">
                                <button onClick={handleConfirmar}>Confirmar</button>
                                <button className='btn-cancelar' onClick={() => setShowModal(false)}>Cancelar</button>
                            </div>
                        </div>
                    </Modal>
                )}
               
            </div>
        </>

    )
} 

export default Resumo


