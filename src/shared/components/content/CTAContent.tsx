import { Flex, Typography, Button, Grid } from "antd";
import { motion } from "motion/react";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function CTAContent() {
  const screens = useBreakpoint();

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        background: "#030712",
        paddingBlock: screens.md ? "80px" : "40px",
        paddingInline: "5%",
        minHeight: "400px",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(8, 145, 178, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
          borderRadius: "24px",
          padding: screens.md ? "60px 40px" : "30px 20px",
          textAlign: "center",
          width: "100%",
          maxWidth: "900px",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Title
          level={2}
          style={{
            color: "white",
            fontSize: screens.md ? "42px" : "28px",
            marginBottom: "16px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          ¿Listo para transformar tus datos?
        </Title>
        <Text
          style={{
            color: "#9ca3af",
            fontSize: screens.md ? "18px" : "16px",
            marginBottom: "40px",
            display: "block",
            marginTop: "16px",
          }}
        >
          Cientos de usuarios ya están extrayendo datos más rápido que nunca
        </Text>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="primary"
            size="large"
            style={{
              height: "56px",
              paddingInline: "40px",
              fontSize: "18px",
              fontWeight: "600",
              border: "none",
              borderRadius: "50px",
              background: "linear-gradient(90deg, #a855f7, #0ea5e9)", // Purple to Cyan gradient
              boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)",
            }}
          >
            Comienza Gratis Ahora
          </Button>
        </motion.div>
      </div>

      <Text
        style={{
          color: "#6b7280",
          marginTop: "100px",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} DataExtract. Todos los derechos reservados.
      </Text>
    </Flex>
  );
}
