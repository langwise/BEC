"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { FileText, Download } from "lucide-react";
import Link from "next/link";

const regulations = [
    { title: "1. B.E. BEC REGULATIONS 2024-2025", link: "https://becbgk.edu/BEC%20BE%20Regulations/BE%20Regulations%202024-25%2021-12-2024.pdf" },
    { title: "2. MTech Regulations 2024-25", link: "https://becbgk.edu/EXAM/Documents1/2_MTech%20Regulations%202024-25-19-12-2024.pdf" },
    { title: "3. MCA Regulations 2024-25", link: "https://becbgk.edu/EXAM/Documents1/3_MCA%20Regulations%202024-25-19-12-2024.pdf" },
    { title: "4. MBA Regulations 2024-25", link: "https://becbgk.edu/EXAM/Documents1/4_MBA%20Regulations%202024-25%2019-12-2024.pdf" },
    { title: "5. B.E. BEC REGULATIONS 2023-2024", link: "https://becbgk.edu/EXAM/Documents/RR/BEC%20Regulations%202023-24%2008-01-2024.pdf" },
    { title: "6. MTech Regulations 2023-24", link: "https://becbgk.edu/EXAM/Documents1/6_MTech%20Regulations%202023-24%2026-03-2024.pdf" },
    { title: "7. MCA Regulations 2023-24", link: "https://becbgk.edu/EXAM/Documents1/7_MCA%20Regulations%202023-24%2026-03-2024.pdf" },
    { title: "8. MBA-Regulations-2023-24", link: "https://becbgk.edu/EXAM/Documents1/8_MBA-Regulations-2023-24.%2026.03.2024.pdf" },
    { title: "9. B.E. BEC REGULATIONS 2022-2023", link: "https://becbgk.edu/EXAM/Documents/RR/BEC%20Regulations%202022-23%2008-01-2024.pdf" },
    { title: "10. M.Tech. BEC REGULATIONS 2022-2023", link: "https://becbgk.edu/EXAM/Documents/RR/2.BEC%20MTech%20Regulations%202022-23.pdf" },
    { title: "11. MBA. BEC REGULATIONS 2022-2023", link: "https://becbgk.edu/EXAM/Documents/RR/3.BEC%20MBA%20-Regulations%202022-23%20.pdf" },
    { title: "12. B.E. BEC REGULATIONS 2021-2022", link: "https://becbgk.edu/EXAM/Documents/RR/11BEC%20BE%20Regulations%202021-22_31-05-2023.pdf" },
    { title: "13. M.Tech. BEC REGULATIONS 2021-22", link: "https://becbgk.edu/EXAM/Documents/RR/5.BEC%20MTech%20Regulations%202021-22.pdf" },
    { title: "14. MBA. BEC REGULATIONS 2021-22", link: "https://becbgk.edu/EXAM/Documents/RR/6.BEC%20MBA%20regulations%202021-22.pdf" },
    { title: "15. BEC REGULATIONS 2020-21", link: "https://becbgk.edu/EXAM/Documents/RR/8.BEC-Regulations%202020-21%2816-11-2022%29.pdf" },
    { title: "16. BEC REGULATIONS 2019-20", link: "https://becbgk.edu/EXAM/Documents/RR/7.BEC-Regulations%202019-20%2816-11-2022%29.pdf" },
    { title: "17. BEC REGULATIONS 2018-19", link: "https://becbgk.edu/EXAM/Documents/RR/9.BEC-Regulations%202018-19%2816-11-2022%29.pdf" },
];

export default function RulesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">BEC Rules and Regulations</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Academic regulations and guidelines for various programmes.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <FadeIn>
                    <div className="grid gap-3">
                        {regulations.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                target="_blank"
                                className="flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200 hover:border-primary hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">{item.title}</span>
                                </div>
                                <Download className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                            </Link>
                        ))}
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
