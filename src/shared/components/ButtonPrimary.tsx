import { Button } from "antd";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPlacement?: "start" | "end";
  onClick?: () => void;
  styles?: React.CSSProperties;
}

export default function ButtonPrimary({
  children,
  icon,
  iconPlacement = "end",
  onClick,
  styles,
}: ButtonPrimaryProps) {
  return (
    <Button
      icon={icon}
      iconPlacement={iconPlacement}
      onClick={onClick}
      style={{
        boxShadow: "none",
        fontWeight: "bold",
        paddingBlock: "25px",
        paddingInline: "30px",
        backgroundColor: "rgba(139, 140, 255, 0.1)",
        borderColor: "rgba(255,255,255,0.1)",
        transition: "box-shadow 0.3s ease-in-out",
        ...styles,
      }}
    >
      {children}
    </Button>
  );
}
