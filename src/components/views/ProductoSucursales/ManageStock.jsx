import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input, Typography, Select, message, Modal, Image } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const ManageStock = () => {
  const [sucursales, setSucursales] = useState([]);
  const [productos, setProductos] = useState([]);
  const [stock, setStock] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [selectedTalla, setSelectedTalla] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewStockModalOpen, setIsNewStockModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';
  //const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';
  useEffect(() => {
    fetchSucursales();
    fetchProductos();
  }, []);

  const fetchSucursales = async () => {
    try {
      const response = await axios.get(`${backendUrl}/auth/sucursales`);
      setSucursales(response.data);
    } catch (error) {
      message.error('Error al cargar las sucursales');
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/auth/producto`);
      setProductos(response.data);
    } catch (error) {
      message.error('Error al cargar los productos');
    }
  };

  const fetchStock = async (sucursalId, productId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/auth/stock`);
      let filteredStock = response.data;

      if (sucursalId) {
        filteredStock = filteredStock.filter((item) => item.sucursal.id === sucursalId);
      }

      if (productId) {
        filteredStock = filteredStock.filter((item) => item.producto.id === productId);
      }

      setStock(filteredStock);
    } catch (error) {
      message.error('Error al cargar el stock');
    } finally {
      setLoading(false);
    }
  };

  const handleSucursalChange = (sucursalId) => {
    setSelectedSucursal(sucursalId);
    setSelectedProduct(null);
    setStock([]);
  };

  const handleProductChange = (productId) => {
    setSelectedProduct(productId);
  };

  const handleTallaChange = (talla) => {
    setSelectedTalla(talla);
  };

  const handleSearch = () => {
    if (selectedSucursal) {
      fetchStock(selectedSucursal, selectedProduct);
    } else {
      message.warning('Seleccione una sucursal para buscar el stock.');
    }
  };

  const handleAddStock = async () => {
    if (!selectedSucursal || !selectedProduct || !cantidad || !selectedTalla) {
      message.error('Por favor, seleccione una sucursal, un producto, la talla y la cantidad de stock a agregar.');
      return;
    }

    try {
      await axios.post(`${backendUrl}/auth/stock`, {
        cantidad,
        talla: selectedTalla,
        producto: { id: selectedProduct },
        sucursal: { id: selectedSucursal },
      });
      message.success('Stock agregado exitosamente');
      fetchStock(selectedSucursal, selectedProduct);
      setCantidad('');
      setSelectedTalla('');
      setIsNewStockModalOpen(false);
    } catch (error) {
      message.error('Error al agregar el stock');
    }
  };

  const handleAdicionarStock = async () => {
    if (!currentRecord || !cantidad) {
      message.error('Por favor, ingrese la cantidad a adicionar.');
      return;
    }

    try {
      const newQuantity = parseInt(currentRecord.cantidad) + parseInt(cantidad);
      await axios.put(`${backendUrl}/auth/stock/${currentRecord.id}`, {
        ...currentRecord,
        cantidad: newQuantity,
      });
      message.success('Stock adicionado exitosamente');
      fetchStock(selectedSucursal, selectedProduct);
      setCantidad('');
      setIsModalOpen(false);
    } catch (error) {
      message.error('Error al adicionar el stock');
    }
  };

  const columns = [
    {
      title: 'Imagen',
      dataIndex: ['producto', 'imagenUrl'],
      key: 'imagen',
      render: (text) => (
        <Image
          width={50}
          height={50}
          src={text}
          alt="Imagen del Producto"
          style={{ borderRadius: '5px' }}
          
        />
      ),
    },
    {
      title: 'Producto',
      dataIndex: ['producto', 'nombre'],
      key: 'nombre',
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      key: 'talla',
    },
    {
      title: 'Sucursal',
      dataIndex: ['sucursal', 'nombre'],
      key: 'sucursal',
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
              setCurrentRecord(record);
            }}
          >
            Adicionar Stock
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestión de Stock</Title>

      <Space style={{ marginBottom: '20px' }}>
        <Select
          placeholder="Seleccionar Sucursal"
          style={{ width: 200 }}
          onChange={handleSucursalChange}
          value={selectedSucursal}
        >
          {sucursales.map((sucursal) => (
            <Option key={sucursal.id} value={sucursal.id}>
              {sucursal.nombre}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Seleccionar Producto"
          style={{ width: 200 }}
          onChange={handleProductChange}
          value={selectedProduct}
          disabled={!selectedSucursal}
        >
          {productos.map((producto) => (
            <Option key={producto.id} value={producto.id}>
              {producto.nombre}
            </Option>
          ))}
        </Select>

        <Button type="primary" onClick={handleSearch} disabled={!selectedSucursal}>
          Buscar
        </Button>
      </Space>

      <Table columns={columns} dataSource={stock} rowKey="id" loading={loading} pagination={{ pageSize: 5, size: 'small' }} />

      {/* Modal para Adicionar Stock a un Producto Existente */}
      <Modal
        title="Adicionar Stock"
        visible={isModalOpen}
        onOk={handleAdicionarStock}
        onCancel={() => setIsModalOpen(false)}
        okText="Adicionar"
        cancelText="Cancelar"
        okButtonProps={{ disabled: !cantidad }}
      >
        <Input
          placeholder="Cantidad a adicionar"
          value={cantidad}
          type="number"
          onChange={(e) => setCantidad(e.target.value)}
        />
      </Modal>

      {/* Modal para Crear Nuevo Stock */}
      <Modal
        title="Agregar Nuevo Stock"
        visible={isNewStockModalOpen}
        onOk={handleAddStock}
        onCancel={() => setIsNewStockModalOpen(false)}
        okText="Agregar"
        cancelText="Cancelar"
        okButtonProps={{ disabled: !cantidad || !selectedSucursal || !selectedProduct || !selectedTalla }}
      >
        <Select
          placeholder="Seleccionar Sucursal"
          style={{ width: '100%', marginBottom: '20px' }}
          onChange={handleSucursalChange}
          value={selectedSucursal}
        >
          {sucursales.map((sucursal) => (
            <Option key={sucursal.id} value={sucursal.id}>
              {sucursal.nombre}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Seleccionar Producto"
          style={{ width: '100%', marginBottom: '20px' }}
          onChange={handleProductChange}
          value={selectedProduct}
          disabled={!selectedSucursal}
        >
          {productos.map((producto) => (
            <Option key={producto.id} value={producto.id}>
              {producto.nombre}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Seleccionar Talla"
          style={{ width: '100%', marginBottom: '20px' }}
          value={selectedTalla}
          onChange={handleTallaChange}
        >
          <Option value="S">S</Option>
          <Option value="M">M</Option>
          <Option value="L">L</Option>
          <Option value="XL">XL</Option>
        </Select>

        <Input
          placeholder="Cantidad de stock"
          value={cantidad}
          type="number"
          onChange={(e) => setCantidad(e.target.value)}
        />
      </Modal>

      {/* Botón para Agregar Nuevo Stock */}
      <div style={{ textAlign: 'right', marginTop: 20 }}>
        <Button type="primary" onClick={() => setIsNewStockModalOpen(true)}>
          Agregar Nuevo Stock
        </Button>
      </div>
    </div>
  );
};

export default ManageStock;
