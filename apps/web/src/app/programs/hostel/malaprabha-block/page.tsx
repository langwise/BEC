"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Building2, Info, Users, Sparkles, Zap, CheckCircle2 } from "lucide-react";

export default function MalaprabhaBlockPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Malaprabha Ladies Hostel</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Girls Hostel
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <Building2 className="w-6 h-6" />
                    <h2 className="text-xl font-bold">About the Block</h2>
                </div>

                <FadeIn>
                    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            The hostel was started in the year <strong>1998</strong> to accommodate the students of Basaveshwar Engineering College Bagalkot. The hostel is well equipped with all requisite facilities to cater to the needs of all Girl students. The total number of rooms available in the hostel are 190 with a total capacity of 468 students.
                        </p>

                        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-stone-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-primary rounded-lg">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Capacity</p>
                                    <p className="font-bold text-gray-900">468 Students</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-primary rounded-lg">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Rooms</p>
                                    <p className="font-bold text-gray-900">190 Rooms</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            {/* Facilities Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <Zap className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Facilities Available</h2>
                </div>
                <FadeIn delay={0.1}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            "Pure Vegetarian Mess", "Library", "Computer centre with Internet",
                            "TV", "Multi Gym", "Guest room",
                            "Generator", "Laundry", "Hot water",
                            "Volley ball ground", "Indoor sports (Table Tennis, Carom, Chess etc.)"
                        ].map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-100 shadow-xs hover:border-orange-100 hover:shadow-sm transition-all">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm font-medium text-gray-700">{facility}</span>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
