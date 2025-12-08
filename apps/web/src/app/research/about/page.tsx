"use client";

import { PageHeader } from "@/components/placements/page-header";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function AboutResearchPage() {
    const researchData = [
        {
            id: 1,
            centre: "Biotechnology",
            est: 2010,
            guides: 4,
            scholars: 5,
            awarded: 9,
        },
        {
            id: 2,
            centre: "Civil Engg.",
            est: 2003,
            guides: 11,
            scholars: 18,
            awarded: 22,
        },
        {
            id: 3,
            centre: "Computer Science Engg.",
            est: 2004,
            guides: 11,
            scholars: 23,
            awarded: 13,
        },
        {
            id: 4,
            centre: "Electronics & Comm. Engg.",
            est: 2005,
            guides: 14,
            scholars: 18,
            awarded: 25,
        },
        {
            id: 5,
            centre: "Electrical & Electronics Engg.",
            est: 2003,
            guides: 4,
            scholars: 8,
            awarded: 13,
        },
        {
            id: 6,
            centre: "Industrial & Production",
            est: 2007,
            guides: 5,
            scholars: 13,
            awarded: 5,
        },
        {
            id: 7,
            centre: "Information Science Engg.",
            est: 2020,
            guides: 2,
            scholars: 2,
            awarded: "--",
        },
        {
            id: 8,
            centre: "Mechanical Engg.",
            est: 2003,
            guides: 9,
            scholars: 32,
            awarded: 53,
        },
        {
            id: 9,
            centre: "Physics",
            est: 2012,
            guides: 3,
            scholars: 3,
            awarded: "--",
        },
        {
            id: 10,
            centre: "MBA",
            est: 2020,
            guides: 1,
            scholars: 1,
            awarded: "--",
        },
    ];

    return (
        <div className="space-y-12">
            <PageHeader
                title="About Research"
                description="Overview of research activities, facilities, and achievements at Basaveshwar Engineering College."
            />

            <div className="space-y-12">
                {/* Overview Layout: Text Left, Dean Card Right (on large screens) */}
                <div className="flex flex-col xl:flex-row gap-8 items-start">
                    <div className="prose prose-lg prose-orange max-w-none flex-1 text-gray-600 leading-relaxed text-justify">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 not-prose">
                            Overview
                        </h3>
                        <p>
                            The college has well qualified faculty with 87 faculty having Ph.D
                            degrees from IITs and NITs and are involved in Quality
                            teaching-learning processes. The college has 10 research centres
                            recognised by VTU, Belagavi and is a QIP centre for Ph.D.
                            admissions by MHRD. In last 05 years 123 scholars have registered
                            for Ph.D programs and in last 20 years 140 scholars have been
                            awarded the doctorate degree. The proactive core research
                            activities have helped the college in securing grants to the tune
                            of Rs. 3.00 Crores in the last FIVE years, apart from 40 Crores
                            under Technical Education Quality Improvement Programme (TEQIP) of
                            World Bank, in its 3-Phases. The College has effectively utilized
                            the support it received under TEQIP-I, TEQIP-II and TEQIP-III and
                            has emerged as one of the best Institutions in the state in
                            technical education and research.
                        </p>
                        <p>
                            The College has initiated several measures to strengthen the
                            infrastructure for research and post graduate education on par
                            with institutes of higher learning. The Alumni also have made
                            significant contributions to the community in their own field of
                            specializations. Thus, the college has made a significant progress
                            in the fields of technical education and research during the last
                            25 years and is thriving to excel itself and reach to the newer
                            zeniths.
                        </p>
                        <p>
                            To promote research in BEC, high quality research facilities are
                            created in the areas of Environmental Engg., Structural Engg.,
                            Renewable Energy, Materials, Noise Harshness, Geotechnical Engg.,
                            Modern Machining, Vision computing, Image processing etc.. Several
                            Laboratories are established in association with Industries like
                            Bosch Rexroth centre for industrial automation, Biodiesel centre.
                            MEMS design centre, Nokia research center, SCADA laboratory, Intel
                            intelligent systems laboratory etc. Collaborative research with
                            IISc., IITs and NITs and foreign universities (Saginaw Valley
                            State University, Texas University, Arlington, IMFT) have opened
                            up new avenues for improved teaching learning and research. This
                            has resulted into patents and research achievements with 855
                            publications in national and international peer reviewed journals
                            and 355 in national and international conferences during last five
                            years.
                        </p>
                    </div>

                    {/* Dean R&D Card */}
                    <Card className="w-full xl:w-80 border-orange-100 shadow-md bg-white shrink-0">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2 bg-gradient-to-br from-orange-50 to-white rounded-t-xl border-b border-orange-50">
                            <div className="bg-white p-2 rounded-full shadow-sm border border-orange-100">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                                    Dean R & D
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <h4 className="text-lg font-bold text-gray-800 mb-1">Dr. Mahabaleshwar S. Kakkasageri</h4>
                                <p className="text-sm font-medium text-primary bg-orange-50 inline-block px-3 py-1 rounded-full">Dean R & D</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Research Centre Information Table */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Research Centre Information
                    </h3>
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-orange-50 hover:bg-orange-50">
                                    <TableHead className="w-[80px] font-bold text-gray-800">
                                        Sl. No.
                                    </TableHead>
                                    <TableHead className="font-bold text-gray-800">
                                        Research Centre
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-gray-800">
                                        Year of Est.
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-gray-800">
                                        Registered Guides
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-gray-800">
                                        Scholars Registered
                                    </TableHead>
                                    <TableHead className="text-right font-bold text-gray-800">
                                        Ph.D. Awarded
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {researchData.map((row) => (
                                    <TableRow key={row.id} className="hover:bg-orange-50/50">
                                        <TableCell className="font-medium text-gray-600">
                                            {row.id}
                                        </TableCell>
                                        <TableCell className="font-semibold text-gray-800">
                                            {row.centre}
                                        </TableCell>
                                        <TableCell className="text-center text-gray-600">
                                            {row.est}
                                        </TableCell>
                                        <TableCell className="text-center text-gray-600">
                                            {row.guides}
                                        </TableCell>
                                        <TableCell className="text-center text-gray-600">
                                            {row.scholars}
                                        </TableCell>
                                        <TableCell className="text-right font-bold text-primary">
                                            {row.awarded}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter className="bg-gray-50 font-bold border-t-2 border-orange-100">
                                <TableRow>
                                    <TableCell colSpan={3} className="text-right text-gray-900">
                                        Total
                                    </TableCell>
                                    <TableCell className="text-center text-gray-900">64</TableCell>
                                    <TableCell className="text-center text-gray-900">123</TableCell>
                                    <TableCell className="text-right text-primary text-base">140</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
