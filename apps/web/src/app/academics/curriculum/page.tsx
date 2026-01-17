"use client";

import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Download, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const curriculumData = {
    title: "Academic Curriculum",
    description: "Comprehensive details of schemes, syllabi, and academic regulations for all programmes.",
    overview: "Basaveshwar Engineering College follows an outcome-based education system with a dynamic curriculum designed to meet industry standards and research requirements.",
    ug: {
        firstYear: {
            title: "First Year B.E. (Common to All Branches)",
            schemes: [
                {
                    year: "2024-25",
                    title: "Scheme & Syllabus for 2024-25 Admitted Batch",
                    cycle: "Physics & Chemistry Cycles",
                    link: "#"
                },
                {
                    year: "2023-24",
                    title: "Scheme & Syllabus for 2023-24 Admitted Batch",
                    cycle: "Physics & Chemistry Cycles",
                    link: "#"
                }
            ]
        },
        departments: [
            {
                dept: "Computer Science & Engg.",
                schemes: [
                    { title: "Scheme & Syllabus (2022-23 Batch)", link: "#" },
                    { title: "Scheme & Syllabus (2021-22 Batch)", link: "#" },
                    { title: "NEP 2020 Scheme (1st & 2nd Sem)", link: "#" }
                ]
            },
            {
                dept: "Electronics & Communication Engg.",
                schemes: [
                    { title: "Scheme & Syllabus (2022-23 Batch)", link: "#" },
                    { title: "Scheme & Syllabus (2021-22 Batch)", link: "#" },
                    { title: "NEP 2020 Scheme", link: "#" }
                ]
            },
            {
                dept: "Mechanical Engineering",
                schemes: [
                    { title: "Scheme & Syllabus (2022-23 Batch)", link: "#" },
                    { title: "Scheme & Syllabus (2021-22 Batch)", link: "#" }
                ]
            },
            {
                dept: "Civil Engineering",
                schemes: [
                    { title: "Scheme & Syllabus (2022-23 Batch)", link: "#" },
                    { title: "Scheme & Syllabus (2021-22 Batch)", link: "#" }
                ]
            }
        ]
    },
    pg: {
        programs: [
            {
                name: "M.Tech (Computer Science)",
                schemes: [
                    { title: "Scheme & Syllabus (2022-23)", link: "#" },
                    { title: "Scheme & Syllabus (2021-22)", link: "#" }
                ]
            },
            {
                name: "M.Tech (Machine Design)",
                schemes: [
                    { title: "NEP Scheme (2022-23 Onwards)", link: "#" },
                    { title: "Scheme & Syllabus (2021-22)", link: "#" }
                ]
            },
            {
                name: "MBA",
                schemes: [
                    { title: "MBA Scheme & Syllabus (2023-24)", link: "#" },
                    { title: "MBA Scheme & Syllabus (2022-23)", link: "#" }
                ]
            },
            {
                name: "MCA",
                schemes: [
                    { title: "MCA Scheme & Syllabus (2022-23)", link: "#" },
                    { title: "MCA Scheme & Syllabus (2021-22)", link: "#" }
                ]
            }
        ]
    }
};

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{children}</h2>
            <div className="h-px flex-1 bg-gray-100"></div>
        </div>
    )
}

function DocumentCard({ title, subtitle, date }: { title: string, subtitle?: string, date?: string }) {
    return (
        <Card className="group hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer bg-white border-stone-200">
            <CardContent className="p-5 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-orange-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                    <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                        {title}
                    </h4>
                    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                    {date && (
                        <Badge variant="secondary" className="mt-2 text-xs font-normal bg-stone-100 text-stone-600 hover:bg-stone-200">
                            {date}
                        </Badge>
                    )}
                </div>
                <Download className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors shrink-0" />
            </CardContent>
        </Card>
    )
}

export default function CurriculumPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-12">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
                <PageHeader
                    title={curriculumData.title}
                    description={curriculumData.description}
                />

                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Overview */}
                    <section className="text-center max-w-4xl mx-auto">
                        <FadeIn>
                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                                {curriculumData.overview}
                            </p>
                        </FadeIn>
                    </section>

                    <Tabs defaultValue="ug" className="space-y-8">
                        <div className="flex justify-center">
                            <TabsList className="bg-white border border-stone-200 p-1.5 lg:p-1 h-auto rounded-3xl lg:rounded-full shadow-sm !flex !flex-col lg:!flex-row !w-full lg:!w-auto">
                                <TabsTrigger
                                    value="ug"
                                    className="!w-full lg:!w-auto rounded-2xl lg:rounded-full px-4 lg:px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all text-sm lg:text-base whitespace-normal lg:whitespace-nowrap h-auto"
                                >
                                    Undergraduate (B.E.)
                                </TabsTrigger>
                                <TabsTrigger
                                    value="pg"
                                    className="!w-full lg:!w-auto rounded-2xl lg:rounded-full px-4 lg:px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all text-sm lg:text-base whitespace-normal lg:whitespace-nowrap h-auto"
                                >
                                    Postgraduate (M.Tech/MBA/MCA)
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="ug" className="space-y-12">
                            {/* First Year */}
                            <section>
                                <SectionTitle>First Year B.E. (Common)</SectionTitle>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {curriculumData.ug.firstYear.schemes.map((scheme, idx) => (
                                        <FadeIn key={idx} delay={idx * 0.05}>
                                            <DocumentCard
                                                title={scheme.title}
                                                subtitle={scheme.cycle}
                                                date={scheme.year}
                                            />
                                        </FadeIn>
                                    ))}
                                </div>
                            </section>

                            {/* Departments */}
                            <section>
                                <SectionTitle>Departmental Schemes</SectionTitle>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {curriculumData.ug.departments.map((dept, idx) => (
                                        <FadeIn key={idx} delay={idx * 0.05}>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-orange-100/50 flex items-center justify-center text-orange-600 shrink-0">
                                                        <GraduationCap className="w-4 h-4" />
                                                    </div>
                                                    <h3 className="font-bold text-gray-900 text-lg min-w-0 break-words">{dept.dept}</h3>
                                                </div>
                                                <div className="grid gap-3">
                                                    {dept.schemes.map((scheme, sIdx) => (
                                                        <DocumentCard key={sIdx} title={scheme.title} />
                                                    ))}
                                                </div>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                                <div className="mt-8 text-center">
                                    <Link href="/academics/departments" className="text-primary font-medium hover:underline inline-flex items-center gap-2">
                                        View schemes for all 11 departments <BookOpen className="w-4 h-4" />
                                    </Link>
                                </div>
                            </section>
                        </TabsContent>

                        <TabsContent value="pg" className="space-y-12">
                            <section>
                                <SectionTitle>Masters Programmes</SectionTitle>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {curriculumData.pg.programs.map((prog, idx) => (
                                        <FadeIn key={idx} delay={idx * 0.05}>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-blue-600 shrink-0">
                                                        <BookOpen className="w-4 h-4" />
                                                    </div>
                                                    <h3 className="font-bold text-gray-900 text-lg min-w-0 break-words">{prog.name}</h3>
                                                </div>
                                                <div className="grid gap-3">
                                                    {prog.schemes.map((scheme, sIdx) => (
                                                        <DocumentCard key={sIdx} title={scheme.title} />
                                                    ))}
                                                </div>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </section>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
