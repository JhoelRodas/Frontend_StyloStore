import  { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';  // Importa PropTypes

const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('loggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, sidebarOpen, setSidebarOpen, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Validación de las propiedades utilizando PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Se especifica que children es requerido
};

// useAuth->Hook que permite acceder al contexto de autenticación fácilmente desde cualquier componente.
export const useAuth = () => useContext(AuthContext);
