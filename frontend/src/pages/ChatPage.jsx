import React, { useContext } from "react";
import { Layout } from "antd";
import Chatbar from "../components/Chatbar";
import NoChatSelected from "../components/NoChatSelected";
import { ThemeContext } from "../context/ThemeContext";
import ChatSplitter from "../components/ChatSplitter";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/ChatContainer";

function ChatPage() {

  const theme = useContext(ThemeContext);

  const { selectedUser } = useChatStore();

  return (
    <Chatbar>

      {!selectedUser ? <NoChatSelected /> :

        // double chat selected
        <div
          style={{ background:theme.themeInfo.backgroundPrimary, width: "100%", height: "100vh", overflow: "hidden",zIndex: "10000", position: "relative"  }}
          className="center-flex"
        >
          <div style={{ background:theme.themeInfo.backgroundSecondary, width: "98%", height: "98vh", borderRadius: "1rem", overflow: "hidden" }}>
            <ChatContainer />

            {/* <ChatSplitter {...{
              leftChild: <div style={{ background: "red", width: "100%", height: "98vh", borderRadius: "1rem 0rem 0rem 1rem", overflow: "hidden" }}></div>,
              rightChild: <div style={{ background: "blue", width: "100%", height: "98vh", borderRadius: "0rem 1rem 1rem 0rem", overflow: "hidden" }}></div>,
            }} /> */}
          </div>
        </div>
      }
    </Chatbar>
  );
}

export default ChatPage;
