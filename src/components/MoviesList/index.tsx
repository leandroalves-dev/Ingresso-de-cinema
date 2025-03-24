import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Hooks
import { useMovies } from "../../hooks/useMovies";
//Icons
import { FiShoppingCart  } from "react-icons/fi";

//Components
import Loading from "../Loading";
import Pagination from "../Pagination";
import Data from "../Data";
import Modal from "../Modal";
import MovieUnavailable from "../MovieUnavailable";

//Types
import { Movie, Room } from "../../types/Movies";

//Context
import { MovieContext } from "../../context/MovieContext";


export default function MovieList(){

    const { setSelectedMovie } = useContext(MovieContext);
    
    const { movies, loading, error } = useMovies();
    const [ currentPage, setCurrentPage ] = useState(1);

    const [sinopse, setSinopse] = useState<Movie | null>(null);
    const [showSinopseModal, setShowSinopseModal] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

    const navigate = useNavigate();

    const handleFilterMovies = (movies: Movie[], date: string | null) => {
        setFilteredMovies(movies);
        setSelectedDate(date);
    };

    const moviesToDisplay = selectedDate ? filteredMovies : movies;

    //Paginação
    const moviesPerPage = 4;
    const totalPages = Math.ceil(moviesToDisplay.length / moviesPerPage);
    const lastMovie = currentPage * moviesPerPage;
    const firstMovie = lastMovie - moviesPerPage;
    const currentMovies = moviesToDisplay.slice(firstMovie, lastMovie);
    //Fim Paginação

    if(loading) return <Loading />
    if(error) return <p>{error}</p>

    const handleSelectTime = (movie: Movie, room: Room, time: string, language: string) => {

        console.log('Data selecionada', selectedDate)
    
        if (selectedDate === null) {
            setShowModal(true)
            return;
        }

        // Salva o filme selecionado no contexto
        setSelectedMovie({
            movie,
            room,
            time,
            language,
            selectedDate,
        });

        navigate("/seats");
    }

    const handleSinopse = (movie: Movie) => {
        setSinopse(movie)
        setShowSinopseModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const closeModalSinopse = () => {
        setShowSinopseModal(false)
    }

    return(
        <div className="mt-5 pb-8">

            <Data onFilterMovies={handleFilterMovies} />
            
            {currentMovies.length === 0 ? (
                <MovieUnavailable />
            ):(
                currentMovies.map(movie => (
                    <div key={movie.id} className="flex flex-row justify-between max-lg:flex-col text-white mb-10">
                        
                        <div className="w-full xl:w-2/3 flex flex-row mb-10">
                            <Link to={`/details-movies/${movie.id}`}>
                                <img src={movie.image} alt={movie.title} className="w-48 max-xl:w-48" />
                            </Link>
                            <div className="flex flex-col pl-7">
                                <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                                <h2 className="mb-4">Gênero: {movie.genre}</h2>
                                
                                <div className="flex flex-row gap-5 mb-3">
                                    <div className="bg-yellow-400 text-white rounded-[5px] p-2.5 text-[18px]">
                                        {movie.classification}
                                    </div>
                                    <div className="border-neutral-400 border-2 rounded-[5px] p-2.5 px-5 text-[18px]">
                                        {movie.duration}
                                    </div>
                                </div>
                                <p className="hover:underline cursor-pointer" onClick={() => handleSinopse(movie)}>Sinopse do filme</p>
                            </div>
                        </div>
                     
                        <div className="w-full xl:w-2/3 flex flex-col">
                            {movie.rooms.map(room => (
                                <div key={room.id}>
                                    <h2 className="border-neutral-400 border-2 rounded-[5px] p-2.5 px-5 text-[18px] inline-block">{room.name}</h2>
                                    
                                    <div className="my-5">
                                        {Object.entries(room.showtimes).map(([language, times]) => (
                                        <div key={language} className="mb-3 flex flex-row gap-10">
                                                {times.map((time, index) => (
                                                    <div key={index} className="flex items-center justify-between rounded-[3px] pl-4 w-full bg-neutral-800 text-white">
                                                        <span>{language === 'dub' ? 'Dub' : 'Leg'}</span>
                                                        <span>{time}</span>
                                                        <button
                                                            className="bg-[#990000] h-[50px] w-[50px] rounded-br-[3px] rounded-tr-[3px]  flex items-center justify-center cursor-pointer text-[18px]"
                                                            onClick={() => handleSelectTime(movie, room, time, language)}
                                                        >
                                                            <FiShoppingCart />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>

                                </div> 
                            ))}
                        </div>
                    </div>
                ))
            )}

            {currentMovies.length !== 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )} 

            {showSinopseModal && sinopse && (
                <Modal title="Sinopse" className="max-w-[1200px]">
                    <button className="absolute top-0 right-0 text-white bg-red-800 px-2 pb-1 text-xl" onClick={closeModalSinopse}>x</button>
                    <div className="grid grid-cols-2 gap-12">
                        <div className="mt-10 leading-7">
                            <p>{sinopse.description}</p>
                        </div>
                        <div>
                            {sinopse.video && (
                                <div className="content">
                                    <iframe
                                        src={sinopse.video}
                                        width='100%'
                                        height='315'
                                        title='CineSphere'
                                        allow='accelerometer; autoplay;'
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
            )} 

          
            {showModal && (
                <Modal title="Opss..." className="max-w-[350px]">
                    <button className="absolute top-0 right-0 text-white bg-red-800 px-2 pb-1 text-xl" onClick={closeModal}>x</button>
                    <p>Você precisa escolher uma data para ver o filme!</p>
                </Modal>
            )}          

        </div>
    )

}