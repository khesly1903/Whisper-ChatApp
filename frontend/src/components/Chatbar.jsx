import React, { useContext, useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Link, Navigate } from "react-router-dom";
import ChatbarSkeleton from "./skeletons/ChatbarSkeleton";
import { Avatar, Badge, Button, Input } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";

function Chatbar({ children }) {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const {
    authUser,
    onlineUsers,
    logout,
    searchUser,
    searchedUser,
    isSearchingUser,
  } = useAuthStore();

  const [addContactVisible, setAddContactVisible] = useState(false);

  const theme = useContext(ThemeContext);

  // search user by nickname
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await searchUser(searchTerm.trim());
    }
  };

  //get contacts
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
        {/* contact add settings profile and logout */}
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
          {/* Add Contact */}
          <UserAddOutlined
            style={{ fontSize: "1.5rem", color: theme?.themeInfo?.colorText }}
            onClick={() => {
              setAddContactVisible(!addContactVisible);
            }}
          />
          {/* Profile */}
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
          {/* Logout */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "9rem",
            }}
          >
            <Link
              onClick={handleLogout}
              style={{ color: theme?.themeInfo?.colorText }}
            >
              <LogoutOutlined style={{ fontSize: "1.5rem" }} />
            </Link>

            {/* Settings */}
            <Link to="/settings" style={{ color: theme?.themeInfo?.colorText }}>
              <SettingOutlined style={{ fontSize: "1.5rem" }} />
            </Link>
          </div>
        </div>

        {isUsersLoading ? (
          <ChatbarSkeleton />
        ) : (
          <>
            {/* Add Contact */}
            {addContactVisible && (
              <div
                style={{
                  margin: "1rem 0rem 1rem 0rem",
                  padding: "1rem",
                  backgroundColor: theme?.themeInfo?.backgroundSecondary,
                  color: theme?.themeInfo?.colorText,
                  borderRadius: "0.5em",
                }}
              >
                <Input
                  placeholder="Enter Nickname to Add"
                  allowClear={!isSearchingUser}
                  value={searchTerm}
                  disabled={isSearchingUser}
                  suffix={isSearchingUser ? <LoadingOutlined spin /> : null}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onPressEnter={() => handleSearch()}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                  }}
                />
                {searchedUser && (
                  <div className="center-flex" style={{flexDirection: "column", gap: "1rem", marginTop: "1rem"}}>
                    <div>
                      {searchedUser?.profilePic ? (
                        <Avatar
                          src={searchedUser.profilePic}
                          size={50}
                          style={{ borderRadius: "25%" }}
                        />
                      ) : (
                        <Avatar
                          size={50}
                          style={{ borderRadius: "25%" }}
                          icon={<UserOutlined />}
                        />
                      )}
                    </div>
                    <div>{searchedUser.fullName}</div>
                    <Button>Add User</Button> 
                    {/* TODO: handle adding contact */}
                  </div>
                )}
              </div>
            )}

            {/* Users  */}
            {users.map((user) => (
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
                    <Badge
                      dot={onlineUsers.includes(user._id)}
                      status="success"
                    >
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
            ))}
          </>
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
