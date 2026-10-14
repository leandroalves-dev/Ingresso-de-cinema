import { useEffect, useState } from "react";

import Carousel from "../Carousel";
import FilterMonth from "../FilterMonth";
import { useMovies } from "../../hooks/useMovies";
import {
    getAvailableDaysInMonth,
    getDateForMonth,
    getFutureMonths,
    getMoviesForDate,
    formatMonthKey,
} from "../../utils/schedule";
import { Movie } from "../../types/Movies";

interface DataProps {
    onFilterMovies: (movies: Movie[], date: string | null) => void;
}

const Data = ({ onFilterMovies }: DataProps) => {
    const [referenceDate] = useState(() => new Date());
    const [selectedMonth, setSelectedMonth] = useState(() => formatMonthKey(referenceDate));
    const [days, setDays] = useState<number[]>([]);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const { movies } = useMovies();
    const months = getFutureMonths(referenceDate);

    useEffect(() => {
        const availableDays = getAvailableDaysInMonth(movies, selectedMonth, referenceDate);
        const firstDay = availableDays[0] ?? null;

        setDays(availableDays);
        setSelectedDay(firstDay);

        if (firstDay === null) {
            onFilterMovies([], null);
            return;
        }

        const date = getDateForMonth(selectedMonth, firstDay);
        if (!date) {
            onFilterMovies([], null);
            return;
        }

        onFilterMovies(getMoviesForDate(movies, date), date);
    }, [movies, onFilterMovies, referenceDate, selectedMonth]);

    const handleSelectDay = (day: number) => {
        const date = getDateForMonth(selectedMonth, day);
        if (!date) return;

        setSelectedDay(day);
        onFilterMovies(getMoviesForDate(movies, date), date);
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-white text-[26px]">Programação</h1>
                <FilterMonth
                    months={months}
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                />
            </div>

            {days.length > 0 ? (
                <Carousel
                    days={days}
                    selectedDay={selectedDay}
                    onDaySelect={handleSelectDay}
                />
            ) : (
                <p className="my-5 text-white">Não há sessões disponíveis neste mês.</p>
            )}
        </>
    );
};

export default Data;
