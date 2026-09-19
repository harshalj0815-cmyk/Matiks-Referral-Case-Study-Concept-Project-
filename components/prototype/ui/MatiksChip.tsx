import type { ButtonHTMLAttributes, ReactNode } from "react";

type MatiksChipProps = {
  children: ReactNode;
  leadingIcon?: ReactNode;
  iconOnly?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function MatiksChip({
  children,
  leadingIcon,
  iconOnly = false,
  className = "",
  type = "button",
  ...rest
}: MatiksChipProps) {
  return (
    <button
      type={type}
      className={`mk-chip${iconOnly ? " mk-chip--icon" : ""}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className="mk-chip__face">
        {leadingIcon ? <span className="mk-chip__icon">{leadingIcon}</span> : null}
        {!iconOnly ? <span className="mk-chip__label">{children}</span> : null}
        {iconOnly ? <span className="sr-only">{children}</span> : null}
      </span>
    </button>
  );
}
