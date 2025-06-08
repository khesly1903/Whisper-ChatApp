import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { ConfigProvider, Spin, theme } from "antd"; // useTheme yerine theme import et
import { Toaster } from "react-hot-toast";
import { classicalDark } from "./themes/classicalDark";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  // const { token } = theme.useToken(); // Doğru kullanım!

  const [currentTheme, setCurrentTheme] = useState(classicalDark)

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });

  // Show fullscreen loader while checking auth
  if (isCheckingAuth && !authUser) return <Spin spinning={true} fullscreen />;

  return (
    <ConfigProvider theme={currentTheme}>

    {/* <div style={{ backgroundColor: token.colorBgBase, minHeight: "100vh" }}> */}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
        <Route path="/settings" element={<SettingsPage setCurrentTheme={setCurrentTheme} />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
      </Routes>
      <Toaster />
    {/* </div> */}
          </ConfigProvider>
  );
}

export default App;
