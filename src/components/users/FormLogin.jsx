//import React from 'react';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/users/AuthContext";
import axios from "axios";
import assets from "../../utils";
import "./FormLogin.css"; // Importamos un archivo CSS para personalizar el estilo

const FormLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
       // const response = await axios.post("http://localhost:8080/auth/login", {
      const response = await axios.post("https://backend-ecommerce-z9dp.onrender.com/auth/login", {
        username: username,
        password: password,
      });
      const { token } = response.data;

      localStorage.setItem("token", token);

      login();
      message.success("Sesión iniciada correctamente");
      navigate("/home");
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response ? error.response.data : error.message
      );
      message.error("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      {/* Imagen de fondo */}
      <img src={assets.auth} alt="Background" className="background-image" />

      {/* Formulario centrado */}
      <div className="login-box">
        <h5>Inicio de Sesión</h5>

        <Form
          name="Login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Por favor ingrese su usuario!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email ID"
              className="input-field"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Por favor ingrese su contraseña!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="input-field"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox className="remember-checkbox">Remember me</Checkbox>
            <a className="forgot-password" href="/forgotPassword">
              Forgot Password?
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="login-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormLogin;
