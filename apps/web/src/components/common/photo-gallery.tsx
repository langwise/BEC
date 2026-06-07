import Image from "next/image";

import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  alt: string;
};

/**
 * Responsive photo grid used for any image gallery on the site (department
 * infrastructure, community initiatives, campus life…). Uniform aspect ratio,
 * rounded-sm tiles with a subtle zoom on hover. Reuse this instead of building
 * bespoke image grids.
 */
export function PhotoGallery({
  images,
  className,
}: {
  images: GalleryImage[];
  className?: string;
}) {
  if (!images.length) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4",
        className,
      )}
    >
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="group relative aspect-4/3 overflow-hidden rounded-sm border border-stone-200 bg-stone-100"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
