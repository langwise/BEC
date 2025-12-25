"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { UserCircle } from "lucide-react";

const staffList = [
    { sl: 1, name: "Sri. Praveen Yalasangi", position: "Asst. Professor" },
    { sl: 2, name: "Smt. Sarvamangala Rajashekhar", position: "Asst. Professor" },
    { sl: 3, name: "Sri. Prasad P. Kulkarni", position: "Asst. Professor" },
    { sl: 4, name: "Sri. Vijay V. Sajjan", position: "Programmer" },
    { sl: 5, name: "Sri. Basavaraj Channalli", position: "FDA" },
    { sl: 6, name: "Sri. Akshayakumar S. Gunaki", position: "FDA" },
    { sl: 7, name: "Sri. A.R. Nayak", position: "Computer Operator/SDA" },
    { sl: 8, name: "Sri. Mahantesh Patil", position: "Computer Operator" },
    { sl: 9, name: "Smt. Deepa S. Kulkarni", position: "Computer Operator/SDA" },
    { sl: 10, name: "Sri. H. Y. Meti", position: "Mechanic" },
    { sl: 11, name: "Sri. Vittal Adagall", position: "Helper" },
    { sl: 12, name: "Sri. Hanamant M Goudar", position: "Peon" },
    { sl: 13, name: "Sri. Hanamant M Koti", position: "Peon" },
];

export default function ExamStaffPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">BEC Exam Staff</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    The team responsible for the smooth conduct of examinations.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <FadeIn>
                    <div className="space-y-8">
                        {/* Controller - Kept from previous structure but can be removed if not needed, assuming keep for context */}
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
                            <div className="p-3 bg-blue-50 text-primary rounded-full">
                                <UserCircle className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Dr. Chandrashekhar K.</h3>
                                <p className="text-primary font-medium">Controller of Examinations</p>
                                <p className="text-sm text-gray-500 mt-1">Professor of Physics</p>
                            </div>
                        </div>

                        {/* Staff Table */}
                        <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-xs bg-white">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-blue-50/50 text-gray-700 font-semibold border-b border-stone-100">
                                        <tr>
                                            <th className="px-6 py-4 w-16 text-center">Sl. No.</th>
                                            <th className="px-6 py-4">Name of the Staff</th>
                                            <th className="px-6 py-4 text-right">Position</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100">
                                        {staffList.map((staff) => (
                                            <tr key={staff.sl} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-6 py-4 text-center font-medium text-gray-500">{staff.sl}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900">{staff.name}</td>
                                                <td className="px-6 py-4 text-right text-gray-600 border-l border-dashed border-stone-100">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                        {staff.position}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
