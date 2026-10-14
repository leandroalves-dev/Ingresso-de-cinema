import { allMonths } from "./months";
import { Movie, Weekday } from "../types/Movies";

export interface MonthOption {
    key: string;
    label: string;
}

const pad = (value: number) => value.toString().padStart(2, "0");

export const formatLocalDate = (date: Date): string => (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
);

export const formatMonthKey = (date: Date): string => (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}`
);

export const getMonthParts = (monthKey: string): { year: number; monthIndex: number } | null => {
    const [yearValue, monthValue] = monthKey.split("-").map(Number);
    const year = yearValue;
    const month = monthValue;

    if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
        return null;
    }

    return { year, monthIndex: month - 1 };
};

export const createLocalDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
};

export const getIsoWeekday = (date: Date): Weekday => (
    (((date.getDay() + 6) % 7) + 1) as Weekday
);

export const isMovieAvailableOnDate = (movie: Movie, date: Date | string): boolean => {
    const localDate = typeof date === "string" ? createLocalDate(date) : date;
    return movie.schedule.weekdays.includes(getIsoWeekday(localDate));
};

export const getMoviesForDate = (movies: Movie[], date: string): Movie[] => (
    movies.filter((movie) => isMovieAvailableOnDate(movie, date))
);

export const getFutureMonths = (referenceDate: Date, numberOfMonths = 12): MonthOption[] => (
    Array.from({ length: numberOfMonths }, (_, index) => {
        const date = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + index, 1);
        const monthIndex = date.getMonth();

        return {
            key: formatMonthKey(date),
            label: `${allMonths[monthIndex]} ${date.getFullYear()}`,
        };
    })
);

export const getAvailableDaysInMonth = (
    movies: Movie[],
    monthKey: string,
    minimumDate: Date,
): number[] => {
    const parts = getMonthParts(monthKey);
    if (!parts) return [];

    const firstAvailableDate = new Date(
        minimumDate.getFullYear(),
        minimumDate.getMonth(),
        minimumDate.getDate(),
    );
    const daysInMonth = new Date(parts.year, parts.monthIndex + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, index) => index + 1)
        .filter((day) => {
            const date = new Date(parts.year, parts.monthIndex, day);
            return date >= firstAvailableDate && movies.some((movie) => isMovieAvailableOnDate(movie, date));
        });
};

export const getDateForMonth = (monthKey: string, day: number): string | null => {
    const parts = getMonthParts(monthKey);
    if (!parts) return null;

    return formatLocalDate(new Date(parts.year, parts.monthIndex, day));
};
