import './HoursMovies.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

//icons
import { BsCart } from 'react-icons/bs';


const HoursMovies = ({ onAvailableMovies, onMovie, onSetLoading }) => {


    const [selectedDay, setSelectedDay] = useState(null); 
    const [selectedMonth, setSelectedMonth] = useState(null);  
    const [selectedTime, setSelectedTime] = useState(null);

    const navigate = useNavigate();
    
    const handleSelectTime = (movieId, roomId, time, language) => {
        onSetLoading(true);

        const movie = onAvailableMovies.find(m => m.id === movieId); // Busca o filme selecionado
        const room = movie.rooms.find(r => r.id === roomId); // Busca a sala selecionada

        // Guarda o filme, a sala e o horário selecionado
        setSelectedTime({ movieId, roomId, time, language });

            setTimeout(() => {
                onSetLoading(false);
                // Navega para a página de assentos, passando todas as informações necessárias
                navigate('/seats', {
                    state: {
                        movie,       // Envia as informações do filme
                        room,        // Envia as informações da sala
                        time,        // Envia o horário selecionado
                        language,     // Envia o idioma selecionado
                        day: selectedDay, // Envia o dia selecionado
                        month: selectedMonth // Envia o mês selecionado
                    }
                });
            }, 1000);
    };

    return (
        <>  
            {onMovie.rooms.map((room) => (
                <div key={room.id} className="room">
                    <h3>{room.name}</h3>
                    
                        {Object.entries(room.showtimes).map(([language, times]) => (
                            <div key={`${room.id}-${language}`} className='list-hours'>
                                {times.map((time) => (
                                    <div key={`${room.id}-${language}-${time}`}>
                                        <span>{language === "dub" ? "Dub" : "Leg"}</span>
                                        <span>{time}</span>
                                        <span 
                                            className={`btn-cart ${selectedTime && selectedTime.movieId === onMovie.id && selectedTime.roomId === room.id && selectedTime.time === time && selectedTime.language === language ? "selected" : ""}`} 
                                            onClick={() => handleSelectTime(onMovie.id, room.id, time, language)}
                                        >
                                            <BsCart />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    
                </div>
            ))}
        </>
    )
}

export default HoursMovies