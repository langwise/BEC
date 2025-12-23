"use client";

import { motion } from "motion/react";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";
import {
  Trophy,
  Target,
  Lightbulb,
  GraduationCap,
  Users,
  Building2,
  Award,
  BookOpen,
  CheckCircle2,
  Wifi,
  Utensils,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutUsPage() {
  const stats = [
    { label: "Founded", value: "1963", icon: Building2 },
    { label: "Campus Size", value: "93 Acres", icon: Trophy },
    { label: "Alumni Strong", value: "20,000+", icon: Users },
    { label: "Students", value: "3,500+", icon: GraduationCap },
    { label: "Faculty", value: "180+", sub: "55% PhDs", icon: Award },
    { label: "Research Centers", value: "10", icon: BookOpen },
  ];

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

  const facilities = [
    {
      title: "Hostels",
      desc: "Spacious and secure separate hostels for boys and girls.",
      icon: Building2,
    },
    {
      title: "Connectivity",
      desc: "Campus-wide high speed WiFi & large computer labs with the latest equipment and software.",
      icon: Wifi,
    },
    {
      title: "Library",
      desc: "Well-stocked library for both print and digital assets.",
      icon: BookOpen,
    },
    {
      title: "Dining",
      desc: "Multiple canteens and cafeterias offering tasty and hygienic food regularly.",
      icon: Utensils,
    },
    {
      title: "Eco-Friendly",
      desc: "Electric buggies for commuting within the campus.",
      icon: Zap,
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
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Institute · About Us
          </p>
          <div className="mt-4 space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Six decades of excellence in technical education and innovation
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Basaveshwar Engineering College (BEC) – a crown jewel in the highly respected and renowned 120-year-old Basaveshwar Veerashaiva Vidya Vardhak Sangha (B. V. V. S.) and a premier technical institution in North Karnataka.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section (Crown Jewel + Full Narrative) */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
            <FadeIn>
              <div className="relative text-center mb-12">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-40 -z-10" />
                <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100 border-none">
                  A Crown Jewel of B.V.V.S.
                </Badge>
                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-8">
                  Premier Technical Institution in <span className="text-primary">North Karnataka</span>
                </h2>
                
                {/* Full Narrative Text Blocks */}
                <div className="prose prose-lg text-gray-600 leading-relaxed mx-auto max-w-4xl text-justify space-y-6">
                  <p>
                    <span className="font-semibold text-gray-900">Basaveshwar Engineering College, Bagalkote (BEC)</span> – a crown jewel in the highly respected and renowned 
                    <span className="font-semibold text-gray-900"> 120-year-old Basaveshwar Veerashaiva Vidya Vardhak Sangha (B. V. V. S.)</span> is a premier technical institution located in North Karnataka. 
                    Started in 1963, the college has grown tremendously over the years and currently has 11 UG, 6 PG and 10 Research Centers recognized by VTU, Belagavi.
                  </p>
                  <p>
                     BEC is a government-aided institution recognized by <span className="font-semibold text-gray-900">AICTE, New Delhi</span> and accredited by <span className="font-semibold text-primary">NAAC with 'A' grade</span>. 
                     It is permanently affiliated to <span className="font-semibold text-gray-900">VTU, Belagavi</span>.
                  </p>
                  <p>
                    The college has some of the best equipment and facilities in their various departments spread over a vast <span className="font-semibold text-primary">93-acre campus</span>, 
                    and many of its alumni of <span className="font-semibold text-gray-900">20,000+ students</span> are now in leadership positions with MNCs and large Indian companies in India and all over the world.
                  </p>
                  <p>
                    With a highly qualified, experienced, and dedicated <span className="font-semibold text-gray-900">faculty strength of over 180</span>, with <span className="font-semibold text-primary">55% of them holding PhD’s</span>, 
                    supported by nearly 200 staff members, the college offers an unbeatable ambience and superior quality of education for its nearly 3500 students.
                  </p>
                </div>
              </div>
            </FadeIn>
        </div>
      </section>

      {/* Vision & Mission (Redesigned) */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            {/* Vision - Centered & Prominent */}
            <FadeIn>
                <div className="relative rounded-[2.5rem] bg-gray-900 overflow-hidden shadow-2xl mb-12">
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-30" />
                     <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20" />
                     
                     <div className="relative text-center py-20 px-6 lg:px-20 z-10">
                        <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/10">
                             <Target className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Our Vision</h3>
                        <p className="text-2xl md:text-3xl text-gray-200 font-medium leading-relaxed max-w-4xl mx-auto">
                           &quot;{visionMission.vision}&quot;
                        </p>
                     </div>
                </div>
            </FadeIn>

            {/* Mission - Clean List Design */}
            <FadeIn delay={0.2}>
               <div className="bg-orange-50/50 rounded-[2.5rem] border border-orange-100 p-10 lg:p-16">
                  <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                      <div className="lg:w-1/3">
                          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-orange-100 text-primary mb-6">
                              <BookOpen className="w-8 h-8" />
                          </div>
                          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                          <p className="text-gray-600 leading-relaxed text-lg">
                             Guided by our vision, we strive to achieve these core objectives in our pursuit of educational excellence.
                          </p>
                      </div>
                      <div className="lg:w-2/3">
                          <ul className="grid gap-6">
                              {visionMission.mission.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300">
                                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5 shadow-sm">
                                          {idx + 1}
                                      </div>
                                      <p className="text-lg text-gray-800 font-medium leading-relaxed">{item}</p>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
               </div>
            </FadeIn>
          </div>
      </section>

      {/* Legacy & History Section */}
      <section className="py-20 bg-stone-50 border-y border-stone-100">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Our Legacy
            </h2>
            
            {/* Credentials Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
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
                                <div className="text-5xl font-bold text-orange-200 select-none mb-2">{milestone.year}</div>
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

      {/* Facilities Section */}
      <section className="py-20 lg:py-24 bg-white border-t border-stone-100">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Campus Life & Facilities</h2>
                <div className="prose prose-lg text-gray-600 mx-auto max-w-3xl">
                    <p>
                        Spacious and secure separate hostels for boys and girls, campus-wide high speed WiFi, a well-stocked library for both print and digital assets, 
                        large computer labs with the latest equipment and software, multiple canteens and cafeterias offering tasty and hygienic food regularly, 
                        and electric buggies for commuting within the campus make BEC one of the best places to teach and learn.
                    </p>
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {facilities.map((facility, idx) => {
                    const Icon = facility.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group p-8 rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all"
                        >
                            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {facility.desc}
                            </p>
                        </motion.div>
                    )
                })}
            </div>
        </div>
      </section>

       {/* Achievements Grid */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
          <FadeIn className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <Trophy className="w-3.5 h-3.5" />
                Excellence
             </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Key Achievements
            </h2>
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
