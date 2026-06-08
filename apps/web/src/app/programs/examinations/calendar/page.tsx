"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { asset } from "@/lib/assets";
import { Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

const events = [
    { title: "Academic Calender, Even Semester (IV, VI & VIII Sem BE) 2024-25", link: asset("documents/calendar/academic-calender-odd-semester-iv-vi-viii-ug-20250215-13320622.pdf"), isNew: true },
    { title: "Academic Calender, Odd Semester (I Sem BE), 2024-25", link: asset("documents/calendar/academic-calender-odd-semester-i-iii-v-vii-ug-i-iii-pg20250215-13292427.pdf"), isNew: true },
    { title: "2023-24 Odd VII_Sem_B.E._Calender_of_Events", link: asset("documents/calendar/calendar-of-events-be-vii-sem-2023-24.pdf") },
    { title: "2023-24 Odd I_Sem_B.E._Calender_of_Events", link: asset("documents/calendar/calendar-of-events-be-i-sem-2023-24.pdf") },
    { title: "2023-24 Odd III and V Sem_B.E._Calender_of_Events", link: asset("documents/calendar/calendar-of-events-be-iii-and-v-sem-2023-24.pdf") },
    { title: "2023-24 Odd III Sem M.Tech and MBA Calender_of_Events", link: asset("documents/calendar/calendar-of-events-iii-sem-m-tech-mba.pdf") },
    { title: "2022-23 Even II_and_IV_Sem_B.E._Calender_of_Events", link: asset("documents/calendar/2022-23-even-ii-and-iv-sem-b-e-calender-of-events.pdf") },
    { title: "2022-23 Even IV_Semester_MBA_and_M.Tech_Calender_of_Events", link: asset("documents/calendar/2022-23-even-iv-semester-mba-and-m-tech-calender-of-events.pdf") },
    { title: "2022-23 Even VI_and_VIII_Sem_B.E._Calender_of_Events", link: asset("documents/calendar/2022-23-even-vi-and-viii-sem-b-e-calender-of-events.pdf") },
    { title: "2022-23 Odd Semester M.Tech/MBA Calendar of Events", link: asset("documents/calendar/academi-calendar-mba-mtech-odd-sem-2022-23.pdf") },
];

export default function CalendarPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Calendar of Events</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Schedule of academic events and milestones.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <FadeIn>
                    <div className="grid gap-3">
                        {events.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                target="_blank"
                                className="flex items-start md:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-stone-200 hover:border-primary hover:shadow-md transition-all group w-full min-w-0"
                            >
                                <div className="flex items-start md:items-center gap-3 min-w-0 flex-1">
                                    <div className="p-2 bg-blue-50 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-0.5 md:mt-0">
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
    );
}
