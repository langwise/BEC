// src/components/programmes/programme-hero.tsx
"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface ProgrammeHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export function ProgrammeHero({ title, subtitle, description, image, stats }: ProgrammeHeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary-foreground/80 text-sm font-semibold uppercase tracking-widest mb-4">
              {subtitle}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              {description}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/80 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}