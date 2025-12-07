"use client";

import { motion } from "motion/react";
import { iconMap } from "./icons";

interface ContentSectionProps {
  id?: string; // Added for potential scroll targets
  title: string;
  content: string;
  icon?: string;
}

export default function ContentSection({
  id,
  title,
  content,
  icon,
}: ContentSectionProps) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12 scroll-mt-28" 
    >
      <div className="flex items-center gap-4 mb-4">
        {Icon && (
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100 shadow-sm">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
      </div>

      <div className="prose prose-lg prose-orange max-w-none text-gray-600 leading-relaxed">
        <p>{content}</p>
      </div>
    </motion.div>
  );
}
