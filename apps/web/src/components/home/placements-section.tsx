"use client";

import { FadeIn } from "../animations/fade-in";
import { Button } from "@/components/ui/button";
import {
  placementStats,
  topRecruiters,
  recruitersSheet,
} from "@/data/home/placements";
import { asset } from "@/lib/assets";
import { ArrowRight, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PlacementsSection() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden bg-linear-to-br from-orange-50/50 via-white to-stone-50">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 lg:px-6 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-10">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <Briefcase className="w-3.5 h-3.5" />
                Career & Placements
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                Launch your career with{" "}
                <span className="text-primary">industry leaders</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-xl text-justify">
                Our rigorous training and strong recruiter network ensure you
                step confidently into roles across technology, consulting, and
                core engineering.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="flex flex-wrap gap-4">
              <Button
                asChild
                className="h-12 px-8 rounded-full text-base font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <Link href="/placements">Placement Brochure</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 px-8 rounded-full text-base font-bold border-gray-200 hover:bg-gray-50 hover:text-primary"
              >
                <Link href="/placements#recruiters">Our Recruiters</Link>
              </Button>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {placementStats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Recruiters */}
          <FadeIn delay={0.4} direction="left">
            <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-gray-100 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">
                  Top Recruiters
                </h3>
                <Link
                  href="/placements#recruiters"
                  className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <Image
                src={asset(recruitersSheet.src)}
                alt={`Esteemed recruiters of Basaveshwar Engineering College, Bagalkote, including ${topRecruiters
                  .slice(0, 12)
                  .join(", ")} and more`}
                width={recruitersSheet.width}
                height={recruitersSheet.height}
                sizes="(max-width: 1024px) 90vw, 640px"
                className="w-full h-auto rounded-xl"
              />
              <ul className="sr-only">
                {topRecruiters.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-gray-50 text-center">
                <p className="text-sm text-gray-500 font-medium">
                  <span className="text-gray-900 font-bold">60+</span> companies
                  recruit across IT, core engineering and consulting
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
