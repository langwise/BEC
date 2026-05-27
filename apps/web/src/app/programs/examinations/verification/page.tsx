"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { CheckCircle2, Download } from "lucide-react";
import Link from "next/link";

export default function VerificationPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Academic Verification</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Procedure and documents for academic record verification.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <FadeIn>
                    <div className="bg-white p-6 rounded-2xl border border-stone-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Verification Guidelines</h3>
                        <p className="text-gray-600 mb-6">
                            Employers or Background Verification Agencies can download the Academic Verification form and procedure document below. Please ensure all details are filled correctly before submission.
                        </p>

                        <Link
                            href="https://becbgk.edu/EXAM/Documents1/Academic%20Verification_N.docx"
                            className="flex items-center gap-3 p-4 bg-blue-50 text-primary rounded-xl hover:bg-primary hover:text-white transition-all w-fit font-medium"
                        >
                            <Download className="w-5 h-5" />
                            Download Verification Form
                        </Link>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
