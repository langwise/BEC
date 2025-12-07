"use client";

import { Clock, MapPin, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import { upcomingEvents } from "@/data/home/event";

function EventCard({ event }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="#"
      className="group block h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <article className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col">
        {/* Image Section */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          {/* Date Badge */}
          <div className="absolute top-3 left-3 bg-white rounded-md shadow-lg overflow-hidden">
            <div className="bg-primary text-white text-center py-1 px-3">
              <span className="text-[9px] font-bold tracking-wider">
                {event.date.month}
              </span>
            </div>
            <div className="text-center py-1.5 px-3">
              <span className="text-xl font-bold text-gray-900 block leading-none">
                {event.date.day}
              </span>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-white/95 rounded ${event.categoryColor}`}
            >
              {event.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-4">
          <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {event.title}
          </h3>

          <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1">
            {event.description}
          </p>

          <div className="flex flex-col gap-1.5 mb-3 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="h-3 w-3 text-primary shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="h-3 w-3 text-primary shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-primary font-semibold text-xs group-hover:gap-3 transition-all">
            Register Now
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </article>
    </motion.a>
  );
}

export function EventsSection() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-2">
              Upcoming Events
            </h2>
            <div className="h-1 w-12 bg-secondary" />
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
          >
            View All Events
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
