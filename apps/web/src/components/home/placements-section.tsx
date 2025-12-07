"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FadeIn } from "../animations/fade-in";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { placementStats, topRecruiters } from "@/data/home/placements";

export function PlacementsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect: Moves background image at slower rate than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={ref}
      className="relative py-16 lg:py-24 border-t border-stone-200 overflow-hidden"
    >
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
        style={{
          y,
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 100%), url('/homepage-parallax-background-image.jpg')",
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          {/* Left Column - Headline + Stats */}
          <div className="space-y-10">
            <FadeIn className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-sm bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                Placements & Careers
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white drop-shadow-lg leading-tight">
                  Placements that launch careers
                </h2>
                <p className="text-white/85 text-lg max-w-2xl leading-relaxed">
                  Industry mentors, rigorous training, and a strong recruiter network help our students step confidently into roles across technology, consulting, and core engineering.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="secondary"
                  className="bg-white text-primary hover:bg-stone-100 font-semibold px-6 py-3 text-sm md:text-base"
                >
                  View Placements
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 font-semibold px-6 py-3 text-sm md:text-base"
                >
                  Career Services
                </Button>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {placementStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="bg-white/95 backdrop-blur-sm p-7 lg:p-8 rounded-sm hover:shadow-xl transition-shadow duration-300 border border-white/30"
                >
                  <div className="space-y-3">
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
                    <div className="h-px w-12 bg-gray-300" />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Company Logos */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-white/95 backdrop-blur-sm rounded-sm border border-white/30 shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-stone-200">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.12em] text-gray-500 font-semibold">
                  Top recruiters
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  Trusted by leading companies
                </p>
              </div>
              <a
                href="#"
                className="text-primary text-sm font-semibold hover:underline underline-offset-4"
              >
                View all
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:gap-12 px-6 lg:px-8 py-8">
              {topRecruiters.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center justify-center group"
                >
                  <div className="relative w-full h-14 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-stone-50 px-6 lg:px-8 py-4 border-t border-stone-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-sm text-gray-700">
                  Explore the full list of recruiters and recent offers.
                </p>
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
                >
                  Placement Report
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
