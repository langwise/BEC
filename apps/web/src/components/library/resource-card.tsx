// File: src/components/library/resource-card.tsx
"use client";

import Image from "next/image";
import { ExternalLink, Lock, Unlock } from "lucide-react";
import { motion } from "motion/react";

interface ResourceCardProps {
  name: string;
  description: string;
  url?: string;
  logo?: string;
  type?: "paid" | "free";
  category?: string;
  index?: number;
}

export function ResourceCard({
  name,
  description,
  url,
  logo,
  type = "free",
  category,
  index = 0,
}: ResourceCardProps) {
  const isPaid = type === "paid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group bg-white rounded-lg border border-stone-200 hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Logo/Header Section */}
      <div
        className={`h-32 flex items-center justify-center p-6 ${
          isPaid
            ? "bg-linear-to-br from-orange-50 to-red-50"
            : "bg-linear-to-br from-green-50 to-teal-50"
        }`}
      >
        {logo ? (
          <div className="relative w-full h-full">
            <Image src={logo} alt={name} fill className="object-contain" />
          </div>
        ) : (
          <div
            className={`text-4xl font-bold ${
              isPaid ? "text-orange-600" : "text-green-600"
            }`}
          >
            {name.substring(0, 3).toUpperCase()}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
            {name}
          </h3>
          {isPaid ? (
            <Lock className="h-5 w-5 text-orange-600 shrink-0" />
          ) : (
            <Unlock className="h-5 w-5 text-green-600 shrink-0" />
          )}
        </div>

        {category && (
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
              isPaid
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {category}
          </span>
        )}

        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-all ${
              isPaid
                ? "text-orange-600 hover:text-orange-700 hover:gap-3"
                : "text-green-600 hover:text-green-700 hover:gap-3"
            }`}
          >
            Access Resource
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
