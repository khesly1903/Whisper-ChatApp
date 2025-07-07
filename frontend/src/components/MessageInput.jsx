import React, { useContext, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Input, Button, Space, Image } from 'antd'
import { SendOutlined, PictureOutlined, CloseOutlined } from '@ant-design/icons'
import { ThemeContext } from '../context/ThemeContext'
import toast from 'react-hot-toast'

const { TextArea } = Input

export default function MessageInput() {

  const theme = useContext(ThemeContext);

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");

      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send messages:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }

  };

  return (
    <>
      {/* Image Preview */}
      
      {imagePreview && (
        <div style={{
          width: "100%",
          height: "10rem",
          background: theme.themeInfo.backgroundSecondary,
          borderTop: "1px solid silver",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem"
        }}>
          {/* Image Container - Image and  Remove Button*/}
          <div style={{
            position: "relative",
            display: "inline-block"
          }}>
            <Image
              height={"9rem"}
              src={imagePreview}
              preview={false}
              style={{ 
                zIndex: 9999,
                borderRadius: "8px"
              }}
            />
            
            {/* Remove Button  */}
            <Button
              type="text"
              danger
              icon={<CloseOutlined />}
              onClick={removeImage}
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                zIndex: 10000,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid #ff4d4f",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                minWidth: "28px" 
              }}
            />
          </div>
        </div>
      )}

      {/* Message Input Area Container */}
      <form onSubmit={handleSendMessage}
        style={{
          padding: '1rem',
          borderTop: '1px solid #d9d9d9',
          backgroundColor: theme.themeInfo.backgroundSecondary
        }}>
        <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: "center", gap: "0.5rem" }}>


          {/* Message Input Area */}
          <TextArea
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoSize={{
              minRows: 1,
              maxRows: 6
            }}
            style={{
              flex: 1,
              resize: 'none',
              borderRadius: '8px'
            }}
          />

          {/* Image select */}
          <Button
            icon={<PictureOutlined />}
            size="large"
            onClick={handleButtonClick}
            style={{
              height: "2rem",
              flexShrink: 0,
              borderRadius: "1rem"
            }}
          >
            <input type="file" accept="image" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }} />
          </Button>
          {/* Send message */}
          <Button
            type="primary"
            htmlType="submit"
            disabled={!text.trim() && !imagePreview}
            icon={<SendOutlined />}
            size="large"
            style={{
              height: "2rem",
              flexShrink: 0,
              borderRadius: "1rem",
              boxShadow: "none"
            }}
          />
        </Space.Compact>
      </form>
    </>
  )
}
