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
import { heroSlides } from "@/data/home/hero-slides";
import { cn } from "@/lib/utils";

export function HeroBanner() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [headerHeight, setHeaderHeight] = React.useState(80); // fallback matches header min height

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Lightweight autoplay every 6 seconds
  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [api]);

  // Sync hero height to fill viewport minus fixed header
  React.useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      if (!header) return;
      const { height } = header.getBoundingClientRect();
      setHeaderHeight(Math.max(0, Math.round(height)));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const heroHeight = `calc(100vh - ${headerHeight}px)`;

  return (
    <div
      className="relative w-full bg-black overflow-hidden group"
      style={{ height: heroHeight }}
    >
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent
          className="h-full ml-0"
          style={{ minHeight: heroHeight }}
        >
          {heroSlides.map((slide, index) => (
            <CarouselItem
              key={slide.id}
              className="pl-0 h-full relative"
              style={{ minHeight: heroHeight }}
            >
              {/* Image Background */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />
              </div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-white/90 max-w-2xl font-medium leading-relaxed drop-shadow-md">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 right-8 flex gap-2 z-20">
          <CarouselPrevious className="static translate-y-0 bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white" />
          <CarouselNext className="static translate-y-0 bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white" />
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                current === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
