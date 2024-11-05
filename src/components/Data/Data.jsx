/* eslint-disable react-hooks/exhaustive-deps */
import './Data.css';

import { useEffect, useState } from 'react';

// component
import Carousel from '../../components/Carousel/Carousel';

const Data = ({ onDaySelect }) => {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // 0 = Janeiro, 11 = Dezembro

    const months = [
        { value: 0, label: 'Janeiro' },
        { value: 1, label: 'Fevereiro' },
        { value: 2, label: 'Março' },
        { value: 3, label: 'Abril' },
        { value: 4, label: 'Maio' },
        { value: 5, label: 'Junho' },
        { value: 6, label: 'Julho' },
        { value: 7, label: 'Agosto' },
        { value: 8, label: 'Setembro' },
        { value: 9, label: 'Outubro' },
        { value: 10, label: 'Novembro' },
        { value: 11, label: 'Dezembro' },
    ];

    const availableMonths = months.filter(month => month.value >= currentMonth);

    const handleMonthChange = (e) => {
        const monthValue = Number(e.target.value);
        setSelectedMonth(monthValue);
        updateDaysInMonth(monthValue);
    };

    const updateDaysInMonth = (month) => {
        const year = currentDate.getFullYear();
        let daysArray = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => i + 1);

        // Se o mês selecionado for o mês atual, remove os dias anteriores ao dia atual
        setDaysInMonth(month === currentMonth ? daysArray.filter(day => day >= currentDay) : daysArray);

        // Define o dia atual como selecionado ao carregar o mês atual
        setSelectedDay(month === currentMonth ? currentDay : null);
    };

    useEffect(() => {
        setSelectedMonth(currentMonth);
        updateDaysInMonth(currentMonth); // Configura os dias ao carregar o componente
    }, [currentMonth]);

    // Função chamada quando um dia é selecionado
    const handleDaySelect = (day) => {
        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = (selectedMonth + 1).toString().padStart(2, '0');
        const formattedDate = `${new Date().getFullYear()}-${formattedMonth}-${formattedDay}`;
        
        setSelectedDay(formattedDay);
        if (onDaySelect) {
            onDaySelect(formattedDate); // Envia a data completa como 'YYYY-MM-DD'
        }
    };

    //console.log('data dsds', selectedDay)

    return (
        <div className="calendar">
            <div className="grid-select">
                <h1>Programação</h1>
                <select onChange={handleMonthChange} value={selectedMonth || ''}>
                    {availableMonths.map(month => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                </select>
            </div>

            {Array.isArray(daysInMonth) && daysInMonth.length > 0 && (
                <div className="selectDate">
                    <Carousel items={daysInMonth} onSelect={handleDaySelect} selectedItem={selectedDay} />
                </div>
            )}
        </div>
    );
};

export default Data;
