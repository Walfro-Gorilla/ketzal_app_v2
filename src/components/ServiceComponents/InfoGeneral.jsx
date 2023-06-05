import {
    Col, Divider, Form,
    Input, Row, Space,
    Switch, DatePicker, Upload, Button, Typography
} from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import SelectSuppliers from '../SelectSuppliers'
import { ServiceContext } from '../../context/ServicesProvider'
import { useFirestore } from '../../hooks/useFirestore'

// obtenemos la variante del DataPicker
const { RangePicker } = DatePicker

// formato del datePicker
const dateFormat = 'DD/MM/YYYY'
const dateFormatItinerary = 'DD/MM/YYYY H m  a'

//  iconos de antd
import { UploadOutlined } from '@ant-design/icons';

// obtenemos los item de Typography
const { Text } = Typography




const InfoGeneral = () => {

    // states para utilizar localment
    const [dateItinerary, setDateItinerary] = useState('')
    const [titleItinerary, setTitleItinerary] = useState('')
    const [descItinerary, setDescItinerary] = useState('')
    const [urlItinerary, setUrlItinerary] = useState('')

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

    // USEEFFECT al cargar el coponente 
    useEffect(() => {
        // obtenemos la dataClients de clientes desde firebase
        getDataService()
        // obtemeos la info de proveedores
        getData()

        console.log("Data info grl services: ", data)
        console.log("DATAServices info grl: ", dataServices)
    }, [])

    //  obtenemos los metodos de firebase 
    const {
        error, loading,
        dataServices, getDataService, addDataServices,
        data, getData,
    } = useFirestore()



    return (
        <>
            <Row gutter={6} justify="start">
                <Col flex xs={24} >
                    <Form
                        name="basic"
                        style={{
                            maxWidth: "100%",
                            marginLeft: 15
                        }}
                    // onFinish={handleOnFinishForm}
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
                                <SelectSuppliers value={nameSupplier} data={data ? data : null} setProv={(value) => setIdSupplier(value)} />
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
        </>
    )
}

export default InfoGeneral