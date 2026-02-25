import { Typography, Button, Flex, Space, Upload, Checkbox, Grid } from "antd";
import { Upload as UploadIcon, CheckCircle } from "lucide-react";
import GradientButton from "../GradientButton";
import { useState } from "react";

const { useBreakpoint } = Grid;

interface FirstContentProps {
  onFileUploaded?: (file: File) => void;
  onCheckChange?: (checked: boolean, file: File | null) => void;
}

export default function FirstContent({
  onFileUploaded,
  onCheckChange,
}: FirstContentProps) {
  const screens = useBreakpoint();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [checked, setChecked] = useState(false);

  const handleUploadChange = (info: any) => {
    if (info.fileList.length > 0 && info.file.status !== "removed") {
      const file = info.file.originFileObj || info.file;
      setUploadedFile(file);
      setFileUploaded(true);
      setChecked(true);
      if (onFileUploaded) {
        onFileUploaded(file);
      }
      if (onCheckChange) {
        onCheckChange(true, file);
      }
    } else {
      setUploadedFile(null);
      setFileUploaded(false);
      setChecked(false);
      if (onCheckChange) {
        onCheckChange(false, null);
      }
    }
  };

  const handleCheckChange = (e: any) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    if (onCheckChange) {
      onCheckChange(newChecked, uploadedFile);
    }
  };

  const customRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess?.("ok");
    }, 0);
  };

  return (
    <Flex
      style={{
        paddingTop: screens.md ? "10%" : "60px",
        minHeight: "100vh",
        paddingBottom: "50px",
      }}
      justify="space-evenly"
      vertical={!screens.lg}
      align={!screens.lg ? "center" : "flex-start"}
      gap={!screens.lg ? "60px" : "0"}
    >
      <Flex
        align="center"
        vertical={!screens.lg}
        style={{
          height: screens.lg ? "500px" : "auto",
          width: screens.lg ? "50%" : "100%",
          paddingInline: screens.md ? "5%" : "20px",
          textAlign: screens.lg ? "left" : "center",
        }}
      >
        <Flex
          vertical
          align={!screens.lg ? "center" : "flex-start"}
          style={{ width: "100%" }}
        >
          <Typography.Title
            style={{
              fontSize: screens.xl ? "75px" : screens.md ? "56px" : "36px",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Extrae datos de Excel
            {!screens.lg && <br />}
            <span
              style={{
                background: "linear-gradient(to right, #a855f7, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginInline: "10px",
              }}
            >
              con IA
            </span>
          </Typography.Title>
          <Typography.Paragraph
            style={{
              fontSize: screens.md ? 18 : 16,
              color: "#666",
              maxWidth: "600px",
              marginTop: "20px",
            }}
          >
            Sube tu archivo Excel y deja que nuestra IA entienda{" "}
            {screens.md && <br />} exactamente qué datos necesitas. Sin
            configuraciones complejas.
          </Typography.Paragraph>
          <Flex
            gap={screens.md ? "large" : "middle"}
            wrap="wrap"
            justify={!screens.lg ? "center" : "flex-start"}
          >
            <GradientButton>Empezar Gratis</GradientButton>
            <Button
              shape="round"
              type="default"
              variant="solid"
              style={{
                paddingBlock: "25px",
                paddingInline: "35px",
                fontSize: "16px",
                border: "none",
              }}
            >
              Ver demo
            </Button>
          </Flex>
          <Space
            size={screens.md ? 100 : 40}
            style={{
              marginTop: "35px",
              justifyContent: !screens.lg ? "center" : "flex-start",
              width: "100%",
            }}
            wrap
          >
            <Flex vertical align={!screens.lg ? "center" : "flex-start"}>
              <Typography.Title
                level={2}
                style={{
                  color: "#9254de",
                  margin: 0,
                  fontSize: screens.md ? "30px" : "24px",
                }}
              >
                10K+
              </Typography.Title>
              <Typography.Paragraph style={{ color: "gray", fontSize: "14px" }}>
                Usuarios activos
              </Typography.Paragraph>
            </Flex>
            <Flex vertical align={!screens.lg ? "center" : "flex-start"}>
              <Typography.Title
                level={2}
                style={{
                  color: "#9254de",
                  margin: 0,
                  fontSize: screens.md ? "30px" : "24px",
                }}
              >
                50M+
              </Typography.Title>
              <Typography.Paragraph style={{ color: "gray", fontSize: "14px" }}>
                Filas procesadas
              </Typography.Paragraph>
            </Flex>
            <Flex vertical align={!screens.lg ? "center" : "flex-start"}>
              <Typography.Title
                level={2}
                style={{
                  color: "#9254de",
                  margin: 0,
                  fontSize: screens.md ? "30px" : "24px",
                }}
              >
                99%
              </Typography.Title>
              <Typography.Paragraph style={{ color: "gray", fontSize: "14px" }}>
                Precisión
              </Typography.Paragraph>
            </Flex>
          </Space>
        </Flex>
      </Flex>
      <Flex
        vertical
        style={{
          height: screens.lg ? "500px" : "auto",
          width: screens.lg ? "50%" : "100%",
          paddingInline: screens.xl ? "20px" : screens.lg ? "40px" : "20px",
          paddingBlock: screens.lg ? "50px" : "20px",
          maxWidth: "600px",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top right, rgba(168, 85, 247, 0.4), rgba(6, 182, 212, 0.4))",
              borderRadius: "24px",
              filter: "blur(80px)",
              zIndex: 0,
            }}
          />
          <Upload.Dragger
            height={screens.md ? 400 : 300}
            maxCount={1}
            accept={".xlsx, .xls"}
            customRequest={customRequest}
            onChange={handleUploadChange}
            style={{
              position: "relative",
              zIndex: 1,
              background: fileUploaded
                ? "linear-gradient(to top right, rgba(34, 197, 94, 0.3), rgba(6, 182, 212, 0.3))"
                : "linear-gradient(to top right, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2))",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              backdropFilter: "blur(10px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: fileUploaded
                ? "2px dashed #22c55e"
                : "2px dashed rgba(168, 85, 247, 0.5)",
            }}
          >
            <p className="ant-upload-drag-icon">
              {fileUploaded ? (
                <CheckCircle size={screens.md ? 64 : 48} color="#22c55e" />
              ) : (
                <UploadIcon
                  size={screens.md ? 64 : 48}
                  color="rgba(139, 140, 255, 0.5)"
                />
              )}
            </p>
            <p
              className="ant-upload-text"
              style={{
                fontSize: screens.md ? "18px" : "16px",
                color: "#ffffff",
                paddingInline: "10px",
              }}
            >
              {fileUploaded
                ? uploadedFile?.name
                : "Arrastra y suelta archivos Excel aquí"}
            </p>
            <p
              className="ant-upload-hint"
              style={{
                fontSize: screens.md ? "14px" : "12px",
                color: "#999999c0",
              }}
            >
              {fileUploaded
                ? "Archivo cargado correctamente"
                : "o haz clic para seleccionar archivos"}
            </p>
            {fileUploaded && (
              <div style={{ marginTop: "16px" }}>
                <Checkbox checked={checked} onChange={handleCheckChange}>
                  Archivo verificado
                </Checkbox>
              </div>
            )}
          </Upload.Dragger>
        </div>
      </Flex>
    </Flex>
  );
}
