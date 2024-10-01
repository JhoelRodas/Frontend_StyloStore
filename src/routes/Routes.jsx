//import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { Route, Routes, Navigate } from "react-router-dom";
import FormLogin from "../components/users/FormLogin";
import FormRegister from "../components/users/FormRegister";
import ForgotPassword from "../components/users/ForgotPassword";
import Home from "../components/layout/Home";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { useAuth } from "../components/users/AuthContext";
import ManageRoles from "../components/views/Usuarios/ManageRoles";
import ManagePermissions from "../components/views/Usuarios/ManagePermissions";
import ManageUsuarios from "../components/views/Usuarios/ManageUsuarios";
import RegisterUsuarios from "../components/views/Usuarios/RegisterUser";
import ManageSucursales from "../components/views/ProductoSucursales/ManageBranches";
import ManageProducts from "../components/views/ProductoSucursales/ManageProducts";
import ManageCategories from "../components/views/ProductoSucursales/ManageCategories";
import ManageStock from "../components/views/ProductoSucursales/ManageStock";
import ManageReservations from "../components/views/AdministracionVentas/ManageReservations";

//

const MyRoutes = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      {/* no logged*/}
      {!isLoggedIn ? (
        <>
          <Route path="/login" element={<FormLogin />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </>
      ) : (
        <>
          {/* Si el usuario está logueado, redirigir cualquier intento de acceder a las rutas públicas al home */}
          <Route path="/login" element={<Navigate to="/home" />} />
          <Route path="/register" element={<Navigate to="/home" />} />
          <Route path="/forgotPassword" element={<Navigate to="/home" />} />
        </>
      )}
      {/*Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        
        <Route path="/admin/register" element={<RegisterUsuarios />} />
        <Route element={<ProtectedRoute requiredPermission="VIEW_ROLES" />}>
          <Route path="/admin/manageRoles" element={<ManageRoles />} />
        </Route>
        <Route
          element={<ProtectedRoute requiredPermission="VIEW_PERMISSIONS" />}
        >
          <Route path="/admin/permissions" element={<ManagePermissions />} />
        </Route>

        
        <Route element={<ProtectedRoute requiredPermission="VIEW_USERS" />}>
        <Route path="/admin/users" element={<ManageUsuarios />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="VIEW_BRANCHES" />}>
        <Route path="/admin/branches" element={<ManageSucursales />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="VIEW_PRODUCT" />}>
        <Route path="/admin/productos" element={<ManageProducts />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="VIEW_CATEGORIES" />}>
        <Route path="/admin/categoria" element={<ManageCategories />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="VIEW_STOCK" />}>
        <Route path="/admin/Stock" element={<ManageStock />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="VIEW_RESERVATIONS" />}>
        <Route path="/personnel/reservas" element={<ManageReservations />} />
        </Route>
      </Route>

      {/* Ruta por defecto para redirigir a login si no coincide ninguna ruta */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
      />
    </Routes>
  );
};

export default MyRoutes;
