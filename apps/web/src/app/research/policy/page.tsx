"use client";

import { PageHeader } from "@/components/placements/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, FileText } from "lucide-react";
import Link from "next/link";

export default function ResearchPolicyPage() {
    const policyUrl = "https://becbgk.edu/Research/Documents/Research%20Policy.pdf";

    return (
        <div className="space-y-12">
            <PageHeader
                title="Research Policy"
                description="Guidelines and framework for conducting research, innovation, and development activities at BEC."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2 lg:col-span-2 border-orange-100 bg-gradient-to-br from-white to-orange-50/30">
                    <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 shrink-0">
                            <FileText className="w-16 h-16 text-orange-500" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Research Promotion Policy</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    This document outlines the strategic framework for promoting research culture, supporting faculty and student initiatives, and ethical guidelines for academic research at Basaveshwar Engineering College.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200">
                                    <Link href={policyUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Policy
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800">
                                    <Link href={policyUrl} target="_blank" rel="noopener noreferrer">
                                        View Document
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Links or Related Info could go here if needed, for now using a placeholder or just centering the main card if preferred. 
            Given the request for "a component", a single focused card is best. 
            I'll stick to the main card above which looks prominent.
        */}
            </div>
        </div>
    );
}
