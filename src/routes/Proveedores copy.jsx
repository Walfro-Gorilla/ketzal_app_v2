// importamos el componente y estilos de mapas de LeafLEft
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserProvider"
import {
    Form, Button, Col,
    Divider, Input,
    Row, Select,
    message,
    Card
} from "antd"
import { useFirestore } from "../hooks/useFirestore"

// importamos el componente de mapas
import MapView from "../components/Maps/MapView"
import TableDynamic from "../components/TableDynamic"



const Proveedores = () => {

    // inicializamos el estado de la localizacion actual del usuario
    const { currentPosition, setCurrentPosition } = useContext(UserContext)

    // iniciamos el estado del component
    const [costo, setCosto] = useState('')
    const [nombreEmpresa, setNombreEmpresa] = useState('')
    const [newOriginID, setNewOriginID] = useState()

    //  inicializamos metodos de firestore con useFirestore
    const {
        data, error, loading, getData, addData, deleteData, updateData
    } = useFirestore()

    // inicializamos los metodos del mesage
    const [messageApi, contextHolder] = message.useMessage()

    // Inicializamos el state con la URL de la api
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [pokemonsData, setPokemonsData] = useState([])
    const [pokeSelected, setPokeSelected] = useState('')




    // USEEFFECT al cargar el coponente 
    useEffect(() => {
        // obtenemos la ubicacion actual y la asignamos al state currentPosition
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latRaw = position.coords.latitude.toString()
                const lngRaw = position.coords.longitude.toString()
                const latLenght = latRaw.length
                const lngLenght = lngRaw.length

                const latShort = latRaw.slice(0, latLenght - 3)
                const lngShort = lngRaw.slice(0, lngLenght - 3)
                // si acepta el usuario, actualizamo el estado 'currentPosition'
                setCurrentPosition({
                    lat: latShort,
                    lng: lngShort
                })
            },
            function (error) {
                console.log(error)
            },
            {
                // activamos high accuarcy para dispositivos con GPS
                enableHighAccuracy: true
            }
        )
        // obtenemos la data de proveedores desde firebase
        getData()
        // llamamos la funcion de consumo de api en cuanto carge provedores
        fetchPokemonData();
        console.log("POKES: ", pokemonsData)
        console.log("GETdAtA")
        console.log(newOriginID)
    }, [])


    // Funcion para llamar la API 
    const fetchPokemonData = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setPokemonsData(data.results);
        } catch (error) {
            console.log(error);
        }
    };



    // handle para obtener el valor al cambiar el dato
    const handleChangeCost = (value) => {
        setCosto(value)
    };


    // handle SUBMIT form
    const handleOnFinishForm = async () => {

        // Evaluamos si STATE nombreEmpresa esta vacio
        if (nombreEmpresa === '') {
            messageApi.open({
                type: 'warning',
                content: 'Ingresa el nombre del negocio.',
            });
            return
        }
        // Evaluamos si STATE costo esta vacio
        if (costo === '') {
            messageApi.open({
                type: 'warning',
                content: 'Seleccione un costo.',
            });
            return
        }
        // Evaluamos si STATE POKE esta vacio
        if (pokeSelected === '') {
            messageApi.open({
                type: 'warning',
                content: 'Seleccione un poke.',
            });
            return
        }


        // evaluamos si el newOriginID esta undefined o esta en modo edicion
        if (newOriginID) {
            // actualizamos los datos
            await updateData(newOriginID, nombreEmpresa, costo)
            setPokeSelected()
            setCosto('')
            setNombreEmpresa('')
            setNewOriginID()
            return
        }

        // Si no, utilizamos la funcion addData p[ara crear uno nuevo
        await addData(
            nombreEmpresa, costo, currentPosition, pokeSelected
        )
        // Reseteamos los states implicados
        setNombreEmpresa('')
        setPokeSelected()
        setCosto('')

    }

    // handle DELETE proveedor
    const handleClickDelete = async (nanoid) => {
        await deleteData(nanoid);
        console.log("Eliminado");
    }

    // handle EDIT proovedor
    const handleClickEdit = async (item) => {
        setNombreEmpresa(item.nombre)
        setCosto(item.costo)
        setNewOriginID(item.nanoid)
        console.log("EDITANDO ando...", newOriginID)
    }



    // SetPokemonsData(dataPoke)
    // // Evaluamos si el dataPoke se carga
    // cargando ? console.log('Cargando pokes...') : console.log(dataPoke)



    // Evaluamos error y loading antes de mostrar compoente
    if (loading.getData) return <p>Loading Data...</p>
    if (error) return <p>{error}</p>


    return (
        <>
            {contextHolder}
            <Button type="primary" style={{backgroundColor: 'yellowgreen'}}>+ Proveedor</Button>
            <Divider/>
            <TableDynamic />


            <Row gutter={6} justify="start">
                <Col flex xs={22} >
                    <Form
                        name="basic"

                        style={{
                            maxWidth: "100%",
                            marginTop: 20,
                            marginLeft: 15
                        }}
                        onFinish={handleOnFinishForm}
                    >
                        <Row style={{ marginBottom: 20 }}>
                            <Col span={8} style={{ marginRight: 10 }}>
                                <p>Empresa:</p>
                                <Input
                                    placeholder="Empresa"
                                    // style={{ width: 450 }}
                                    value={nombreEmpresa}

                                    onChange={(e) => setNombreEmpresa(e.target.value)}
                                />
                            </Col>

                            <Col span={7}>
                                <p>Poke</p>
                                <Select
                                    style={{ width: 100 }}
                                    onChange={(value) => setPokeSelected(value)}
                                    value={pokeSelected}

                                >
                                    {pokemonsData.map((pokemon, index) => (
                                        <Select.Option key={index} value={pokemon.name}>{pokemon.name}</Select.Option>
                                    ))}
                                </Select>
                            </Col>

                            <Col span={7}>
                                <p>Costo</p>
                                <Select
                                    style={{ width: 100 }}
                                    onChange={handleChangeCost}
                                    value={costo}
                                    options={[
                                        { value: '3000', label: '$3,000' },
                                        { value: '6000', label: '$6,000' },
                                        { value: '12000', label: '$12,000' },
                                    ]}
                                />
                            </Col>

                        </Row>

                        <Row>
                            <Col span={24} >
                                <p>LONG: {currentPosition.lng}</p>
                                <p>LAT: {currentPosition.lat}</p>
                            </Col>
                        </Row>


                        <>
                            {newOriginID ?
                                (
                                    <Button
                                        style={{ backgroundColor: 'coral' }}
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading.updateData}
                                    >
                                        {loading.updateData ? 'Loading...' : 'Actualizar'}
                                    </Button>

                                ) : (
                                    <Button
                                        style={{ backgroundColor: 'yellowgreen' }}
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading.addData}
                                    >
                                        {loading.addData ? 'Loading...' : 'Registrar'}
                                    </Button>

                                )
                            }
                        </>
                        {/* <StripeCheckoutForm totalPrice={costo} nombreEmpresa={nombreEmpresa} /> */}

                    </Form>
                </Col>

                <Col flex xs={22} >
                    <Row gutter={16}>

                        {data.map((item) => (
                            <Col key={item.nanoid} span={8} >
                                <Card
                                    style={{ marginBottom: 20 }}
                                    title={item.nombre}
                                    bordered={false}
                                    hoverable
                                    extra={
                                        <Button
                                            type="primary"
                                            loading={loading[item.nanoid]}
                                            danger
                                            onClick={() => handleClickDelete(item.nanoid)}
                                        >
                                            x
                                        </Button>

                                    }
                                // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >
                                    <Row>
                                        <Col span={24}>
                                            <h4>{item.poke}</h4>
                                            <p>lat: {item.currentPosition.lat} </p>
                                            <p>lng: {item.currentPosition.lng} </p>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>

                                            <Button
                                                style={{ backgroundColor: 'orange' }}
                                                type="primary"
                                                loading={loading[item.nanoid]}
                                                onClick={() => handleClickEdit(item)}
                                            >
                                                Edit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col >

            </Row >

            <Divider orientation="left">Mapa de Proveedores</Divider>
            <Row style={{ marginLeft: 100 }}>
                <Col span={24}>
                    {
                        currentPosition ? <MapView currentPosition={currentPosition} data={data} /> : null
                    }
                </Col>
            </Row>
        </>
    )
}

export default Proveedores