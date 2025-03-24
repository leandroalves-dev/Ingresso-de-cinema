import { useParams } from "react-router-dom"
import { useState } from "react";

//icons
import { BsInfoCircle, BsPlayBtnFill } from "react-icons/bs";

//hooks
import { useMovies } from "../../hooks/useMovies";

//components
import Container from "../../components/Container";
import Modal from "../../components/Modal";
import StarRating from "../../components/StarRating";
import Comments from "../../components/Comments";

//types
import { Movie } from '../../types/Movies';

const DetailsMovies = () => {
    
    const { id } = useParams<{ id: string}>();
    const { movies } = useMovies();

    const [modal, setModal] = useState(false);
    const [video, setVideo] = useState<Movie | null>(null);

    const movie = movies.find(movie => movie.id === Number(id))
    
    const handleVideo = (movie: Movie) => {
        setVideo(movie)
        setModal(true)
    }

    return (
        <Container>
            {!movie ? (
                <div className="flex flex-col h-100 items-center justify-center text-neutral-700 text-[24px] bg-neutral-900 m-4 mb-10">
                    <BsInfoCircle size={45}  className="text-neutral-800" />
                    <p>Desculpe, filme não encontrado</p>
                </div> 
            ):(
                <div className="my-6 flex justify-between items-start flex-col lg:flex-row">
                    <div className="flex gap-10 mr-8">
                        <div className="max-w-[300px]"><img src={movie.image} alt={movie.title}  /></div>
                        <div>
                            <h1 className="text-[26px] text-white mb-3">{movie.title}</h1>
                            <p className="text-white mb-3">Gênero: {movie.genre}</p>
                            <div className="mb-3 flex gap-3 items-center text-white">
                                <span>Duração:</span>
                                <span className="border-2 border-neutral-800 rounded-[3px] p-2 px-5">{movie.duration}</span>
                                <span className="bg-yellow-400 p-2 px-5 rounded-[3px]">{movie.classification}</span>
                                <span className="cursor-pointer" onClick={() => handleVideo(movie)}><BsPlayBtnFill size={55} /></span>
                            </div>
                            <span className="text-white mb-3 flex items-center">Avaliação: <StarRating rating={movie.avaliation} /></span>
                            <p className="text-neutral-600 mb-3"><strong className="text-white font-normal">Sinopse:</strong> {movie.description}</p>
                            <p className="text-neutral-600 mb-3"><strong className="text-white font-normal">Elenco:</strong> {movie.cast}</p>
                            <p className="text-neutral-600"><strong className="text-white font-normal">Direção:</strong> {movie.direction}</p>
                        </div>
                    </div>    
                    <div className="w-full mt-10 lg:mt-0">
                        <Comments comments={movie.comments} />
                    </div>
                </div>   
            )}

            {modal && video && (
                <Modal title="Assista o trailer" className="max-w-[800px]">
                    <button className="absolute top-0 right-0 text-white bg-red-800 px-2 pb-1 text-xl" onClick={() => setModal(false)}>x</button>
                    <div className="grid-video">
                        {video.video && (
                            <div className="content">
                                <iframe
                                    src={video.video}
                                    width='100%'
                                    height='400'
                                    title='CineSphere'
                                    allow='accelerometer; autoplay;'
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                </Modal>
            )}

                   
        </Container>
    )
}

export default DetailsMovies
