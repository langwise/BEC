"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";

// --- STRATEGY-ALIGNED DATA ---
const IMPACT_DATA = [
  {
    id: 1,
    title: "Innovation & Research",
    description:
      "Our faculty are not just teachers; they are pioneers. With 100% of our core faculty holding PhDs from premier institutions, we lead the way in groundbreaking research. From advanced materials to sustainable energy, our labs are where the future is forged.",
    stats: [
      { value: "100%", label: "PhD Qualified Faculty" },
      { value: "400+", label: "Patents Filed" },
      { value: "50+", label: "Active Research Labs" },
    ],
    cta: "Meet Our Faculty",
    image: "/story2.jpg",
    color: "bg-orange-50",
  },
  {
    id: 2,
    title: "World-Class Infrastructure",
    description:
      "Spread across a lush, 200-acre green campus, the Institute offers a vibrant ecosystem for learning and living. Our state-of-the-art libraries, hostels, and sports complexes provide the perfect backdrop for a holistic educational journey.",
    stats: [
      { value: "200", label: "Acres of Green Campus" },
      { value: "24/7", label: "Library Access" },
      { value: "12", label: "Sports Complexes" },
    ],
    cta: "Virtual Campus Tour",
    image: "/story1.jpg",
    color: "bg-white",
  },
  {
    id: 3,
    title: "Success Stories",
    description:
      "Our legacy is defined by the success of our graduates. With a vast global network of alumni leading top organizations and a stellar placement record, we ensure that every student is career-ready from day one.",
    stats: [
      { value: "96%", label: "Placement Rate" },
      { value: "50k+", label: "Strong Alumni Network" },
      { value: "150+", label: "Startups Incubated" },
    ],
    cta: "Placement Records",
    image: "/story3.jpg",
    color: "bg-stone-50",
  },
];

// --- Components ---

export function ImpactSection() {
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
              <Image
                src={IMPACT_DATA[activeIndex].image}
                alt={IMPACT_DATA[activeIndex].title}
                fill
                className="object-cover opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />
              <div className="absolute bottom-12 left-12 text-white/80 z-10">
                <p className="uppercase tracking-[0.2em] text-sm font-medium">
                  Focus Area 0{activeIndex + 1}
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

function TextBlock({
  item,
  index,
  setActiveIndex,
}: {
  item: (typeof IMPACT_DATA)[0];
  index: number;
  setActiveIndex: (i: number) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

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
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-orange-600/60"></span>
          <span className="text-orange-700 uppercase tracking-widest text-xs font-bold">
            Key Pillar 0{index + 1}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          {item.title}
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed mb-10 font-light">
          {item.description}
        </p>

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
