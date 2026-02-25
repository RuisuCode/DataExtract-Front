import { Typography, Card, Flex, Grid } from "antd";
import { Upload, Sparkles, Zap } from "lucide-react";

const { useBreakpoint } = Grid;

export default function SecondContent() {
  const screens = useBreakpoint();

  return (
    <Flex
      vertical
      align="center"
      style={{
        background: "linear-gradient(to bottom, #000000, #0a1628)",
        paddingBlock: screens.md ? "100px" : "60px",
        paddingInline: "5%",
        minHeight: "600px",
      }}
    >
      <Flex vertical align="center" style={{ marginBottom: "60px" }}>
        <Typography.Title
          level={1}
          style={{
            fontSize: screens.md ? "48px" : "32px",
            color: "#ffffff",
            margin: 0,
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Potencia tu flujo de trabajo
        </Typography.Title>
        <Typography.Paragraph
          style={{
            fontSize: screens.md ? "18px" : "16px",
            color: "#a0a0a0",
            textAlign: "center",
            maxWidth: "600px",
            margin: 0,
          }}
        >
          Todo lo que necesitas para extraer, analizar y actuar
        </Typography.Paragraph>
      </Flex>

      <Flex
        gap="large"
        wrap="wrap"
        style={{
          width: "100%",
          maxWidth: "1200px",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            flex: "1 1 300px",
            background: "rgba(17, 24, 39, 0.7)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
          }}
          styles={{
            body: {
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
              height: "100%",
            },
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, rgba(88, 28, 135, 0.5) 0%, rgba(124, 58, 237, 0.5) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              border: "1px solid rgba(139, 92, 246, 0.3)",
            }}
          >
            <Upload size={24} color="#d8b4fe" />
          </div>
          <Typography.Title
            level={3}
            style={{
              color: "#ffffff",
              marginBottom: "12px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Sube cualquier Excel
          </Typography.Title>
          <Typography.Paragraph
            style={{
              color: "#9ca3af",
              fontSize: "15px",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Soporta todos los formatos. Desde pequeños archivos hasta bases de
            datos masivas.
          </Typography.Paragraph>
        </Card>

        <Card
          style={{
            flex: "1 1 300px",
            background: "rgba(17, 24, 39, 0.7)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
          }}
          styles={{
            body: {
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
              height: "100%",
            },
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, rgba(8, 145, 178, 0.5) 0%, rgba(34, 211, 238, 0.5) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              border: "1px solid rgba(45, 212, 191, 0.3)",
            }}
          >
            <Sparkles size={24} color="#67e8f9" />
          </div>
          <Typography.Title
            level={3}
            style={{
              color: "#ffffff",
              marginBottom: "12px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Prompts Naturales
          </Typography.Title>
          <Typography.Paragraph
            style={{
              color: "#9ca3af",
              fontSize: "15px",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Escribe en lenguaje natural qué datos quieres. La IA se encarga del
            resto.
          </Typography.Paragraph>
        </Card>

        <Card
          style={{
            flex: "1 1 300px",
            background: "rgba(17, 24, 39, 0.7)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
          }}
          styles={{
            body: {
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
              height: "100%",
            },
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, rgba(79, 70, 229, 0.5) 0%, rgba(129, 140, 248, 0.5) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              border: "1px solid rgba(167, 139, 250, 0.3)",
            }}
          >
            <Zap size={24} color="#c4b5fd" />
          </div>
          <Typography.Title
            level={3}
            style={{
              color: "#ffffff",
              marginBottom: "12px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Resultados Instantáneos
          </Typography.Title>
          <Typography.Paragraph
            style={{
              color: "#9ca3af",
              fontSize: "15px",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Obtén tus datos procesados en segundos, listos para usar o exportar.
          </Typography.Paragraph>
        </Card>
      </Flex>
    </Flex>
  );
}
