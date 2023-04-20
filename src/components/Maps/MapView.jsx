import React, { useContext } from 'react'

// importamos los componentes de mapa de leafLeft
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './Markers';

// importamos la data JSON de los lugares de la bd
import { places } from '../../assets/dataGPS.json'
import { UserContext } from '../../context/UserProvider';



const MapView = (props) => {

    // importamos el useLocation para usar la data del home
    const { currentPosition, setCurrentPosition } = useContext(UserContext)


    // console.log("LOCATION: ", currentPosition)


    return (
        <>
            <MapContainer style={{ height: "400px", width: "90%" }} center={currentPosition ? currentPosition : null} zoom={12}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers currentPosition={currentPosition ? currentPosition : null} />

            </MapContainer>
        </>
    )
}

export default MapView