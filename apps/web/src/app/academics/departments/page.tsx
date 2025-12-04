"use client";

import { motion } from "motion/react";
import { ChevronRight, GraduationCap } from "lucide-react";

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

// ---------------- COMPONENTS ----------------

// Category Header Badge
function CategoryBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-6 py-2 bg-white shadow-md rounded-full border border-gray-200">
      <span className="w-3 h-3 rounded-full bg-primary"></span>
      <p className="text-lg font-semibold text-gray-700 tracking-wide">
        {label}
      </p>
    </div>
  );
}

// Department Card
function DepartmentCard({ name, type, index }: any) {
  const url = `/academics/departments/${type}/${slugify(name)}`;

  return (
    <motion.a
      href={url}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="group block bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 
      hover:shadow-2xl hover:border-primary/40 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl bg-primary/10 flex justify-center items-center 
          group-hover:bg-primary/20 transition-colors"
          >
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </motion.a>
  );
}

// ---------------- MAIN PAGE ----------------

export default function DepartmentsPage() {
  const totalDepartments =
    departmentsData.ug.length +
    departmentsData.regular.length +
    departmentsData.pg.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* HERO SECTION */}
      <section className="relative bg-linear-to-r from-primary to-primary/80 text-white py-20">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-cover"></div>
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              Explore Our Departments
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
              Discover diverse programs in engineering, sciences, and management
              – each designed to empower future innovators and leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl py-16">
        {/* UG */}
        <section className="mb-20">
          <CategoryBadge label="Undergraduate Programs (UG)" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {departmentsData.ug.map((dept, index) => (
              <DepartmentCard key={index} name={dept} type="ug" index={index} />
            ))}
          </div>
        </section>

        {/* Regular */}
        <section className="mb-20">
          <CategoryBadge label="Science & Humanities" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
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
        <section className="mb-20">
          <CategoryBadge label="Postgraduate Programs (PG)" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
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
          className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-12 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-10">
            <div>
              <p className="text-6xl font-bold text-primary">
                {totalDepartments}
              </p>
              <p className="text-gray-700 text-lg mt-2">Total Departments</p>
            </div>
            <div>
              <p className="text-6xl font-bold text-primary">
                {departmentsData.ug.length}
              </p>
              <p className="text-gray-700 text-lg mt-2">UG Programs</p>
            </div>
            <div>
              <p className="text-6xl font-bold text-primary">
                {departmentsData.pg.length}
              </p>
              <p className="text-gray-700 text-lg mt-2">PG Programs</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
