"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useEffect } from "react";

export function ParallaxVideo() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  // Parallax effect: Moves video down at 50% speed of scroll
  const y = useTransform(scrollY, [0, 1000], [0, 500]);

  return (
    <section
      ref={ref}
      className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-black"
    >
      {/* Video Layer */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full hidden md:block"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80"
          src="/hero-video.mp4"
        />
      </motion.div>

      {/* Fallback / Mobile Image */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/homepage-video-still-image-1920.jpg"
          alt="Hero Background"
          fill
          className="object-cover opacity-80"
        />
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />
    </section>
  );
}
