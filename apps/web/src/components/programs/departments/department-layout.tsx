"use client";

import { useState } from "react";
import DepartmentSidebar from "@/components/programs/departments/sidebar";
import type { DataTable, DepartmentData } from "@/data/department/department";
import ContentSection from "@/components/programs/departments/content";
import { CheckCircle2, FileText, Download } from "lucide-react";
import { FacultyCard } from "@/components/programs/faculty/faculty-card";
import { PhotoGallery } from "@/components/common/photo-gallery";

interface DepartmentLayoutProps {
  dept: DepartmentData;
}

function DepartmentTables({ title, tables }: { title: string; tables: DataTable[] }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="space-y-8">
        {tables.map((table) => (
          <div key={table.title} className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900">{table.title}</h3>
            <div className="overflow-x-auto rounded-md border border-stone-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-stone-200 text-sm">
                <thead className="bg-stone-50">
                  <tr>
                    {table.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="min-w-[160px] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-600"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {table.rows.map((row, rowIndex) => (
                    <tr key={`${table.title}-${rowIndex}`} className="align-top">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${table.title}-${rowIndex}-${cellIndex}`}
                          className="min-w-[180px] px-4 py-3 leading-relaxed text-stone-700 first:font-medium first:text-gray-900"
                        >
                          {cell || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DepartmentLayout({ dept }: DepartmentLayoutProps) {
  const [activeTab, setActiveTab] = useState(dept.sidebar[0]?.id || "home");

  const renderContent = () => {
    // 1. HOME tab (Overview + Highlights)
    if (activeTab === "home") {
        return (
            <div className="space-y-4">
                {dept.quickStats && dept.quickStats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {dept.quickStats.map((stat, i) => (
                            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                                <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}
                <ContentSection
                    title={dept.overview.title}
                    content={dept.overview.content}
                    icon={dept.overview.icon}
                />
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
        )
    }

    // 2. VISION/MISSION (Often mapped to 'about' or separate tabs)
    // Let's assume 'about' shows Vision + Mission
    if (activeTab === "about") {
        return (
             <div className="grid grid-cols-1 gap-8">
                <ContentSection
                    title={dept.vision.title}
                    content={dept.vision.content}
                    icon={dept.vision.icon}
                />

                <ContentSection
                    title={dept.mission.title}
                    content={dept.mission.content}
                    items={dept.mission.items}
                    icon={dept.mission.icon}
                />
            </div>
        )
    }

    // 3. DYNAMIC SECTIONS
    // Find a section that matches the activeTab ID
    const activeSection = dept.sections?.find(s => s.id === activeTab);

    if (activeSection) {
         if (activeSection.type === "content") {
             return (
                 <div>
                    <ContentSection
                        title={activeSection.title}
                        content={activeSection.content}
                        items={activeSection.items}
                        groups={activeSection.groups}
                        icon={activeSection.icon || "file-text"}
                    />
                 </div>
             )
         }
         if (activeSection.type === "faculty-list") {
             return (
                 <div className="space-y-6">
                     <h2 className="text-2xl font-bold text-gray-900">{activeSection.title}</h2>
                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                         {activeSection.faculty.map((member, fIndex) => (
                             <FacultyCard key={fIndex} member={member} />
                         ))}
                     </div>
                 </div>
             )
         }
         if (activeSection.type === "documents") {
             return (
                 <div className="space-y-6">
                     <h2 className="text-2xl font-bold text-gray-900">{activeSection.title}</h2>
                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                         {activeSection.documents.map((doc, i) => (
                             <a
                                 key={i}
                                 href={doc.url}
                                 target="_blank"
                                 rel="noreferrer"
                                 className="group flex items-center gap-3 rounded-md border border-stone-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                             >
                                 <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-orange-50 text-primary">
                                     <FileText className="h-5 w-5" />
                                 </span>
                                 <span className="min-w-0 flex-1 text-sm font-medium text-gray-900 group-hover:text-primary">
                                     {doc.title}
                                 </span>
                                 <Download className="h-4 w-4 shrink-0 text-stone-400 group-hover:text-primary" />
                             </a>
                         ))}
                     </div>
                 </div>
             )
         }
         if (activeSection.type === "tables") {
             return <DepartmentTables title={activeSection.title} tables={activeSection.tables} />
         }
         if (activeSection.type === "gallery") {
             return (
                 <div className="space-y-6">
                     <h2 className="text-2xl font-bold text-gray-900">{activeSection.title}</h2>
                     <PhotoGallery images={activeSection.images} />
                 </div>
             )
         }
         if (activeSection.type === "stats") {
             return (
                 <div className="space-y-6">
                     <h2 className="text-2xl font-bold text-gray-900">{activeSection.title}</h2>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {activeSection.stats.map((stat, i) => (
                             <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                                 <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                                 <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{stat.label}</p>
                             </div>
                         ))}
                     </div>
                 </div>
             )
         }
    }

    // 4. FALLBACK
    return (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">Content for <span className="font-semibold text-gray-700">&ldquo;{activeTab}&rdquo;</span> will be updated soon.</p>
        </div>
    )
  }

  return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar with Controled State */}
            <DepartmentSidebar 
                items={dept.sidebar} 
                activeId={activeTab} 
                onSelect={setActiveTab} 
            />

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
                {renderContent()}
            </main>
        </div>
  );
}
