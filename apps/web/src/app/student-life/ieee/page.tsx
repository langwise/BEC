"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Users, BookOpen, Award, Cpu as CircuitBoard, Zap, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const events = [
    {
        title: "IEEE Spectrum Talk",
        date: "March 15, 2024",
        type: "Seminar",
        status: "Upcoming"
    },
    {
        title: "Code-a-Thon 2024",
        date: "April 02, 2024",
        type: "Competition",
        status: "Registration Open"
    },
    {
        title: "Embedded Systems Workshop",
        date: "February 20, 2024",
        type: "Workshop",
        status: "Completed"
    }
];

export default function IEEEPage() {
    return (
        <div className="space-y-12">
            <PageHeader
                title="IEEE Student Branch"
                description="Advancing Technology for Humanity - The BEC Chapter (STB35261)."
            />

            {/* Hero / About Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid lg:grid-cols-3 gap-8"
            >
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-md bg-white">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Zap className="w-6 h-6 text-blue-600" />
                                About The Chapter
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                The IEEE Student Branch at Basaveshwar Engineering College (BEC) is one of the most active student bodies on campus. We are dedicated to fostering technological innovation and excellence for the benefit of humanity.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Our chapter organizes regular technical seminars, workshops, and industrial visits to bridge the gap between academic learning and industry requirements. We actively encourage students to participate in national and international level competitions.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {features.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4 hover:border-blue-200 transition-colors">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar / Quick Info */}
                <div className="space-y-6">
                    <Card className="bg-blue-600 text-white border-none shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                Branch Details
                            </h3>
                            <div className="space-y-4 text-sm text-blue-100">
                                <div className="flex justify-between border-b border-blue-500 pb-2">
                                    <span>Branch Code</span>
                                    <span className="font-mono font-bold text-white">STB35261</span>
                                </div>
                                <div className="flex justify-between border-b border-blue-500 pb-2">
                                    <span>Founded</span>
                                    <span className="font-bold text-white">2005</span>
                                </div>
                                <div className="flex justify-between border-b border-blue-500 pb-2">
                                    <span>Active Members</span>
                                    <span className="font-bold text-white">250+</span>
                                </div>
                                <div className="flex justify-between border-b border-blue-500 pb-2">
                                    <span>Coordinator</span>
                                    <span className="font-bold text-white">Dr. R. L. Chakrasali</span>
                                </div>
                            </div>
                            <Button className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50 font-bold">
                                Join IEEE BEC
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-orange-500" />
                                Upcoming Events
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {events.map((event, index) => (
                                <div key={index} className="flex items-start gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div className="bg-slate-100 w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0">
                                        <span className="text-xs font-bold text-slate-500 uppercase">{event.date.split(' ')[0]}</span>
                                        <span className="text-lg font-bold text-slate-900">{event.date.split(' ')[1].replace(',', '')}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">{event.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">{event.type}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                View Calendar <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
