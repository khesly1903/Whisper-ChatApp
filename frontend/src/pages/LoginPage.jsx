import React, { useState } from "react";
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

function LoginPage() {
  const { Title, Text } = Typography;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email required");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password required");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    login(formData);
  };

  return (
    <div className="account-container center-flex">
      <form className="account center-flex" onSubmit={handleSubmit}>
        <Title level={2}>Log in</Title>

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

        <Button type="primary" htmlType="submit" loading={isLoggingIn} block>
          Log in
        </Button>
        <Text style={{ marginTop: "1rem" }}>
          {" "}
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </Text>
      </form>
    </div>
  );
}

export default LoginPage;
