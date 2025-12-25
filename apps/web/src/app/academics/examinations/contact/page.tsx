"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Contact Information</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Get in touch with the Examination Section.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <FadeIn>
                    <div className="grid gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Us</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-50 text-primary rounded-lg shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Address</p>
                                        <p className="text-gray-600">
                                            S. Nijalingappa Vidyanagar, Bagalkot - 587102,<br />
                                            Karnataka, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-50 text-primary rounded-lg shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Phone</p>
                                        <p className="text-gray-600">+91-8354-234060 / 234204</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-50 text-primary rounded-lg shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Email</p>
                                        <p className="text-gray-600">principal@becbgk.edu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
