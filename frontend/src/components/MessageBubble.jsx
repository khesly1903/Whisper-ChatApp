import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function MessageBubble({ side = "left", children }) {
  const theme = useContext(ThemeContext);

//   not responsive
  const baseStyle = {
    maxWidth: "60%",
    padding: "0.5rem 1rem",
    borderRadius: 18,
    margin: "2px 0",
    fontSize: 16,
    wordBreak: "break-word",
    display: "inline-block",

    background:
      side === "left"
        ? theme?.themeInfo?.colorPrimary || "#f0f0f0"
        : theme?.themeInfo?.colorSecondary || "#1677ff",
    color: theme?.themeInfo?.colorText 
  };

//   if (side === "left" ) baseStyle.borderTopLeftRadius = 4;
//   if (side === "right" ) baseStyle.borderTopRightRadius = 4;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: side === "left" ? "flex-start" : "flex-end",
      }}
    >
      <div style={baseStyle}>{children} 
      </div>
      
    </div>
  );
}

// Kullanım örneği:
// <MessageBubble side="left" isFirst={true}>Merhaba!</MessageBubble>
// <MessageBubble side="right" isFirst={false}>Nasılsın?</MessageBubble>
