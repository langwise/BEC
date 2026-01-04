"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FacultyProfile } from "@/types/faculty";
import {
  Mail,
  Linkedin,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  ExternalLink,
} from "lucide-react";

interface FacultyCardProps {
  profile: FacultyProfile;
}

export function FacultyCard({ profile }: FacultyCardProps) {
  const { basicInfo, contactDetails } = profile;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:shadow-lg transition-all cursor-pointer group border-stone-200 overflow-hidden bg-white">
          <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 w-full" />
          <CardHeader className="flex flex-row gap-4 items-start pb-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200 shrink-0 overflow-hidden shadow-sm">
              {basicInfo.profilePhotoUrl ? (
                <img
                  src={basicInfo.profilePhotoUrl}
                  alt={basicInfo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-stone-400">
                  {basicInfo.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                {basicInfo.name}
              </CardTitle>
              <CardDescription className="font-medium text-gray-600 line-clamp-1">
                {basicInfo.designation}
              </CardDescription>
              {basicInfo.qualification && (
                <Badge
                  variant="outline"
                  className="mt-1 text-xs font-normal text-gray-500 border-gray-200"
                >
                  {basicInfo.qualification}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pb-6">
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {contactDetails.email && (
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <Mail className="w-3.5 h-3.5 text-primary/70" />
                  <span className="truncate">{contactDetails.email}</span>
                </div>
              )}
            </div>
            <div className="pt-2">
              <span className="text-xs text-primary font-bold uppercase tracking-wider group-hover:underline decoration-primary underline-offset-4">
                View Profile
              </span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-5xl sm:max-w-5xl md:h-[85vh] h-[90vh] p-0 gap-0 overflow-hidden flex flex-col md:flex-row bg-white border-none shadow-2xl">
        {/* LEFT SIDEBAR: Personal Info */}
        {/* Mobile: Top Header style / Desktop: Sticky Sidebar style */}
        <div className="w-full md:w-72 bg-stone-50 border-b md:border-b-0 md:border-r border-stone-200 flex flex-row md:flex-col shrink-0 md:overflow-y-auto">
          <div className="p-6 md:p-8 flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-0 w-full">
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-md overflow-hidden md:mb-4 shrink-0">
              {basicInfo.profilePhotoUrl ? (
                <img
                  src={basicInfo.profilePhotoUrl}
                  alt={basicInfo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl md:text-4xl font-bold text-stone-300">
                  {basicInfo.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="min-w-0 text-left md:text-center">
              <DialogTitle className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                {basicInfo.name}
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-primary mt-1">
                {basicInfo.designation}
              </DialogDescription>
              <p className="text-xs text-gray-500 mt-0.5 truncate">
                {basicInfo.department}
              </p>

              {basicInfo.qualification && (
                <Badge
                  variant="secondary"
                  className="mt-2 md:mt-4 hidden md:inline-flex"
                >
                  {basicInfo.qualification}
                </Badge>
              )}
            </div>
          </div>

          <div className="hidden md:block p-6 space-y-4 flex-1">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                Contact
              </p>
              {contactDetails.email && (
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors p-2 hover:bg-white rounded-lg border border-transparent hover:border-stone-200 hover:shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="truncate">{contactDetails.email}</span>
                </a>
              )}
              {contactDetails.linkedIn && (
                <a
                  href={contactDetails.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#0077b5] transition-colors p-2 hover:bg-white rounded-lg border border-transparent hover:border-stone-200 hover:shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0077b5] shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <span>LinkedIn Profile</span>
                </a>
              )}
              {contactDetails.googleScholar && (
                <a
                  href={contactDetails.googleScholar}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#4285F4] transition-colors p-2 hover:bg-white rounded-lg border border-transparent hover:border-stone-200 hover:shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#4285F4] shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span>Google Scholar</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT: Tabs */}
        {/* Mobile: Scrollable area for everything else */}
        <div className="flex-1 flex flex-col min-w-0 bg-white md:h-full overflow-hidden">
          <Tabs
            defaultValue="experience"
            className="flex-1 flex flex-col h-full"
          >
            <div className="px-4 md:px-6 pt-4 md:pt-6 pb-0 border-b border-stone-100 bg-white shrink-0 overflow-x-auto">
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-6 border-b border-transparent mb-[-1px]">
                {["experience", "education", "publications", "research"].map(
                  (tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent hover:text-gray-900 capitalize text-gray-500 data-[state=active]:bg-transparent"
                    >
                      {tab}
                    </TabsTrigger>
                  )
                )}
              </TabsList>
            </div>

            {/* Content Area - Native Scroll */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="max-w-3xl mx-auto md:mx-0 pb-10">
                {/* Mobile Contact Links (Visible only on small screens) */}
                <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 p-4 bg-stone-50 rounded-xl border border-stone-100">
                  {contactDetails.email && (
                    <a
                      href={`mailto:${contactDetails.email}`}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <Mail className="w-4 h-4 text-orange-600" />{" "}
                      {contactDetails.email}
                    </a>
                  )}
                  {contactDetails.linkedIn && (
                    <a
                      href={contactDetails.linkedIn}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn
                    </a>
                  )}
                </div>

                <TabsContent
                  value="experience"
                  className="space-y-8 mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300 data-[state=inactive]:hidden"
                >
                  {/* Work Experience */}
                  <section className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 border-l-4 border-primary pl-3">
                      Work Experience
                    </h3>
                    <div className="space-y-6 relative border-l border-stone-200 ml-3 pl-8 py-2">
                      {profile.workExperience.map((exp, i) => (
                        <div key={i} className="relative">
                          <span className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full border-4 border-white bg-primary shadow-sm" />
                          <h4 className="font-bold text-gray-900 text-lg">
                            {exp.position}
                          </h4>
                          <p className="text-gray-600 font-medium">
                            {exp.organization}
                          </p>
                          <p className="text-sm text-gray-400 mt-1 font-mono">
                            {exp.fromDate} — {exp.toDate || "Present"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Teaching */}
                  <section className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 border-l-4 border-secondary pl-3">
                      Teaching
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="bg-stone-50 rounded-xl p-5">
                        <p className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">
                          Current Courses
                        </p>
                        <ul className="space-y-2">
                          {profile.teaching.coursesCurrentlyTeaching.map(
                            (c, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-gray-700 font-medium"
                              >
                                <span className="text-primary mt-1">•</span>{" "}
                                {c.courseName}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="bg-stone-50 rounded-xl p-5">
                        <p className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">
                          Interests
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {profile.teaching.teachingInterests.teachingCourses.map(
                            (t, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="bg-white"
                              >
                                {t}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </section>

                  {profile.administrativeResponsibilities &&
                    profile.administrativeResponsibilities.length > 0 && (
                      <section className="space-y-4">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 border-l-4 border-gray-400 pl-3">
                          Admin Roles
                        </h3>
                        <div className="grid gap-3">
                          {profile.administrativeResponsibilities.map(
                            (role, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between p-3 rounded-lg border border-stone-100 bg-stone-50/50"
                              >
                                <div>
                                  <p className="font-semibold text-gray-900">
                                    {role.role}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {role.organization}
                                  </p>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {role.fromYear} - {role.toYear || "Present"}
                                </Badge>
                              </div>
                            )
                          )}
                        </div>
                      </section>
                    )}
                </TabsContent>

                <TabsContent
                  value="education"
                  className="space-y-6 mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300 data-[state=inactive]:hidden"
                >
                  <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 border-l-4 border-amber-500 pl-3 mb-6">
                    Academic Background
                  </h3>
                  <div className="grid gap-4">
                    {profile.education.map((edu, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-5 rounded-xl bg-white border border-stone-100 shadow-sm items-start hover:border-amber-200 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-amber-600">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">
                            {edu.degree}
                          </h4>
                          <p className="text-amber-700 font-medium">
                            {edu.specialization}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <span>{edu.universityOrInstitution}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span>{edu.yearOfAward}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent
                  value="publications"
                  className="space-y-8 mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300 data-[state=inactive]:hidden"
                >
                  {profile.publications.journalPapers.length > 0 && (
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">
                          Journal Papers
                        </h3>
                        <Badge>
                          {profile.publications.journalPapers.length}
                        </Badge>
                      </div>
                      <div className="space-y-4">
                        {profile.publications.journalPapers.map((pub, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-stone-50 border border-stone-100 hover:border-primary/20 transition-all group"
                          >
                            <h4 className="font-semibold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                              {pub.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-2 italic">
                              {pub.authors.join(", ")}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
                              <span className="font-semibold text-gray-700 bg-white px-2 py-0.5 rounded border border-stone-200">
                                {pub.journalOrConference}
                              </span>
                              <span>Year: {pub.year}</span>
                              {pub.doiOrUrl && (
                                <a
                                  href={pub.doiOrUrl}
                                  target="_blank"
                                  className="text-primary hover:underline flex items-center gap-1 ml-auto"
                                >
                                  View Paper{" "}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                  {profile.publications.conferencePapers.length > 0 && (
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">
                          Conference Papers
                        </h3>
                        <Badge variant="secondary">
                          {profile.publications.conferencePapers.length}
                        </Badge>
                      </div>
                      <div className="space-y-4">
                        {profile.publications.conferencePapers.map((pub, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-white border border-dashed border-stone-200"
                          >
                            <h4 className="font-medium text-gray-900 leading-snug">
                              {pub.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {pub.journalOrConference}, {pub.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </TabsContent>

                <TabsContent
                  value="research"
                  className="space-y-8 mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300 data-[state=inactive]:hidden"
                >
                  <section className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Research Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.research.researchInterests.map((interest, i) => (
                        <Badge
                          key={i}
                          className="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-orange-50 to-amber-50 text-orange-900 hover:from-orange-100 hover:to-amber-100 border-orange-100"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </section>
                  {profile.researchSupervision && (
                    <section className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        Research Supervision
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-stone-900 text-white rounded-xl p-5 flex flex-col items-center text-center">
                          <span className="text-4xl font-black">
                            {profile.researchSupervision.phdProjects?.length ||
                              0}
                          </span>
                          <span className="text-xs uppercase tracking-widest opacity-70 mt-1">
                            PhD Scholars
                          </span>
                        </div>
                        <div className="grid gap-4">
                          <div className="bg-stone-100 rounded-xl p-3 flex items-center justify-between px-5">
                            <span className="text-xs font-bold uppercase text-gray-500">
                              UG Projects
                            </span>
                            <span className="text-xl font-black text-gray-900">
                              {profile.researchSupervision.ugProjects.length}
                            </span>
                          </div>
                          <div className="bg-stone-100 rounded-xl p-3 flex items-center justify-between px-5">
                            <span className="text-xs font-bold uppercase text-gray-500">
                              PG Projects
                            </span>
                            <span className="text-xl font-black text-gray-900">
                              {profile.researchSupervision.pgProjects.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
