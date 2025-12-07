"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pin } from "lucide-react";
import { newsData } from "@/data/home/news-section";
import { announcementsData } from "@/data/home/announcement";
import { cn } from "@/lib/utils";

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
    <section className="py-20 bg-stone-50/50">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 text-gray-900">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">
              News & Announcements
            </h2>
            <p className="text-gray-600 font-medium max-w-md">
              Stay updated with the latest happenings, achievements, and notices from the campus.
            </p>
          </div>
          <a
            href="#"
            className="hidden lg:inline-flex items-center gap-2 text-primary font-bold text-sm tracking-wide uppercase hover:gap-3 transition-all"
          >
            All Updates
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-stretch">
          {/* Left: Top News Carousel */}
          <div className="w-full relative group">
            <div className="relative h-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
                {/* Image */}
              <div className="relative w-full h-[450px]">
                <Image
                  src={topNews.image}
                  alt={topNews.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
                            {topNews.category}
                        </span>
                        <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">
                             {topNews.date.day} {topNews.date.month} {topNews.date.year}
                        </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                        {topNews.title}
                    </h3>

                    <p className="text-white/90 text-sm lg:text-base leading-relaxed line-clamp-2 max-w-2xl mb-6">
                        {topNews.description}
                    </p>

                     <button className="flex items-center gap-2 text-white font-bold text-sm hover:gap-3 transition-all self-start">
                        Read Full Story <ChevronRight className="w-4 h-4" />
                     </button>
                </div>
              </div>

              {/* Indicators */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
                {newsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        current === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                    )}
                    aria-label={`Show story ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Announcements Panel */}
          <div className="w-full flex flex-col h-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="font-bold text-xl tracking-tight text-gray-900">Latest Notices</h3>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>

              <div className="p-6 flex-1 flex flex-col gap-6">
                 {/* Pinned List */}
                 <div className="space-y-3">
                     {pinnedList.map((item) => (
                         <div key={item.id} className="p-4 rounded-xl bg-orange-50/80 border border-orange-100 flex items-start gap-3 transition-colors hover:bg-orange-50">
                             <Pin className="w-4 h-4 text-primary fill-primary mt-1 shrink-0" />
                             <div>
                                 <p className="text-sm font-semibold text-gray-900 leading-snug mb-1">{item.title}</p>
                                 <p className="text-[10px] uppercase tracking-wider text-primary/80 font-bold">{item.date}</p>
                             </div>
                         </div>
                     ))}
                 </div>

                 {/* Divider */}
                 <div className="h-px bg-gray-50 w-full" />

                 {/* Slider */}
                 <div className="relative flex-1 overflow-hidden min-h-[160px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={announcementIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 absolute inset-0"
                        >
                            {currentAnnouncements.map((item) => (
                                <div key={item.id} className="group">
                                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1 group-hover:text-primary transition-colors">{item.date}</p>
                                    <p className="text-sm text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors line-clamp-2">{item.title}</p>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                 </div>
              </div>
            
             {/* Controls */}
             <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                 <button onClick={() => setAnnouncementIndex((p) => (p - 1 + slidingAnnouncements.length) % slidingAnnouncements.length)} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all">
                     <ChevronLeft className="w-4 h-4" />
                 </button>
                 <button onClick={() => setAnnouncementIndex((p) => (p + 1) % slidingAnnouncements.length)} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all">
                     <ChevronRight className="w-4 h-4" />
                 </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
