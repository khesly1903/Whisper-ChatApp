import React from "react";
import SidebarLayout from "./SidebarLayout";
import { Row, Col, Card, Space } from "antd";

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

// Tema bilgilerini array olarak tanımla
const themes = [
  { ...classicalLight.themeInfo },
  { ...classicalDark.themeInfo },
  { ...coffeeTheme.themeInfo },
  { ...darkGreenTheme.themeInfo },
  { ...darkBlueTheme.themeInfo },
  { ...colorPopTheme.themeInfo },
  { ...natureTheme.themeInfo },
  { ...neonTheme.themeInfo },
  { ...pastelTheme.themeInfo },
  { ...darkPastelTheme.themeInfo },
  { ...sunsetTheme.themeInfo },
];

function SettingsPage() {
  return (
    <SidebarLayout>
      <div className="themes-container">
        <Row gutter={[16, 16]}>
          {themes.map((theme, idx) => (
            <Col key={idx} xs={24} sm={12} md={12} lg={6} xl={6}>
              <Card
                hoverable
                style={{
                  background: theme.backgroundPrimary,
                  color: theme.colorText,
                }}
                cover={
                  <div
                    style={{
                      height: "3.5rem",
                      backgroundColor: theme.backgroundSecondary,
                      fontSize: "1.5rem",
                      textAlign: "center",
                      padding: "0.5rem",
                      border: "1px solid black",
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
    </SidebarLayout>
  );
}

export default SettingsPage;
