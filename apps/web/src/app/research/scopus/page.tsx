"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { FileText, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

const publicationYears = [
    { year: "2022-2023", link: "https://becbgk.edu/Research/Documents/Publications/Scopus_BEC%202022.pdf" },
    { year: "2021-2022", link: "https://becbgk.edu/Research/Documents/Publications/Scopus_BEC%202021.pdf" },
    { year: "2020-2021", link: "https://becbgk.edu/Research/Documents/Publications/Scopus_BEC%202020.pdf" },
    { year: "2019-2020", link: "https://becbgk.edu/Research/Documents/Publications/Scopus_BEC%202019.pdf" },
    { year: "2018-2019", link: "https://becbgk.edu/Research/Documents/Publications/Scopus_BEC%202018.pdf" },
    { year: "2017-2018", link: "https://becbgk.edu/Research/Documents/Publications/Scopus_BEC%202017.pdf" },
];

export default function ScopusPublicationsPage() {
    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            <PageHeader
                title="Scopus Publications"
                description="Access our comprehensive collection of research publications indexed in Scopus database."
            />

            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publicationYears.map((item, index) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 flex flex-col hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                                    <FileText className="w-8 h-8 text-primary" />
                                </div>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                                    PDF
                                </span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Publications {item.year}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    View the list of Scopus indexed publications for the academic year {item.year}.
                                </p>
                            </div>

                            <div className="mt-auto grid grid-cols-2 gap-3">
                                <Link
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View
                                </Link>
                                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                    <Download className="w-4 h-4" />
                                    Download
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
