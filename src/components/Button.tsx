import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", style, ...props }: ButtonProps) {
  return (
    <button
      style={{
        padding: "8px 16px",
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
        background: variant === "primary" ? "#ff0000" : "#e5e7eb",
        color: variant === "primary" ? "#fff" : "#111",
        ...style,
      }}
      {...props}
    />
  );
}