import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Building2, Users, Trees, Zap, CheckCircle2 } from "lucide-react";
import { asset } from "@/lib/assets";

export const metadata = pageMetadata({
    title: "Netaji Block Boys Hostel",
    description:
        "Netaji Block at BEC Bagalkote, started in 1996 for first-year boys, offers 100 rooms for 300 students with a garden, vegetarian mess, gym, library and computer centre.",
    path: "/hostel/netaji-block",
});

export default function NetajiBlockPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Netaji Block</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Boys Hostel (First Year Students)
                </p>
            </div>

            <FadeIn>
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-stone-200 shadow-xs sm:aspect-2/1">
                    <Image
                        src={asset("facilities/hostels/netaji-block/nblock.webp")}
                        alt="Netaji Block boys hostel at Basaveshwar Engineering College"
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                    />
                </div>
            </FadeIn>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <Building2 className="w-6 h-6" />
                    <h2 className="text-xl font-bold">About the Block</h2>
                </div>

                <FadeIn>
                    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                        <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                            The Netaji hostel was started in the year <strong>1996</strong> to accommodate the increase in demand from the students of Basaveshwar Engineering College Bagalkote. This hostel was mainly started to accommodate the first year students of the college. The hostel has a beautiful garden with all the adequate facilities required for the students. The total number of rooms in the hostel is 100 with total capacity of 300 students.
                        </p>
                        <div className="flex items-start gap-3 bg-green-50 text-green-800 p-4 rounded-xl border border-green-100 mb-6">
                            <Trees className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-sm">The hostel has a beautiful garden with all the adequate facilities required for the students.</p>
                        </div>

                        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-stone-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-primary rounded-lg">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Capacity</p>
                                    <p className="font-bold text-gray-900">300 Students</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-primary rounded-lg">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Rooms</p>
                                    <p className="font-bold text-gray-900">100 Rooms</p>
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
        </div>
    );
}
