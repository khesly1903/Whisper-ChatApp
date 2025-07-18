import React from "react";
import SidebarLayout2 from "./SidebarLayout2";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Navbar from "../components/Navbar";
import Chatbar from "../components/Chatbar";

function HomePage() {
  const { selectedUser } = useChatStore();
  return (
    // <SidebarLayout2>
    //   {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
    // </SidebarLayout2>

    <Navbar>
      <Chatbar>
        {!selectedUser ? (

          <div style={{
            width: "100%",
            height: "100vh",
          }}>
            
          </div>
          
        ) : (
          <ChatContainer />
        )}
      </Chatbar>
    </Navbar>
  );
}

export default HomePage;
