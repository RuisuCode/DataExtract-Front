import { Modal, Form, Input, Button, Typography, Flex } from "antd";
import { Lock, User, LogIn, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { httpClient } from "../api/httpClient";
import { sileo } from "sileo";
import { useState } from "react";

const { Title, Text } = Typography;

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, setAuthenticated, setUserInfo } =
    useAuthStore();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Send login request to the backend (/login)
      const res = await httpClient.post("/login", values);

      if (res.data.success || res.status === 200) {
        sileo.success({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        });
        // store user info if API returns it
        if (res.data.user) {
          setUserInfo(res.data.user);
        }
        setAuthenticated(true);
        closeLoginModal();
      }
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Credenciales incorrectas";
      sileo.error({
        title: "Error de acceso",
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isLoginModalOpen}
      onCancel={() => !loading && closeLoginModal()}
      footer={null}
      closeIcon={<X color="#9ca3af" size={20} />}
      centered
      width={400}
      styles={{
        mask: { backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.4)" },
        container: {
          background: "#0d0d1a",
          border: "1px solid rgba(139, 140, 255, 0.2)",
          borderRadius: "20px",
          padding: "32px",
        },
      }}
    >
      <Flex
        vertical
        align="center"
        gap="small"
        style={{ marginBottom: "32px" }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "12px",
            background: "rgba(139, 140, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "12px",
          }}
        >
          <Lock size={24} color="#8b8cff" />
        </div>
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Iniciar Sesión
        </Title>
        <Text style={{ color: "#9ca3af", fontSize: "14px" }}>
          Por favor, identifícate para continuar.
        </Text>
      </Flex>

      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Ingresa tu correo o usuario" },
            { type: "email", message: "Ingresa un email válido" },
          ]}
        >
          <Input
            prefix={<User size={16} color="#4b5563" />}
            placeholder="Correo electrónico"
            style={{
              background: "#16162a",
              border: "1px solid #2a2a4a",
              color: "white",
              height: "48px",
              borderRadius: "10px",
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Ingresa tu contraseña" }]}
        >
          <Input.Password
            prefix={<Lock size={16} color="#4b5563" />}
            placeholder="Contraseña"
            style={{
              background: "#16162a",
              border: "1px solid #2a2a4a",
              color: "white",
              height: "48px",
              borderRadius: "10px",
            }}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          style={{
            height: "48px",
            borderRadius: "10px",
            background: "linear-gradient(90deg, #8b8cff, #6366f1)",
            border: "none",
            fontWeight: 600,
            marginTop: "12px",
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <LogIn size={18} />
          Entrar ahora
        </Button>
      </Form>
    </Modal>
  );
}
