"use client";

import { motion } from "motion/react";
import { FadeIn } from "@/components/animations/fade-in";
import { PageHeader } from "@/components/placements/page-header";
import {
  Trophy,
  Target,
  Lightbulb,
  GraduationCap,
  Users,
  Building2,
  Award,
  BookOpen,
  History,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutUsPage() {
  const visionMission = {
    vision:
      "To be an institution of excellence in education, research and innovation for sustainable future",
    mission: [
      "Develop globally competent professionals for future talent requirements",
      "Nurture a culture of research, Innovation and entrepreneurship",
      "Promote collaborations, extension and outreach programs for addressing industrial and societal needs",
      "Imbibe moral and ethical values",
      "Foster ecological and environmental consciousness",
    ],
  };

  const milestones = [
    {
      year: "1963",
      title: "Foundation",
      desc: "Established with 3 Engineering programs",
    },
    {
      year: "1968",
      title: "Government Recognition",
      desc: "Received grant-in-aid code",
    },
    {
      year: "1983-2003",
      title: "Phase II Expansion",
      desc: "7 UG & 4 PG programs added",
    },
    {
      year: "2004-2009",
      title: "TEQIP-I",
      desc: "Rs. 14.16 crores grant received",
    },
    {
      year: "2007",
      title: "Autonomous Status",
      desc: "Granted by UGC, New Delhi",
    },
    { year: "2011", title: "TEQIP-II", desc: "Rs. 12.50 crores for R&D" },
    {
      year: "2019-20",
      title: "NIRF Ranking",
      desc: "Rank band 201-250 nationally",
    },
  ];

  const achievements = [
    { icon: Trophy, title: "NIRF Ranking", desc: "201-250 at All India Level" },
    { icon: GraduationCap, title: "Academic Programs", desc: "9 UG & 8 PG Programmes" },
    { icon: Building2, title: "R&D Centers", desc: "10 VTU Recognized Departments" },
    { icon: Lightbulb, title: "AICTE IDEA Lab", desc: "Worth Rs. 1.10 Crores" },
    { icon: Award, title: "TEQIP Excellence", desc: "Best Performing Institute" },
    { icon: Users, title: "Mentorship", desc: "Under UGC Paramarsh Scheme" },
  ];

  const credentials = [
    "NBA Accredited",
    "NAAC Accredited",
    "QS I-Gauge Certified",
    "AICTE-CII Gold Category",
    "E-Lead Certified",
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="About BEC"
        description="Six decades of excellence in technical education and innovation."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Institute", href: "/institute" },
          { label: "About Us", href: "/institute/about", active: true },
        ]}
      />

      {/* Vision & Mission Section */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Vision */}
            <FadeIn delay={0.1} className="h-full">
              <div className="h-full bg-linear-to-br from-primary via-orange-600 to-orange-700 p-10 lg:p-12 rounded-3xl shadow-xl shadow-orange-200 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">Vision</h2>
                  </div>
                  <p className="text-xl lg:text-2xl font-medium leading-relaxed opacity-95">
                    "{visionMission.vision}"
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Mission */}
            <FadeIn delay={0.2} className="h-full">
              <div className="h-full bg-stone-50 border border-stone-200 p-10 lg:p-12 rounded-3xl flex flex-col relative overflow-hidden group hover:border-orange-200 transition-colors duration-300">
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="p-3 bg-orange-100 rounded-xl text-primary">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">Mission</h2>
                </div>
                <ul className="space-y-4 flex-1">
                  {visionMission.mission.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-700 font-medium">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                            {idx + 1}
                        </span>
                        <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Legacy & History Section */}
      <section className="py-20 bg-stone-50/50 border-y border-stone-100">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Our Legacy
            </h2>
            <div className="prose prose-lg text-gray-600 mx-auto leading-relaxed max-w-4xl text-center">
              <p>
                <span className="font-bold text-primary">Basaveshwar Engineering College (BEC), Bagalkot</span> has been a beacon of technical education since 1963. Starting with just three branches, we have grown into a premier autonomous institution offering 9 UG and 8 PG programmes.
              </p>
            </div>
            
            {/* Credentials Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
                {credentials.map((cred, i) => (
                    <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 shadow-sm text-sm font-semibold text-gray-700 hover:border-primary/50 hover:text-primary transition-colors cursor-default">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {cred}
                    </div>
                ))}
            </div>

          </FadeIn>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto py-12">
              {/* Central Line */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-4 lg:left-1/2 top-0 w-0.5 lg:-ml-[1px] bg-orange-200/50 h-full"
              />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={cn(
                            "relative flex flex-col lg:flex-row gap-8 lg:gap-0",
                            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                        )}
                    >
                        {/* Content Side */}
                        <div className="lg:w-1/2 lg:px-12 pl-12">
                            <div className={cn("flex flex-col", index % 2 !== 0 && "lg:items-end lg:text-right")}>
                                <div className="text-5xl font-bold text-orange-100 select-none mb-2">{milestone.year}</div>
                                <div className="relative">
                                    <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                                    <p className="text-gray-600 font-medium leading-relaxed mt-2">{milestone.desc}</p>
                                </div>
                            </div>
                        </div>

                        {/* Center Dot */}
                        <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                            className="absolute left-4 lg:left-1/2 top-4 lg:top-8 w-4 h-4 rounded-full bg-white border-4 border-primary z-10 shadow-sm lg:-translate-x-1/2 -translate-x-[7px]"
                        />

                        {/* Empty Side (Spacer) */}
                        <div className="hidden lg:block lg:w-1/2" />
                    </motion.div>
                ))}
              </div>
          </div>

        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
          <FadeIn className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <Trophy className="w-3.5 h-3.5" />
                Excellence
             </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Key Achievements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recognition of our commitment to quality education and research.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {achievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {achievement.title}
                        </h3>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            {achievement.desc}
                        </p>
                    </motion.div>
                );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
