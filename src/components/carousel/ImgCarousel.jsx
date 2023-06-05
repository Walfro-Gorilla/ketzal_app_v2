import React from 'react';
import './ImgCarouselStyles.css';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'antd';


import photo1 from '../../assets/media/1.svg'
import photo2 from '../../assets/media/2.svg'
import photo3 from '../../assets/media/3.svg'
import photo4 from '../../assets/media/4.svg'
import photo5 from '../../assets/media/5.svg'
import photo6 from '../../assets/media/6.svg'

function ImgCarousel() {
    const carouselStyle = {
        width: '100%',
        height: '100%',
        margin: '0 auto',
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    return (
        <div name='carousel' className='container' style={carouselStyle}>
            <Carousel autoplay>
                <div>
                    <img src={photo1} alt='Basaseachi' style={imageStyle} />
                </div>
                <div>
                    <img src={photo2} alt='Sierra' style={imageStyle} />
                </div>
                <div>
                    <img src={photo3} alt='Monjes' style={imageStyle} />
                </div>
                <div>
                    <img src={photo4} alt='Arareko' style={imageStyle} />
                </div>
                <div>
                    <img src={photo5} alt='Barrancas' style={imageStyle} />
                </div>
                <div>
                    <img src={photo6} alt='Cusarare' style={imageStyle} />
                </div>
            </Carousel>
        </div>
    );
}

export default ImgCarousel;
