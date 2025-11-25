"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";

const newsItems = [
  {
    title:
      "BEC Achieves NAAC 'A' Grade Accreditation and NBA Recognition",
    category: "ACHIEVEMENTS",
    description:
      "Basaveshwar Engineering College receives prestigious NAAC 'A' grade accreditation and NBA recognition, reaffirming our commitment to academic excellence and quality education.",
    image: "/modern-university-campus.png",
    date: { month: "JAN", day: "15", year: "2025" },
    featured: true,
    categoryColor: "text-red-700",
  },
  {
    title: "BEC Secures ₹3.40 Crores in Research Grants",
    category: "RESEARCH",
    description:
      "College receives significant research funding, strengthening our position as a leading research institution with 35+ industry MoUs and active research centers.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&q=80&fit=crop",
    date: { month: "JAN", day: "12", year: "2025" },
    categoryColor: "text-blue-700",
  },
  {
    title:
      "96% Placement Record: BEC Students Excel in Campus Placements",
    category: "PLACEMENTS",
    description:
      "Outstanding placement season with top recruiters including Wipro, HCL, and Tech Mahindra, with average package of ₹3.14 LPA.",
    image: "https://images.pexels.com/photos/31956991/pexels-photo-31956991.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    date: { month: "JAN", day: "08", year: "2025" },
    categoryColor: "text-orange-700",
  },
  {
    title: "BEC Ranked in NIRF 201-250 Band",
    category: "RANKINGS",
    description:
      "College achieves recognition in National Institutional Ranking Framework, showcasing excellence in engineering education and research.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80&fit=crop",
    date: { month: "DEC", day: "28", year: "2024" },
    categoryColor: "text-teal-700",
  },
  {
    title: "New State-of-the-Art Laboratories Inaugurated",
    category: "INFRASTRUCTURE",
    description:
      "BEC enhances its infrastructure with modern laboratories and 1 Gbps Wi-Fi connectivity, providing students with cutting-edge learning facilities.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80&fit=crop",
    date: { month: "DEC", day: "20", year: "2024" },
    categoryColor: "text-red-700",
  },
];

function NewsCard({ item, featured, delay }: any) {
  const [isHovered, setIsHovered] = useState(false);

  if (featured) {
    return (
      <motion.button
        className="group block h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <article className="h-full flex flex-col">
          <div className="relative h-80 lg:h-[450px] overflow-hidden mb-6">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Calendar Badge */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden w-16">
              <div className="bg-primary text-white text-center py-1">
                <span className="text-xs font-bold">{item.date.month}</span>
              </div>
              <div className="text-center py-2">
                <span className="text-2xl font-bold text-gray-900 block leading-none">
                  {item.date.day}
                </span>
                <span className="text-xs text-gray-600 block mt-1">
                  {item.date.year}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <motion.p
              className={`text-xs font-bold tracking-widest mb-4 uppercase ${item.categoryColor}`}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.category}
            </motion.p>
            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-serif text-[#002F6C] mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>
            <div className="h-0.5 w-12 bg-primary mb-4 group-hover:w-20 transition-all duration-500" />
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/link"
            >
              Read more
              <svg
                className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
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
            </Link>
          </div>
        </article>
      </motion.button>
    );
  }

  return (
    <motion.button
      className="group block h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <article className="flex flex-col h-full">
        <div className="relative h-56 overflow-hidden mb-4">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-95"
          />
          <motion.div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Calendar Badge */}
          <div className="absolute top-3 right-3 bg-white rounded-md shadow-lg overflow-hidden w-14">
            <div className="bg-primary text-white text-center py-0.5">
              <span className="text-[10px] font-bold">{item.date.month}</span>
            </div>
            <div className="text-center py-1.5">
              <span className="text-xl font-bold text-gray-900 block leading-none">
                {item.date.day}
              </span>
              <span className="text-[10px] text-gray-600 block mt-0.5">
                {item.date.year}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <motion.p
            className={`text-xs font-bold tracking-widest mb-3 uppercase ${item.categoryColor}`}
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.category}
          </motion.p>
          <h3 className="text-lg lg:text-xl font-serif text-[#002F6C] mb-3 leading-tight group-hover:text-primary transition-colors duration-300 flex-1">
            {item.title}
          </h3>
          <div className="h-0.5 w-8 bg-primary mb-3 group-hover:w-16 transition-all duration-500" />
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/link"
          >
            Read more
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1"
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
          </Link>
        </div>
      </article>
    </motion.button>
  );
}

export function NewsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        {/* Header */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#002F6C]">
              News & Updates
            </h2>
          </div>
          <div className="h-1 w-16 bg-primary mt-3" />

          {/* Topics Dropdown Placeholder */}
          <div className="mt-6 flex justify-end">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
              Topics
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 mb-12">
          {/* Featured Article - Left Column */}
          <div className="pb-8 lg:pb-0 lg:pr-10 border-b lg:border-b-0 lg:border-r border-stone-200">
            <NewsCard item={newsItems[0]} featured={true} delay={0.1} />
          </div>

          {/* Right Column - Two Articles */}
          <div className="flex flex-col pt-8 lg:pt-0 lg:pl-10">
            <div className="pb-8">
              <NewsCard item={newsItems[1]} featured={false} delay={0.2} />
            </div>
            <div className="pt-8 border-t border-stone-200">
              <NewsCard item={newsItems[2]} featured={false} delay={0.3} />
            </div>
          </div>
        </div>

        {/* Bottom Row - Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 mb-12 lg:mb-16 border-t border-stone-200 pt-8">
          <div className="pb-8 md:pb-0 md:pr-10 border-b md:border-b-0 md:border-r border-stone-200">
            <NewsCard item={newsItems[3]} featured={false} delay={0.4} />
          </div>
          <div className="pt-8 md:pt-0 md:pl-10">
            <NewsCard item={newsItems[4]} featured={false} delay={0.5} />
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          className="flex justify-center pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="#"
            className="group inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all duration-300"
          >
            More News via BEC Today
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
