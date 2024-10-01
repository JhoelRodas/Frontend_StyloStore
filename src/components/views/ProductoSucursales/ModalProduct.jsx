import { useState, useEffect } from 'react';
import { Button, Modal, Input, message, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const ModalProducts = ({ fetchProducts, categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';
  //const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';

  const handleOk = async () => {
    try {
      await axios.post(`${backendUrl}/auth/producto`, {
        nombre,
        precio,
        descripcion,
        categoria: { id: categoria }, // Enviar el id de la categoría
        imagenUrl,
      });

      messageApi.success('Producto guardado exitosamente');
      fetchProducts(); // Actualizar la lista de productos
      setNombre('');
      setPrecio('');
      setDescripcion('');
      setCategoria('');
      setImagenUrl('');
      setIsModalOpen(false);
    } catch (error) {
      messageApi.error('Error al guardar el producto');
      console.error('Error al guardar el producto:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNombre('');
    setPrecio('');
    setDescripcion('');
    setCategoria('');
    setImagenUrl('');
  };

  return (
    <>
      <Button className="w-full font-bold" type="primary" onClick={() => setIsModalOpen(true)}>
        Agregar Producto
      </Button>
      <Modal
        title="Agregar Producto"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cerrar"
        okButtonProps={{ disabled: !nombre || !precio || !descripcion || !categoria || !imagenUrl }}
      >
        <Input placeholder="Nombre del producto" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <Input
          placeholder="Precio del producto"
          value={precio}
          type="number"
          onChange={(e) => setPrecio(e.target.value)}
          style={{ marginTop: '1rem' }}
        />
        <Input
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ marginTop: '1rem' }}
        />
        <Select
          placeholder="Categoría"
          value={categoria}
          onChange={(value) => setCategoria(value)}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {categories.map((cat) => (
            <Option key={cat.id} value={cat.id}>
              {cat.nombre}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="URL de la imagen"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          style={{ marginTop: '1rem' }}
        />
        {contextHolder}
      </Modal>
    </>
  );
};

export default ModalProducts;
