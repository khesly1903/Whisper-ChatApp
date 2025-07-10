import React, { useContext } from 'react'
import {
  LockOutlined
} from "@ant-design/icons";
import { ThemeContext } from '../context/ThemeContext';

export default function NoChatSelected() {

  const theme = useContext(ThemeContext);

  return (
    <div className="center-flex">
      <div className="center-flex"
        style={{
          width: "100%",
          height: "100vh",
          background: theme?.themeInfo?.backgroundSecondary,
          color: theme?.themeInfo?.colorText,
          flexDirection: "column"
        }}>

        <LockOutlined  style={{ color: "white", fontSize:"10rem", marginBottom:"1rem"}} />

        <div style={{fontSize:"1.2rem"}}>Ready to whisper secrets? Pick a chat</div>

      </div>

    </div>
  )
}
