import { createContext, useState, useEffect, ReactNode } from "react";

import { Combos } from "../types/Combos";

interface Ticket{
    type: string;
    value: number;
    quantity: number;
}

interface PaymentContextType{
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
    selectedTickets: Ticket[];
    
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

const PaymentProvider = ({ children }:{children: ReactNode}) => {

    // Estados dos ingressos
    const [ticketInteira, setTicketInteira] = useState(0);
    const [ticketMeia, setTicketMeia] = useState(0);
    const [ticketMeiaBradesco, setTicketMeiaBradesco] = useState(0);
    const [ticketMeiaItau, setTicketMeiaItau] = useState(0);
    const [totalSeats, setTotalSeats] = useState(0);

    const [selectedTickets, setSelectedTickets] = useState<{type: string, value: number, quantity: number}[]>([]);
    const [selectedCombos, setSelectedCombos] = useState<Combos[]>([]);

    const valorInteira = 30.00;
    const valorMeia = 15.00;
    const valorMeiaBradesco = 12.00;
    const valorMeiaItau = 12.00;

    const valorTaxaInteira = 5.00;
    const valorTaxaMeia = 2.50;

    const resetPayment = () => {
        setTicketInteira(0);
        setTicketMeia(0);
        setTicketMeiaBradesco(0);
        setTicketMeiaItau(0);
        setSelectedTickets([]);
        setSelectedCombos([]);
    }
    

    //Função de adicionar/remover ingressos

    //INTEIRA
    const addPriceInteira = () => {
        setTicketInteira(ticketInteira + 1)
        setSelectedTickets((prev) => {
            const bilhete = prev.find(ticket => ticket.type === 'Ingresso inteira');
            if (bilhete) {
                return prev.map(ticket => ticket.type === 'Ingresso inteira' ? { ...ticket, quantity: ticket.quantity + 1 } : ticket);
            } else {
                return [...prev, { type: 'Ingresso inteira', value: valorInteira, quantity: 1 }];
            }
        });
    }

    const removePriceInteira = () => {
        if(ticketInteira > 0){
            setTicketInteira(ticketInteira - 1);
            setSelectedTickets((prev) => {
                const bilhete = prev.find(ticket => ticket.type === 'Ingresso inteira');
                if(bilhete){
                    if(bilhete.quantity - 1 > 0){
                        return prev.map(ticket => ticket.type === 'Ingresso inteira' ? {...ticket, quantity: ticket.quantity - 1} : ticket)
                    }else{
                        return prev.filter(ticket => ticket.type !== 'Ingresso inteira')
                    }
                }
                return prev
            })
        }
    }

    //MEIA
    const addPriceMeia = () => {
        setTicketMeia(ticketMeia + 1)
        setSelectedTickets((prev) => {
            const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia');
            if(bilhete){
                return prev.map(ticket => ticket.type === 'Ingresso meia' ? {...ticket, quantity: ticket.quantity + 1} : ticket);
            }else{
                return [...prev, {type: 'Ingresso meia', value: valorMeia, quantity: 1 }];
            }
        })
    }

    const removePriceMeia = () => {
        if(ticketMeia > 0){
            setTicketMeia(ticketMeia - 1);
            setSelectedTickets((prev) => {
                const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia');
                if(bilhete){
                    if(bilhete.quantity - 1 > 0){
                        return prev.map(ticket => ticket.type === 'Ingresso meia' ? {...ticket, quantity: ticket.quantity - 1}: ticket);
                    }else{
                        return prev.filter(ticket => ticket.type !== 'Ingresso meia')
                    }
                }
                return prev;
            })
        }
    }

    //MEIA BRADESCO
    const addPriceBradesco = () => {
        setTicketMeiaBradesco(ticketMeiaBradesco + 1)
        setSelectedTickets((prev) => {
            const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia bradesco');
            if(bilhete){
                return prev.map(ticket => ticket.type === 'Ingresso meia bradesco' ? {...ticket, quantity: ticket.quantity + 1} : ticket)
            }else{
                return [...prev, {type: 'Ingresso meia bradesco', value: valorMeiaBradesco, quantity: 1 }];
            }
        }) 
    }

    const removePriceBradesco = () => {
        if(ticketMeiaBradesco > 0){
            setTicketMeiaBradesco(ticketMeiaBradesco - 1);
            setSelectedTickets((prev) => {
                const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia bradesco');
                if(bilhete){
                    if(bilhete.quantity - 1 > 0){
                        return prev.map(ticket => ticket.type === 'Ingresso meia bradesco' ? {...ticket, quantity: ticket.quantity - 1}: ticket);
                    }else{
                        return prev.filter(ticket => ticket.type !== 'Ingresso meia bradesco')
                    }
                }
                return prev;
            })
        }
    }
 
    //MEIA ITAÚ
    const addPriceItau = () => {
        setTicketMeiaItau(ticketMeiaItau + 1)
        setSelectedTickets((prev) => {
            const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia itaú');
            if(bilhete){
                return prev.map(ticket => ticket.type === 'Ingresso meia itaú' ? {...ticket, quantity: ticket.quantity + 1} : ticket)
            }else{
                return [...prev, {type: 'Ingresso meia itaú', value: valorMeiaItau, quantity: 1 }]
            }
        })
    }

    const removePriceItau = () => {
        if(ticketMeiaItau > 0){
            setTicketMeiaItau(ticketMeiaItau - 1);
            setSelectedTickets((prev) => {
                const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia itaú');
                if(bilhete){
                    if(bilhete.quantity - 1 > 0){
                        return prev.map(ticket => ticket.type === 'Ingresso meia itaú' ? {...ticket, quantity: ticket.quantity - 1}: ticket);
                    }else{
                        return prev.filter(ticket => ticket.type !== 'Ingresso meia itaú')
                    }
                }
                return prev;
            })
        }
    }

    //COMBOS
    const addCombo = (combo: Combos) => {
        setSelectedCombos(prev => {
            const listCombos = prev.find(cmbo => cmbo.id === combo.id)
            if(listCombos){
                return prev.map(cmbo => cmbo.id === combo.id ? {...cmbo, quantity: cmbo.quantity + 1} : cmbo)
            }else{
                return [...prev, {...combo, quantity: 1}]
            }
        })
    }

    const removeCombo = (comboId: number) => {
        setSelectedCombos(prev => {
            const listCombo = prev.find(cmbo => cmbo.id === comboId)
            if(listCombo){
                if(listCombo.quantity > 1){
                    return prev.map(cmbo => cmbo.id === comboId ? {...cmbo, quantity: cmbo.quantity - 1} : cmbo)
                }else{
                    return prev.filter(cmbo => cmbo.id !== comboId)
                }
            }
            return prev
        })
    }

    useEffect(() => {
        const total = ticketInteira + ticketMeia + ticketMeiaBradesco + ticketMeiaItau;
        setTotalSeats(total);
    }, [ticketInteira, ticketMeia, ticketMeiaBradesco, ticketMeiaItau]);


    // Soma ingressos de inteira + meia
    const inteiraPriceTotal = valorInteira * ticketInteira;
    const meiaPriceTotal = valorMeia * ticketMeia;

    // Soma ingressos de parceiros de banco
    const meiaBradescoPriceTotal = valorMeiaBradesco * ticketMeiaBradesco;
    const meiaItauPriceTotal = valorMeiaItau * ticketMeiaItau;

    // Soma as taxas 
    const taxaInteiraPriceTotal = valorTaxaInteira * ticketInteira;
    const taxaMeiaPriceTotal = valorTaxaMeia * ticketMeia; 
    const taxaBradescoPriceTotal = valorTaxaMeia * ticketMeiaBradesco; 
    const taxaItauPriceTotal = valorTaxaMeia * ticketMeiaItau;

    const totalPrice = inteiraPriceTotal + meiaPriceTotal + meiaBradescoPriceTotal + meiaItauPriceTotal;
    const totalTaxa = taxaInteiraPriceTotal + taxaMeiaPriceTotal + taxaBradescoPriceTotal + taxaItauPriceTotal;

    // Total de combos
    const combosPriceTotal = Object.values(selectedCombos).reduce((acc, combo) => acc + (combo.price * combo.quantity),0);

    // Total de taxas dos combos
    const combosTaxTotal = Object.values(selectedCombos).reduce((acc, combo) => acc + (combo.tax * combo.quantity),0);

    //TOTAL
    const taxaTotal = combosTaxTotal + totalTaxa;
    const total = totalPrice + combosPriceTotal+ taxaTotal;

   
    return(
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
    )

}

// Exportação consistente no final do arquivo
export { PaymentContext, PaymentProvider }