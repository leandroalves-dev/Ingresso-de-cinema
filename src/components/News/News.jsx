/* eslint-disable no-undef */
import './News.css';

import { Link, useLocation } from 'react-router-dom';

// json
import news from '../../data/movienews.json';       

const News = () => {

    const location = useLocation();
    const imagePrefix = location.pathname === '/' ? './' : '../';

    return (
        <article className='container-news'>
            <div className="container">
                <h1>Últimas notícias</h1>
                <p>Fique por dentro de tudo que rola no mundo do cinema!</p>

                <div className="grid-news">
                    
                    {news.movieNews.map((newsItem, index) => (
                        <div className="news" key={index}>
                            <img src={`${imagePrefix}images/${newsItem.image.split('/').pop()}`} alt={newsItem.title} title={newsItem.title}  />
                            <Link to={`/details-news/${newsItem.id}`}>{newsItem.title}</Link>
                            <span className='data'>{newsItem.data}</span>
                        </div>
                    ))}
                    
                </div>
            </div>
        </article>
    )
}

export default News