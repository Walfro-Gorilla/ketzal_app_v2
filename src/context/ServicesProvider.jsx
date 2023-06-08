// importamos el createContext y metodos de react
import { createContext, useState } from "react";

// exportamos la constante SupplierContext que inicia el contexto
export const ServiceContext = createContext();

const ServiceProvider = (props) => {

    // inicializamos los states
    const [idSupplier, setIdSupplier] = useState('')
    const [nameSupplier, setNameSupplier] = useState('')
    const [enabled, setEnabled] = useState(true)
    const [options,setOptions] = useState([])
    const [name, setName] = useState('')
    const [dates, setDates] = useState([])
    const [description, setDescription] = useState('')
    const [imgList, setImgList] = useState({
        imgCoverURL: null,
        imgBannerURL: null,
        imgFlyerURL: null,
        imgGallery1URL: null,
        imgGallery2_1URL: null,
        imgGallery2_2URL: null,
        imgGallery2_3URL: null,
        imgGallery2_4URL: null,
    })
    const [itinerary, setItinerary] = useState([])
    const [type, setType] = useState('')
    const [option, setOption] = useState('')
    const [rate, setRate] = useState(0)



    return (
        // cargamos el context
        <ServiceContext.Provider
            value={{
                idSupplier, setIdSupplier,
                nameSupplier, setNameSupplier,
                enabled, setEnabled,
                options,setOptions,
                name, setName,
                dates, setDates,
                description, setDescription,
                imgList, setImgList,
                itinerary, setItinerary,
                type, setType,
                option, setOption,
                rate, setRate,
            }}
        >
            {props.children}
        </ServiceContext.Provider>
    )
}

export default ServiceProvider
