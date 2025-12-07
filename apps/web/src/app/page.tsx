"use client";

import { ProgrammesSection } from "@/components/home/programmes-section";
import { StatsSection } from "@/components/home/stats-section";
import { HeroBanner } from "@/components/home/hero-banner";
import { CampusLifeSection } from "@/components/home/campus-life-section";
import { SocialMediaSidebar } from "@/components/home/social-media-sidebar";
import { PlacementsSection } from "@/components/home/placements-section";
import { NewsAnnouncementsSection } from "@/components/home/news-announcements-section";
import { AlumniTestimonialsSection } from "@/components/home/alumni-testimonials";

export default function Home() {
  return (
    <main>
      <SocialMediaSidebar />
      <div className="relative [clip-path:inset(0)]">
        <HeroBanner />
        <NewsAnnouncementsSection />
        <StatsSection />
        <PlacementsSection />
        <CampusLifeSection />
        <AlumniTestimonialsSection />
        <ProgrammesSection />
      </div>
    </main>
  );
}
