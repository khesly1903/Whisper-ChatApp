import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const { Sider, Content } = Layout;

function SidebarLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation(); // aktif route'u al
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Route ile menü key'lerini eşleştir
  const getSelectedKey = () => {
    if (location.pathname.startsWith("/profile")) return "profile";
    if (location.pathname.startsWith("/settings")) return "settings";
    if (location.pathname === "/") return "home";
    return "";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={200}
        style={{
          background: "#1f1f1f",
          paddingTop: 32,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]} // Burada dinamik olarak seçili key'i veriyoruz
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0", background: "#181818", borderRadius: 8, padding: 24 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default SidebarLayout;