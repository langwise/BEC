import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { Building2, Users, Zap, CheckCircle2, Phone } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export const metadata = pageMetadata({
    title: "PG Boys Hostel",
    description:
        "PG Boys Hostel at BEC Bagalkote, started in 2013 for PG and research students, offers 40 rooms for 80 students with vegetarian mess, library, gym and computer centre.",
    path: "/hostel/pg-block",
});

export default function PGBlockPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">PG Boys Hostel</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    PG and Research Students
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
                        <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                            The hostel was started in the year <strong>2013</strong> to provide accommodation exclusively for PG and Research students of Basaveshwar Engineering College Bagalkote. Total rooms available in the hostel are 40 with a total capacity of 80 students.
                        </p>

                        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-stone-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-primary rounded-lg">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Capacity</p>
                                    <p className="font-bold text-gray-900">80 Students</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-primary rounded-lg">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Rooms</p>
                                    <p className="font-bold text-gray-900">40 Rooms</p>
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
                            "Volley ball ground", "Indoor sports (Table Tennis, Badminton, Carom, Chess etc.)"
                        ].map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-100 shadow-xs hover:border-orange-100 hover:shadow-sm transition-all">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm font-medium text-gray-700">{facility}</span>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </section>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <Building2 className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Faculty in Charge</h2>
                </div>
                <FadeIn delay={0.2}>
                    <Card className="bg-white border-stone-200 shadow-sm overflow-hidden text-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-orange-50/50 hover:bg-orange-50/50">
                                    <TableHead className="font-bold text-primary border-b border-orange-100">
                                        Designation
                                    </TableHead>
                                    <TableHead className="font-bold text-primary border-b border-orange-100">
                                        Name
                                    </TableHead>
                                    <TableHead className="font-bold text-primary border-b border-orange-100">
                                        Mobile
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { role: "Chief Warden", name: "Dr. B.R Hiremath", phone: null },
                                    { role: "Deputy Chief Warden", name: "Dr. P. L. Timmanagoudar", phone: "+91 94486 93600" },
                                    { role: "Warden / Networking facility", name: "Dr. Mahabaleshwar S. K.", phone: "+91 94828 61933" },
                                    { role: "Warden", name: "Prof. B. A. Vyas", phone: "+91 97433 91794" },
                                ].map((faculty) => (
                                    <TableRow
                                        key={faculty.name}
                                        className="hover:bg-orange-50/30 transition-colors border-b border-stone-100 last:border-0"
                                    >
                                        <TableCell className="font-semibold text-gray-900">
                                            {faculty.role}
                                        </TableCell>
                                        <TableCell className="text-gray-700">
                                            {faculty.name}
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {faculty.phone ? (
                                                <a
                                                    href={`tel:${faculty.phone.replace(/[^+\d]/g, "")}`}
                                                    className="inline-flex items-center gap-1.5 text-primary hover:underline"
                                                >
                                                    <Phone className="w-3.5 h-3.5" />
                                                    {faculty.phone}
                                                </a>
                                            ) : (
                                                "—"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </FadeIn>
            </section>
        </div>
    );
}
