import React, { useContext } from 'react'
import { Select, Divider, Input, message } from 'antd';
import { ServiceContext } from '../context/ServicesProvider';

const { Option } = Select;


const SelectSuppliers = props => {
    // seteamos los states para obtener la lista de suppliers
    const [items, setItems] = React.useState([])
    const [name, setName] = React.useState('')

    // obtenemos el contexto de SERVICES
    const {
        idSupplier, setIdSupplier,
        nameSupplier, setNameSupplier,
        type, setType
    } = useContext(ServiceContext)

    // ejecutamos el .map del objeto de proovedores
    React.useEffect(() => {
        const i = []
        props.data.map(item => (
            i.push({ name: item.name, nanoid: item.nanoid, type: item.typeSupplier })
        ))
        setItems(i)
    }, []);

    const handleOnChangeSupplier = (key, children) => {
        setIdSupplier(key)
        setNameSupplier(children.name)
        setType(children.type)
    }


    return (
        <Select
            value={props.value}
            style={{ width: "90%" }}
            placeholder="Selecciona un proveedor"
            onChange={handleOnChangeSupplier}
            dropdownRender={menu => (
                <div>
                    {menu}
                </div>
            )}
        >
            {items.map(item => (
                <Option
                    key={item.nanoid}
                    name={item.name}
                    type={item.type}
                >
                    {item.name}
                </Option>
            ))}
        </Select>
    )
}

export default SelectSuppliers