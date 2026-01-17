"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bed, Users, ShieldCheck, Wifi, Utensils, BookOpen, UserCheck, Phone } from "lucide-react";

const hostelBlocks = [
    {
        id: "visvesvaraya",
        name: "Sir M. Visvesvaraya Block",
        type: "Boys Hostel",
        audience: "Senior Students",
        capacity: "400+",
        description: "Named after the legendary engineer, this block serves senior students with spacious rooms and dedicated study areas.",
        features: ["Double/Triple Sharing", "Study Halls", "High-Speed WiFi", "Indoor Games"]
    },
    {
        id: "netaji",
        name: "Netaji Block",
        type: "Boys Hostel",
        audience: "First Year Students",
        capacity: "250+",
        description: "A dedicated block for freshers ensuring a safe, ragging-free, and conducive environment for new students.",
        features: ["Triple Sharing", "24/7 Wardens", "Reading Rooms", "Hot Water Supply"]
    },
    {
        id: "malaprabha",
        name: "Malaprabha Ladies Hostel",
        type: "Girls Hostel",
        audience: "All Years",
        capacity: "350+",
        description: "Secure and comfortable accommodation for female students with strict security measures and homely amenities.",
        features: ["Secure Campus", "Biometric Access", "Recreation Hall", "Attached Mess"]
    },
    {
        id: "pg",
        name: "PG Boys Hostel",
        type: "PG & Research",
        audience: "M.Tech & Ph.D",
        capacity: "100+",
        description: "Quiet and well-equipped facility tailored for the needs of postgraduate students and research scholars.",
        features: ["Single/Double Rooms", "Research Lounge", "Internet LAN", "Guest Rooms"]
    }
];

const wardenDetails = [
    {
        role: "Chief Warden",
        name: "Dr. B. R. Hiremath",
        designation: "Principal, BEC",
        phone: "08354-234060"
    },
    {
        role: "Deputy Chief Warden",
        name: "Dr. P. L. Timmanagoudar",
        designation: "Professor",
        phone: "9448693600"
    }
];

export default function HostelsPage() {
    return (
        <div className="space-y-6 md:space-y-12">
            <PageHeader
                title="Student Accommodation"
                description="A home away from home. Safe, comfortable, and vibrant living spaces facilitating holistic growth."
            />

            {/* Overview Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
                {[
                    { label: "Total Capacity", value: "1500+", icon: Users },
                    { label: "Hostel Blocks", value: "4", icon: Bed },
                    { label: "Mess Facility", value: "Pure Veg", icon: Utensils },
                    { label: "Security", value: "24/7", icon: ShieldCheck },
                ].map((stat, i) => (
                    <Card key={i} className="border-orange-100 bg-orange-50/50">
                        <CardContent className="p-3 md:p-6 flex flex-col items-center text-center">
                            <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-orange-500 mb-2" />
                            <div className="text-lg md:text-2xl font-bold text-slate-900">{stat.value}</div>
                            <div className="text-xs md:text-sm text-slate-600">{stat.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            {/* Hostel Blocks Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">Residential Blocks</h2>
                    <p className="text-sm md:text-base text-slate-600">Choose a block to view specific details and amenities.</p>
                </div>

                <Tabs defaultValue="visvesvaraya" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-slate-100/80 rounded-xl">
                        {hostelBlocks.map((block) => (
                            <TabsTrigger
                                key={block.id}
                                value={block.id}
                                className="h-9 md:h-12 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm rounded-lg"
                            >
                                {block.name.split(' ')[0]} Block
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {hostelBlocks.map((block) => (
                        <TabsContent key={block.id} value={block.id} className="mt-4 md:mt-6 focus-visible:outline-none">
                            <Card className="border-none shadow-lg overflow-hidden">
                                <div className="grid md:grid-cols-5 bg-white">
                                    <div className="md:col-span-3 p-4 md:p-8">
                                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                            <span className="bg-orange-100 text-orange-700 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide">
                                                {block.type}
                                            </span>
                                            <span className="bg-slate-100 text-slate-600 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium">
                                                For {block.audience}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-4">{block.name}</h3>
                                        <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 md:mb-8">
                                            {block.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                                            {block.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2 md:gap-3 text-slate-700 font-medium text-xs md:text-base">
                                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-400" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 bg-slate-50 p-4 md:p-8 border-l border-slate-100 flex flex-col justify-center">
                                        <div className="space-y-4 md:space-y-6">
                                            <div>
                                                <div className="text-xs md:text-sm text-slate-500 mb-1">Total Capacity</div>
                                                <div className="text-2xl md:text-3xl font-bold text-slate-900">{block.capacity}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs md:text-sm text-slate-500 mb-1">Warden Contact</div>
                                                <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm md:text-base">
                                                    <Phone className="w-4 h-4" />
                                                    View Contact List
                                                </div>
                                            </div>
                                            <div className="pt-3 md:pt-4 border-t border-slate-200">
                                                <div className="text-[10px] md:text-xs text-slate-400 leading-snug">
                                                    * Admission is subject to availability and merit. First year students are prioritized for Netaji Block.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </motion.div>

            {/* Administration Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid lg:grid-cols-3 gap-6 md:gap-8"
            >
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="py-3 md:py-6">
                            <CardTitle className="flex items-center gap-2 text-lg md:text-2xl">
                                <UserCheck className="w-5 h-5 text-orange-600" />
                                Administration & Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                            <div className="prose prose-slate max-w-none text-sm text-slate-600">
                                <p>
                                    The hostels are managed by the <strong>Student Welfare and Hostel Committee (SWC)</strong>, a dedicated body ensuring the well-being and discipline of all residents. The committee is headed by Shri. Kumar Hiremath (Chairman) and includes 11 other distinguished members from the B.V.V. Sangha.
                                </p>
                                <div className="mt-4 md:mt-6 grid sm:grid-cols-2 gap-3 md:gap-4">
                                    {wardenDetails.map((warden, index) => (
                                        <div key={index} className="bg-slate-50 p-3 md:p-4 rounded-lg border border-slate-100">
                                            <div className="text-[10px] md:text-xs font-bold text-orange-600 uppercase mb-1">{warden.role}</div>
                                            <div className="font-bold text-slate-900 text-sm md:text-base">{warden.name}</div>
                                            <div className="text-[10px] md:text-xs text-slate-500">{warden.designation}</div>
                                            <div className="mt-2 text-xs md:text-sm font-mono text-slate-700">{warden.phone}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="bg-slate-900 text-white border-none h-full">
                        <CardHeader className="py-3 md:py-6">
                            <CardTitle className="flex items-center gap-2 text-lg md:text-2xl">
                                <BookOpen className="w-5 h-5 text-orange-400" />
                                Key Rules
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-slate-300">
                                <li className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                                    <span>Strict adherence to curfew timings (In-time: 9:00 PM).</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                                    <span>Zero tolerance for ragging or disciplinary misconduct.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                                    <span>Guests/Parents allowed only in visiting areas during designated hours.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                                    <span>Electrical appliances (heaters/irons) found in rooms will be confiscated.</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
