import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import "./GradientButton.css";

interface GradientButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPlacement?: "start" | "end";
  onClick?: () => void;
}

export default function GradientButton({
  children,
  icon = <ArrowRight size={18} />,
  iconPlacement = "end",
  onClick,
}: GradientButtonProps) {
  return (
    <Button
      shape="round"
      type="primary"
      size="large"
      variant="solid"
      className="gradient-button-hover"
      icon={icon}
      iconPlacement={iconPlacement}
      onClick={onClick}
      style={{
        boxShadow: "none",
        fontWeight: "bold",
        paddingBlock: "25px",
        paddingInline: "30px",
        background: "linear-gradient(to right, #a855f7, #06b6d4)",
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      {children}
    </Button>
  );
}

