"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

const events = [
    { title: "Academic Calender, Even Semester (IV, VI & VIII Sem BE) 2024-25", link: "https://becbgk.edu/EXAM/Documents/Academic%20Calender,Odd%20Semester%20IV,VI,VIII%20UG%2020250215_13320622.pdf", isNew: true },
    { title: "Academic Calender, Odd Semester (I Sem BE), 2024-25", link: "https://becbgk.edu/EXAM/Documents/Academic%20Calender,Odd%20Semester%20I,III,V,VII%20UG%20&%20I,III%20PG20250215_13292427.pdf", isNew: true },
    { title: "2023-24 Odd VII_Sem_B.E._Calender_of_Events", link: "https://becbgk.edu/EXAM/Documents/calander%20of%20events/Calendar%20of%20Events%20BE%20VII%20sem%202023-24.pdf" },
    { title: "2023-24 Odd I_Sem_B.E._Calender_of_Events", link: "https://becbgk.edu/EXAM/Documents/calander%20of%20events/Calendar%20of%20Events%20BE%20I%20sem%202023-24.pdf" },
    { title: "2023-24 Odd III and V Sem_B.E._Calender_of_Events", link: "#" },
    { title: "2023-24 Odd III Sem M.Tech and MBA Calender_of_Events", link: "#" },
    { title: "2022-23 Even II_and_IV_Sem_B.E._Calender_of_Events", link: "#" },
    { title: "2022-23 Even IV_Semester_MBA_and_M.Tech_Calender_of_Events", link: "#" },
    { title: "2022-23 Even VI_and_VIII_Sem_B.E._Calender_of_Events", link: "#" },
    { title: "2022-23 Odd V/VII Semester B.E Calendar of Events", link: "#" },
    { title: "2022-23 Odd III Semester B.E Calendar of Events", link: "#" },
    { title: "2022-23 Odd Semester M.Tech/MBA Calendar of Events", link: "#" },
    { title: "2022-23 Odd I Semester B.E Calendar of Events", link: "#" },
    { title: "2021-22 Odd V/VII B.E , III Semester MBA Calendar of Events", link: "#" },
    { title: "2021-22 Odd III Semester B.E Calendar of Events", link: "#" },
    { title: "2021-22 Odd III Semester M.Tech Calendar of Events", link: "#" },
    { title: "2021-22 Odd I Semester B.E Calendar of Events", link: "#" },
    { title: "2021-22 Odd I Semester M.Tech / MBA Calendar of Events", link: "#" },
    { title: "2021-22 Even VI/VIII B.E , IV Semester MBA Calendar of Events", link: "#" },
    { title: "2021-22 Even IV Semester B.E Calendar of Events", link: "#" },
    { title: "2021-22 Even II Semester B.E Calendar of Events", link: "#" },
    { title: "2021-22 Even II Semester M.Tech / MBA Calendar of Events", link: "#" },
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
                                className="flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200 hover:border-primary hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-gray-700 group-hover:text-primary transition-colors flex items-center gap-2">
                                        {item.title}
                                        {item.isNew && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                                                New
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                            </Link>
                        ))}
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
