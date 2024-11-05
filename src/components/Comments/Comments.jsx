import './Comments.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsChatLeftDots, BsChevronLeft, BsChevronRight, BsHandThumbsDownFill, BsHandThumbsUpFill } from 'react-icons/bs';

const Comments = ({ onComments }) => {
    const [comments, setComments] = useState(onComments.comments || []);
    const [currentIndex, setCurrentIndex] = useState(0); 

    useEffect(() => {
        setComments(onComments.comments || []);
    }, [onComments]);

    const carouselComments = (position) => {
        const totalSlides = comments.length
        setCurrentIndex(index => (index + position + totalSlides) % totalSlides);
    }

    return (
        <div className='comments'>
            <div className="title">
                <BsChatLeftDots />
                <h4>Comentários</h4>
                <div className="qtda">{comments.length}</div>
            </div>

            <div className="carousel-container">
                <div className="carousel-comments">
                    {comments.map((comment, index) => (
                        <div key={`${comment.id}-${index}`} className={`comment-item ${index === currentIndex ? 'active' : ''}`}>
                            <div className="text">
                                <h4>{comment.user}</h4>
                                <p>{comment.text}</p>
                            </div>
                            <div className={`reviews ${comment.review >= 3.5 ? 'like' : 'no-like'} `}>
                                {comment.review >= 3.5 ? <BsHandThumbsUpFill /> : <BsHandThumbsDownFill />} {comment.review.toFixed(1)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <button className="carousel-btn prev" onClick={() => carouselComments(-1)}><BsChevronLeft /></button>
            <button className="carousel-btn next" onClick={() => carouselComments(1)}><BsChevronRight /></button>

            <Link to='/' className='btn-programation'>Programação</Link>
        </div>
    );
};

export default Comments;
