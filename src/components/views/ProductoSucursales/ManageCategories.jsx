import { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import CategoryModal from './ModalCategory';
import axios from 'axios';

const { Title } = Typography;

const ManageCategories = () => {
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

 // const backendUrl = 'http://localhost:8080';
 const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/auth/categorias`);
      setCategories(response.data);
    } catch (error) {
      message.error('Error al cargar las categorías');
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = useCallback((categoryId) => {
    setEditingCategoryId(categoryId);
    const category = categories.find(category => category.id === categoryId);
    setEditedData({
      [categoryId]: {
        nombre: category.nombre,
        descripcion: category.descripcion,
      }
    });
  }, [categories]);

  const handleSaveCategory = useCallback(async (categoryId) => {
    try {
      const categoryToUpdate = {
        id: categoryId,
        nombre: editedData[categoryId].nombre,
        descripcion: editedData[categoryId].descripcion,
      };
      await axios.put(`${backendUrl}/auth/categorias/${categoryId}`, categoryToUpdate);

      message.success('Categoría actualizada exitosamente');
      fetchCategories();
      setEditingCategoryId(null);
    } catch (error) {
      message.error('Error al actualizar la categoría');
      console.error('Error al actualizar datos:', error);
    }
  }, [editedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingCategoryId(null);
    setEditedData({});
  }, []);

  const handleDeleteCategory = useCallback(async (categoryId) => {
    try {
      await axios.delete(`${backendUrl}/auth/categorias/${categoryId}`);
      message.success('Categoría eliminada exitosamente');
      fetchCategories();
      setEditingCategoryId(null);
    } catch (error) {
      message.error('Error al eliminar la categoría');
      console.error('Error al eliminar datos:', error);
    }
  }, []);

  const handleInputChange = useCallback((value, categoryId, field) => {
    setEditedData(prevState => ({
      ...prevState,
      [categoryId]: {
        ...prevState[categoryId],
        [field]: value
      }
    }));
  }, []);

  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingCategoryId) {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
          onPressEnter={() => handleSaveCategory(record.id)}
        />
      );
    }
    return text;
  }, [editingCategoryId, editedData, handleInputChange, handleSaveCategory]);

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
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      render: (text, record) => renderEditableInput(text, record, 'descripcion'),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingCategoryId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveCategory(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="text" onClick={() => handleEditCategory(record.id)}>Editar</Button>
              <Button onClick={() => handleDeleteCategory(record.id)}>Eliminar</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Categorías</Title>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        loading={loading}
        bordered
      />
      <div className="add-category-button">
        <CategoryModal getDatos={fetchCategories} />
      </div>
    </div>
  );
};

export default ManageCategories;
