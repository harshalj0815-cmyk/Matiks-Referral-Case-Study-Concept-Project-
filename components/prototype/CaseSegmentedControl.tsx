"use client";

type Option<T extends string> = {
  value: T;
  label: string;
};

type CaseSegmentedControlProps<T extends string> = {
  label: string;
  value: T | null;
  options: Option<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  /** Shown on hover / focus when the control is disabled */
  disabledHint?: string;
  note?: string;
  "aria-label"?: string;
};

export default function CaseSegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled = false,
  disabledHint,
  note,
  "aria-label": ariaLabel,
}: CaseSegmentedControlProps<T>) {
  const hint = disabled && disabledHint ? disabledHint : undefined;

  return (
    <div
      className={`case-seg${disabled ? " case-seg--disabled" : ""}`}
      aria-disabled={disabled || undefined}
    >
      <p className="case-seg__label">{label}</p>
      <div
        className="case-seg__track"
        role="radiogroup"
        aria-label={ariaLabel ?? label}
        aria-describedby={hint ? `${label.replace(/\s+/g, "-").toLowerCase()}-disabled-hint` : undefined}
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              className={`case-seg__option${selected ? " case-seg__option--active" : ""}`}
              onClick={() => {
                if (!disabled && option.value !== value) onChange(option.value);
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {hint ? (
        <span
          id={`${label.replace(/\s+/g, "-").toLowerCase()}-disabled-hint`}
          className="case-seg__disabled-hint"
          role="tooltip"
        >
          {hint}
        </span>
      ) : null}
      {note ? <p className="case-seg__note">{note}</p> : null}
    </div>
  );
}
