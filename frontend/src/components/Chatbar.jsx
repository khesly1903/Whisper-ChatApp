import React, { useContext, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import ChatbarSkeleton from "./skeletons/ChatbarSkeleton";
import { Avatar, Col, Row } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";

function Chatbar({ children }) {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const theme = useContext(ThemeContext);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  //logout
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
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
    <>
      <Row>
        <Col span={4}>
          <div
            style={{
              position: "fixed",
              margin: 0,
              left: 0,
              width: "20rem",
              background: theme.themeInfo.backgroundSecondary,
              height: "100vh",
              padding: "0.5rem",
              overflowY: "auto",
              zIndex: 999,
              borderRight: "1px solid white",
            }}
          >
            {/* settings profile and logout */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5rem",
                border:"1px solid silver",
                padding:"0.5rem",
                borderRadius:"0.5rem"
              }}
            >
              <Link
                to="/settings"
                style={{ color: theme?.themeInfo?.colorText }}
              >
                <SettingOutlined style={{ fontSize: "1.5rem" }} />
              </Link>
              <Link
                to="/profile"
                style={{ color: theme?.themeInfo?.colorText }}
              >
                <UserOutlined style={{ fontSize: "1.5rem" }} />
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
                        ? "#e0e0e0"
                        : "transparent",
                    color: selectedUser?._id === user._id ? "#000" : "#fff",
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
                      <Avatar src={user.profilePic} />
                    ) : (
                      <Avatar
                        shape="square"
                        size={"16rem"}
                        icon={<UserOutlined />}
                      />
                    )}
                    {user.fullName}
                  </div>
                </div>
              ))
            )}
          </div>
        </Col>

        <Col span={20}>{children}</Col>
      </Row>
    </>
  );
}

export default Chatbar;

// okunmamis mesajlar icin
// <Badge count={1}>
//       <Avatar shape="square" icon={<UserOutlined />} />
//     </Badge>

// pp vermek icin
// <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />

{
  /* <img
  src={user.profilePicture}
  style={{
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    marginRight: "0.5rem",
  }}
/>; */
}
