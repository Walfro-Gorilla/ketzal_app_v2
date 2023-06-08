// importamos el componente y estilos de mapas de LeafLEft
import { useContext, useEffect, useState } from "react"
import {
    Form, Button, Col,
    Divider, Input,
    Row, Select,
    message,
    Modal,
    Space,
    Rate,
    Popconfirm,
    DatePicker
} from "antd"

import { useFirestore } from "../hooks/useFirestore"

// importamos el componente de mapas
import TableDynamicClients from "../components/Tables/TableDynamicClients"

// importamos el contexto de los CLIENTES
import { ClientContext } from "../context/ClientsProvider"



const Clientes = () => {

    // inicializamos el state de 'ClientContex'
    const {
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        telephone, setTelephone,
        password, setPassword,
        birthdate, setBirthdate,
        status, setStatus,
        rate, setRate,
        photoURL, setPhotoURL,
        wishList, setWishList,
        comments, setComments,
        type, setType
    } = useContext(ClientContext)

    // inicializamos states para editar y abrir modal
    const [newOriginID, setNewOriginID] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);

    //  inicializamos metodos de firestore con useFirestore
    const {
        error, loading, deleteData,
        dataClients, getDataClient,
        addDataClient, updateDataClient,
        deleteDataClient,
    } = useFirestore()

    // inicializamos los metodos del mesage
    const [messageApi, contextHolder] = message.useMessage()



    // USEEFFECT al cargar el coponente 
    useEffect(() => {
        // obtenemos la dataClients de clientes desde firebase
        getDataClient()
        console.log("DATaClients: ", dataClients)
    }, [])




    // handle para actualizar el state del TYPE lead
    const handleChangeType = (value) => {
        setType(value)
    };
    // handle para actualizar el state del STATUS del lead
    const handleChangeStatus = (value) => {
        setStatus(value)
    }
    // HANDLE para actualizar state de RATE 
    const handleChangeRate = (value) => {
        setRate(value)
    }



    // handle SUBMIT form
    const handleOnFinishForm = async () => {

        // Evaluamos si STATE firstName esta vacio
        if (firstName === '') {
            messageApi.open({
                type: 'warning',
                content: 'Ingresa el nombre del LEAD.',
            });
            return
        }
        // Evaluamos si STATE type esta vacio
        if (type === '') {
            messageApi.open({
                type: 'warning',
                content: 'Seleccione el tipo.',
            });
            return
        }
        // Evaluamos si STATE telephone esta vacio
        if (telephone === '') {
            messageApi.open({
                type: 'warning',
                content: 'Escriba el telefono.',
            });
            return
        }
        // Evaluamos si STATE status esta vacio
        if (status === '') {
            messageApi.open({
                type: 'warning',
                content: 'Seleccione el status.',
            });
            return
        }
        // Evaluamos si STATE rate esta vacio
        if (rate === null) {
            messageApi.open({
                type: 'warning',
                content: 'Seleccione el rate.',
            });
            return
        }


        // MODO EDIT : si el newOriginID esta undefined o esta en modo edicion
        if (newOriginID) {
            // actualizamos los datos
            await updateDataClient(
                newOriginID,

                firstName, lastName, email,
                telephone, password, birthdate,
                status, rate, photoURL,
                wishList, comments, type,
            )
            // Reseteamos los states implicados
            // CERRAMOS el modal
            setIsModalOpen(false);
            setFirstName('')
            setLastName('')
            setEmail('')
            setTelephone('')
            setPassword('')
            setBirthdate('')
            setStatus('')
            setRate(null)
            setPhotoURL('')
            setWishList('')
            setComments('')
            setType('')

            // msj success
            messageApi.open({
                type: 'success',
                content: 'LEAD  updated.',
            });
            return
        }

        // MODO CREATE: utilizamos la funcion addData para CREATE uno nuevo
        await addDataClient(
            firstName,
            lastName,
            email,
            telephone,
            password,
            birthdate,
            status,
            rate,
            photoURL,
            wishList,
            comments,
            type,
        )

        // CERRAMOS el modal
        setIsModalOpen(false);

        // msj success
        messageApi.open({
            type: 'success',
            content: 'LEAD created.',
        });

        // Reseteamos los states implicados
        setFirstName('')
        setLastName('')
        setEmail('')
        setTelephone('')
        setPassword('')
        setBirthdate('')
        setStatus('')
        setRate(null)
        setPhotoURL('')
        setWishList('')
        setComments('')
        setType('')

    }

    

    // handle DELETE proveedor
    const handleClickDelete = async (key) => {
        await deleteDataClient(key);
        messageApi.open({
            type: 'warning',
            content: 'Cliente ELIMINADO.',
        });
        console.log("Eliminado");
    }

    // handle EDIT proovedor
    const handleClickEdit = async (item) => {
        setFirstName(item.firstName)
        setLastName(item.lastName)
        setEmail(item.email)
        setTelephone(item.telephone)
        setType(item.type)
        setStatus(item.status)
        setRate(item.rate)
        setPhotoURL(item.photoURL)
        setNewOriginID(item.key)

        console.log("EDITANDO ando...", item)
        showModal()
    }



    // Handle para el modal de add lead
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);

        // Reseteamos los states implicados
        setFirstName('')
        setLastName('')
        setEmail('')
        setTelephone('')
        setPassword('')
        setBirthdate('')
        setStatus('')
        setRate(null)
        setPhotoURL('')
        setWishList('')
        setComments('')
        setType('')
        setNewOriginID('')

    };

    // HANDLE dataPicker
    const onChangeCumple = (date, dateString) => {
        // seteamos el state de cumpleanos
        console.log(dateString);
        // setBirthdate(dateString)
    };

    // Evaluamos error y loading antes de mostrar compoente
    if (loading.getDataClient) return <p>Loading Data...</p>
    if (error) return <p>{error}</p>


    return (
        <>
            {contextHolder}
            <Button
                type="primary"
                style={{ backgroundColor: 'yellowgreen' }}
                onClick={showModal}
            >
                + LEAD
            </Button>
            <Divider />
            <TableDynamicClients data={dataClients ? dataClients : null} handleClickDelete={handleClickDelete} handleClickEdit={handleClickEdit} />





            <Modal
                title={newOriginID ? "✏️Editar LEAD" : "➕ Agregar LEAD"}
                open={isModalOpen}
                onCancel={handleCancel}
                width={1000}
                centered
                footer={
                    newOriginID ?
                        (
                            <Popconfirm
                                title="Actualizar LEAD"
                                description="¿Estas seguro que quieres actualizar a este LEAD?"
                                onConfirm={handleOnFinishForm}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    style={{ backgroundColor: 'coral' }}
                                    type="primary"
                                    loading={loading.updateDataClient}
                                >
                                    {loading.updateDataClient ? 'Loading...' : 'Actualizar'}
                                </Button>
                            </Popconfirm>

                        ) : (
                            <Button
                                style={{ backgroundColor: 'yellowgreen' }}
                                type="primary"
                                onClick={handleOnFinishForm}
                                loading={loading.addDataClient}
                            >
                                {loading.addDataClient ? 'Loading...' : 'Registrar'}
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
                                    <p>Nombre(s):</p>
                                    <Input
                                        placeholder="Nombre(s) del LEAD"
                                        // style={{ width: 450 }}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>

                                <Col span={8} style={{ marginRight: 10 }}>
                                    <p>Apellido(s):</p>
                                    <Input
                                        placeholder="Apellido(s) del LEAD"
                                        // style={{ width: 450 }}
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>

                                <Col span={7}>
                                    <p>Tipo</p>
                                    <Select
                                        style={{ width: '80%', }}
                                        onChange={handleChangeType}
                                        value={type}
                                        options={[
                                            { value: 'estudiante', label: 'Estudiante' },
                                            { value: 'familiar', label: 'Familiar' },
                                            { value: 'parejas', label: 'Parejas' },
                                            { value: 'amigos', label: 'Amigos' },
                                            { value: 'conciertos', label: 'Conciertos' },
                                        ]}
                                    />
                                </Col>

                            </Row>


                            {/* 2nd ROW */}
                            <Row style={{ marginBottom: 20 }}>
                                <Col span={7} style={{ marginRight: 10 }}>
                                    <p>Telefono:</p>
                                    <Input
                                        placeholder="Whatsapp o Cel"
                                        // style={{ width: 450 }}
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)}
                                    />
                                </Col>

                                <Col span={7}>
                                    <p>Email</p>
                                    <Input
                                        placeholder="Email personal"
                                        // style={{ width: 450 }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Col>

                                <Col span={8}>
                                    <p>Fecha de nacimiento</p>
                                    <DatePicker
                                        onChange={onChangeCumple}
                                        value={birthdate}
                                        disabled

                                    />
                                </Col>

                            </Row>

                            {/* 3rd ROW */}
                            <Row>
                                <Col span={11}>
                                    <p>Status</p>
                                    <Select
                                        style={{ width: '80%', }}
                                        onChange={handleChangeStatus}
                                        value={status}
                                        options={[
                                            { value: 'NEW', label: 'NEW' },
                                            { value: 'LEAD', label: 'LEAD' },
                                            { value: 'CLIENT', label: 'CLIENT' },
                                        ]}
                                    />
                                </Col>

                                <Col span={11} >
                                    <p>Rate</p>
                                    <Rate
                                        value={rate}
                                        onChange={handleChangeRate}
                                    />
                                </Col>

                            </Row>

                            <Divider />
                        </Form>
                    </Col>
                </Row >
            </Modal>
        </>
    )
}

export default Clientes