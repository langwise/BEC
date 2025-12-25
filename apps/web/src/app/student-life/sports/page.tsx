"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Activity, MapPin, Users, Dumbbell, Ruler, Timer, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const outdoorStats = [
    { label: "Football Field", value: "120x90m", icon: Activity },
    { label: "Cricket Pitch", value: "3.05x20m", icon: Activity },
    { label: "Hockey Field", value: "91.4x55m", icon: Activity },
    { label: "Basketball", value: "28x15m", icon: Activity },
];

const indoorGames = [
    "Shuttle Badminton (3 Courts)",
    "Table Tennis",
    "Chess",
    "Carom",
    "Modern Gym Equipment"
];

export default function SportsPage() {
    return (
        <div className="space-y-12">
            <PageHeader
                title="Sports & Games"
                description="Fostering discipline, team spirit, and physical fitness through world-class infrastructure."
            />

            {/* Introduction & Gymkhana */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid lg:grid-cols-2 gap-8 items-center"
            >
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        <Trophy className="w-4 h-4" />
                        Department of Phy. Education
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                        Champions in the <span className="text-orange-600">Making</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        The Department of Physical Education (Gymkhana) at BEC is dedicated to the holistic development of students. We believe that sports instill essential life values like team spirit, sportsmanship, and discipline. Our extensive 5-acre playground and indoor stadium provide the perfect arena for talents to flourish.
                    </p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl">
                            <Users className="w-5 h-5 text-emerald-600" />
                            <span className="text-sm font-bold text-slate-700">Full-time Director of Physical Education</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    <Card className="bg-emerald-50 border-emerald-200 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-8 -mt-8" />
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-emerald-900">
                                <Award className="w-6 h-6 text-orange-500" />
                                Recent Achievements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10 space-y-4">
                            <div className="flex gap-3 bg-white/60 p-3 rounded-lg">
                                <Trophy className="w-5 h-5 text-yellow-600 shrink-0" />
                                <div className="text-sm">
                                    <span className="font-bold text-slate-900 block">VTU Zonal Champions</span>
                                    <span className="text-slate-600">Handball Tournament</span>
                                </div>
                            </div>
                            <div className="flex gap-3 bg-white/60 p-3 rounded-lg">
                                <Medal className="w-5 h-5 text-orange-600 shrink-0" />
                                <div className="text-sm">
                                    <span className="font-bold text-slate-900">National Wushu Medalists</span>
                                    <span className="text-slate-600 block">Proud representation at the national level.</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            {/* Infrastructure Section */}
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                    World-Class Infrastructure
                </h2>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Outdoor */}
                    <Card className="hover:shadow-lg transition-all border-t-4 border-t-emerald-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-600" />
                                Outdoor Facilities (5 Acres)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                {outdoorStats.map((stat, i) => (
                                    <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                                        <div className="font-mono font-bold text-slate-700 flex items-center gap-1">
                                            <Ruler className="w-3 h-3 text-emerald-400" />
                                            {stat.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Timer className="w-4 h-4 text-orange-500" />
                                    <span>Featuring <strong>400m</strong> and <strong>100m</strong> Athletic Tracks</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Indoor */}
                    <Card className="hover:shadow-lg transition-all border-t-4 border-t-orange-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Dumbbell className="w-5 h-5 text-orange-600" />
                                Indoor Stadium
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {indoorGames.map((game, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 p-2 rounded hover:bg-orange-50 transition-colors">
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                        {game}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 p-4 bg-orange-50 text-orange-800 text-sm rounded-xl font-medium">
                                Open daily for students from 6:00 AM to 7:00 PM.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}

function Medal({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
    )
}
