"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Phone, Mail, MapPin } from "lucide-react";

export default function HostelContactPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Contact Information</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Get in touch with the hostel administration for inquiries and assistance, working hours and visiting hours details.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="grid lg:grid-cols-2 gap-8">
                <FadeIn>
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            Hostel Office
                        </h2>
                        <div className="space-y-4">
                            <div className="p-3 bg-white rounded-xl flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-primary flex items-center justify-center shrink-0 font-bold">W</div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Warden</p>
                                    <p className="font-bold text-gray-900">Dr. P. L. Timmanagoudar</p>
                                    <p className="text-primary font-medium">9448693600</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
