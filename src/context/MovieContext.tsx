import { createContext, useState, ReactNode } from "react";
import { MovieSelection } from "../types/Movies";

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
    const [selectedMovie, setSelectedMovie] = useState<MovieSelection | null>(null);

    const resetMovieSelection = () => {
        setSelectedMovie(null);
    };

    return (
        <MovieContext.Provider value={{ selectedMovie, setSelectedMovie, resetMovieSelection }}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext };
