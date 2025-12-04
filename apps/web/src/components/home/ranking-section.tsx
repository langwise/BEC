"use client";

import { rankingsData } from "@/data/home/ranking";
import { motion } from "motion/react";

function RankingCard({ ranking }: any) {
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
            {ranking.rank}
          </div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {ranking.type}
          </div>
        </div>
        <div className="text-2xl md:text-3xl">{ranking.logo}</div>
      </div>
      <div className="space-y-1">
        <div className="font-bold text-gray-900 text-sm">
          {ranking.category}
        </div>
        <div className="text-xs text-gray-600">{ranking.subcategory}</div>
        <div className="text-xs text-green-600 font-semibold">
          {ranking.year}
        </div>
      </div>
    </motion.div>
  );
}

export function RankingsSection() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-2">
            Rankings
          </h2>
          <div className="h-1 w-12 bg-secondary" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {rankingsData.map((ranking, index) => (
            <RankingCard key={index} ranking={ranking} />
          ))}
        </div>
      </div>
    </section>
  );
}
