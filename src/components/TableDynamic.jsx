import { Avatar, Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import { useFirestore } from '../hooks/useFirestore';
import Column from 'antd/es/table/Column';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import { memo, useEffect } from 'react';



const columns = [
  {
    title: 'ID',
    dataIndex: 'nanoid',
    key: 'nanoid',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Logo',
    dataIndex: 'logoURL',
    key: 'logoURL',
    render: (logoURL) => <Avatar src={logoURL} />,
  },

  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tipo',
    dataIndex: 'typeSupplier',
    key: 'typeSupplier',
  },


  {
    title: 'Tel',
    dataIndex: 'telephone',
    key: 'telephone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },

  {
    title: 'Ultima sesion',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
  },

  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.firstName}</a>
        <Button
          type="primary"
          // loading={loading[item.nanoid]}
          danger
          onClick={() => handleClickDelete(record.nanoid)}
        >
          x
        </Button>
      </Space>
    ),
  },
];






const TableDynamic = (props) => {

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
      <Table dataSource={props.data}>
        {/* <ColumnGroup title="Data Supplier"> */}
        <Column title="ID" dataIndex="nanoid" key="nanoid" />
        <Column
          title="Logo"
          dataIndex="logoURL"
          key="logoURL"
          render={(logoURL) => <Avatar src={logoURL} />}

        />
        <Column title="Nombre" dataIndex="name" key="name" />
        <Column title="Creado" dataIndex="dateCreated" key="dateCreated" />
        {/* </ColumnGroup> */}
        <Column title="Tipo" dataIndex="typeSupplier" key="typeSupplier" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Tel" dataIndex="telephone" key="telephone" />
        <Column title="Status" dataIndex="status" key="status" />
        {/* <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags) => (
          <>
            {tags.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
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
                type="primary"
                // loading={loading[item.nanoid]}
                style={{ backgroundColor: 'orange' }}
                onClick={() => props.handleClickEdit(record)}
              >
                EDIT
              </Button>

              <Popconfirm
                title="Eliminar Supplier"
                description="Estas seguro que quieres eliminar este supplier?"
                onConfirm={() => props.handleClickDelete(record.nanoid)}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  // loading={loading[item.nanoid]}
                  danger
                // onClick={() => props.handleClickDelete(record.nanoid)}
                >
                  x
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </>

  )
}

export default TableDynamic;