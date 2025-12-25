"use client";

import Link from "next/link";
import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import {
    Users,
    Trophy,
    Tent,
    Wifi,
    Radio,
    Heart,
    Utensils,
    Store,
    Activity,
    Landmark,
    Leaf,
    MapPin,
    ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const highlights = [
    {
        title: "93.18 Acres",
        subtitle: "Lush Green Campus",
        icon: Leaf,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        title: "1500+",
        subtitle: "Hostel Capacity",
        icon: Tent,
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        title: "BEC Dhwani",
        subtitle: "90.4 FM Community Radio",
        icon: Radio,
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
    {
        title: "1 Gbps",
        subtitle: "WiFi Enabled Campus",
        icon: Wifi,
        color: "text-blue-600",
        bg: "bg-blue-50"
    }
];

const clubs = [
    {
        name: "Mindhog",
        description: "The primary student club focusing on technical innovation, coding challenges, and peer learning.",
        icon: Users,
        color: "text-purple-600",
        bg: "bg-purple-100",
        href: "#"
    },
    {
        name: "Gymkhana",
        description: "Hub for sports, cultural activities, and annual fests. Features 5.00 acres of playground and indoor stadium.",
        icon: Trophy,
        color: "text-amber-600",
        bg: "bg-amber-100",
        href: "#"
    },
    {
        name: "NSS & Red Cross",
        description: "Community service wings engaging in social welfare, blood donation camps, and rural development.",
        icon: Heart,
        color: "text-red-600",
        bg: "bg-red-100",
        href: "#"
    },
    {
        name: "IEEE Student Branch",
        description: "Professional body chapter organizing technical workshops, seminars, and networking events.",
        icon: Activity,
        color: "text-blue-600",
        bg: "bg-blue-100",
        href: "#"
    }
];

const amenities = [
    { name: "Campus Clinic", icon: Activity },
    { name: "Bank & ATM", icon: Landmark },
    { name: "Co-operative Store", icon: Store },
    { name: "Canteen", icon: Utensils },
];

export default function StudentLifeOverviewPage() {
    return (
        <div className="space-y-16">
            <PageHeader
                title="Life at BEC"
                description="A vibrant ecosystem of learning, culture, and community in the heart of Bagalkot."
            />

            {/* Introduction & Highlights */}
            <section className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                            More Than Just <span className="text-orange-600">Academics</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Basaveshwar Engineering College provides a holistic environment where students thrive not just in classrooms but in every aspect of life. From our sprawling 93-acre green campus to state-of-the-art recreational facilities, BEC is a home away from home.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/student-life/hostels">
                                <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8">
                                    Explore Hostels
                                </Button>
                            </Link>
                            <Button variant="outline" className="rounded-full px-8">
                                Virtual Tour
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {highlights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${item.bg} ${item.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900">{item.title}</div>
                                    <div className="text-sm text-slate-500">{item.subtitle}</div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Clubs & Activities */}
            <section className="bg-slate-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-orange-600 font-semibold tracking-wider text-sm uppercase">Vibrant Community</span>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">Student Activities & Clubs</h2>
                        <p className="text-slate-600 mt-4">
                            Discover your passions and build lifelong friendships through our diverse student organizations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {clubs.map((club, index) => {
                            const Icon = club.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-none shadow-md group overflow-hidden">
                                        <CardContent className="p-6 relative">
                                            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-transform group-hover:scale-150 ${club.bg.replace('100', '500')}`} />

                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg ${club.bg.replace('100', '500')}`}>
                                                <Icon className="w-7 h-7" />
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                                                {club.name}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                                {club.description}
                                            </p>

                                            <div className="flex items-center text-sm font-semibold text-orange-600 group-hover:translate-x-1 transition-transform cursor-pointer">
                                                Learn More <ArrowRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Amenities Grid */}
            <section className="container mx-auto px-4 pb-16">
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20" />

                    <div className="relative z-10 grid lg:grid-cols-3 gap-12 items-center">
                        <div className="lg:col-span-1 space-y-6">
                            <h2 className="text-3xl font-bold">Campus Amenities</h2>
                            <p className="text-slate-300 leading-relaxed">
                                We ensure a comfortable and convenient living experience with comprehensive support facilities available right on campus.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-orange-300">
                                <MapPin className="w-4 h-4" />
                                Located centrally within Vidyagiri Campus
                            </div>
                        </div>

                        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                            {amenities.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4 hover:bg-white/20 transition-colors">
                                        <div className="w-10 h-10 rounded-lg bg-orange-500flex items-center justify-center text-orange-400">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="font-semibold">{item.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
