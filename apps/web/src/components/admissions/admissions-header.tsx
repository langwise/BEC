import { Clock, Award, Users } from "lucide-react";

interface AdmissionsHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  credential?: string;
  duration?: string;
  seats?: string;
}

/**
 * Page heading for the Admissions section. Renders inside the sidebar-constrained
 * column, so it uses a plain title block plus optional meta chips.
 */
export function AdmissionsHeader({
  eyebrow = "Admissions",
  title,
  description,
  credential,
  duration,
  seats,
}: AdmissionsHeaderProps) {
  const chips = [
    credential && { icon: Award, text: credential },
    duration && { icon: Clock, text: duration },
    seats && { icon: Users, text: seats },
  ].filter(Boolean) as { icon: typeof Award; text: string }[];

  return (
    <div className="mb-10 md:mb-12">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary mb-3">
        {eyebrow}
      </p>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
      {chips.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2.5">
          {chips.map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-orange-100 px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-xs"
            >
              <Icon className="w-3.5 h-3.5 text-primary" />
              {text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
