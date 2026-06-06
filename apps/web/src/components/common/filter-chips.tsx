"use client";

import { cn } from "@/lib/utils";

export type FilterChipOption<T extends string> = {
  value: T;
  label: string;
  count?: number;
};

/**
 * Horizontal, wrapping set of filter chips with a clear single-selection state.
 * Use this for category/segment filtering (Board of Governors, gallery filters,
 * faculty by designation…) instead of repurposing the Tabs primitive, which is
 * meant for a small fixed segmented control rather than many wrapping filters.
 */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
}: {
  options: FilterChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-sm border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              active
                ? "border-primary bg-primary text-white shadow-sm"
                : "border-stone-200 bg-white text-gray-700 hover:border-primary/60 hover:text-primary",
            )}
          >
            {option.label}
            {typeof option.count === "number" ? (
              <span
                className={cn(
                  "text-xs tabular-nums",
                  active ? "text-white/70" : "text-gray-400",
                )}
              >
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
