import { useContext } from "react";

// Icons
import { BsArrows, BsBan, BsCircleFill, BsPersonFillSlash, BsPersonWheelchair } from "react-icons/bs";

// Contexto de assentos
import { SeatContext } from "../../context/SeatContext";

const SelectSeats = () => {
    const seatContext = useContext(SeatContext);

    if (!seatContext) {
        throw new Error("Erro no Provider");
    }

    const { selectedSeats, toggleSeat } = seatContext;

    // Definindo as filas e o número de assentos por fila
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 18;

    return (
        <div className="relative p-5">
            {rows.map(row => (
                <div key={row} className='flex items-center justify-center mb-2.5'>
                    <span className='mr-3 text-white text-[12px]'>{row}</span>
                    {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                        const seatNumber = `${row}-${seatIndex + 1}`; // Gera o assento com letra e número

                        // Condição para adicionar assentos vazios após a poltrona 3 e 13
                        const isEmptySeat = (seatIndex === 3 || seatIndex === 13);

                        // Condição para assentos reservados para cadeirantes
                        const isReservedForWheelchair = (row === 'J' && (seatIndex >= 4 && seatIndex <= 6 || seatIndex >= 11 && seatIndex <= 13));

                        // Condição para assentos reservados para obesos
                        const isReservedForObese = (row === 'J' && (seatIndex === 0 || seatIndex === 3 || seatIndex === 14 || seatIndex === 17));

                        return (
                            <div key={seatNumber} >
                                {isEmptySeat ? (
                                    <button className="bg-transparent cursor-auto w-[30px] h-[15px]" disabled />
                                ) : (
                                <button 
                                    onClick={() => toggleSeat(seatNumber)} className={`${selectedSeats.includes(seatNumber) ? "bg-green-800" : "bg-[#292929]"} 
                                    mr-1 mb-1 bg-[#292929] hover:bg-green-900 transition delay-75 text-white rounded-[3px] text-[10px] flex items-center justify-center cursor-pointer w-[30px] h-[25px] max-sm:w-[18px] max-lg:w-[22px]`}
                                >
                                    {isReservedForWheelchair ? (
                                        <BsPersonWheelchair />
                                    ) : isReservedForObese ? (
                                        <BsArrows />
                                    ) : (
                                        seatNumber.replace(/[^0-9]/g, '')
                                    )}
                                </button>
                                )}
                            </div>
                        );
                    })}
                    <span className='ml-3 text-white text-[12px] w-[15px] h-[15px]'>{row}</span>
                </div>
            ))}

            <div className="perspective-[750px]">
                <div className="text-center text-white my-6 bg-[#161616] py-2 px-0.5 transform rotate-x-[10deg]">
                    TELA
                </div>
            </div>

            <div className="border-t-1 border-t-neutral-800 pt-6 mt-8">
                <h2 className="text-white mb-7">Legenda</h2>
                <ul className="flex flex-wrap gap-5 text-neutral-400 text-[14px]">
                    <li className='flex gap-2 items-center'><BsCircleFill className="text-neutral-700" /> Disponível</li>
                    <li className='flex gap-2 items-center'><BsCircleFill className="text-green-800" /> Selecionado</li>
                    <li className="flex gap-2 items-center"><BsPersonFillSlash /> Ocupado</li>
                    <li className="flex gap-2 items-center"><BsBan /> Bloqueado</li>
                    <li className="flex gap-2 items-center"><BsPersonWheelchair /> Cadeirante</li>
                    <li className="flex gap-2 items-center"><BsArrows /> Obeso</li>
                </ul>
            </div>
        </div>
    );
};

export default SelectSeats;
