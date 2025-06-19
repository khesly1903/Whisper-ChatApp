import React, { useContext } from "react";
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useAuthStore } from "../store/useAuthStore";

function Navbar({ children }) {
  const theme = useContext(ThemeContext);
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          background: theme?.themeInfo?.backgroundSecondary,
          color: theme?.themeInfo?.colorText,
          position: "fixed",
          top: 0, 
          left: 0,
          zIndex: 1000,
        }}
      >
        {/* LEFT: Logo ve Whisper */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              color: theme?.themeInfo?.colorText,
            }}
          >
            <img src="/logo.svg" alt="logo" style={{ width: 32, height: 32 }} />
            <span style={{ fontWeight: 600, fontSize: 22, letterSpacing: 1 }}>
              Whisper
            </span>
          </Link>
        </div>

        {/* RIGHT: Settings, Profile, Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <Link to="/settings" style={{ color: theme?.themeInfo?.colorText }}>
            <SettingOutlined style={{ fontSize: "1.5rem" }} />
          </Link>
          <Link to="/profile" style={{ color: theme?.themeInfo?.colorText }}>
            <UserOutlined style={{ fontSize: "1.5rem" }} />
          </Link>
          <Link
            onClick={handleLogout}
            style={{ color: theme?.themeInfo?.colorText }}
          >
            <LogoutOutlined style={{ fontSize: "1.5rem" }} />
          </Link>
        </div>
      </div>
      <div style={{ background: theme?.themeInfo?.backgroundSecondary}}>
        {children}
      </div>
    </>
  );
}

export default Navbar;
