import { FundTwoTone , DollarTwoTone , TeamOutlined, ShopTwoTone, SettingTwoTone } from '@ant-design/icons';
//, SolutionOutlined
const SidebarLinks = () => [
  {
    label: "Usuarios",
    icon: < TeamOutlined />,
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
        label: "Gestionar Usuarios",
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
    icon: <ShopTwoTone />,
    subMenu: [
      {
        label: "Gestionar Categorias",
        to: "/admin/Categoria", 
      },
      {
        label: "Gestionar Productos",
        to: "/admin/productos",
      },
      {
        label: "Registro de sucursales",
        to: "/admin/branches",
      },
      {
        label: "Gestionar Stock",
        to: "/admin/Stock",
      }
    ],
  },

  {
    label: "Administrar Ventas",
    icon: <DollarTwoTone />,
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
        label: "Administrar Compras",
        to: "/personnel/Compras",
      },
      {
        label: "Reservas de productos",
        to: "/personnel/reservas",
      },
    ],
  },
  {
    label: "Reportes e Interacciones",
    icon: <FundTwoTone />,
    subMenu: [
      {
        label: "Reporte de ventas",
        to: "/admin/Report-ventas",
      },
      {
        label: "Gestion de comentarios sobre producots",
        to: "/personnel/comentarios",
      }
    ],
  },

  {
    label: "Configuración",
    icon: <SettingTwoTone />,
    subMenu: [
      {
        label: "Ajustes",
        to: "/settings/doctor-scheduling",
      }
    ],
  }
  
];

export default SidebarLinks;
