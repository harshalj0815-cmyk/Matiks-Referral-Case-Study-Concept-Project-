import MatiksChip from "@/components/prototype/ui/MatiksChip";

type MatiksToastProps =
  | {
      variant: "friend";
      title?: string;
      body?: string;
      className?: string;
    }
  | {
      variant: "wifi";
      title?: string;
      body?: string;
      onRetry?: () => void;
      className?: string;
    };

export default function MatiksToast(props: MatiksToastProps) {
  const className = props.className ?? "";

  if (props.variant === "friend") {
    return (
      <div
        className={`mk-toast mk-toast--friend${className ? ` ${className}` : ""}`}
        role="status"
      >
        <div className="mk-toast__row">
          <img
            className="mk-toast__mascot"
            src="/prototype/matiks/elements/friend-arrived-icon.png"
            alt=""
            aria-hidden
          />
          <div className="mk-toast__copy">
            <p className="mk-toast__title">
              {props.title ?? "Your Friend Just Arrived!"}
            </p>
            <p className="mk-toast__body">
              {props.body ?? "Reward unlocks once they reach 150 XP."}
            </p>
          </div>
          <img
            className="mk-toast__chevron"
            src="/prototype/matiks/icons/caret-right.svg"
            alt=""
            aria-hidden
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mk-toast mk-toast--wifi${className ? ` ${className}` : ""}`}
      role="alert"
    >
      <div className="mk-toast__row">
        <span className="mk-toast__wifi-icon" aria-hidden>
          <img src="/prototype/matiks/icons/wifi-off.svg" alt="" />
        </span>
        <div className="mk-toast__copy">
          <p className="mk-toast__title">
            {props.title ?? "Weak Internet Detected"}
          </p>
          <p className="mk-toast__body">
            {props.body ?? "Check your Wi-Fi and try again."}
          </p>
        </div>
        <MatiksChip onClick={props.onRetry}>Retry</MatiksChip>
      </div>
    </div>
  );
}
