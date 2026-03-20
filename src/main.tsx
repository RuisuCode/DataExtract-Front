// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { config } from "./shared/theme/theme";
import "./shared/theme/globalCSS.css";
import { Toaster } from "sileo";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={config}>
    <Toaster position="top-right" theme="light" options={{ roundness: 4, autopilot: { collapse: 2000, expand: 300 } }} />
    <RouterProvider router={router} />
  </ConfigProvider>
);
