"use client";

import Image from "next/image";
import { PageHeader } from "@/components/placements/page-header";
import { asset } from "@/lib/assets";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Users, BookOpen, Award, Cpu as CircuitBoard, Zap, Calendar, Trophy } from "lucide-react";

const HERO_IMAGE = asset("student-life/clubs/ieee-student-branch-35261.webp");

const features = [
    {
        title: "Technical Workshops",
        description: "Hands-on sessions on IoT, AI/ML, and Embedded Systems conducted by industry experts.",
        icon: CircuitBoard,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        title: "Conferences",
        description: "International and National level conferences providing a platform for research presentation.",
        icon: Globe,
        color: "text-cyan-600",
        bg: "bg-cyan-50"
    },
    {
        title: "Student Network",
        description: "Connect with like-minded peers and professionals across the global IEEE network.",
        icon: Users,
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        title: "Publications",
        description: "Access to IEEE Xplore digital library and opportunities to publish technical papers.",
        icon: BookOpen,
        color: "text-sky-600",
        bg: "bg-sky-50"
    }
];

const flagshipEvents = [
    {
        title: "NOVUS",
        description: "The branch's flagship national-level technical event, which evolved from the state-level KSHITIJ programme first organised in 2005-06."
    },
    {
        title: "Gandhi Global Solar Yatra",
        description: "Awareness and outreach activity on solar energy and sustainability."
    },
    {
        title: "National Science Day & Women's Day",
        description: "Annual commemorative events celebrating scientific temper and women in engineering (WIE)."
    }
];

const achievements = [
    "Outstanding Large Student Branch Award for the years 2014 and 2016",
    "Darrel Chong Student Activity Award in IEEE Region 10 (R10) for 2016",
    "R10 Outstanding Branch Counsellor Award (1996) and IEEE Bangalore Section Outstanding Branch Counsellor Award (2010 & 2014)",
    "Organised 53 activities during the year 2016"
];

export default function IEEEPage() {
    return (
        <div className="space-y-6 md:space-y-12">
            <PageHeader
                title="IEEE Student Branch"
                description="Advancing Technology for Humanity - The BEC-IEEE Student Branch (STB35261)."
            />

            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
            >
                <div className="relative aspect-21/9 w-full">
                    <Image
                        src={HERO_IMAGE}
                        alt="Members of the BEC-IEEE Student Branch at Basaveshwar Engineering College, Bagalkot"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-8">
                        <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-blue-300">
                            BEC-IEEE Student Branch
                        </p>
                        <p className="text-lg md:text-2xl font-bold text-white max-w-2xl leading-tight">
                            Advancing technology for humanity since 1994.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* About Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid lg:grid-cols-3 gap-6 md:gap-8"
            >
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                    <Card className="border-none shadow-md bg-white">
                        <CardContent className="p-4 md:p-8">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                                About The Chapter
                            </h2>
                            <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4 md:mb-6">
                                The IEEE Student Branch (STB35261) at Basaveshwar Engineering College, Bagalkot — known among peers as BEC-IEEE — was established in 1994 and has completed over 25 years of technical, non-technical, humanitarian, and professional activities. It is an entity of the IEEE North Karnataka Sub Section, affiliated to the IEEE Bangalore Section.
                            </p>
                            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                The branch organises regular technical seminars, workshops, and competitions to bridge the gap between academic learning and industry requirements, and has helped initiate IEEE activities at several other engineering colleges across the region. A dedicated IEEE Power & Energy Society (PES) student chapter was started in 2016.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                        {features.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="bg-white p-4 md:p-6 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3 md:gap-4 hover:border-blue-200 transition-colors">
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                                        <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1 text-sm md:text-base">{item.title}</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar / Quick Info */}
                <div className="space-y-4 md:space-y-6">
                    <Card className="bg-blue-600 text-white border-none shadow-lg">
                        <CardContent className="p-4 md:p-6">
                            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center gap-2">
                                <Award className="w-4 h-4 md:w-5 md:h-5" />
                                Branch Details
                            </h3>
                            <div className="space-y-3 md:space-y-4 text-xs md:text-sm text-blue-100">
                                <div className="flex justify-between border-b border-blue-500 pb-2">
                                    <span>Branch Code</span>
                                    <span className="font-mono font-bold text-white">STB35261</span>
                                </div>
                                <div className="flex justify-between border-b border-blue-500 pb-2">
                                    <span>Established</span>
                                    <span className="font-bold text-white">1994</span>
                                </div>
                                <div className="flex justify-between border-b border-blue-500 pb-2">
                                    <span>Membership</span>
                                    <span className="font-bold text-white">117</span>
                                </div>
                                <div className="flex justify-between gap-4 border-b border-blue-500 pb-2">
                                    <span className="shrink-0">Branch Counsellor</span>
                                    <span className="font-bold text-white text-right">Dr. Vijaylakshmi Jigajinni</span>
                                </div>
                                <div className="flex justify-between gap-4 border-b border-blue-500 pb-2">
                                    <span className="shrink-0">Student Branch Chair</span>
                                    <span className="font-bold text-white text-right">Mahesh Ballolli</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span className="shrink-0">Founder</span>
                                    <span className="font-bold text-white text-right">Dr. Suresh H. Jangamshetti</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-100 shadow-sm">
                        <CardHeader className="py-3 md:py-6">
                            <CardTitle className="text-base md:text-lg flex items-center gap-2">
                                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                                Flagship Events
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0 md:pt-0">
                            {flagshipEvents.map((event, index) => (
                                <div key={index} className="flex items-start gap-3 md:gap-4 pb-3 md:pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div className="bg-orange-50 text-orange-600 w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0">
                                        <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-xs md:text-sm">{event.title}</h4>
                                        <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed mt-0.5">{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-100 shadow-sm">
                        <CardHeader className="py-3 md:py-6">
                            <CardTitle className="text-base md:text-lg flex items-center gap-2">
                                <Trophy className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                                Recognitions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 md:space-y-3 p-4 md:p-6 pt-0 md:pt-0">
                            {achievements.map((item, index) => (
                                <div key={index} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-slate-600 leading-relaxed">
                                    <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
