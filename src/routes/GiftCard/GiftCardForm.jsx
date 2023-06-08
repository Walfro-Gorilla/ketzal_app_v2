import React, { useState } from 'react';
import { Input, Button, Alert } from 'antd';
import GiftCard from '../GiftCard/GiftCard'

const GiftCardForm = () => {
    const [codigo, setCodigo] = useState('');
    const [showGiftCard, setShowGiftCard] = useState(false);
    const [codigoNoEncontrado, setCodigoNoEncontrado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí puedes agregar la lógica para verificar el código ingresado
        // y obtener la información relacionada con ese código

        // Simulación de respuesta exitosa
        const giftCardData = {
            codigo: 'ABCDE12345',
            titulo: 'Tarjeta de regalo',
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
        }

        setCodigo('');

        // Puedes guardar la información de la tarjeta en el estado o en el contexto de la aplicación según tus necesidades
        // Ejemplo: setGiftCardData(giftCardData);
    };

    return (
        <div>
            {!showGiftCard && !codigoNoEncontrado && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Código de regalo:
                        <Input
                            type="text"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                    </label>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                </form>
            )}
            {/* {codigoNoEncontrado && (
                <Alert message="Código no encontrado" type="error" showIcon />
            )}
            {showGiftCard && <GiftCard codigo={codigo} />} */}
        </div>
    );
};

export default GiftCardForm;
