import  { useState } from 'react';
import { Layout, Menu } from 'antd';
import { LeftOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../users/AuthContext';
import CurrentUser from './NavbarComponents/CurrentUser';
import SidebarLinks from './SidebarLinks';

const { Sider } = Layout;

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, userRole } = useAuth();
  const [openKeys, setOpenKeys] = useState([]);
  const linksArray = SidebarLinks(userRole);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Sider
      width={256}
      className={`bg-white border-r rounded-3xl shadow-lg`}
      collapsedWidth={80}
      collapsible
      collapsed={!sidebarOpen}
      trigger={null}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-col items-center justify-center space-y-2 mt-8">
            <CurrentUser />
            {sidebarOpen && <h2 className="text-gray-700">Administrador</h2>}
          </div>
          <div
            className="w-8 h-8 rounded-full bg-gray-50 shadow-lg flex items-center justify-center cursor-pointer transform transition-transform duration-300 mt-3 ml-auto mr-5"
            onClick={toggleSidebar}
            style={{ transform: sidebarOpen ? 'rotate(0)' : 'rotate(180deg)' }}
          >
            <LeftOutlined />
          </div>
        </div>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          {linksArray.map(({ icon, label, to, subMenu }) => (
            subMenu ? (
              <Menu.SubMenu
                key={label}
                icon={icon}
                title={label}
                expandIcon={({ isOpen }) => isOpen ? <DownOutlined /> : <RightOutlined />}
              >
                {subMenu.map(({ label, to }) => (
                  <Menu.Item key={to}>
                    <NavLink to={to}>{label}</NavLink>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={to} icon={icon}>
                <NavLink to={to}>{label}</NavLink>
              </Menu.Item>
            )
          ))}
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar;
