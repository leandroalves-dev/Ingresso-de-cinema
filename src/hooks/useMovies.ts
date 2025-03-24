import { useState, useEffect } from "react";
import { getMovies, getCombos, getPrices, getNews } from "../services/movieServices";
import { Movie } from "../types/Movies";
import { Combos } from "../types/Combos";
import { Prices } from "../types/Prices";
import { News } from "../types/News";

export function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [combos, setCombos] = useState<Combos[]>([]);
    const [prices, setPrices] = useState<Prices | null>(null);
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true; 

        const fetchMovies = async () => {
            try {
                const [moviesResponse, combosResponse, priceResponse, newsResponse] = await Promise.all([
                    getMovies(),
                    getCombos(),
                    getPrices(),
                    getNews(),
                ]);

                if (isMounted) {
                    setMovies(moviesResponse?.movies || []);
                    setCombos(combosResponse?.combos || []);
                    setPrices(priceResponse || null);
                    setNews(newsResponse?.movieNews || []);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Erro ao carregar os filmes.");
                }
                console.error("Erro ao buscar dados:", err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchMovies();

        return () => {
            isMounted = false; // Cancela atualizações se o componente desmontar
        };
    }, []);

    return { movies, combos, prices, news, loading, error };
}
