import { Avatar, Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import { useFirestore } from '../../hooks/useFirestore';
import Column from 'antd/es/table/Column';



const TableDynamicOptions = (props) => {

  // inicializamos los metodos del mesage
  const [messageApi, contextHolder] = message.useMessage()



  return (
    <>
      {contextHolder}
      <Table key={props.key} dataSource={props.data}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Option" dataIndex="name" key="name" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Price 1" dataIndex="priceOne" key="priceOne" />
        <Column title="Price 2" dataIndex="priceTwo" key="priceTwo" />
        <Column title="Price 3" dataIndex="priceThree" key="priceThree" />

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

export default TableDynamicOptions;