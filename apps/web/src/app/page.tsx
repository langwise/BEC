import { Header } from "@/components/header";
import { NewsSection } from "@/components/news-section";
import { ProgrammesSection } from "@/components/programmes-section";
import { StatsSection } from "@/components/stats-section";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { ParallaxVideo } from "@/components/parallax-video";
import { ImpactSection } from "@/components/impact-section";
import { Introduction } from "@/components/introduction";
import { Information } from "@/components/Information";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative [clip-path:inset(0)]">
        <ParallaxVideo />
        <Hero />
        <Information />
        <Introduction />
        <ImpactSection />
        <StatsSection />
        <NewsSection />
        <ProgrammesSection />
      </main>

      <Footer />
    </div>
  );
}
