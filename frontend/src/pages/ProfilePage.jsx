import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  UserOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Avatar, Image, Button, Upload, Typography, message, Spin } from "antd";
import Navbar from "../components/Navbar";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const { Title } = Typography;
  const [fullName, setFullName] = useState(authUser.fullName);

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
    <Navbar>
      <div
        className="center-flex"
        style={{ minHeight: "100vh", overflow: "hidden" }}
      >
        <div className="account center-flex">
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
          <Title
            editable={{
              onChange: async (val) => {
                setFullName(val);
                await updateProfile({ fullName: val });
              },
            }}
            level={3}
          >
            {fullName}
          </Title>
          <Title level={5} style={{marginTop: "-1rem"}}>
            @{authUser?.nickName}
          </Title>
        </div>
      </div>
    </Navbar>
  );
}

export default ProfilePage;
