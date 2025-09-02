import React, { useContext, useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";
import BlurText from "./BlurText";

export default function NoChatSelected() {
  const { currentTheme } = useContext(ThemeContext);
  const [key, setKey] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true); // önce yazıyı buharlaştır
      setTimeout(() => {
        setKey((prev) => prev + 1); // sonra animasyonu tekrar başlat
        setFadeOut(false);
      }, 2000); // buharlaşma süresi
    }, 6000); // her 3 saniyede bir tekrarlama

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: currentTheme?.themeInfo?.backgroundPrimary,
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
          // background: currentTheme?.themeInfo?.backgroundSecondary,
          // backgroundImage: "url('mountains.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: currentTheme?.themeInfo?.colorText,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "1rem",
          boxShadow: `inset 0px 0px 30rem ${currentTheme.themeInfo.backgroundPrimary}`,
          backgroundColor: currentTheme?.themeInfo?.backgroundSecondary, // fallback
          backgroundImage: `repeating-radial-gradient(
      ellipse farthest-corner at left center, 
      ${currentTheme?.themeInfo?.backgroundSecondary} 0%, 
      ${currentTheme?.themeInfo?.backgroundPrimary} 20%
    )`,
          WebkitBackgroundImage: `-webkit-repeating-radial-gradient(
      ellipse farthest-corner at left center, 
      ${currentTheme?.themeInfo?.backgroundSecondary} 0%, 
      ${currentTheme?.themeInfo?.backgroundPrimary} 20%
    )`,
          MozBackgroundImage: `-moz-repeating-radial-gradient(
      ellipse farthest-corner at left center, 
      ${currentTheme?.themeInfo?.backgroundSecondary} 0%, 
      ${currentTheme?.themeInfo?.backgroundPrimary} 20%
    )`,
        }}
      >
        {/* <LockOutlined
          style={{ color: "white", fontSize: "10rem", marginBottom: "1rem" }}
        />

        <div style={{ fontSize: "1.2rem" }}>
          Ready to whisper secrets? Pick a chat
        </div> */}
        <div
          style={{
        fontSize: "2rem",
        display: "inline-block",
        transition: "opacity 1s ease, transform 1s ease, filter 1s ease",
        opacity: fadeOut ? 0 : 1,
        // transform: fadeOut ? "scale(0.8) translateY(-20px)" : "scale(1) translateY(0)",
        filter: fadeOut ? "blur(4px)" : "blur(0px)",
      }}
        >
          <BlurText
            key={key}
            text="Ready to whisper secrets?"
            delay={100}
            animateBy="letters"
            direction="top"
            className="text-1xl mb-8"
          />
        </div>
      </div>
    </div>
  );
}
