import { useContext } from "react";

import { BsArrows, BsBan, BsCircleFill, BsPersonFillSlash, BsPersonWheelchair } from "react-icons/bs";

import { SeatContext } from "../../context/SeatContext";

const SelectSeats = () => {
    const seatContext = useContext(SeatContext);

    if (!seatContext) {
        throw new Error("Erro no Provider");
    }

    const { selectedSeats, toggleSeat } = seatContext;
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const seatsPerRow = 18;

    return (
        <div className="seat-selection-page relative p-5">
            <header className="seat-selection-header">
                <p className="seat-selection-eyebrow">Mapa da sala</p>
                <h1>Escolha seus assentos</h1>
                <p>Selecione os lugares para continuar com a sua experiência CineSphere.</p>
            </header>

            <div className="seat-map-panel">
                <div className="seat-map-label">Frente da sala</div>
                <div className="seat-map" aria-label="Mapa de assentos">
                    {rows.map((row) => (
                        <div key={row} className="seat-row flex items-center justify-center mb-2.5">
                            <span className="seat-row-label seat-row-label-left">{row}</span>
                            {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                                const seatNumber = `${row}-${seatIndex + 1}`;
                                const isEmptySeat = seatIndex === 3 || seatIndex === 13;
                                const isReservedForWheelchair = row === "J" && ((seatIndex >= 4 && seatIndex <= 6) || (seatIndex >= 11 && seatIndex <= 13));
                                const isReservedForObese = row === "J" && (seatIndex === 0 || seatIndex === 3 || seatIndex === 14 || seatIndex === 17);
                                const isSelected = selectedSeats.includes(seatNumber);

                                return (
                                    <div key={seatNumber}>
                                        {isEmptySeat ? (
                                            <button className="seat-gap cursor-auto" disabled aria-hidden="true" />
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => toggleSeat(seatNumber)}
                                                aria-label={`Assento ${seatNumber}`}
                                                aria-pressed={isSelected}
                                                className={`cinema-seat ${isSelected ? "is-selected" : ""}`}
                                            >
                                                {isReservedForWheelchair ? <BsPersonWheelchair aria-hidden="true" /> : isReservedForObese ? <BsArrows aria-hidden="true" /> : seatIndex + 1}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                            <span className="seat-row-label seat-row-label-right">{row}</span>
                        </div>
                    ))}
                </div>

            </div>

            <div className="seat-legend">
                <div className="seat-legend-heading">
                    <div>
                        <p className="seat-selection-eyebrow">Orientação</p>
                        <h2>Legenda</h2>
                    </div>
                    <span>{selectedSeats.length} selecionado(s)</span>
                </div>
                <ul>
                    <li><BsCircleFill className="seat-legend-available" aria-hidden="true" /> Disponível</li>
                    <li><BsCircleFill className="seat-legend-selected" aria-hidden="true" /> Selecionado</li>
                    <li><BsPersonFillSlash aria-hidden="true" /> Ocupado</li>
                    <li><BsBan aria-hidden="true" /> Bloqueado</li>
                    <li><BsPersonWheelchair aria-hidden="true" /> Cadeirante</li>
                    <li><BsArrows aria-hidden="true" /> Obeso</li>
                </ul>
            </div>
        </div>
    );
};

export default SelectSeats;
