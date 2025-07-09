import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { ConfigProvider, Spin } from "antd";
import { Toaster } from "react-hot-toast";
import { ThemeContext } from "./context/ThemeContext";

import { classicalLight } from "./themes/classicalLight";
import { classicalDark } from "./themes/classicalDark";
import { coffeeTheme } from "./themes/coffeeTheme";
import { darkGreenTheme } from "./themes/darkGreenTheme";
import { darkBlueTheme } from "./themes/darkBlueTheme";
import { colorPopTheme } from "./themes/colorPopTheme";
import { natureTheme } from "./themes/natureTheme";
import { neonTheme } from "./themes/neonTheme";
import { pastelTheme } from "./themes/pastelTheme";
import { darkPastelTheme } from "./themes/darkPastelTheme";
import { sunsetTheme } from "./themes/sunsetTheme";

const THEME_KEY = "chat-theme";

function getThemeFromStorage() {
  const themeName = localStorage.getItem(THEME_KEY);
  if (themeName === "classicalLight") return classicalLight;
  if (themeName === "classicalDark") return classicalDark;
  if (themeName === "coffeeTheme") return coffeeTheme;
  if (themeName === "darkGreenTheme") return darkGreenTheme;
  if (themeName === "darkBlueTheme") return darkBlueTheme;
  if (themeName === "colorPopTheme") return colorPopTheme;
  if (themeName === "natureTheme") return natureTheme;
  if (themeName === "neonTheme") return neonTheme;
  if (themeName === "pastelTheme") return pastelTheme;
  if (themeName === "darkPastelTheme") return darkPastelTheme;
  if (themeName === "sunsetTheme") return sunsetTheme;
  return classicalDark; // default
}

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  console.log(onlineUsers)

  const [currentTheme, setCurrentTheme] = useState(() => getThemeFromStorage());

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  console.log({ authUser });

  useEffect(() => {
    if (currentTheme?.themeName) {
      localStorage.setItem(THEME_KEY, currentTheme.themeName);
    }
  }, [currentTheme]);

  useEffect(() => {
    const themeName = localStorage.getItem(THEME_KEY);
    if (themeName && currentTheme.themeName !== themeName) {
      setCurrentTheme(getThemeFromStorage());
    }
    // eslint-disable-next-line
  }, []);

  if (isCheckingAuth && !authUser) return <Spin spinning={true} fullscreen />;

  return (
    <ThemeContext.Provider value={currentTheme}>
      <ConfigProvider theme={currentTheme}>
        <Routes>
          {/* <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/"
            element={authUser ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/settings"
            element={
              <SettingsPage
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              />
            }
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster />
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export default App;
