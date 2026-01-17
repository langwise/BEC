"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, HeartHandshake, Globe, Briefcase, Calendar, ArrowRight, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactDetails = {
    name: "Mr. Basavaraj Endigeri",
    role: "Alumni Secretary",
    org: "BECAA, Basaveshwar Engineering College (A)",
    address: ["Bagalkot - 587 102"],
    mobile: "+91 9845657310",
    email: "nammabecalumni@gmail.com"
};

const objectives = [
    {
        title: "Networking",
        description: "To foster and strengthen the bond between the college and its alumni community globally.",
        icon: Globe,
    },
    {
        title: "Mentorship",
        description: "Providing technical guidance and career counseling to current students through alumni experts.",
        icon: GraduationCap,
    },
    {
        title: "Career Support",
        description: "Assisting graduates in securing better job opportunities and internships through the alumni network.",
        icon: Briefcase,
    },
];

const committeeMembers = [
    { name: "Dr. B. R. Hiremath", role: "President", designation: "Principal" },
    { name: "Shri. B. R. Endigeri", role: "Secretary", designation: "Asst. Prof." },
    { name: "Shri. R. A. Patil", role: "Member", designation: "Assoc. Prof." },
    { name: "Shri. S. M. Pharsiyawar", role: "Member", designation: "Assoc. Prof." },
    { name: "Smt. Shardha P.", role: "Member", designation: "Assoc. Prof." },
    { name: "Shri. M. G. Kambalimath", role: "Member", designation: "Asst. Prof." },
    { name: "Shri. S. F. Chitragar", role: "Member", designation: "Asst. Prof." },
    { name: "Smt. Sunita S. Tambakad", role: "Member", designation: "Asst. Prof." },
    { name: "Smt. Smita Gour", role: "Member", designation: "Asst. Prof." },
    { name: "Shri. Brijmohan A. Vyas", role: "Member", designation: "Asst. Prof." },
    { name: "Shri. C. M. Jangin", role: "Member", designation: "Asst. Prof." },
    { name: "Shri. Kiran B. Balavalad", role: "Member", designation: "Asst. Prof." },
    { name: "Shri. Sandeep Kugali", role: "Member", designation: "Asst. Prof." },
];

export default function AlumniPage() {
    return (
        <div className="space-y-8 md:space-y-16">
            <PageHeader
                title="Alumni Association (BECAA)"
                description="Connecting generations of excellence. Est. 2001."
            />

            {/* Introduction Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid lg:grid-cols-12 gap-6 md:gap-12 items-start"
            >
                <div className="lg:col-span-7 space-y-6 md:space-y-8">
                    <div className="space-y-4 md:space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[10px] md:text-xs font-bold uppercase tracking-wider border border-orange-100">
                            <Users className="w-3 h-3 md:w-4 md:h-4" />
                            Registered Society (Est. 2001)
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                            Building a <span className="text-orange-600">Lifelong Bond</span>
                        </h2>
                        <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
                            The Basaveshwar Engineering College Alumni Association (BECAA) serves as a bridge between the institute and its global community of graduates. Governed by a dedicated body of 11 directors and 5 office bearers, we are committed to strengthening the relationship between Industry and Academia.
                        </p>
                        <p className="text-sx md:text-base text-slate-600 leading-relaxed">
                            Our network of over 500 active members contributes significantly to the college ecosystem through mentorship, technical knowledge sharing, and creating career opportunities for current students.
                        </p>

                        <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
                            <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 md:px-8 h-10 md:h-12 rounded-xl text-sm md:text-base font-medium shadow-blue-900/20 shadow-lg">
                                Join the Network
                            </Button>
                            <Button variant="outline" className="border-slate-200 text-slate-700 h-10 md:h-12 px-6 md:px-8 rounded-xl hover:bg-slate-100 hover:text-slate-900 font-medium text-sm md:text-base">
                                Alumni Directory
                            </Button>
                        </div>
                    </div>

                    {/* Objectives Cards */}
                    <div className="grid sm:grid-cols-3 gap-3 md:gap-4 pt-6 md:pt-8 border-t border-slate-100">
                        {objectives.map((obj, index) => {
                            const Icon = obj.icon;
                            return (
                                <div key={index} className="space-y-2 md:space-y-3 group">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-orange-100/50 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                        <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-sm md:text-base">{obj.title}</h3>
                                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                                        {obj.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="lg:col-span-1 hidden lg:block" /> {/** Spacer */}

                {/* Contact Card - Refined Style */}
                <div className="lg:col-span-4">
                    <Card className="border-t-4 border-t-orange-500 shadow-xl shadow-slate-200/50 overflow-hidden sticky top-24">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-slate-900">Contact Us</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center text-center p-4 md:p-8 pt-4">
                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg bg-slate-50 mb-4 md:mb-6 flex items-center justify-center text-slate-300 border border-slate-100">
                                <Users className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-1 md:mb-2">{contactDetails.name}</h3>
                            <p className="text-slate-500 font-medium mb-1 text-sm md:text-base">{contactDetails.role}</p>
                            <div className="text-xs text-slate-400 mb-6 md:mb-8 leading-relaxed">
                                {contactDetails.org}<br />
                                {contactDetails.address}
                            </div>

                            <div className="w-full space-y-2 md:space-y-3">
                                <div className="flex items-center justify-between text-slate-700 bg-slate-50 p-3 md:p-4 rounded-sm">
                                    <span className="font-bold text-[10px] uppercase text-slate-400 tracking-widest text-left">Mobile</span>
                                    <span className="font-bold text-slate-900 text-xs md:text-sm">{contactDetails.mobile}</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-700 bg-slate-50 p-3 md:p-4 rounded-sm">
                                    <span className="font-bold text-[10px] uppercase text-slate-400 tracking-widest text-left">Email</span>
                                    <a href={`mailto:${contactDetails.email}`} className="font-medium text-slate-900 text-xs hover:text-orange-600 truncate max-w-[180px] text-right">
                                        {contactDetails.email}
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>

            {/* Impact Feature */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900 rounded-3xl p-6 md:p-12 relative overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

                <div className="relative z-10 grid lg:grid-cols-3 gap-6 md:gap-8 items-center">
                    <div className="lg:col-span-2 space-y-4 md:space-y-6">
                        <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                            <HeartHandshake className="w-3 h-3 md:w-4 md:h-4" />
                            Alumni Impact
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Global Support During Crisis</h2>
                        <p className="text-slate-300 leading-relaxed text-sm md:text-lg">
                            "During the COVID-19 pandemic, BEC alumni residing in the USA collaborated with faculty to donate lifesaving oxygen concentrators to a local hospital in Bagalkot, showcasing the enduring spirit of service instilled at BEC."
                        </p>
                        <div className="flex gap-4 md:gap-6 pt-2 md:pt-4">
                            <div className="flex flex-col">
                                <span className="text-2xl md:text-3xl font-bold text-white">500+</span>
                                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">Active Members</span>
                            </div>
                            <div className="w-px bg-slate-700 h-10 self-center" />
                            <div className="flex flex-col">
                                <span className="text-2xl md:text-3xl font-bold text-white">Global</span>
                                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">Reach</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* Placeholder for an image or icon graphic if needed, kept simple for now */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 rounded-2xl">
                            <h4 className="text-white font-bold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                                Engagement
                            </h4>
                            <ul className="space-y-3 md:space-y-4">
                                <li className="text-xs md:text-sm text-slate-300">
                                    <strong className="block text-white mb-1">Annual Alumni Meet</strong>
                                    Relive memories on campus.
                                </li>
                                <li className="text-xs md:text-sm text-slate-300">
                                    <strong className="block text-white mb-1">Webinar Series</strong>
                                    Connect with experts worldwide.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Committee Members Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <UserCheck className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        Committee Members
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {committeeMembers.map((member, index) => (
                        <div key={index} className="group bg-white p-3 md:p-5 rounded-xl border border-slate-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300">
                            <div className="flex items-start justify-between mb-2 md:mb-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <Users className="w-3 h-3 md:w-4 md:h-4" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-100 px-2 py-0.5 rounded-full">
                                    {member.role}
                                </span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1" title={member.name}>
                                {member.name}
                            </h3>
                            <p className="text-[10px] md:text-xs text-slate-500">
                                {member.designation}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Full List Note */}
                <div className="mt-4 text-center">
                    <p className="text-[10px] md:text-xs text-slate-400">
                        * List of Office Bearers and Executive Committee Members
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
