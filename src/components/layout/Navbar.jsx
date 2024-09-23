// import React from 'react';
import { useAuth } from '../users/AuthContext';
import { LoginOutlined, UserAddOutlined, ShoppingOutlined } from '@ant-design/icons'; // Agrega un icono de tienda
import { Button } from 'antd';
//import { navLists } from '../../utils'; // Cambia los elementos de navLists para que reflejen una tienda de ropa
import CurrentUser from './NavbarComponents/CurrentUser';
// No necesitamos más assets para el logo del ojo, lo removemos

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    
    // Modifica la lista de navegación para una tienda de ropa
    const updatedNavLists = ['Hombres', 'Mujeres', 'Accesorios', 'Ofertas', 'Novedades'];

    return (
        <header className="bg-white w-full py-3 sm:px-10 px-5 flex justify-between border-b border-gray-300 shadow-md rounded-2xl">
            {/* Aquí puedes agregar un ícono relacionado con ropa o una marca, por ahora solo uso un ícono de tienda */}
            <div className="flex items-center">
                <ShoppingOutlined style={{ fontSize: '30px', cursor: 'pointer' }} />
                <span className="ml-2 text-lg font-bold cursor-pointer">StyloStore</span> {/* Nombre de la tienda */}
            </div>
            {/* Menú de navegación */}
            <div className="flex flex-1 justify-center items-center max-sm:hidden">
                {updatedNavLists.map((nav) => (
                    <div key={nav} className="px-1 text-sm cursor-pointer text-gray hover:text-black transition-all">
                        {nav}
                    </div>
                ))}
            </div>
            {/* Botones de autenticación */}
            <div className="flex items-baseline max-sm:justify-end max-sm:flex-1 space-x-4">
                {!isLoggedIn && (
                    <>
                        <Button type="default" shape="round" href='/login'>
                            <LoginOutlined />
                        </Button>
                        <Button type="primary" shape="round" href='/register'>
                            <UserAddOutlined />
                        </Button>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Button shape="round" onClick={logout}>Cerrar sesión</Button>
                        <CurrentUser />
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
