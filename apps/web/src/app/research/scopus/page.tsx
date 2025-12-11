"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { FileText, Download, ExternalLink, Library } from "lucide-react";
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
        <div className="space-y-16">
            {/* Simple Premium Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-amber-600 p-10 text-white shadow-xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-4">
                        <Library className="w-4 h-4" />
                        Indexed Database
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Scopus Publications</h1>
                    <p className="text-orange-50 max-w-xl mx-auto text-lg">
                        Access our comprehensive collection of global research impact.
                    </p>
                </motion.div>
            </div>

            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publicationYears.map((item, index) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group h-full"
                        >
                            <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 p-6 flex flex-col h-full overflow-hidden">
                                {/* Gradient Effect */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                                <div className="flex items-start justify-between mb-6">
                                    <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                        <FileText className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-700 transition-colors">
                                        PDF
                                    </span>
                                </div>

                                <div className="mb-6 flex-grow">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">
                                        {item.year}
                                    </h3>
                                    <p className="text-slate-500 text-sm">
                                        Academic Year Report
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50 mt-auto">
                                    <Link
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 transition-all"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View
                                    </Link>
                                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all">
                                        <Download className="w-4 h-4" />
                                        Save
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
