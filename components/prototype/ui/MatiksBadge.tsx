type MatiksBadgeTone = "easy" | "hard" | "record";

type MatiksBadgeProps = {
  tone: MatiksBadgeTone;
  children: string;
  className?: string;
};

export default function MatiksBadge({
  tone,
  children,
  className = "",
}: MatiksBadgeProps) {
  return (
    <span className={`mk-badge mk-badge--${tone}${className ? ` ${className}` : ""}`}>
      {children}
    </span>
  );
}
