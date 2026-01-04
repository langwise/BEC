"use client";

import { useState } from "react";
import DepartmentSidebar from "@/components/academics/departments/sidebar";
import { DepartmentData } from "@/data/department/department";
import ContentSection from "@/components/academics/departments/content";
import { CheckCircle2 } from "lucide-react";
import { FacultyCard } from "@/components/academics/faculty/faculty-card";
import { motion, AnimatePresence } from "motion/react";

interface DepartmentLayoutProps {
  dept: DepartmentData;
}

export function DepartmentLayout({ dept }: DepartmentLayoutProps) {
  const [activeTab, setActiveTab] = useState(dept.sidebar[0]?.id || "home");

  const renderContent = () => {
    // 1. HOME tab (Overview + Highlights)
    if (activeTab === "home") {
        return (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
             <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
        )
    }

    // 3. DYNAMIC SECTIONS
    // Find a section that matches the activeTab ID
    const activeSection = dept.sections?.find(s => s.id === activeTab);

    if (activeSection) {
         if (activeSection.type === "content") {
             return (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ContentSection
                        title={activeSection.title}
                        content={activeSection.content}
                        icon={activeSection.icon || "file-text"}
                    />
                 </div>
             )
         }
         if (activeSection.type === "faculty-list") {
             return (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <h2 className="text-2xl font-bold text-gray-900">{activeSection.title}</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {activeSection.faculty.map((member, fIndex) => (
                             <FacultyCard key={fIndex} profile={member} />
                         ))}
                     </div>
                 </div>
             )
         }
         // Add stats, gallery etc handlers here
    }

    // 4. FALLBACK
    return (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500">Content for <span className="font-semibold text-gray-700">"{activeTab}"</span> will be updated soon.</p>
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
