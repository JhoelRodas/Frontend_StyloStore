import { useAuth } from '../users/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole, requiredPermission }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Verificar si el usuario tiene el rol necesario
  const hasRequiredRole = requiredRole ? user?.role === requiredRole : true;

  // Verificar si el usuario tiene el permiso necesario
  const hasRequiredPermission = requiredPermission
    ? user?.permissions?.includes(requiredPermission)
    : true;

  // Redirigir si no tiene el rol o permiso requerido
  if (!hasRequiredRole || !hasRequiredPermission) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
