import React from 'react';
// importamos los estilos
import './GiftCard.css';
// importamos Confetti
import Confetti from 'react-confetti'
import ImgCarousel from '../../components/carousel/ImgCarousel';
import Footer from '../../components/footer/Footer';
import { Carousel, Row } from 'antd';



const GiftCard = () => {
    const sender = {
        name: 'Tu',
        message: '¡Feliz cumpleaños! ',
    };

    const recipient = {
        name: 'Ser Querido',
    };

    const gift = {
        name: 'Tour turístico a Basaseachi',
        description: '🛌🏽 Hospedaje x 2 noches, 🍝 2 desayuns y 1 comida, 🚌 Autobus ida y vuelta, 🤼 Guias turisticos',
        // price: '$99.99',
    };

    const audioUrl = 'https://www.youtube.com/watch?v=S03T47hapAc&list=OLAK5uy_muYdOarbYhS_nNCTsnpv_nA_E3MhmddAM&index=1'; // Reemplaza VIDEO_ID con el ID del video de YouTube


    return (
        <>
            <Confetti />
            <Row>
                <br />
                <div className="gift-card">
                    <h2>Alguien que te quiere mucho te acaba de regalar un viaje 💚 </h2>
                    <p>De: {sender.name}</p>
                    <p>Para: {recipient.name}</p>
                </div>


                <div className="message">
                    <h3>Mensaje del remitente:</h3>
                    <p>{sender.message}</p>
                </div>
                <div className="gift-info">
                    <h3>Información del regalo:</h3>
                    <h4>{gift.name}</h4>
                    <p>{gift.description}</p>
                    {/* <p>Precio: {gift.price} dlls</p> */}
                </div>
                <ImgCarousel />
           


            </Row>
        </>

    );
};

export default GiftCard;
