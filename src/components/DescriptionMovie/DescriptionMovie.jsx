/* eslint-disable no-undef */
import './DescriptionMovie.css';
import { useLocation } from 'react-router-dom';

// icons
import { BsPlayBtnFill } from 'react-icons/bs';

//components
import Classification from '../Classification/Classification';
import StarRating from '../StarRating/StarRating';
import Comments from '../Comments/Comments';

const DescriptionMovie = ({ onHandleVideo }) => {

    const location = useLocation();
    const movie = location.state.movie;

    return (
        <div className="grid-details">
            <div className="col-poster">
                <img src={`${movie.image}`} alt="" />
            </div>
            <div className="col-description">
                <h1>{movie.title}</h1>
                <p><strong>Gênero: </strong>{movie.genre}</p>
                <div>
                    <p><strong>Duração: </strong><span>{movie.duration}</span></p>
                    <p><Classification onMovie={movie} /></p>
                    <span onClick={() => onHandleVideo(movie)}><BsPlayBtnFill /></span> 
                </div>
                <div><strong>Avaliação: </strong><StarRating rating={movie.avaliation} /></div>
                <div className="description">
                <p><strong>Sinopse:</strong> {movie.description}</p>
                    
                </div>

                <div className="description">
                    <p><strong>Elenco:</strong> {movie.cast.join(', ')}</p>
                </div>

                <div className="description">
                    <p><strong>Direção:</strong> {movie.direction}</p>
                </div>                    
            </div>
    
            <div className="col-comments">
                <Comments onComments={movie} />
            </div>

        </div>
    )
}

export default DescriptionMovie