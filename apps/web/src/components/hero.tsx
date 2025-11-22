import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full h-[600px] bg-secondary overflow-hidden">
      <div className="absolute inset-0">
        <img src="/modern-university-campus.png" alt="Campus hero" className="w-full h-full object-cover opacity-40" />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-balance leading-tight">
            Excellence in Education & Research
          </h1>
          <p className="text-xl text-white/90 text-pretty leading-relaxed">
            Shaping future leaders through innovation, dedication, and academic excellence. Join us in our mission to
            create a better tomorrow.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Explore Programmes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
            >
              Campus Tour
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
