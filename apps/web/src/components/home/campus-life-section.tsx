"use client";

import Image from "next/image";
import { FadeIn } from "../animations/fade-in";
import { Instagram, Twitter, Linkedin, Facebook, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lifeHighlights } from "@/data/home/campus";

export function CampusLifeSection() {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 mb-16">
            <FadeIn>
                <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    Student Life
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                    More than just <br /> <span className="text-primary">academics</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-xl font-medium leading-relaxed">
                    Beyond the classrooms, BEC offers a vibrant campus life powered by
                    student-led clubs, massive cultural fests, and a tight-knit
                    community on our 93-acre green campus.
                </p>
            </FadeIn>
            
            <div className="hidden lg:flex items-end justify-end">
                <Button variant="outline" className="h-12 px-8 rounded-full font-bold border-gray-200">
                    Explore Campus Life
                </Button>
            </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px] mb-20">
          {lifeHighlights.map((item, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-3xl ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-bold mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-white/80 font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                    {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Bar */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-xl shadow-orange-200 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-2">
              Stay Connected
            </h3>
            <p className="text-white/90 font-medium max-w-md">
              Follow our social channels for the latest updates, event snaps, and campus vibes.
            </p>
          </div>
          <div className="flex gap-4 relative z-10">
            {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <Button
                    key={i}
                    variant="outline"
                    size="icon"
                    className="rounded-full h-14 w-14 bg-white/10 border-white/20 hover:bg-white hover:text-primary text-white transition-all"
                >
                    <Icon className="h-6 w-6" />
                </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
