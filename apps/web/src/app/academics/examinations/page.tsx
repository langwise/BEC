"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Building2, CheckCircle2, Award } from "lucide-react";

export default function ExaminationsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Autonomous Examination Section</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Ensuring integrity, transparency, and excellence in assessment and evaluation.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <Building2 className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Overview</h2>
                </div>

                <FadeIn>
                    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs prose prose-blue max-w-none text-gray-700">
                        <p className="leading-relaxed">
                            Basaveshwar Engineering College, Bagalkot was granted <strong>Autonomous status</strong> from the academic year 2007-2008 by Visvesvaraya Technological University (VTU), Belagavi. The Autonomous Examination Section was established in the year 2007 to oversee the conduct of examinations and evaluation processes.
                        </p>
                        <p className="leading-relaxed mt-4">
                            The examination section is dedicated to maintaining high standards in the assessment of student performance. It is headed by the <strong>Controller of Examinations</strong>, supported by a team comprising a Special Officer, Chief Coordinators, Coordinators, and administrative staff.
                        </p>
                    </div>
                </FadeIn>
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Key Functionalities</h2>
                </div>

                <FadeIn delay={0.1}>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            "Online Course Registration",
                            "CIE Marks Entry for Faculty",
                            "Conduction of SEE Examinations",
                            "Result Processing & Analysis",
                            "Result Announcement",
                            "Printing of Grade Cards",
                            "Issue of Transcripts",
                            "Submitting Final Degree Lists to VTU",
                            "Uploading Marks Sheets to NAD"
                        ].map((func, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                <span className="font-medium text-gray-700">{func}</span>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
