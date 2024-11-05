/* eslint-disable no-undef */
import './DetailsNews.css';

import { useParams } from 'react-router-dom';
import news from '../../data/movienews.json'

const DetailsNews = () => {

    const { id } = useParams();
    const newsItem = news.movieNews.find(item => item.id === parseInt(id));

    if (!newsItem) {
        return <p>Notícia não encontrada.</p>;
    }
    
    return (
        <div className="container">
            <div className="details-news">
                <div className="poster">
                    <img src={`/${newsItem.image}`} />
                </div>
                <h2>{newsItem.title}</h2>
                <p>{newsItem.news}</p>
            </div>
        </div>
    )
}

export default DetailsNews