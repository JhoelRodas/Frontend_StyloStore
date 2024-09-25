import { useAuth } from "../users/AuthContext";
import { ShoppingOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Avatar } from "antd";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  // Modify the navigation list for a clothing store
  const updatedNavLists = [
    "Hombres",
    "Mujeres",
    "Accesorios",
    "Ofertas",
    "Novedades",
  ];

  // Dropdown menu for the user profile
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span className="block px-4 py-2 text-sm text-gray-700">Dashboard</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span className="block px-4 py-2 text-sm text-gray-700">Settings</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span className="block px-4 py-2 text-sm text-gray-700">Earnings</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logout}>
        <span className="block px-4 py-2 text-sm text-gray-700">
          Cerrar sesión
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white w-full py-3 sm:px-10 px-5 flex justify-between border-b border-gray-300 shadow-md rounded-2xl">
      {/* Logo and Store Name */}
      <div className="flex items-center">
        <ShoppingOutlined style={{ fontSize: "30px", cursor: "pointer" }} />
        <span className="ml-2 text-lg font-bold cursor-pointer">
          StyloStore
        </span>
      </div>

      {/* Centered Navigation Menu */}
      <div className="flex flex-1 justify-center items-center max-sm:hidden">
        {updatedNavLists.map((nav) => (
          <div
            key={nav}
            className="px-1 text-sm cursor-pointer text-gray hover:text-black transition-all"
          >
            {nav}
          </div>
        ))}
      </div>

      {/* Authentication Buttons or User Dropdown */}
      <div className="flex items-center space-x-4">
        {isLoggedIn && (
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar src="/path-to-your-user-image.jpg" alt="User Photo" />
              <span>Bonnie Green</span>
            </div>
          </Dropdown>
        )}
      </div>
    </header>
  );
};

export default Navbar;
