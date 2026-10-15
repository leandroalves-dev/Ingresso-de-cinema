import { createContext, useState, ReactNode } from "react";
import { readCheckoutDraft, updateCheckoutDraft } from "../utils/checkoutStorage";

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
    const [selectedSeats, setSelectedSeats] = useState<string[]>(() => readCheckoutDraft()?.selectedSeats ?? []);

    const resetSeat = () => {
        setSelectedSeats([]);
        updateCheckoutDraft({ selectedSeats: [] });
    }

    const toggleSeat = (seat: string) => {
        const nextSelectedSeats = selectedSeats.includes(seat)
            ? selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
            : [...selectedSeats, seat];

        setSelectedSeats(nextSelectedSeats);
        updateCheckoutDraft({ selectedSeats: nextSelectedSeats });
    };
    
    return (
        <SeatContext.Provider value={{ selectedSeats, toggleSeat, resetSeat }}>
        {children}
        </SeatContext.Provider>
    );
};

export { SeatContext };
