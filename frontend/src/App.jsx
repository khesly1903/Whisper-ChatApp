import React from "react";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Spin } from "antd";

import { Toaster } from "react-hot-toast"

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // check auth whether app is open or page is refreshed
  // dependency is checkauth
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });

  // Show fullscreen loader while checking auth
  if (isCheckingAuth && !authUser) return <Spin spinning={true} fullscreen />;

  return (
    <div>
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
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster/>
    </div>
  );
}

export default App;
