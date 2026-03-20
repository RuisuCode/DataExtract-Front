import { Flex, Layout, Typography, Grid } from "antd";
import HeaderComponent from "../shared/components/header/header";
import FirstContent from "../shared/components/content/FirstContent";
import SecondContent from "../shared/components/content/SecondContent";
import StepsContent from "../shared/components/content/StepsContent";
import CTAContent from "../shared/components/content/CTAContent";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Filter,
  Sparkles,
  ArrowLeft,
  Database,
  Info,
  Play,
  X,
  Search,
  FileText,
  Settings,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router";
import {
  extractFilter,
  type ExtractFilterRequestFilters,
  type ExtractFilterResponse,
} from "../shared/api/extract";
import { sileo } from "sileo";
import { Modal, Input, InputNumber, Divider, Button, Form } from "antd";
import { useAuthStore } from "../shared/store/useAuthStore";
import LoginModal from "../shared/components/LoginModal";

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
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const { isAuthenticated, openLoginModal, isLoginModalOpen } = useAuthStore();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ExtractFilterResponse | null>(null);
  const [filters, setFilters] = useState<ExtractFilterRequestFilters>({});
  const [searchMethod, setSearchMethod] = useState<"general" | "specific">(
    "general",
  );

  // Keep track of a mode that was requested while unauthenticated.
  const [pendingMode, setPendingMode] = useState<
    "filter" | "search" | "ai" | null
  >(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<
    "filter" | "search" | "ai" | null
  >(null);

  const handleCheckChange = (checked: boolean, file: File | null) => {
    setIsChecked(checked);
    setUploadedFile(file);
  };

  const handleBack = () => {
    setIsChecked(false);
    setUploadedFile(null);
  };

  const handleGoToResults = (mode: "filter" | "search" | "ai") => {
    if (!isAuthenticated) {
      // store the intended action so we can continue after login
      setPendingMode(mode);
      openLoginModal();
      return;
    }

    if (!uploadedFile) {
      sileo.warning({
        title: "Archivo requerido",
        description: "Primero selecciona y confirma un archivo para extraer.",
      });
      return;
    }
    setCurrentMode(mode);
    // reset and prepare form values from current filters
    form.resetFields();
    form.setFieldsValue(filters as any);
    setIsModalOpen(true);
  };

  const executeExtraction = async (values: ExtractFilterRequestFilters) => {
    if (!uploadedFile || !currentMode) return;

    // merge form values into filters state
    const usedFilters = values ? { ...filters, ...values } : filters;
    setFilters(usedFilters);

    // show spinner immediately and keep modal open while request is in-flight
    setLoading(true);

    try {
      const res = await extractFilter({ uploadedFile, filters: usedFilters });

      if (res.success) {
        sileo.success({
          title: "Extracción completada",
          description: "Los datos se han procesado correctamente.",
          position: "bottom-right",
        });

        navigate("/results", {
          state: {
            file: uploadedFile,
            mode: currentMode,
            data: res,
            filters: usedFilters,
          },
        });
      } else {
        sileo.error({
          title: "Error de extracción",
          description: "El servidor no pudo procesar el archivo correctamente.",
        });
      }
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Ocurrió un error al extraer los datos";
      sileo.error({
        title: "Error",
        description: errorMsg,
      });
    } finally {
      setLoading(false);
      // close modal once loading is finished
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    setUploadedFile(null);
    setIsChecked(false);
  }, []);

  // whenever authentication status changes, if there was a pending mode
  // requested before logging in, open that modal now that we're verified.
  useEffect(() => {
    if (isAuthenticated && pendingMode) {
      const mode = pendingMode;
      setPendingMode(null);
      // bypass handler to avoid re-checking auth
      if (!uploadedFile) {
        // should not happen, but guard anyway
        sileo.warning({
          title: "Archivo requerido",
          description: "Primero selecciona y confirma un archivo para extraer.",
        });
        return;
      }
      setCurrentMode(mode);
      setIsModalOpen(true);
    }
  }, [isAuthenticated, pendingMode, uploadedFile]);

  // if the login dialog closes without a successful login, drop the pending request
  useEffect(() => {
    if (!isLoginModalOpen && pendingMode && !isAuthenticated) {
      setPendingMode(null);
    }
  }, [isLoginModalOpen, isAuthenticated, pendingMode]);

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
        {!shouldChangeBackground && <HeaderComponent />}
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
                      onClick={() => handleGoToResults("filter")}
                    />
                    <OptionCard
                      icon={<Search color="white" size={24} />}
                      title="Buscar por nombre"
                      desc="Filtra datos buscando términos específicos"
                      onClick={() => handleGoToResults("search")}
                    />
                    <OptionCard
                      icon={
                        <Sparkles color="#fbbf24" size={24} />
                      } /* Yellow/Gold */
                      title="IA Prompt"
                      desc="Describe qué necesitas en lenguaje natural"
                      isSpecial={true}
                      onClick={() => handleGoToResults("ai")}
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

      <Modal
        title={
          <Flex align="center" gap="small" style={{ width: "100%" }}>
            <Database size={20} color="#8b8cff" />
            <span style={{ color: "white", fontSize: "18px", fontWeight: 600 }}>
              Configuración de Extracción
            </span>
          </Flex>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        closeIcon={<X color="#9ca3af" size={20} />}
        centered
        width={580}
        styles={{
          mask: { backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.4)" },
          container: {
            background: "#0d0d1a",
            border: "1px solid rgba(139, 140, 255, 0.2)",
            borderRadius: "16px",
            padding: "24px",
          },
          header: {
            background: "transparent",
            borderBottom: "1px solid rgba(139, 140, 255, 0.15)",
            paddingBottom: "16px",
            marginBottom: "20px",
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values)=>executeExtraction(values)}
        >
          <Flex vertical gap="large" style={{ color: "#9ca3af" }}>
            <div>
              <Typography.Text
                style={{ color: "#8b8cff", fontSize: "14px", fontWeight: 500 }}
              >
                Documento: {uploadedFile?.name}
              </Typography.Text>
            </div>

            <Flex align="center" gap="small">
              <span
                style={{ display: "flex", alignItems: "center", opacity: 0.8 }}
              >
                {currentMode === "filter" ? (
                  <Layers size={18} color="#8b8cff" />
                ) : currentMode === "search" ? (
                  <Search size={18} color="#8b8cff" />
                ) : (
                  <Settings size={18} color="#8b8cff" />
                )}
              </span>
              <span
                style={{ color: "white", fontSize: "15px", fontWeight: 600 }}
              >
                {currentMode === "filter"
                  ? "Opciones de Filtrado Avanzado"
                  : currentMode === "search"
                    ? "Opciones de Búsqueda por Nombre"
                    : "Opciones de IA Prompt"}
              </span>
            </Flex>

            {currentMode === "filter" && (
              <Flex vertical gap="middle">
                <Form.Item
                  name="columns"
                  label="Columnas a extraer"
                  rules={[
                    { required: true, message: "Escribe al menos una columna" },
                  ]}
                >
                  <Input
                    placeholder="Ej: Nombre, Email, Precio (separados por coma)"
                    prefix={<FileText size={16} color="#4b5563" />}
                    style={{
                      background: "#16162a",
                      border: "1px solid #2a2a4a",
                      color: "white",
                      height: "45px",
                    }}
                  />
                </Form.Item>
                <Flex gap="middle">
                  <Form.Item
                    name="rowStart"
                    style={{ flex: 1 }}
                    label="Fila Inicio"
                    rules={[
                      { type: "number", min: 1, message: "Debe ser >= 1" },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      placeholder="1"
                      style={{
                        width: "100%",
                        background: "#16162a",
                        border: "1px solid #2a2a4a",
                        color: "white",
                        height: "45px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="rowEnd"
                    style={{ flex: 1 }}
                    label="Fila Fin"
                    rules={[
                      { type: "number", min: 1, message: "Debe ser >= 1" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const start = getFieldValue("rowStart");
                          if (!value || !start || value >= start) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Fin debe ser mayor o igual a inicio"),
                          );
                        },
                      }),
                    ]}
                  >
                    <InputNumber
                      min={1}
                      placeholder="100"
                      style={{
                        width: "100%",
                        background: "#16162a",
                        border: "1px solid #2a2a4a",
                        color: "white",
                        height: "45px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                  </Form.Item>
                </Flex>
              </Flex>
            )}

            {currentMode === "search" && (
              <Flex vertical gap="middle">
                <Form.Item
                  name="searchValue"
                  label="Valor a buscar"
                  rules={[{ required: true, message: "Ingresa un término" }]}
                >
                  <Input
                    placeholder="Ingrese el término de búsqueda"
                    prefix={<Search size={16} color="#4b5563" />}
                    style={{
                      background: "#16162a",
                      border: "1px solid #2a2a4a",
                      color: "white",
                      height: "45px",
                    }}
                  />
                </Form.Item>

                <div>
                  <Typography.Text
                    style={{
                      color: "white",
                      display: "block",
                      marginBottom: 12,
                      fontSize: "13px",
                    }}
                  >
                    Método de búsqueda
                  </Typography.Text>
                  <Flex vertical gap="small">
                    <div
                      onClick={() => setSearchMethod("general")}
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        border:
                          searchMethod === "general"
                            ? "1px solid #8b8cff"
                            : "1px solid #2a2a4a",
                        background:
                          searchMethod === "general"
                            ? "rgba(139, 140, 255, 0.05)"
                            : "#16162a",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        transition: "all 0.2s",
                      }}
                    >
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: "2px solid #8b8cff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {searchMethod === "general" && (
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: "#8b8cff",
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <div
                          style={{
                            color: "white",
                            fontWeight: 500,
                            fontSize: "13px",
                          }}
                        >
                          Búsqueda General
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "12px" }}>
                          Busca en todas las columnas del archivo
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSearchMethod("specific")}
                      style={{
                        padding: "16px",
                        borderRadius: "12px",
                        border:
                          searchMethod === "specific"
                            ? "1px solid #8b8cff"
                            : "1px solid #2a2a4a",
                        background:
                          searchMethod === "specific"
                            ? "rgba(139, 140, 255, 0.05)"
                            : "#16162a",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        transition: "all 0.2s",
                      }}
                    >
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: "2px solid #8b8cff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {searchMethod === "specific" && (
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: "#8b8cff",
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <div
                          style={{
                            color: "white",
                            fontWeight: 500,
                            fontSize: "13px",
                          }}
                        >
                          Búsqueda por Columna Específica
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "12px" }}>
                          Optimiza la extracción filtrando por una columna
                        </div>
                      </div>
                    </div>
                  </Flex>
                </div>

                {searchMethod === "specific" && (
                  <Form.Item
                    name="searchColumn"
                    label="Seleccionar Columna"
                    rules={[{ required: true, message: "Columna requerida" }]}
                  >
                    <Input
                      placeholder="Ej: Rango: 'A-Z' o simplemente la letra o nombre de la columna"
                      style={{
                        background: "#16162a",
                        border: "1px solid #2a2a4a",
                        color: "white",
                        height: "45px",
                      }}
                    />
                  </Form.Item>
                )}

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "rgba(139, 140, 255, 0.03)",
                    border: "1px solid rgba(139, 140, 255, 0.1)",
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <Info
                    size={18}
                    color="#8b8cff"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <Typography.Text
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      lineHeight: "1.5",
                    }}
                  >
                    La extracción procesará las filas que coincidan exactamente
                    con el valor proporcionado. Asegúrese de que el formato de
                    la columna en Excel sea 'Texto'.
                  </Typography.Text>
                </div>
              </Flex>
            )}

            {currentMode === "ai" && (
              <Flex vertical gap="middle">
                <div>
                  <Typography.Text
                    style={{
                      color: "white",
                      display: "block",
                      marginBottom: 8,
                      fontSize: "13px",
                    }}
                  >
                    Describe lo que necesitas
                  </Typography.Text>
                  <Input.TextArea
                    rows={4}
                    placeholder="Ej: Extrae todos los clientes que compraron más de 500 USD en enero"
                    style={{
                      background: "#16162a",
                      border: "1px solid #2a2a4a",
                      color: "white",
                    }}
                    onChange={(e) =>
                      setFilters({ ...filters, searchValue: e.target.value })
                    }
                  />
                </div>
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "rgba(139, 140, 255, 0.03)",
                    border: "1px solid rgba(139, 140, 255, 0.1)",
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <Info
                    size={18}
                    color="#8b8cff"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <Typography.Text
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      lineHeight: "1.5",
                    }}
                  >
                    Nuestra IA analizará la estructura de tu archivo y extraerá
                    los datos que mejor se ajusten a tu descripción en lenguaje
                    natural.
                  </Typography.Text>
                </div>
              </Flex>
            )}

            <Divider
              style={{
                borderColor: "rgba(139, 140, 255, 0.1)",
                margin: "10px 0",
              }}
            />

            <Flex justify="flex-end" gap="middle" align="center">
              <Button
                type="text"
                onClick={() => setIsModalOpen(false)}
                style={{ color: "white", fontWeight: 500 }}
              >
                Cancelar
              </Button>
              <Button
                htmlType="submit"
                loading={loading}
                // onClick={executeExtraction}
                style={{
                  background: "linear-gradient(90deg, #8b8cff, #6366f1)",
                  border: "none",
                  color: "white",
                  borderRadius: "8px",
                  height: "44px",
                  paddingInline: "28px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 15px rgba(139, 140, 255, 0.3)",
                }}
              >
                <Play size={14} fill="white" />
                Iniciar Extracción
              </Button>
            </Flex>
          </Flex>
        </Form>
      </Modal>
      <LoginModal />
    </Flex>
  );
}
