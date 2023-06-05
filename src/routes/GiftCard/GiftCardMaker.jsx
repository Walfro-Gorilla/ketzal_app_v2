import React, { useState } from 'react';
import './GiftCardMaker.css';

const GiftCardForm = () => {
    const [isFront, setIsFront] = useState(true);
    const [monto, setMonto] = useState(250);
    const [titulo, setTitulo] = useState('');
    const [de, setDe] = useState('');
    const [para, setPara] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleClick = () => {
        setIsFront(!isFront);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar el formulario
    };

    return (
        <div className="client-review-area client-review-area-home pd-top-70" style={{ marginBottom: "0px" }}>
            <div className="container">
                <h3 className="text-center">CONFIGURA TU TARJETA DE REGALO</h3>

                <div className="row">
                    <div className="col-lg-4">
                        <p className="sub-title">Estilo:</p>
                        <select className="form-control mb-2">
                            <option value={1}>Generica</option>
                            <option value={2}>Navidad</option>
                            <option value={3}>San Valentin</option>
                        </select>
                    </div>
                    <div className="col-lg-8">
                        <p className="sub-title">Elije el importe:</p>
                        <div className="row">
                            <div className="col-lg-7">
                                <select className="form-control mb-2" onChange={(e) => setMonto(e.target.value)}>
                                    <option value={250}>$250 mxn</option>
                                    <option value={500}>$500 mxn</option>
                                    <option value={1000}>$1,000 mxn</option>
                                </select>
                            </div>
                            <div className="col-lg-5">
                                <input type="text" className="form-control mb-2" placeholder="Otro importe" />
                            </div>
                        </div>
                    </div>
                </div>

                <p className="sub-title">Titulo:</p>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Escribe el titulo de tu tarjeta..."
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />

                <div className="row">
                    <div className="col-lg-6">
                        <p className="sub-title">De:</p>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Tu nombre...."
                            value={de}
                            onChange={(e) => setDe(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-6">
                        <p className="sub-title">Para:</p>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="A quien le regalaras..."
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                        />
                    </div>
                </div>

                <p className="sub-title">Mensaje:</p>
                <textarea
                    className="form-control mb-2"
                    name="descripcion"
                    id="1"
                    placeholder="Máximo 200 caracteres"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />

                <button className="btn btn-dark btn-block" type="submit" onClick={handleSubmit}>
                    Comprar
                </button>
            </div>

            <div className="container">


                <div className="row">
                    <div className="col-lg-12">
                        {/* Div para la tarjeta digital de regalo */}
                        <div className={`tarjeta-digital ${isFront ? "" : "volteada"}`} onClick={handleClick}>
                            <div className="cara frontal">
                                {/* Contenido frontal de la tarjeta */}
                                <h4>Contenido Frontal</h4>
                            </div>
                            <div className="cara trasera">
                                {/* Contenido trasero de la tarjeta */}
                                <h4>Contenido Trasero</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default GiftCardForm;
