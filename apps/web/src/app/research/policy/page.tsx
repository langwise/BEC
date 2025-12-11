"use client";

import { PageHeader } from "@/components/placements/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, FileText, Shield, Scale, ScrollText, Eye } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function ResearchPolicyPage() {
    const policyUrl = "https://becbgk.edu/Research/Documents/Research%20Policy.pdf";

    return (
        <div className="space-y-12">

            <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" />

                <div className="relative z-10 grid md:grid-cols-2 gap-12 p-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-200 text-xs font-semibold uppercase tracking-wider">
                            <Shield className="w-4 h-4" />
                            Official Framework
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Research Promotion Policy
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Our comprehensive guide to fostering innovation, ensuring ethical standards, and supporting the academic growth of our faculty and scholars.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-900/20 rounded-xl h-14 px-8 text-base">
                                <Link href={policyUrl} download target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Policy
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/30 rounded-xl h-14 px-8 text-base">
                                <Link href={policyUrl} target="_blank" rel="noopener noreferrer">
                                    <Eye className="mr-2 h-5 w-5" />
                                    View Policy
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative hidden md:block"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl blur-2xl opacity-20 transform rotate-6" />
                        <Card className="relative bg-white/5 backdrop-blur-xl border-white/10 text-white overflow-hidden transform rotate-3 hover:rotate-0 transition-all duration-500">
                            <div className="p-8 space-y-6">
                                <FileText className="w-16 h-16 text-orange-400" strokeWidth={1} />
                                <div className="space-y-2">
                                    <div className="h-2 w-3/4 bg-white/20 rounded-full" />
                                    <div className="h-2 w-full bg-white/10 rounded-full" />
                                    <div className="h-2 w-5/6 bg-white/10 rounded-full" />
                                </div>
                                <div className="pt-6 border-t border-white/10 flex justify-between items-center text-sm text-slate-400">
                                    <span>BEC Research Cell</span>
                                    <span>Official Document</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { title: "Ethical Standards", icon: Scale, desc: "Guidelines for maintaining integrity and transparency in all research methodologies." },
                    { title: "Funding Support", icon: ScrollText, desc: "Framework for applying and managing internal and external research grants." },
                    { title: "Intellectual Property", icon: Shield, desc: "Policies regarding patents, copyrights, and ownership of innovations." }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
