"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pin } from "lucide-react";
import { newsData } from "@/data/home/news-section";
import { announcementsData } from "@/data/home/announcement";

export function NewsAnnouncementsSection() {
  const [current, setCurrent] = useState(0);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const pinnedAnnouncements = useMemo(
    () => [
      {
        id: "p1",
        title: "Pinned: Admissions 2025 now open for UG, PG, PhD",
        date: "DEC 05, 2025",
        category: "Admissions",
        pinned: true,
      },
      {
        id: "p2",
        title: "Pinned: Semester exam schedule published on the portal",
        date: "DEC 01, 2025",
        category: "Examination",
        pinned: true,
      },
    ],
    []
  );

  useEffect(() => {
    if (!newsData.length) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % newsData.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!announcementsData.length) return;
    const id = setInterval(() => {
      setAnnouncementIndex(
        (prev) => (prev + 1) % announcementsData.length
      );
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const topNews = newsData[current];
  const pinnedList = pinnedAnnouncements.slice(0, 2);
  const slidingAnnouncements = announcementsData;
  const slidingCount = slidingAnnouncements.length || 1;
  const currentAnnouncements = useMemo(() => {
    if (!slidingAnnouncements.length) return [];
    const start = announcementIndex % slidingCount;
    const first = slidingAnnouncements[start];
    const second = slidingAnnouncements[(start + 1) % slidingCount];
    return [first, second].filter(Boolean);
  }, [announcementIndex, slidingAnnouncements, slidingCount]);

  return (
    <section className="py-14 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-1">
              News & Announcements
            </h2>
            <p className="text-sm text-gray-600">
              Latest stories and important updates at a glance.
            </p>
          </div>
          <a
            href="#"
            className="hidden lg:inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          {/* Left: Top News */}
          <div className="w-full">
            <div className="relative overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="relative w-full aspect-4/3 sm:aspect-video lg:aspect-5/3 min-h-[300px] sm:min-h-[400px]">
                <Image
                  src={topNews.image}
                  alt={topNews.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 mb-3">
                    <span className="px-2 py-1 rounded-full bg-white/20 border border-white/20">
                      {topNews.category}
                    </span>
                    <span>
                      {topNews.date.day} {topNews.date.month} {topNews.date.year}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight drop-shadow line-clamp-2">
                    {topNews.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base max-w-3xl leading-relaxed line-clamp-3">
                    {topNews.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all cursor-pointer">
                    Read story
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {newsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === index ? "w-6 bg-white" : "w-2 bg-white/50"
                    }`}
                    aria-label={`Show story ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Announcements list */}
          <div className="w-full">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 sm:p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Announcements
                </h3>
                <a
                  href="#"
                  className="text-primary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View all
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <div className="space-y-3 flex-1 flex flex-col min-h-0">
                {/* Pinned */}
                <div className="space-y-2 flex-shrink-0">
                  {pinnedList.map((item) => (
                    <div
                      key={item.id}
                      className="group rounded-md px-3 py-3 bg-primary/5 border border-primary/15 hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Pin className="h-4 w-4 text-primary mt-0.5 fill-primary shrink-0" />
                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                          <span className="text-[10px] uppercase tracking-wide text-gray-500">
                            {item.date}
                          </span>
                          <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sliding list */}
                <div className="relative flex-1 min-h-[200px] sm:min-h-[240px] overflow-hidden mt-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={announcementIndex}
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -60, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="rounded-md border border-gray-200 bg-gray-50/80 h-full p-4 flex flex-col justify-between"
                    >
                      <div className="space-y-4 flex-1">
                        {currentAnnouncements.map((item) => (
                          <div key={item.id} className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-wide text-gray-500">
                              {item.date}
                            </span>
                            <p className="text-sm sm:text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                              {item.title}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-4 mt-auto border-t border-gray-200">
                        <button
                          aria-label="Previous announcement"
                          onClick={() =>
                            setAnnouncementIndex((prev) =>
                              (prev - 1 + slidingAnnouncements.length) %
                              slidingAnnouncements.length
                            )
                          }
                          className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          aria-label="Next announcement"
                          onClick={() =>
                            setAnnouncementIndex(
                              (prev) => (prev + 1) % slidingAnnouncements.length
                            )
                          }
                          className="h-8 w-8 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
