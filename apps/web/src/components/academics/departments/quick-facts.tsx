import { FlaskConical } from "lucide-react";
import type { DepartmentData } from "@/data/department/department";

/** Department-specific "Quick Facts" panel: a spec-sheet of facts plus research-area chips. */
export function QuickFacts({ quickFacts }: { quickFacts: NonNullable<DepartmentData["quickFacts"]> }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-baseline justify-between bg-secondary px-6 py-4">
        <h2 className="text-lg font-bold tracking-tight text-white">Quick Facts</h2>
        <span className="text-xs uppercase tracking-widest text-white/60">At a glance</span>
      </div>
      <div className="bg-white px-6">
        {quickFacts.facts.map((f) => (
          <div
            key={f.label}
            className="flex items-baseline justify-between border-b border-dashed border-stone-200 py-4 last:border-b-0"
          >
            <span className="text-sm font-medium uppercase tracking-wide text-gray-500">
              {f.label}
            </span>
            <span className="text-2xl font-bold tabular-nums text-primary">{f.value}</span>
          </div>
        ))}
      </div>
      {quickFacts.researchAreas.length > 0 && (
        <div className="bg-linear-to-br from-orange-50 to-white px-6 py-5">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
            <FlaskConical className="h-3.5 w-3.5 text-primary" />
            Research Areas
          </p>
          <div className="flex flex-wrap gap-2">
            {quickFacts.researchAreas.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-br from-primary to-orange-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-primary/20 transition-transform hover:-translate-y-0.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                {a}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
