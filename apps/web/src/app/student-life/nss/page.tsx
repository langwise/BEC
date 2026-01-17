"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Users,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  User,
} from "lucide-react";

const activities = [
  {
    title: "Swachh Bharat",
    description:
      "Campus and village cleaning drives, sanitation awareness rallies.",
    icon: Users,
  },
  {
    title: "Health Camps",
    description:
      "Organizing blood donation camps and free health checkups for villagers.",
    icon: Heart,
  },
  {
    title: "Environment",
    description:
      "Tree plantation drives (Vanamahotsava) and water conservation awareness.",
    icon: MapPin,
  },
  {
    title: "Disaster Relief",
    description:
      "Volunteering for flood relief, providing food and first aid to victims.",
    icon: Award,
  },
];

const milestones = [
  "Launched in 1969 (Gandhiji's Centenary Year).",
  "Established at BEC in 1995.",
  "Functioning under VTU NSS Cell since 2000.",
  "Participated in Swachh Bharat Summer Internship - 2018.",
];

const reports = [
  "2022-2023",
  "2021-2022",
  "2020-2021",
  "2019-2020",
  "2018-2019",
];

export default function NssPage() {
  return (
    <div className="space-y-6 md:space-y-12">
      <PageHeader
        title="National Service Scheme (NSS)"
        description='"Not Me But You" - Developing personality through community service.'
      />

      {/* Introduction & Motto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center"
      >
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            Service to <span className="text-red-600">Humanity</span> is Service
            to God
          </h2>
          <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
            The NSS unit at Basaveshwar Engineering College has been active
            since 1995. We aim to instill the idea of social welfare in
            students, encouraging them to provide service to society without
            bias. Through volunteerism, students learn the realities of rural
            life and the dignity of labor.
          </p>
          <div className="bg-red-50 border-l-4 border-red-600 p-4 md:p-6 rounded-r-xl">
            <blockquote className="text-base md:text-lg font-serif italic text-slate-700 mb-2">
              "The welfare of an individual is ultimately dependent on the
              welfare of the society as a whole."
            </blockquote>
            <cite className="text-xs md:text-sm font-bold text-red-700 not-italic block">
              — NSS Motto: NOT ME BUT YOU
            </cite>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6">
          <Card className="bg-linear-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl">
            <CardHeader className="py-4 md:py-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                Certification Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0 md:pt-0">
              <div className="flex items-center justify-between p-2 md:p-3 bg-white/10 rounded-lg text-sm md:text-base">
                <span>Regular Activities</span>
                <span className="font-bold font-mono">120 Hours</span>
              </div>
              <div className="flex items-center justify-between p-2 md:p-3 bg-white/10 rounded-lg text-sm md:text-base">
                <span>Annual Special Camp</span>
                <span className="font-bold font-mono">120 Hours</span>
              </div>
              <div className="pt-3 md:pt-4 border-t border-slate-700/50 text-xs md:text-sm text-slate-300">
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-400 inline mr-1 md:mr-2" />
                Volunteers serving 2+ years and 240 hours are entitled to a
                university certificate signed by the Vice-Chancellor.
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Activities Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-8 flex items-center gap-2">
          <MapPin className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
          Key Activities & Impact
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {activities.map((act, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-red-500"
            >
              <CardContent className="p-4 md:p-6">
                <act.icon className="w-8 h-8 md:w-10 md:h-10 text-red-100 fill-red-600 mb-3 md:mb-4" />
                <h3 className="font-bold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">{act.title}</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {act.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Coordinator & History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid lg:grid-cols-3 gap-6 md:gap-8"
      >
        <Card className="lg:col-span-1 border-slate-200">
          <CardHeader className="py-4 md:py-6">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <User className="w-5 h-5 text-red-600" />
              Programme Officer
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
            <div className="text-center p-4 md:p-6 bg-slate-50 rounded-xl mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-200 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center text-slate-400">
                <User className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900">
                Dr. S. K. Patil
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-semibold">
                Coordinator, NSS
              </p>
              <div className="mt-3 md:mt-4 space-y-1 text-xs text-slate-600">
                <p>Dept. of Chemistry</p>
                <p>Basaveshwar Engineering College (A)</p>
                <p>Bagalkot - 587 102</p>
              </div>
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-200 space-y-1 text-xs">
                <p className="font-semibold text-slate-900">
                  Mobile:{" "}
                  <span className="text-slate-600 font-normal">9448766350</span>
                </p>
                <p className="font-semibold text-slate-900">
                  Email:{" "}
                  <a
                    href="mailto:skpch@becbgk.edu"
                    className="text-red-600 hover:underline"
                  >
                    skpch@becbgk.edu
                  </a>
                </p>
              </div>
            </div>
            <div className="text-sm text-slate-600 text-center hidden">
              Coordinates all unit activities and reports to the regional NSS
              coordinator.
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-red-50 bg-red-50/30">
          <CardHeader className="py-4 md:py-6">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Calendar className="w-5 h-5 text-red-600" />
              Unit Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="flex gap-2 md:gap-3 bg-white p-3 md:p-4 rounded-lg shadow-sm border border-red-100"
                >
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 mt-1.5 md:mt-2 shrink-0" />
                  <span className="text-xs md:text-sm text-slate-700 font-medium">
                    {m}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 md:mt-6 text-xs md:text-sm text-slate-500">
              The unit also actively organizes major national festivals
              including Republic Day, Independence Day, Gandhi Jayanthi, and
              International Yoga Day.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reports Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
          NSS Reports
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {reports.map((year, idx) => (
            <div key={idx} className="group relative">
              <a href="#" className="block">
                <Card className="hover:shadow-lg transition-all duration-300 group-hover:bg-red-50 border-slate-200 group-hover:border-red-200">
                  <CardContent className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 group-hover:bg-white group-hover:text-red-600 flex items-center justify-center text-slate-500 mb-2 transition-colors">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="font-bold text-slate-900 group-hover:text-red-700 text-sm md:text-base">
                      {year}
                    </span>
                    <span className="text-[10px] md:text-xs text-slate-500 mt-1 group-hover:text-red-500">
                      View Report
                    </span>
                  </CardContent>
                </Card>
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
