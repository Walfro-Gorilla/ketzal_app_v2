import React, { useContext, useEffect } from 'react'

// importamos los componentes de mapa de leafLeft
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerCurrentP from './MarkerCurrentP';

// importamos la data JSON de los lugares de la bd
import { places } from '../../assets/dataGPS.json'
import { UserContext } from '../../context/UserProvider';
import Markers from './Markers';
import { useFirestore } from '../../hooks/useFirestore';



const MapView = (props) => {

    // importamos el useLocation para usar la data del home
    const { currentPosition, setCurrentPosition } = useContext(UserContext)



    const handleClickMap = (e) => {
        console.log("Map click: ", e.latlng)
    }



    // Funcion ONCLICK map
    function MyComponent() {
        const map = useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                console.log(e.latlng)

                const latRaw = lat.toString()
                const lngRaw = lng.toString()
                const latLenght = latRaw.length
                const lngLenght = lngRaw.length

                const latShort = latRaw.slice(0, latLenght - 9)
                const lngShort = lngRaw.slice(0, lngLenght - 9)


                setCurrentPosition({
                    lat: latShort,
                    lng: lngShort
                })
                // L.marker([lat, lng], { icon }).addTo(map);
            }
        });
        return null;
    }

    return (
        <>
            <MapContainer
                style={{ height: "350px", width: "350px" }}
                center={currentPosition ? currentPosition : null}
                zoom={11}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />
                <MyComponent />
                <MarkerCurrentP currentPosition={currentPosition ? currentPosition : null} />
                <Markers data={props.data} />

            </MapContainer>
        </>
    )
}

export default MapView