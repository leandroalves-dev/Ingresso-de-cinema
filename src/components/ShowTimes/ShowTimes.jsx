import './ShowTimes.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// icons
import { BsCart } from 'react-icons/bs';

const ShowTimes = ({ onHandleSelectTime }) => {

    const location = useLocation();
    const movie = location.state.movie;
    const [selectedButton] = useState(null);

    console.log('AQUIII', movie)

    return (
        <div className="showtimes">
            {movie.rooms.map(room => (
                <div key={room.id} className='room'>
                    <h3>{room.name}</h3>
                    {Object.entries(room.showtimes).map(([language, times]) => (
                        <div key={language} className="list-hours">
                            {times.map((time, index) => (
                                <div key={index}>
                                    <span>{language === 'dub' ? 'Dub' : 'Leg'}</span>
                                    <span>{time}</span>
                                    <button
                                        className={`btn-cart ${selectedButton && selectedButton.movieId === movie.id && selectedButton.roomId === room.id && selectedButton.time === time && selectedButton.language === language ? 'selected' : ''}`}
                                        onClick={() => onHandleSelectTime(movie.id, room.id, time, language)}
                                    >
                                        <BsCart />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default ShowTimes