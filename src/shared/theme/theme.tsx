// import { theme } from 'antd'
import type { ThemeConfig } from "antd";

// const { getDesignToken, useToken } = theme;

export const config: ThemeConfig = {
  token: {
    colorPrimary: "#8b8cff",
    colorBgBase: "#020202",
    colorTextBase: "#fff",
    fontFamily: "Geist, Inter, sans-serif",
    colorTextSecondary: "#9E9E9E",
  },
  components: {
    Layout: {
      headerBg: "#020202",
    },

   
  },
};
