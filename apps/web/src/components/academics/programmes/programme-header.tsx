interface ProgrammeHeaderProps {
  title: string;
  description?: string;
}

/**
 * Clean page heading for the programme pages. These render inside the
 * sidebar-constrained ProgrammesLayout column, so they use a plain title block
 * (no full-width hero / patterned background).
 */
export function ProgrammeHeader({ title, description }: ProgrammeHeaderProps) {
  return (
    <div className="mb-10 md:mb-12">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary mb-3">
        Programmes
      </p>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
