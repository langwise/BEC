import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, FlaskConical, Users } from "lucide-react"

const programmes = [
  {
    icon: GraduationCap,
    title: "Undergraduate Programmes",
    description: "World-class UG programmes across multiple disciplines preparing students for successful careers.",
    count: "25+ Programmes",
  },
  {
    icon: BookOpen,
    title: "Postgraduate Programmes",
    description: "Advanced PG programmes fostering specialization and research excellence in diverse fields.",
    count: "40+ Programmes",
  },
  {
    icon: FlaskConical,
    title: "Research Programmes",
    description: "PhD and M.Tech research opportunities driving innovation and discovery in cutting-edge areas.",
    count: "15+ Research Areas",
  },
  {
    icon: Users,
    title: "Student Community",
    description: "Vibrant campus life with diverse activities, clubs, and opportunities for holistic development.",
    count: "5000+ Students",
  },
]

export function ProgrammesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">Academic Excellence</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            Discover our comprehensive range of academic programmes designed to nurture talent and inspire innovation
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programmes.map((programme, index) => {
            const Icon = programme.icon
            return (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{programme.title}</CardTitle>
                  <CardDescription className="text-primary font-semibold">{programme.count}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{programme.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
