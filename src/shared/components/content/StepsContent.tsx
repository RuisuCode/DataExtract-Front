import { Flex, Typography, Grid } from "antd";
import { ShieldCheck, Users, Zap } from "lucide-react";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function StepsContent() {
  const screens = useBreakpoint();

  return (
    <Flex
      vertical
      align="center"
      style={{
        background: "#030712",
        paddingBlock: screens.md ? "100px" : "60px",
        paddingInline: "5%",
        minHeight: "600px",
      }}
    >
      {/* Title */}
      <Title
        level={2}
        style={{
          color: "white",
          fontSize: screens.md ? "48px" : "32px",
          marginBottom: screens.md ? "80px" : "40px",
          textAlign: "center",
        }}
      >
        Tres pasos simples
      </Title>

      {/* Steps Row */}
      <Flex
        wrap="wrap"
        justify="center"
        gap={screens.md ? 60 : 40}
        style={{
          marginBottom: screens.md ? "120px" : "60px",
          width: "100%",
          maxWidth: "1200px",
          flexDirection: screens.md ? "row" : "column",
          alignItems: "center",
        }}
      >
        {/* Step 1 */}
        <Flex
          vertical
          align="center"
          style={{
            maxWidth: "350px",
            textAlign: "center",
            flex: "1 1 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", // Blue to Purple
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "32px",
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            1
          </div>
          <Title level={3} style={{ color: "white", marginBottom: "16px" }}>
            Sube tu archivo
          </Title>
          <Text style={{ color: "#9ca3af", fontSize: "16px" }}>
            Carga tu archivo Excel de forma segura en nuestra plataforma
          </Text>
        </Flex>

        {/* Step 2 */}
        <Flex
          vertical
          align="center"
          style={{
            maxWidth: "350px",
            textAlign: "center",
            flex: "1 1 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #60a5fa, #3b82f6)", // Light Blue to Blue
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "32px",
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            2
          </div>
          <Title level={3} style={{ color: "white", marginBottom: "16px" }}>
            Describe qué necesitas
          </Title>
          <Text style={{ color: "#9ca3af", fontSize: "16px" }}>
            Usa un prompt natural u opciones predeterminadas como Filtrar y
            extraer (filas, columnas o ambas) y Buscar por nombre
          </Text>
        </Flex>

        {/* Step 3 */}
        <Flex
          vertical
          align="center"
          style={{
            maxWidth: "350px",
            textAlign: "center",
            flex: "1 1 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #818cf8, #6366f1)", // Indigo
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "32px",
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            3
          </div>
          <Title level={3} style={{ color: "white", marginBottom: "16px" }}>
            Descarga resultados
          </Title>
          <Text style={{ color: "#9ca3af", fontSize: "16px" }}>
            Obtén los datos procesados en tu formato preferido
          </Text>
        </Flex>
      </Flex>

      {/* Bottom Features Row */}
      <Flex
        wrap="wrap"
        justify="center"
        gap={screens.md ? 40 : 20}
        style={{ width: "100%", maxWidth: "1200px" }}
      >
        {/* Feature 1 */}
        <Flex
          vertical
          align="center"
          style={{
            maxWidth: "300px",
            textAlign: "center",
            flex: "1 1 auto",
            width: "100%",
            minWidth: "250px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <ShieldCheck size={40} color="#a78bfa" />
          </div>
          <Title level={5} style={{ color: "white", marginBottom: "8px" }}>
            Seguridad de Nivel Enterprise
          </Title>
          <Text style={{ color: "#9ca3af", fontSize: "14px" }}>
            Encriptación end-to-end para todos tus archivos
          </Text>
        </Flex>

        {/* Feature 2 */}
        <Flex
          vertical
          align="center"
          style={{
            maxWidth: "300px",
            textAlign: "center",
            flex: "1 1 auto",
            width: "100%",
            minWidth: "250px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <Users size={40} color="#a78bfa" />
          </div>
          <Title level={5} style={{ color: "white", marginBottom: "8px" }}>
            Acceso Colaborativo
          </Title>
          <Text style={{ color: "#9ca3af", fontSize: "14px" }}>
            Comparte proyectos con tu equipo fácilmente
          </Text>
        </Flex>

        {/* Feature 3 */}
        <Flex
          vertical
          align="center"
          style={{
            maxWidth: "300px",
            textAlign: "center",
            flex: "1 1 auto",
            width: "100%",
            minWidth: "250px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <Zap size={40} color="#a78bfa" />
          </div>
          <Title level={5} style={{ color: "white", marginBottom: "8px" }}>
            API Disponible
          </Title>
          <Text style={{ color: "#9ca3af", fontSize: "14px" }}>
            Integra con tus herramientas existentes
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
