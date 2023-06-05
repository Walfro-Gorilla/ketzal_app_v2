import { Card } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components';
import '../../../src/styles.css'
import { Row, Col } from 'antd' //importamos estilos de antd
import { max } from 'moment/moment';


const GiftCardMaker = () => {

    // Variables iniciales
    let publicUrl = process.env.PUBLIC_URL + '/'
    let imgattr = 'logo'
    var img = publicUrl + "assets/img/tarjeta/green-wallpaper.png ";
    var img2 = publicUrl + "assets/img/tarjeta/back.png ";


    // Componentes styled
    const Content = styled.div`
        border: 0px;
        border-radius: 12px;
        background-image: url(${img});
        width: auto;
        height: 300px;
        
        `;
    const ContentBack = styled.div`
        border: 0px;
        border-radius: 12px;
        background-image: url(${img2});
        width: 500px;
        height: 300px;
        `;


    // Hook states para utilizar en la tarjeta de regalo
    const [para, setPara] = React.useState("")
    const [de, setDe] = React.useState("")
    const [monto, setMonto] = React.useState(250)
    const [titulo, setTitulo] = React.useState("Titulo")
    const [estilo, setEstilo] = React.useState("")
    const [mensaje, setMensaje] = React.useState("mENSAJE")



    return (
        <div className="client-review-area client-review-area-home pd-top-70" style={{ marginBottom: "00px" }}>
            <div className="container">
                {/* Titulo de formulario de tarjeta deregalo */}
                <h3 className='text-center' >CONFIGURA TU TARJETA DE REGALO</h3>

                {/* Antd Row and Columns */}
                <Row gutter={[8, 8]}>

                    {/* Forulario de registro de tarjeta de regalo */}
                    <Col xs={24} sm={13}>
                        <form>

                            <div className="row">
                                <div className="col-lg-4">
                                    <p className="sub-title">Estilo:</p>
                                    <select className="form-control mb-2">
                                        <option value={1}>Generica </option>
                                        <option value={2}>Navidad</option>
                                        <option value={3}>San Valentin</option>
                                    </select>
                                </div>
                                <div className="col-lg-8">
                                    <p className="sub-title">Elije el importe:</p>
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <select className="form-control mb-2" onChange={e => setMonto(e.target.value)} >
                                                <option value={250}>$250 mxn </option>
                                                <option value={500}>$500 mxn</option>
                                                <option value={1000}>$1,000 mxn</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-5">

                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                placeholder='Otro importe'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <p className="sub-title">Titulo:</p>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder='Escribe el titulo de tu tarjeta...'
                                onChange={e => setTitulo(e.target.value)}
                            />
                            <div className="row">
                                <div className="col-lg-6">
                                    <p className="sub-title">De:</p>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder='Tu nombre....'
                                        onChange={e => setDe(e.target.value)}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <p className="sub-title">Para:</p>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder='A quien le regalaras...'
                                        onChange={e => setPara(e.target.value)}
                                    />
                                </div>
                            </div>

                            <p className='sub-title'>Mensaje:</p>
                            <textarea
                                className='form-control mb-2'
                                name="descripcion"
                                id="1"
                                placeholder='Maximo 200 cracteres'
                                onChange={e => setMensaje(e.target.value)}
                            >

                            </textarea>


                            <button className="btn btn-dark btn-block" type='submit'>Comprar</button>

                        </form>
                    </Col>

                    {/* Preview de la terjeta de regalo */}
                    <Col xs={24} sm={11} >
                        <div className="carta-box" style={{ border: "0px", borderRadius: "12px", width: "auto", height: "300px" }}>
                            <div className="carta">
                                <div className='cara' style={{ border: "0px", borderRadius: "12px", width: "auto", height: "300px" }} >
                                    <div className="container">

                                        <div className="row" style={{}} >

                                            <div className="col-lg-3" style={{ background: "#C1C1C1", padding: '5px', marginTop: "20px" }}>
                                                <img style={{ left: "0px" }} src={publicUrl + "assets/img/sticky-logo.png"} alt={imgattr} />
                                            </div>
                                            <div className="col-lg-9" style={{ padding: '15px' }}>
                                                <p> ${monto} mxn </p>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12 text-center">
                                                {titulo}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12 alling-botton">
                                                PARA: {para}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>

                </Row>

            </div>
        </div>


    )


}



export default GiftCardMaker