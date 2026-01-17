"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  User,
  Trophy,
  Medal,
  Flag,
  Target,
  Music,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const councilMembers = [
  {
    role: "Gymkhana Secretary",
    name: "Dr. Kirankumar B. Balavalad",
    dept: "Electronics & Communication Engg.",
    icon: Flag,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    role: "Cultural Secretary",
    name: "Dr. Manjula A. Sutagundar",
    dept: "Electronics & Computer Engg.",
    icon: Music,
    color: "text-pink-600",
    bg: "bg-pink-100",
  },
  {
    role: "Physical Director",
    name: "Prof. Ganesh G. Kori",
    dept: "Physical Education",
    icon: Trophy,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

const studentRoles = [
  { role: "General Secretary", count: 1 },
  { role: "Cultural Secretary", count: 1 },
  { role: "Sports Secretary", count: 1 },
  { role: "Ladies Representative", count: 2 },
  { role: "Class Representatives", count: "2/Class" },
];

export default function StudentCouncilPage() {
  return (
    <div className="space-y-6 md:space-y-12">
      <PageHeader
        title="Students' Gymkhana Council"
        description="The democratic voice of students. Fostering leadership, sportsmanship, and cultural vibrancy."
      />

      {/* Mission & Vision */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid lg:grid-cols-2 gap-6 md:gap-8"
      >
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Molding Character Through{" "}
            <span className="text-amber-600">Action</span>
          </h2>
          <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
            The Gymkhana ensures the holistic development of students by
            promoting co-curricular and extracurricular activities. It aims to
            inculcate discipline, team spirit, tolerance, and leadership
            qualities essential for professional life.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { title: "Leadership", icon: Target },
              { title: "Sportsmanship", icon: Medal },
              { title: "Team Spirit", icon: Users },
              { title: "Discipline", icon: ShieldCheckIcon },
            ].map((val, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 md:p-4 bg-white border border-slate-100 rounded-xl shadow-sm"
              >
                <val.icon className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                <span className="text-sm md:text-base font-semibold text-slate-800">
                  {val.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-linear-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl">
          <CardHeader className="py-4 md:py-6">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
              Use of Facilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0 md:pt-0">
            <div>
              <div className="text-[10px] md:text-sm text-slate-400 uppercase tracking-wider font-semibold mb-1 md:mb-2">
                Outdoor Sports
              </div>
              <div className="text-xl md:text-2xl font-bold text-white mb-1">
                5.00 Acres
              </div>
              <p className="text-slate-300 text-xs md:text-sm">
                Sprawling playground for Cricket, Football, Hockey, Athletics,
                and Tennis.
              </p>
            </div>
            <div className="w-full h-px bg-slate-700" />
            <div>
              <div className="text-[10px] md:text-sm text-slate-400 uppercase tracking-wider font-semibold mb-1 md:mb-2">
                Indoor Stadium
              </div>
              <div className="text-xl md:text-2xl font-bold text-white mb-1">
                Multi-Facility
              </div>
              <p className="text-slate-300 text-xs md:text-sm">
                3 Shuttle Badminton Courts, Table Tennis arena, Chess & Carrom
                zones.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Council Structure */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Gymkhana Committee
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Guided by experienced faculty and driven by energetic student
            leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {councilMembers.map((member, index) => {
            const Icon = member.icon;
            return (
              <Card
                key={index}
                className="border-t-4 border-t-amber-500 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center ${member.bg} ${member.color}`}
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900">
                    {member.name}
                  </h3>
                  <div className="text-xs md:text-sm font-semibold text-amber-600 mb-1">
                    {member.role}
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-500">{member.dept}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 md:p-8 border border-amber-100">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
            Student Representation
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {studentRoles.map((role, i) => (
              <div
                key={i}
                className="bg-white p-3 md:p-4 rounded-xl shadow-sm text-center border border-amber-100/50"
              >
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  {role.count}
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-slate-600 uppercase tracking-tight">
                  {role.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Gymkhana Reports */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            Gymkhana Activities Reports
          </h2>
        </div>
        <div className="grid gap-3 md:gap-4">
          {[
            "Gymkhana Activities 23-24",
            "Gymkhana Activities 22-23",
            "Gymkhana Activities 21-22",
            "Gymkhana Activities 20-21",
            "Gymkhana Activities 18-19",
          ].map((activity, index) => (
            <Button
              key={index}
              className="w-full justify-between h-12 md:h-14 bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 shadow-sm transition-all group"
            >
              <span className="font-semibold text-sm md:text-base truncate mr-2 text-left">{activity}</span>
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium text-slate-400 group-hover:text-blue-500 uppercase tracking-wider shrink-0">
                <span className="hidden sm:inline">View Report</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </Button>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function ShieldCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
