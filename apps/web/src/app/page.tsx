import { pageMetadata } from "@/lib/seo";

import { ProgrammesSection } from "@/components/home/programmes-section";
import { StatsSection } from "@/components/home/stats-section";
import { HeroBanner } from "@/components/home/hero-banner";
import { CampusLifeSection } from "@/components/home/campus-life-section";
import { PlacementsSection } from "@/components/home/placements-section";
import { FollowUsSection } from "@/components/home/follow-us-section";
import { AboutSection } from "@/components/home/about-section";

export const metadata = {
  ...pageMetadata({
    title: "Basaveshwar Engineering College, Bagalkote",
    description:
      "Basaveshwar Engineering College (Autonomous), Bagalkote — a B.V.V. Sangha institution established in 1963, affiliated to VTU, offering UG, PG and Ph.D. programmes across engineering, science and management.",
    path: "/",
  }),
  title: { absolute: "Basaveshwar Engineering College (Autonomous), Bagalkote" },
};

export default function Home() {
  return (
    <main>
      <div className="relative [clip-path:inset(0)]">
        <HeroBanner />
        <FollowUsSection />
        <AboutSection />
        <ProgrammesSection />
        <PlacementsSection />
        <StatsSection />
        <CampusLifeSection />
      </div>
    </main>
  );
}
