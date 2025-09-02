import React, { useContext } from "react";

import Chatbar from "../components/Chatbar";
import NoChatSelected from "../components/NoChatSelected";
import { ThemeContext } from "../context/ThemeContext";

import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/ChatContainer";
import backgrounds from "../themes/backgrounds.json";


function ChatPage({ currentBackground }) {
  const {currentTheme} = useContext(ThemeContext);

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
            background: currentTheme.themeInfo.backgroundPrimary,
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            zIndex: "10000",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: currentTheme.themeInfo.backgroundPrimary,
              backgroundImage: backgrounds.backgrounds[currentBackground],
              width: "98%",
              height: "98vh",
              borderRadius: "1rem",
              overflow: "hidden",

            }}
          >
            <ChatContainer />

          </div>
        </div>
      )}
    </Chatbar>
  );
}

export default ChatPage;
