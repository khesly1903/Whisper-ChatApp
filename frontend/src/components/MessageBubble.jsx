import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function MessageBubble({ side = "left", children, image, text }) {
  const {currentTheme} = useContext(ThemeContext);

  const baseStyle = {
    maxWidth: "60%",
    padding: image ? "0.5rem" : "0.5rem 1rem", // Resim varsa padding'i azalt
    borderRadius: 18,
    margin: "2px 0",
    fontSize: 16,
    wordBreak: "break-word",
    display: "inline-block",
    background:
      side === "left"
        ? currentTheme.themeInfo.colorPrimary || "#f0f0f0"
        : currentTheme.themeInfo.colorSecondary || "#1677ff",
    color: currentTheme.themeInfo.colorText 
  };

  const imageStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
    borderRadius: "12px",
    objectFit: "cover",
    display: "block",
    marginBottom: text ? "0.5rem" : "0" // Text varsa resimden sonra boşluk bırak
  };

  const textStyle = {
    margin: 0,
    padding: image ? "0 0.5rem 0.5rem 0.5rem" : "0" // Resim varsa text'e padding ekle
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: side === "left" ? "flex-start" : "flex-end",
      }}
    >
      <div style={baseStyle}>
        {/* Önce resmi göster */}
        {image && (
          <img 
            src={image} 
            alt="Message attachment" 
            style={imageStyle}
            onError={(e) => {
              e.target.style.display = 'none'; // Resim yüklenemezse gizle
            }}
          />
        )}
        
        {/* Sonra text'i göster */}
        {text && (
          <div style={textStyle}>
            {text}
          </div>
        )}
        
        {/* Eski children prop'u da destekle (backward compatibility) */}
        {!text && !image && children}
      </div>
    </div>
  );
}

// Kullanım örnekleri:
// <MessageBubble side="left" text="Merhaba!" />
// <MessageBubble side="right" image="https://example.com/image.jpg" />
// <MessageBubble side="left" image="https://example.com/image.jpg" text="Bu resme bak!" />
// <MessageBubble side="right">Eski kullanım şekli</MessageBubble>
