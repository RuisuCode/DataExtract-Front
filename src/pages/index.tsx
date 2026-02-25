import { Flex, Layout, Typography, Grid } from "antd";
import HeaderComponent from "../shared/components/header/header";
import FirstContent from "../shared/components/content/FirstContent";
import SecondContent from "../shared/components/content/SecondContent";
import StepsContent from "../shared/components/content/StepsContent";
import CTAContent from "../shared/components/content/CTAContent";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter, Search, Sparkles, ArrowLeft } from "lucide-react";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const OptionCard = ({ icon, title, desc, iconBg, onClick, isSpecial }: any) => {
  const screens = useBreakpoint();
  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        borderColor: isSpecial
          ? "rgba(245, 158, 11, 0.8)"
          : "rgba(59, 130, 246, 0.5)",
        background: isSpecial
          ? "linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(30, 27, 75, 0.6) 100%)"
          : "rgba(17, 24, 39, 0.8)",
      }}
      whileTap={{ scale: 0.99 }}
      style={{
        background: "rgba(17, 24, 39, 0.6)",
        backdropFilter: "blur(10px)",
        border: isSpecial
          ? "1px solid rgba(245, 158, 11, 0.3)"
          : "1px solid rgba(75, 85, 99, 0.4)",
        borderRadius: "16px",
        padding: screens.md ? "32px" : "24px",
        flex: isSpecial && screens.md ? "1 1 100%" : "1 1 320px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        transition: "all 0.3s ease",
        textAlign: "left",
        minHeight: screens.md ? "180px" : "150px",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onClick={onClick}
    >
      {isSpecial && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "150px",
            height: "150px",
            background:
              "radial-gradient(circle at top right, rgba(245, 158, 11, 0.15), transparent 70%)",
            borderRadius: "0 0 0 100%",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "14px",
          background: iconBg || "rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: isSpecial ? "1px solid rgba(245, 158, 11, 0.2)" : "none",
        }}
      >
        {icon}
      </div>
      <div>
        <Typography.Title
          level={3}
          style={{
            color: "white",
            margin: "0 0 12px 0",
            fontSize: screens.md ? "22px" : "18px",
            fontWeight: "600",
          }}
        >
          {isSpecial ? (
            <span
              style={{
                background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </span>
          ) : (
            title
          )}
        </Typography.Title>
        <Typography.Text
          style={{
            color: "#9ca3af",
            fontSize: screens.md ? "16px" : "14px",
            lineHeight: "1.6",
          }}
        >
          {desc}
        </Typography.Text>
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
  const screens = useBreakpoint();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckChange = (checked: boolean, file: File | null) => {
    setIsChecked(checked);
    setUploadedFile(file);
  };

  const handleBack = () => {
    setIsChecked(false);
    setUploadedFile(null);
  };

  useEffect(() => {
    setUploadedFile(null);
    setIsChecked(false);
  }, []);

  const shouldChangeBackground = uploadedFile !== null && isChecked;

  return (
    <Flex
      gap="middle"
      wrap
      style={{
        width: "100%",
        height: "100%",
        margin: "0",
        background: shouldChangeBackground
          ? "linear-gradient(to bottom, #1a1a2e, #16213e)"
          : "",
      }}
    >
      <Layout>
        <HeaderComponent />
        <Content>
          <AnimatePresence mode="wait">
            {shouldChangeBackground ? (
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Flex
                  vertical
                  style={{
                    width: "100%",
                    maxWidth: "1100px",
                    padding: screens.md ? "60px 20px" : "30px 16px",
                    minHeight: "600px",
                    marginTop: screens.md ? "20px" : "10px",

                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    onClick={handleBack}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#9ca3af",
                      cursor: "pointer",
                      marginBottom: "20px",
                      width: "fit-content",
                      fontSize: "14px",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                    }}
                  >
                    <ArrowLeft size={16} /> <span>Volver</span>
                  </div>

                  <Typography.Title
                    level={1}
                    style={{
                      color: "white",
                      margin: "0 0 10px 0",
                      fontSize: screens.md ? "40px" : "28px",
                      wordBreak: "break-word",
                    }}
                  >
                    Extrae tus datos
                  </Typography.Title>
                  <Typography.Text
                    style={{
                      color: "#9ca3af",
                      fontSize: screens.md ? "18px" : "16px",
                    }}
                  >
                    Elige cómo quieres extraer la información de tu archivo
                  </Typography.Text>

                  <Typography.Title
                    level={3}
                    style={{
                      color: "white",
                      margin: screens.md ? "60px 0 30px 0" : "40px 0 20px 0",
                      fontSize: screens.md ? "24px" : "20px",
                    }}
                  >
                    ¿Cómo deseas procesar tus datos?
                  </Typography.Title>

                  <Flex gap="large" wrap="wrap" style={{ width: "100%" }}>
                    <OptionCard
                      icon={<Filter color="white" size={24} />}
                      iconBg="#0070f3" /* Blue */
                      title="Filtrar y Extraer"
                      desc="Extrae filas, columnas o ambas según tus necesidades"
                    />
                    <OptionCard
                      icon={<Search color="white" size={24} />}
                      title="Buscar por nombre"
                      desc="Filtra datos buscando términos específicos"
                    />
                    <OptionCard
                      icon={
                        <Sparkles color="#fbbf24" size={24} />
                      } /* Yellow/Gold */
                      title="IA Prompt"
                      desc="Describe qué necesitas en lenguaje natural"
                      isSpecial={true}
                    />
                  </Flex>
                </Flex>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%" }}
              >
                <FirstContent onCheckChange={handleCheckChange} />
              </motion.div>
            )}
          </AnimatePresence>
        </Content>
        <Layout>
          <SecondContent />
          <StepsContent />
          <CTAContent />
        </Layout>
      </Layout>
    </Flex>
  );
}
