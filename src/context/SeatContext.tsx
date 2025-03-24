import { createContext, useState, ReactNode } from "react";

// Definição do tipo para o contexto
interface SeatContextType {
    selectedSeats: string[];
    toggleSeat: (seat: string) => void;
    resetSeat: () => void;
}

// Criando o contexto com um valor inicial undefined
const SeatContext = createContext<SeatContextType>({
    selectedSeats: [],
    toggleSeat: () => {},
    resetSeat: () => {}    
});

// Provedor do contexto
export const SeatProvider = ({ children }: { children: ReactNode }) => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const resetSeat = () => {
        setSelectedSeats([])
    }

    const toggleSeat = (seat: string) => {
        setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.includes(seat)
            ? prevSelectedSeats.filter((s) => s !== seat)
            : [...prevSelectedSeats, seat]
        );
    };
    
    return (
        <SeatContext.Provider value={{ selectedSeats, toggleSeat, resetSeat }}>
        {children}
        </SeatContext.Provider>
    );
};

export { SeatContext };