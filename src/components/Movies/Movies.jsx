/* eslint-disable no-undef */
import './Movies.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// icons
import { BsCart } from 'react-icons/bs';

// utils
import moviesData from '../../data/movies.json';

// components
import Modal from '../../components/Modal/Modal';
import Data from '../../components/Data/Data';
import Loading from '../Loading/Loading';
import MovieUnavailable from '../MovieUnavailable/MovieUnavailable';
import Classification from '../../components/Classification/Classification';
import News from '../../components/News/News'

const Movies = () => {
    const [selectedDay, setSelectedDay] = useState(null); 
    const [selectedMonth, setSelectedMonth] = useState(null);  
    const [selectedButton, setSelectedButton] = useState(null); 
    const [sinopse, setSinopse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Definindo o dia e o mês atuais na montagem do componente
    useEffect(() => {
        const today = new Date();
        setSelectedDay(String(today.getDate()).padStart(2, '0')); // Garantir formato 2 dígitos
        setSelectedMonth(String(today.getMonth() + 1).padStart(2, '0')); // Garantir formato 2 dígitos
    }, []);

    // Filtrando filmes com a data atual ou selecionada
    const filteredMovies = () => {
        if (!selectedDay || !selectedMonth) return [];
        
        const selectedDate = `${new Date().getFullYear()}-${selectedMonth}-${selectedDay}`;
        console.log('selectedDate', selectedDate);

        return moviesData.movies.filter(movie => 
            movie.showDates.includes(selectedDate) && 
            movie.rooms.some(room => Object.values(room.showtimes).some(times => times.length))
        );
    };
    
    const availableMovies = filteredMovies();

    const handleDaySelect = (date) => {
        const [, month, day] = date.split('-');
        setSelectedDay(day.padStart(2, '0'));
        setSelectedMonth(month.padStart(2, '0'));
    };

    // Atualiza o estado para o filme cuja sinopse foi clicada
    const handleSinopse = (movie) => {
        setSinopse(movie);
        setShowModal(true);
    }

    const handleSelectTime = (movieId, roomId, time, language) => {
        setLoading(true);

        const movie = availableMovies.find(movieSelected => movieSelected.id === movieId)
        const room = movie.rooms.find(roomSelected => roomSelected.id === roomId);

        setSelectedButton({ movieId, roomId, time, language })

        setTimeout(() => {
            setLoading(false);
            navigate('seats', {
                state: {
                    movie,
                    room,
                    time, 
                    language,
                    day: selectedDay,
                    month: selectedMonth
                }
            });
        }, 1000);
    }

    return (
        <div className='grid-movies'>
            {loading && <Loading />}

            <Data onDaySelect={handleDaySelect} />

            <MovieUnavailable onSelectedDay={selectedDay} onAvailableMovies={availableMovies} />
            
            {availableMovies.map(movie => (
                <div className='list-movie' key={movie.id}>

                    <div className="itens">
                        <div className="grid-itens">
                            <div className="poster">
                                <Link to={`/details/${movie.id}`} state={{ movie }}><img src={`${process.env.PUBLIC_URL}/${movie.image}`} title={movie.title} alt={movie.title} /></Link>
                            </div>
                            <div className="information">
                                <h2>{movie.title}</h2>
                                <span>Gênero: {movie.genre}</span>
                                <div className="time">
                                    <Classification onMovie={movie} />
                                    <div className="duration">{movie.duration}</div>
                                </div>
                                <a className="sinopse" onClick={() => handleSinopse(movie)}>Sinopse do filme</a>
                            </div>
                        </div>
                    </div>

                    <div className="itens">
                        {movie.rooms.map(room => (
                            <div key={room.id} className='room'>
                                <h3>{room.name}</h3>

                                {Object.entries(room.showtimes).map(([language, times]) => (
                                    <div key={language} className="list-hours">
                                        {times.map((time, index) => (
                                            <div key={index}>
                                                <span>{language === 'dub' ? 'Dub' : 'Leg'}</span>
                                                <span>{time}</span>
                                                <button className={`btn-cart ${selectedButton && selectedButton.movieId === movie.id && selectedButton.roomId === room.id && selectedButton.time === time && selectedButton.language === language ? 'selected' : ''}`} onClick={() => handleSelectTime(movie.id, room.id, time, language)}><BsCart /></button>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <News />

            {showModal && sinopse && (
                <Modal>
                    <>
                        <span className="close" onClick={() => setShowModal(false)}>X</span>
                        <div className="grid-sinopse">
                            <div className="grid-description">
                                <h2>Sinopse</h2>
                                <div className="content">
                                    <p>{sinopse.description}</p>
                                </div>
                            </div>
                            <div className="grid-video">
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
                    </>
                </Modal>
            )}
        </div>
    );
};

export default Movies;
