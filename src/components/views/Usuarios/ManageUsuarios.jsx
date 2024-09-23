import { useEffect, useState, useCallback } from 'react';
import { Space, Table, Input, Typography ,message} from 'antd';
import axios from 'axios';

const { Title } = Typography;
const ManageUsuarios = () => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Obtener datos
  useEffect(() => {
    fetchUsuario();
  }, []);

  const fetchUsuario = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/auth/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Error al cargar los usuarios');
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = useCallback((value, userId, field) => {
    setEditedData(prevState => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        [field]: value
      }
    }));
  }, []);

  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingUserId) {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
        />
      );
    }
    return text;
  }, [editingUserId, editedData, handleInputChange]);

  // Definir las columnas con los nuevos campos
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Correo',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => renderEditableInput(text, record, 'username'),
    },
    {
      title: 'Nombre',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (text, record) => renderEditableInput(text, record, 'firstname'),
    },
    {
      title: 'Apellidos',
      dataIndex: 'lastname',
      key: 'lastname',
      render: (text, record) => renderEditableInput(text, record, 'lastname'),
    },
  
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono',
      render: (text, record) => renderEditableInput(text, record, 'telefono'),
    },

    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => record.role?.nombre || 'Sin rol',
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Usuarios</Title>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        loading={loading}
        bordered
      />
    </div>
  );
};

export default ManageUsuarios;
