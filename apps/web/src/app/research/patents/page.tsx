"use client";

import { PageHeader } from "@/components/placements/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, FileText, Info } from "lucide-react";

export default function PatentsPage() {
    const patents = [
        {
            appNo: "2453/CHE/2015",
            title: "An Electro-Mechanical System for Prevention of Wastage of Cold Water Stored in Hot Water Pipeline",
            type: "Indian",
            dateApp: "15/05/2015",
            dateAward: "18/09/2020",
            status: "In force",
            remarks: "Dr. Krishnamurthy Bhat, Dr. Ramachandra N. Herkal",
        },
        {
            appNo: "201641042251",
            title: "Cookie mix for special need",
            type: "Indian",
            dateApp: "10/12/2016",
            dateAward: "3/11/2020",
            status: "Patent granted",
            remarks: "Patent number- 350729",
        },
        {
            appNo: "201741034621",
            title: "Soap preparation using organic waste for animal use to remove body pests like ticks",
            type: "Chemical (Product)",
            dateApp: "28/09/2017",
            dateAward: null,
            status: "Waiting for the award",
            remarks: "Hearing completed on 4th Jan 2021, NBA to be produced",
        },
        {
            appNo: "201741034620",
            title: "Process of purification of glycerine.",
            type: "Chemical (Process)",
            dateApp: "10/12/2016",
            dateAward: null,
            status: "Waiting for the award",
            remarks: "Hearing completed on 11th Jan 2021, NBA to be produced",
        },
        {
            appNo: "202011039249",
            title: "Methods and Model for Work Life Balance of Women Entrepreneurs",
            type: "Ordinary",
            dateApp: "11/09/2020",
            dateAward: "-",
            status: "Published",
            remarks: "-",
        },
        {
            appNo: "202041045268",
            title: "A Novel Model for Stress and Coping Strategies",
            type: "Ordinary",
            dateApp: "17/10/2020",
            dateAward: "-",
            status: "Filed",
            remarks: "Awaiting for publication",
        },
    ];

    const getStatusColor = (status: string) => {
        if (status.includes("granted") || status.includes("In force")) return "bg-green-100 text-green-700 border-green-200";
        if (status.includes("Waiting") || status.includes("Filed") || status.includes("Published")) return "bg-blue-50 text-blue-700 border-blue-200";
        return "bg-gray-100 text-gray-700 border-gray-200";
    };

    const getStatusIcon = (status: string) => {
        if (status.includes("granted") || status.includes("In force")) return <CheckCircle className="w-3 h-3 mr-1" />;
        if (status.includes("Waiting") || status.includes("Filed") || status.includes("Published")) return <Clock className="w-3 h-3 mr-1" />;
        return <Info className="w-3 h-3 mr-1" />;
    };

    return (
        <div className="space-y-12">
            <PageHeader
                title="Patents"
                description="Innovation and intellectual property contributions from our research community."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {patents.map((patent, index) => (
                    <Card key={index} className="flex flex-col h-full border-orange-100 hover:border-orange-200 hover:shadow-md transition-all duration-300">
                        <CardHeader className="bg-orange-50/50 border-b border-orange-50 pb-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <Badge variant="outline" className="bg-white text-orange-600 border-orange-200 font-medium">
                                    {patent.type} Patent
                                </Badge>
                                <Badge variant="secondary" className={`flex items-center ${getStatusColor(patent.status)}`}>
                                    {getStatusIcon(patent.status)}
                                    {patent.status}
                                </Badge>
                            </div>
                            <CardTitle className="text-lg font-bold text-gray-900 leading-snug mt-3 min-h-[3.5rem] flex items-center">
                                {patent.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 flex-grow flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Application No.</p>
                                    <div className="flex items-center text-gray-800 font-medium">
                                        <FileText className="w-4 h-4 mr-2 text-orange-400" />
                                        {patent.appNo}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Filing Date</p>
                                    <div className="flex items-center text-gray-800 font-medium">
                                        <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                                        {patent.dateApp}
                                    </div>
                                </div>
                            </div>

                            {patent.dateAward && patent.dateAward !== "-" && (
                                <div className="bg-green-50 p-3 rounded-lg border border-green-100 mt-2">
                                    <p className="text-green-700 text-xs font-bold uppercase tracking-wider mb-1">Awarded On</p>
                                    <p className="font-semibold text-green-900">{patent.dateAward}</p>
                                </div>
                            )}

                            {(patent.remarks && patent.remarks !== "-") && (
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Remarks / Details</p>
                                    <p className="text-sm text-gray-700 italic leading-relaxed">{patent.remarks}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
