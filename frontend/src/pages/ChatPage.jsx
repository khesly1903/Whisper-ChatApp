import React, { useContext } from "react";
import { Layout } from "antd";
import Chatbar from "../components/Chatbar";
import NoChatSelected from "../components/NoChatSelected";
import { ThemeContext } from "../context/ThemeContext";
import ChatSplitter from "../components/ChatSplitter";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/ChatContainer";
import backgrounds from "../themes/backgrounds.json";


function ChatPage({ currentBackground }) {
  const theme = useContext(ThemeContext);

  const { selectedUser } = useChatStore();

  return (
    <Chatbar>
      {!selectedUser ? (
        <NoChatSelected />
      ) : (
        // double chat selected
        <div
          className="center-flex"
          style={{
            background: theme.themeInfo.backgroundPrimary,
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            zIndex: "10000",
            position: "relative",
          }}
        >
          <div
            style={{
              // background:theme.themeInfo.backgroundSecondary,
              backgroundColor: theme.themeInfo.backgroundPrimary,
              backgroundImage: backgrounds.backgrounds[currentBackground],
              width: "98%",
              height: "98vh",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
          >
            <ChatContainer />

            {/* <ChatSplitter {...{
              leftChild: <div style={{ background: "red", width: "100%", height: "98vh", borderRadius: "1rem 0rem 0rem 1rem", overflow: "hidden" }}></div>,
              rightChild: <div style={{ background: "blue", width: "100%", height: "98vh", borderRadius: "0rem 1rem 1rem 0rem", overflow: "hidden" }}></div>,
            }} /> */}
          </div>
        </div>
      )}
    </Chatbar>
  );
}

export default ChatPage;
