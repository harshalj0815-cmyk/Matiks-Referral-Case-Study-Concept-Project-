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
  /** Paper 1XZ-0 dual-bar glint, sweeps L→R every 5s */
  shine?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function MatiksButton({
  children,
  variant = "primary",
  size = "lg",
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  shine = false,
  className = "",
  disabled,
  type = "button",
  ...rest
}: MatiksButtonProps) {
  const isDisabled = disabled || variant === "disabled";
  // Keep visual tone when disabled via prop (e.g. Claimed stays secondary type)
  const tone = variant === "disabled" ? "disabled" : variant;

  return (
    <button
      type={type}
      className={`mk-btn mk-btn--${tone} mk-btn--${size}${fullWidth ? " mk-btn--full" : ""}${shine ? " mk-btn--shine" : ""}${className ? ` ${className}` : ""}`}
      disabled={isDisabled}
      {...rest}
    >
      <span className="mk-btn__face">
        {shine ? (
          <span className="mk-btn__shine" aria-hidden>
            <span className="mk-btn__shine-group">
              <span className="mk-btn__shine-bar mk-btn__shine-bar--thick" />
              <span className="mk-btn__shine-bar mk-btn__shine-bar--thin" />
            </span>
          </span>
        ) : null}
        {leadingIcon ? <span className="mk-btn__icon">{leadingIcon}</span> : null}
        <span className="mk-btn__label">{children}</span>
        {trailingIcon ? <span className="mk-btn__icon">{trailingIcon}</span> : null}
      </span>
    </button>
  );
}
