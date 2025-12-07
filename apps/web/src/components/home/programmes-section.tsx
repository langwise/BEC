"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, Variants, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FadeIn } from "../animations/fade-in";
import { programmes } from "@/data/home/programme";
import { Button } from "@/components/ui/button";

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
    <section
      ref={ref}
      className="relative py-16 lg:py-20 border-t border-stone-200 overflow-hidden"
    >
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
        style={{
          y,
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.55) 100%), url('/homepage-video-still-image-1920.jpg')",
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="mb-10" direction="up">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-sm bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                Academic Excellence
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg leading-tight">
                  Programmes that shape future-ready graduates
                </h2>
                <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed drop-shadow-md">
                  Explore degrees that balance strong foundations with hands-on learning across disciplines.
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-stone-100 font-semibold px-5 py-3 text-sm md:text-base self-start"
            >
              View all programmes
            </Button>
          </div>
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
                <Card className="h-full text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-stone-100 bg-white">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {programme.count}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-serif">
                      {programme.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 leading-relaxed">
                      {programme.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="link" className="px-0 text-primary font-semibold">
                      View details
                    </Button>
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
