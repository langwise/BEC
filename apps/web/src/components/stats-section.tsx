export function StatsSection() {
  const stats = [
    { value: "50+", label: "Years of Excellence" },
    { value: "5000+", label: "Students Enrolled" },
    { value: "300+", label: "Faculty Members" },
    { value: "100+", label: "Research Projects" },
  ]

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-primary-foreground/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
