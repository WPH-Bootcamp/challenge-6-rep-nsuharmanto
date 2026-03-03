import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  icon,
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseStyle =
    "flex items-center justify-center font-semibold text-md rounded-full transition focus:outline-none";
  const primaryStyle =
    "bg-[#A32012] hover:bg-[#8a1a0f] text-white";
  const secondaryStyle =
    "bg-[#18181c] hover:bg-[#23232b] text-white border border-[#23232b] shadow-lg opacity-60 ";
  const sizeStyle = "w-57.5 h-13 px-6";

  const variantStyle =
    variant === "primary" ? primaryStyle : secondaryStyle;

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
      {icon && (
        <span className="ml-3 flex items-center justify-center w-7 h-7">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;