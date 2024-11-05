/* eslint-disable no-undef */
import './DetailsNews.css';
import { useParams } from 'react-router-dom';
import news from '../../data/movienews.json';

const DetailsNews = () => {
    const { id } = useParams();
    console.log("ID recebido:", id);  // Verifique o ID recebido

    // Converter o ID para um número
    const newsItem = news.movieNews.find(item => item.id === parseInt(id));
    console.log("Item encontrado:", newsItem);  // Verifique o que foi encontrado

    if (!newsItem) {
        return <p>Notícia não encontrada.</p>;
    }
    
    return (
        <div className="container">
            <div className="details-news">
                <div className="poster">
                    <img src={newsItem.image} alt={newsItem.title} /> {/* Ajuste aqui */}
                </div>
                <h2>{newsItem.title}</h2>
                <p>{newsItem.news}</p>
            </div>
        </div>
    );
}

export default DetailsNews;
