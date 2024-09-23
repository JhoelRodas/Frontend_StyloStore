import {AimOutlined, SettingOutlined, FileAddOutlined, TeamOutlined } from '@ant-design/icons';
//, SolutionOutlined
const SidebarLinks = () => [
  {
    label: "Usuarios",
    icon: <AimOutlined />,
    subMenu: [
      {
        label: "Gestionar Roles",
        to: "/admin/manageRoles",
      },
      {
        label: "Gestionar Permisos",
        to: "/admin/permissions",
      },
      {
        label: "Administrar Usuarios",
        to: "/admin/users", 
      },
      {
        label: "Bitacora",
        to: "/admin/access-log", 
      }
    ],
  },
  {
    label: "Productos y Sucursales",
    icon: <FileAddOutlined />,
    subMenu: [
      {
        label: "Registrar Categorias",
        to: "/admin/Categoria", 
      },
      {
        label: "Registrar Productos",
        to: "/admin/productos",
      },
      {
        label: "Registro de sucursales",
        to: "/admin/branches",
      }
    ],
  },

  {
    label: "Catalogo y E-commerce",
    icon: <TeamOutlined />,
    subMenu: [
      {
        label: "Carrito de compras",
        to: "/personnel/Carrito",
      },
      {
        label: "Procesos de Pagos",
        to: "/personnel/Register-pagos",
      },
      {
        label: "Gestion de Pedidos",
        to: "/personnel/Pedidos",
      }
    ],
  },
  {
    label: "Pagos y Reservas",
    icon: <TeamOutlined />,
    subMenu: [
      {
        label: "Reservas de productos",
        to: "/personnel/reservas",
      },
      {
        label: "Pagos Online",
        to: "/personnel/pagos",
      },
    ],
  },{
    label: "Reportes",
    icon: <TeamOutlined />,
    subMenu: [
      {
        label: "Reporte de ventas",
        to: "/admin/Report-ventas",
      },
      {
        label: "Reporte de stock",
        to: "/personnel/report-stock",
      },
      {
        label: "Reportes de reservas y recogidas",
        to: "/personnel/repor-stock",
      }
    ],
  },

  {
    label: "Configuración",
    icon: <SettingOutlined />,
    subMenu: [
      {
        label: "Ajustes",
        to: "/settings/doctor-scheduling",
      }
    ],
  }
  
];

export default SidebarLinks;
