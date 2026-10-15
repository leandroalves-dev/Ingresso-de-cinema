import { useContext } from "react"

//icons
import { BsTicketPerforated } from "react-icons/bs"

//components
import QuantityButtons from "../../components/QuantityButtons"

//context
import { PaymentContext } from "../../context/PaymentContext"

interface TicketPriceProps{
    maxSeats: string[]
}

const TicketPrices = ({maxSeats}: TicketPriceProps) => {

    const paymentContext = useContext(PaymentContext)
    if(!paymentContext) throw new Error('Erro no Provider')
        
    const {valorInteira, valorMeia, valorMeiaItau, valorMeiaBradesco, valorTaxaInteira, valorTaxaMeia, ticketInteira, ticketMeia, ticketMeiaBradesco, ticketMeiaItau, addPriceInteira, removePriceInteira, addPriceMeia, removePriceMeia, addPriceBradesco, removePriceBradesco, addPriceItau, removePriceItau} = paymentContext

    const numberSeats = maxSeats.length
    const totalSelectedTickets = ticketInteira + ticketMeia + ticketMeiaBradesco + ticketMeiaItau;
    const isMaxSeats = totalSelectedTickets >= numberSeats


    const tickets = [
        {
            name: "Ingresso inteira",
            price: valorInteira,
            tax: valorTaxaInteira,
            quantity: ticketInteira,
            onIncrement: addPriceInteira,
            onDecrement: removePriceInteira
        },
        {
            name: "Ingresso meia",
            price: valorMeia,
            tax: valorTaxaMeia,
            quantity: ticketMeia,
            onIncrement: addPriceMeia,
            onDecrement: removePriceMeia
        },
        {
            name: "Meia Bradesco",
            price: valorMeiaBradesco,
            tax: valorTaxaMeia,
            quantity: ticketMeiaBradesco,
            onIncrement: addPriceBradesco,
            onDecrement: removePriceBradesco
        },
        {
            name: "Meia Itaú",
            price: valorMeiaItau,
            tax: valorTaxaMeia,
            quantity: ticketMeiaItau,
            onIncrement: addPriceItau,
            onDecrement: removePriceItau
        }
    ];

    return (
        <section className="ticket-prices-page text-white" aria-labelledby="ticket-prices-title">
            <header className="ticket-prices-header">
                <p className="ticket-prices-eyebrow">Sua sessão · etapa 2 de 5</p>
                <h1 id="ticket-prices-title">Escolha a forma de pagamento</h1>
                <p>Selecione a quantidade de ingressos para os assentos escolhidos.</p>
            </header>

            <div className="ticket-prices-list">
                {tickets.map((ticket) => (
                    <article key={ticket.name} className="ticket-price-card">
                        <div className="ticket-price-info">
                            <div className="ticket-price-icon" aria-hidden="true">
                                <BsTicketPerforated size={23} />
                            </div>
                            <div>
                                <h2>{ticket.name}</h2>
                                <p>
                                    <span>R$ {ticket.price.toFixed(2)}</span>
                                    <span>Taxa de R$ {ticket.tax.toFixed(2)}</span>
                                </p>
                            </div>
                        </div>
                        <QuantityButtons quantity={ticket.quantity} onIncrement={ticket.onIncrement} onDecrement={ticket.onDecrement} disabled={isMaxSeats} />
                    </article>
                ))}
            </div>
        </section>
    )
}

export default TicketPrices
