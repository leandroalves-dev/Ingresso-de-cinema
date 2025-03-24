//icons
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface ratingProps{
    rating: number
}

const StarRating = ({ rating }: ratingProps) => {

    const stars = [];

    for(let i = 1; i <= 5; i++){
        if( i <= rating ){
            stars.push(<BsStarFill key={i} />)
        }else if( i - rating < 1 ){
            stars.push(<BsStarHalf key={i} />)
        }else{
            stars.push(<BsStar key={i} />)
        }
    }

    return(
        <div className="flex gap-2 ml-2 text-amber-400">
            {stars}
        </div>
    )

}

export default StarRating;