import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const login = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(true);
    setUser(storedUser);
    localStorage.setItem('loggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('loggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, sidebarOpen, setSidebarOpen, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
