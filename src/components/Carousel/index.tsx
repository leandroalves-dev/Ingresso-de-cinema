import { useState } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarouselProps {
    days: number[]; 
    onDaySelect: (day: number) => void;
}

const Carousel = ({ days, onDaySelect }: CarouselProps) => {
   
    const [active, setActive] = useState<number | null>(null);


    //configuração do carousel
    const settings = {
        arrows: false,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2, 
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            }
        ]
    }

    const handleSelectDay = (day: number) => {
        setActive(day);
        onDaySelect(day);
    }

    return (
        <Slider {...settings} className='bg-[#131313] my-5 mb-18 border-1 border-[#100e0e] p-2'>
            {days.map((day, index) => (
                <div key={index} className='px-2'>
                    <div
                        className={`bg-[#990000] text-center p-5 rounded-[4px] text-white text-[18px] ${active === day ? 'bg-neutral-800' : ''}`}
                        onClick={() => handleSelectDay(day)}    
                    >
                        <h1>{day}</h1>
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default Carousel