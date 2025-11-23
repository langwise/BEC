"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";

// --- Dummy Data ---
const IMPACT_DATA = [
  {
    id: 1,
    title: "Learning With Purpose",
    description:
      "For generations, we have prepared visionary leaders ready to meet the future head-on. Our curriculum is not just about absorbing knowledge, but about questioning the status quo. We equip our students to ask big questions, expand their minds, and advance society—driving progress long beyond their time here.",
    stats: [
      { value: "76", label: "Top 10 UG Programs" },
      { value: "170+", label: "Areas of Study" },
      { value: "18:1", label: "Student-Faculty Ratio" },
    ],
    cta: "Explore Degree Programs",
    image: "/story1.jpg", // Replace with your actual image paths
    color: "bg-orange-50", // Optional subtle tint for text background
  },
  {
    id: 2,
    title: "Big Ideas. Bigger Impact.",
    description:
      "From advancing health care to redefining sustainable energy, our researchers tackle the most important challenges of our time. Breakthrough discoveries transform lives across the state and around the world. We believe that research is the engine of the future.",
    stats: [
      { value: "1,291", label: "Patents (Last 10 Yrs)" },
      { value: "$1.14B", label: "Research Expenditures" },
      { value: "4,660", label: "Sponsored Projects" },
    ],
    cta: "Research Initiatives",
    image: "/story2.jpg",
    color: "bg-white",
  },
  {
    id: 3,
    title: "The Institute Experience",
    description:
      "The experience here is bold, ambitious, and forward-looking. Students engage in hands-on research, solve real-world problems, and create their own paths in a city built on creativity and commerce. It is more than a degree; it is a lifelong network of excellence.",
    stats: [
      { value: "#1", label: "Public University in Region" },
      { value: "92%", label: "Post-Grad Employment" },
      { value: "500k", label: "Alumni Network" },
    ],
    cta: "Admissions & Aid",
    image: "/story3.jpg",
    color: "bg-stone-50",
  },
];

// --- Components ---

export function ImpactSection() {
  // Track which section is currently in view to update the sticky image
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full">
      <div className="flex flex-col lg:flex-row">
        {/* LEFT COLUMN: Sticky Image (Desktop) */}
        <div className="hidden lg:block lg:w-1/2 sticky top-0 h-screen overflow-hidden bg-gray-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={IMPACT_DATA[activeIndex].id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Image */}
              <Image
                src={IMPACT_DATA[activeIndex].image}
                alt={IMPACT_DATA[activeIndex].title}
                fill
                className="object-cover opacity-90"
                priority
              />

              {/* Overlay Gradient for Formal Look */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />

              {/* Optional: Overlay Text or Chapter Number */}
              <div className="absolute bottom-12 left-12 text-white/80 z-10">
                <p className="uppercase tracking-[0.2em] text-sm font-medium">
                  Chapter 0{activeIndex + 1}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Scrolling Text Content */}
        <div className="w-full lg:w-1/2">
          {IMPACT_DATA.map((item, index) => (
            <TextBlock
              key={item.id}
              item={item}
              index={index}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Sub-Component: Text Block ---
function TextBlock({
  item,
  index,
  setActiveIndex,
}: {
  item: (typeof IMPACT_DATA)[0];
  index: number;
  setActiveIndex: (i: number) => void;
}) {
  // useInView hook detects when this specific block enters the viewport
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  // Update the parent state when this block is in the center of the screen
  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  return (
    <div
      ref={ref}
      className={`min-h-screen flex flex-col justify-center px-6 py-20 md:px-16 ${item.color}`}
    >
      {/* Mobile Image (Visible only on small screens) */}
      <div className="lg:hidden mb-8 relative h-64 w-full rounded-lg overflow-hidden shadow-md">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Formal Eyebrow Text */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-orange-600/60"></span>
          <span className="text-orange-700 uppercase tracking-widest text-xs font-bold">
            Impact Area 0{index + 1}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          {item.title}
        </h2>

        {/* Body Text */}
        <p className="text-lg text-gray-600 leading-relaxed mb-10 font-light">
          {item.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 border-t border-gray-200 pt-8 mb-10">
          {item.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#"
          className="group inline-flex items-center gap-2 text-orange-700 font-semibold transition-colors hover:text-orange-900"
        >
          {item.cta}
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            →
          </motion.span>
        </a>
      </motion.div>
    </div>
  );
}
