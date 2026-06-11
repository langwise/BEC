"use client";

import { FadeIn } from "../animations/fade-in";

// Figures verified against becbgk.edu and NIRF 2025 data:
// students 3,282 & faculty 189 (NIRF), 43% faculty with PhDs (Placement page),
// 11 UG ("11 disciplines", Admissions) & 8 PG, 10 R&D centres, 93.18 acres,
// established 1963 (About page).
const stats = [
  { value: "3,200+", label: "Students on Campus" },
  { value: "180+", label: "Faculty Members" },
  { value: "43%", label: "Faculty with PhDs" },
  { value: "11", label: "Undergraduate Programmes" },
  { value: "8", label: "Postgraduate Programmes" },
  { value: "10", label: "Research Centres" },
  { value: "93+", label: "Acres of Campus" },
  { value: "1963", label: "Established" },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 text-center">
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
