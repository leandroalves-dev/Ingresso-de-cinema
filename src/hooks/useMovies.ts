import { useEffect, useState } from "react";

import { getMovies, getCombos, getPrices, getNews } from "../services/movieServices";
import { Movie } from "../types/Movies";
import { Combos } from "../types/Combos";
import { Prices } from "../types/Prices";
import { News } from "../types/News";

interface MoviesState {
    movies: Movie[];
    combos: Combos[];
    prices: Prices | null;
    news: News[];
}

let cachedMoviesState: MoviesState | null = null;
let moviesRequest: Promise<MoviesState> | null = null;

const loadMoviesState = (): Promise<MoviesState> => {
    if (cachedMoviesState) return Promise.resolve(cachedMoviesState);
    if (moviesRequest) return moviesRequest;

    moviesRequest = Promise.all([getMovies(), getCombos(), getPrices(), getNews()])
        .then(([moviesResponse, combosResponse, priceResponse, newsResponse]) => {
            const state: MoviesState = {
                movies: moviesResponse?.movies || [],
                combos: combosResponse?.combos || [],
                prices: priceResponse || null,
                news: newsResponse?.movieNews || [],
            };

            cachedMoviesState = state;
            return state;
        })
        .finally(() => {
            moviesRequest = null;
        });

    return moviesRequest;
};

export function useMovies() {
    const [state, setState] = useState<MoviesState | null>(cachedMoviesState);
    const [loading, setLoading] = useState(!cachedMoviesState);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        loadMoviesState()
            .then((nextState) => {
                if (!isMounted) return;
                setState(nextState);
                setLoading(false);
            })
            .catch((err) => {
                if (!isMounted) return;
                setError("Erro ao carregar os filmes.");
                setLoading(false);
                console.error("Erro ao buscar dados:", err);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        movies: state?.movies || [],
        combos: state?.combos || [],
        prices: state?.prices || null,
        news: state?.news || [],
        loading,
        error,
    };
}
