import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { NewsSection } from "@/components/news-section"
import { ProgrammesSection } from "@/components/programmes-section"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <NewsSection />
        <ProgrammesSection />
      </main>
      <Footer />
    </div>
  )
}
