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
    <div className="space-y-12">
      <PageHeader
        title="National Service Scheme (NSS)"
        description='"Not Me But You" - Developing personality through community service.'
      />

      {/* Introduction & Motto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid lg:grid-cols-2 gap-8 items-center"
      >
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">
            Service to <span className="text-red-600">Humanity</span> is Service
            to God
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            The NSS unit at Basaveshwar Engineering College has been active
            since 1995. We aim to instill the idea of social welfare in
            students, encouraging them to provide service to society without
            bias. Through volunteerism, students learn the realities of rural
            life and the dignity of labor.
          </p>
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl">
            <blockquote className="text-lg font-serif italic text-slate-700 mb-2">
              "The welfare of an individual is ultimately dependent on the
              welfare of the society as a whole."
            </blockquote>
            <cite className="text-sm font-bold text-red-700 not-italic block">
              — NSS Motto: NOT ME BUT YOU
            </cite>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="bg-linear-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                Certification Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                <span>Regular Activities</span>
                <span className="font-bold font-mono">120 Hours</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                <span>Annual Special Camp</span>
                <span className="font-bold font-mono">120 Hours</span>
              </div>
              <div className="pt-4 border-t border-slate-700/50 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 inline mr-2" />
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
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-red-600" />
          Key Activities & Impact
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-red-500"
            >
              <CardContent className="p-6">
                <act.icon className="w-10 h-10 text-red-100 fill-red-600 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">{act.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
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
        className="grid lg:grid-cols-3 gap-8"
      >
        <Card className="lg:col-span-1 border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              Programme Officer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 bg-slate-50 rounded-xl mb-4">
              <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-400">
                <User className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Dr. S. K. Patil
              </h3>
              <p className="text-sm text-slate-500 font-semibold">
                Coordinator, NSS
              </p>
              <div className="mt-4 space-y-1 text-xs text-slate-600">
                <p>Dept. of Chemistry</p>
                <p>Basaveshwar Engineering College (A)</p>
                <p>Bagalkot - 587 102</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-1 text-xs">
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              Unit Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="flex gap-3 bg-white p-4 rounded-lg shadow-sm border border-red-100"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span className="text-sm text-slate-700 font-medium">
                    {m}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
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
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-red-600" />
          NSS Reports
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reports.map((year, idx) => (
            <div key={idx} className="group relative">
              <a href="#" className="block">
                <Card className="hover:shadow-lg transition-all duration-300 group-hover:bg-red-50 border-slate-200 group-hover:border-red-200">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-white group-hover:text-red-600 flex items-center justify-center text-slate-500 mb-2 transition-colors">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 group-hover:text-red-700">
                      {year}
                    </span>
                    <span className="text-xs text-slate-500 mt-1 group-hover:text-red-500">
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
