import { PageHeader } from "@/components/placements/page-header"; // Reusing this convenient header
import { DepartmentLayout } from "@/components/academics/departments/department-layout";
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
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative">
      {/* Background Decorations */}
      {/* <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div> */}

      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50 py-14 md:py-18">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>

        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Academics · Departments · {dept.name}
          </p>
          <div className="mt-4 space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              {dept.name}
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              {dept.tagline}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        {/* Client Layout for Tabs */}
        <DepartmentLayout dept={dept} />
      </div>
    </div>
  );
}
