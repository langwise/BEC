"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Clock, Download } from "lucide-react";
import Link from "next/link";

const timetables = [
    { title: "1_2024-25 EVEN_4_ 6_ 8_SEMESTER TIME TABLE", link: "https://becbgk.edu/EXAM/Documents1/1_2024-25%20EVEN_4_%206_%208_SEMESTER%20TIME%20TABLE.pdf", isNew: true },
    { title: "2_2024-25 ODD_I SEM PG", link: "https://becbgk.edu/EXAM/Documents1/2_2024-25%20ODD_I%20SEM%20PG.pdf", isNew: true },
    { title: "3_2024-25 ODD_3 SEM PG", link: "https://becbgk.edu/EXAM/Documents1/3_2024-25%20ODD_3%20SEM%20PG.pdf", isNew: true },
    { title: "4_2024-25 ODD_MAKE UP_1_ 3_ 5_ 7 SEM", link: "https://becbgk.edu/EXAM/Documents1/4_2024-25%20ODD_MAKE%20UP_1_%203_%205_%207%20SEM.pdf", isNew: true },
    { title: "5_2024_25_odd_1st_sem Regular & Re-appear", link: "https://becbgk.edu/EXAM/Documents1/5_2024_25_odd_1st_sem_Regular_and_Re-appear.pdf", isNew: true },
    { title: "Time Table for BE I/II Semester SEE Examinations, Feb/March - 2025", link: "https://becbgk.edu/EXAM/Documents/BE.%20I%20Sem%20SEE%20TIMETABLE.pdf", isNew: true },
    { title: "2023-2024 BE VII Semester TIME TABLE", link: "https://becbgk.edu/EXAM/Documents/2023-24_BE_VII_Semester_TIMETABLE.pdf" },
    { title: "2023-2024 BE I Semester TIME TABLE", link: "https://becbgk.edu/EXAM/Documents/2023-24_BE_I_Semester_TIMETABLE.pdf" },
    { title: "2022-2023 BE V and VII Semester TIME TABLE", link: "https://becbgk.edu/EXAM/Documents/2022-23_BE_V_and_VII_Semester_TIMETABLE.pdf" },
    { title: "2022-2023 BE III Semester, M.Tech III Semester & MBA III Semester TIME TABLE", link: "https://becbgk.edu/EXAM/Documents/2022-23_BE_III_Semester_TIMETABLE.pdf" },
    { title: "2022-2023 BE I Semester TIME TABLE", link: "https://becbgk.edu/EXAM/Documents/2022-23_BE_I_Semester_TIMETABLE.pdf" },
    { title: "2021-2022-EVEN II Semester TIME TABLE", link: "https://becbgk.edu/EXAM/Documents/2021-22_EVEN_II_Semester_TIMETABLE.pdf" },
    { title: "2021-2022-EVEN IV Semester TIME TABLE", link: "https://becbgk.edu/EXAM/Documents/2021-22_EVEN_IV_Semester_TIMETABLE.pdf" },
];

export default function TimeTablePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">SEE Time Table</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Semester End Examination schedules.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <FadeIn>
                    <div className="grid gap-3">
                        {timetables.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                target="_blank"
                                className="flex items-start md:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-stone-200 hover:border-primary hover:shadow-md transition-all group w-full min-w-0"
                            >
                                <div className="flex items-start md:items-center gap-3 min-w-0 flex-1">
                                    <div className="p-2 bg-blue-50 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-0.5 md:mt-0">
                                        <Clock className="w-5 h-5" />
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
                                <Download className="w-4 h-4 text-gray-400 group-hover:text-primary shrink-0 mt-1 md:mt-0" />
                            </Link>
                        ))}
                    </div>
                </FadeIn>
            </section>
        </div >
    );
}
