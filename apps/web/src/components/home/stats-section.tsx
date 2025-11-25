"use client";

import { FadeIn } from "../animations/fade-in";

const stats = [
  { value: "100%", label: "PhD Qualified Faculty" },
  { value: "96%", label: "Placement Record" },
  { value: "50k+", label: "Alumni Worldwide" },
  { value: "93+", label: "Acres Green Campus" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1} className="p-4">
              <div className="text-4xl md:text-6xl font-black mb-2 tracking-tight">
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
