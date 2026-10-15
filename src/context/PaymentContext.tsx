import { createContext, useState, useEffect, ReactNode } from "react";

import { Combos } from "../types/Combos";
import { TicketQuantities, TicketSelection } from "../types/Checkout";
import { readCheckoutDraft, updateCheckoutDraft } from "../utils/checkoutStorage";

interface PaymentContextType {
    valorInteira: number;
    valorMeia: number;
    valorMeiaBradesco: number;
    valorMeiaItau: number;
    valorTaxaInteira: number;
    valorTaxaMeia: number;

    ticketInteira: number;
    ticketMeia: number;
    ticketMeiaBradesco: number;
    ticketMeiaItau: number;
    totalSeats: number;
    selectedTickets: TicketSelection[];

    resetPayment: () => void;
    addPriceInteira: () => void;
    removePriceInteira: () => void;
    addPriceMeia: () => void;
    removePriceMeia: () => void;
    addPriceBradesco: () => void;
    removePriceBradesco: () => void;
    addPriceItau: () => void;
    removePriceItau: () => void;

    selectedCombos: Combos[];
    addCombo: (combo: Combos) => void;
    removeCombo: (comboId: number) => void;

    total: number;
    taxaTotal: number;
    totalTaxa: number;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

const addTicketSelection = (tickets: TicketSelection[], type: string, value: number) => {
    const existingTicket = tickets.find((ticket) => ticket.type === type);

    if (existingTicket) {
        return tickets.map((ticket) => ticket.type === type ? { ...ticket, quantity: ticket.quantity + 1 } : ticket);
    }

    return [...tickets, { type, value, quantity: 1 }];
};

const removeTicketSelection = (tickets: TicketSelection[], type: string) => {
    const existingTicket = tickets.find((ticket) => ticket.type === type);

    if (!existingTicket) return tickets;

    if (existingTicket.quantity > 1) {
        return tickets.map((ticket) => ticket.type === type ? { ...ticket, quantity: ticket.quantity - 1 } : ticket);
    }

    return tickets.filter((ticket) => ticket.type !== type);
};

const PaymentProvider = ({ children }: { children: ReactNode }) => {
    const [ticketInteira, setTicketInteira] = useState(() => readCheckoutDraft()?.ticketQuantities.ticketInteira ?? 0);
    const [ticketMeia, setTicketMeia] = useState(() => readCheckoutDraft()?.ticketQuantities.ticketMeia ?? 0);
    const [ticketMeiaBradesco, setTicketMeiaBradesco] = useState(() => readCheckoutDraft()?.ticketQuantities.ticketMeiaBradesco ?? 0);
    const [ticketMeiaItau, setTicketMeiaItau] = useState(() => readCheckoutDraft()?.ticketQuantities.ticketMeiaItau ?? 0);
    const [totalSeats, setTotalSeats] = useState(() => {
        const quantities = readCheckoutDraft()?.ticketQuantities;
        return quantities ? quantities.ticketInteira + quantities.ticketMeia + quantities.ticketMeiaBradesco + quantities.ticketMeiaItau : 0;
    });
    const [selectedTickets, setSelectedTickets] = useState<TicketSelection[]>(() => readCheckoutDraft()?.selectedTickets ?? []);
    const [selectedCombos, setSelectedCombos] = useState<Combos[]>(() => readCheckoutDraft()?.selectedCombos ?? []);

    const valorInteira = 30.00;
    const valorMeia = 15.00;
    const valorMeiaBradesco = 12.00;
    const valorMeiaItau = 12.00;

    const valorTaxaInteira = 5.00;
    const valorTaxaMeia = 2.50;

    const getTicketQuantities = (overrides: Partial<TicketQuantities> = {}): TicketQuantities => ({
        ticketInteira,
        ticketMeia,
        ticketMeiaBradesco,
        ticketMeiaItau,
        ...overrides,
    });

    const persistPaymentDraft = (
        ticketQuantities: TicketQuantities,
        nextSelectedTickets = selectedTickets,
        nextSelectedCombos = selectedCombos,
    ) => {
        updateCheckoutDraft({ ticketQuantities, selectedTickets: nextSelectedTickets, selectedCombos: nextSelectedCombos });
    };

    const resetPayment = () => {
        setTicketInteira(0);
        setTicketMeia(0);
        setTicketMeiaBradesco(0);
        setTicketMeiaItau(0);
        setSelectedTickets([]);
        setSelectedCombos([]);
        persistPaymentDraft({
            ticketInteira: 0,
            ticketMeia: 0,
            ticketMeiaBradesco: 0,
            ticketMeiaItau: 0,
        }, [], []);
    };

    const addPriceInteira = () => {
        const nextTicketInteira = ticketInteira + 1;
        const nextSelectedTickets = addTicketSelection(selectedTickets, "Ingresso inteira", valorInteira);

        setTicketInteira(nextTicketInteira);
        setSelectedTickets(nextSelectedTickets);
        persistPaymentDraft(getTicketQuantities({ ticketInteira: nextTicketInteira }), nextSelectedTickets);
    };

    const removePriceInteira = () => {
        if (ticketInteira <= 0) return;

        const nextTicketInteira = ticketInteira - 1;
        const nextSelectedTickets = removeTicketSelection(selectedTickets, "Ingresso inteira");

        setTicketInteira(nextTicketInteira);
        setSelectedTickets(nextSelectedTickets);
        persistPaymentDraft(getTicketQuantities({ ticketInteira: nextTicketInteira }), nextSelectedTickets);
    };

    const addPriceMeia = () => {
        const nextTicketMeia = ticketMeia + 1;
        const nextSelectedTickets = addTicketSelection(selectedTickets, "Ingresso meia", valorMeia);

        setTicketMeia(nextTicketMeia);
        setSelectedTickets(nextSelectedTickets);
        persistPaymentDraft(getTicketQuantities({ ticketMeia: nextTicketMeia }), nextSelectedTickets);
    };

    const removePriceMeia = () => {
        if (ticketMeia <= 0) return;

        const nextTicketMeia = ticketMeia - 1;
        const nextSelectedTickets = removeTicketSelection(selectedTickets, "Ingresso meia");

        setTicketMeia(nextTicketMeia);
        setSelectedTickets(nextSelectedTickets);
        persistPaymentDraft(getTicketQuantities({ ticketMeia: nextTicketMeia }), nextSelectedTickets);
    };

    const addPriceBradesco = () => {
        const nextTicketMeiaBradesco = ticketMeiaBradesco + 1;
        const nextSelectedTickets = addTicketSelection(selectedTickets, "Ingresso meia bradesco", valorMeiaBradesco);

        setTicketMeiaBradesco(nextTicketMeiaBradesco);
        setSelectedTickets(nextSelectedTickets);
        persistPaymentDraft(getTicketQuantities({ ticketMeiaBradesco: nextTicketMeiaBradesco }), nextSelectedTickets);
    };

    const removePriceBradesco = () => {
        if (ticketMeiaBradesco <= 0) return;

        const nextTicketMeiaBradesco = ticketMeiaBradesco - 1;
        const nextSelectedTickets = removeTicketSelection(selectedTickets, "Ingresso meia bradesco");

        setTicketMeiaBradesco(nextTicketMeiaBradesco);
        setSelectedTickets(nextSelectedTickets);
        persistPaymentDraft(getTicketQuantities({ ticketMeiaBradesco: nextTicketMeiaBradesco }), nextSelectedTickets);
    };

    const addPriceItau = () => {
        const nextTicketMeiaItau = ticketMeiaItau + 1;
        const nextSelectedTickets = addTicketSelection(selectedTickets, "Ingresso meia itaÃº", valorMeiaItau);

        setTicketMeiaItau(nextTicketMeiaItau);
        setSelectedTickets(nextSelectedTickets);
        persistPaymentDraft(getTicketQuantities({ ticketMeiaItau: nextTicketMeiaItau }), nextSelectedTickets);
    };

    const removePriceItau = () => {
        if (ticketMeiaItau <= 0) return;

        const nextTicketMeiaItau = ticketMeiaItau - 1;
        const nextSelectedTickets = removeTicketSelection(selectedTickets, "Ingresso meia itaÃº");

        setTicketMeiaItau(nextTicketMeiaItau);
        setSelectedTickets(nextSelectedTickets);
        persistPaymentDraft(getTicketQuantities({ ticketMeiaItau: nextTicketMeiaItau }), nextSelectedTickets);
    };

    const addCombo = (combo: Combos) => {
        const existingCombo = selectedCombos.find((item) => item.id === combo.id);
        const nextSelectedCombos = existingCombo
            ? selectedCombos.map((item) => item.id === combo.id ? { ...item, quantity: item.quantity + 1 } : item)
            : [...selectedCombos, { ...combo, quantity: 1 }];

        setSelectedCombos(nextSelectedCombos);
        persistPaymentDraft(getTicketQuantities(), selectedTickets, nextSelectedCombos);
    };

    const removeCombo = (comboId: number) => {
        const existingCombo = selectedCombos.find((item) => item.id === comboId);
        if (!existingCombo) return;

        const nextSelectedCombos = existingCombo.quantity > 1
            ? selectedCombos.map((item) => item.id === comboId ? { ...item, quantity: item.quantity - 1 } : item)
            : selectedCombos.filter((item) => item.id !== comboId);

        setSelectedCombos(nextSelectedCombos);
        persistPaymentDraft(getTicketQuantities(), selectedTickets, nextSelectedCombos);
    };

    useEffect(() => {
        const total = ticketInteira + ticketMeia + ticketMeiaBradesco + ticketMeiaItau;
        setTotalSeats(total);
    }, [ticketInteira, ticketMeia, ticketMeiaBradesco, ticketMeiaItau]);

    const inteiraPriceTotal = valorInteira * ticketInteira;
    const meiaPriceTotal = valorMeia * ticketMeia;
    const meiaBradescoPriceTotal = valorMeiaBradesco * ticketMeiaBradesco;
    const meiaItauPriceTotal = valorMeiaItau * ticketMeiaItau;

    const taxaInteiraPriceTotal = valorTaxaInteira * ticketInteira;
    const taxaMeiaPriceTotal = valorTaxaMeia * ticketMeia;
    const taxaBradescoPriceTotal = valorTaxaMeia * ticketMeiaBradesco;
    const taxaItauPriceTotal = valorTaxaMeia * ticketMeiaItau;

    const totalPrice = inteiraPriceTotal + meiaPriceTotal + meiaBradescoPriceTotal + meiaItauPriceTotal;
    const totalTaxa = taxaInteiraPriceTotal + taxaMeiaPriceTotal + taxaBradescoPriceTotal + taxaItauPriceTotal;

    const combosPriceTotal = Object.values(selectedCombos).reduce((acc, combo) => acc + (combo.price * combo.quantity), 0);
    const combosTaxTotal = Object.values(selectedCombos).reduce((acc, combo) => acc + (combo.tax * combo.quantity), 0);

    const taxaTotal = combosTaxTotal + totalTaxa;
    const total = totalPrice + combosPriceTotal + taxaTotal;

    return (
        <PaymentContext.Provider value={{
            valorInteira,
            valorMeia,
            valorMeiaBradesco,
            valorMeiaItau,
            valorTaxaInteira,
            valorTaxaMeia,
            ticketInteira,
            ticketMeia,
            ticketMeiaBradesco,
            ticketMeiaItau,
            totalSeats,
            resetPayment,
            addPriceInteira,
            removePriceInteira,
            addPriceMeia,
            removePriceMeia,
            addPriceBradesco,
            removePriceBradesco,
            addPriceItau,
            removePriceItau,
            selectedTickets,
            selectedCombos,
            addCombo,
            removeCombo,
            total,
            taxaTotal,
            totalTaxa,
        }}>
            {children}
        </PaymentContext.Provider>
    );
};

export { PaymentContext, PaymentProvider };
