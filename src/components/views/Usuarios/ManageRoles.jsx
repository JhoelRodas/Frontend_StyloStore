import  { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography,message } from 'antd';
import RoleModal from './RoleModal';
import axios from 'axios';

// Datos simulados
// const simulatedRoles = [ //aqui
//   { id: 1, name: 'Administrador', permissions: [{ id: 1, name: 'Crear usuario' }, { id: 2, name: 'Eliminar usuario' }] },
//   { id: 2, name: 'Usuario', permissions: [{ id: 3, name: 'Ver contenido' }] }
// ];

const { Title } = Typography;
const ManageRoles = () => {
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtener datos
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://backend-ecommerce-z9dp.onrender.com/auth/roles');
      //const response = await axios.get('http://localhost:8080/auth/roles');
      setRoles(response.data);
    } catch (error) {
      message.error('Error al cargar los Roles');
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleEditRole = useCallback((roleId) => {
    setEditingRoleId(roleId);
    const role = roles.find(role => role.id === roleId);
    setEditedData({ [roleId]: { name: role.name } });
  }, [roles]);


  //Button guardar, lo editado
  const handleSaveRole = useCallback(async(roleId) => {
    try {
      const roleToUpdate = { id: roleId, nombre: editedData[roleId].name }; // Datos del rol a actualizar
      await axios.put(`https://backend-ecommerce-z9dp.onrender.com/auth/roles/${roleId}`,roleToUpdate); // Solicitud PUT
      //await axios.put(`http://localhost:8080/auth/roles/${roleId}`,roleToUpdate); // Solicitud PUT
      message.success('Rol actualizado exitosamente');
      fetchRoles(); // Recargar los roles después de editar
      setEditingRoleId(null); // Resetear el estado de edición
    } catch (error) {
      message.error('Error al actualizar el Rol');
      console.error('Error al actualizar datos:', error);
    }
  }, [editedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingRoleId(null);
    setEditedData({});
  }, []);

    // Eliminar profesión
    const handleDeleteRole = useCallback(async (roleId) => {
      try {
        const roleToUpdate = { id: roleId}; // Datos del rol a actualizar
        await axios.delete(`https://backend-ecommerce-z9dp.onrender.com/auth/roles/${roleId}`,roleToUpdate); // Solicitud delete
       // await axios.delete(`http://localhost:8080/auth/roles/${roleId}`,roleToUpdate); // Solicitud delete
        message.success('Rol eliminado exitosamente');
        fetchRoles(); // Recargar los roles después de editar
        setEditingRoleId(null); // Resetear el estado de edición
      } catch (error) {
        message.error('Error al eliminar el Rol');
        console.error('Error al eliminar datos:', error);
      }
    }, []);

  const handleInputChange = useCallback((value, roleId, field) => {
    setEditedData(prevState => ({
      ...prevState,
      [roleId]: {
        ...prevState[roleId],
        [field]: value
      }
    }));
  }, []);

  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingRoleId && dataIndex === 'name') {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
          onPressEnter={() => handleSaveRole(record.id)}
        />
      );
    }
    return text;
  }, [editingRoleId, editedData, handleInputChange, handleSaveRole]);




  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'name',
      render: (text, record) => renderEditableInput(text, record, 'name'),
    },

    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingRoleId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveRole(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="text" onClick={() => handleEditRole(record.id)}>Editar</Button>
              <Button onClick={() => handleDeleteRole(record.id)}>Eliminar</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Roles</Title>
      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        loading={loading}
        bordered
      />
      <div className="add-role-button">
        <RoleModal getDatos={fetchRoles} />
      </div>
    </div>
  );
};

export default ManageRoles;