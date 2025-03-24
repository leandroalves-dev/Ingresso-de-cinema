import { allMonths } from "./months";

export const getDaysInMonth = (month: string): number[] => {

    const monthIndex = allMonths.indexOf(month);

    if (monthIndex === -1) return [];

    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const currentDay = new Date().getDate(); // Obtém o dia atual do mês

    // Filtra os dias que são posteriores ou iguais ao dia atual
    return Array.from({ length: daysInMonth }, (_, i) => i + 1).filter(day => day >= currentDay);
};