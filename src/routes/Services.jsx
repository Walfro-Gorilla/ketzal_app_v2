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
  Steps, theme, Rate
} from "antd"

import ImgCrop from 'antd-img-crop';

import { ClockCircleOutlined, EditOutlined } from '@ant-design/icons'
import SelectSuppliers from "../components/SelectSuppliers"

// obtenemos la variante del DataPicker
const { RangePicker } = DatePicker
// obtenemos los item de Typography
const { Text } = Typography


// formato del datePicker
const dateFormat = 'DD/MM/YYYY'
const dateFormatItinerary = 'DD/MM/YYYY-H:m a'


//  iconos de antd
import { UploadOutlined } from '@ant-design/icons';

// importamos DAYJS para el manejo de fechas.
import dayjs from 'dayjs';
// import 'dayjs/locale/es';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import { nanoid } from "nanoid";
import ListItems from "../components/ListItems";
import TableDynamicOptions from "../components/Tables/TableDynamicOptions";
import ListServices from "../components/ListServices";
dayjs.extend(customParseFormat);




const Services = () => {

  // states para utilizar localment
  const [dateItinerary, setDateItinerary] = useState('')
  const [titleItinerary, setTitleItinerary] = useState('')
  const [descItinerary, setDescItinerary] = useState('')
  const [urlItinerary, setUrlItinerary] = useState('')

  const [nameOption, setNameOption] = useState('')
  const [descriptionOption, setDescriptionOption] = useState('')
  const [priceOne, setPriceOne] = useState('')
  const [priceTwo, setPriceTwo] = useState('')
  const [priceThree, setPriceThree] = useState('')


  // Destructuring del useFirestore
  const { uploadLogo } = useFirestore()


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
    dataServices, getDataService,
    addDataServices, updateDataService,
    data, getData,
  } = useFirestore()

  // obtenemos el contexto de SERVICES
  const {
    idSupplier, setIdSupplier,
    nameSupplier, setNameSupplier,
    enabled, setEnabled,
    options, setOptions,
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
  const [imgType, setImgType] = useState('')

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
    resetStates()
  };


  // RESET all state before create or udpate

  const resetStates = () => {
    // CERRAMOS el modal
    setIsModalOpen(false);
    // RESET states
    setIdSupplier('')
    setNameSupplier('')
    setOptions([])
    setName('')
    setDates([])
    setDescription('')
    setImgList({
      imgCoverURL: null,
      imgBannerURL: null,
      imgFlyerURL: null,
      imgGallery1URL: null,
      imgGallery2_1URL: null,
      imgGallery2_2URL: null,
      imgGallery2_3URL: null,
      imgGallery2_4URL: null,
    })
    setItinerary([])
    setType('')
    setOption('')
    setRate(0)
  }



  // --- // handle SUBMIT form // --- //
  // -------------------------------- //
  const handleOnFinishForm = async () => {

    // Evaluamos si STATE firstName esta vacio
    if (name === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingresa el nombre del Servicio.',
      });
      return
    }
    // Evaluamos si STATE type esta vacio
    else if (description === '') {
      messageApi.open({
        type: 'warning',
        content: 'Escriba la descripcion.',
      });
      return
      // Evaluamos si STATE telephone esta vacio
    } else if (nameSupplier === '') {
      messageApi.open({
        type: 'warning',
        content: 'Seleccione Proovedor.',
      });
      return
    }
    // Evaluamos si STATE imagenes esta vacio
    else if (
      imgList.imgCoverURL === null ||
      imgList.imgBannerURL === null ||
      imgList.imgFlyerURL === null ||
      imgList.imgGallery1URL === null ||
      imgList.imgGallery2_1URL === null ||
      imgList.imgGallery2_2URL === null ||
      imgList.imgGallery2_3URL === null ||
      imgList.imgGallery2_4URL === null
    ) {
      messageApi.open({
        type: 'warning',
        content: 'Seleccione todas las imagenes requeridas',
      });
      return
    }

    // Evaluamos si STATE itineray esta vacio
    else if (itinerary.length === 0) {
      messageApi.open({
        type: 'warning',
        content: 'Agrega al menos un dia en el itinerario',
      });
      return
    }

    // Evaluamos si STATE options esta vacio
    else if (options.length === 0) {
      messageApi.open({
        type: 'warning',
        content: 'Agrega al menos una opcion',
      });
      return
    }

    // Evaluamos si STATE dates esta vacio
    else if (dates.length === 0) {
      messageApi.open({
        type: 'warning',
        content: 'Selecciona el rango de fechas',
      });
      return
    }


    // MODO EDIT : si el newOriginID esta undefined o esta en modo edicion
    if (newOriginID) {
      // actualizamos los datos
      await updateDataService(
        newOriginID,

        idSupplier, nameSupplier, type,
        name, description, imgList,
        dates, itinerary, options,

        enabled, rate, option,
      )
      // Reseteamos los states implicados
      resetStates()

      // msj success
      messageApi.open({
        type: 'success',
        content: 'LEAD  updated.',
      });
      return
    }

    // MODO CREATE: utilizamos la funcion addData para CREATE uno nuevo
    await addDataServices(
      idSupplier, nameSupplier, type,
      name, description, imgList,
      dates, itinerary, options,

      enabled, rate, option,
    )

    // Reseteamos los states implicados
    resetStates()

    // msj success
    messageApi.open({
      type: 'success',
      content: 'Service created.',
    });


  }



  // -- // FUNCTION uploadData IMG // -- //
  const uploadData = async (e) => {

    console.log('DATA e: ', e)

    const isJpgOrPng = e.type === 'image/jpeg' || e.type === 'image/png'
    const isLt5m = (e.size / 1024 / 1024) < 5

    if (!isJpgOrPng) { return message.error('Solo puedes subir imagenes JPG o PNG') }
    if (!isLt5m) { return message.error('La imagen que intentas subir, pesa mas de 5MB') }

    try {

      const result = await uploadLogo(e)

      if (imgType === 'cover') {
        console.log("Type: ", imgType)
        setImgList(prev => ({ ...prev, imgCoverURL: result }));
      } else if (imgType === 'banner') {
        setImgList(prev => ({ ...prev, imgBannerURL: result }));
      } else if (imgType === 'flyer') {
        setImgList(prev => ({ ...prev, imgFlyerURL: result }));
      } else if (imgType === 'galeria_1') {
        setImgList(prev => ({ ...prev, imgGallery1URL: result }));
      } else if (imgType === 'galeria_2_1') {
        setImgList(prev => ({ ...prev, imgGallery2_1URL: result }));
      } else if (imgType === 'galeria_2_2') {
        setImgList(prev => ({ ...prev, imgGallery2_2URL: result }));
      } else if (imgType === 'galeria_2_3') {
        setImgList(prev => ({ ...prev, imgGallery2_3URL: result }));
      } else if (imgType === 'galeria_2_4') {
        setImgList(prev => ({ ...prev, imgGallery2_4URL: result }));
      } else if (imgType === 'itinerary') {
        setUrlItinerary(result)
      }

    } catch (error) {
      console.log(error)
    }
  }


  // -- // FUNCTION add day to itinerary // -- //
  const addDayItinerary = () => {

    // Evaluamos si STATE dateItinerary esta vacio
    if (dateItinerary === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingresa la fecha del itinerario.',
      });
      return
      // Evaluamos si STATE titleItinerary esta vacio
    } else if (titleItinerary === '') {
      messageApi.open({
        type: 'warning',
        content: 'Escriba el titulo del dia.',
      });
      return
      // Evaluamos si STATE descItinerary esta vacio
    } else if (descItinerary === '') {
      messageApi.open({
        type: 'warning',
        content: 'Escriba la descripcion del dia.',
      });
      return
    } else if (urlItinerary === '') {
      messageApi.open({
        type: 'warning',
        content: 'Seleccione la foto del dia.',
      });
      return
    }

    // ADD dia al itinerario

    setItinerary([
      ...itinerary,
      {
        id: nanoid(6),
        date: dateItinerary,
        title: titleItinerary,
        description: descItinerary,
        imageURL: urlItinerary,
      }
    ])

    setDateItinerary("")
    setTitleItinerary("")
    setDescItinerary("")
    setUrlItinerary("")

    messageApi.open({
      type: 'success',
      content: 'Dia agregado correctamente'
    });
    return
  }



  // -- // FUNCTION add option to oprions // -- //

  // HandlePriceOption //
  const handleOnChangePriceOption = (e) => {

    setPriceOne(e.target.value * 1)
    setPriceTwo(e.target.value * 1.15)
    setPriceThree(e.target.value * 1.30)
  }
  const addOption = () => {

    //EValuamos si los STATES estan llenos correctamente
    switch (true) {
      case (nameOption === ''):
        messageApi.open({
          type: 'warning',
          content: 'Ingresa el nombre de la opcion del servicio',
        })
        return
      case (descriptionOption === ''):
        messageApi.open({
          type: 'warning',
          content: 'Ingresa la descripcion de la opcion',
        })
        return

      case (priceOne.length === 0 || priceOne === ''):
        messageApi.open({
          type: 'warning',
          content: 'Ingresa el precio',
        })
        return
    }

    setOptions([
      ...options,
      {
        id: nanoid(6),
        name: nameOption,
        description: descriptionOption,
        priceOne: priceOne,
        priceTwo: priceTwo,
        priceThree: priceThree
      }
    ])

    setNameOption('')
    setDescriptionOption('')
    setPriceOne('')
    setPriceTwo('')
    setPriceThree('')

    messageApi.open({
      type: 'success',
      content: 'Option agregado correctamente'
    });
    return

  }

  // handle EDIT Services
  const handleClickEdit = async (item) => {
    console.log("Clickeastew el: ", item)
    console.log("Dates: ", item.dates)

    // FILL states
    setIdSupplier(item.idSupplier)
    setNameSupplier(item.nameSupplier)
    setOptions(item.options)
    setName(item.name)
    setDates(item.dates)
    setDescription(item.description)
    setImgList(item.imgList)
    setItinerary(item.itinerary)
    setType(item.type)
    setOption(item.option)
    setRate(item.rate)
    setNewOriginID(item.key)


    // OPEN el modal
    setIsModalOpen(true);

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

      <ListServices data={dataServices ? dataServices : null} handleClickEdit={handleClickEdit} />


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

        <Divider orientation="left">General Info ℹ️</Divider>

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

              {/* ACTIVE? & Rate  */}
              <Row style={{ marginBottom: '25px' }}>
                <Col span={24}>
                  <Space>

                    <Text>Activo?</Text>
                    <Switch
                      onChange={() => setEnabled(!enabled)}
                      checked={enabled}
                    />
                    |
                    <Text>Rate</Text>
                    <Rate
                    />
                  </Space>
                </Col>
              </Row>


              {/* 1st ROW - info grl */}
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

              <Divider orientation="left" >Images 🖼️</Divider>

              {/* 2nd ROW - Photos */}
              <Row style={{ textAlign: 'center' }}>

                <Col span={12}>
                  <Row>



                    <Col span={12} style={{ marginTop: 10 }}>
                      <p>Cover: (387 x 213 px)</p>
                      <ImgCrop aspect={387 / 213} modalTitle='Ajusta la Imagen de portada' rotationSlider={false} >
                        <Upload
                          name='cover'
                          listType="picture-card"
                          className='avatar-uploader'
                          showUploadList={false}
                          onClick={() => setImgType('cover')}

                          beforeUpload={uploadData}
                        >
                          {imgList.imgCoverURL ?
                            <img src={imgList.imgCoverURL} alt="Cover" style={{ width: '100%' }} />
                            :
                            <UploadOutlined />
                          }
                        </Upload>
                      </ImgCrop>
                    </Col>

                    <Col span={12} style={{ marginTop: 10 }}>
                      <p>Banner Tour (1920 x 570 px)</p>
                      <ImgCrop aspect={1920 / 570} modalTitle='Ajusta la Imagen del Banner' rotationSlider={false} >
                        <Upload
                          name='banner'
                          listType="picture-card"
                          className='avatar-uploader'
                          showUploadList={false}
                          onClick={() => setImgType('banner')}

                          beforeUpload={uploadData}
                        >
                          {imgList.imgBannerURL ?
                            <img src={imgList.imgBannerURL} alt="Banner" style={{ width: '100%' }} />
                            :
                            <UploadOutlined />
                          }
                        </Upload>
                      </ImgCrop>

                    </Col>
                  </Row>

                  <Row>


                    <Col span={12} style={{ marginTop: 10 }}>
                      <p>Flyer (387 x 392 px)</p>
                      <ImgCrop aspect={387 / 392} modalTitle='Ajusta la Imagen del Flyer' rotationSlider={false} >
                        <Upload
                          name='Flyer'
                          listType="picture-card"
                          className='avatar-uploader'
                          showUploadList={false}
                          onClick={() => setImgType('flyer')}

                          beforeUpload={uploadData}
                        >
                          {imgList.imgFlyerURL ?
                            <img src={imgList.imgFlyerURL} alt="Flyer" style={{ width: '100%' }} />
                            :
                            <UploadOutlined />
                          }
                        </Upload>
                      </ImgCrop>
                    </Col>


                    <Col span={12} style={{ marginTop: 10 }}>
                      <p>Galeria 1 (387 x 422 px)</p>

                      <ImgCrop aspect={387 / 422} modalTitle='Ajusta la Imagen de la galeria' rotationSlider={false} >
                        <Upload
                          name='galeria_1'
                          listType="picture-card"
                          className='avatar-uploader'
                          showUploadList={false}
                          onClick={() => setImgType('galeria_1')}

                          beforeUpload={uploadData}
                        >
                          {imgList.imgGallery1URL ?
                            <img src={imgList.imgGallery1URL} alt="Galeria 1" style={{ width: '100%' }} />
                            :
                            <UploadOutlined />
                          }
                        </Upload>
                      </ImgCrop>

                    </Col>
                  </Row>

                </Col>

                <Col span={12}>
                  <Row>

                    <Col span={12} style={{ marginTop: 10 }}>
                      <p>Galeria 2.1: (248 x 196 px)</p>
                      <ImgCrop aspect={248 / 196} modalTitle='Ajusta la Imagen de galeria' rotationSlider={false} >
                        <Upload
                          name='Gallery2_1'
                          listType="picture-card"
                          className='avatar-uploader'
                          showUploadList={false}
                          onClick={() => setImgType('galeria_2_1')}

                          beforeUpload={uploadData}
                        >
                          {imgList.imgGallery2_1URL ?
                            <img src={imgList.imgGallery2_1URL} alt="Gallery_2_1" style={{ width: '100%' }} />
                            :
                            <UploadOutlined />
                          }
                        </Upload>
                      </ImgCrop>
                    </Col>

                    <Col span={12} style={{ marginTop: 10 }}>
                      <p>Galeria 2.2: (248 x 196 px)</p>
                      <ImgCrop aspect={248 / 196} modalTitle='Ajusta la Imagen de galeria' rotationSlider={false} >
                        <Upload
                          name='Gallery2_2'
                          listType="picture-card"
                          className='avatar-uploader'
                          showUploadList={false}
                          onClick={() => setImgType('galeria_2_2')}

                          beforeUpload={uploadData}
                        >
                          {imgList.imgGallery2_2URL ?
                            <img src={imgList.imgGallery2_2URL} alt="Gallery_2_2" style={{ width: '100%' }} />
                            :
                            <UploadOutlined />
                          }
                        </Upload>
                      </ImgCrop>
                    </Col>

                  </Row>

                  <Row>

                    <Col span={12} style={{ marginTop: 10 }}>
                      <p>Galeria 2.3: (248 x 196 px)</p>
                      <ImgCrop aspect={248 / 196} modalTitle='Ajusta la Imagen de galeria' rotationSlider={false} >
                        <Upload
                          name='Gallery2_3'
                          listType="picture-card"
                          className='avatar-uploader'
                          showUploadList={false}
                          onClick={() => setImgType('galeria_2_3')}

                          beforeUpload={uploadData}
                        >
                          {imgList.imgGallery2_3URL ?
                            <img src={imgList.imgGallery2_3URL} alt="Gallery_2_3" style={{ width: '100%' }} />
                            :
                            <UploadOutlined />
                          }
                        </Upload>
                      </ImgCrop>
                    </Col>

                    <Col span={12} style={{ marginTop: 10 }}>
                      <p>Galeria 2.4: (248 x 196 px)</p>
                      <ImgCrop aspect={248 / 196} modalTitle='Ajusta la Imagen de galeria' rotationSlider={false} >
                        <Upload
                          name='Gallery2_4'
                          listType="picture-card"
                          className='avatar-uploader'
                          showUploadList={false}
                          onClick={() => setImgType('galeria_2_4')}

                          beforeUpload={uploadData}
                        >
                          {imgList.imgGallery2_4URL ?
                            <img src={imgList.imgGallery2_4URL} alt="Gallery_2_4" style={{ width: '100%' }} />
                            :
                            <UploadOutlined />
                          }
                        </Upload>
                      </ImgCrop>
                    </Col>

                  </Row>

                </Col>







              </Row>

              <Divider orientation="left" >Itinerario 🧳</Divider>

              {/* 3er ROW - Itinerary */}
              <Row>

                <Col span={10}>
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
                        value={dateItinerary ? dayjs(dateItinerary, dateFormatItinerary) : null}
                        onChange={(date, dateString) => {
                          console.log("date: ", date, "dateString: ", dateString);
                          setDateItinerary(dateString)
                        }}
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
                      <p>Image Itinerary:  (526 x 320 px)</p>
                      <ImgCrop aspect={526 / 320} modalTitle='Ajusta la Imagen de itinerrio' rotationSlider={false} >
                        <Upload
                          name='Itinerary'
                          listType="picture-card"
                          className='avatar-uploader'
                          showUploadList={false}
                          onClick={() => setImgType('itinerary')}

                          beforeUpload={uploadData}
                        >
                          {urlItinerary ?
                            <img src={urlItinerary} alt="Itinerary image" style={{ width: '100%' }} />
                            :
                            <UploadOutlined />
                          }
                        </Upload>
                      </ImgCrop>
                    </Col>





                    <Col span={24}>
                      <Button
                        type="primary"
                        style={{ marginLeft: 25 }}
                        onClick={addDayItinerary}
                      >
                        Agregar
                      </Button>
                    </Col>
                  </Row>
                </Col>

                <Col span={14}>
                  <Row style={{ alignSelf: "center" }}>
                    <Col span={24} >
                      <ListItems
                        data={itinerary}
                      />
                    </Col>
                  </Row>
                </Col>



              </Row>

              <Divider orientation="left" >Options 🏷️</Divider>

              {/* 4th ROW - Options */}
              <Row>
                <Col span={11}>

                  <Row>
                    <Col style={{ marginBottom: '25px' }} span={12}>
                      <Text>Name</Text>
                      <Input
                        onChange={(e) => setNameOption(e.target.value)}
                        value={nameOption}
                        style={{ width: '90%' }}

                      />
                    </Col>
                    <Col style={{ marginBottom: '25px' }} span={12}>
                      <Text>Description</Text>
                      <Input.TextArea
                        onChange={(e) => setDescriptionOption(e.target.value)}
                        value={descriptionOption}
                        style={{ width: '90%' }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>
                      <Text>Precio Proovedor </Text>
                      <Input
                        style={{ width: '90%' }}
                        onChange={handleOnChangePriceOption}
                        value={priceOne}
                      />
                    </Col>
                    <Col span={4}>
                      <Text>Precio Venta (+15%)</Text>
                      <Input
                        style={{ width: '90%' }}
                        disabled
                        value={priceTwo}
                      // onChange={(e) => setPricesOption(prev => ({ ...prev, price2: e.target.value }))}
                      />
                    </Col>
                    <Col span={4}>
                      <Text>Precio Lista (+30%)</Text>
                      <Input
                        style={{ width: '90%' }}
                        disabled
                        value={priceThree}
                      // onChange={(e) => setPricesOption(prev => ({ ...prev, price3: e.target.value }))}
                      />
                    </Col>
                    <Col span={12}>
                      <Button
                        type="primary"
                        onClick={addOption}
                      >Add</Button>
                    </Col>
                  </Row>

                </Col>


                {/* COLUMN table of options */}
                <Col span={11} >
                  <Row>
                    <TableDynamicOptions data={options ? options : null} />
                  </Row>
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

export default Services