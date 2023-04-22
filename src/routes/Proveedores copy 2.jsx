// importamos el componente y estilos de mapas de LeafLEft
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserProvider"
import {
    Form, Button, Col,
    Divider, Input,
    Row, Select,
    message,
    Card,
    Modal,
    Space,
    Rate,
    Image,
    Popconfirm
} from "antd"
import { useFirestore } from "../hooks/useFirestore"

// importamos el componente de mapas
import MapView from "../components/Maps/MapView"
import TableDynamic from "../components/TableDynamic"
import ModalDynamic from "../components/ModalDynamic"
import UploadLogo from "../components/UploadLogo"
import { SupplierContext } from "../context/SupplierProvider"



const Proveedores = () => {

    // inicializamos el estado de la localizacion actual del usuario
    const { currentPosition, setCurrentPosition } = useContext(UserContext)

    // inicializamos el state de ProviderContext
    const { logoURL, setLogoURL } = useContext(SupplierContext)

    // iniciamos el estado del component
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [typeSupplier, setTypeSupplier] = useState('')
    const [status, setStatus] = useState('')
    const [rate, setRate] = useState('')
    const [nombreEmpresa, setNombreEmpresa] = useState('')
    const [address, setAddress] = useState('')

    const [newOriginID, setNewOriginID] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        // fetchPokemonData();
        // console.log("POKES: ", pokemonsData)
        // console.log(newOriginID)
        console.log("GETdAtA")
        console.log("DATA: ", data)
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



    // handle para actualizar el state del TYPE supplier
    const handleChangeType = (value) => {
        setTypeSupplier(value)
    };
    // handle para actualizar el state del STATUS del supplier
    const handleChangeStatus = (value) => {
        setStatus(value)
    }

    // HANDLE para actualizar state de RATE 
    const handleChangeRate = (value) => {
        setRate(value)
    }


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
        // Evaluamos si STATE direccion esta vacio
        if (address === '') {
            messageApi.open({
                type: 'warning',
                content: 'Escriba la direccion.',
            });
            return
        }
        // Evaluamos si STATE email esta vacio
        if (email === '') {
            messageApi.open({
                type: 'warning',
                content: 'Seleccione un email.',
            });
            return
        }
        // Evaluamos si STATE telefono esta vacio
        if (telephone === '') {
            messageApi.open({
                type: 'warning',
                content: 'Escriba el telefono',
            });
            return
        }
        // Evaluamos si STATE type esta vacio
        if (typeSupplier === '') {
            messageApi.open({
                type: 'warning',
                content: 'Seleccione el tipo.',
            });
            return
        }
        // Evaluamos si STATE email esta vacio
        if (status === '') {
            messageApi.open({
                type: 'warning',
                content: 'Seleccione el status.',
            });
            return
        }
        // Evaluamos si STATE email esta vacio
        if (rate === '') {
            messageApi.open({
                type: 'warning',
                content: 'Seleccione el rate.',
            });
            return
        }
        // Evaluamos si STATE email esta vacio
        if (logoURL === '') {
            messageApi.open({
                type: 'warning',
                content: 'Suba el logo.',
            });
            return
        }


        // evaluamos si el newOriginID esta undefined o esta en modo edicion
        if (newOriginID) {
            // actualizamos los datos
            await updateData(newOriginID, nombreEmpresa, email, address, telephone, typeSupplier, status, rate, logoURL)
            setEmail('')
            setNombreEmpresa('')
            setNewOriginID()
            setAddress('')
            setTelephone('')
            setTypeSupplier('')
            setStatus('')
            setRate(null)
            setLogoURL('')
            handleOk()

            // msj success
            messageApi.open({
                type: 'success',
                content: 'Supplier updated.',
            });
            return
        }

        // Si no, utilizamos la funcion addData para CREATE uno nuevo
        await addData(
            nombreEmpresa, address, email,
            telephone, typeSupplier, currentPosition,
            status, rate, logoURL
        )

        // CERRAMOS el modal
        setIsModalOpen(false);

        // msj success
        messageApi.open({
            type: 'success',
            content: 'Supplier created.',
        });
        // Reseteamos los states implicados
        setNombreEmpresa('')
        setAddress('')
        setEmail('')
        setTelephone('')
        setTypeSupplier('')
        setStatus('')
        setRate(null)
        setLogoURL('')

    }

    // handle DELETE proveedor
    const handleClickDelete = async (nanoid) => {
        await deleteData(nanoid);
        messageApi.open({
            type: 'warning',
            content: 'Supplier ELIMINADO.',
        });
        console.log("Eliminado");
    }

    // handle EDIT proovedor
    const handleClickEdit = async (item) => {
        setNombreEmpresa(item.name)
        setEmail(item.email)

        setAddress(item.address)
        setTelephone(item.telephone)
        setTypeSupplier(item.typeSupplier)
        setStatus(item.status)
        setRate(item.rate)
        setLogoURL(item.logoURL)


        setNewOriginID(item.nanoid)

        console.log("EDITANDO ando...", item)
        showModal()
    }



    // Handle para el modal de add supplier
    const showModal = () => {
        setIsModalOpen(true);

    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setEmail('')
        setNombreEmpresa('')
        setNewOriginID()
        setAddress('')
        setTelephone('')
        setTypeSupplier('')
        setStatus('')
        setRate(null)
        setLogoURL('')
    };

    // Evaluamos error y loading antes de mostrar compoente
    if (loading.getData) return <p>Loading Data...</p>
    if (error) return <p>{error}</p>


    return (
        <>
            {contextHolder}
            <Button
                type="primary"
                style={{ backgroundColor: 'yellowgreen' }}
                onClick={showModal}
            >
                + Proveedor
            </Button>
            <Divider />
            <TableDynamic data={data ? data : null} handleClickDelete={handleClickDelete} handleClickEdit={handleClickEdit} />

            {/* <Col flex xs={22} >
                <Row gutter={16}>
                    {data ? (data.map((item) => (
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
                                        <h4>{item.nombreEmpresa}</h4>
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
                    ))) : (
                        <p>Loading suppliers..</p>
                    )
                    }
                </Row>
            </Col > */}



            <Modal
                title={newOriginID ? "Edit Supplier" : "Add Supplier"}
                open={isModalOpen}
                onOk={handleOnFinishForm}
                onCancel={handleCancel}
                width={1000}
                centered
                footer={
                    newOriginID ?
                        (
                            <Popconfirm
                                title="Actualizar Supplier"
                                description="Estas seguro que quieres actualizar este supplier?"
                                onConfirm={handleOnFinishForm}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    style={{ backgroundColor: 'coral' }}
                                    type="primary"
                                    loading={loading.updateData}
                                >
                                    {loading.updateData ? 'Loading...' : 'Actualizar'}
                                </Button>
                            </Popconfirm>

                        ) : (
                            <Button
                                style={{ backgroundColor: 'yellowgreen' }}
                                type="primary"
                                onClick={handleOnFinishForm}
                                loading={loading.addData}
                            >
                                {loading.addData ? 'Loading...' : 'Registrar'}
                            </Button>

                        )

                }
            >


                <Divider />
                <Row gutter={6} justify="start">
                    <Col flex xs={24} >
                        <Form
                            name="basic"

                            style={{
                                maxWidth: "100%",
                                marginLeft: 15
                            }}
                            onFinish={handleOnFinishForm}
                        >
                            {/* 1st ROW */}
                            <Row style={{ marginBottom: 20 }}>
                                <Col span={8} style={{ marginRight: 10 }}>
                                    <p>Nombre:</p>
                                    <Input
                                        placeholder="Nombre Proveedor"
                                        // style={{ width: 450 }}
                                        value={nombreEmpresa}
                                        onChange={(e) => setNombreEmpresa(e.target.value)}
                                    />
                                </Col>

                                <Col span={8}>
                                    <p>Direccion</p>
                                    <Input
                                        placeholder="Direccion"
                                        // style={{ width: 450 }}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Col>

                                <Col span={7}>
                                    <p>GPS</p>

                                    <Space>
                                        <p>LONG: {currentPosition.lng}</p>
                                        <p>LAT: {currentPosition.lat}</p>
                                    </Space>
                                    {/* <Button type="primary" style={{ backgroundColor: "violet" }}>MAP</Button> */}

                                </Col>



                            </Row>

                            {/* 1.1 ROW hidden */}
                            <Row hidden >
                                <Col span={24}>
                                    {
                                        currentPosition ? <MapView currentPosition={currentPosition} data={data} /> : null
                                    }
                                </Col>
                            </Row>

                            {/* 2nd ROW */}
                            <Row style={{ marginBottom: 20 }}>
                                <Col span={7} style={{ marginRight: 10 }}>
                                    <p>Email:</p>
                                    <Input
                                        placeholder="Email Supplier"
                                        // style={{ width: 450 }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Col>

                                <Col span={7}>
                                    <p>Telefono</p>
                                    <Input
                                        placeholder="Telefono oficina"
                                        // style={{ width: 450 }}
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)}
                                    />
                                </Col>

                                <Col span={8}>
                                    <p>Type</p>
                                    <Select
                                        style={{ width: '80%', }}
                                        onChange={handleChangeType}
                                        value={typeSupplier}
                                        options={[
                                            { value: 'alojamiento', label: 'Alojamiento' },
                                            { value: 'transporte', label: 'Transporte' },
                                            { value: 'gastronomico', label: 'Gastronomico' },
                                            { value: 'agencia_viajes', label: 'Agencia de Viajes' },
                                            { value: 'actividades', label: 'Actividades y excursiones' },
                                            { value: 'rural', label: 'Rural y Natural' },
                                            { value: 'evento', label: 'Eventos y Conciertos' },
                                            { value: 'complementario', label: 'Complementarios' },
                                        ]}
                                    />
                                </Col>

                            </Row>

                            {/* 3rd ROW */}
                            <Row>
                                <Col span={8}>
                                    <p>Status</p>
                                    <Select
                                        style={{ width: '80%', }}
                                        onChange={handleChangeStatus}
                                        value={status}
                                        options={[
                                            { value: 'ACTIVO', label: 'Activo' },
                                            { value: 'INACTIVO', label: 'Inactivo' },
                                            { value: 'PAUSA', label: 'En Pausa' },
                                        ]}
                                    />
                                </Col>

                                <Col span={8} >
                                    <p>Rate</p>
                                    <Rate
                                        value={rate}
                                        onChange={handleChangeRate}
                                    />
                                </Col>
                                <Col span={8} >
                                    <p>Logo</p>
                                    <UploadLogo
                                        logoURL={''}
                                        type={'logo'}

                                    />
                                </Col>

                            </Row>


                            {/* <>
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
                            </> */}

                            {/* <StripeCheckoutForm totalPrice={email} nombreEmpresa={nombreEmpresa} /> */}

                        </Form>
                    </Col>
                </Row >
            </Modal>



            {/* <Divider orientation="left">Mapa de Proveedores</Divider>
            <Row style={{ marginLeft: 100 }}>
                <Col span={24}>
                    {
                        currentPosition ? <MapView currentPosition={currentPosition} data={data} /> : null
                    }
                </Col>
            </Row> */}
        </>
    )
}

export default Proveedores