import  { useEffect, useState } from 'react';
import { Select, Checkbox, Button, Typography, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const ManagePermissions = () => {
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [rolePermissions, setRolePermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        fetchRoles();
        fetchPermisos();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('https://backend-ecommerce-z9dp.onrender.com/auth/roles');
           
           // const response = await axios.get('http://localhost:8080/auth/roles');
            setRoles(response.data);
        } catch (error) {
            message.error('Error al cargar los Roles');
            console.error('Error al obtener datos:', error);
        }
    };

    const fetchPermisos = async () => {
        try {
            const response = await axios.get('https://backend-ecommerce-z9dp.onrender.com/auth/permisos');
           //const response = await axios.get('http://localhost:8080/auth/permisos');
           setPermissions(response.data);
        } catch (error) {
            message.error('Error al cargar los permisos');
            console.error('Error al obtener datos:', error);
        }
    };

    const handleRoleChange = (value) => {
        setSelectedRoleId(value);
        const selectedRole = roles.find(role => role.id === value);

        // Actualizar los permisos del rol seleccionado (usando 'nombre' en lugar de 'id')
        setRolePermissions(selectedRole ? selectedRole.permisos.map(permission => permission.nombre) : []);
    };

    const handlePermissionChange = (permissionNombre) => {
        setRolePermissions(prevPermissions =>
            prevPermissions.includes(permissionNombre)
                ? prevPermissions.filter(nombre => nombre !== permissionNombre)
                : [...prevPermissions, permissionNombre]
        );
    };

    const handleSavePermissions = async () => {
        const updatedRolePermissions = {
            permisos: rolePermissions.map(nombre => ({ nombre }))
        };

        try {
            // Simulación de la actualización de los permisos
            await axios.put(`https://backend-ecommerce-z9dp.onrender.com/auth/roles/${selectedRoleId}/permisos`, updatedRolePermissions);
          //await axios.put(`http://localhost:8080/auth/roles/${selectedRoleId}/permisos`, updatedRolePermissions);  
          message.success('Permisos actualizados con éxito');
        } catch (error) {
            message.error('Error al guardar los permisos');
            console.error('Error al enviar datos:', error);
        }
    };

    return (
        <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
            <Title level={3} className="text-center">Gestionar Permisos</Title>
            <div className="mb-6">
                <h3 className="text-lg">Rol:</h3>
                <Select
                    style={{ width: '100%' }}
                    onChange={handleRoleChange}
                    value={selectedRoleId}
                    placeholder="Seleccionar Rol"
                >
                    {roles.length > 0 ? (
                        roles.map(role => (
                            <Select.Option key={role.id} value={role.id}>
                                {role.nombre}
                            </Select.Option>
                        ))
                    ) : (
                        <Select.Option>No data found</Select.Option>
                    )}
                </Select>
            </div>
            <div className="mb-6">
                <h3 className="text-lg">Permisos:</h3>
                <div className="flex flex-col items-start">
                    {permissions.length > 0 ? (
                        permissions.map(permission => (
                            <div key={permission.id} className="mb-2">
                                <Checkbox
                                    disabled={!selectedRoleId}
                                    checked={rolePermissions.includes(permission.nombre)}
                                    onChange={() => handlePermissionChange(permission.nombre)}
                                >
                                    {permission.nombre}
                                </Checkbox>
                            </div>
                        ))
                    ) : (
                        <span>No data found</span>
                    )}
                </div>
            </div>
            <div>
                <Button
                    className="w-full"
                    disabled={!selectedRoleId}
                    onClick={handleSavePermissions}
                >
                    Guardar
                </Button>
            </div>
        </div>
    );
};

export default ManagePermissions;
