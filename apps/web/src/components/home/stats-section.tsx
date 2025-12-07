"use client";

import { FadeIn } from "../animations/fade-in";

const stats = [
  { value: "5000+", label: "Students on Campus" },
  { value: "350+", label: "Faculty Members" },
  { value: "100%", label: "Qualified & Experienced Faculty" },
  { value: "7+", label: "Undergraduate Programmes" },
  { value: "8+", label: "Postgraduate Programmes" },
  { value: "Multi", label: "PhD & Research Disciplines" },
  { value: "93+", label: "Acres of Infrastructure" },
  { value: "50k+", label: "Alumni Worldwide" },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 text-center divide-x divide-white/15">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1} className="p-4">
              <div className="text-3xl md:text-5xl font-black mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider">
                {stat.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
