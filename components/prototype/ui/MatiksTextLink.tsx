import type { ButtonHTMLAttributes, ReactNode } from "react";

type MatiksTextLinkProps = {
  children: ReactNode;
  trailingIcon?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function MatiksTextLink({
  children,
  trailingIcon,
  className = "",
  type = "button",
  ...rest
}: MatiksTextLinkProps) {
  return (
    <button
      type={type}
      className={`mk-text-link${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className="mk-text-link__label">{children}</span>
      {trailingIcon ? (
        <span className="mk-text-link__icon">{trailingIcon}</span>
      ) : null}
    </button>
  );
}
