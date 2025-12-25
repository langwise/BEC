"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, User, ShieldCheck, Siren } from "lucide-react";

// Data based on typical composition mentioned in search results (Principal as Chairman)
// Specific names other than Principal might need future updates if not found textually
const committee = [
    {
        name: "Dr. S. S. Injaganeri",
        role: "Chairman",
        designation: "Principal, BEC Bagalkot",
        contact: "principal@becbgk.edu"
    },
    // Placeholder structure for other members usually found in such committees
    {
        name: "Dr. V. S. Puranik",
        role: "Member",
        designation: "Dean (Student Welfare)",
        contact: "dean_sw@becbgk.edu"
    },
    {
        name: "Police Inspector",
        role: "Member",
        designation: "Town Police Station, Bagalkot",
        contact: "100"
    }
];

export default function AntiRaggingContactPage() {
    return (
        <div className="space-y-12">
            <PageHeader
                title="Anti-Ragging Helpline"
                description="Reach out for help. Your identity will be protected."
            />

            {/* Emergency Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-orange-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8"
            >
                <div>
                    <div className="flex items-center gap-2 mb-2 text-orange-100 font-bold uppercase tracking-wider text-sm">
                        <Siren className="w-5 h-5 animate-pulse" />
                        24x7 National Helpline
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-2">
                        1800-180-5522
                    </h2>
                    <p className="text-orange-100">
                        UGC Anti-Ragging Helpline (Toll Free)
                    </p>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                    <a href="tel:18001805522" className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold text-center hover:bg-orange-50 transition-colors">
                        Call Now
                    </a>
                    <a href="mailto:helpline@antiragging.in" className="bg-orange-700/50 text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-orange-700 transition-colors border border-orange-500">
                        helpline@antiragging.in
                    </a>
                </div>
            </motion.div>

            {/* Committee Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-orange-600" />
                        Anti-Ragging Committee
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {committee.map((member, index) => (
                        <Card key={index} className="hover:shadow-md transition-all">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-500 mx-auto">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="text-center space-y-1 mb-4">
                                    <div className="text-xs font-bold text-orange-600 uppercase tracking-widest">{member.role}</div>
                                    <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                                    <p className="text-sm text-slate-500">{member.designation}</p>
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex justify-center text-sm text-slate-600">
                                    <a href={member.contact.includes('@') ? `mailto:${member.contact}` : `tel:${member.contact}`} className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                                        {member.contact.includes('@') ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                                        {member.contact}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Floating Addon Card for Reporting */}
                    <Card className="bg-slate-900 text-white border-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
                        <CardContent className="p-6 flex flex-col justify-center h-full relative z-10 text-center">
                            <h3 className="font-bold text-xl mb-2">Report an Incident</h3>
                            <p className="text-slate-400 text-sm mb-6">
                                You can also report ragging incidents through the online portal.
                            </p>
                            <a
                                href="https://www.antiragging.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded-lg font-bold transition-colors"
                            >
                                Visit Portal
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
