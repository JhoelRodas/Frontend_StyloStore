import  { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';


const RoleModal = ({ getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    // const handleOk = () => {
    //     // Simulación de creación del rol
    //     console.log(`Simulación de creación del rol con nombre: ${roleName}`);
    //     getDatos();
    //     setRoleName('');
    //     messageApi.success('Rol guardado exitosamente');
    //     setIsModalOpen(false);
    // };


    //const backendUrl = 'http://localhost:8080';
    const backendUrl = 'https://backend-ecommerce-z9dp.onrender.com';
    
    const handleOk = async () => {
        try {
            // Envía la petición POST al backend para crear la nueva profesión
            await axios.post(`${backendUrl}/auth/roles`, {
                nombre: roleName, // Envia el nombre de la profesión
            });

            messageApi.success('Rol guardado exitosamente');
            getDatos(); // Recargar los datos después de guardar

            setRoleName(''); // Limpiar el input
            setIsModalOpen(false); // Cerrar el modal
        } catch {
            messageApi.error('Error al guardar el Rol');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setRoleName('');
    };

    return (
        <>
            <Button className="w-full font-bold" onClick={() => setIsModalOpen(true)}>
                Agregar Rol
            </Button>
            <Modal
                title="Agregar Rol"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
                okButtonProps={{ disabled: !roleName }}
            >
                <Input
                    placeholder="Nombre del rol..."
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                />
                {contextHolder}
            </Modal>
        </>
    );
};

export default RoleModal;
