import { Col, Row } from 'antd';
import { Circle, Marker, Popup } from 'react-leaflet';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from '@fortawesome/free-solid-svg-icons';


const MarkerCurrentP = (props) => {



    return (
        <>
            <Circle center={props.currentPosition} pathOptions={{ fillColor: 'green' }} radius={2000} />
            <Marker
                position={props.currentPosition}
                draggable
                >
                <Popup >
                    <Row>
                        <Col span={24}>
                            {props.currentPosition.lat}
                        </Col>
                        <Col span={24}>
                            {props.currentPosition.lng}
                        </Col>
                    </Row>
                </Popup>
            </Marker>

        </>
    )
}

export default MarkerCurrentP