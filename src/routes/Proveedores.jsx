// importamos el componente y estilos de mapas de LeafLEft
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import {
    Form, Button, Col,
    Divider, Input, Modal,
    Row, Select, Space,
    message
} from "antd"
import { useFirestore } from "../hooks/useFirestore"
import { nanoid } from "nanoid"

// importamos el componente de mapas
import MapView from "../components/Maps/MapView"

// importamos componentes comunes
import StripeCheckoutForm from "../common/stripe/StripeCheckout"
import ButtonLoading from "../common/ButtonLoading"
import MessageAlert from "../components/MessageAlert"



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




    // USEEFFECT al cargar el coponente 
    useEffect(() => {
        // obtenemos la ubicacion actual y la asignamos al state currentPosition
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // si acepta el usuario, actualizamo el estado 'currentPosition'
                setCurrentPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
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
        console.log("GETdAtA")
        console.log(newOriginID)
    }, [])






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


        // evaluamos si el newOriginID esta undefined o esta en modo edicion
        if (newOriginID) {
            // actualizamos los datos
            await updateData(newOriginID, nombreEmpresa, costo)
            setCosto('')
            setNombreEmpresa('')
            setNewOriginID()
            return
        }

        // Si no, utilizamos la funcion addData p[ara crear uno nuevo
        await addData(nombreEmpresa, costo, currentPosition)
        setNombreEmpresa('')
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



    // Evaluamos error y loading antes de mostrar compoente
    if (loading.getData) return <p>Loading Data...</p>
    if (error) return <p>{error}</p>


    return (
        <>
            {contextHolder}
            <Divider orientation="left">Proveedores</Divider>
            <Row justify="start">

                <Col flex span={10}>
                    <Form
                        name="basic"

                        style={{
                            maxWidth: "100%",
                            marginTop: 20,
                            marginLeft: 50
                        }}
                        onFinish={handleOnFinishForm}
                    >
                        <Row style={{ marginBottom: 20 }}>
                            <Col span={10} style={{ marginRight: 10 }}>
                                <p>Empresa:</p>
                                <Input
                                    placeholder="Empresa"
                                    // style={{ width: 450 }}
                                    value={nombreEmpresa}

                                    onChange={(e) => setNombreEmpresa(e.target.value)}
                                />
                            </Col>

                            <Col span={12}>
                                <p>Costo</p>
                                <Select
                                    style={{ width: 120 }}
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

                <Col span={12}>
                    {data.map((item) => (
                        <div key={item.nanoid}>
                            {/* <p> {item.id} </p> */}
                            <p> {item.nombre} </p>
                            <p> {item.costo} </p>
                            <Button
                                style={{ backgroundColor: 'orange' }}
                                type="primary"
                                loading={loading[item.nanoid]}
                                onClick={() => handleClickEdit(item)}
                            >
                                Edit
                            </Button>
                            <Button
                                type="primary"
                                loading={loading[item.nanoid]}
                                danger
                                onClick={() => handleClickDelete(item.nanoid)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </Col>

            </Row>
            <Row>
                <Col span={24}>
                    {
                        currentPosition ? <MapView /> : null
                    }
                </Col>
            </Row>
        </>
    )
}

export default Proveedores