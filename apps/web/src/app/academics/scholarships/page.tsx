import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, GraduationCap, FileText } from "lucide-react";
import { asset } from "@/lib/assets";

const scholarshipData = [
    { id: 1, particulars: "SC/ST Scholarship (SSP)", department: "Social Welfare Dept. & Tribal Welfare Dept. Govt. of Karnataka", website: "https://ssp.postmatric.karnataka.gov.in" },
    { id: 2, particulars: "SC/ST Fee Concession (SSP)", department: "DTE, Bengaluru, Govt. of Karnataka", website: "https://ssp.postmatric.karnataka.gov.in" },
    { id: 3, particulars: "SC/ST Defence Scholarship (SSP)", department: "DTE, Bengaluru, Govt. of Karnataka", website: "https://ssp.postmatric.karnataka.gov.in" },
    { id: 4, particulars: "Minority Scholarship (SSP)", department: "Dept of Minority Welfare, Govt. of Karnataka", website: "https://ssp.postmatric.karnataka.gov.in" },
    { id: 5, particulars: "OBC Fee Concession (SSP)", department: "Backward classis welfare dept. Govt. of Karnataka", website: "https://ssp.postmatric.karnataka.gov.in" },
    { id: 6, particulars: "Other State Scholarship (J & K Students)", department: "AICTE, New Delhi", website: "https://www.aicte-india.org/" },
    { id: 7, particulars: "NSP (National Scholarship Portal) - Central Schemes, State Schemes, UGC/AICTE Schemes", department: "Central Schemes / State Schemes / UGC/AICTE Schemes", website: "https://nsp.gov.in/" },
    { id: 8, particulars: "Meritorious students secure highest marks in PUC at district level", department: "SWF/TBF", website: "http://schooleducation.kar.nic.in/swftbf/students.html" },
    { id: 9, particulars: "College Topper", department: "Shri. Biluru Guru Basav Utstav Samiti, Bagalkote", website: "" },
];

const scstCellMembers = [
    { id: 1, name: "Prof. B. R. Endigeri", designation: "Asst. Prof.", position: "Chairman", mobile: "9845657310", email: "endigeribasavaraj@gmail.com" },
    { id: 2, name: "Prof. R. L. Naik", designation: "Assoc. Prof.", position: "Member", mobile: "9880529043", email: "r_l_naik@yahoo.co.in" },
    { id: 3, name: "Prof. G. H. Rathod", designation: "Asst. Prof.", position: "Member", mobile: "9342619667", email: "gopinath.rathod@gmail.com" },
    { id: 4, name: "Prof. Prashant B. M.", designation: "Asst. Prof.", position: "Member", mobile: "9986340050", email: "pbmadhavanavar@gmail.com" },
    { id: 5, name: "Prof. Kiran Y. Bendigeri", designation: "Asst. Prof.", position: "Member", mobile: "9916010712", email: "kiranendigeri@gmail.com" },
    { id: 6, name: "Prof. Shilpa H. Tondyal", designation: "Asst. Prof.", position: "Member", mobile: "8095545010", email: "spmadhavanavar@gmail.com" },
    { id: 7, name: "Mr. Basavaraj K.", designation: "Student", position: "Member", mobile: "9591901431", email: "basavarajkodekal28@gmail.com" },
    { id: 8, name: "Miss. Ranjita Rathod", designation: "Student", position: "Member", mobile: "9611259760", email: "ranjitarathod334@gmail.com" },
];

export const metadata = pageMetadata({
    title: "Student Scholarships",
    description:
        "Scholarships for BEC Bagalkote students — SC/ST, OBC and minority schemes via SSP, National Scholarship Portal, AICTE and merit awards, with department and portal links.",
    path: "/academics/scholarships",
});

export default function ScholarshipsPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-12">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
                <PageHeader
                    title="Scholarship Details"
                    description="Information regarding various scholarships available for students from state and central governments."
                />

                <section className="max-w-6xl mx-auto">
                    <FadeIn>
                        <div className="space-y-6">
                            {/* Highlights/Intro */}
                            <div className="bg-white border border-stone-200 rounded-xl p-6 flex items-start gap-4 shadow-xs">
                                <div className="p-3 bg-primary/10 text-primary rounded-full shrink-0">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Financial Aid & Support</h3>
                                    <p className="text-gray-600 mt-1 leading-relaxed">
                                        Basaveshwar Engineering College encourages students to avail of various scholarships provided by the Government of Karnataka, Government of India, and other organizations. Below is the list of available scholarships.
                                    </p>
                                </div>
                            </div>

                            {/* Scholarship Table */}
                            <Card className="bg-white border-stone-200 shadow-sm overflow-hidden">
                                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-4">
                                    <CardTitle className="text-xl">Available Scholarships</CardTitle>
                                    <CardDescription>List of scholarships, relevant departments, and application links.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-stone-50 hover:bg-stone-50 text-base">
                                                    <TableHead className="w-[80px] text-center font-bold text-gray-700 hidden md:table-cell">Sl. No.</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[250px]">Particulars</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[300px]">Department</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[200px]">Website</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {scholarshipData.map((item) => (
                                                    <TableRow key={item.id} className="hover:bg-stone-50/50 transition-colors">
                                                        <TableCell className="text-center font-medium text-gray-500 hidden md:table-cell">{item.id}</TableCell>
                                                        <TableCell className="font-medium text-gray-900">
                                                            {item.particulars}
                                                        </TableCell>
                                                        <TableCell className="text-gray-600">
                                                            {item.department}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.website ? (
                                                                <a
                                                                    href={item.website}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 hover:underline font-medium break-all"
                                                                >
                                                                    Visit Site
                                                                    <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            ) : (
                                                                <span className="text-gray-400 italic text-sm">Offline / Contact College</span>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* SC/ST/BCM Cell roster */}
                            <Card className="bg-white border-stone-200 shadow-sm overflow-hidden">
                                <CardHeader className="bg-stone-50/50 border-b border-stone-100 pb-4">
                                    <CardTitle className="text-xl">SC/ST/BCM Cell — Academic Year 2025-2026</CardTitle>
                                    <CardDescription>
                                        The following staff and student members have been appointed to the SC/ST/BCM Cell to address grievances and monitor the performance of the students.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-stone-50 hover:bg-stone-50 text-base">
                                                    <TableHead className="w-[80px] text-center font-bold text-gray-700 hidden md:table-cell">Sl. No.</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[200px]">Name</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[140px]">Designation</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[110px]">Position</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[130px]">Mobile</TableHead>
                                                    <TableHead className="font-bold text-gray-700 min-w-[240px]">Email</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {scstCellMembers.map((member) => (
                                                    <TableRow key={member.id} className="hover:bg-stone-50/50 transition-colors">
                                                        <TableCell className="text-center font-medium text-gray-500 hidden md:table-cell">{member.id}</TableCell>
                                                        <TableCell className="font-medium text-gray-900">{member.name}</TableCell>
                                                        <TableCell className="text-gray-600">{member.designation}</TableCell>
                                                        <TableCell className="text-gray-600">{member.position}</TableCell>
                                                        <TableCell className="text-gray-600 tabular-nums">{member.mobile}</TableCell>
                                                        <TableCell>
                                                            <a
                                                                href={`mailto:${member.email}`}
                                                                className="text-primary hover:text-primary/80 hover:underline break-all"
                                                            >
                                                                {member.email}
                                                            </a>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>

                            <a
                                href={asset("documents/sc-st-bcm/sc-st-bcm-2025-26.pdf")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 bg-white border border-stone-200 rounded-xl p-5 shadow-xs hover:border-primary/40 hover:shadow-sm transition-all group"
                            >
                                <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">BEC SC/ST/BCM Cell</p>
                                    <p className="text-sm text-gray-500">Cell information document (2025-26) — PDF</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-400 ml-auto shrink-0" />
                            </a>
                        </div>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
}
