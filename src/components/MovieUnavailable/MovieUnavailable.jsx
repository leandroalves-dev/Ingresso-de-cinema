import './MovieUnavailable.css';

// icons
import { BsInfoCircle } from 'react-icons/bs';

const MovieUnavailable = ({ onSelectedDay, onAvailableMovies }) => {
  return (
    <>
        {/* Verifica se existem filmes para o dia selecionado */}
        {onSelectedDay && onAvailableMovies.length === 0 && (
            <div className="no-movies-message">
                <BsInfoCircle />
                <p>Programação indisponível no momento</p>
                <p>Retorne novamente mais tarde</p>
            </div>
        )}
    </>
  )
}

export default MovieUnavailable