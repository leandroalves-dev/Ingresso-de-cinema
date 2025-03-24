import { useContext } from "react"

//Context
import { PaymentContext } from "../../context/PaymentContext"
import { MovieContext } from "../../context/MovieContext";
import { SeatContext } from "../../context/SeatContext";

const PrintTickets = () => {

    const paymentContext = useContext(PaymentContext);

    if(!paymentContext){
        throw new Error('Erro no contexto')
    }
    const { selectedMovie } = useContext(MovieContext);
    const { selectedSeats } = useContext(SeatContext);
    const { total, taxaTotal, selectedTickets, selectedCombos } = paymentContext;
  
    console.log('COMBOS SELECIONADOS ->', selectedCombos);
    console.log('MOVIE CONTEXT', selectedMovie)

    //Formata a data
    const date = selectedMovie?.selectedDate || new Date().toISOString().split('T')[0]; 
    const [, month, day] = date.split("-");
    const formattedDate = `${day}/${month}`;

    return (
        <div className="p-5 text-white">
            <h1 className="text-[26px] font-bold mb-5">Seu ingresso foi gerado com sucesso</h1>
       
            <div className="max-w-[450px] mt-18 bg-neutral-900 mx-auto border-1 border-neutral-800">
                <div className="bg-green-800 p-3 text-center text-[24px]">
                    <h3>CineSphere</h3>
                </div>
                <h1 className="text-white text-[26px] p-4 font-bold py-5 text-center leading-8">
                    {selectedMovie?.movie?.title}
                    <span className="bg-white ml-4 py-1 px-3 rounded-[3px] text-[14px] text-neutral-700 font-normal">{selectedMovie?.language}</span>
                </h1>

                <div className="p-4">
                    <h2 className="text-green-800 text-[20px] mb-3">Ingressos</h2>
                    <div className="flex items-center text-[14px] gap-2 mb-2">
                        <span>Sala:</span>
                        <p className=" text-neutral-500">{selectedMovie?.room?.name}</p>
                    </div>
                    <div className="flex items-center text-[14px] gap-2 mb-2">
                        <span>Assento:</span>
                        {selectedSeats.map((seat, index) => (
                            <p key={index} className=" text-neutral-500">{seat}</p>
                        ))}
                    </div>
                    <div className="flex items-center text-[14px] gap-2 mb-2">
                        <span>Data do filme:</span>
                        <p className=" text-neutral-500">{formattedDate} às {selectedMovie?.time}</p>
                    </div>
                    <div className="flex flex-col text-[14px] gap-2 mb-2">
                        <span>Tipo de Ingresso:</span>
                        <div className="flex flex-col">
                            {selectedTickets.map((ticket, index) => (
                                <div key={index} className="text-[14px] text-neutral-500">
                                   <p>{index + 1} - {ticket.type} ({ticket.value.toFixed(2)})</p> 
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center text-[14px] gap-2 mb-2">
                        <span>Quantidade: </span>
                        <p className=" text-neutral-500">{selectedSeats.length}</p>
                    </div>
                </div>

                {selectedCombos.length > 0 && ( 
                    <div className="px-4">
                        <h2 className="text-green-800 text-[20px] mb-3">Produtos</h2>
                        {selectedCombos.map(combo => (
                            <div key={combo.id} className="flex items-center justify-between">
                                <div className="flex gap-2 mb-2 text-neutral-500">
                                    <span className="border-1 border-neutral-800 p-2 px-4">{combo.quantity}</span>
                                    <div>
                                        <h3 className="text-[12px]">{combo.title}</h3>
                                        <p className="text-[10px]">{combo.description}</p>
                                    </div>
                                </div>
                                <div className="text-[12px] text-neutral-500">
                                    <p>R$ {combo.price.toFixed(2)}</p>
                                </div>
    
                            </div>
                        ))}
                    </div>
                )}

                <div className="p-4">
                    <h2 className="text-green-800 text-[20px] mb-3">Total a pagar</h2>
                    <div className="flex items-center justify-between gap-2">
                        <span>Total de taxas:</span>
                        <p>R$ {taxaTotal.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <span>Preço final:</span>
                        <p>R$ {total.toFixed(2)}</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mb-8">
                    <span className="text-neutral-500 text-[14px] mb-1">NO 09097787266</span>
                    <img src={'barra.jpg'} alt='' className="w-60" />
                </div>
            </div>
        </div>
    )
}

export default PrintTickets
