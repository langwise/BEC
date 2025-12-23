"use client";

import * as React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const aboutSlides = [
  {
    id: 1,
    text: (
      <>
        <p className="mb-4">
          <span className="font-semibold text-foreground">
            Basaveshwar Engineering College, Bagalkote (BEC)
          </span>{" "}
          – a crown jewel in the highly respected and renowned 120-year-old
          Basaveshwar Veerashaiva Vidya Vardhak Sangha (B. V. V. S.) – is a
          premier technical institution in North Karnataka. Started in 1963, it
          has grown into a center of excellence with 11 UG, 6 PG, and 10
          Research Centers recognized by VTU.
        </p>
        <p>
          BEC is a government-aided institution recognized by AICTE, New Delhi
          and accredited by NAAC with 'A' grade. It is permanently affiliated
          to VTU, Belagavi.
        </p>
      </>
    ),
  },
  {
    id: 2,
    text: (
      <>
        <p className="mb-4">
          The college boasts state-of-the-art facilities across a vast 93-acre
          campus. Our legacy spans over 20,000+ alumni who now hold leadership
          positions in top MNCs and organizations globally.
        </p>
        <p>
          With a highly qualified faculty of over 180 (55% holding PhDs) and
          supported by 200 staff members, we offer an unbeatable academic
          ambience and superior education quality for our 3500+ students.
        </p>
      </>
    ),
  },
  {
    id: 3,
    text: (
      <>
        <p>
          We provide a holistic learning environment with spacious hostels,
          campus-wide high-speed WiFi, a well-stocked digital and print
          library, and advanced computer labs.
        </p>
        <p className="mt-4">
          Life at BEC is vibrant with multiple hygienic canteens and electric
          buggies for easy campus commuting, making it one of the best places
          to teach and learn.
        </p>
      </>
    ),
  },
];

export function AboutSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-20 bg-muted/20 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left: Image (Stays static) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px] lg:min-h-full group"
          >
           <Image
             src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop" 
             alt="BEC Campus"
             fill
             className="object-cover transition-transform duration-700 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
           <div className="absolute bottom-8 left-8 text-white max-w-sm">
             <div className="text-4xl font-bold mb-2">1963</div>
             <p className="text-white/80 font-medium tracking-wide border-l-4 border-primary pl-4">
               Year of Establishment
             </p>
           </div>
          </motion.div>

          {/* Right: Content Carousel */}
          <div className="flex flex-col justify-center space-y-8 py-4">
            <div>
              <motion.h2
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-2"
              >
                About BEC
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="h-1.5 bg-primary/20 rounded-full" 
              />
            </div>

            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {aboutSlides.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <div className="pr-4 md:pr-12">
                      <div className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {slide.text}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Custom Navigation */}
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => api?.scrollPrev()}
                    disabled={current === 0}
                    className="h-10 w-10 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous slide</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => api?.scrollNext()}
                    disabled={current === aboutSlides.length - 1}
                    className="h-10 w-10 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next slide</span>
                  </Button>
                </div>
                
                <div className="flex gap-2 ml-auto lg:ml-4">
                  {aboutSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        current === index 
                          ? "w-8 bg-primary" 
                          : "w-2 bg-primary/20 hover:bg-primary/40"
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Carousel>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button asChild className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Link href="/about/history">
                  Explore History & Milestones
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
