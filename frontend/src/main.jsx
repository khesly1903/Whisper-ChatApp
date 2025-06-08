import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css"; // veya "antd/dist/antd.css"

import { coffeeTheme} from "./themes/coffeeTheme";
import { darkGreenTheme} from "./themes/darkGreenTheme.jsx";
import { darkBlueTheme} from "./themes/darkBlueTheme.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={darkBlueTheme}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
