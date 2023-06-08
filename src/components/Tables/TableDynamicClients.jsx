import { Avatar, Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import { useFirestore } from '../../hooks/useFirestore';
import Column from 'antd/es/table/Column';



const TableDynamicClients = (props) => {

  // inicializamos los metodos del mesage
  const [messageApi, contextHolder] = message.useMessage()

  // inicializamos metodos de firestore con useFirestore
  const { deleteData, getData } = useFirestore()





  // handle DELETE proveedor
  // const handleClickDelete = async (nanoid) => {
  //   await deleteData(nanoid);
  //   messageApi.open({
  //     type: 'success',
  //     content: 'Supplier ELIMINADO.',
  //   });
  //   console.log("DATA: ", props.data);
  // }


  return (
    <>
      {contextHolder}
      <Table key={props.key} dataSource={props.data}>
        {/* <ColumnGroup title="Data Supplier"> */}
        <Column title="ID" dataIndex="key" key="key" />
        {/* <Column title="Creado" dataIndex="dateCreated" key="dateCreated" /> */}
        <Column title="Status" dataIndex="status" key="status" />
        <Column
          title="Foto"
          dataIndex="photoURL"
          key="photoURL"
          render={(photoURL) => <Avatar src={photoURL} />}

        />
        <Column title="Nombre(s)" dataIndex="firstName" key="firstName" />
        <Column title="Apellido(s)" dataIndex="lastName" key="lastName" />
        {/* </ColumnGroup> */}
        <Column title="Tipo" dataIndex="type" key="type" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Tel" dataIndex="telephone" key="telephone" />
        {/* <Column
        title="Lista de Deseos"
        dataIndex="wishList"
        key="wishList"
        render={(wishList) => (
          <>
            {wishList.map((wish) => (
              <Tag color="blue" key={wish}>
                {wish}
              </Tag>
            ))}
          </>
        )}
      /> */}

        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                // type="primary"
                // loading={loading[item.nanoid]}
                // style={{ backgroundColor: 'orange' }}
                
                onClick={() => props.handleClickEdit(record)}
              >
                📝
              </Button>

              <Popconfirm
                title="Eliminar LEAD"
                description="¿Estas seguro que quieres eliminar este LEAD?"
                onConfirm={() => props.handleClickDelete(record.key)}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  // type="primary"
                  // loading={loading[item.nanoid]}
                  // danger
                // onClick={() => props.handleClickDelete(record.nanoid)}
                >
                  ❌
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </>

  )
}

export default TableDynamicClients;