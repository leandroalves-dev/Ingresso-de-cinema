import { useParams } from "react-router-dom"
//components
import Container from "../Container"
//hooks
import { useMovies } from "../../hooks/useMovies"
import { BsInfoCircle } from "react-icons/bs"

const DetailsNews = () => {

    const { id } = useParams()
    const { news } = useMovies()

    const newsItem = news.find(item => item.id.toString() === id)
  
    return (
        <Container>
            <div className="my-6">      

                {newsItem ? (
                    <>
                        <img src={newsItem.image} alt={newsItem.title} className="w-full object-cover border-4 border-neutral-800" />
                        <h1 className="my-5 text-white text-[26px]">{newsItem.title}</h1>
                        <p className="text-neutral-500">{newsItem.news}</p>
                    </>
                ):(
                    <div className="flex flex-col h-100 items-center justify-center text-neutral-700 text-[24px] bg-neutral-900 m-4 mb-10">
                        <BsInfoCircle size={45}  className="text-neutral-800" />
                        <p>Desculpe, mas não encontramos essa notícia!!!</p>
                    </div>
                )}
               
            </div>
        </Container>
    )
}

export default DetailsNews
    