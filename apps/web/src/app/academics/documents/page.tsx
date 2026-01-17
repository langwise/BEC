"use client";

import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle2, FileText, Info } from "lucide-react";

const documentsData = [
    { id: 1, original: "CET/Comedk Admission Order", xerox: "CET/Comedk Admission Order" },
    { id: 2, original: "PUC II year marks card", xerox: "PUC II year marks card" },
    { id: 3, original: "SSLC Marks card", xerox: "SSLC Marks card" },
    { id: 4, original: "1 – 12 Study certificates", xerox: "1 – 12 Study certificates" },
    { id: 5, original: "Caste and Income certificate", xerox: "Caste and Income certificate" },
    { id: 6, original: "Hyderabad Karnataka Certificate (If applicable)", xerox: "Hyderabad Karnataka Certificate" },
    { id: 7, original: "Transfer Certificate (If Available)", xerox: "Transfer Certificate (If Available)" },
    { id: 8, original: "Aadhar Card", xerox: "Aadhar Card" },
];

export default function DocumentsPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-12">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
                <PageHeader
                    title="Documents for Submission"
                    description="Essential checklist of original documents and copies required for the admission process."
                />

                <section className="max-w-5xl mx-auto">
                    <FadeIn>
                        <div className="space-y-6">
                            {/* Instruction Card */}
                            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6 flex flex-col md:flex-row gap-4 items-start">
                                <Info className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-yellow-900 text-lg">Important Instruction</h3>
                                    <p className="text-yellow-800 mt-1 leading-relaxed">
                                        Dear Students, please arrange the <strong>Original Documents</strong> and <strong>Xerox copies</strong> of the same in the order shown below. Ensure you have 3 sets of Xerox copies for all documents.
                                    </p>
                                </div>
                            </div>

                            {/* Documents Table */}
                            <Card className="bg-white border-stone-200 shadow-sm overflow-hidden">
                                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Check List</CardTitle>
                                            <CardDescription>Required documents for verification and submission</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-stone-50 hover:bg-stone-50">
                                                <TableHead className="w-[80px] text-center font-bold text-gray-700 hidden md:table-cell">Sl. No.</TableHead>
                                                <TableHead className="font-bold text-gray-700">Original Documents</TableHead>
                                                <TableHead className="font-bold text-gray-700">3 sets Xerox copies of documents</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {documentsData.map((doc) => (
                                                <TableRow key={doc.id} className="hover:bg-stone-50/50 transition-colors">
                                                    <TableCell className="text-center font-medium text-gray-500 hidden md:table-cell">{doc.id}</TableCell>
                                                    <TableCell className="font-medium text-gray-900">
                                                        <div className="flex items-start gap-3">
                                                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                                                            {doc.original}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-gray-600 border-l border-stone-100">
                                                        {doc.xerox}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="flex justify-center mt-8">
                                <p className="text-sm text-gray-400 italic flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Please ensure all copies are legible and clear.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
}
