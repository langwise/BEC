"use client";

import dynamic from "next/dynamic";
import { ProgrammesSection } from "@/components/home/programmes-section";
import { StatsSection } from "@/components/home/stats-section";
import { ParallaxVideo } from "@/components/home/parallax-video";
import { ImpactSection } from "@/components/home/impact-section";
import { Information } from "@/components/home/Information";
import { Hero } from "@/components/home/hero";
import { CampusLifeSection } from "@/components/home/campus-life-section";
import { SocialMediaSidebar } from "@/components/home/social-media-sidebar";
import { EventsSection } from "@/components/home/events-section";
import { PlacementsSection } from "@/components/home/placements-section";
import { RankingsSection } from "@/components/home/ranking-section";
import { NewsSection } from "@/components/home/news-section";
import { AnnouncementsSection } from "@/components/home/announcement-section";

const Header = dynamic(
  () => import("@/components/header").then((m) => m.Header),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <main>
      <SocialMediaSidebar />
      <div className="relative [clip-path:inset(0)]">
        <ParallaxVideo />
        <Hero />
        <Information />
        {/* <Introduction /> */}
        {/* Announcements and Events */}
        {/* <NewsSection /> */}
        {/* Quick quantitative highlights (PhD faculty, placements) */}
        <RankingsSection />
        <NewsSection />
        <AnnouncementsSection />
        <EventsSection />
        <PlacementsSection />
        <StatsSection />
        {/* Deep dive into Research, Infrastructure, Alumni */}
        <ImpactSection />
        {/* Student clubs and Social Media */}
        <CampusLifeSection />
        {/* Academic Offerings Summary */}
        <ProgrammesSection />
      </div>
    </main>
  );
}
