// Importamos el useContext para obtener los Contextos
import { useContext, useState } from "react"
// Importamos los Contextos necesarios
import { UserContext } from "../context/UserProvider"

import { Link, useNavigate } from "react-router-dom"
import { Alert, Button, Checkbox, Form, Input, message } from "antd"

const Login = () => {

    // Iniciamos los estados
    const [email, setEmail] = useState('admin@stil.com')
    const [password, setPassword] = useState('123123')

    // Obtenemos los contextos
    const { loginUser } = useContext(UserContext)

    // Inicializamos el useNsavigate
    const navigate = useNavigate()

    // handle con Funcion asincrona para hacer LOGIN
    const handleOnFinishForm = async (e) => {
        // console.log("Procesando form:, ", email, password, rePassword)
        try {
            await loginUser(email, password)
            navigate('/')
        } catch (error) {
            console.log('Error al logear usuario CODIGO: ', error.code)
            alert(error.code)
            
        }
    }


    return (
        <>
            <h1>Login</h1>
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
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}

export default Login