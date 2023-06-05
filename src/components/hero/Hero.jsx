import './HeroStyles.css'
import { AiOutlineSearch } from 'react-icons/ai'

import React, { useState } from 'react';
import { Input, Button, Alert, message, Modal, Col, Row } from 'antd';
import GiftCard from '../../routes/GiftCard/GiftCard'

import Video from '../../assets/media/video_banner.mp4'
import GiftCardForm from '../../routes/GiftCard/GiftCardForm'



function Hero() {

    const [codigo, setCodigo] = useState('');
    const [showGiftCard, setShowGiftCard] = useState(false);
    const [codigoNoEncontrado, setCodigoNoEncontrado] = useState(false);

    const [messageApi, contextHolder] = message.useMessage()

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí puedes agregar la lógica para verificar el código ingresado
        // y obtener la información relacionada con ese código

        // Simulación de respuesta exitosa
        const giftCardData = {
            // codigo: '3698521478523698',
            codigo: '333333333',
            titulo: 'Feliz Cumpleaños',
            mensaje: '¡Felicidades! Disfruta de tu regalo.',
        };

        // Verifica si el código existe
        if (codigo === giftCardData.codigo) {
            // Actualiza el estado para mostrar el componente GiftCard y pasarle los datos
            setShowGiftCard(true);
            setCodigoNoEncontrado(false);
        } else {
            // Actualiza el estado para mostrar la alerta de código no encontrado
            setShowGiftCard(false);
            setCodigoNoEncontrado(true);
            messageApi.open({
                type: 'warning',
                content: 'Codigo no valido.',
            });
            return
        }

        setCodigo('');

        // Puedes guardar la información de la tarjeta en el estado o en el contexto de la aplicación según tus necesidades
        // Ejemplo: setGiftCardData(giftCardData);
    };

    const handleCancel = () => {
        setShowGiftCard(false)
    }

    return (
        <>
            {contextHolder}
            <div className='hero'>
                <video autoPlay loop muted id='video'>
                    <source src={Video} type='video/mp4' />
                </video>
                <div className="overlay"></div>
                <div className="content">
                    <h1>¿Aburrido? 🥱</h1>
                    <h2>Busca tu siguiente destino🧳</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <div>
                            <input
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                type="text"
                                placeholder='¿A donde vamos?' />
                        </div>
                        <div>
                            <button ><AiOutlineSearch className='icon' /></button>
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                open={showGiftCard}
                width={'90%'}
                centered
                footer={false}
                onCancel={handleCancel}

            >
                <Row>
                    <Col span={24}>
                        <GiftCard />
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default Hero
