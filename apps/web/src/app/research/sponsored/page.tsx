"use client";

import { PageHeader } from "@/components/placements/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, IndianRupee, User, CheckCircle, Clock } from "lucide-react";

export default function SponsoredResearchPage() {
    const years = [
        {
            year: "2018-19",
            projects: [
                {
                    id: 1,
                    scheme: "Establishing R&D Centres to Support Industries",
                    title: "Solar PV Module testing, Installation, Training Certification and R&D",
                    amount: 60.0,
                    coordinator: "Dr. S. H. Jangamshetti",
                    status: "Procurement of Equipments",
                },
                {
                    id: 2,
                    scheme: "Establishing R&D Centres to Support Industries",
                    title: "Centre for Water and Waste Water Research",
                    amount: 78.0,
                    coordinator: "Dr. Veena Soraganvi",
                    status: "On going",
                },
                {
                    id: 3,
                    scheme: "Establishing R&D Centres to Support Industries",
                    title: "NABL Approved Food testing",
                    amount: 105.0,
                    coordinator: "Dr. Bharati Meti",
                    status: "On going",
                },
            ],
        },
        {
            year: "2017-18",
            projects: [
                {
                    id: 1,
                    scheme: "K-BITS",
                    title: "Biotechnology Skill Enhancement Program (BiSEP)",
                    amount: 162.5,
                    coordinator: "Dr. Virupakshayya DBM",
                    status: "On going",
                },
                {
                    id: 2,
                    scheme: "AICTE-RPS",
                    title: "Comprehensive experimental investigations on combustion performance & emission characteristics of Biodiesel/Oxygen compounds/Diesel fuel in a compression ignition engine",
                    amount: 10.73,
                    coordinator: "Dr. B. K. Venkanna",
                    status: "On going",
                },
                {
                    id: 3,
                    scheme: "AICTE-RPS",
                    title: "Resource Management in IoT",
                    amount: 5.76,
                    coordinator: "Dr. A. V. Sutagundar",
                    status: "On going",
                },
            ],
        },
        {
            year: "2015-2016",
            projects: [
                {
                    id: 1,
                    scheme: "VGST K-FIST level-1",
                    title: "Smart Composites Structures Research Centre (SCSRC)",
                    amount: 20.0,
                    coordinator: "Dr. S. B. Kerur",
                    status: "On going",
                },
                {
                    id: 2,
                    scheme: "VGST",
                    title: "Design & Development of Intelligent routing algorithms for vehicular Ad hoc networks",
                    amount: 4.0,
                    coordinator: "Dr. Mahabaleshwar S. K.",
                    status: "Completed",
                },
                {
                    id: 3,
                    scheme: "NRB New Delhi",
                    title: "Development of ultrafine grained (UPG) Al-mg SC alloys by Repetitive Corrugation and Straightening",
                    amount: 12.88,
                    coordinator: "Dr. S. A. Kori",
                    status: "On going",
                },
                {
                    id: 4,
                    scheme: "SERB DST",
                    title: "Sustainable Agriculture Empowerement & Equity Opportunities for Excellence in Science Programme",
                    amount: 5.0,
                    coordinator: "Dr. K. Y . Bendigeri",
                    status: "On going",
                },
                {
                    id: 5,
                    scheme: "KSBDB GoK",
                    title: "Bioenergy Research, Information & Demonstration Center",
                    amount: 2.0,
                    coordinator: "Dr. Bharati Meti",
                    status: "On going",
                },
                {
                    id: 6,
                    scheme: "K-Bits GoK",
                    title: "Incubation Network under NIAN",
                    amount: 30.0,
                    coordinator: "Prof. A. D. Devanagavi",
                    status: "On going",
                },
            ],
        },
    ];

    const getStatusColor = (status: string) => {
        if (status === "Completed") return "bg-green-100 text-green-700 border-green-200";
        if (status === "On going") return "bg-orange-50 text-orange-700 border-orange-200";
        return "bg-blue-50 text-blue-700 border-blue-200";
    };

    const getStatusIcon = (status: string) => {
        if (status === "Completed") return <CheckCircle className="w-3 h-3 mr-1" />;
        if (status === "On going") return <Clock className="w-3 h-3 mr-1" />;
        return <Clock className="w-3 h-3 mr-1" />; // Default icon
    };

    return (
        <div className="space-y-12">
            <PageHeader
                title="Sponsored Research"
                description="Key research initiatives and projects funded by prestigious government and industry bodies."
            />

            <div className="space-y-10">
                {years.map((yearGroup) => (
                    <section key={yearGroup.year} id={`year-${yearGroup.year}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-orange-100 rounded-lg text-primary">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2 flex-grow">
                                Academic Year: {yearGroup.year}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {yearGroup.projects.map((project, index) => (
                                <Card key={project.id} className="flex flex-col h-full border-orange-100 hover:border-orange-200 hover:shadow-md transition-all duration-300">
                                    <CardHeader className="bg-orange-50/30 border-b border-orange-50 pb-4">
                                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                                            <Badge variant="outline" className="bg-white text-gray-700 border-gray-200 font-medium whitespace-normal text-left">
                                                {project.scheme}
                                            </Badge>
                                            <Badge variant="secondary" className={`flex items-center shrink-0 ${getStatusColor(project.status)}`}>
                                                {getStatusIcon(project.status)}
                                                {project.status}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-lg font-bold text-gray-900 leading-snug min-h-[3.5rem] flex items-center">
                                            {project.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 flex-grow flex flex-col gap-5">
                                        <div className="flex items-center justify-between gap-4 mt-auto">
                                            <div>
                                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Coordinator</p>
                                                <div className="flex items-center text-gray-800 font-medium text-sm">
                                                    <User className="w-4 h-4 mr-2 text-orange-400" />
                                                    {project.coordinator}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Grant Amount</p>
                                                <div className="flex items-center justify-end text-primary font-bold text-lg">
                                                    <IndianRupee className="w-4 h-4 mr-1 stroke-[2.5]" />
                                                    {project.amount.toFixed(2)} <span className="text-sm font-medium text-gray-500 ml-1">Lakhs</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
