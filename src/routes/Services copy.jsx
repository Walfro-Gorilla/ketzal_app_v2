import { useContext, useEffect, useState } from "react"
import { ServiceContext } from "../context/ServicesProvider"
import { useFirestore } from "../hooks/useFirestore"

// importamos los componentes de ANTD
import {
  Space, Input, Divider,
  List, Card, Switch,
  Button, message, Modal,
  Popconfirm, Row, Col,
  Form, Select, Typography,
  DatePicker, Upload, Timeline,
  Steps, theme
} from "antd"

import { EditOutlined } from '@ant-design/icons'
import SelectSuppliers from "../components/SelectSuppliers"

// obtenemos la variante del DataPicker
const { RangePicker } = DatePicker
// obtenemos los item de Typography
const { Text } = Typography
// Destructuring de los componentes del Input & Card
const { Search } = Input
const { Meta } = Card;

// formato del datePicker
const dateFormat = 'DD/MM/YYYY'
const dateFormatItinerary = 'DD/MM/YYYY H m  a'

//  iconos de antd
import { UploadOutlined } from '@ant-design/icons';

// importamos DAYJS para el manejo de fechas.
import dayjs from 'dayjs';
import 'dayjs/locale/es';

// creamos las vistas del STEPER
const stepsService = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];





const Services = () => {

  // states para utilizar localment
  const [dateItinerary, setDateItinerary] = useState('')
  const [titleItinerary, setTitleItinerary] = useState('')
  const [descItinerary, setDescItinerary] = useState('')
  const [urlItinerary, setUrlItinerary] = useState('')



  // START token y state para el STEPER
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = stepsService.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  // END token y state para el STEPER




  // function to delete SERVICE
  const deleteItinerario = (id) => {
    console.log(id)
  }


  // USEEFFECT al cargar el coponente 
  useEffect(() => {
    // obtenemos la dataClients de clientes desde firebase
    getDataService()
    // obtemeos la info de proveedores
    getData()

    console.log("Data suppliers: ", data)
    console.log("DATAServices: ", dataServices)
  }, [])

  //  obtenemos los metodos de firebase 
  const {
    error, loading,
    dataServices, getDataService, addDataServices,
    data, getData,
  } = useFirestore()

  // obtenemos el contexto de SERVICES
  const {
    idSupplier, setIdSupplier,
    nameSupplier, setNameSupplier,
    enabled, setEnabled,
    prices, setPrices,
    name, setName,
    dates, setDates,
    description, setDescription,
    imgList, setImgList,
    itinerary, setItinerary,
    type, setType,
    option, setOption,
    rate, setRate,
  } = useContext(ServiceContext)

  // inicializamos states para editar y abrir modal
  const [newOriginID, setNewOriginID] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  // inicializamos los metodos del mesage
  const [messageApi, contextHolder] = message.useMessage()



  // handle para actualizar el state del TYPE service
  const handleChangeType = (value) => {
    setType(value)
  };

  // Handle para abrir modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  // handle para cerrar modal y resetear states
  const handleCancel = () => {
    setIsModalOpen(false);
    // Reseteamos los states implicados
  };

  // handle SUBMIT form
  const handleOnFinishForm = async () => {

    // Evaluamos si STATE firstName esta vacio
    if (name === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingresa el nombre del Servicio.',
      });
      return
      // Evaluamos si STATE type esta vacio
    } else if (description === '') {
      messageApi.open({
        type: 'warning',
        content: 'Escriba la descripcion.',
      });
      return
      // Evaluamos si STATE telephone esta vacio
    } else if (type === '') {
      messageApi.open({
        type: 'warning',
        content: 'Seleccione el tipo.',
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
    await addDataServices(
      idSupplier, enabled, prices,
      name, dates, description,
      imgList, itinerary, type,
      option, rate,
    )

    // CERRAMOS el modal
    setIsModalOpen(false);

    // msj success
    messageApi.open({
      type: 'success',
      content: 'Service created.',
    });

    // Reseteamos los states implicados


  }

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        style={{ backgroundColor: 'yellowgreen' }}
        onClick={showModal}
      >
        + SERVICIO
      </Button>
      <Divider />
      <Space direction='vertical' style={{ width: '100%' }}>
        <Search
          style={{ marginBottom: '30px' }}
          placeholder="Escribe el servicio aqui..."
          enterButton
        // onChange={e =>
        //   this.setState({
        //     servicios: this.state.servicios2.filter(item => {
        //       return item.busq.toUpperCase().includes(e.target.value.toUpperCase())
        // })
        //   })}
        />
        <List
          size='large'
          grid={{ gutter: 0, column: 4 }}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 12,
          }}
          dataSource={dataServices}
          renderItem={item => (
            <List.Item key={item.key}>
              <Card
                cover={
                  <img
                    alt="example"
                    src={item.imgURL}
                    style={{ height: 150 }}
                  />
                }
                actions={[

                  <EditOutlined key="setting" onClick={
                    () => this.setState({
                      visible: true,
                      edit: true,
                      rowData: item
                    })
                  } />,
                ]}
              >
                <Switch onChange={value => { updateServicios(item.id, { habilitado: value }) }} checkedChildren="Habilitado" unCheckedChildren="Inhabilitado" checked={item.enabled} /><br />
                <strong>{item.nameSupplier}</strong><br />
                <strong>{item.name}</strong>
                {/* <p>{item.tipo[0].toUpperCase() + item.tipo.slice(1)} - {item.opcion[0].toUpperCase() + item.opcion.slice(1)}</p> */}
                <Meta
                  description={item.description.substr(0, 45) + "..."}
                />
              </Card>
            </List.Item>
          )}
        />
      </Space>

      <Modal
        title={newOriginID ? "✏️Editar Servicio" : "➕ Agregar Servicio"}
        open={isModalOpen}
        onCancel={handleCancel}
        width={'85%'}
        centered
        footer={
          newOriginID ?
            (
              <Popconfirm
                title="Actualizar Servicio"
                description="¿Estas seguro que quieres actualizar este Servicio?"
                onConfirm={handleOnFinishForm}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  style={{ backgroundColor: 'coral' }}
                  type="primary"
                  loading={loading.updateDataService}
                >
                  {loading.updateDataService ? 'Loading...' : 'Actualizar'}
                </Button>
              </Popconfirm>

            ) : (
              <Button
                style={{ backgroundColor: 'yellowgreen' }}
                type="primary"
                onClick={handleOnFinishForm}
                loading={loading.addDataService}
              >
                {loading.addDataService ? 'Loading...' : 'Registrar'}
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

              {/* ACTIVE??? */}
              <Row style={{ marginBottom: '25px' }}>
                <Col span={24}>
                  <Space>

                    <Text>Activo?</Text>
                    <Switch
                      onChange={() => setEnabled(!enabled)}
                      checked={enabled}
                    />
                  </Space>
                </Col>
              </Row>


              {/* 1st ROW */}
              <Row style={{ marginBottom: 20 }}>

                <Col span={4}>
                  <p>Proveedor</p>
                  <SelectSuppliers value={nameSupplier} data={data} setProv={(value) => setIdSupplier(value)} />
                </Col>

                <Col span={2}>
                  <p>ID</p>
                  <Input
                    style={{ width: '80%' }}
                    value={idSupplier}
                    disabled
                  />
                </Col>

                <Col span={3}>
                  <p>Tipo</p>
                  <Input
                    style={{ width: '80%' }}
                    value={type}
                    disabled
                  />
                </Col>



                <Col span={5} style={{ marginRight: 10 }}>
                  <p>Nombre Servicio:</p>
                  <Input
                    placeholder="Nombre del servicio"
                    // style={{ width: 450 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>

                <Col span={8} style={{ marginRight: 10 }}>
                  <p>Descripcion:</p>
                  <Input.TextArea
                    placeholder="Descripcion del servicio"
                    // style={{ width: 450 }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>

              </Row>

              <Row>

                <Col span={10}>
                  <Divider orientation="left" >Itinerario</Divider>
                  <Row>
                    <Col style={{ marginBottom: '25px' }} span={24}>
                      <RangePicker
                        style={{ width: '100%' }}
                        format={dateFormat}
                        onChange={(e) => setDates({ dateStart: e[0].$d, dateEnd: e[1].$d })}
                      />
                    </Col>

                    <Col style={{ marginBottom: '15px' }} span={10}>
                      <p>Fecha:</p>
                      <DatePicker
                        format={dateFormatItinerary}
                        showTime

                        style={{ width: '90%', marginRight: '25px' }}
                        value={dateItinerary}
                        onChange={(date) => setDateItinerary(date)}
                      />
                    </Col>
                    <Col style={{ marginBottom: '15px' }} span={14}>
                      <p>Titulo:</p>
                      <Input
                        style={{ width: '90%' }}
                        value={titleItinerary}
                        onChange={(e) => setTitleItinerary(e.target.value)}
                      />
                    </Col>
                    <Col span={14}>
                      <p>Description:</p>
                      <Input.TextArea
                        style={{ marginBottom: '25px', width: '90%' }}
                        value={descItinerary}
                        onChange={(e) => setDescItinerary(e.target.value)}
                      />
                    </Col>
                    <Col span={10} style={{ marginBottom: '25px' }}>
                      <p>Imagen:</p>
                      <Upload
                        showUploadList={false}
                      >
                        <Button icon={<UploadOutlined />}>Subir</Button>
                      </Upload>
                    </Col>
                    <Col span={24}>
                      <Button type="primary" style={{ marginLeft: 25 }}> Agregar </Button>
                    </Col>
                  </Row>
                </Col>



              </Row>

              {/* 3rd ROW */}
              {/* <Row>
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

              </Row> */}

              <Divider />
            </Form>
          </Col>
        </Row >
        
      </Modal>
    </>
  )
}

export default Services