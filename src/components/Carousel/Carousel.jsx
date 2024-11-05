import './Carousel.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';

const Carousel = ({ items, onSelect, slidesToShow }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    // Configurações do carrossel
    const settings = {
        arrows: false,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow || 7,
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
            },
        ],
    };

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        if (onSelect) {
            onSelect(item);
        }
    };

    return (
        <div className="carousel">
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`day-slide ${item === selectedItem ? 'selected-day' : ''}`}
                        onClick={() => handleItemSelect(item)}
                    >
                        {item}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
