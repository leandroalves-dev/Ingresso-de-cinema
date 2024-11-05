import './PrintTickets.css';
import { BsPrinter } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import barra from '/images/barra.jpg';      

//ContextAPi 
import { PaymentContext } from '../../context/PaymentContext';

const PrintTickets = ({onSelectedSeats}) => {
    const location = useLocation(); 
    const { movie, room, time, language, day, month } = location.state; 
    const { taxaTotal, total, selectedTickets, selectedCombos } = useContext(PaymentContext);

     // Função para imprimir diretamente
     const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <h1>Seu ingresso foi gerado com sucesso</h1>

            
            <div className='print'>
                <h2>CineSphere</h2>
                <div className="details">
                    <h1>
                        {movie.title}
                        <span>{language}</span>
                    </h1>  
                    <h4>Ingressos</h4>
                    <span><strong>Sala: </strong>{room.name}</span>
                    <span>
                        <strong>Assento: </strong>
                        {onSelectedSeats.length > 0 && (
                            onSelectedSeats.map((seat, index) => (
                                <span key={index} className="seat">{seat}</span> 
                            ))
                        )}
                    </span>
                    <span><strong>Data do Filme: </strong>{day}/{month} às {time} </span>
                    <div className='type'>
                        <strong>Tipo de Ingresso: </strong>
                    
                        <span>
                            {selectedTickets.map((type, index) => (
                                <span key={index}>
                                    {type.type} ({type.value.toFixed(2)})
                                    {index < selectedTickets.length - 1 && ", "}
                                </span>
                            ))}
                        </span>
                        
                    </div>
                    <span><strong>Quantidade: </strong>{selectedTickets.length}</span>
                    <h4>Produtos</h4>
                    {Object.values(selectedCombos).map(items => (
                        <div className='list-product' key={items.id}>
                            <div className='first'>
                                <span>
                                    <p>{items.quantity}</p>
                                </span>
                                <div>
                                    <span>{items.title}</span>
                                    <span className='desc'>{items.description}</span>
                                </div>
                            </div>
                            <div>
                                <span>{items.price.toFixed(2)}</span>
                            </div>
                        </div>  
                    ))}
                    <h4>Total a pagar</h4>
                    <span><strong>Total de taxas: </strong>R$ {taxaTotal.toFixed(2)}</span>
                    <span><strong>Preço final: </strong>R$ {total.toFixed(2)}</span>
                
                <div className="codigoBarra">
                    <span>NO 09097787266</span>
                    <img src={barra} alt='' />
                </div>
                </div>
            </div>

            <button onClick={handlePrint} className="print-button"><BsPrinter /></button>
        </>
    )
}

export default PrintTickets