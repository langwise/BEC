import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { asset } from "@/lib/assets";
import { Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = pageMetadata({
    title: "Academic Calendar of Events",
    description:
        "Download BEC Bagalkote's academic calendar of events for BE programmes across all semesters, including the latest 2025-26 schedules.",
    path: "/academics/calendar",
});

const events = [
    { title: "I & III Semester BE — 2025-26", link: asset("documents/calendar/2025-26-be-i-and-iii-sem-calendar-of-events.pdf"), isNew: true },
    { title: "II & IV Semester BE — 2025-26", link: asset("documents/calendar/2025-26-be-ii-and-iv-sem-calendar-of-events.pdf"), isNew: true },
    { title: "V & VII Semester BE — 2025-26", link: asset("documents/calendar/2025-26-be-v-and-vii-sem-calendar-of-events.pdf"), isNew: true },
    { title: "VI & VIII Semester BE — 2025-26", link: asset("documents/calendar/2025-26-be-vi-and-viii-sem-calendar-of-events.pdf"), isNew: true },
];

export default function CalendarPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-12">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
                <PageHeader
                    title="Academic Calendar of Events"
                    description="Schedule of academic events and milestones for BE programmes across all semesters."
                />

                <section className="space-y-6">
                    <FadeIn>
                        <div className="grid gap-3">
                            {events.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start md:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-stone-200 hover:border-primary hover:shadow-md transition-all group w-full min-w-0"
                                >
                                    <div className="flex items-start md:items-center gap-3 min-w-0 flex-1">
                                        <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-0.5 md:mt-0">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div className="font-medium text-gray-700 group-hover:text-primary transition-colors flex flex-col md:flex-row md:items-center gap-2 min-w-0">
                                            <span className="break-words">{item.title}</span>
                                            {item.isNew && (
                                                <span className="inline-flex w-fit items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary shrink-0 mt-1 md:mt-0" />
                                </Link>
                            ))}
                        </div>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
}
