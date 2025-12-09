"use client";

import { PageHeader } from "@/components/placements/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Info, ChevronRight, FileText } from "lucide-react";

export default function GuidelinesPage() {
    return (
        <div className="space-y-12">
            <PageHeader
                title="Regulations for Research Promotion"
                description="Comprehensive guidelines and objectives for research activities, scholars, and committees at BEC."
            />

            <div className="space-y-8">
                {/* 1. Objectives */}
                <section id="objectives">
                    <Card className="border-orange-100 shadow-sm">
                        <CardHeader className="bg-orange-50/50 border-b border-orange-100">
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                                <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                                Objectives
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ul className="space-y-3">
                                {[
                                    "To promote research and inculcate research culture.",
                                    "To increase the number of publications in peer reviewed journals and enhance the quality of research.",
                                    "To enhance financial support from various funding agencies",
                                    "To promote interdisciplinary research activities",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-orange-500 mr-3 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* 2. Guidelines for Research Centres */}
                <section id="research-centres">
                    <Card className="border-orange-100 shadow-sm">
                        <CardHeader className="bg-orange-50/50 border-b border-orange-100">
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                                <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                                Guidelines for Research Centres
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ul className="space-y-4">
                                {[
                                    "Notifications/advertisements of various funding proposals should be tracked/pursued by the HOD.",
                                    "The faculty members and research scholars should be motivated to apply for the research funding.",
                                    "HOD must ensure that at least one proposal is submitted by the department for each notification.",
                                    "Identify thrust areas and form inter/intra departmental groups to work in these areas.",
                                    "A database of the papers published in the journals and presented in the conferences by the faculty/research scholars should be maintained in the department.",
                                    "A database of the project proposals applied and sanctioned should be maintained in the department.",
                                    "The faculty should submit the details of the conference presentations and journal publications to the department (HoD) within a week.",
                                    "Attendance register/biometric data of the full-time and part-time research scholars must be maintained by the research centre.",
                                    "A copy of attendance and other research related data of each month should be submitted to Dean (R&D) in the first week of the following month.",
                                    "All the documents and communications by the research scholars with the college and affiliated university should be maintained in the department/research centre.",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-700 group">
                                        <span className="w-2 h-2 bg-orange-300 rounded-full mt-2 mr-3 group-hover:bg-orange-500 transition-colors shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* 3. Guidelines for Research Scholars */}
                <section id="research-scholars">
                    <Card className="border-orange-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-orange-50/50 border-b border-orange-100">
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                                <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                                Guidelines for Research Scholars
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            {/* General Points */}
                            <ul className="space-y-3">
                                {[
                                    "The deadlines as laid by the affiliating university for coursework, comprehensive viva voce, synopsis and thesis submission are to be strictly adhered.",
                                    "Half-yearly progress review meetings by the doctoral review committee should be conducted once in every six months compulsorily, preferably within the dates prescribed by the University.",
                                    "No request for extension of any of these deadlines will be entertained/forwarded except for genuine reasons and is completely at the discretion of the Principal, BEC.",
                                    "The research scholar is expected to assist the guide to submit minimum of one research proposal for funding during his Ph.D. tenure, preferably after completion of the comprehensive exam.",
                                    "Full-time scholars should apply for leave and seek prior permission of Guide and HOD, subjected to condition that, maximum of 15 days of leave per year.",
                                    "All the documents seeking the approval/signature of the Principal should have a covering letter addressed to the Principal, duly forwarded by Guide, HOD, and Dean R&D.",
                                    "All the communications to the VTU/outside the college should have a covering letter addressed to the concerned authority by the Principal, or duly forwarded by the Principal.",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-700">
                                        <ChevronRight className="w-4 h-4 text-orange-400 mr-2 shrink-0 mt-1" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Separator className="bg-orange-100" />

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-orange-50/30 p-5 rounded-lg border border-orange-100">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                                        <span className="w-2 h-6 bg-orange-400 rounded-sm mr-2"></span>
                                        Part-time Research Scholars
                                    </h4>
                                    <ul className="space-y-3 text-sm text-gray-700">
                                        <li className="flex items-start">
                                            <span className="mr-2 text-orange-500">•</span>
                                            Have to be present at least for 15 days in the research centre during each semester, preferably before the doctoral committee review presentation.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 text-orange-500">•</span>
                                            Have to sign in the attendance register and give biometric during their visit to the research centre.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 text-orange-500">•</span>
                                            If employed, produce NOC and willingness from employer to provide minimum one month leave per year. (VTU PhD regulations 2017)
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-orange-50/30 p-5 rounded-lg border border-orange-100">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                                        <span className="w-2 h-6 bg-orange-400 rounded-sm mr-2"></span>
                                        Full-time Research Scholars
                                    </h4>
                                    <ul className="space-y-3 text-sm text-gray-700">
                                        <li className="flex items-start">
                                            <span className="mr-2 text-orange-500">•</span>
                                            Sign in attendance register and give biometric on all working days.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 text-orange-500">•</span>
                                            If employed, produce NOC and 3 years study leave; cannot take other full-time jobs.
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 text-orange-500">•</span>
                                            If unemployed, can apply for scholarships/fellowships with intimation to Institute/University.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 text-sm text-gray-700 space-y-2">
                                <p className="font-semibold text-gray-900 mb-2">Additional Requirements for Scholars:</p>
                                <p>• Submit thesis within 6 years from registration.</p>
                                <p>• Compulsory publication of at least two journal papers (Scopus/Web of Science) for approval.</p>
                                <p>• Affiliation must be mentioned as "BEC" in publications.</p>
                                <p>• Faculty registered for Ph.D. outside BEC must also mention BEC affiliation and present work progress every six months.</p>
                                <p>• Enclose all relevant documents (registration, coursework, comprehensive etc.) when seeking permission for final thesis submission.</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* 4. Guidelines for DRC members & Meetings */}
                <section id="drc-guidelines">
                    <Card className="border-orange-100 shadow-sm">
                        <CardHeader className="bg-orange-50/50 border-b border-orange-100">
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                                <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4-5</span>
                                Guidelines for Doctoral Review Committee (DRC)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-800 mb-3">Committee Formation & Members</h4>
                                <ul className="space-y-2 text-gray-700 list-disc list-inside marker:text-orange-400">
                                    <li>List of at least 4 external experts (one from IIT/NIT) submitted to Principal.</li>
                                    <li>Principal approves/suggests experts.</li>
                                    <li>Guides must ensure all DRC members are present during presentations.</li>
                                    <li>If HOD cannot attend, a senior faculty must be nominated.</li>
                                    <li>If HOD/Principal is supervisor, appropriate senior faculty/Dean (R&D) substitutes as Chair/Head.</li>
                                    <li>HOD/Guide ensures significant faculty and student presence (25% faculty, 50% students) during presentations.</li>
                                </ul>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-bold text-gray-800 mb-3">Conduction of Meetings</h4>
                                <p className="text-gray-600 mb-3 text-sm">Scholar applies for review with 6-month progress report at least 3 days in advance, comprising:</p>
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                                    <ul className="list-disc list-inside space-y-1 marker:text-gray-400">
                                        <li>Objectives & Brief Review</li>
                                        <li>Work Progress since last meeting</li>
                                        <li>Methodology, Results, Discussion</li>
                                        <li>Future work plan</li>
                                    </ul>
                                    <ul className="list-disc list-inside space-y-1 marker:text-gray-400">
                                        <li>List of papers communicated/published</li>
                                        <li>Conference presentations</li>
                                        <li>Copies of accepted papers</li>
                                        <li>Attendance copy</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* 6-7. Viva-voce & Seminars */}
                <section id="viva-seminars">
                    <Card className="border-orange-100 shadow-sm">
                        <CardHeader className="bg-orange-50/50 border-b border-orange-100">
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                                <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">6-7</span>
                                Comprehensive Viva-Voce & Open Seminars
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-lg text-gray-800 mb-3">Comprehensive Viva-Voce</h4>
                                <ul className="space-y-2 text-gray-700 list-disc list-inside marker:text-orange-400 text-sm">
                                    <li>Scholar informs Head of institution for readiness.</li>
                                    <li>Guide invites 1-2 experts.</li>
                                    <li>Report format: Work completed, Suggestions, Recommendations.</li>
                                    <li>Online presentations require examiner consent letter/email.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-800 mb-3">Open Seminars & Colloquium</h4>
                                <ul className="space-y-2 text-gray-700 list-disc list-inside marker:text-orange-400 text-sm">
                                    <li>Apply stating readiness with report signed by Guide.</li>
                                    <li>Complete work presented in pre-submission colloquium.</li>
                                    <li>Committee approval sought for thesis submission.</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* 8. Summary */}
                <section id="summary">
                    <div className="bg-gray-900 text-white rounded-xl p-8 shadow-lg">
                        <div className="flex items-center mb-6">
                            <Info className="w-6 h-6 text-orange-400 mr-3" />
                            <h3 className="text-2xl font-bold">Summary</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-orange-200 font-semibold mb-3 uppercase tracking-wider text-sm">Objectives</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li>• Bring discipline & accountability.</li>
                                    <li>• Promote research culture & interdisciplinary work.</li>
                                    <li>• Maintain ethics and integrity.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-orange-200 font-semibold mb-3 uppercase tracking-wider text-sm">Mandates</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li>• Compulsory application for research funding.</li>
                                    <li>• Minimum 2 peer-reviewed publications (Scopus/Web of Science).</li>
                                    <li>• Monthly submission of attendance database to Dean R&D.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
