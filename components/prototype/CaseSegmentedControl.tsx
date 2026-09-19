"use client";

type Option<T extends string> = {
  value: T;
  label: string;
};

type CaseSegmentedControlProps<T extends string> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  "aria-label"?: string;
};

export default function CaseSegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled = false,
  "aria-label": ariaLabel,
}: CaseSegmentedControlProps<T>) {
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
    </div>
  );
}
