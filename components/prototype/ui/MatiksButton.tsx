import type { ButtonHTMLAttributes, ReactNode } from "react";

type MatiksButtonVariant = "primary" | "secondary" | "disabled";
type MatiksButtonSize = "lg" | "md";

type MatiksButtonProps = {
  children: ReactNode;
  variant?: MatiksButtonVariant;
  size?: MatiksButtonSize;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function MatiksButton({
  children,
  variant = "primary",
  size = "lg",
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  className = "",
  disabled,
  type = "button",
  ...rest
}: MatiksButtonProps) {
  const isDisabled = disabled || variant === "disabled";
  const tone = isDisabled ? "disabled" : variant;

  return (
    <button
      type={type}
      className={`mk-btn mk-btn--${tone} mk-btn--${size}${fullWidth ? " mk-btn--full" : ""}${className ? ` ${className}` : ""}`}
      disabled={isDisabled}
      {...rest}
    >
      <span className="mk-btn__face">
        {leadingIcon ? <span className="mk-btn__icon">{leadingIcon}</span> : null}
        <span className="mk-btn__label">{children}</span>
        {trailingIcon ? <span className="mk-btn__icon">{trailingIcon}</span> : null}
      </span>
    </button>
  );
}
