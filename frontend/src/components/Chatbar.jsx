import React, { useContext, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Link, Navigate } from "react-router-dom";
import ChatbarSkeleton from "./skeletons/ChatbarSkeleton";
import { Avatar, Badge } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";

function Chatbar({ children }) {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { authUser, onlineUsers, logout } = useAuthStore();

  const theme = useContext(ThemeContext);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  //logout

  const handleLogout = async () => {
    await logout();
    Navigate("/login");
  };

  // non-selected user with esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedUser]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "20rem",
          minWidth: "17rem",
          maxWidth: "23rem",
          background: theme.themeInfo.backgroundPrimary,
          height: "100vh",
          padding: "0.5rem",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        {/* settings profile and logout */}
        <div
          style={{
            // background: theme.themeInfo.backgroundSecondary,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "2rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <Link to="/settings" style={{ color: theme?.themeInfo?.colorText }}>
            <SettingOutlined style={{ fontSize: "1.5rem" }} />
          </Link>

          <Link to="/profile" style={{ color: theme?.themeInfo?.colorText }}>
            {authUser?.profilePic ? (
              <Avatar
                src={authUser.profilePic}
                size={150}
                style={{ borderRadius: "25%" }}
              />
            ) : (
              <Avatar
                size={150}
                style={{ borderRadius: "25%" }}
                icon={<UserOutlined />}
              />
            )}
          </Link>

          <Link
            onClick={handleLogout}
            style={{ color: theme?.themeInfo?.colorText }}
          >
            <LogoutOutlined style={{ fontSize: "1.5rem" }} />
          </Link>
        </div>

        {isUsersLoading ? (
          <ChatbarSkeleton />
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              style={{
                height: "4rem",
                padding: "0.5em",
                cursor: "pointer",
                borderRadius: "0.5em",
                backgroundColor:
                  selectedUser?._id === user._id
                    ? theme.themeInfo.backgroundSecondary
                    : "transparent",
                color: theme?.themeInfo?.colorText,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {user.profilePic ? (
                  <Badge
                    dot={onlineUsers.includes(user._id)}
                    status="success"
                    size="small"
                  >
                    <Avatar src={user.profilePic} shape="square" />
                  </Badge>
                ) : (
                  <Badge dot={onlineUsers.includes(user._id)} status="success">
                    <Avatar
                      shape="square"
                      size={"16rem"}
                      icon={<UserOutlined />}
                    />
                  </Badge>
                )}
                {user.fullName}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Chatbar;

// okunmamis mesajlar icin
// <Badge count={1}>
//       <Avatar shape="square" icon={<UserOutlined />} />
//     </Badge>
