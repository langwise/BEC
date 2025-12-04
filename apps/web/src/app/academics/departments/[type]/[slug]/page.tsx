import ContentSection from "@/components/academics/departments/content";
import DepartmentSidebar from "@/components/academics/departments/sidebar";
import { getDepartmentData } from "@/data/department/department";

// ⭐ SERVER COMPONENT (NO "use client")
export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;

  const dept = getDepartmentData(type, slug);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <DepartmentSidebar />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-linear-to-r from-primary to-primary/90 text-white py-16">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <h1 className="text-5xl font-bold">{dept.name}</h1>
            <p className="mt-4 text-xl text-white/90">{dept.tagline}</p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl py-16">
          <ContentSection
            title={dept.overview.title}
            content={dept.overview.content}
            icon={dept.overview.icon}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <ContentSection
              title={dept.vision.title}
              content={dept.vision.content}
              icon={dept.vision.icon}
            />

            <ContentSection
              title={dept.mission.title}
              content={dept.mission.content}
              icon={dept.mission.icon}
            />
          </div>

          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            Highlights
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dept.highlights.map((h, i) => (
              <li
                key={i}
                className="p-4 bg-white border rounded-lg text-gray-700"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
