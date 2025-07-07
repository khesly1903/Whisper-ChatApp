import React, { useContext } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Avatar, Space, Flex, Typography, Image} from 'antd'
import { CloseCircleOutlined, UserOutlined } from "@ant-design/icons";
import { ThemeContext } from '../context/ThemeContext';

const { Text } = Typography;

export default function ChatHeader() {

  const theme = useContext(ThemeContext);

  const { selectedUser, setSelectedUser } = useChatStore()

  const handleProfilePic = () => {
    if (selectedUser.profilePic) {
      // click to preview but z index problem ???
      return <Image src={selectedUser.profilePic} width={"2rem"} height={"2rem"} preview="false"
              style={{ 
                borderRadius: "8px"
              }}/>
      // return <Avatar src={selectedUser.profilePic} size={40} shape="square" />
    }
    else {
      return <Avatar icon={<UserOutlined />} size={40} shape="square" />
    }
  }

  const handleUnselectUser = () => {
    setSelectedUser(null)
  }

  return (
    <div style={{ 
      background:theme.themeInfo.backgroundSecondary, 
      width: "100%", 
      height: "4rem",
      padding: "0 1rem",
      borderBottom: "1px solid #d9d9d9"
    }}>
      <Flex justify="space-between" align="center" style={{ height: "100%" }}>
        {/* Profile picture and username */}
        <Space size="middle" align="center">
          {handleProfilePic()}
          <Text strong style={{ fontSize: "16px" }}>
            {selectedUser?.fullName}
          </Text>
        </Space>

        {/* Close button */}
        <CloseCircleOutlined 
          onClick={handleUnselectUser}
          style={{ 
            fontSize: "2rem", 
            cursor: "pointer",
            color: "#8c8c8c",
            transition: "color 0.3s"
          }}
          
        />
      </Flex>
    </div>
  )
}
