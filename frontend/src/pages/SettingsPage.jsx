import React from "react";

import { Row, Col, Card, Space, Input, Button, Avatar } from "antd";
import { SendOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

import { classicalLight } from "../themes/classicalLight";
import { classicalDark } from "../themes/classicalDark";
import { coffeeTheme } from "../themes/coffeeTheme";
import { darkGreenTheme } from "../themes/darkGreenTheme";
import { darkBlueTheme } from "../themes/darkBlueTheme";
import { colorPopTheme } from "../themes/colorPopTheme";
import { natureTheme } from "../themes/natureTheme";
import { neonTheme } from "../themes/neonTheme";
import { pastelTheme } from "../themes/pastelTheme";
import { darkPastelTheme } from "../themes/darkPastelTheme";
import { sunsetTheme } from "../themes/sunsetTheme";

import backgrounds from "../themes/backgrounds.json";

import { MessageBubble } from "../components/MessageBubble";
import Navbar from "../components/Navbar";

const themes = [
  { ...classicalLight.themeInfo, themeObj: classicalLight },
  { ...classicalDark.themeInfo, themeObj: classicalDark },
  { ...coffeeTheme.themeInfo, themeObj: coffeeTheme },
  { ...darkGreenTheme.themeInfo, themeObj: darkGreenTheme },
  { ...darkBlueTheme.themeInfo, themeObj: darkBlueTheme },
  { ...colorPopTheme.themeInfo, themeObj: colorPopTheme },
  { ...natureTheme.themeInfo, themeObj: natureTheme },
  { ...neonTheme.themeInfo, themeObj: neonTheme },
  { ...pastelTheme.themeInfo, themeObj: pastelTheme },
  { ...darkPastelTheme.themeInfo, themeObj: darkPastelTheme },
  { ...sunsetTheme.themeInfo, themeObj: sunsetTheme },
];

const backgroundList = Object.entries(backgrounds.backgrounds);

function SettingsPage({
  currentTheme,
  setCurrentTheme,
  currentBackground,
  setCurrentBackground,
}) {
  return (
    <Navbar>
      <div style={{ marginTop: "3.5rem", padding: "1rem", minHeight: "100vh" }}>
        {/* theme selection */}
        <div>
          <Row gutter={[16, 16]}>
            {themes.map((theme, idx) => (
              <Col key={idx} xs={24} sm={12} md={12} lg={6} xl={6}>
                <Card
                  hoverable
                  onClick={() => setCurrentTheme(theme.themeObj)}
                  style={{
                    background: theme.backgroundPrimary,
                    color: theme.colorText,
                    border: "1px solid",
                    borderColor: theme.backgroundPrimary,
                    // border: "none",
                  }}
                  cover={
                    <div
                      style={{
                        height: "3.5rem",
                        backgroundColor: theme.backgroundSecondary,
                        fontSize: "1.5rem",
                        textAlign: "center",
                        padding: "0.5rem",
                        border: "1px solid `theme.backgroundSecondary`",
                        // border: "none",
                      }}
                    >
                      {theme.themeName}
                    </div>
                  }
                >
                  <Space
                    direction="horizontal"
                    size="middle"
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      className="theme-color"
                      style={{ backgroundColor: theme.backgroundSecondary }}
                    ></div>
                    <div
                      className="theme-color"
                      style={{ backgroundColor: theme.colorPrimary }}
                    ></div>
                    <div
                      className="theme-color"
                      style={{ backgroundColor: theme.colorSecondary }}
                    ></div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* backgorund selection */}
        <div className="center-flex">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              margin: "2rem",
            }}
          >
            {backgroundList.map(([id, bgUrl]) => (
              <div
                key={id}
                onClick={() => setCurrentBackground(id)} // Artık App.jsx'teki state'i değiştirir
                style={{
                  width: "10rem",
                  height: "10rem",
                  backgroundColor: currentTheme.themeInfo.backgroundPrimary,
                  backgroundImage: bgUrl,
                  backgroundSize: "auto",
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
        </div>

        {/* theme demo */}
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

              <MessageBubble side="right">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit, quae!
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
    </Navbar>
  );
}

export default SettingsPage;
