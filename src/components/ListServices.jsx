import { EditOutlined } from '@ant-design/icons';
import { Space, Input, List, Card, Switch } from 'antd';
import React from 'react'

// Destructuring de los componentes del Input & Card
const { Search } = Input
const { Meta } = Card;

const ListServices = (props) => {
    return (
        <>
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
                    dataSource={props.data}
                    renderItem={item => (
                        <List.Item key={item.key}>
                            <Card
                                cover={
                                    <img
                                        alt="example"
                                        src={item.imgList.imgCoverURL}
                                        style={{ height: 150 }}
                                    />
                                }
                                actions={[

                                    <EditOutlined
                                        key={item.key}
                                        onClick={() =>  props.handleClickEdit(item)}
                                    />,
                                    // <EditOutlined key="setting" onClick={
                                    //     () => this.setState({
                                    //         visible: true,
                                    //         edit: true,
                                    //         rowData: item
                                    //     })
                                    // } />,
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
        </>
    )
}

export default ListServices