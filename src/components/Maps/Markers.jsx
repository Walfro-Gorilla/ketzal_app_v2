import { Marker, Popup } from 'react-leaflet';
import { useFirestore } from '../../hooks/useFirestore';
import { useEffect } from 'react';
import { Col, Row } from 'antd';


const Markers = (props) => {



    // const { items } = data;

    return (
        <>
            {
                props.data.map((item) => (
                    <Marker
                        key={item.nanoid}
                        position={item.currentPosition}

                    >
                        <Popup>
                            <Row>
                                <Col span={24}>
                                    {item.nombre}
                                </Col>
                                <Col span={24}>
                                    {item.poke}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    lat:{item.currentPosition.lat}
                                </Col>
                                <Col>
                                    lng:{item.currentPosition.lng}
                                </Col>
                            </Row>
                        </Popup>
                    </Marker>
                ))
            }
        </>
    )
};

export default Markers