"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, Users, Flag, Medal, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const objectives = [
    {
        title: "Character Building",
        description: "To develop character, comradeship, discipline, leadership, secular outlook, and spirit of adventure.",
        icon: Users,
    },
    {
        title: "National Service",
        description: "To create a human resource of organized, trained, and motivated youth to provide leadership in all walks of life.",
        icon: Flag,
    },
    {
        title: "Armed Forces",
        description: "To provide a suitable environment to motivate the youth to take up a career in the Armed Forces.",
        icon: Target,
    },
];

const pledges = [
    "I pledge that I shall uphold the unity of India.",
    "I resolve to be a disciplined and responsible citizen.",
    "I shall undertake positive community service in the spirit of selflessness."
];

export default function NCCPage() {
    return (
        <div className="space-y-6 md:space-y-12">
            <PageHeader
                title="National Cadet Corps (NCC)"
                description='"Unity and Discipline" - Grooming the leaders of tomorrow.'
            />

            {/* Introduction & Motto */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center"
            >
                <div className="space-y-4 md:space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                        <Shield className="w-3 h-3 md:w-4 md:h-4" />
                        Army Wing
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                        Cultivating <span className="text-red-600">Discipline</span> & <span className="text-amber-600">Patriotism</span>
                    </h2>
                    <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                        The NCC unit at Basaveshwar Engineering College serves as a launchpad for future leaders. We instill qualities of courage, discipline, and selfless service. Cadets are trained in military drills, weapon handling, and map reading, preparing them for both civil and military responsibilities.
                    </p>
                    <div className="flex gap-4">
                        <Button className="bg-slate-900 text-white hover:bg-slate-800 text-sm md:text-base">
                            Apply for Enrollment
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:gap-6">
                    <Card className="bg-amber-50 border-amber-200 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-8 -mt-8" />
                        <CardHeader className="py-4 md:py-6">
                            <CardTitle className="flex items-center gap-2 text-amber-900 text-lg md:text-xl">
                                <Flag className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                                The NCC Motto
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10 p-4 md:p-6 pt-0 md:pt-0">
                            <blockquote className="text-xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 md:mb-4">
                                "UNITY AND DISCIPLINE"
                            </blockquote>
                            <p className="text-xs md:text-sm text-slate-700">
                                The motto was adopted on 23 Dec 1957. In living up to its motto, the NCC strives to be and is one of the greatest cohesive forces of the nation, bringing together the youth hailing from different parts of the country.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            {/* Objectives Grid */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-8 flex items-center gap-2">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                    Core Objectives
                </h2>
                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                    {objectives.map((obj, index) => {
                        const Icon = obj.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full hover:shadow-md transition-all border-t-4 border-t-slate-900">
                                    <CardContent className="p-4 md:p-6">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-3 md:mb-4 text-slate-900">
                                            <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">{obj.title}</h3>
                                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                                            {obj.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Pledge & Activities */}
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    <Card>
                        <CardHeader className="py-4 md:py-6">
                            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                                <Medal className="w-5 h-5 text-amber-500" />
                                Major Activities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                            <div className="space-y-3 md:space-y-4">
                                <div className="group flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                                    <div className="bg-white p-2 rounded shadow-sm group-hover:shadow text-red-600 font-bold text-center w-12 md:w-16 shrink-0">
                                        <div className="text-[10px] md:text-xs uppercase">JAN</div>
                                        <div className="text-lg md:text-xl">26</div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm md:text-base">Republic Day Parade</h4>
                                        <p className="text-xs md:text-sm text-slate-600 mt-1">
                                            Cadets display their drill prowess in a grand parade at the college district stadium, saluting the national flag.
                                        </p>
                                    </div>
                                </div>

                                <div className="group flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                                    <div className="bg-white p-2 rounded shadow-sm group-hover:shadow text-amber-600 font-bold text-center w-12 md:w-16 shrink-0">
                                        <div className="text-[10px] md:text-xs uppercase">AUG</div>
                                        <div className="text-lg md:text-xl">15</div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm md:text-base">Independence Day Celebration</h4>
                                        <p className="text-xs md:text-sm text-slate-600 mt-1">
                                            A day of patriotism where cadets lead the guard of honor and participate in cultural events celebrating freedom.
                                        </p>
                                    </div>
                                </div>

                                <div className="group flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                                    <div className="bg-white p-2 rounded shadow-sm group-hover:shadow text-blue-600 font-bold text-center w-12 md:w-16 shrink-0">
                                        <div className="text-[10px] md:text-xs uppercase">VAR</div>
                                        <div className="text-lg md:text-xl">--</div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm md:text-base">Combined Annual Training Camps (CATC)</h4>
                                        <p className="text-xs md:text-sm text-slate-600 mt-1">
                                            Intensive 10-day camps focused on physical fitness, drill, map reading, and firing practice.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="bg-slate-900 text-white h-full">
                        <CardHeader className="py-4 md:py-6">
                            <CardTitle className="text-amber-400 flex items-center gap-2 text-lg md:text-xl">
                                <Shield className="w-5 h-5" />
                                Cadet's Pledge
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                            <div className="space-y-4 md:space-y-6">
                                {pledges.map((line, i) => (
                                    <div key={i} className="flex gap-3">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-amber-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-300 italic font-medium text-xs md:text-base">"{line}"</span>
                                    </div>
                                ))}
                                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-700 text-center">
                                    <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest mb-2">Enrollment Open</div>
                                    <p className="text-xs md:text-sm text-slate-300">
                                        Enrollment usually begins in August for first-year students. Contact the physical education department for details.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
