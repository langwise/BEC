import type { ReactNode } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  alt: string;
  /** Optional caption rendered below the photo. When omitted the tile shows no caption. */
  caption?: string;
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
  centered = false,
  feature = false,
  large = false,
  natural = false,
}: {
  images: GalleryImage[];
  className?: string;
  /**
   * Center rows with fixed-size tiles instead of a stretched grid — keeps tiles
   * a uniform size across sections and centers partial rows (2 or 3 photos) so
   * they don't look lopsided.
   */
  centered?: boolean;
  /**
   * Render each image large and full-column-width (single column) instead of as
   * a small grid tile — for showcase photos like a Centre of Excellence.
   */
  feature?: boolean;
  /**
   * With `centered`, use larger tiles (2 per row on desktop instead of 3) — a
   * moderate bump for per-lab infrastructure photos without going full-width.
   */
  large?: boolean;
  /**
   * Render each image full-width at its intrinsic aspect ratio (no fixed-ratio
   * crop) — for infographics and captioned collages where cropping loses content.
   */
  natural?: boolean;
}) {
  if (!images.length) return null;

  if (natural) {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {images.map((image, index) => (
          <figure key={`${image.src}-${index}`} className="w-full max-w-3xl">
            <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
              <Image
                src={image.src}
                alt={image.alt}
                width={1600}
                height={1000}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-full"
              />
            </div>
            {image.caption && <Caption>{image.caption}</Caption>}
          </figure>
        ))}
      </div>
    );
  }

  if (feature) {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {images.map((image, index) => (
          <figure key={`${image.src}-${index}`} className="w-full max-w-3xl">
            <div className="group relative aspect-3/2 w-full overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {image.caption && <Caption>{image.caption}</Caption>}
          </figure>
        ))}
      </div>
    );
  }

  if (centered) {
    return (
      <div className={cn("flex flex-wrap justify-center gap-4", className)}>
        {images.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className={cn(
              "w-[calc(50%-0.6rem)]",
              large ? "sm:w-[calc(50%-0.75rem)]" : "sm:w-[calc(33.333%-0.7rem)]",
            )}
          >
            <div className="group relative aspect-4/3 w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={large ? "(max-width: 640px) 50vw, 50vw" : "(max-width: 640px) 50vw, 33vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {image.caption && <Caption>{image.caption}</Caption>}
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4",
        className,
      )}
    >
      {images.map((image, index) => (
        <figure key={`${image.src}-${index}`}>
          <div className="group relative aspect-4/3 overflow-hidden rounded-sm border border-stone-200 bg-stone-100">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {image.caption && <Caption>{image.caption}</Caption>}
        </figure>
      ))}
    </div>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="mt-2 text-center text-sm leading-snug text-gray-600">
      {children}
    </figcaption>
  );
}
