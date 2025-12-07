"use client";

import { motion } from "motion/react";
import { testimonials } from "@/data/home/testimonials";
import { Quote } from "lucide-react";

export function AlumniTestimonialsSection() {
  return (
    <section className="py-20 lg:py-24 bg-stone-50/50">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1250px]">
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm uppercase tracking-[0.24em] text-primary font-bold mb-3">
            Since 1963
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            Our Legacy of <span className="text-primary">Excellence</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col"
            >
              <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                 <Quote className="w-12 h-12 fill-current" />
              </div>

              <div className="flex-1 mb-6">
                <p className="text-gray-700 text-lg leading-relaxed font-medium italic relative z-10">
                    "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-primary font-bold flex items-center justify-center text-xl shrink-0">
                    {item.name[0]}
                </div>
                <div>
                    <div className="text-base font-bold text-gray-900">
                    {item.name}
                    </div>
                    <div className="text-xs font-bold text-primary uppercase tracking-wide">
                    {item.role}
                    </div>
                    <div className="text-xs text-gray-400 font-medium">Class of {item.batch}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
