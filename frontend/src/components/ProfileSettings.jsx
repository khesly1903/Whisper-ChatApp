import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  UserOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Image,
  Button,
  Upload,
  message,
  Spin,
  Form,
  Input,
  Collapse,
} from "antd";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";

export default function ProfileSettings() {
  const { currentTheme } = useContext(ThemeContext);

  const { authUser, isUpdatingProfile, updateProfile, changePassword } =
    useAuthStore();

  const [fullName, setFullName] = useState(authUser.fullName);
  const [nickName, setNickName] = useState(authUser.nickName);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [passwordForm] = Form.useForm();
  const [profileForm] = Form.useForm();

  const handleNameChange = async () => {
    try {
      await updateProfile({ fullName: fullName, nickName: nickName });
    } catch (error) {
      toast.error(error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await changePassword({ password: password, newPassword: newPassword });
    } catch (error) {
      toast.error(error);
    }
  };

  // convert to base64
  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
  };

  // Upload image
  const handleBeforeUpload = async (file) => {
    const isLt5M = file.size / 1024 / 1024 < 10;
    if (!isLt5M) {
      message.error("Please upload an image smaller than 10MB.");
      return false;
    }

    try {
      await new Promise((resolve) => {
        getBase64(file, async (base64image) => {
          await updateProfile({ profilePic: base64image });
          resolve();
        });
      });
    } catch (error) {
      console.log("Error in updateProfile:", error);
      message.error("Failed to upload image");
    }

    return false;
  };
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
          backgroundColor: currentTheme.themeInfo.backgroundSecondary,
          // backgroundImage: backgrounds.backgrounds[currentBackground],
          width: "98%",
          height: "98vh",
          borderRadius: "1rem",
          overflow: "hidden",
          padding: "1rem",
        }}
      >
        <div
          className="center-flex"
          style={{ minHeight: "100vh", overflow: "hidden" }}
        >
          <div className="account center-flex" style={{ width: "50%" }}>
            {isUpdatingProfile ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            ) : authUser?.profilePic ? (
              <Image
                src={authUser.profilePic}
                width="16rem"
                height="16rem"
                style={{ borderRadius: "2rem" }}
              />
            ) : (
              <Avatar shape="square" size={250} icon={<UserOutlined />} />
            )}

            <Upload
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div style={{ width: "50%" , display:"flex", flexDirection:"column", gap:"0.5rem"}}>
            <Form
              form={profileForm}
              name="nameChange"
              onFinish={handleNameChange}
              initialValues={{ fullName: fullName, nickName: nickName }}
              autoComplete="off"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
            >
              <Collapse activeKey={["1"]}>
                <Collapse.Panel header="Names" key="1" showArrow={false}>
                  <Form.Item label="fullname" name="fullName">
                    <Input
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                    />
                  </Form.Item>

                  <Form.Item label="nickName" name="nickName">
                    <Input
                      onChange={(e) => {
                        setNickName(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label={null}>
                    <Button type="primary" onClick={() => profileForm.submit()}>
                      Submit
                    </Button>
                  </Form.Item>
                </Collapse.Panel>
              </Collapse>
            </Form>
            <Form
              form={passwordForm}
              name="changePassword"
              onFinish={handlePasswordChange}
              autoComplete="off"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
            >
              <Collapse>
                <Collapse.Panel header="Change Password" key="2">
                  <Form.Item
                    label="Current Password"
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Enter your old password!",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Enter your new password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Confirm New Password"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label={null}>
                    <Button
                      type="primary"
                      onClick={() => passwordForm.submit()}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Collapse.Panel>
              </Collapse>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
