import React from "react";
import { Layout } from "antd";
import Chatbar from "../components/Chatbar";
import NoChatSelected from "../components/NoChatSelected";

function ChatPage() {
  return (
    <Chatbar>
      <div
        style={{ background:"#171717", height: "100vh", overflow: "hidden" }}
      >
        <NoChatSelected
          variation={0}
          pixelRatioProp={window.devicePixelRatio || 1}
          shapeSize={1}
          roundness={0.5}
          borderSize={0.05}
          circleSize={0.25}
          circleEdge={1}
        />
      </div>{" "}
    </Chatbar>
  );
}

export default ChatPage;
