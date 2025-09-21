import React, { useContext, useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useContactStore } from "../store/useContactStore";
import { Link, Navigate } from "react-router-dom";
import ChatbarSkeleton from "./skeletons/ChatbarSkeleton";
import { Avatar, Badge, Button, Input, Collapse } from "antd";
import { formatTime } from "../utils";
import {
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  LoadingOutlined,
  FastBackwardFilled,
} from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";
import ProfileSettings from "./ProfileSettings";
import ThemeSettings from "./ThemeSettings";

function Chatbar({ children }) {
  const { messages, selectedUser, setSelectedUser } = useChatStore();
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);

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

  // const theme = useContext(ThemeContext);
  const { currentTheme } = useContext(ThemeContext);

  // search user by nickname
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await searchUser(searchTerm.trim());
    }
  };

  useEffect(() => {
    getContacts();
  }, [getContacts, messages]);

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  const handleAcceptRequest = async (senderID) => {
    await acceptRequest(senderID);
    getRequests();
    getContacts();
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
        setShowProfileSettings(false);
        setShowThemeSettings(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedUser, showProfileSettings]);

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
          background: currentTheme.themeInfo.backgroundPrimary,
          height: "100vh",
          padding: "1rem 0.5rem",
          overflowY: "auto",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Collapse activeKey={["1"]}>
          <Collapse.Panel
            header={
              <div style={{ textAlign: "center", width: "100%" }}>
                {authUser.fullName}
              </div>
            }
            key={1}
            showArrow={false}
          >
            <div
              style={{
                // background: currentTheme.themeInfo.backgroundSecondary,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "1rem",
                // border: `1px solid ${currentTheme.themeInfo.colorSecondary}`,
                // boxShadow: `0px 0px 10px -1px ${currentTheme.themeInfo.colorSecondary}`,
              }}
            >
              {/* Profile */}
              <span
                style={{
                  color: currentTheme?.themeInfo?.colorText,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowProfileSettings(true);
                  setSelectedUser(null);
                  setShowThemeSettings(false);
                }}
              >
                {authUser?.profilePic ? (
                  <div
                    style={{
                      // border: `1px solid ${currentTheme.themeInfo.colorSecondary}`,
                      // boxShadow: `0px 0px 20px -1px ${currentTheme.themeInfo.colorSecondary}`,
                      borderRadius: "25%",
                    }}
                  >
                    <Avatar
                      src={authUser.profilePic}
                      size={200}
                      style={{ borderRadius: "25%" }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      // border: `1px solid ${currentTheme.themeInfo.colorSecondary}`,
                      // boxShadow: `0px 0px 20px -1px ${currentTheme.themeInfo.colorSecondary}`,
                      borderRadius: "25%",
                    }}
                  >
                    <Avatar
                      size={200}
                      style={{ borderRadius: "25%" }}
                      icon={<UserOutlined />}
                    />
                  </div>
                )}
              </span>

              {/* Logout */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",

                  width: "80%",
                  marginTop: "-2rem",
                }}
              >
                <Link
                  onClick={handleLogout}
                  style={{
                    color: currentTheme?.themeInfo?.colorText,
                    zIndex: "99",
                  }}
                >
                  <LogoutOutlined
                    style={{
                      fontSize: "2rem",
                      textShadow: `0px 0px 20px -1px ${currentTheme.themeInfo.colorSecondary}`,
                    }}
                  />
                </Link>

                <span
                  style={{
                    color: currentTheme?.themeInfo?.colorText,
                    cursor: "pointer",
                    zIndex: "99",
                  }}
                  onClick={() => {
                    setShowProfileSettings(false);
                    setSelectedUser(null);
                    setShowThemeSettings(true);
                  }}
                >
                  <SettingOutlined style={{ fontSize: "2rem" }} />
                </span>
              </div>
            </div>
          </Collapse.Panel>
        </Collapse>
        {/* contact add settings profile and logout */}

        <Collapse>
          <Collapse.Panel header="Add Contacts" key="2">
            <div
              style={{
                margin: "1rem 0rem 1rem 0rem",
                // backgroundColor: currentTheme?.themeInfo?.backgroundSecondary,
                color: currentTheme?.themeInfo?.colorText,
                borderRadius: "1rem",
                // border: `1px solid ${currentTheme.themeInfo.colorSecondary}`,
                // boxShadow: `0px 0px 10px -1px ${currentTheme.themeInfo.colorSecondary}`,
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
                  clearSearchedUser();
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
                      {sendedRequests.length === 0 && <p>No sended requests</p>}

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
                            background:
                              currentTheme.themeInfo.backgroundSecondary,
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
                              onClick={() => handleCancelRequest(req.user._id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Collapse.Panel>

                  <Collapse.Panel header="Received Requests" key="2">
                    {receivedRequests.length === 0 && (
                      <p>No received request</p>
                    )}

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
                          background:
                            currentTheme.themeInfo.backgroundSecondary,
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
          </Collapse.Panel>
        </Collapse>

        <Collapse activeKey={["3"]}>
          <Collapse.Panel
            header={
              <div style={{ textAlign: "center", width: "100%" }}>Contacts</div>
            }
            key="3"
            showArrow={false}
          >
            {isContactsLoading ? (
              <ChatbarSkeleton />
            ) : (
              <>
                {[...contacts]
                  .sort((a, b) => {
                    const timeA = new Date(a.lastMessageTime || 0);
                    const timeB = new Date(b.lastMessageTime || 0);
                    return timeB - timeA; // büyükten küçüğe (son yazışma en üstte)
                  })
                  .map((contact) => (
                    <div
                      key={contact.user._id}
                      onClick={() => (
                        setSelectedUser(contact.user),
                        setShowProfileSettings(false),
                        setShowThemeSettings(false)
                      )}
                      style={{
                        height: "4rem",
                        padding: "0.5em",
                        cursor: "pointer",
                        width: "100%",
                        borderRadius: "0.5em",
                        backgroundColor:
                          selectedUser?._id === contact.user._id
                            ? currentTheme.themeInfo.backgroundSecondary
                            : "transparent",
                        color: currentTheme?.themeInfo?.colorText,
                        border:
                          selectedUser?._id === contact.user._id
                            ? `1px solid ${currentTheme.themeInfo.colorSecondary}`
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          width: "100%",
                        }}
                      >
                        {contact.user.profilePic ? (
                          <Badge
                            dot={onlineUsers.includes(contact.user._id)}
                            status="success"
                            size="small"
                          >
                            <Avatar
                              src={contact.user.profilePic}
                              shape="square"
                            />
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
                        <div
                          style={{
                            // display: "flex",
                            // flexDirection: "column",
                            width: "80%",
                          }}
                        >
                          {contact.lastMessage || contact.lastMessageTime ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  flexGrow: 1,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  marginRight: "0.5rem",
                                }}
                              >
                                {contact.user.fullName}
                              </div>
                              <div
                                style={{
                                  flexShrink: 0,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {formatTime(contact.lastMessageTime)}
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {contact.user.fullName}
                            </div>
                          )}

                          <div
                            style={{
                              width: "75%",
                              whiteSpace: "nowrap",
                              display: "block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {contact.lastMessage || "No messages yet"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </Collapse.Panel>
        </Collapse>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {showProfileSettings ? (
          <ProfileSettings />
        ) : showThemeSettings ? (
          <ThemeSettings />
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default Chatbar;

// okunmamis mesajlar icin
// <Badge count={1}>
//       <Avatar shape="square" icon={<UserOutlined />} />
//     </Badge>
