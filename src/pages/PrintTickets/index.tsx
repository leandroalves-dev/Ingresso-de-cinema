import { useContext, useEffect } from "react";

import Logo from "../../assets/logo.png";
import { PaymentContext } from "../../context/PaymentContext";
import { MovieContext } from "../../context/MovieContext";
import { SeatContext } from "../../context/SeatContext";

const PrintTickets = () => {
    const paymentContext = useContext(PaymentContext);

    if (!paymentContext) {
        throw new Error("Erro no contexto");
    }

    const { selectedMovie } = useContext(MovieContext);
    const { selectedSeats } = useContext(SeatContext);
    const { total, taxaTotal, selectedTickets, selectedCombos } = paymentContext;

    console.log("COMBOS SELECIONADOS ->", selectedCombos);
    console.log("MOVIE CONTEXT", selectedMovie);

    const date = selectedMovie?.selectedDate || new Date().toISOString().split("T")[0];
    const [, month, day] = date.split("-");
    const formattedDate = `${day}/${month}`;

    useEffect(() => {
        localStorage.removeItem("step");
    }, []);

    return (
        <div className="ticket-success-page p-5 text-white">
            <div className="ticket-success-heading">
                <p className="ticket-success-eyebrow">Compra concluída</p>
                <h1>Seu ingresso foi gerado com sucesso</h1>
                <p>Confira os detalhes da sua sessão e apresente o código no cinema.</p>
            </div>

            <div className="ticket-receipt max-w-[450px] mx-auto">
                <div className="ticket-receipt-header">
                    <img src={Logo} alt="CineSphere" className="ticket-receipt-logo" />
                    <span className="ticket-receipt-status">CONFIRMADO</span>
                </div>

                <div className="ticket-receipt-body">
                    <h1 className="ticket-receipt-movie-title text-white text-[26px] p-4 font-bold py-5 text-center leading-8">
                        {selectedMovie?.movie?.title}
                        <span className="ticket-receipt-language bg-white ml-4 py-1 px-3 rounded-[3px] text-[14px] text-neutral-700 font-normal">{selectedMovie?.language}</span>
                    </h1>

                    <div className="ticket-receipt-section p-4">
                        <h2>Ingressos</h2>
                        <div className="ticket-detail-row flex items-center text-[14px] gap-2 mb-2">
                            <span>Sala:</span>
                            <p>{selectedMovie?.room?.name}</p>
                        </div>
                        <div className="ticket-detail-row flex items-center text-[14px] gap-2 mb-2">
                            <span>Assento:</span>
                            {selectedSeats.map((seat, index) => <p key={index}>{seat}</p>)}
                        </div>
                        <div className="ticket-detail-row flex items-center text-[14px] gap-2 mb-2">
                            <span>Data do filme:</span>
                            <p>{formattedDate} às {selectedMovie?.time}</p>
                        </div>
                        <div className="ticket-detail-row ticket-ticket-types flex flex-col text-[14px] gap-2 mb-2">
                            <span>Tipo de ingresso:</span>
                            <div className="ticket-item-list flex flex-col">
                                {selectedTickets.map((ticket, index) => (
                                    <div key={index}>
                                        <p>{index + 1} - {ticket.type} ({ticket.value.toFixed(2)})</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="ticket-detail-row flex items-center text-[14px] gap-2 mb-2">
                            <span>Quantidade:</span>
                            <p>{selectedSeats.length}</p>
                        </div>
                    </div>

                    {selectedCombos.length > 0 && (
                        <div className="ticket-receipt-section ticket-products px-4">
                            <h2>Produtos</h2>
                            {selectedCombos.map((combo) => (
                                <div key={combo.id} className="ticket-product-row flex items-center justify-between">
                                    <div className="flex gap-2 mb-2">
                                        <span className="ticket-product-quantity border-1 border-neutral-800 p-2 px-4">{combo.quantity}</span>
                                        <div>
                                            <h3>{combo.title}</h3>
                                            <p>{combo.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>R$ {combo.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="ticket-receipt-total p-4">
                        <h2>Total a pagar</h2>
                        <div className="ticket-detail-row flex items-center justify-between gap-2">
                            <span>Total de taxas:</span>
                            <p>R$ {taxaTotal.toFixed(2)}</p>
                        </div>
                        <div className="ticket-detail-row flex items-center justify-between gap-2">
                            <span>Preço final:</span>
                            <p>R$ {total.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="ticket-barcode flex flex-col justify-center items-center mb-8">
                        <span>NO 09097787266</span>
                        <img src="barra.jpg" alt="Código do ingresso" className="w-60" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintTickets;
