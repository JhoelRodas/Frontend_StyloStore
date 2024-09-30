import { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import SucursalModal from './ModalBranches';
import axios from 'axios';

const { Title } = Typography;

const ManageBranches = () => {
  const [editingSucursalId, setEditingSucursalId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(false);

  //const backendUrl = 'http://localhost:8080';
  const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';

  // Obtener datos
  useEffect(() => {
    fetchSucursales();
  }, []);

  const fetchSucursales = async () => {
    setLoading(true);
    try {
      //const response = await axios.get('https://backend-ecommerce-z9dp.onrender.com/auth/sucursales');
      
      const response = await axios.get(`${backendUrl}/auth/sucursales`);
      setSucursales(response.data);
    } catch (error) {
      message.error('Error al cargar las sucursales');
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSucursal = useCallback((sucursalId) => {
    setEditingSucursalId(sucursalId);
    const sucursal = sucursales.find(sucursal => sucursal.id === sucursalId);
    setEditedData({ [sucursalId]: { 
      nombre: sucursal.nombre, 
      direccion: sucursal.direccion, 
      telefono: sucursal.telefono, 
      hora_atencion: sucursal.hora_atencion 
    } });
  }, [sucursales]);

  // Guardar los datos editados
  const handleSaveSucursal = useCallback(async (sucursalId) => {
    try {
      const sucursalToUpdate = { 
        id: sucursalId, 
        nombre: editedData[sucursalId].nombre, 
        direccion: editedData[sucursalId].direccion, 
        telefono: editedData[sucursalId].telefono, 
        horaAtencion: editedData[sucursalId].hora_atencion 
      };
      // await axios.put(`https://backend-ecommerce-z9dp.onrender.com/${sucursalId}`, sucursalToUpdate);
      await axios.put(`${backendUrl}/auth/sucursales/${sucursalId}`, sucursalToUpdate);

      message.success('Sucursal actualizada exitosamente');
      fetchSucursales();
      setEditingSucursalId(null);
    } catch (error) {
      message.error('Error al actualizar la sucursal');
      console.error('Error al actualizar datos:', error);
    }
  }, [editedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingSucursalId(null);
    setEditedData({});
  }, []);

  // Eliminar sucursal
  const handleDeleteSucursal = useCallback(async (sucursalId) => {
    try {
      // await axios.delete(`https://backend-ecommerce-z9dp.onrender.com/auth/sucursales/${sucursalId}`);
      
      await axios.delete(`${backendUrl}/auth/sucursales/${sucursalId}`);

      message.success('Sucursal eliminada exitosamente');
      fetchSucursales();
      setEditingSucursalId(null);
    } catch (error) {
      message.error('Error al eliminar la sucursal');
      console.error('Error al eliminar datos:', error);
    }
  }, []);

  const handleInputChange = useCallback((value, sucursalId, field) => {
    setEditedData(prevState => ({
      ...prevState,
      [sucursalId]: {
        ...prevState[sucursalId],
        [field]: value
      }
    }));
  }, []);

  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingSucursalId) {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
          onPressEnter={() => handleSaveSucursal(record.id)}
        />
      );
    }
    return text;
  }, [editingSucursalId, editedData, handleInputChange, handleSaveSucursal]);

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
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'direccion',
      render: (text, record) => renderEditableInput(text, record, 'direccion'),
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono',
      render: (text, record) => renderEditableInput(text, record, 'telefono'),
    },
    {
      title: 'Hora de atención',
      dataIndex: 'horaAtencion',
      key: 'hora_atencion',
      render: (text, record) => renderEditableInput(text, record, 'hora_atencion'),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingSucursalId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveSucursal(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="text" onClick={() => handleEditSucursal(record.id)}>Editar</Button>
              <Button onClick={() => handleDeleteSucursal(record.id)}>Eliminar</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Sucursales</Title>
      <Table
        columns={columns}
        dataSource={sucursales}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        loading={loading}
        bordered
      />
      <div className="add-sucursal-button">
        <SucursalModal getDatos={fetchSucursales} />
      </div>
    </div>
  );
};

export default ManageBranches;
