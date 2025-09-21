import React from "react";

import { Row, Col, Card, Space, Input, Button, Avatar, Collapse } from "antd";
import { SendOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

import { ThemeContext } from "../context/ThemeContext";
// import { classicalLight } from "../themes/classicalLight";
import { classicalDark } from "../themes/classicalDark";
import { coffeeTheme } from "../themes/coffeeTheme";
import { darkGreenTheme } from "../themes/darkGreenTheme";
import { darkBlueTheme } from "../themes/darkBlueTheme";
// import { colorPopTheme } from "../themes/colorPopTheme";
import { natureTheme } from "../themes/natureTheme";
import { neonTheme } from "../themes/neonTheme";
import { pastelTheme } from "../themes/pastelTheme";
import { darkPastelTheme } from "../themes/darkPastelTheme";
// import { sunsetTheme } from "../themes/sunsetTheme";

import backgrounds from "../themes/backgrounds.json";

import { MessageBubble } from "./MessageBubble";

import { useEffect } from "react";
import { useContext } from "react";

const themes = [
  // { ...classicalLight.themeInfo, themeObj: classicalLight },
  { ...classicalDark.themeInfo, themeObj: classicalDark },
  { ...coffeeTheme.themeInfo, themeObj: coffeeTheme },
  { ...darkGreenTheme.themeInfo, themeObj: darkGreenTheme },
  { ...darkBlueTheme.themeInfo, themeObj: darkBlueTheme },
  // { ...colorPopTheme.themeInfo, themeObj: colorPopTheme },
  { ...natureTheme.themeInfo, themeObj: natureTheme },
  { ...neonTheme.themeInfo, themeObj: neonTheme },
  { ...pastelTheme.themeInfo, themeObj: pastelTheme },
  { ...darkPastelTheme.themeInfo, themeObj: darkPastelTheme },
  // { ...sunsetTheme.themeInfo, themeObj: sunsetTheme },
];

const backgroundList = Object.entries(backgrounds.backgrounds);
const THEME_KEY = "chat-theme";
const BACKGROUND_KEY = "chat-background"; // Background key'i ekle

// // Background için storage fonksiyonu ekle
// function getBackgroundFromStorage() {
//   const backgroundId = localStorage.getItem(BACKGROUND_KEY);
//   return backgroundId || "1"; // default background ID
// }

function getThemeFromStorage() {
  const themeName = localStorage.getItem(THEME_KEY);
  // if (themeName === "classicalLight") return classicalLight;
  if (themeName === "classicalDark") return classicalDark;
  if (themeName === "coffeeTheme") return coffeeTheme;
  if (themeName === "darkGreenTheme") return darkGreenTheme;
  if (themeName === "darkBlueTheme") return darkBlueTheme;
  // if (themeName === "colorPopTheme") return colorPopTheme;
  if (themeName === "natureTheme") return natureTheme;
  if (themeName === "neonTheme") return neonTheme;
  if (themeName === "pastelTheme") return pastelTheme;
  if (themeName === "darkPastelTheme") return darkPastelTheme;
  // if (themeName === "sunsetTheme") return sunsetTheme;
  return classicalDark; // default
}

function ThemeSettings() {
  // const [currentTheme, setCurrentTheme] = useState(() => getThemeFromStorage());
  // const [currentBackground, setCurrentBackground] = useState(() =>
  //   getBackgroundFromStorage()
  // ); // Background state'i ekle

  const {
    currentTheme,
    setCurrentTheme,
    currentBackground,
    setCurrentBackground,
  } = useContext(ThemeContext);

  // Theme için localStorage
  useEffect(() => {
    if (currentTheme?.themeName) {
      localStorage.setItem(THEME_KEY, currentTheme.themeName);
    }
  }, [currentTheme]);

  // Background için localStorage ekle
  useEffect(() => {
    if (currentBackground) {
      localStorage.setItem(BACKGROUND_KEY, currentBackground);
    }
  }, [currentBackground]);

  useEffect(() => {
    const themeName = localStorage.getItem(THEME_KEY);
    if (themeName && currentTheme.themeName !== themeName) {
      setCurrentTheme(getThemeFromStorage());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        background: currentTheme.themeInfo.backgroundPrimary,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          overflow: "auto",
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          {/* THEME */}
          <Collapse
            activeKey={["1"]}
            style={{
              backgroundColor: currentTheme.themeInfo.backgroundPrimary,
              width: "50%",
            }}
          >
            <Collapse.Panel
              showArrow={false}
              header={
                <div style={{ textAlign: "center", width: "100%" }}>Theme</div>
              }
              key="1"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)", // 4 sütun
                  gap: "1rem",
                  justifyItems: "center",
                }}
              >
                {themes.map((theme, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentTheme(theme.themeObj)}
                    style={{
                      cursor: "pointer",
                      width: "100%", // grid hücresini kaplasın
                      maxWidth: "30rem", // çok büyümesin diye sınır koyduk
                      borderRadius: "0.5rem",
                      overflow: "hidden",
                      border: `1px solid ${theme.backgroundPrimary}`,
                      background: theme.backgroundPrimary,
                      color: theme.colorText,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        height: "2.5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: theme.backgroundSecondary,
                        fontSize: "1.2rem",
                        fontWeight: "500",
                      }}
                    >
                      {theme.themeName}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        gap: "0.5rem",
                        padding: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: "33%",
                          maxWidth: "5rem",
                          height: "2rem",
                          borderRadius: "20%",
                          backgroundColor: theme.backgroundSecondary,
                        }}
                      />
                      <div
                        style={{
                          width: "33%",
                          maxWidth: "5rem",
                          height: "2rem",
                          borderRadius: "20%",
                          backgroundColor: theme.colorPrimary,
                        }}
                      />
                      <div
                        style={{
                          width: "33%",
                          maxWidth: "5rem",
                          height: "2rem",
                          borderRadius: "20%",
                          backgroundColor: theme.colorSecondary,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Collapse.Panel>
          </Collapse>

          <div style={{ margin: "1rem" }}></div>

          {/* BACKGROUND */}
          <Collapse
            activeKey={["1"]}
            style={{
              backgroundColor: currentTheme.themeInfo.backgroundPrimary,
              width: "50%",
            }}
          >
            <Collapse.Panel
              showArrow={false}
              header={
                <div style={{ textAlign: "center", width: "100%" }}>
                  Background
                </div>
              }
              key={1}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)", // 4 sütun
                  gap: "1rem",
                  width: "100%",
                }}
              >
                {backgroundList.map(([id, bgUrl]) => (
                  <div
                    key={id}
                    onClick={() => setCurrentBackground(id)}
                    style={{
                      width: "100%", // grid hücresine oturur
                      height: "5rem",
                      backgroundColor: currentTheme.themeInfo.backgroundPrimary,
                      backgroundImage: bgUrl,
                      backgroundPosition: "center",
                      border:
                        currentBackground === id
                          ? `3px solid ${currentTheme.themeInfo.colorPrimary}`
                          : "1px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    title={`Background ${id}`}
                  />
                ))}
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>

        {/* DEMO */}
        <div className="center-flex">
          <div
            className="theme-demo"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              height: "32rem",
              margin: "2rem",
              padding: "2rem",
              borderRadius: "2rem",
              backgroundColor: currentTheme.themeInfo.backgroundPrimary,
              backgroundImage: backgrounds.backgrounds[currentBackground],
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
              border: `1px solid ${currentTheme.themeInfo.colorText}`,
            }}
          >
            {/* UST NAVBAR ALANI */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "3rem",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                background: currentTheme.themeInfo.backgroundSecondary,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar shape="square" size={"16rem"} icon={<UserOutlined />} />
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: currentTheme.themeInfo.colorText,
                  }}
                >
                  My Friend
                </span>
              </div>
              {/* Sağ taraf: Ayar simgesi */}
              <SettingOutlined
                style={{
                  fontSize: 22,
                  color: currentTheme.themeInfo.colorText,
                  cursor: "pointer",
                }}
              />
            </div>

            {/* Message examples */}
            <div style={{ margin: "1.5rem 0", flex: "1", overflowY: "auto" }}>
              <MessageBubble side="right">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                necessitatibus?
              </MessageBubble>
              <MessageBubble side="right">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                magnam accusantium quas facere vitae nostrum sunt reprehenderit
                qui eveniet quae.
              </MessageBubble>

              <MessageBubble side="left">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
                similique rem praesentium vel ipsam inventore unde, in nemo iste
                laudantium iure, eveniet expedita ex ea.
              </MessageBubble>
              <MessageBubble side="left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae quod, eum, magnam qui officiis quidem temporibus
                dolorum consequuntur, cupiditate ex ad excepturi dicta
                blanditiis modi illo voluptate optio numquam id.
              </MessageBubble>
            </div>

            {/* Message input area*/}
            <div
              className="center-flex"
              style={{
                width: "100%",
                gap: 8,
              }}
            >
              <Input
                placeholder="Lorem ipsum dolor sit amet consectetur"
                style={{ flex: 1 }}
                maxLength={100}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                style={{ minWidth: "3rem", border: "none", boxShadow: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSettings;
