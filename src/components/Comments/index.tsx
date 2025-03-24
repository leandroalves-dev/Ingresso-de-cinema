import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BsChatLeftDots, BsChevronLeft, BsChevronRight, BsHandThumbsDownFill, BsHandThumbsUpFill } from 'react-icons/bs';

import { Comment } from '../../types/Movies'; 

interface CommentsProps {
    comments: Comment[];
}

const Comments = ({comments}: CommentsProps) => {

    
    const [currentIndex, setCurrentIndex] = useState(0); 

    const carouselComments = (position: number) => {
        const totalSlides = comments.length
        setCurrentIndex(index => (index + position + totalSlides) % totalSlides);
    }

    return (
        <div>
            <div className="flex items-center gap-4 text-white">
                <BsChatLeftDots size={22} />
                <h2>Comentários</h2>
                <span className='bg-red-700 p-1 px-3 text-[14px] rounded-[50%]'>{comments.length}</span>
            </div>


            <div className='relative'>
                <div className='flex text-center rounded-[3px] bg-neutral-900 p-5 px-8 mt-6'>
                    {comments.length > 0 && (
                        <div key={comments[currentIndex].user + currentIndex} className='block w-full'>
                            <div>
                                <h4 className='text-white mb-3'>{comments[currentIndex].user}</h4>
                                <p className='text-neutral-600 leading-5 text-[14px]'>{comments[currentIndex].text}</p>
                            </div>
                            <div className='text-white flex justify-center items-center gap-2 mt-4'>
                                {comments[currentIndex].review >= 3.5 ? <BsHandThumbsUpFill color='green' />: <BsHandThumbsDownFill color='red' />} {comments[currentIndex].review.toFixed(1)}
                            </div>
                        </div>
                    )}
                </div>

                <div className='text-white absolute w-full bg-red-600 top-[50%]'>
                    <button className='cursor-pointer absolute left-2' onClick={() => carouselComments(-1)}><BsChevronLeft /></button>
                    <button className='cursor-pointer absolute right-2' onClick={() => carouselComments(1)}><BsChevronRight /></button>
                </div>
            </div>

            <Link to='/' className='w-full bg-red-700 flex justify-center py-3 rounded-[3px] text-white mt-8'>Programação</Link>

        </div>
    )
}

export default Comments
