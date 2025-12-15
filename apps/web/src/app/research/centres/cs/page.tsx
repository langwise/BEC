"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
    Users,
    Award,
    BookOpen,
    Monitor,
    Cpu,
    Bot, // AI
    Network,
    Code, // Software Eng
    Wifi, // Wireless
    ScanFace, // Image Processing
    Binary,
    BrainCircuit,
    Share2 // Graph/Network
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Guides", value: "09", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Registered", value: "23", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Awarded", value: "09", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const researchAreas = [
    { name: "AI & Expert systems", icon: Bot },
    { name: "Pattern recognition", icon: ScanFace },
    { name: "Image & video processing", icon: Monitor },
    { name: "Graph theory", icon: Share2 },
    { name: "Knowledge based System Development", icon: BrainCircuit },
    { name: "Adhoc Networks", icon: Wifi },
    { name: "Software Engineering and Software Architecture", icon: Code },
    { name: "Computer Networks", icon: Network },
    { name: "Image Processing", icon: ScanFace },
    { name: "Wireless Sensor Networks", icon: Wifi },
];

const scholars = [
    {
        slNo: "1",
        usn: "2BA16PEJ09",
        name: "VEENA PATIL",
        guide: "Dr. S. R. PATIL",
        title: "Automatic Detection of Cancerous Cells in Histopathological Images of Uterine Tissue",
        status: "Colloquium Completed",
        category: "",
    },
    {
        slNo: "2",
        usn: "2BA15PEJ02",
        name: "PRASHANT BALURGI",
        guide: "Dr. LOKESH BHAJANTRI",
        title: "Data Perception and Resource Management in Cognitive Internet of Things",
        status: "Comprehensive nsive Viva-Voce completed",
        category: "",
    },
    {
        slNo: "3",
        usn: "2BA20PCS04",
        name: "RAGHAVENDRA JADHAV",
        guide: "Dr.S P BANGARSHETTI",
        title: "Data Analytics on Corona Viruses and Epidemic Diseases",
        status: "Appearing for course work",
        category: "",
    },
    {
        slNo: "4",
        usn: "2BA20PCS07",
        name: "SUDHA VISHNUKUMAR SALAKE",
        guide: "Dr.S P BANGARSHETTI",
        title: "Generative AI for Semantic document comparison in Medical Records Enhancing Consistency and Reducing discrepancies",
        status: "Course work completed",
        category: "",
    },
    {
        slNo: "5",
        usn: "2BA20PCS05",
        name: "RUDRAGOUDA HIREGOUDAR",
        guide: "Dr.S. V. SABOJI",
        title: "Cyber security attack detection using Soft computing technique",
        status: "Comprehensive Viva-Voce completed",
        category: "",
    },
    {
        slNo: "6",
        usn: "2BA20PCS08",
        name: "USHA JOALEKAR",
        guide: "Dr. VILAS NAIK",
        title: "Analysis of Brain MRI Images in View of Early Detection of Alzheimer using Clinical Data",
        status: "Registered",
        category: "",
    },
    {
        slNo: "7",
        usn: "2BA20PCS06",
        name: "SANGAMESH SAJJAN",
        guide: "Dr. VILAS NAIK",
        title: "Precision Agriculture like Crop Yield Prediction Detecting Plant Diseases",
        status: "Registered",
        category: "",
    },
    {
        slNo: "8",
        usn: "2BA21PCS03",
        name: "RAJU NADAF",
        guide: "Dr. V B PAGI",
        title: "Text Classification by zero shot for learning for Sentiment Analysis",
        status: "Course Work completed",
        category: "",
    },
    {
        slNo: "9",
        usn: "2BA21PCS05",
        name: "Y. V. KANAKA DURGA BHAVANI",
        guide: "Dr. V B PAGI",
        title: "Human Activity Detection, Recognition and Prediction for Crime Scene Analysis",
        status: "Comprehensive Viva-Voce completed",
        category: "",
    },
    {
        slNo: "10",
        usn: "2BA20PCS01",
        name: "GIRISH SHETTER",
        guide: "Dr. ANIL DEVANGAVI",
        title: "A Novel Methodology to Enhance the User Experience Minimize Delay in Real Time Applications at Edge Computing",
        status: "Course Work completed",
        category: "",
    },
    {
        slNo: "11",
        usn: "2BA20PCS10",
        name: "VINAYAK TELSANG",
        guide: "Dr. ANIL DEVANGAVI",
        title: "Data Security Management Techniques for Edge Computing",
        status: "Comprehensive Viva-Voce completed",
        category: "",
    },
    {
        slNo: "12",
        usn: "2BA23PCS01",
        name: "SANDEEP. N. KUGALI",
        guide: "Dr. ANIL DEVANGAVI",
        title: "Machine Learning Based Algorithms to Combat DDoS Wormhole and Botnet Attacks in IoT",
        status: "Registered",
        category: "",
    },
    {
        slNo: "13",
        usn: "2BA23PCS02",
        name: "SHIDDALINGESH S. HIREMATH",
        guide: "Dr. ANIL DEVANGAVI",
        title: "An Energy Efficient Approach for Cluster Based Context Aware Routing in IoT",
        status: "Registered",
        category: "",
    },
    {
        slNo: "14",
        usn: "2BA19MCS01",
        name: "RAMYA. YAMIKAR",
        guide: "Dr. BHARATI RESHMI",
        title: "Automatic Detection of Diabetic Retinopathy Using Fundus Images",
        status: "Course Work completed",
        category: "",
    },
    {
        slNo: "15",
        usn: "2BA20PCS03",
        name: "PRIYANKA TUPPAD",
        guide: "Dr. BHARATI RESHMI",
        title: "Machine Learning for Image processing",
        status: "Course Work completed",
        category: "",
    },
    {
        slNo: "16",
        usn: "2BA20PCS02",
        name: "KACHI ANVESH",
        guide: "Dr. BHARATI RESHMI",
        title: "Automatic Detection of Diseases in Retinal Fundus Images",
        status: "Comprehensive Viva-Voce completed",
        category: "",
    },
    {
        slNo: "17",
        usn: "2BA22PCS01",
        name: "JAYASHEELA KALLAGANIGER",
        guide: "Dr. BHARATI RESHMI",
        title: "Automatic Detection of Retinal Disease Using Fundus Images",
        status: "Course Work completed",
        category: "",
    },
    {
        slNo: "18",
        usn: "2BA21PCS01",
        name: "MAHANTESH SHIVALINGAPPA DEVOOR",
        guide: "DR. VISHWANATH KAGWADE",
        title: "Artificial Intelligence Applications in Agriculture",
        status: "Course Work in Progress",
        category: "",
    },
    {
        slNo: "19",
        usn: "2BA21PCS04",
        name: "RUBINA MUDDEBIHAL",
        guide: "DR. VISHWANATH KAGWADE",
        title: "NLP based Deep Neural Network for visually impaired people",
        status: "Course Work in Progress",
        category: "",
    },
    {
        slNo: "20",
        usn: "2BA22PCS02",
        name: "SUJATHA P.",
        guide: "DR. VISHWANATH KAGWADE",
        title: "Novel Approach for detection of Retinal Disorders in OCT Scans.",
        status: "Course work in progress",
        category: "",
    },
];

export default function CSResearchPage() {
    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-900 to-indigo-900 p-8 md:p-12 text-white shadow-xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/50 border border-indigo-700/50 text-indigo-200 text-sm font-medium mb-4"
                        >
                            <Cpu className="w-4 h-4" />
                            Research Centre
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
                        >
                            Computer Science & Engineering
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-indigo-100 max-w-xl text-lg leading-relaxed"
                        >
                            Driving innovation in Artificial Intelligence, Machine Learning, and Next-Gen Networks.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Stats & Areas */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 hover:shadow-md transition-shadow"
                                >
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", stat.bg)}>
                                        <Icon className={cn("w-6 h-6", stat.color)} />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Research Areas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-3xl p-8 shadow-xs border border-slate-100"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 rounded-full bg-indigo-600" />
                            Research Areas
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {researchAreas.map((area, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors duration-300"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                                        <area.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-indigo-900 transition-colors">
                                        {area.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

                {/* Right Column - Image */}
                <div className="lg:col-span-4 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg group"
                    >
                        <Image
                            src="/cs-dept.png"
                            alt="Department of Computer Science"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold mb-2">
                                Campus
                            </span>
                            <h3 className="text-xl font-bold text-white">Computer Science & Engineering</h3>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scholars Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-100"
            >
                <div className="p-8 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <span className="w-2 h-8 rounded-full bg-indigo-600" />
                        Research Scholars
                    </h2>
                </div>

                <div className="overflow-x-auto custom-scrollbar pb-2">
                    <table className="w-full min-w-[1400px] text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap w-20">Sl. No</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">USN</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Research Scholar</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">Guide</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[400px]">Ph.D. Title</th>
                                <th className="p-3 md:p-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Current Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {scholars.map((scholar, index) => (
                                <tr key={scholar.usn || index} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-3 md:p-4 text-sm font-medium text-slate-500 whitespace-nowrap">{scholar.slNo}</td>
                                    <td className="p-3 md:p-4 text-sm font-mono text-slate-500 whitespace-nowrap">{scholar.usn}</td>
                                    <td className="p-3 md:p-4 text-sm font-bold text-slate-900 whitespace-nowrap">{scholar.name}</td>
                                    <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">{scholar.guide}</td>
                                    <td className="p-3 md:p-4 text-sm text-slate-700 leading-relaxed">{scholar.title}</td>
                                    <td className="p-3 md:p-4 text-sm text-slate-600 whitespace-nowrap">
                                        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium",
                                            scholar.status.toLowerCase().includes("completed") ? "bg-green-100 text-green-800" :
                                                scholar.status.toLowerCase().includes("registered") ? "bg-blue-100 text-blue-800" :
                                                    "bg-orange-100 text-orange-800"
                                        )}>
                                            {scholar.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
