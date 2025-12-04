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
      <motion.div className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat" />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px] relative z-10">
        {/* Header */}
        <FadeIn className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/80 font-medium">
              Placements & Careers
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-8 max-w-3xl drop-shadow-lg">
            Glance at the top companies hiring from BEC
          </h2>
          <Button
            variant="outline"
            className="border-2 border-white text-white! bg-transparent! hover:bg-white! hover:text-gray-900! font-semibold px-8 py-6 text-base transition-all duration-300"
            style={{ color: "white", backgroundColor: "transparent" }}
          >
            View Placements
          </Button>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16">
          {/* Left Column - Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {placementStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white/95 backdrop-blur-sm p-8 rounded-sm hover:shadow-xl transition-shadow duration-300 border border-white/20`}
                >
                  <div className="space-y-4">
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
                    <div className="h-px w-12 bg-gray-400"></div>
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/95 backdrop-blur-sm p-8 lg:p-12 rounded-sm border border-white/20 shadow-lg"
          >
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              {topRecruiters.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center justify-center group"
                >
                  <div className="relative w-full h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
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

            {/* Additional CTA */}
            <div className="mt-12 pt-8 border-t border-stone-200">
              <a
                href="#"
                className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300"
              >
                View All Recruiters
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
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-primary p-8 lg:p-12 rounded-sm"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Ready to Start Your Career Journey?
              </h3>
              <p className="text-white/90 text-lg">
                Join our placement preparation programs and career development
                workshops
              </p>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-stone-100 font-semibold px-8 py-6 text-base whitespace-nowrap"
            >
              Explore Career Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
