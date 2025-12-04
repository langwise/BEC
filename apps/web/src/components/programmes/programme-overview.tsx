// src/components/programmes/programme-overview.tsx
"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

interface ProgrammeOverviewProps {
  description: string;
  highlights: string[];
  disciplines: Array<{
    name: string;
    code: string;
  }>;
}

export function ProgrammeOverview({
  description,
  highlights,
  disciplines,
}: ProgrammeOverviewProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Programme Overview
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Key Highlights */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Key Highlights
              </h3>
              <ul className="space-y-4">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Disciplines/Specializations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Disciplines & Specializations
              </h3>
              <div className="grid gap-3">
                {disciplines.map((discipline, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <span className="font-medium text-gray-800">
                      {discipline.name}
                    </span>
                    <span className="text-sm text-primary font-semibold">
                      {discipline.code}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
