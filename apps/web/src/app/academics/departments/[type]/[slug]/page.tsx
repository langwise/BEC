import ContentSection from "@/components/academics/departments/content";
import DepartmentSidebar from "@/components/academics/departments/sidebar";
import { getDepartmentData } from "@/data/department/department";
import { PageHeader } from "@/components/placements/page-header"; // Reusing this convenient header
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

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
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Sidebar */}
             <DepartmentSidebar />

             {/* Main Content */}
             <main className="flex-1 min-w-0">
                {/* Header */}
                 <PageHeader 
                    title={dept.name}
                    description={dept.tagline}
                    className="mb-10 border-b border-orange-100 pb-10"
                 />

                {/* Content Blocks */}
                 <div className="space-y-4">
                     <ContentSection
                        title={dept.overview.title}
                        content={dept.overview.content}
                        icon={dept.overview.icon}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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

                    {/* Highlights */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Department Highlights</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {dept.highlights.map((h, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors"
                            >
                                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <span className="text-gray-700 font-medium">{h}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                 </div>
             </main>
        </div>
      </div>
    </div>
  );
}
