import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker } from 'antd';
import assets from '../../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/users/AuthContext';

const FormRegister = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const onFinish = async (values) => {
        const { confirmPassword, ...rest } = values;
        if (values.password !== confirmPassword) {
            console.error('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/auth/register', rest);
            console.log('Registro exitoso:', response.data);
            login();
            navigate('/home');
        } catch (error) {
            console.error('Error al registrar:', error.response.data);
        }
    };




    return (
        <div className="flex h-screen">
            <div className="relative w-1/2 h-full overflow-hidden max-sm:hidden">
                <img
                    src={assets.auth}
                    alt="Background"
                    className="object-cover h-full"
                />
            </div>
            <div className="w-1/2 flex items-center justify-center bg-white max-sm:w-full">
                <Form
                    name="Register"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 360,
                    }}
                    onFinish={onFinish}
                >
                    <h1 className='py-3'>Registro de Usuario</h1>
                    <Form.Item
                        name="nombre"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su nombre!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nombre" />
                    </Form.Item>
                    <Form.Item
                        name="apellido_paterno"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su primer apellido!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Primer Apellido" />
                    </Form.Item>
                    <Form.Item
                        name="apellido_materno"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su segundo apellido!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Segundo Apellido" />
                    </Form.Item>

                    <Form.Item
                        name="fecha_nacimiento"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su fecha de nacimiento!'
                        }]}
                    >
                        <DatePicker className="w-full" placeholder="Fecha de Nacimiento" />
                    </Form.Item>
                    <Form.Item
                        name="ci"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su CI!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="C.I." />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su E-mail!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="E-mail" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su contraseña!',
                            },
                        ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese nuevamente su contraseña!',
                            },
                        ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Confirmar Contraseña" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Registrarse
                        </Button>
                        <h1>Ya tienes una cuenta? <a href="/login">Inicia sesión!</a></h1>

                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default FormRegister;