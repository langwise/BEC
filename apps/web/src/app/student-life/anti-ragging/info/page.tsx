"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, AlertTriangle, Gavel, FileText, Ban } from "lucide-react";

const punishments = [
    {
        title: "Suspension",
        description: "Immediate suspension from attending classes and academic privileges.",
    },
    {
        title: "Withholding Results",
        description: "Withholding / withdrawing scholarship, fellowship and other benefits.",
    },
    {
        title: "Expulsion",
        description: "Debarring from appearing in any test/ examination or expulsion from the hostel.",
    },
    {
        title: "Rustication",
        description: "Rustication from the institution for periods ranging from one to four semesters.",
    },
    {
        title: "Fine",
        description: "Fine up to Rs. 25,000/- as per IPC / Karnataka Education Act.",
    },
    {
        title: "Legal Action",
        description: "Registration of FIR and prosecution under the Indian Penal Code.",
    },
];

export default function AntiRaggingInfoPage() {
    return (
        <div className="space-y-12">
            <PageHeader
                title="Anti-Ragging Information"
                description="Zero Tolerance Policy - Making Campus Safe and Inclusive for All."
            />

            {/* Warning Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid lg:grid-cols-2 gap-8 items-start"
            >
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                        What constitutes <span className="text-orange-600">Ragging?</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Ragging is basically any disorderly conduct, whether by words spoken or written or by an act which has the effect of teasing, treating or handling with rudeness any other student. It involves likely to cause annoyance, hardship or psychological harm or to raise fear or apprehension thereof in a fresher or a junior student.
                    </p>
                    <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-xl">
                        <h4 className="flex items-center gap-2 font-bold text-orange-700 mb-2">
                            <Ban className="w-5 h-5" />
                            Strictly Prohibited
                        </h4>
                        <p className="text-sm text-slate-700">
                            Ragging within or outside the Educational Institution is strictly prohibited. Engaging in ragging is a criminal offence under IPC sections and the Karnataka Education Act.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6">
                    <Card className="border-orange-100 shadow-md">
                        <CardHeader className="bg-slate-50 border-b border-slate-100">
                            <CardTitle className="flex items-center gap-2 text-slate-800">
                                <FileText className="w-5 h-5 text-orange-600" />
                                UGC Guidelines
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ul className="space-y-3">
                                {[
                                    "Abetment to ragging",
                                    "Criminal conspiracy to rag",
                                    "Unlawful assembly and rioting while ragging",
                                    "Public nuisance created during ragging",
                                    "Violation of decency and morals through ragging",
                                    "Injury to body, causing hurt or grievous hurt",
                                    "Wrongful restraint or confinement",
                                    "Use of criminal force",
                                    "Assault as well as sexual offences or unnatural offences",
                                    "Extortion",
                                    "Criminal trespass & offences against property",
                                    "Criminal intimidation",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                        <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            {/* Punishments Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <Gavel className="w-6 h-6 text-orange-600" />
                    Administrative Action & Punishments
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {punishments.map((item, index) => (
                        <Card key={index} className="hover:shadow-lg transition-all border-l-4 border-l-orange-500">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
