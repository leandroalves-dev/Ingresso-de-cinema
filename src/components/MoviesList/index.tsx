import { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clock3, ExternalLink, Play, X } from "lucide-react";

import { useMovies } from "../../hooks/useMovies";
import Loading from "../Loading";
import Pagination from "../Pagination";
import Data from "../Data";
import Modal from "../Modal";
import MovieUnavailable from "../MovieUnavailable";
import Badge from "../ui/badge";
import CinemaRoomSection from "../Programming/CinemaRoomSection";
import { Movie, Room } from "../../types/Movies";
import { MovieContext } from "../../context/MovieContext";

export default function MovieList() {
    const { setSelectedMovie } = useContext(MovieContext);
    const { loading, error } = useMovies();
    const [currentPage, setCurrentPage] = useState(1);
    const [synopsis, setSynopsis] = useState<Movie | null>(null);
    const [showUnavailableModal, setShowUnavailableModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const navigate = useNavigate();

    const handleFilterMovies = useCallback((movies: Movie[], date: string | null) => {
        setFilteredMovies(movies);
        setSelectedDate(date);
        setCurrentPage(1);
    }, []);

    const moviesPerPage = 4;
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    const currentMovies = filteredMovies.slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage);

    if (loading) return <Loading />;
    if (error) return <p className="py-12 text-center text-[#b9b9b9]">{error}</p>;

    const handleSelectTime = (movie: Movie, room: Room, time: string, language: string) => {
        if (!selectedDate) {
            setShowUnavailableModal(true);
            return;
        }

        setSelectedMovie({ movie, room, time, language, selectedDate });
        navigate("/seats");
    };

    const closeSynopsis = () => setSynopsis(null);

    return (
        <section className="cinematic-section py-10 sm:py-14" aria-labelledby="programming-title">
            <Data onFilterMovies={handleFilterMovies} />

            {currentMovies.length === 0 ? (
                <MovieUnavailable />
            ) : (
                <div className="space-y-5">
                    {currentMovies.map((movie) => (
                        <article key={movie.id} className="surface-card grid gap-6 rounded-sm p-4 sm:p-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-8 lg:p-6">
                            <div className="flex min-w-0 gap-4 sm:gap-6">
                                <Link to={`/details-movies/${movie.id}`} className="block w-24 shrink-0 self-start sm:w-32 lg:w-36">
                                    <img src={movie.image} alt={movie.title} className="aspect-[2/3] w-full rounded-sm border border-white/20 object-cover shadow-[0_12px_24px_rgba(0,0,0,0.35)]" />
                                </Link>
                                <div className="min-w-0 pt-1">
                                    <p className="section-eyebrow mb-2">Em cartaz</p>
                                    <h2 className="text-lg font-semibold leading-tight text-[#f7f7f7] sm:text-2xl">{movie.title}</h2>
                                    <p className="mt-2 text-xs text-[#b9b9b9] sm:text-sm">Gênero {movie.genre}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <Badge variant="warning">{movie.classification}</Badge>
                                        <Badge variant="outline"><Clock3 size={13} className="mr-1.5" /> {movie.duration}</Badge>
                                    </div>
                                    <button type="button" onClick={() => setSynopsis(movie)} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#b9b9b9] underline decoration-[#ff252d]/70 underline-offset-4 transition-colors hover:text-white">
                                        <Play size={14} className="text-[#ff252d]" /> Sinopse do filme
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                                {movie.rooms.map((room) => <CinemaRoomSection key={room.id} room={room} onSelectTime={(time, language) => handleSelectTime(movie, room, time, language)} />)}
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {currentMovies.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}

            {synopsis && (
                <Modal title="Sinopse" className="max-w-4xl">
                    <button className="absolute right-4 top-4 text-[#b9b9b9] hover:text-white" onClick={closeSynopsis} aria-label="Fechar sinopse"><X size={20} /></button>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <p className="leading-7 text-[#b9b9b9]">{synopsis.description}</p>
                        {synopsis.video && <iframe src={synopsis.video} className="aspect-video w-full border border-white/10" title="Trailer do CineSphere" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />}
                    </div>
                </Modal>
            )}

            {showUnavailableModal && (
                <Modal title="Escolha uma data">
                    <button className="absolute right-4 top-4 text-[#b9b9b9] hover:text-white" onClick={() => setShowUnavailableModal(false)} aria-label="Fechar"><X size={20} /></button>
                    <p className="text-sm leading-6 text-[#b9b9b9]">Você precisa escolher uma data para ver o filme.</p>
                    <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#32dfff]" onClick={() => setShowUnavailableModal(false)}><ExternalLink size={15} /> Voltar à programação</button>
                </Modal>
            )}
        </section>
    );
}
