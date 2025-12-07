// src/components/programmes/programme-placement.tsx
"use client";

import { motion } from "motion/react";
import { TrendingUp, Building2, Briefcase } from "lucide-react";
import Image from "next/image";

interface ProgrammePlacementProps {
  stats: {
    rate: string;
    average: string;
    highest: string;
    companies: string;
  };
  topRecruiters: string[];
  industries: string[];
}

export function ProgrammePlacement({
  stats,
  topRecruiters,
  industries,
}: ProgrammePlacementProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Placements & Careers
            </h2>
            <p className="text-lg text-gray-600">
              Exceptional career opportunities with top companies across
              industries
            </p>
          </motion.div>

          {/* Placement Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-stone-200">
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.rate}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Placement Rate
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-border">
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.average}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Average Package
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-border">
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.highest}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Highest Package
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-border">
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.companies}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Companies
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Recruiters */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Top Recruiters
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {topRecruiters.map((company, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-3 bg-muted rounded-lg text-center text-sm font-medium text-foreground hover:bg-primary/5 transition-colors"
                  >
                    {company}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Industry Sectors */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Industry Sectors
                </h3>
              </div>
              <div className="space-y-3">
                {industries.map((industry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-muted rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <TrendingUp className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{industry}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
            >
              View Detailed Placement Reports
              <svg
                className="w-5 h-5"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
