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
    const [scheduleReady, setScheduleReady] = useState(false);
    const navigate = useNavigate();

    const handleFilterMovies = useCallback((movies: Movie[], date: string | null) => {
        setFilteredMovies(movies);
        setSelectedDate(date);
        setCurrentPage(1);
        setScheduleReady(true);
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

            {!scheduleReady ? null : currentMovies.length === 0 ? (
                <MovieUnavailable />
            ) : (
                <div className="movie-schedule-list space-y-7 lg:space-y-8">
                    {currentMovies.map((movie, index) => (
                        <article key={movie.id} className="movie-schedule-item grid gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-7">
                            <div className="flex min-w-0 gap-3 lg:gap-4">
                                <Link to={`/details-movies/${movie.id}`} className="movie-schedule-poster block w-20 shrink-0 self-start md:w-28 lg:w-40">
                                    <img src={movie.image} alt={movie.title} loading={index === 0 ? "eager" : "lazy"} decoding="async" fetchPriority={index === 0 ? "high" : "auto"} className="aspect-[2/3] w-full rounded-md border border-white/25 object-cover" />
                                </Link>
                                <div className="movie-schedule-info min-w-0 pt-1">
                                    <p className="section-eyebrow mb-2">Em cartaz</p>
                                    <h2 className="text-base font-semibold leading-tight text-[#f7f7f7] sm:text-lg lg:text-2xl">{movie.title}</h2>
                                    <p className="mt-2 text-xs text-[#b9b9b9] sm:text-sm">Gênero {movie.genre}</p>
                                    <div className="mt-2 flex flex-wrap gap-1.5 lg:mt-3 lg:gap-2">
                                        <Badge variant="warning">{movie.classification}</Badge>
                                        <Badge variant="outline"><Clock3 size={13} className="mr-1.5" /> {movie.duration}</Badge>
                                    </div>
                                    <button type="button" onClick={() => setSynopsis(movie)} className="movie-schedule-synopsis mt-3 inline-flex items-center gap-1.5 text-[0.65rem] font-semibold text-[#b9b9b9] no-underline transition-colors hover:text-white lg:mt-4 lg:gap-2 lg:text-xs">
                                        <Play size={12} className="text-[#ff252d] lg:h-3.5 lg:w-3.5" /> Sinopse do filme
                                    </button>
                                </div>
                            </div>

                            <div className="movie-schedule-sessions pt-1">
                                {movie.rooms.map((room) => <CinemaRoomSection key={room.id} room={room} onSelectTime={(time, language) => handleSelectTime(movie, room, time, language)} />)}
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {currentMovies.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}

            {synopsis && (
                <Modal title="Sinopse" className="synopsis-modal max-w-6xl">
                    <button className="synopsis-modal-close absolute right-5 top-5 text-[#b9b9b9] transition-colors hover:text-white" onClick={closeSynopsis} aria-label="Fechar sinopse"><X size={22} /></button>
                    <div className="synopsis-modal-layout grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.45fr)] lg:items-center">
                        <div className="synopsis-modal-copy">
                            <p className="synopsis-modal-description leading-7 text-[#b9b9b9]">{synopsis.description}</p>
                        </div>
                        {synopsis.video && (
                            <div className="synopsis-modal-video overflow-hidden rounded-lg">
                                <iframe src={synopsis.video} className="aspect-video w-full" title="Trailer do CineSphere" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                            </div>
                        )}
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
