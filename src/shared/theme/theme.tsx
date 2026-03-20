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
    Button:{
      colorBgBase:'rgba(255,255,255,0.03)',
      colorBorder:'rgba(255,255,255,0.1)',
      colorText:'white',
      paddingInline:'20px',
      defaultBg:'rgba(255,255,255,0.03)',
      defaultBorderColor:'rgba(255,255,255,0.1)',
      defaultColor:'white',
      colorPrimary:'rgba(255,255,255,0.03)',
      colorPrimaryBorder:'rgba(255,255,255,0.1)',

      
    }

   
  },
};
