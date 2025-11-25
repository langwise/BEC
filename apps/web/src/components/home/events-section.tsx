"use client";

import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "../animations/fade-in";

const upcomingEvents = [
  {
    id: 1,
    title: "BEC Technical Fest 2025",
    description: "Join us for a day of innovation showcasing cutting-edge research, student projects, and industry insights from leading experts in engineering and technology.",
    date: {
      month: "FEB",
      day: "15",
      year: "2025",
    },
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium, BEC Campus",
    category: "Technical Fest",
    categoryColor: "text-blue-700",
    featured: true,
  },
  {
    id: 2,
    title: "Workshop on AI & Machine Learning",
    description: "Hands-on workshop exploring practical AI and ML applications in engineering, organized by the Computer Science Department.",
    date: {
      month: "FEB",
      day: "20",
      year: "2025",
    },
    time: "2:00 PM - 5:00 PM",
    location: "Computer Science Lab",
    category: "Workshop",
    categoryColor: "text-purple-700",
  },
  {
    id: 3,
    title: "Guest Lecture: Sustainable Engineering Practices",
    description: "Distinguished speaker series featuring industry leaders discussing renewable energy solutions and sustainable engineering practices.",
    date: {
      month: "FEB",
      day: "25",
      year: "2025",
    },
    time: "4:00 PM - 6:00 PM",
    location: "Lecture Hall, BEC Campus",
    category: "Lecture",
    categoryColor: "text-green-700",
  },
  {
    id: 4,
    title: "BEC Placement Drive 2025",
    description: "Connect with top recruiters including Wipro, HCL, Tech Mahindra and explore exciting career opportunities.",
    date: {
      month: "MAR",
      day: "05",
      year: "2025",
    },
    time: "10:00 AM - 4:00 PM",
    location: "Campus Grounds, BEC",
    category: "Placement Drive",
    categoryColor: "text-orange-700",
  },
];

function EventCard({ event, featured = false }: any) {
  if (featured) {
    return (
      <motion.a
        href="#"
        className="group block h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <article className="h-full bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row">
          {/* Calendar Badge - Large */}
          <div className="lg:w-40 bg-primary text-white flex flex-col items-center justify-center p-6 lg:p-8 flex-shrink-0">
            <span className="text-sm font-bold tracking-wider mb-2">{event.date.month}</span>
            <span className="text-5xl lg:text-6xl font-bold leading-none mb-2">{event.date.day}</span>
            <span className="text-sm opacity-90">{event.date.year}</span>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold tracking-widest uppercase ${event.categoryColor}`}>
                {event.category}
              </span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
              {event.title}
            </h3>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {event.description}
            </p>

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
              Register Now
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </article>
      </motion.a>
    );
  }

  return (
    <motion.a
      href="#"
      className="group block h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <article className="h-full bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
        {/* Calendar Badge - Compact */}
        <div className="bg-primary text-white flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <span className="text-xs font-bold tracking-wider block">{event.date.month}</span>
              <span className="text-3xl font-bold leading-none block">{event.date.day}</span>
            </div>
            <div className="h-12 w-px bg-white/30"></div>
            <span className="text-sm font-semibold">{event.date.year}</span>
          </div>
          <Calendar className="h-5 w-5 opacity-60" />
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold tracking-widest uppercase ${event.categoryColor}`}>
              {event.category}
            </span>
          </div>

          <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
            {event.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="flex flex-col gap-2 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
            Learn More
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </article>
    </motion.a>
  );
}

export function EventsSection() {
  const featuredEvent = upcomingEvents[0];
  const regularEvents = upcomingEvents.slice(1);

  return (
    <section className="py-16 lg:py-24 bg-stone-50">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px]">
        {/* Header */}
        <FadeIn className="mb-12 lg:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#002F6C]">
                  Upcoming Events
                </h2>
              </div>
              <div className="h-1 w-16 bg-primary mt-3" />
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all duration-300"
            >
              View All Events
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>

        {/* Featured Event */}
        <div className="mb-8 lg:mb-12">
          <EventCard event={featuredEvent} featured={true} />
        </div>

        {/* Regular Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularEvents.map((event, index) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}