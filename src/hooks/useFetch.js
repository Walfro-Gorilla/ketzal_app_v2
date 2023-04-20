import { useEffect, useState } from "react"

export const useFetch =(url) => {
    const [resultado, setResultado] = useState({cargando: true, dataPoke: null})

    useEffect( () => {
        getDatos(url)
    },[])

    async function getDatos(url) {
        try {
            setResultado({cargando:true, dataPoke: null})
            const resp = await fetch(url)            
            const dataPoke= await resp.json()
            // console.log("POKES: ",dataPoke.results)
            setResultado({cargando: false, dataPoke: dataPoke.results})
        } catch (error) {
            console.log(error)            
        }
    }
    return resultado
}