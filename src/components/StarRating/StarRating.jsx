import './StarRating.css';

// icons
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const StarRating = ({ rating  }) => {

    const stars = [];

    for(let i = 1; i <= 5; i++){
        if( i <= rating ){
            stars.push(<BsStarFill key={i} />);
        }else if( i - rating < 1){
            stars.push(<BsStarHalf key={i} />)
        }else{
            stars.push(<BsStar key={i} />);
        }
    }
    
    return (
        <span className='rating'>
            {stars}
        </span>
    )
}

export default StarRating