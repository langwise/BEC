"use client";

import { ProgrammesSection } from "@/components/home/programmes-section";
import { StatsSection } from "@/components/home/stats-section";
import { HeroBanner } from "@/components/home/hero-banner";
import { CampusLifeSection } from "@/components/home/campus-life-section";
import { PlacementsSection } from "@/components/home/placements-section";
import { AlumniTestimonialsSection } from "@/components/home/alumni-testimonials";
import { FollowUsSection } from "@/components/home/follow-us-section";
import { AboutSection } from "@/components/home/about-section";

export default function Home() {
  return (
    <main>
      <div className="relative [clip-path:inset(0)]">
        <HeroBanner />
        <FollowUsSection />
        <AboutSection />
        <ProgrammesSection />
        <PlacementsSection />
        <AlumniTestimonialsSection />
        <StatsSection />
        <CampusLifeSection />
      </div>
    </main>
  );
}
