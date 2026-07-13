interface PlacementsHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PlacementsHeader({
  eyebrow = "Placements",
  title,
  description,
}: PlacementsHeaderProps) {
  return (
    <div className="mb-10 md:mb-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
