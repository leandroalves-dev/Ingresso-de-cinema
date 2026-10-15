import { createContext, useState, ReactNode } from "react";
import { MovieSelection } from "../types/Movies";
import { readCheckoutDraft, updateCheckoutDraft } from "../utils/checkoutStorage";

// Tipo para o contexto do filme
interface MovieContextType {
    selectedMovie: MovieSelection | null;
    setSelectedMovie: (movieSelection: MovieSelection) => void;
    resetMovieSelection: () => void;
}

const MovieContext = createContext<MovieContextType>({
    selectedMovie: null,
    setSelectedMovie: () => {},
    resetMovieSelection: () => {},
});

export const MovieProvider = ({ children }: { children: ReactNode }) => {
    const [selectedMovie, setSelectedMovieState] = useState<MovieSelection | null>(() => readCheckoutDraft()?.selectedMovie ?? null);

    const setSelectedMovie = (movieSelection: MovieSelection) => {
        setSelectedMovieState(movieSelection);
        updateCheckoutDraft({ selectedMovie: movieSelection });
    };

    const resetMovieSelection = () => {
        setSelectedMovieState(null);
        updateCheckoutDraft({ selectedMovie: null });
    };

    return (
        <MovieContext.Provider value={{ selectedMovie, setSelectedMovie, resetMovieSelection }}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext };
