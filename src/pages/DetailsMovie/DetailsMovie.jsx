import './DetailsMovie.css';

import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// component
import Modal from '../../components/Modal/Modal';
import Data from '../../components/Data/Data';
import Loading from '../../components/Loading/Loading';
import ShowTimes from '../../components/ShowTimes/ShowTimes';
import DescriptionMovie from '../../components/DescriptionMovie/DescriptionMovie';
import News from '../../components/News/News';

const DetailsMovie = () => {

    const location = useLocation();
    const movie = location.state.movie;
    const [loading, setLoading] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null); 
    const [selectedMonth, setSelectedMonth] = useState(null);
    
    const [showModal, setShowModal] = useState(false);
    const [video, setVideo] = useState(null);

    // Estado para controlar a visibilidade dos horários das salas
    const [showTimesVisible, setShowTimesVisible] = useState(false);

    // Estado para rastrear o horário selecionado
    const [selectedButton, setSelectedButton] = useState(null);

    const navigate = useNavigate();

    // Definindo o dia e o mês atuais na montagem do componente
    useEffect(() => {
        const today = new Date();
        setSelectedDay(today.getDate());
        setSelectedMonth(today.getMonth() + 1); // O mês começa em 0, então adicionamos 1
    }, []);

    // Atualiza o estado para o filme cuja sinopse foi clicada
    const handleVideo = (movie) => {
        setVideo(movie);
        setShowModal(true);
    }

    const handleDaySelect = (day, month) => {
        setSelectedDay(day);
        setSelectedMonth(month);
    
        const selectedDate = formatDate(day, month);
        
        // Verifica se a data selecionada está entre as datas de exibição
        if (movie.showDates.includes(selectedDate)) {
            console.log("A data selecionada coincide com uma data de exibição do filme.");
            setShowTimesVisible(true)
        } else {
            console.log("A data selecionada NÃO coincide com as datas de exibição do filme.");
            setShowTimesVisible(false)
        }
    };
    
    // Função para formatar a data selecionada para YYYY-MM-DD
    const formatDate = (day, month) => {
        // Verifica se `day` já está no formato completo "YYYY-MM-DD"
        if (day && day.includes('-') && !month) {
            return day; // Se já está no formato, retorna diretamente
        }

        const year = new Date().getFullYear(); // Pega o ano atual

        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        
        // Retorna a data formatada no padrão "YYYY-MM-DD"
        return `${year}-${formattedMonth}-${formattedDay}`; 
    };

    // Função para selecionar horário
    const handleSelectTime = (movieId, roomId, time, language) => {

        setLoading(true);
       
        const room = movie.rooms.find(roomSelected => roomSelected.id === roomId);

        const newMonth = selectedDay.split('-')[1]
        const newDate = selectedDay.split('-')[2];

        // Verifica o estado quando o button é clicado.
        setSelectedButton({ movieId, roomId, time, language })

        setTimeout( () => {
            setLoading(false)
            navigate('/seats', {
                state: {
                    movie,
                    room,
                    time, 
                    language,
                    day: newDate,
                    month: newMonth
                }
            })
        },1000)
    };

    return (
        <>
            <div className='container'>

                {loading && <Loading />}

                <Data onDaySelect={handleDaySelect} />

                <DescriptionMovie onHandleVideo={handleVideo} />

                {showTimesVisible ? (
                    <ShowTimes onHandleSelectTime={handleSelectTime}  />
                ) : (
                    <p>Não há filmes disponível nessa data</p>
                )}


                {showModal && video && (
                    <Modal>
                        <>
                            <span className="close" onClick={() => setShowModal(false)}>X</span>
                            <div className="grid-video details-video">
                                {video.video && (
                                    <div className="content">
                                        <iframe
                                            src={video.video}
                                            width='100%'
                                            height='450'
                                            title='CineSphere'
                                            allow='accelerometer; autoplay;'
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        </>
                    </Modal>
                )}

            </div>

            <News />
        </>
    )
}

export default DetailsMovie