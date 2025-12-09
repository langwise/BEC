"use client";

import { PageHeader } from "@/components/placements/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import {
    ArrowUpRight,
    Cpu,
    Eye,
    Smartphone,
    FlaskConical,
    Layers,
    Mountain,
    Building2,
    Satellite,
    Cog,
    Wind,
    Zap,
    Leaf,
    Microscope
} from "lucide-react";

export default function CentresOfExcellencePage() {
    const centres = [
        {
            id: 1,
            title: "National MEMS Design Center",
            description:
                "NPMASS (National Program for Micro and Smart Structures) is a project of GoI to promote micro and nano technology in India.",
            icon: <Cpu className="w-8 h-8" />,
        },
        {
            id: 2,
            title: "Intel Intelligence System Laboratory",
            description:
                "An exclusive lab is set up in association with INTEL to carry out innovative projects under the MoU on 16.11.2013",
            icon: <Microscope className="w-8 h-8" />,
        },
        {
            id: 3,
            title: "Multimedia, Vision computing, Wireless Networks & Image Processing",
            description:
                "The laboratory is equipped with advance device for acquiring the multimedia data, high end computing systems with extended performance.",
            icon: <Eye className="w-8 h-8" />,
        },
        {
            id: 4,
            title: "NOKIA research Laboratory",
            description:
                "VTU Nokia Research Lab is setup under Nokia University India Grant No.1H 2010 to study Latest Mobile Technologies.",
            icon: <Smartphone className="w-8 h-8" />,
        },
        {
            id: 5,
            title: "Centre for Advanced Materials Research Studies",
            description:
                "The laboratory aims to To synthesize and characterize of new alloys , set up by grants worth 2.62 Crores by DRDO",
            icon: <FlaskConical className="w-8 h-8" />,
        },
        {
            id: 6,
            title: "Smart Composite Structures Research Centre (SCSRC)",
            description: "Research into advanced composite materials and smart structures for engineering applications.",
            icon: <Layers className="w-8 h-8" />,
        },
        {
            id: 7,
            title: "Advanced Geotechnical Engineering Laboratory",
            description: "Advanced soil mechanics and geotechnical investigations for infrastructure development.",
            icon: <Mountain className="w-8 h-8" />,
        },
        {
            id: 8,
            title: "Structural Engineering Laboratory",
            description:
                "Advanced state of the art facilties are created in this laboratory for testing and analysis of structures.",
            icon: <Building2 className="w-8 h-8" />,
        },
        {
            id: 9,
            title: "Remote sensing and GIS laboratory",
            description: "Geospatial technology application for environmental monitoring and resource management via satellite imagery.",
            icon: <Satellite className="w-8 h-8" />,
        },
        {
            id: 10,
            title: "BOSCH-REXROTH Center for Industrial Automation",
            description:
                "Industrial automation technology involving hydraulic and pneumatic drives for aerospace to material handling applications.",
            icon: <Cog className="w-8 h-8" />,
        },
        {
            id: 11,
            title: "Renewable Energy Research Center",
            description:
                "Modeling and Simulation of Wind Energy Conversion Systems, Solar-Wind Hybrid Systems for Irrigation Pump sets.",
            icon: <Wind className="w-8 h-8" />,
        },
        {
            id: 12,
            title: "SCADA for Distribution Automation Research Centre",
            description: "Supervisory Control and Data Acquisition systems for smart grid distribution and automation (Est. 2014).",
            icon: <Zap className="w-8 h-8" />,
        },
        {
            id: 13,
            title: "Bioenergy Research Information & Demonstration Centre",
            description: "Research, Information and Demonstration Centre (BRIDC) focused on sustainable bioenergy solutions.",
            icon: <Leaf className="w-8 h-8" />,
        },
    ];

    return (
        <div className="space-y-12">
            <PageHeader
                title="Centres of Excellence"
                description="State-of-the-art research centres driving innovation at Basaveshwar Engineering College."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                {centres.map((centre, index) => (
                    <motion.div
                        key={centre.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="h-full"
                    >
                        <Card className="h-full group relative overflow-hidden border border-orange-100/60 bg-white hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/60 transition-all duration-500 rounded-xl flex flex-col">
                            {/* Gradient Background Effect on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Decorative Top Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />

                            <CardContent className="p-8 flex flex-col h-full relative z-10">
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div className="relative">
                                        {/* Icon Container with Glow */}
                                        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100/50 shadow-sm group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                                            {centre.icon}
                                        </div>
                                    </div>

                                    {/* Link Icon */}
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform translate-x-4 transition-all duration-300 group-hover:bg-orange-100 group-hover:text-orange-600">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>

                                <div className="space-y-3 flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-orange-700 transition-colors duration-300">
                                        {centre.title}
                                    </h3>

                                    {centre.description ? (
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {centre.description}
                                        </p>
                                    ) : (
                                        <p className="text-gray-400 text-sm italic">Details available on inquiry...</p>
                                    )}
                                </div>

                                {/* Bottom ID Watermark */}
                                <div className="absolute -bottom-6 -right-6 text-[8rem] font-bold text-gray-50/50 group-hover:text-orange-50/30 transition-colors duration-500 select-none pointer-events-none z-0 rotate-12">
                                    {centre.id}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
