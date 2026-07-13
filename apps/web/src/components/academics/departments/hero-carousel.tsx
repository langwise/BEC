"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { SectionImage } from "@/data/department/department";

export function DepartmentHeroCarousel({
  images,
  name,
  tagline,
}: {
  images: SectionImage[];
  name: string;
  tagline: string;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 6000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative w-full overflow-hidden border-b border-stone-200 bg-stone-900 group">
      <div className="relative h-[300px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
        <Carousel
          setApi={setApi}
          className="absolute inset-0"
          opts={{ loop: true }}
        >
          <CarouselContent className="ml-0 h-[300px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
            {images.map((img, index) => (
              <CarouselItem key={index} className="relative pl-0 basis-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-[center_38%]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Prev / Next — appear on hover, bottom-right */}
          <div className="absolute bottom-6 right-4 z-20 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:right-6">
            <CarouselPrevious className="static translate-y-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
            <CarouselNext className="static translate-y-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
          </div>
        </Carousel>

        {/* Legibility scrims — dark base, lightening upward and to the right */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/60 via-black/10 to-transparent" />

        {/* Title / tagline — fixed above the rolling images */}
        <div className="pointer-events-none absolute inset-0 flex items-end">
          <div className="container mx-auto max-w-6xl px-4 pb-8 lg:px-6 md:pb-12">
            <div className="max-w-3xl space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <h1 className="text-3xl font-semibold leading-tight text-balance text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.65)] md:text-4xl lg:text-5xl">
                {name}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.7)] md:text-lg">
                {tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                current === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
