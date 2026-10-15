import { Combos } from "./Combos";
import { MovieSelection } from "./Movies";

export type CheckoutStep = 1 | 2 | 3 | 4 | 5;

export interface TicketSelection {
    type: string;
    value: number;
    quantity: number;
}

export interface TicketQuantities {
    ticketInteira: number;
    ticketMeia: number;
    ticketMeiaBradesco: number;
    ticketMeiaItau: number;
}

export interface CheckoutDraft {
    version: 1;
    step: CheckoutStep;
    selectedMovie: MovieSelection | null;
    selectedSeats: string[];
    ticketQuantities: TicketQuantities;
    selectedTickets: TicketSelection[];
    selectedCombos: Combos[];
}
