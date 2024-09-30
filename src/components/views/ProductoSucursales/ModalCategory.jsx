import { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';

const ModalCategory = ({ getDatos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

 // const backendUrl = 'http://localhost:8080';
 const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';
 
  const handleOk = async () => {
    try {
      await axios.post(`${backendUrl}/auth/categorias`, {
        nombre,
        descripcion,
      });

      messageApi.success('Categoría guardada exitosamente');
      getDatos();
      setNombre('');
      setDescripcion('');
      setIsModalOpen(false);
    } catch {
      messageApi.error('Error al guardar la categoría');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNombre('');
    setDescripcion('');
  };

  return (
    <>
      <Button className="w-full font-bold" onClick={() => setIsModalOpen(true)}>
        Agregar Categoría
      </Button>
      <Modal
        title="Agregar Categoría"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cerrar"
        okButtonProps={{ disabled: !nombre || !descripcion }}
      >
        <Input placeholder="Nombre de la categoría" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <Input placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} style={{ marginTop: '1rem' }} />
        {contextHolder}
      </Modal>
    </>
  );
};

export default ModalCategory;
