/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react';
import { useEffect } from 'react';

// Cria o contexto
const PaymentContext = createContext();

// Componente Provider para envolver a aplicação e fornecer os dados
const PaymentProvider = ({ children }) => {

    // Estados dos ingressos
    const [ticketInteira, setTicketInteira] = useState(0);
    const [ticketMeia, setTicketMeia] = useState(0);
    const [ticketMeiaBradesco, setTicketMeiaBradesco] = useState(0);
    const [ticketMeiaItau, setTicketMeiaItau] = useState(0);
    const [totalSeats, setTotalSeats] = useState(0);

    const [selectedTickets, setSelectedTickets] = useState([]);

    // Estados dos combos
    const [selectedCombos, setSelectedCombos] = useState({});

    const resetPaymentData = () => {
        setSelectedTickets([]);
        setSelectedCombos({});
        setTicketInteira(0);
        setTicketMeia(0);
        setTicketMeiaBradesco(0);
        setTicketMeiaItau(0);
    };

    const inteira = 20.00;
    const meia = 10.00;
    const meiaBradesco = 8.00;
    const meiaItau = 7.00;

    const taxaInteira = 5.00;
    const taxaMeia = 2.50;


    // Funções de adicionar/remover ingressos
    const addPriceInteira = () => {
        setTicketInteira(ticketInteira + 1);
        setSelectedTickets((prev) => {
            const bilhete = prev.find(ticket => ticket.type === 'Ingresso inteira');
            if (bilhete) {
                return prev.map(ticket => ticket.type === 'Ingresso inteira' ? { ...ticket, quantity: ticket.quantity + 1 } : ticket);
            } else {
                return [...prev, { type: 'Ingresso inteira', value: inteira, quantity: 1 }];
            }
        });
    }

    const removePriceInteira = () => {
        if (ticketInteira > 0) {
            setTicketInteira(ticketInteira - 1);
            setSelectedTickets((prev) => {
                const bilhete = prev.find(ticket => ticket.type === 'Ingresso inteira');
                if (bilhete) {
                    if (bilhete.quantity - 1 > 0) {
                        return prev.map(ticket => ticket.type === 'Ingresso inteira' ? { ...ticket, quantity: ticket.quantity - 1 } : ticket);
                    } else {
                        return prev.filter(ticket => ticket.type !== 'Ingresso inteira');
                    }
                }
                return prev;
            });
        }
    }

    const addPriceMeia = () => {
        setTicketMeia(ticketMeia + 1);
        setSelectedTickets(prev => {
            const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia');
            if(bilhete){
                return prev.map(ticket => ticket.type === 'Ingresso meia' ? {...ticket, quantity: ticket.quantity + 1} : ticket);
            }else{
                return [...prev, { type: 'Ingresso meia', value: meia, quantity: 1 }];
            }
        })
    }

    const removePriceMeia = () => {
        if (ticketMeia > 0) {
            setTicketMeia(ticketMeia - 1);
            setSelectedTickets((prev) => {
                const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia');
                if (bilhete) {
                    if (bilhete.quantity - 1 > 0) {
                        return prev.map(ticket => ticket.type === 'Ingresso meia' ? { ...ticket, quantity: ticket.quantity - 1 } : ticket);
                    } else {
                        return prev.filter(ticket => ticket.type !== 'Ingresso meia');
                    }
                }
                return prev;
            });
        }
    }

    const addPriceMeiaBradesco = () => {
        setTicketMeiaBradesco(ticketMeiaBradesco + 1)
        setSelectedTickets(prev => {
            const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia bradesco');
            if(bilhete){
                return prev.map(ticket => ticket.type === 'Ingresso meia bradesco' ? {...ticket, quantity: ticket.quantity + 1} : ticket);
            }else{
                return [...prev, { type: 'Ingresso meia bradesco', value: meiaBradesco, quantity: 1 }];
            }
        })
    }

    const removePriceBradesco = () => {
        if(ticketMeiaBradesco > 0){
            setTicketMeiaBradesco(ticketMeiaBradesco - 1)
            setSelectedTickets((prev) => {
                const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia bradesco');
                if (bilhete) {
                    if (bilhete.quantity - 1 > 0) {
                        return prev.map(ticket => ticket.type === 'Ingresso meia bradesco' ? { ...ticket, quantity: ticket.quantity - 1 } : ticket);
                    } else {
                        return prev.filter(ticket => ticket.type !== 'Ingresso meia bradesco');
                    }
                }
                return prev;
            });
        }
    }

    const addPriceMeiaItau = () => {
        setTicketMeiaItau(ticketMeiaItau + 1);
        setSelectedTickets(prev => {
            const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia itau');
            if(bilhete){
                return prev.map(ticket => ticket.type === 'Ingresso meia itau' ? {...ticket, quantity: ticket.quantity + 1} : ticket);
            }else{
                return [...prev, { type: 'Ingresso meia itau', value: meiaItau, quantity: 1 }];
            }
        })
    }

    const removePriceItau = () => {
        if(ticketMeiaItau > 0){
            setTicketMeiaItau(ticketMeiaItau - 1);
            setSelectedTickets((prev) => {
                const bilhete = prev.find(ticket => ticket.type === 'Ingresso meia itau');
                if (bilhete) {
                    if (bilhete.quantity - 1 > 0) {
                        return prev.map(ticket => ticket.type === 'Ingresso meia itau' ? { ...ticket, quantity: ticket.quantity - 1 } : ticket);
                    } else {
                        return prev.filter(ticket => ticket.type !== 'Ingresso meia itau');
                    }
                }
                return prev;
            });
        }
    }

    // Funções de adicionar/remover combos
    const addCombo = (combo) => {
        setSelectedCombos((prev) => ({
            ...prev,
            [combo.id]: {
                ...combo,
                quantity: (prev[combo.id]?.quantity || 0) + 1,
            }
        }));
    };

    const removeCombo = (comboId) => {
        setSelectedCombos((prev) => {
            const { [comboId]: _, ...rest } = prev;
            if (prev[comboId]?.quantity > 1) {
                return {
                    ...prev,
                    [comboId]: {
                        ...prev[comboId],
                        quantity: prev[comboId].quantity - 1
                    }
                };
            }
            return rest;
        });
    };

    useEffect(() => {
        const total = ticketInteira + ticketMeia + ticketMeiaBradesco + ticketMeiaItau;
        setTotalSeats(total);
    }, [ticketInteira, ticketMeia, ticketMeiaBradesco, ticketMeiaItau]);

    // Soma ingressos de inteira + meia
    const inteiraPriceTotal = inteira * ticketInteira;
    const meiaPriceTotal = meia * ticketMeia;

    // Soma ingressos de parceiros de banco
    const meiaBradescoPriceTotal = meiaBradesco * ticketMeiaBradesco;
    const meiaItauPriceTotal = meiaItau * ticketMeiaItau;

    // Soma as taxas 
    const taxaInteiraPriceTotal = taxaInteira * ticketInteira;
    const taxaMeiaPriceTotal = taxaMeia * ticketMeia; 
    const taxaBradescoPriceTotal = taxaMeia * ticketMeiaBradesco; 
    const taxaItauPriceTotal = taxaMeia * ticketMeiaItau; 


    const totalPrice = inteiraPriceTotal + meiaPriceTotal + meiaBradescoPriceTotal + meiaItauPriceTotal;
    const totalTaxa = taxaInteiraPriceTotal + taxaMeiaPriceTotal + taxaBradescoPriceTotal + taxaItauPriceTotal;

    // Total de combos
    const combosPriceTotal = Object.values(selectedCombos).reduce((acc, combo) => acc + (combo.price * combo.quantity),0);
    
    // Total de taxas dos combos
    const combosTaxTotal = Object.values(selectedCombos).reduce((acc, combo) => acc + (combo.tax * combo.quantity),0);
    
    const taxaTotal = combosTaxTotal + totalTaxa
    const total = totalPrice + combosPriceTotal + taxaTotal

    return (
        <PaymentContext.Provider value={{
            // Ingressos
            ticketInteira, 
            ticketMeia,
            totalSeats,
            inteira,
            meia,
            addPriceInteira,
            removePriceInteira,
            addPriceMeia,
            removePriceMeia,
            addPriceMeiaBradesco,
            removePriceBradesco,
            addPriceMeiaItau,
            removePriceItau,
            ticketMeiaBradesco,
            ticketMeiaItau,
            meiaBradesco,
            meiaItau,
            selectedTickets,
            resetPaymentData,

            // Combos
            selectedCombos,
            addCombo,
            removeCombo,
            combosTaxTotal,
            total,
            taxaTotal
        }}>
            {children} 
        </PaymentContext.Provider>
    );
};

// Exportação consistente no final do arquivo
export { PaymentContext, PaymentProvider };
