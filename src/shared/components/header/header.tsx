import { Header } from "antd/es/layout/layout";
import { Typography, Button, Flex, Avatar } from "antd";
import { useAuthStore } from "../../store/useAuthStore";
// import { FileText, Shredder } from "lucide-react";
export default function HeaderComponent() {
  const { isAuthenticated, user, logout } = useAuthStore();

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
      <Flex
      // style={{ marginTop: "10px" }}
        align="center"
        gap="small"
        justify="center"
      >
        <Avatar
            size={40}
              src={
                <img
                  src="/logo_data_extract_transparent.png"
                  alt="Data Extract Logo"
                  style={{ height: 62, width: 62 }}
                />
              }
            />
      <Typography.Title level={3} style={{marginTop:10}} >
        Data Extractor
      </Typography.Title>
      </Flex>

      {isAuthenticated ? (
        <Flex align="center" gap="small">
          <Typography.Text style={{ color: "white" }}>
            Hola, {user?.name || user?.email || "Usuario"}
          </Typography.Text>
          <Button
            type="link"
            style={{ color: "#ff6b6b" }}
            onClick={() => logout()}
          >
            Cerrar sesión
          </Button>
        </Flex>
      ) : (
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
      )}
    </Header>
  );
}
