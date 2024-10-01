import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const RegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // URL del backend
  const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';
  //const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/auth/register`, values);
      message.success('Usuario registrado exitosamente');
      form.resetFields();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      message.error('Error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Registrar Nuevo Usuario</Title>
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          username: '',
          password: '',
          firstname: '',
          lastname: '',
          telefono: '',
        }}
      >
        <Form.Item
          name="username"
          label="Correo"
          rules={[{ required: true, message: 'Por favor ingrese el correo' }]}
        >
          <Input placeholder="Correo" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[{ required: true, message: 'Por favor ingrese la contraseña' }]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item
          name="firstname"
          label="Nombre"
          rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
        >
          <Input placeholder="Nombre" />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Apellidos"
          rules={[{ required: true, message: 'Por favor ingrese los apellidos' }]}
        >
          <Input placeholder="Apellidos" />
        </Form.Item>

        <Form.Item
          name="telefono"
          label="Teléfono"
          rules={[{ required: true, message: 'Por favor ingrese el teléfono' }]}
        >
          <Input placeholder="Teléfono" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Registrar Usuario
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterUser;
