import { useEffect, useState } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarouselProps {
    days: number[]; 
    selectedDay: number | null;
    onDaySelect: (day: number) => void;
}

const Carousel = ({ days, selectedDay, onDaySelect }: CarouselProps) => {
   
    const [active, setActive] = useState<number | null>(selectedDay);

    useEffect(() => {
        setActive(selectedDay);
    }, [selectedDay]);


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
        <Slider {...settings} className='programming-dates my-8 border-y border-white/10 bg-black/20 px-1 py-3'>
            {days.map((day, index) => (
                <div key={`${day}-${index}`} className='px-1.5 sm:px-2'>
                    <button
                        type="button"
                        className={`w-full rounded-sm border px-3 py-3 text-center text-sm font-semibold text-white transition-all duration-200 sm:py-4 ${active === day ? 'border-[#ff252d] bg-[#d50000] shadow-[0_0_14px_rgba(255,37,45,0.32)]' : 'border-white/15 bg-[#17191a] hover:border-[#ff252d]/70 hover:bg-[#241819]'}`}
                        onClick={() => handleSelectDay(day)}
                        aria-pressed={active === day}
                    >
                        {day}
                    </button>
                </div>
            ))}
        </Slider>
    )
}

export default Carousel
