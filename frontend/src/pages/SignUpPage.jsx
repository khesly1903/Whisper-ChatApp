import React, { useContext, useState } from "react";
import { Input, Button, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "../styles/signuppage.css";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";

function SignUpPage() {
  const { Title, Text } = Typography;
  const theme = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, isSigninUp } = useAuthStore();

  // Tek bir state ile iki password inputunun göz ikonunu bağlamak için
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password required");
      return false;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters, include at least 1 letter and 1 number"
      );
      return false;
    }
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    signup(formData);
  };

  return (
    <div className="account-container center-flex" style={{background: theme?.themeInfo?.backgroundPrimary}}>
      <form className="account center-flex" onSubmit={handleSubmit}>
        <Title level={2}>Sign Up</Title>
        <Input
          placeholder="Full Name"
          prefix={<UserOutlined />}
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          prefix={<MailOutlined />}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input.Password
          placeholder="Enter your password"
          prefix={<LockOutlined />}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          visibilityToggle={{
            visible: showPassword,
            onVisibleChange: setShowPassword,
          }}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Input.Password
          placeholder="Re-enter your password"
          prefix={<LockOutlined />}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          visibilityToggle={{
            visible: showPassword,
            onVisibleChange: setShowPassword,
          }}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          status={
            confirmPassword && formData.password !== confirmPassword
              ? "warning"
              : ""
          }
        />
        <Button type="primary" htmlType="submit" loading={isSigninUp} block>
          Sign Up
        </Button>
        <Text style={{ marginTop: "1rem" }}>
          Already have an account? <Link to="/login">Login</Link>
        </Text>
      </form>
    </div>
  );
}

export default SignUpPage;
