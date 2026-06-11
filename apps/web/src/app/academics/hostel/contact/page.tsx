"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Phone, MapPin, UserCircle } from "lucide-react";

export default function HostelContactPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Contact Information</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Get in touch with the hostel administration for admission inquiries and assistance.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="grid md:grid-cols-2 gap-6">
                <FadeIn>
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 hover:shadow-md transition-shadow h-full">
                        <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            Warden's Office
                        </h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-white rounded-xl flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-primary flex items-center justify-center shrink-0">
                                    <UserCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Deputy Chief Warden</p>
                                    <p className="font-bold text-gray-900">Dr. P. L. Timmanagoudar</p>
                                    <a href="tel:+919448693600" className="text-primary font-medium hover:underline">
                                        +91 94486 93600
                                    </a>
                                </div>
                            </div>
                            <div className="p-4 bg-white rounded-xl flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-primary flex items-center justify-center shrink-0">
                                    <UserCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Chief Warden</p>
                                    <p className="font-bold text-gray-900">Dr. B. R. Hiremath</p>
                                    <p className="text-sm text-gray-500">Principal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 hover:shadow-md transition-shadow h-full">
                        <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Address
                        </h2>
                        <div className="p-4 bg-white rounded-xl">
                            <p className="text-gray-700 leading-relaxed">
                                Basaveshwar Engineering College (Autonomous)<br />
                                Vidyagiri, Bagalkote &ndash; 587 102<br />
                                Karnataka, India
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
