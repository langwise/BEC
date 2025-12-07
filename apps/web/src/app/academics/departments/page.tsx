"use client";

import { motion } from "motion/react";
import { ChevronRight, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/placements/page-header"; // Reusing the header component

// Department Data
const departmentsData = {
  ug: [
    "AI & ML",
    "Automobile Engg.",
    "Biotechnology",
    "Civil Engg.",
    "Computer Science & Engg.",
    "Electronics & Communication Engg.",
    "Electrical & Electronics Engg.",
    "Electronics & Computer Engg.",
    "Industrial & Production Engg.",
    "Information Science & Engg.",
  ],
  regular: [
    "Mechanical Engg.",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Humanities",
  ],
  pg: [
    "Environmental Engg.",
    "Geo-Technical Engg.",
    "Structural Engg.",
    "Machine Design",
    "MCA",
    "MBA",
  ],
};

// Helper — slugify names for URL paths
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function DepartmentCard({ name, type, index }: { name: string, type: string, index: number }) {
  const url = `/academics/departments/${type}/${slugify(name)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
        <Link
        href={url}
        className="group block h-full bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
        >
        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
        
        <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <GraduationCap className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 pr-4 group-hover:text-primary transition-colors">
                {name}
            </h3>
            
            <div className="flex items-center text-sm text-gray-500 font-medium group-hover:text-primary transition-colors mt-4">
                View Details <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
        </div>
        </Link>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{children}</h2>
            <div className="h-px flex-1 bg-gray-100"></div>
        </div>
    )
}

export default function DepartmentsPage() {
  const totalDepartments = departmentsData.ug.length + departmentsData.regular.length + departmentsData.pg.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative">
        {/* Background Decorations */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <PageHeader 
            title="Explore Our Departments" 
            description="Discover diverse programs in engineering, sciences, and management – each designed to empower future innovators and leaders."
        />

        {/* UG */}
        <section className="mb-16">
          <SectionTitle>Undergraduate Programs (UG)</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentsData.ug.map((dept, index) => (
              <DepartmentCard key={index} name={dept} type="ug" index={index} />
            ))}
          </div>
        </section>

        {/* Regular */}
        <section className="mb-16">
            <SectionTitle>Science & Humanities</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentsData.regular.map((dept, index) => (
              <DepartmentCard
                key={index}
                name={dept}
                type="regular"
                index={index}
              />
            ))}
          </div>
        </section>

        {/* PG */}
        <section className="mb-16">
            <SectionTitle>Postgraduate Programs (PG)</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentsData.pg.map((dept, index) => (
              <DepartmentCard key={index} name={dept} type="pg" index={index} />
            ))}
          </div>
        </section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 border border-orange-100 shadow-sm relative overflow-hidden"
        >
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
             
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 text-center gap-10 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">
                {totalDepartments}
              </p>
              <p className="text-gray-600 font-medium">Total Departments</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-5xl font-bold text-primary mb-2">
                {departmentsData.ug.length}
              </p>
              <p className="text-gray-600 font-medium">UG Programs</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-5xl font-bold text-primary mb-2">
                {departmentsData.pg.length}
              </p>
              <p className="text-gray-600 font-medium">PG Programs</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
