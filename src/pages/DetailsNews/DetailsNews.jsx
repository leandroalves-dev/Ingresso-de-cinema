/* eslint-disable no-undef */
import './DetailsNews.css';
import { useParams } from 'react-router-dom';
import news from '../../data/movienews.json';

const DetailsNews = () => {
    const { id } = useParams();

    // Converter o ID para um número inteiro
    const newsItem = news.movieNews.find(item => item.id === Number(id));

    if (!newsItem) {
        return <p>Notícia não encontrada.</p>;
    }
    
    return (
        <div className="container">
            <div className="details-news">
                <div className="poster">
                    <img src={`./images/${newsItem.image.split('/').pop()}`} alt={newsItem.title} />
                </div>
                <h2>{newsItem.title}</h2>
                <p>{newsItem.news}</p>
            </div>
        </div>
    );
}

export default DetailsNews;
