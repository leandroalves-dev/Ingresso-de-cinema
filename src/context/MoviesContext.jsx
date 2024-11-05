// context/MoviesContext.js
import { createContext, useContext, useState } from 'react';

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDaySelect = (day, month) => {
        setSelectedDay(day);
        setSelectedMonth(month);
    };

    const value = {
        selectedDay,
        selectedMonth,
        selectedTime,
        setSelectedTime,
        handleDaySelect,
    };

    return (
        <MoviesContext.Provider value={value}>
            {children}
        </MoviesContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => {
    return useContext(MoviesContext);
};
