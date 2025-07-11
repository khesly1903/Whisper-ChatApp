import React, { useContext } from "react";
import { LockOutlined } from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";

export default function NoChatSelected() {
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme?.themeInfo?.backgroundPrimary,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "98%",
          height: "98vh",
          background: theme?.themeInfo?.backgroundSecondary,
          backgroundImage: "url('mountains.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: theme?.themeInfo?.colorText,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "1rem",
        }}
      >

        <LockOutlined
          style={{ color: "white", fontSize: "10rem", marginBottom: "1rem" }}
        />

        <div style={{ fontSize: "1.2rem" }}>
          Ready to whisper secrets? Pick a chat
        </div>
      </div>
    </div>
  );
}


