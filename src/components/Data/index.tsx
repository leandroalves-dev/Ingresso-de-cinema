import { useEffect, useState } from "react";

import Carousel from "../Carousel";
import FilterMonth from "../FilterMonth";
import { useMovies } from "../../hooks/useMovies";
import { getAvailableDaysInMonth, getDateForMonth, getFutureMonths, getMoviesForDate, formatMonthKey } from "../../utils/schedule";
import { Movie } from "../../types/Movies";

interface DataProps {
    onFilterMovies: (movies: Movie[], date: string | null) => void;
}

const Data = ({ onFilterMovies }: DataProps) => {
    const [referenceDate] = useState(() => new Date());
    const [selectedMonth, setSelectedMonth] = useState(() => formatMonthKey(referenceDate));
    const [days, setDays] = useState<number[]>([]);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const { movies, loading } = useMovies();
    const months = getFutureMonths(referenceDate);

    useEffect(() => {
        if (loading) return;

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
    }, [loading, movies, onFilterMovies, referenceDate, selectedMonth]);

    const handleSelectDay = (day: number) => {
        const date = getDateForMonth(selectedMonth, day);
        if (!date) return;
        setSelectedDay(day);
        onFilterMovies(getMoviesForDate(movies, date), date);
    };

    if (loading) return null;

    return (
        <div className="relative">
            <div className="programming-toolbar flex items-center justify-between gap-4">
                <div>
                    <p className="section-eyebrow mb-2">Agenda de sessões</p>
                    <h1 className="text-2xl font-semibold tracking-tight text-[#f7f7f7] sm:text-3xl">Programação</h1>
                </div>
                <FilterMonth months={months} value={selectedMonth} onChange={setSelectedMonth} />
            </div>

            {days.length > 0 ? (
                <Carousel days={days} selectedDay={selectedDay} onDaySelect={handleSelectDay} />
            ) : (
                <div className="my-8 rounded-sm border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-sm text-[#b9b9b9]">Não há sessões disponíveis neste mês.</div>
            )}
        </div>
    );
};

export default Data;
