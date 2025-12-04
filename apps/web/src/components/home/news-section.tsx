"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import { newsData } from "@/data/home/news-section";

function NewsCard({ item }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="#"
      className="group block h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <article className="flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Calendar Badge */}
          <div className="absolute top-3 right-3 bg-white rounded-md shadow-lg overflow-hidden w-12">
            <div className="bg-primary text-white text-center py-0.5">
              <span className="text-[9px] font-bold">{item.date.month}</span>
            </div>
            <div className="text-center py-1">
              <span className="text-lg font-bold text-gray-900 block leading-none">
                {item.date.day}
              </span>
              <span className="text-[9px] text-gray-600 block">
                {item.date.year}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-4">
          <motion.p
            className={`text-[10px] font-bold tracking-widest mb-2 uppercase ${item.categoryColor}`}
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.category}
          </motion.p>

          <h3 className="text-base font-semibold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {item.title}
          </h3>

          <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1">
            {item.description}
          </p>

          <div className="h-0.5 w-8 bg-primary mb-3 group-hover:w-14 transition-all duration-500" />

          <div className="flex items-center gap-2 text-primary font-semibold text-xs group-hover:gap-3 transition-all">
            Read more
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </article>
    </motion.a>
  );
}

export function NewsSection() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-2">
              News & Updates
            </h2>
            <div className="h-1 w-12 bg-secondary" />
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
          >
            View All News
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newsData.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
