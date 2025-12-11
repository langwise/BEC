"use client";

import { PageHeader } from "@/components/placements/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Info, ChevronRight, FileText, UserCheck, ShieldCheck, Users, GraduationCap, Mic2 } from "lucide-react";
import { motion } from "motion/react";

export default function GuidelinesPage() {
    return (
        <div className="space-y-16 max-w-5xl mx-auto">
            <PageHeader
                title="Regulations for Research Promotion"
                description="Comprehensive guidelines and objectives for research activities, scholars, and committees at BEC."
            />

            <div className="space-y-12">
                {/* 1. Objectives */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    id="objectives"
                >
                    <Card className="border-orange-100 shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-50 to-white px-8 py-6 border-b border-orange-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl shadow-sm">1</div>
                            <h2 className="text-2xl font-bold text-slate-900">Objectives</h2>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    "To promote research and inculcate research culture.",
                                    "To increase the number of publications in peer reviewed journals and enhance the quality of research.",
                                    "To enhance financial support from various funding agencies",
                                    "To promote interdisciplinary research activities",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors">
                                        <CheckCircle className="w-5 h-5 text-orange-500 mr-3 shrink-0 mt-0.5" />
                                        <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.section>

                {/* 2. Guidelines for Research Centres */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    id="research-centres"
                >
                    <Card className="border-slate-100 shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-50 to-white px-8 py-6 border-b border-amber-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl shadow-sm">2</div>
                            <h2 className="text-2xl font-bold text-slate-900">Guidelines for Research Centres</h2>
                        </div>
                        <CardContent className="p-8">
                            <ul className="grid gap-4">
                                {[
                                    "Notifications/advertisements of various funding proposals should be tracked/pursued by the HOD.",
                                    "The faculty members and research scholars should be motivated to apply for the research funding.",
                                    "HOD must ensure that at least one proposal is submitted by the department for each notification.",
                                    "Identify thrust areas and form inter/intra departmental groups to work in these areas.",
                                    "A database of the papers published in the journals and presented in the conferences by the faculty/research scholars should be maintained in the department.",
                                    "A database of the project proposals applied and sanctioned should be maintained in the department.",
                                    "The faculty should submit the details of the conference presentations and journal publications to the department (HoD) within a week.",
                                    "Attendance register/biometric data of the full-time and part-time research scholars must be maintained by the research centre.",
                                    "A copy of attendance and other research related data of each month should be submitted to Dean (R&D) in the first week of the following month.",
                                    "All the documents and communications by the research scholars with the college and affiliated university should be maintained in the department/research centre.",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start text-slate-700 group md:items-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                        <span className="w-1.5 h-1.5 bg-amber-300 rounded-full mt-2 md:mt-0 mr-4 group-hover:bg-amber-500 transition-colors shrink-0" />
                                        <span className="text-sm md:text-base leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </motion.section>

                {/* 3. Guidelines for Research Scholars */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    id="research-scholars"
                >
                    <Card className="border-slate-100 shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-50 to-white px-8 py-6 border-b border-orange-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl shadow-sm">3</div>
                            <h2 className="text-2xl font-bold text-slate-900">Guidelines for Research Scholars</h2>
                        </div>
                        <CardContent className="p-8 space-y-8">
                            {/* General Points */}
                            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-orange-500" />
                                    General Obligations
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "Deadlines for coursework, viva voce, synopsis & thesis must be strictly adhered to.",
                                        "Half-yearly progress review meetings by DRC must be conducted every six months.",
                                        "No extension of deadlines without genuine reasons and Principal's discretion.",
                                        "Scholars must assist guides in submitting at least one research proposal for funding.",
                                        "Leave limited to 15 days/year (Full-time); prior permission required.",
                                        "All documents to Principal must be forwarded by Guide, HOD, and Dean R&D.",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start text-slate-600 text-sm">
                                            <ChevronRight className="w-4 h-4 text-orange-300 mr-2 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Part Time */}
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-amber-500" />
                                        Part-time Scholars
                                    </h4>
                                    <ul className="space-y-4 text-sm text-slate-600">
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                                            <span className="leading-relaxed">Present at least 15 days/semester in research centre, before review.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                            <span className="leading-relaxed">Sign attendance & biometric during visits.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                            <span className="leading-relaxed">Provide Employer NOC & willingness for 1 month leave/year.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Full Time */}
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <GraduationCap className="w-5 h-5 text-orange-500" />
                                        Full-time Scholars
                                    </h4>
                                    <ul className="space-y-4 text-sm text-slate-600">
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                                            <span className="leading-relaxed">Daily attendance & biometric on all working days.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                            <span className="leading-relaxed">Provide NOC & 3 years study leave if employed. No other jobs allowed.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                            <span className="leading-relaxed">Unemployed can apply for scholarships with intimation.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.section>

                {/* 4. DRC & Meetings */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    id="drc-guidelines"
                >
                    <Card className="border-slate-100 shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-50 to-white px-8 py-6 border-b border-amber-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl shadow-sm">4</div>
                            <h2 className="text-2xl font-bold text-slate-900">Doctoral Review Committee (DRC)</h2>
                        </div>
                        <CardContent className="p-8 grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Committee Formation</h4>
                                <ul className="space-y-3 text-slate-600 text-sm">
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />4 external experts (one IIT/NIT) list submitted to Principal.</li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />Principal approves experts.</li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />Significant faculty/student presence (25% / 50%) required.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Meeting Protocols</h4>
                                <p className="text-slate-500 text-sm mb-3 font-medium">Scholar must apply 3 days in advance with:</p>
                                <ul className="grid grid-cols-1 gap-2 text-slate-600 text-xs font-mono bg-slate-50 p-4 rounded-lg">
                                    <li>[ ] Objectives & Review</li>
                                    <li>[ ] Work Progress Report</li>
                                    <li>[ ] Methodology & Results</li>
                                    <li>[ ] Publications List</li>
                                    <li>[ ] Future Plans</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </motion.section>

                {/* 5. Viva & Seminars */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    id="viva-seminars"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="bg-slate-900 text-white border-none shadow-xl">
                            <CardContent className="p-8 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur">
                                    <Mic2 className="w-8 h-8 text-orange-200" />
                                </div>
                                <h4 className="text-xl font-bold mb-4">Comprehensive Viva-Voce</h4>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                    Scholar informs readiness. Guide invites experts. Report focuses on work completed and recommendations.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-orange-600 text-white border-none shadow-xl">
                            <CardContent className="p-8 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur">
                                    <Users className="w-8 h-8 text-orange-100" />
                                </div>
                                <h4 className="text-xl font-bold mb-4">Open Seminars & Colloquium</h4>
                                <p className="text-orange-50 text-sm leading-relaxed mb-6">
                                    Pre-submission colloquium presenting complete work. Committee approval required for final thesis submission.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
