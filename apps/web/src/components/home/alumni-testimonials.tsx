"use client";

import { motion } from "motion/react";
import { testimonials } from "@/data/home/testimonials";

export function AlumniTestimonialsSection() {
  return (
    <section className="py-14 md:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1200px]">
        <div className="text-center mb-10">
          <p className="text-xs md:text-sm uppercase tracking-[0.24em] text-primary font-semibold mb-3">
            Alumni Speak
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Voices from our graduates
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full bg-stone-50 border border-stone-200 rounded-lg p-6 flex flex-col gap-4"
            >
              <div className="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 7h.01M15 7h.01M9 11.5c0 1.381 1.343 2.5 3 2.5 1.657 0 3-1.119 3-2.5C15 10.12 13.657 9 12 9c-1.657 0-3 1.12-3 2.5zm6 0V16a2 2 0 01-2 2h-1m-1 0H9a2 2 0 01-2-2v-1.5"
                  />
                </svg>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed flex-1">
                {item.quote}
              </p>
              <div>
                <div className="text-base font-semibold text-gray-900">
                  {item.name}
                </div>
                <div className="text-sm text-primary font-semibold">
                  {item.role}
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.batch}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
