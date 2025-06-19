import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DesktopOutlined,
  MessageOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useAuthStore } from "../store/useAuthStore";
import { ThemeContext } from "../context/ThemeContext";

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/profile">Profile</Link>, "/profile", <UserOutlined />),
  getItem(
    <Link to="/settings">Settings</Link>,
    "/settings",
    <SettingOutlined />
  ),

  getItem("Favorites", "sub2", <TeamOutlined />, [
    getItem(<Link to="/favorites/team1">Team 1</Link>, "/favorites/team1"),
    getItem(<Link to="/favorites/team2">Team 2</Link>, "/favorites/team2"),
  ]),

  getItem("All Chats", "sub1", <MessageOutlined />, [
    getItem(<Link to="/chat/tom">Tom</Link>, "/chat/tom"),
    getItem(<Link to="/chat/bill">Bill</Link>, "/chat/bill"),
    getItem(<Link to="/chat/alex">Alex</Link>, "/chat/alex"),
  ]),
];

const SidebarLayout2 = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // aktif route'u al
  const { logout } = useAuthStore();
  const theme = useContext(ThemeContext);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const [collapsed, setCollapsed] = useState(false);
  const getSelectedKey = () => location.pathname;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: theme?.themeInfo?.backgroundSecondary, 
          color: theme?.themeInfo?.colorText,
        }}
      >
        <Menu
          theme="dark"
          selectedKeys={[getSelectedKey()]}
          mode="inline"
          items={items}
          style={{
            background: theme?.themeInfo?.backgroundSecondary, 
            color: theme?.themeInfo?.colorText, 
            borderRight: 0,
          }}
        />
      </Sider>

      <Layout>
        <Content
          style={{
            background: theme?.themeInfo?.backgroundPrimary,
            padding: 24,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default SidebarLayout2;
