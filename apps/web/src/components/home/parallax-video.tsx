"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export function ParallaxVideo() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Parallax effect: Moves video down at 50% speed of scroll
  const y = useTransform(scrollY, [0, 1000], [0, 500]);

  return (
    <div className="absolute inset-x-0 h-[calc(100vh-46px)] z-1 overflow-hidden">
      <div
        ref={ref}
        className="relative w-full h-full overflow-hidden bg-black"
      >
        {/* Video Layer - Hidden on mobile usually handled via CSS media queries, 
          but here we render both and hide via CSS for simplicity */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-full hidden md:block"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-80"
            src="/hero-loop-1920x1080.mp4"
          />
        </motion.div>

        {/* Fallback / Mobile Image */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="https://www.utexas.edu/sites/default/files/hero_video/homepage-video-still-image-1920.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-80"
          />
        </div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>
    </div>
  );
}
