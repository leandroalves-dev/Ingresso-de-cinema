import { useState, useEffect } from "react";

// Components
import Carousel from "../Carousel";
import FilterMonth from "../FilterMonth";

// Hooks
import { useMovies } from "../../hooks/useMovies";

// Utils
import { allMonths } from "../../utils/months";

// Types
import { Movie } from "../../types/Movies";

const Data = ({ onFilterMovies }: { onFilterMovies: (movies: Movie[], date: string | null) => void }) => {

    // Obtém o mês atual do sistema
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // Obtém o índice do mês (0 = Janeiro)
    const currentMonth = allMonths[currentMonthIndex]; // Obtém o nome do mês
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();

    // Estados
    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
    const [days, setDays] = useState<number[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
   
    const { movies } = useMovies();

    console.log("Filmes filtrados:", filteredMovies, "Data selecionada:", selectedDate);

    const updateDaysInMonth = (month: string) => {
        const selectedMonthIndex = allMonths.indexOf(month);
        if (selectedMonthIndex === -1) return; // Evita erro caso o mês não seja encontrado

        // Obtém todos os dias do mês selecionado
        let daysArray = Array.from({ length: new Date(currentYear, selectedMonthIndex + 1, 0).getDate() }, (_, i) => i + 1);

        console.log("Dias antes do filtro:", daysArray);

        // Se o mês selecionado for o mês atual, remove os dias anteriores ao dia atual
        if (selectedMonthIndex === currentMonthIndex) { 
            daysArray = daysArray.filter(day => day >= currentDay);
        }

        console.log("Dias depois do filtro:", daysArray);

        setDays(daysArray);

        // Define a data inicial correta no carrossel
        const formattedDay = (selectedMonthIndex === currentMonthIndex ? currentDay : 1).toString().padStart(2, '0');
        const formattedMonth = (selectedMonthIndex + 1).toString().padStart(2, '0');
        const formattedDate = `${currentYear}-${formattedMonth}-${formattedDay}`;
        
        setSelectedDate(formattedDate);
    };

    // Atualiza os dias quando o componente for montado
    useEffect(() => {
        updateDaysInMonth(selectedMonth);
    }, []); 

    // Troca os dias no carrossel quando o select for alterado
    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
        updateDaysInMonth(month);
        setFilteredMovies([]);
    };

    // Retorna a data selecionada no carrossel
    const handleSelectDay = (day: number) => {
        const selectedMonthIndex = allMonths.indexOf(selectedMonth);
        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = (selectedMonthIndex + 1).toString().padStart(2, '0'); 
        const formattedDate = `${currentYear}-${formattedMonth}-${formattedDay}`;

        setSelectedDate(formattedDate);

        const movieForDate = movies.filter(movie => movie.showDates.includes(formattedDate));
        setFilteredMovies(movieForDate);

        onFilterMovies(movieForDate, formattedDate);
    };

    return (
       <>
            <div className="flex justify-between items-center">
                <h1 className="text-white text-[26px]">Programação</h1>
                <FilterMonth onChange={handleMonthChange} />
            </div>
            {days.length > 0 && <Carousel days={days} onDaySelect={handleSelectDay} />}
       </>
    );
}

export default Data;
