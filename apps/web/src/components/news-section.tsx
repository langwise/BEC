import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"

const newsItems = [
  {
    title: "Research Breakthrough in Advanced Materials",
    date: "January 15, 2025",
    description:
      "Faculty members achieve groundbreaking results in sustainable materials research with international collaboration.",
    image: "/laboratory-research-equipment.png",
  },
  {
    title: "International Conference 2025 Announced",
    date: "January 10, 2025",
    description: "Institute to host prestigious international conference on emerging technologies and innovation.",
    image: "/conference-hall-gathering.png",
  },
  {
    title: "New PhD Programmes Launched",
    date: "January 5, 2025",
    description:
      "Five new doctoral programmes introduced in cutting-edge fields of study for the upcoming academic year.",
    image: "/graduation-ceremony-students.jpg",
  },
]

export function NewsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Latest News</h2>
            <p className="text-muted-foreground text-lg">Stay updated with our recent achievements and announcements</p>
          </div>
          <Button variant="outline" className="hidden md:flex bg-transparent">
            View All News
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  {item.date}
                </div>
                <CardTitle className="text-xl leading-tight">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="text-primary p-0">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex justify-center md:hidden">
          <Button variant="outline">
            View All News
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
