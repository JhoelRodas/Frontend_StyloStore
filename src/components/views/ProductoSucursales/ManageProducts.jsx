import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message, Image, Select } from 'antd';
import ProductModal from './ModalProduct';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const ManageProducts = () => {
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [loading, setLoading] = useState(false);

  //const backendUrl = 'http://localhost:8080';
  const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';
  // Obtener datos de productos y categorías
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/auth/producto`);
      setProducts(response.data);
    } catch (error) {
      message.error('Error al cargar los productos');
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/auth/categorias`);
      setCategories(response.data);
    } catch (error) {
      message.error('Error al cargar las categorías');
      console.error('Error al obtener categorías:', error);
    }
  };

  // Manejar edición de producto
  const handleEditProduct = useCallback((productId) => {
    setEditingProductId(productId);
    const product = products.find((product) => product.id === productId);
    setEditedData({
      [productId]: {
        nombre: product.nombre,
        precio: product.precio,
        descripcion: product.descripcion,
        categoria: product.categoria.id, // Usar el id de la categoría para edición
        imagenUrl: product.imagenUrl,
      },
    });
  }, [products]);

  // Guardar los datos editados
  const handleSaveProduct = useCallback(async (productId) => {
    try {
      const productToUpdate = {
        id: productId,
        nombre: editedData[productId].nombre,
        precio: editedData[productId].precio,
        descripcion: editedData[productId].descripcion,
        categoria: { id: editedData[productId].categoria }, // Enviar el objeto categoría con el id
        imagenUrl: editedData[productId].imagenUrl,
      };

      await axios.put(`${backendUrl}/auth/producto/${productId}`, productToUpdate);

      message.success('Producto actualizado exitosamente');
      fetchProducts();
      setEditingProductId(null);
    } catch (error) {
      message.error('Error al actualizar el producto');
      console.error('Error al actualizar datos:', error);
    }
  }, [editedData]);

  // Manejar cancelación de edición
  const handleCancelEdit = useCallback(() => {
    setEditingProductId(null);
    setEditedData({});
  }, []);

  // Manejar eliminación de producto
  const handleDeleteProduct = useCallback(async (productId) => {
    try {
      await axios.delete(`${backendUrl}/auth/producto/${productId}`);
      message.success('Producto eliminado exitosamente');
      fetchProducts();
      setEditingProductId(null);
    } catch (error) {
      message.error('Error al eliminar el producto');
      console.error('Error al eliminar datos:', error);
    }
  }, []);

  // Manejar cambios en el input de edición
  const handleInputChange = useCallback((value, productId, field) => {
    setEditedData((prevState) => ({
      ...prevState,
      [productId]: {
        ...prevState[productId],
        [field]: value,
      },
    }));
  }, []);

  // Renderizar campos editables para el nombre y otros campos
  const renderEditableInput = useCallback(
    (text, record, dataIndex) => {
      if (record.id === editingProductId) {
        return (
          <Input
            value={editedData[record.id]?.[dataIndex] || text}
            onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
            onPressEnter={() => handleSaveProduct(record.id)}
          />
        );
      }
      return text;
    },
    [editingProductId, editedData, handleInputChange, handleSaveProduct]
  );

  // Renderizar el selector para categorías
  const renderEditableCategorySelect = useCallback(
    (text, record) => {
      if (record.id === editingProductId) {
        return (
          <Select
            value={editedData[record.id]?.categoria || record.categoria.id}
            onChange={(value) => handleInputChange(value, record.id, 'categoria')}
            style={{ width: '100%' }}
          >
            {categories.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.nombre}
              </Option>
            ))}
          </Select>
        );
      }
      return record.categoria?.nombre || '';
    },
    [editingProductId, editedData, categories, handleInputChange]
  );

  // Definición de columnas para la tabla de productos
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text, record) => renderEditableInput(text, record, 'nombre'),
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
      render: (text, record) => renderEditableInput(text, record, 'precio'),
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      render: (text, record) => renderEditableInput(text, record, 'descripcion'),
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      key: 'categoria',
      render: (text, record) => renderEditableCategorySelect(text, record),
    },
    {
      title: 'Imagen',
      dataIndex: 'imagenUrl',
      key: 'imagenUrl',
      render: (text) => <Image width={100} src={text} />,
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingProductId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveProduct(record.id)}>
                Guardar
              </Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="text" onClick={() => handleEditProduct(record.id)}>
                Editar
              </Button>
              <Button onClick={() => handleDeleteProduct(record.id)}>Eliminar</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Productos</Title>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        loading={loading}
        bordered
      />
      <div className="add-product-button">
        <ProductModal fetchProducts={fetchProducts} categories={categories} />
      </div>
    </div>
  );
};

export default ManageProducts;
