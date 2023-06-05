// Importamos el useContext para obtener los Contextos
import { useContext, useState } from "react"
// Importamos los Contextos necesarios
import { UserContext } from "../context/UserProvider"

import { useNavigate } from "react-router-dom"
import { Button, Checkbox, Col, Divider, Form, Input, Row, message } from "antd"



const Login = () => {

    // Iniciamos los estados
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Obtenemos los contextos
    const { loginUser } = useContext(UserContext)

    // Inicializamos el useNsavigate
    const navigate = useNavigate()

    // handle con Funcion asincrona para hacer LOGIN
    const handleOnFinishForm = async (e) => {
        // console.log("Procesando form:, ", email, password, rePassword)
        try {
            await loginUser(email, password)
            navigate('/giftcard')
        } catch (error) {
            console.log('Error al logear usuario CODIGO: ', error.code)
            alert(error.code)

        }
    }




    return (
        <>
            <Divider orientation="left">LOGIN</Divider>
            <Row>
                <Col style={{ padding: 24 }} span={24}>
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
                </Col>
            </Row>


        </>
    )
}

export default Login