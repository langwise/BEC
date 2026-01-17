"use client";

import Link from "next/link";
import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Calendar,
    Music,
    Trophy,
    Users,
    Star,
    Mic2,
    Palette,
    Laptop,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const recurringEvents = [
    {
        title: "SAMBHRAM",
        category: "Annual Cultural Fest",
        date: "April",
        description:
            "The biggest cultural extravaganza of North Karnataka featuring music, dance, fashion, and celebrity performances.",
        icon: Music,
        color: "text-purple-600",
        bg: "bg-purple-100",
    },
    {
        title: "SRISHTI",
        category: "State Level Project Exhibition",
        date: "May",
        description:
            "A platform for final year students to showcase innovative projects, competing with peers from across the state.",
        icon: Laptop,
        color: "text-blue-600",
        bg: "bg-blue-100",
    },
    {
        title: "KREEDA",
        category: "Annual Sports Meet",
        date: "March",
        description:
            "Intra-college sports tournament spanning cricket, football, athletics, and indoor games over a week.",
        icon: Trophy,
        color: "text-orange-600",
        bg: "bg-orange-100",
    },
    {
        title: "FRESHERS DAY",
        category: "Welcome Party",
        date: "September",
        description:
            "A warm welcome to the new batch of students, filled with fun activities, ice-breaking sessions, and talent hunts.",
        icon: Users,
        color: "text-green-600",
        bg: "bg-green-100",
    },
];

const mindhogClubs = [
    { name: "Coding Club", icon: Laptop },
    { name: "Music Society", icon: Mic2 },
    { name: "Art Circle", icon: Palette },
    { name: "Drama Club", icon: Star },
];

export default function ActivitiesPage() {
    return (
        <div className="space-y-8 md:space-y-16">
            <PageHeader
                title="Events & Activities"
                description="A calendar full of energy. Celebrating talent, innovation, and the vibrant spirit of BEC."
            />

            {/* Featured Event Hero */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative rounded-3xl overflow-hidden bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-2xl"
            >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="relative z-10 p-6 md:p-12 flex flex-col items-start gap-4 md:gap-6">
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 md:px-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-white/20">
                        Highlight
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-5xl font-black mb-2 md:mb-4">
                            SAMBHRAM 2024
                        </h2>
                        <p className="text-sm md:text-lg text-violet-100 max-w-xl leading-relaxed">
                            Experience the fusion of tradition and modernity. 3 Days of
                            non-stop entertainment, competitions, and pro-nights.
                        </p>
                    </div>
                    <Button
                        size="lg"
                        className="bg-white text-violet-600 hover:bg-violet-50 font-bold border-none text-sm md:text-base h-10 md:h-11 px-6"
                    >
                        View Past Gallery
                    </Button>
                </div>
            </motion.div>

            {/* Recurring Events Grid */}
            <section>
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">Annual Calendar</h2>
                    <Button variant="outline" className="hidden sm:flex" disabled>
                        Download Schedule
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {recurringEvents.map((event, index) => {
                        const Icon = event.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card
                                    className="h-full hover:shadow-lg transition-all duration-300 border-l-4"
                                    style={{ borderLeftColor: event.color.split("-")[1] }}
                                >
                                    <CardContent className="p-4 md:p-6">
                                        <div className="flex justify-between items-start mb-3 md:mb-4">
                                            <div
                                                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${event.bg} ${event.color}`}
                                            >
                                                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                            <div className="text-[10px] md:text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-600 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {event.date}
                                            </div>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2">
                                            {event.title}
                                        </h3>
                                        <div className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 md:mb-3">
                                            {event.category}
                                        </div>
                                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                            {event.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Mindhog Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-3xl p-6 md:p-12 text-white relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl -mr-12 -mt-12" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl -ml-12 -mb-12" />

                <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Life at Mindhog</h2>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                            Mindhog is the heart of student creativity at BEC. From coding
                            marathons to musical jam sessions, it's where passions are
                            discovered and talents are honed. Every week features a new
                            activity led by student clubs.
                        </p>
                        <Link href="/student-life/mindhog">
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base">
                                Explore Mindhog Clubs
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {mindhogClubs.map((club, idx) => {
                            const Icon = club.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/10 text-center hover:bg-white/20 transition-colors"
                                >
                                    <Icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-purple-300" />
                                    <div className="font-semibold text-xs md:text-sm">{club.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
