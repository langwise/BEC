"use client";

import { announcementsData } from "@/data/home/announcement";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function AnnouncementItem({ item, index }: any) {
  return (
    <motion.a
      href="#"
      className="group block py-3 px-3 -mx-3 hover:bg-gray-50 rounded-lg transition-colors"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex gap-3">
        <div className="text-xl shrink-0">{item.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-gray-500 font-medium">
              {item.date}
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-semibold">
              {item.category}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors leading-snug">
            {item.title}
          </h4>
        </div>
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
      </div>
    </motion.a>
  );
}

export function AnnouncementsSection() {
  const [announcementsPage, setAnnouncementsPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(announcementsData.length / itemsPerPage);
  const currentAnnouncements = announcementsData.slice(
    announcementsPage * itemsPerPage,
    (announcementsPage + 1) * itemsPerPage
  );

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-2">
              Announcements
            </h2>
            <div className="h-1 w-12 bg-secondary" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setAnnouncementsPage(Math.max(0, announcementsPage - 1))
                }
                disabled={announcementsPage === 0}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={() =>
                  setAnnouncementsPage(
                    Math.min(totalPages - 1, announcementsPage + 1)
                  )
                }
                disabled={announcementsPage >= totalPages - 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentAnnouncements.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <AnnouncementItem item={item} index={index} />
            </div>
          ))}
        </div>

        <div className="sm:hidden mt-6 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
          >
            View All Announcements
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
