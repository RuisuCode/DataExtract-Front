import { Header } from "antd/es/layout/layout";
import { Typography, Button } from "antd";
// import { FileText, Shredder } from "lucide-react";
export default function HeaderComponent() {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderWidth: "0 0 1px 0",
        borderStyle: "solid",
        borderColor: "rgba(255, 255, 255, 0.1)",
        position: "fixed",
        width: "100%",
        zIndex: 50,
      }}
    >
      <Typography.Title level={3} style={{ marginTop: "10px" }}>
        Data Extractor
      </Typography.Title>
      <Button
        color="primary"
        variant="solid"
        size="large"
        type="primary"
        shape="round"
        style={{ boxShadow: "none", paddingBlock: "10px" }}
      >
        Comenzar
      </Button>
    </Header>
  );
}
