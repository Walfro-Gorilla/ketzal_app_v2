import { Alert, Button, Checkbox, Form, Input, message } from 'antd';
import { useContext, useState } from "react"
// Importamos el CONTEXT del usuario
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';

// Importamos los componentes necesarios

const RegisterUser = () => {

    const [email, setEmail] = useState('admin@stil.com')
    const [password, setPassword] = useState('123123')
    const [rePassword, setRePassword] = useState('12312')

    const navigate = useNavigate()

    // Traemos el CONTEXT de registro de usuario
    const { registerUser } = useContext(UserContext)

    // Funcion asincrona para crear el nuevo usuario
    const handleOnFinishForm = async (e) => {
        // console.log("Procesando form:, ", email, password, rePassword)
        try {
            await registerUser(email, password)
            alert('Usuario agregado correctamente')
            navigate('/')
        } catch (error) {
            console.log('Error al crear usuario CODIGO: ', error.code)
            alert(error.code)
            
        }
    }


    return (
        <>
            <h1>Nuevo Usuario</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                    email: email,
                    password: password,
                    repassword: rePassword,
                }}
                onFinish={handleOnFinishForm}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingresa el correo!',
                        },
                    ]}
                >
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingresa un password!',
                        },
                    ]}
                >
                    <Input.Password
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </Form.Item>

                <Form.Item
                    label="Repite password"
                    name="repassword"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingresa un password!',
                        },
                    ]}
                >
                    <Input.Password
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Recuerdame</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Registrar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default RegisterUser