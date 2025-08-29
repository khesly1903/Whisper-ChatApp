import React, { useContext, useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useContactStore } from "../store/useContactStore";
import { Link, Navigate } from "react-router-dom";
import ChatbarSkeleton from "./skeletons/ChatbarSkeleton";
import { Avatar, Badge, Button, Input, Collapse } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";

function Chatbar({ children }) {
  const { selectedUser, setSelectedUser } = useChatStore();

  const {
    authUser,
    onlineUsers,
    logout,
    searchUser,
    searchedUser,
    isSearchingUser,
    clearSearchedUser,
  } = useAuthStore();

  const {
    contacts,
    getContacts,
    isContactsLoading,
    addContact,
    cancelRequest,
    sendedRequests,
    receivedRequests,
    getRequests,
    acceptRequest,
    rejectRequest,
  } = useContactStore();

  const [addContactVisible, setAddContactVisible] = useState(false);

  const theme = useContext(ThemeContext);

  // search user by nickname
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await searchUser(searchTerm.trim());
    }
  };

  // //get contacts
  // useEffect(() => {
  //   getUsers();
  // }, [getUsers]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  const handleAcceptRequest = async (senderID) => {
    await acceptRequest(senderID);
    getRequests();
  };

  const handleRejectRequest = async (senderID) => {
    await rejectRequest(senderID);
    getRequests();
  };

  const handleCancelRequest = async (receiverID) => {
    await cancelRequest(receiverID);
    getRequests();
  };

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

  const handleAddContact = async () => {
    const receiverID = searchedUser._id;
    addContact(receiverID);
  };
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
              const newVisibility = !addContactVisible;
              setAddContactVisible(newVisibility);

              // Eğer contact ekleme paneli kapanıyorsa, arama sonuçlarını temizle
              if (!newVisibility) {
                clearSearchedUser();
                setSearchTerm("");
              }
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

        {isContactsLoading ? (
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
                  onPressEnter={() => handleSearch()}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setSearchTerm(newValue);
                    clearSearchedUser()
                    if (
                      newValue === "" ||
                      newValue === null ||
                      newValue === undefined
                    ) {
                      clearSearchedUser();
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                  }}
                />
                {searchedUser && (
                  <div
                    className="center-flex"
                    style={{
                      flexDirection: "column",
                      gap: "1rem",
                      marginTop: "1rem",
                    }}
                  >
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
                    <Button onClick={() => handleAddContact()}>Add User</Button>
                  </div>
                )}

                <div style={{ margin: "1rem 0" }}>
                  <Collapse>
                    <Collapse.Panel header="Sended Request" key="1">
                      <div style={{ margin: "1rem 0" }}>
                        {sendedRequests.length === 0 && (
                          <p>No sended requests</p>
                        )}

                        {sendedRequests.map((req) => (
                          <div
                            key={req._id}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 2fr",
                              gridTemplateRows: "repeat(3,1fr)",
                              gap: "0.2rem",
                              padding: "0.5rem",
                              border: "1px solid rgba(217, 222, 226, 0.409)",
                              background: theme.themeInfo.backgroundSecondary,
                              borderRadius: "1rem",
                              margin: "0.5rem 0",
                              // placeContent:"center",
                            }}
                          >
                            {req.user?.profilePic ? (
                              <Avatar
                                src={req.user.profilePic}
                                size={50}
                                style={{
                                  borderRadius: "25%",
                                  gridArea: "1 / 1 / 3 / 2",
                                  justifySelf: "center",
                                  alignSelf: "center",
                                }}
                              />
                            ) : (
                              <Avatar
                                size={50}
                                style={{
                                  borderRadius: "25%",
                                  gridArea: "1 / 1 / 3 / 2",
                                  justifySelf: "center",
                                  alignSelf: "center",
                                }}
                                icon={<UserOutlined />}
                              />
                            )}
                            <span
                              style={{
                                gridArea: "1 / 2 / 2 / 3",
                                alignSelf: "center",
                                fontSize: "1.3rem",
                              }}
                            >
                              {req.user.fullName}
                            </span>
                            <span
                              style={{
                                gridArea: "2 / 2 / 3 / 3",
                                alignSelf: "center",
                              }}
                            >
                              @{req.user.nickName}
                            </span>
                            <div style={{ gridArea: "3 / 1 / 4 / 3" }}>
                              <Button
                                type="danger"
                                style={{ width: "100%" }}
                                onClick={() =>
                                  handleCancelRequest(req.user._id)
                                }
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Collapse.Panel>

                    <Collapse.Panel header="Received Requests" key="2">
                      {receivedRequests.length === 0 && <p>No received request</p>}

                      {receivedRequests.map((req) => (
                        <div
                          key={req._id}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 2fr",
                            gridTemplateRows: "repeat(3,1fr)",
                            gap: "0.2rem",
                            padding: "0.5rem",
                            border: "1px solid rgba(217, 222, 226, 0.409)",
                            background: theme.themeInfo.backgroundSecondary,
                            borderRadius: "1rem",
                            margin: "0.5rem 0",
                            // placeContent:"center",
                          }}
                        >
                          {req.user?.profilePic ? (
                            <Avatar
                              src={req.user.profilePic}
                              size={50}
                              style={{
                                borderRadius: "25%",
                                gridArea: "1 / 1 / 3 / 2",
                                justifySelf: "center",
                                alignSelf: "center",
                              }}
                            />
                          ) : (
                            <Avatar
                              size={50}
                              style={{
                                borderRadius: "25%",
                                gridArea: "1 / 1 / 3 / 2",
                                justifySelf: "center",
                                alignSelf: "center",
                              }}
                              icon={<UserOutlined />}
                            />
                          )}
                          <span
                            style={{
                              gridArea: "1 / 2 / 2 / 3",
                              alignSelf: "center",
                              fontSize: "1.3rem",
                            }}
                          >
                            {req.user.fullName}
                          </span>
                          <span
                            style={{
                              gridArea: "2 / 2 / 3 / 3",
                              alignSelf: "center",
                            }}
                          >
                            @{req.user.nickName}
                          </span>
                          {/* <span>{req.sentAt}</span> */}
                          <div
                            style={{
                              gridArea: "3 / 1 / 4 / 3",
                              display: "flex",
                              justifyContent: "center",
                              gap: "1rem",
                            }}
                          >
                            <Button
                              style={{ width: "45%" }}
                              onClick={() => {
                                handleAcceptRequest(req.user._id);
                              }}
                            >
                              Accept
                            </Button>
                            <Button
                              style={{ width: "45%" }}
                              onClick={() => {
                                handleRejectRequest(req.user._id);
                              }}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Collapse.Panel>
                  </Collapse>
                </div>
              </div>
            )}

            {contacts.map((contact) => (
              <div
                key={contact.user._id}
                onClick={() => setSelectedUser(contact.user)}
                style={{
                  height: "4rem",
                  padding: "0.5em",
                  cursor: "pointer",
                  borderRadius: "0.5em",
                  backgroundColor:
                    selectedUser?._id === contact.user._id
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
                  {contact.user.profilePic ? (
                    <Badge
                      dot={onlineUsers.includes(contact.user._id)}
                      status="success"
                      size="small"
                    >
                      <Avatar src={contact.user.profilePic} shape="square" />
                    </Badge>
                  ) : (
                    <Badge
                      dot={onlineUsers.includes(contact.user._id)}
                      status="success"
                    >
                      <Avatar
                        shape="square"
                        size={"16rem"}
                        icon={<UserOutlined />}
                      />
                    </Badge>
                  )}
                  {contact.user.fullName}
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
