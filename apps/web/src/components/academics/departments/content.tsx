"use client";

import { motion } from "motion/react";
import { iconMap } from "./icons";

export default function ContentSection({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon?: string;
}) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h2>
      </div>

      <p className="text-gray-700 leading-relaxed">{content}</p>
    </motion.div>
  );
}
