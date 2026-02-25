// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import LandingPage from "./pages/index";
import { ConfigProvider } from "antd";
import { config } from "./shared/theme/theme";
import "./shared/theme/globalCSS.css";
createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={config}>
    <LandingPage />
  </ConfigProvider>
);
