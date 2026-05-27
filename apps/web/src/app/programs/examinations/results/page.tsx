"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function ResultsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Examination Results</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Check your examination results via the Autonomous Portal.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <FadeIn>
                    <Card className="bg-linear-to-br from-blue-50 to-white border-blue-100 overflow-hidden">
                        <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <GraduationCap className="w-8 h-8" />
                            </div>

                            <div className="space-y-2 max-w-lg">
                                <h3 className="text-2xl font-bold text-gray-900">Autonomous Results Portal</h3>
                                <p className="text-gray-600">
                                    Visit the external results portal to view outcomes for Regular, Re-appear, and Makeup examinations.
                                </p>
                            </div>

                            <Link
                                href="http://119.161.97.238:8080/Autonomous/"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md shadow-blue-200"
                            >
                                Go to Results Portal <ArrowRight className="w-4 h-4" />
                            </Link>
                        </CardContent>
                    </Card>
                </FadeIn>
            </section>
        </div>
    );
}
