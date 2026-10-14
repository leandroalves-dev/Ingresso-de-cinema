import apiData from '../json/api.json';
import combosData from '../json/combos.json';
import movienewsData from '../json/movienews.json';
import pricesData from '../json/prices.json';
import { Combos } from '../types/Combos';
import { Movie, Weekday } from '../types/Movies';
import { News } from '../types/News';
import { Prices } from '../types/Prices';

const toWeekday = (value: number): Weekday => {
    if (!Number.isInteger(value) || value < 1 || value > 7) {
        throw new Error(`Dia da semana inválido na programação: ${value}`);
    }

    return value as Weekday;
};

const movies: { movies: Movie[] } = {
    movies: apiData.movies.map((movie) => ({
        ...movie,
        schedule: {
            weekdays: movie.schedule.weekdays.map(toWeekday),
        },
    })),
};
const combos: { combos: Combos[] } = combosData;
const news: { movieNews: News[] } = movienewsData;
const prices: Prices = pricesData;

export const getMovies = async () => movies;

export const getMoviesId = async (id: number): Promise<Movie> => {
    const movie = movies.movies.find((item) => item.id === id);

    if (!movie) {
        throw new Error(`Filme com o id ${id} não encontrado.`);
    }

    return movie;
};

export const getCombos = async () => combos;

export const getPrices = async () => prices;

export const getNews = async () => news;
