"use client";

import { PageHeader } from "@/components/placements/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Award,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function AboutResearchPage() {
  const researchData = [
    {
      id: 1,
      centre: "Biotechnology",
      est: 2010,
      guides: 4,
      scholars: 5,
      awarded: 9,
    },
    {
      id: 2,
      centre: "Civil Engg.",
      est: 2003,
      guides: 11,
      scholars: 18,
      awarded: 22,
    },
    {
      id: 3,
      centre: "Computer Science Engg.",
      est: 2004,
      guides: 11,
      scholars: 23,
      awarded: 13,
    },
    {
      id: 4,
      centre: "Electronics & Comm. Engg.",
      est: 2005,
      guides: 14,
      scholars: 18,
      awarded: 25,
    },
    {
      id: 5,
      centre: "Electrical & Electronics Engg.",
      est: 2003,
      guides: 4,
      scholars: 8,
      awarded: 13,
    },
    {
      id: 6,
      centre: "Industrial & Production",
      est: 2007,
      guides: 5,
      scholars: 13,
      awarded: 5,
    },
    {
      id: 7,
      centre: "Information Science Engg.",
      est: 2020,
      guides: 2,
      scholars: 2,
      awarded: 0,
    },
    {
      id: 8,
      centre: "Mechanical Engg.",
      est: 2003,
      guides: 9,
      scholars: 32,
      awarded: 53,
    },
    { id: 9, centre: "Physics", est: 2012, guides: 3, scholars: 3, awarded: 0 },
    { id: 10, centre: "MBA", est: 2020, guides: 1, scholars: 1, awarded: 0 },
  ];

  const stats = [
    {
      label: "Research Centres",
      value: "10",
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Guides",
      value: "64",
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Registered Scholars",
      value: "123",
      icon: GraduationCap,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      label: "Ph.D. Awarded",
      value: "140",
      icon: Award,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-600 to-amber-600 p-8 md:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-900/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Excellence in Innovation
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            About Research at BEC
          </h1>
          <p className="text-orange-50 max-w-2xl text-lg leading-relaxed">
            A hub of innovation fostering cutting-edge research across 10
            disciplines, driving technological advancement and societal impact.
          </p>
        </motion.div>
      </div>

      {/* Overview & Dean Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 space-y-6 text-slate-600 text-lg leading-relaxed"
        >
          <p>
            The college has well qualified faculty with{" "}
            <span className="font-semibold text-slate-900">
              87 faculty having Ph.D degrees
            </span>{" "}
            from IITs and NITs. Recognized as a QIP centre for Ph.D. admissions
            by MHRD, we have secured grants worth{" "}
            <span className="font-semibold text-slate-900">
              Rs. 3.00 Crores
            </span>{" "}
            in the last five years, apart from 40 Crores under TEQIP.
          </p>
          <p>
            High quality research facilities are available in Environmental
            Engg., Structural Engg., Renewable Energy, Materials, and Vision
            Computing. Collaborations with industry giants like Bosch Rexroth,
            Nokia, and Intel have opened new avenues for practical research.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center transform hover:-translate-y-1 transition-transform"
              >
                <div
                  className={cn(
                    "w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2",
                    stat.bg
                  )}
                >
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-500 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dean Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-1"
        >
          <div className="sticky top-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-amber-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
              <Card className="relative bg-white/80 backdrop-blur-xl border-orange-100 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-24 h-24 mx-auto bg-linear-to-br from-orange-100 to-white rounded-full p-1 shadow-inner mb-4">
                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                      <User className="w-12 h-12 text-slate-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    Dr. Mahabaleshwar S. K.
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
                    Dean R & D
                  </div>
                  <p className="text-slate-500 text-sm italic">
                    "Leading the charge in technical innovation and academic
                    excellence."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">
            Research Centre Statistics
          </h3>
          <span className="text-sm text-slate-500">Updated 2024</span>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                <TableHead className="w-[80px] font-bold text-slate-600 hidden md:table-cell">
                  ID
                </TableHead>
                <TableHead className="font-bold text-slate-600">
                  Research Centre
                </TableHead>
                <TableHead className="text-center font-bold text-slate-600">
                  Est. Year
                </TableHead>
                <TableHead className="text-center font-bold text-slate-600">
                  Guides
                </TableHead>
                <TableHead className="text-center font-bold text-slate-600">
                  Registered
                </TableHead>
                <TableHead className="text-right font-bold text-slate-600 pr-8">
                  Awarded
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {researchData.map((row, index) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-orange-50/30 transition-colors"
                >
                  <TableCell className="font-medium text-slate-400 hidden md:table-cell">
                    {row.id}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700">
                    {row.centre}
                  </TableCell>
                  <TableCell className="text-center text-slate-600">
                    <div className="inline-block px-2 py-1 bg-slate-100 rounded text-xs text-slate-500 font-mono">
                      {row.est}
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-slate-600">
                    {row.guides}
                  </TableCell>
                  <TableCell className="text-center text-slate-600">
                    {row.scholars}
                  </TableCell>
                  <TableCell className="text-right font-bold text-emerald-600 pr-8">
                    {row.awarded}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-slate-900 border-t-0">
              <TableRow className="hover:bg-slate-900">
                <TableCell
                  colSpan={3}
                  className="text-right text-slate-300 font-medium"
                >
                  Grand Total
                </TableCell>
                <TableCell className="text-center text-white font-bold text-lg">
                  64
                </TableCell>
                <TableCell className="text-center text-white font-bold text-lg">
                  123
                </TableCell>
                <TableCell className="text-right text-emerald-400 font-bold text-lg pr-8">
                  140
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}
