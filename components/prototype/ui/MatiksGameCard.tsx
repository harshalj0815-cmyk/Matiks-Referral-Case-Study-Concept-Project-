import MatiksBadge from "@/components/prototype/ui/MatiksBadge";
import type { HTMLAttributes } from "react";

type MatiksGameCardProps = {
  title?: string;
  difficulty: "easy" | "hard";
  imageSrc?: string;
  /** 0–100. When set, always shows the two-segment bar (0 = both gray). */
  progress?: number;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "title">;

export default function MatiksGameCard({
  title = "Ken-Ken",
  difficulty,
  imageSrc = "/prototype/matiks/elements/kenken-placeholder.png",
  progress,
  className = "",
  ...rest
}: MatiksGameCardProps) {
  const badgeLabel = difficulty === "easy" ? "Easy" : "Hard";
  const showProgress = typeof progress === "number";
  const value = showProgress ? Math.max(0, Math.min(100, progress)) : 0;
  // Paper uses two equal slots: left fills first, then right at 100%.
  const leftFilled = value > 0;
  const rightFilled = value >= 100;

  return (
    <article
      className={`mk-game-card${className ? ` ${className}` : ""}`}
      aria-label={`${title}, ${badgeLabel}`}
      {...rest}
    >
      <div className="mk-game-card__media">
        <img className="mk-game-card__image" src={imageSrc} alt="" />
        <MatiksBadge tone={difficulty} className="mk-game-card__badge">
          {badgeLabel}
        </MatiksBadge>
        {showProgress ? (
          <div
            className="mk-game-card__progress"
            aria-hidden
            data-progress={value}
          >
            <span
              className={`mk-game-card__progress-seg${leftFilled ? " mk-game-card__progress-seg--on" : ""}`}
            />
            <span
              className={`mk-game-card__progress-seg${rightFilled ? " mk-game-card__progress-seg--on" : ""}`}
            />
          </div>
        ) : null}
      </div>
      <div className="mk-game-card__footer">
        <span className="mk-game-card__title">{title}</span>
        <span className="mk-game-card__chevron-wrap" aria-hidden>
          <img
            className="mk-game-card__chevron"
            src="/prototype/matiks/icons/caret-right-lime.svg"
            alt=""
          />
        </span>
      </div>
    </article>
  );
}
