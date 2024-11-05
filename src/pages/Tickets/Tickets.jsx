import './Tickets.css';
import { useContext } from 'react';

//icons 
import { BsTicketPerforated } from 'react-icons/bs';

//ContextAPi
import { PaymentContext } from '../../context/PaymentContext';

//components
import QuantityButtons from '../../components/QuantityButtons/QuantityButtons';

const Tickets = ({maxSeats}) => {

    const { ticketInteira, ticketMeia, inteira, meia, ticketMeiaBradesco, ticketMeiaItau, meiaBradesco, meiaItau, addPriceMeiaBradesco, removePriceBradesco, addPriceMeiaItau, removePriceItau, addPriceInteira, removePriceInteira, addPriceMeia, removePriceMeia } = useContext(PaymentContext); // Acessa os dados do contexto

    const numberSeats = maxSeats.length;

    const totalSelectedTickets = ticketInteira + ticketMeia + ticketMeiaBradesco + ticketMeiaItau;
    const isMaxSeatsReached = totalSelectedTickets >= numberSeats;

    return (
        <>
            <div className='container-tickets'>
                <h2>Escolha a forma de pagamento</h2>

                <div className='tickets'>
                    <div>
                        <div className="icons">
                            <BsTicketPerforated />
                        </div>
                        <div className="ticketPrice">
                            <p>Ingresso inteira</p>
                            <span>R$ {inteira.toFixed(2)}</span>                        
                        </div>
                    </div>
                    <QuantityButtons quantity={ticketInteira} onIncrement={addPriceInteira} onDecrement={removePriceInteira} disabled={isMaxSeatsReached} />
                </div>

                <div className='tickets'> 
                    <div> 
                        <div className="icons">
                            <BsTicketPerforated />
                        </div>
                        <div className="ticketPrice">
                            <p>Ingresso meia</p>
                            <span>R$ {meia.toFixed(2)}</span>                       
                        </div>
                    </div>
                    <QuantityButtons quantity={ticketMeia} onIncrement={addPriceMeia} onDecrement={removePriceMeia} disabled={isMaxSeatsReached} />
                </div>

                <div className='tickets'> 
                    <div> 
                        <div className="icons">
                            <BsTicketPerforated />
                        </div>
                        <div className="ticketPrice">
                            <p>Meia Bradesco</p>
                            <span>R$ {meiaBradesco.toFixed(2)}</span>                       
                        </div>
                    </div>
                    <QuantityButtons quantity={ticketMeiaBradesco} onIncrement={addPriceMeiaBradesco} onDecrement={removePriceBradesco} disabled={isMaxSeatsReached} />                    
                </div>

                <div className='tickets'> 
                    <div> 
                        <div className="icons">
                            <BsTicketPerforated />
                        </div>
                        <div className="ticketPrice">
                            <p>Meia Itaú</p>
                            <span>R$ {meiaItau.toFixed(2)}</span>                       
                        </div>
                    </div>
                    <QuantityButtons quantity={ticketMeiaItau} onIncrement={addPriceMeiaItau} onDecrement={removePriceItau} disabled={isMaxSeatsReached} />
                </div>
                
            </div>
        </>
    )
}

export default Tickets