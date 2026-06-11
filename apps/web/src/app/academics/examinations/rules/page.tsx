import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { asset } from "@/lib/assets";
import { FileText, Download } from "lucide-react";
import Link from "next/link";

export const metadata = pageMetadata({
    title: "Rules and Regulations",
    description:
        "Download BEC Bagalkote's autonomous academic regulations for B.E., M.Tech, MCA and MBA programmes, covering scheme years from 2018-19 through 2024-25.",
    path: "/academics/examinations/rules",
});

const regulations = [
    { title: "1. B.E. BEC REGULATIONS 2024-2025", link: asset("documents/regulations/be-regulations-2024-25-21-12-2024.pdf") },
    { title: "2. MTech Regulations 2024-25", link: asset("documents/regulations/2-mtech-regulations-2024-25-19-12-2024.pdf") },
    { title: "3. MCA Regulations 2024-25", link: asset("documents/regulations/3-mca-regulations-2024-25-19-12-2024.pdf") },
    { title: "4. MBA Regulations 2024-25", link: asset("documents/regulations/4-mba-regulations-2024-25-19-12-2024.pdf") },
    { title: "5. B.E. BEC REGULATIONS 2023-2024", link: asset("documents/regulations/bec-regulations-2023-24-08-01-2024.pdf") },
    { title: "6. MTech Regulations 2023-24", link: asset("documents/regulations/6-mtech-regulations-2023-24-26-03-2024.pdf") },
    { title: "7. MCA Regulations 2023-24", link: asset("documents/regulations/7-mca-regulations-2023-24-26-03-2024.pdf") },
    { title: "8. MBA-Regulations-2023-24", link: asset("documents/regulations/8-mba-regulations-2023-24-26-03-2024.pdf") },
    { title: "9. B.E. BEC REGULATIONS 2022-2023", link: asset("documents/regulations/bec-regulations-2022-23-08-01-2024.pdf") },
    { title: "10. M.Tech. BEC REGULATIONS 2022-2023", link: asset("documents/regulations/2-bec-mtech-regulations-2022-23.pdf") },
    { title: "11. MBA. BEC REGULATIONS 2022-2023", link: asset("documents/regulations/3-bec-mba-regulations-2022-23.pdf") },
    { title: "12. B.E. BEC REGULATIONS 2021-2022", link: asset("documents/regulations/11bec-be-regulations-2021-22-31-05-2023.pdf") },
    { title: "13. M.Tech. BEC REGULATIONS 2021-22", link: asset("documents/regulations/5-bec-mtech-regulations-2021-22.pdf") },
    { title: "14. MBA. BEC REGULATIONS 2021-22", link: asset("documents/regulations/6-bec-mba-regulations-2021-22.pdf") },
    { title: "15. BEC REGULATIONS 2020-21", link: asset("documents/regulations/8-bec-regulations-2020-21-16-11-2022.pdf") },
    { title: "16. BEC REGULATIONS 2019-20", link: asset("documents/regulations/7-bec-regulations-2019-20-16-11-2022.pdf") },
    { title: "17. BEC REGULATIONS 2018-19", link: asset("documents/regulations/9-bec-regulations-2018-19-16-11-2022.pdf") },
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
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200 hover:border-primary hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
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
