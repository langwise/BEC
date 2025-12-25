"use client";

import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import {
    BookOpen,
    GraduationCap,
    ClipboardCheck,
    UserCog,
    FileText,
    CalendarDays,
    Users,
    Building2,
    Phone,
    Mail,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const officeData = {
    title: "Academic Office",
    description: "The administrative hub dedicated to supporting your academic journey, from admission to graduation.",
    overview: "The Academic Office at Basaveshwar Engineering College ensures the smooth functioning of all academic activities. We manage admissions, curriculum implementation, examinations, student records, and certification, serving as the central point of contact for students, faculty, and regulatory bodies.",
    functions: [
        {
            title: "Admissions",
            icon: Users,
            description: "Managing UG, PG, and PhD admissions, quota allocations, and enrollment processes.",
            link: "#admissions"
        },
        {
            title: "Examinations",
            icon: ClipboardCheck,
            description: "Conducting internal and semester-end exams, result processing, and grade card issuance.",
            link: "#exams"
        },
        {
            title: "Academic Council",
            icon: Building2,
            description: "Governance body overseeing academic policies, curriculum updates, and standards.",
            link: "#council"
        },
        {
            title: "Student Support",
            icon: UserCog,
            description: "Scholarship assistance, document verification, and academic counseling services.",
            link: "#support"
        }
    ],
    admissions: {
        title: "Admission Information",
        items: [
            { label: "Under Graduate (B.E.)", desc: "Common Entrance Test (CET), COMED-K, and Management Quota." },
            { label: "Post Graduate (M.Tech/MBA/MCA)", desc: "PGCET and Management Quota admissions." },
            { label: "Research (Ph.D/M.Sc Engg)", desc: "VTU Research Centre guidelines and entrance tests." }
        ]
    },
    services: [
        { name: "Document Verification", icon: FileText, desc: "Verification of academic transcripts and degree certificates for alumni and agencies." },
        { name: "Academic Calendar", icon: CalendarDays, desc: "Schedule of terms, exams, and academic events for the current year." },
        { name: "Scholarships", icon: GraduationCap, desc: "Facilitation of state, central, and private scholarship applications." },
    ]
};

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{children}</h2>
            <div className="h-px flex-1 bg-gray-100"></div>
        </div>
    )
}

export default function AcademicOfficePage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-16">
                <PageHeader
                    title={officeData.title}
                    description={officeData.description}
                />

                {/* Overview */}
                <section className="max-w-4xl mx-auto text-center space-y-6">
                    <FadeIn>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                            {officeData.overview}
                        </p>
                    </FadeIn>
                </section>

                {/* Key Functions Grid */}
                <section>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {officeData.functions.map((func, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <Card className="h-full border-stone-200 hover:shadow-lg transition-all duration-300 hover:border-primary/20 group cursor-pointer bg-white">
                                    <CardHeader className="pb-3">
                                        <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <func.icon className="w-6 h-6 text-primary group-hover:text-white" />
                                        </div>
                                        <CardTitle className="text-xl text-gray-900 group-hover:text-primary transition-colors">
                                            {func.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base text-gray-600 mb-4 line-clamp-3">
                                            {func.description}
                                        </CardDescription>
                                        <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                            Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </FadeIn>
                        ))}
                    </div>
                </section>

                {/* Detailed Sections */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Admissions */}
                    <div className="lg:col-span-2">
                        <SectionTitle>{officeData.admissions.title}</SectionTitle>
                        <Card className="border-stone-200 shadow-sm bg-white">
                            <CardContent className="p-6 space-y-4">
                                <div className="grid sm:grid-cols-1 gap-4">
                                    {officeData.admissions.items.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border border-stone-100 bg-stone-50/50 hover:bg-white hover:shadow-sm transition-all">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{item.label}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-stone-100">
                                    <p className="text-sm text-gray-500">
                                        For detailed admission inquiries, please visit the <Link href="/institute/contact" className="text-primary hover:underline">Contact Us</Link> page or the respective programme pages.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Services / Quick Links */}
                    <div className="space-y-6">
                        <div className="mb-8"><SectionTitle>Student Services</SectionTitle></div>
                        <div className="space-y-4">
                            {officeData.services.map((service, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 rounded-lg bg-orange-100/50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                            <service.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-base">{service.name}</h4>
                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                                {service.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact / Footer CTA */}
                <section className="bg-linear-to-r from-stone-900 to-stone-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold">Contact Academic Office</h2>
                            <p className="text-stone-300 max-w-xl">
                                For inquiries regarding admissions, examinations, or student records.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="mailto:principal@becbgk.edu" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors border border-white/10">
                                <Mail className="w-5 h-5" />
                                <span>principal@becbgk.edu</span>
                            </Link>
                            <Link href="tel:+917618781963" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg transition-colors font-medium shadow-lg shadow-orange-900/20">
                                <Phone className="w-5 h-5" />
                                <span>+91 76187 81963</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
