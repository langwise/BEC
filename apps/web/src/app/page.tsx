import { Header } from "@/components/header";
import { NewsSection } from "@/components/home/news-section";
import { ProgrammesSection } from "@/components/home/programmes-section";
import { StatsSection } from "@/components/home/stats-section";
import { Footer } from "@/components/footer";
import { ParallaxVideo } from "@/components/home/parallax-video";
import { ImpactSection } from "@/components/home/impact-section";
import { Introduction } from "@/components/home/introduction";
import { Information } from "@/components/home/Information";
import { Hero } from "@/components/home/hero";
import { CampusLifeSection } from "@/components/home/campus-life-section";
import { SocialMediaSidebar } from "@/components/home/social-media-sidebar";
import { EventsSection } from "@/components/home/events-section";
import { PlacementsSection } from "@/components/home/placements-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <SocialMediaSidebar />
      <main className="relative [clip-path:inset(0)]">
        <ParallaxVideo />
        <Hero />
        <Information />
        <Introduction />
        {/* Announcements and Events */}
        <NewsSection />
        {/* Quick quantitative highlights (PhD faculty, placements) */}
        <EventsSection />
        <PlacementsSection />
        <StatsSection />
        {/* Deep dive into Research, Infrastructure, Alumni */}
        <ImpactSection />
        {/* Student clubs and Social Media */}
        <CampusLifeSection />
        {/* Academic Offerings Summary */}
        <ProgrammesSection />
      </main>

      <Footer />
    </div>
  );
}
