"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, BookOpen, FlaskConical, Users } from "lucide-react";
import { motion, Variants } from "motion/react";
import { FadeIn } from "../animations/fade-in";

const programmes = [
  {
    icon: GraduationCap,
    title: "Undergraduate Programmes",
    description:
      "World-class UG programmes across multiple disciplines preparing students for successful careers.",
    count: "25+ Programmes",
  },
  {
    icon: BookOpen,
    title: "Postgraduate Programmes",
    description:
      "Advanced PG programmes fostering specialization and research excellence in diverse fields.",
    count: "40+ Programmes",
  },
  {
    icon: FlaskConical,
    title: "Research Programmes",
    description:
      "PhD and M.Tech research opportunities driving innovation and discovery in cutting-edge areas.",
    count: "15+ Research Areas",
  },
  {
    icon: Users,
    title: "Student Community",
    description:
      "Vibrant campus life with diverse activities, clubs, and opportunities for holistic development.",
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
  return (
    <section className="py-24 bg-stone-50/50 border-t border-stone-200">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16" direction="up">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Academic Excellence
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
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
