import { Marker, Popup } from 'react-leaflet';



const Markers = (props) => {

    return (
        <>
            <Marker  position={props.currentPosition}>
                <Popup >
                    PUTOOOS!!!
                    {/* {props.currentPosition} */}
                </Popup>
            </Marker>
        </>
    )
}

export default Markers