"use client";

import Link from "next/link";
import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lightbulb,
  Target,
  Users,
  Award,
  CheckCircle2,
  Hexagon,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const objectives = [
  {
    title: "Facilitating Entity",
    description:
      "To energize and position the student club as a primary facilitating entity for campus innovation.",
    icon: Zap,
    color: "text-amber-500",
  },
  {
    title: "Skill Development",
    description:
      "Pursue individual interests, creative work, and showcase talent while building organization and management skills.",
    icon: Lightbulb,
    color: "text-yellow-500",
  },
  {
    title: "Communication Platform",
    description:
      "Build communication skills, leadership qualities, and public speaking abilities through event management.",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Sustainability",
    description:
      "Reach out to alumni and industries for fund-raising to make the club self-sustainable.",
    icon: Hexagon,
    color: "text-green-500",
  },
];

const rules = [
  "Students on institute roll shall be the member of the club.",
  "Ex-students and ex-faculty members shall not be members.",
  "Membership is open for both UG and PG students.",
];

export default function MindhogPage() {
  return (
    <div className="space-y-6 md:space-y-12">
      <PageHeader
        title="Mindhog Club"
        description="Igniting creativity and ethics through the AICTE SPICES initiative. For the students, by the students."
      />

      {/* Introduction - SPICES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center"
      >
        <div className="space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] md:text-xs font-bold uppercase tracking-wider">
            <Award className="w-3 h-3 md:w-4 md:h-4" />
            AICTE SPICES Scheme
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            Fostering Interests, Creativity &{" "}
            <span className="text-purple-600">Ethics</span>
          </h2>
          <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
            We are proud to share that the "MindHogs" student club of BEC has
            been selected under the prestigious AICTE SPICES scheme. This
            initiative aims to promote healthy collaborative culture and provide
            a platform for students to think out of the box.
          </p>
          <div className="flex gap-3 md:gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200 text-sm md:text-base">
              Join Mindhog
            </Button>
            <Link href="/student-life/activities">
              <Button variant="outline" className="text-sm md:text-base">View Activities</Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-tr from-purple-200 to-fuchsia-200 rounded-3xl blur-2xl opacity-50" />
          <Card className="relative bg-white/80 backdrop-blur border-purple-100 shadow-xl">
            <CardContent className="p-4 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                Our Objectives
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {objectives.map((obj, i) => {
                  const Icon = obj.icon;
                  return (
                    <div key={i} className="group">
                      <div className="mb-2 md:mb-3 p-2 md:p-3 bg-slate-50 rounded-xl w-fit group-hover:bg-purple-50 transition-colors">
                        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${obj.color}`} />
                      </div>
                      <h4 className="font-bold text-slate-800 mb-1 md:mb-2 text-xs md:text-sm">
                        {obj.title}
                      </h4>
                      <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">
                        {obj.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Membership & Vision */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid lg:grid-cols-3 gap-6 md:gap-8"
      >
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 text-white border-none h-full overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl -mr-16 -mt-16" />
            <CardHeader className="py-4 md:py-6">
              <CardTitle className="relative z-10 text-lg md:text-xl">
                Vision for The Future
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4 md:space-y-6 pt-0 md:pt-0 p-4 md:p-6">
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                "The club is for the students and by the students. Together, we
                can develop a student community with strong communication skills
                and leadership qualities promoting innovative culture across the
                campus. It will help you to acquire requisite skills and enhance
                placement opportunities."
              </p>
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4 pt-4 border-t border-slate-700/50">
                <div className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xl md:text-2xl font-bold text-purple-400 mb-1">
                    Open
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-400 uppercase">
                    For UG & PG Students
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xl md:text-2xl font-bold text-fuchsia-400 mb-1">
                    Skills
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-400 uppercase">
                    Leadership & Innovation
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-purple-100 bg-purple-50/50">
          <CardHeader className="py-4 md:py-6">
            <CardTitle className="text-base md:text-lg flex items-center gap-2 text-purple-900">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
              Membership Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
            <ul className="space-y-3 md:space-y-4">
              {rules.map((rule, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 text-xs md:text-sm text-slate-700 bg-white p-3 rounded-lg shadow-sm border border-violet-100/50"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 md:mt-2 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
