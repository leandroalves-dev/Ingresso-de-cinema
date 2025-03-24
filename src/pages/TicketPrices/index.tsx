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
        <div className="p-5 text-white">
            <h1 className="text-[26px] font-bold mb-5">Escolha a forma de pagamento</h1>

            <div className="flex flex-col gap-12">

                {tickets.map((ticket, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div><BsTicketPerforated size={28} color="#990000" /></div>
                            <div>
                                <p>{ticket.name}</p>
                                <span className="text-[12px]">R$ {ticket.price.toFixed(2)} + taxa de R$ {ticket.tax.toFixed(2)}</span>
                            </div>
                        </div>
                        <QuantityButtons quantity={ticket.quantity} onIncrement={ticket.onIncrement} onDecrement={ticket.onDecrement} disabled={isMaxSeats} />
                    </div>
                ))}

                
            </div>

        </div>
    )
}

export default TicketPrices
