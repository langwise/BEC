"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, BookOpen, FlaskConical, Users } from "lucide-react";
import { motion, Variants, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FadeIn } from "../animations/fade-in";

const programmes = [
  {
    icon: GraduationCap,
    title: "Undergraduate Programmes",
    description:
      "B.E. programmes in Civil, Mechanical, Electrical, CSE, ECE, ISE and more, preparing students for successful engineering careers.",
    count: "7+ B.E. Programmes",
  },
  {
    icon: BookOpen,
    title: "Postgraduate Programmes",
    description:
      "M.Tech, MBA, and MCA programmes fostering specialization and research excellence across diverse fields.",
    count: "M.Tech, MBA, MCA",
  },
  {
    icon: FlaskConical,
    title: "Research Programmes",
    description:
      "PhD and M.Tech research opportunities driving innovation with ₹3.40 crores in research grants and 35+ industry partnerships.",
    count: "Multiple Research Areas",
  },
  {
    icon: Users,
    title: "Student Community",
    description:
      "Vibrant campus life with diverse activities, clubs, and opportunities for holistic development on our 93-acre campus.",
    count: "5000+ Students",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ProgrammesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Parallax effect: Moves background image at slower rate than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative py-24 border-t border-stone-200 overflow-hidden">
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="text-center mb-16" direction="up">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 drop-shadow-lg">
            Academic Excellence
          </h2>
          <p className="text-white/95 text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Discover our comprehensive range of academic programmes designed to
            nurture talent and inspire innovation.
          </p>
        </FadeIn>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {programmes.map((programme, index) => {
            const Icon = programme.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="h-full text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-stone-100 bg-white">
                  <CardHeader>
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-serif">
                      {programme.title}
                    </CardTitle>
                    <CardDescription className="text-primary font-semibold mt-2">
                      {programme.count}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {programme.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
