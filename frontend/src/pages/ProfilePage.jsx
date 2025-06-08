import React, { useState } from "react";
import SidebarLayout from "./SidebarLayout";

import { useAuthStore } from "../store/useAuthStore";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Image, Button, Upload, Typography } from "antd";

function ProfilePage() {
  const { authUser, updateProfile } = useAuthStore();
  const { Title } = Typography;
  const [fullName, setFullName] = useState(authUser.fullName);

  // convert to base64
  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
  };

  // Upload image
  const handleBeforeUpload = (file) => {
    // limit image size
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Please upload an image smaller than 10MB.");
      return false;
    }

    getBase64(file, async (base64image) => {
      await updateProfile({ profilePic: base64image });
    });
    // block auto upload
    return false;
  };

  return (
    <SidebarLayout>
      <div className="account-container center-flex">
        <div className="account center-flex">
          {authUser?.profilePic ? (
            // <img width={200} src={authUser.profilePic} alt="Profile" />
            <Image
              src={authUser.profilePic}
              width="16rem"
              height="16rem"
              style={{ borderRadius: "2rem" }}
            />
          ) : (
            <Avatar shape="square" size={"16rem"} icon={<UserOutlined />} />
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
        </div>
      </div>
    </SidebarLayout>
  );
}

export default ProfilePage;
