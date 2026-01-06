// src/components/academics/academic-calendar-section.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Download,
  FileText,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CalendarItem {
  id: number;
  title: string;
  semester: string;
  programmes: string[];
  year: string;
  pdfUrl: string;
  featured: boolean;
}

interface AcademicCalendarSectionProps {
  data: {
    currentYear: string;
    calendars: CalendarItem[];
  };
}

export function AcademicCalendarSection({
  data,
}: AcademicCalendarSectionProps) {
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedSemester, setSelectedSemester] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique years and semesters
  const years = [
    "All",
    ...Array.from(new Set(data.calendars.map((cal) => cal.year))),
  ];
  const semesters = ["All", "Odd Semester", "Even Semester"];

  // Filter calendars
  const filteredCalendars = data.calendars.filter((calendar) => {
    const yearMatch = selectedYear === "All" || calendar.year === selectedYear;
    const semesterMatch =
      selectedSemester === "All" || calendar.semester === selectedSemester;
    return yearMatch && semesterMatch;
  });

  const featuredCalendars = filteredCalendars.filter((cal) => cal.featured);
  const archivedCalendars = filteredCalendars.filter((cal) => !cal.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-linear-to-br from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-10 h-10 text-white" />
              <span className="text-white/90 text-sm font-semibold uppercase tracking-widest">
                Academic Year {data.currentYear}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Academic Calendar
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Access semester-wise academic calendars, important dates,
              examination schedules, and events for all programmes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-stone-200 sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">
                Filter Calendars
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Year Filter */}
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none bg-stone-50 border border-stone-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* Semester Filter */}
              <div className="relative">
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="appearance-none bg-stone-50 border border-stone-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                  {semesters.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* Reset Button */}
              {(selectedYear !== "All" || selectedSemester !== "All") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedYear("All");
                    setSelectedSemester("All");
                  }}
                  className="text-sm"
                >
                  Reset Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Calendars */}
      {featuredCalendars.length > 0 && (
        <section className="py-16 bg-stone-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Current Academic Calendars
              </h2>
              <p className="text-gray-600">
                Academic year {data.currentYear} - Active calendars
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredCalendars.map((calendar, index) => (
                <CalendarCard
                  key={calendar.id}
                  calendar={calendar}
                  index={index}
                  featured={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Archived Calendars */}
      {archivedCalendars.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Previous Academic Calendars
              </h2>
              <p className="text-gray-600">
                Archived calendars from previous academic years
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivedCalendars.map((calendar, index) => (
                <CalendarCard
                  key={calendar.id}
                  calendar={calendar}
                  index={index}
                  featured={false}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredCalendars.length === 0 && (
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No calendars found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more results
            </p>
            <Button
              onClick={() => {
                setSelectedYear("All");
                setSelectedSemester("All");
              }}
            >
              Reset Filters
            </Button>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-stone-200 text-center"
          >
            <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Need Help with Academic Calendar?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              For any queries regarding academic schedules, examination dates,
              or events, please contact the Controller of Examinations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:coe@becbgk.edu">
                <Button variant="default" size="lg">
                  Contact COE
                </Button>
              </a>
              <a href="/academics/departments">
                <Button variant="outline" size="lg">
                  View Departments
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function CalendarCard({
  calendar,
  index,
  featured,
}: {
  calendar: CalendarItem;
  index: number;
  featured: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col ${
        featured ? "ring-2 ring-primary/20" : ""
      }`}
    >
      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {featured && (
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                Current
              </span>
            )}
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
              {calendar.title}
            </h3>
          </div>
        </div>

        {/* Meta Information */}
        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-700">Year:</span>
            <span className="text-gray-600">{calendar.year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-700">Semester:</span>
            <span className="text-gray-600">{calendar.semester}</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-gray-700 block mb-2">
              Programmes:
            </span>
            <div className="flex flex-wrap gap-2">
              {calendar.programmes.map((programme, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-stone-100 text-gray-700 text-xs rounded"
                >
                  {programme}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <a
            href={calendar.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors group/button"
          >
            <FileText className="w-5 h-5" />
            <span>View PDF</span>
          </a>
          <a
            href={calendar.pdfUrl}
            download
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors group/button"
          >
            <Download className="w-5 h-5 group-hover/button:animate-bounce" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
