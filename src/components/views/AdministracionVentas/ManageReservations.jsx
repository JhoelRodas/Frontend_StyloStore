import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Typography, message, Select, DatePicker, Modal, Descriptions, Image } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

const ManageReservations = () => {
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null); // Reserva seleccionada para ver en la modal
  const [isModalVisible, setIsModalVisible] = useState(false); // Control de visibilidad de la modal

  //const backendUrl = 'http://localhost:8080';
    const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';
  // Obtener datos de reservas, usuarios y productos
  useEffect(() => {
    fetchReservations();
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/auth/reservas`);
      setReservations(response.data);
    } catch (error) {
      message.error('Error al cargar las reservas');
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/auth/users`);
      setUsers(response.data);
    } catch (error) {
      message.error('Error al cargar los usuarios');
      console.error('Error al obtener usuarios:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/auth/producto`);
      setProducts(response.data);
    } catch (error) {
      message.error('Error al cargar los productos');
      console.error('Error al obtener productos:', error);
    }
  };

  // Manejar la apertura de la modal con la reserva seleccionada
  const handleViewReservation = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalVisible(true);
  };

  // Manejar el cierre de la modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedReservation(null);
  };

  // Manejar la actualización del estado de la reserva en la ventana modal
  const handleStateChange = (value) => {
    setSelectedReservation((prevReservation) => ({
      ...prevReservation,
      estado: value,
    }));
  };

  // Guardar el estado actualizado de la reserva en el backend
  const handleSaveState = async () => {
    try {
      await axios.put(`${backendUrl}/auth/reservas/${selectedReservation.id}`, {
        ...selectedReservation,
        estado: selectedReservation.estado, // Enviar el estado actualizado
      });
      message.success('Estado de la reserva actualizado exitosamente');
      fetchReservations(); // Refrescar la lista de reservas
      setIsModalVisible(false);
    } catch (error) {
      message.error('Error al actualizar el estado de la reserva');
      console.error('Error al actualizar estado:', error);
    }
  };

  // Definición de columnas para la tabla de reservas
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
      render: (text, record) => record.user?.username || '',
    },
    {
      title: 'Producto',
      dataIndex: 'producto',
      key: 'producto',
      render: (text, record) => record.producto?.nombre || '',
    },
    {
      title: 'Fecha Reserva',
      dataIndex: 'fechaReserva',
      key: 'fechaReserva',
      render: (text) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '',
    },
    {
      title: 'Fecha Recogida',
      dataIndex: 'fechaRecogida',
      key: 'fechaRecogida',
      render: (text) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" onClick={() => handleViewReservation(record)}>
            Ver
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Reservas</Title>
      <Table
        columns={columns}
        dataSource={reservations}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        loading={loading}
        bordered
      />

      {/* Modal para mostrar detalles de la reserva */}
      <Modal
        title="Detalles de la Reserva"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="save" type="primary" onClick={handleSaveState}>
            Guardar
          </Button>,
          <Button key="close" onClick={handleModalClose}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedReservation && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Usuario">{selectedReservation.user?.username}</Descriptions.Item>
            <Descriptions.Item label="Nombre del Producto">{selectedReservation.producto?.nombre}</Descriptions.Item>
            <Descriptions.Item label="Categoría">{selectedReservation.producto?.categoria?.nombre}</Descriptions.Item>
            <Descriptions.Item label="Precio">${selectedReservation.producto?.precio}</Descriptions.Item>
            <Descriptions.Item label="Color">{selectedReservation.producto?.color}</Descriptions.Item>
            <Descriptions.Item label="Fecha de Reserva">{moment(selectedReservation.fechaReserva).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
            <Descriptions.Item label="Fecha de Recogida">
              {selectedReservation.fechaRecogida ? moment(selectedReservation.fechaRecogida).format('YYYY-MM-DD HH:mm:ss') : 'No definida'}
            </Descriptions.Item>
            <Descriptions.Item label="Estado">
              <Select
                value={selectedReservation.estado}
                onChange={handleStateChange}
                style={{ width: '100%' }}
              >
                <Option value="Pendiente">Pendiente</Option>
                <Option value="Completado">Completado</Option>
                <Option value="Cancelado">Cancelado</Option>
                <Option value="Entregado">Entregado</Option> {/* Nuevo estado: Entregado */}
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="Imagen del Producto">
              <Image width={200} src={selectedReservation.producto?.imagenUrl} />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default ManageReservations;
