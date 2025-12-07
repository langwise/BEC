"use client";

import Image from "next/image";
import { FadeIn } from "../animations/fade-in";
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lifeHighlights } from "@/data/home/campus";

export function CampusLifeSection() {
  return (
    <section className="py-16 lg:py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Life at BEC
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Beyond the classrooms, BEC offers a vibrant campus life powered by
            student-led clubs, massive cultural fests, and a tight-knit
            community on our 93-acre green campus.
          </p>
        </FadeIn>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] mb-20">
          {lifeHighlights.map((item, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-2xl ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-white/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Bar */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Stay Connected
            </h3>
            <p className="text-gray-600">
              Follow our social channels for the latest updates and campus
              vibes.
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-2 hover:border-primary"
            >
              <Instagram className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-2 hover:border-primary"
            >
              <Twitter className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-2 hover:border-primary"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-2 hover:border-primary"
            >
              <Facebook className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
