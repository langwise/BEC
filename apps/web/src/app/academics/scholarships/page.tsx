"use client";

import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, GraduationCap, Info } from "lucide-react";

const scholarshipData = [
    { id: 1, particulars: "SC/ST Scholarship (SSP)", department: "Social Welfare Dept. & Tribal Welfare Dept. Govt. of Karnataka", website: "https://ssp.postmatric.karnataka.gov.in" },
    { id: 2, particulars: "SC/ST Fee Concession (SSP)", department: "DTE, Bengaluru, Govt. of Karnataka", website: "https://ssp.postmatric.karnataka.gov.in" },
    { id: 3, particulars: "SC/ST Defence Scholarship (SSP)", department: "DTE, Bengaluru, Govt. of Karnataka", website: "https://ssp.postmatric.karnataka.gov.in" },
    { id: 4, particulars: "Minority Scholarship (SSP)", department: "Dept of Minority Welfare, Govt. of Karnataka", website: "https://ssp.postmatric.karnataka.gov.in" },
    { id: 5, particulars: "OBC Fee Concession (SSP)", department: "Backward classis welfare dept. Govt. of Karnataka", website: "https://ssp.postmatric.karnataka.gov.in" },
    { id: 6, particulars: "Other State Scholarship (J & K Students)", department: "AICTE, New Delhi", website: "https://www.aicte-india.org/" },
    { id: 7, particulars: "NSP (National Scholarship Portal) - Central Schemes, State Schemes, UGC/AICTE Schemes", department: "Central Schemes / State Schemes / UGC/AICTE Schemes", website: "https://nsp.gov.in/" },
    { id: 8, particulars: "Meritorious students secure highest marks in PUC at district level", department: "SWF/TBF", website: "http://schooleducation.kar.nic.in/swftbf/students.html" },
    { id: 9, particulars: "College Topper", department: "Shri. Biluru Guru Basav Utstav Samiti, Bagalkote", website: "" },
];

export default function ScholarshipsPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-12">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
                <PageHeader
                    title="Scholarship Details"
                    description="Information regarding various scholarships available for students from state and central governments."
                />

                <section className="max-w-6xl mx-auto">
                    <FadeIn>
                        <div className="space-y-6">
                            {/* Highlights/Intro */}
                            <div className="bg-white border border-stone-200 rounded-xl p-6 flex items-start gap-4 shadow-xs">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-full shrink-0">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Financial Aid & Support</h3>
                                    <p className="text-gray-600 mt-1 leading-relaxed">
                                        Basaveshwar Engineering College encourages students to avail of various scholarships provided by the Government of Karnataka, Government of India, and other organizations. Below is the list of available scholarships.
                                    </p>
                                </div>
                            </div>

                            {/* Scholarship Table */}
                            <Card className="bg-white border-stone-200 shadow-sm overflow-hidden">
                                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-4">
                                    <CardTitle className="text-xl">Available Scholarships</CardTitle>
                                    <CardDescription>List of scholarships, relevant departments, and application links.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-stone-50 hover:bg-stone-50 text-base">
                                                    <TableHead className="w-[80px] text-center font-bold text-gray-700">Sl. No.</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[250px]">Particulars</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[300px]">Department</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[200px]">Website</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {scholarshipData.map((item) => (
                                                    <TableRow key={item.id} className="hover:bg-stone-50/50 transition-colors">
                                                        <TableCell className="text-center font-medium text-gray-500">{item.id}</TableCell>
                                                        <TableCell className="font-medium text-gray-900">
                                                            {item.particulars}
                                                        </TableCell>
                                                        <TableCell className="text-gray-600">
                                                            {item.department}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.website ? (
                                                                <a
                                                                    href={item.website}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 hover:underline font-medium break-all"
                                                                >
                                                                    Visit Site
                                                                    <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            ) : (
                                                                <span className="text-gray-400 italic text-sm">Offline / Contact College</span>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
}
