/* eslint-disable no-undef */
import './News.css';

import { Link } from 'react-router-dom';

// json
import news from '../../data/movienews.json';       

const News = () => {

    return (
        <article className='container-news'>
            <div className="container">
                <h1>Últimas notícias</h1>
                <p>Fique por dentro de tudo que rola no mundo do cinema!</p>

                <div className="grid-news">
                    
                    {news.movieNews.map((news, index) => (
                        <div className="news" key={index}>
                            <img src={`/${news.image}`} alt={news.title} title={news.title}  />
                            <Link to={`/details-news/${news.id}`}>{news.title}</Link>
                            <span className='data'>{news.data}</span>
                        </div>
                    ))}
                    
                </div>
            </div>
        </article>
    )
}

export default News