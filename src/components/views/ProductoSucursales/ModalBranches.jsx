import { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';

const ModalBranches = ({ getDatos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [horaAtencion, setHoraAtencion] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';
  //const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';

  const handleOk = async () => {
    try {
      // await axios.post('https://backend-ecommerce-z9dp.onrender.com/auth/sucursales', {
        await axios.post(`${backendUrl}/auth/sucursales`, {
        nombre,
        direccion,
        telefono,
        horaAtencion
      });

      messageApi.success('Sucursal guardada exitosamente');
      getDatos();
      setNombre('');
      setDireccion('');
      setTelefono('');
      setHoraAtencion('');
      setIsModalOpen(false);
    } catch {
      messageApi.error('Error al guardar la sucursal');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNombre('');
    setDireccion('');
    setTelefono('');
    setHoraAtencion('');
  };

  return (
    <>
      <Button className="w-full font-bold" onClick={() => setIsModalOpen(true)}>
        Agregar Sucursal
      </Button>
      <Modal
        title="Agregar Sucursal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cerrar"
        okButtonProps={{ disabled: !nombre || !direccion || !telefono || !horaAtencion }}
      >
        <Input placeholder="Nombre de la sucursal" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <Input placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={{ marginTop: '1rem' }} />
        <Input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={{ marginTop: '1rem' }} />
        <Input placeholder="Hora de atención" value={horaAtencion} onChange={(e) => setHoraAtencion(e.target.value)} style={{ marginTop: '1rem' }} />
        {contextHolder}
      </Modal>
    </>
  );
};

export default ModalBranches;

