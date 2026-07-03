// File: src/components/library/staff-card.tsx
"use client";

import Image from "next/image";
import { 
  Mail, 
  Phone, 
  GraduationCap, 
  MapPin, 
  Award, 
  BookOpen, 
  Briefcase, 
  Globe, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface PublicationGroup {
  books?: string[];
  journals?: string[];
  conferences?: string[];
  invitedTalks?: string[];
  workshops?: string[];
  awards?: string[];
}

interface ResearchScholars {
  pursuing: string;
  awarded: string;
}

interface StaffCardProps {
  name: string;
  designation: string;
  employeeId?: string;
  qualification?: string;
  experience?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string;
  orcidId?: string;
  scopusId?: string;
  vidwanId?: string;
  researcherId?: string;
  googleScholarId?: string;
  responsibilities?: string;
  researchInterest?: string;
  scholars?: ResearchScholars;
  patents?: string;
  grants?: string;
  publications?: PublicationGroup;
  hasDetails?: boolean;
  index?: number;
}

function getInitials(name: string) {
  return name
    .replace(/\b(Dr|Mr|Mrs|Ms|Shri|Smt|Prof)\.?\b/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function StaffCard({
  name,
  designation,
  employeeId,
  qualification,
  experience,
  email,
  phone,
  address,
  image,
  orcidId,
  scopusId,
  vidwanId,
  researcherId,
  googleScholarId,
  responsibilities,
  researchInterest,
  scholars,
  patents,
  grants,
  publications,
  hasDetails = false,
  index = 0,
}: StaffCardProps) {
  const imageSrc = image ? asset(image) : undefined;

  const cardContent = (
    <motion.div
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white rounded-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
        hasDetails ? "cursor-pointer group hover:border-primary/50" : ""
      }`}
    >
      <div className="relative h-64 bg-linear-to-br from-primary/10 to-accent/10 overflow-hidden">
        {imageSrc ? (
          <Image 
            src={imageSrc} 
            alt={name} 
            fill 
            className={cn(
              "object-cover object-top group-hover:scale-105 transition-transform duration-500",
              name === "Subhas C. Mahendrakar" && "object-contain bg-[#d50100]"
            )} 
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/70 text-3xl font-bold text-primary shadow-sm">
              {getInitials(name)}
            </span>
          </div>
        )}
        {hasDetails && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white text-stone-900 px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              View Profile
              <ChevronRight className="h-4 w-4 text-primary" />
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-primary font-semibold mb-3">{designation}</p>

          {qualification && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <GraduationCap className="h-4 w-4 text-primary shrink-0" />
              <span>{qualification}</span>
            </div>
          )}

          {experience && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Briefcase className="h-4 w-4 text-primary shrink-0" />
              <span>{experience} Experience</span>
            </div>
          )}
        </div>

        <div className="space-y-2 pt-4 border-t border-stone-200 mt-auto">
          {email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-400 shrink-0" />
              <a
                href={`mailto:${email}`}
                className="text-gray-600 hover:text-primary transition-colors truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {email}
              </a>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-400 shrink-0" />
              <a
                href={`tel:${phone}`}
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (!hasDetails) {
    return cardContent;
  }

  // Check if we have any publications to show in a second tab
  const hasPublications = publications && Object.values(publications).some(arr => arr && arr.length > 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {cardContent}
      </DialogTrigger>
      
      <DialogContent className="flex h-[90vh] w-[95vw] max-w-4xl sm:max-w-4xl flex-col gap-0 overflow-hidden border-none bg-stone-50 rounded-xl [&_[data-slot=dialog-close]]:text-white/80 [&_[data-slot=dialog-close]]:hover:text-white [&_[data-slot=dialog-close]]:focus:ring-white">
        {/* Fixed Header */}
        <div className="bg-primary text-white p-6 md:p-8 shrink-0 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {imageSrc ? (
              <div className="relative h-20 w-20 rounded-full border-2 border-white overflow-hidden bg-white shrink-0 shadow-md">
                <Image 
                  src={imageSrc} 
                  alt={name} 
                  fill 
                  className={cn(
                    "object-cover object-top",
                    name === "Subhas C. Mahendrakar" && "object-contain bg-[#d50100]"
                  )} 
                />
              </div>
            ) : (
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-primary shrink-0 shadow-md">
                {getInitials(name)}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-1">
                {name}
              </DialogTitle>
              <p className="text-white/90 text-sm md:text-base font-medium mb-1.5">{designation}</p>
              {employeeId && (
                <span className="inline-block bg-white/20 text-white/95 text-xs px-2.5 py-0.5 rounded-sm font-mono">
                  ID: {employeeId}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Contact & Identifiers */}
            <div className="md:col-span-1 space-y-6 order-2 md:order-1">
              {/* Contact Info Card */}
              <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Contact Details
                </h4>
                
                {email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs text-stone-500 block">Email Address</span>
                      <a href={`mailto:${email}`} className="text-stone-800 font-medium hover:text-primary break-all text-sm block">
                        {email}
                      </a>
                    </div>
                  </div>
                )}

                {phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs text-stone-500 block">Phone Number</span>
                      <a href={`tel:${phone}`} className="text-stone-800 font-medium hover:text-primary text-sm block">
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs text-stone-500 block">Address</span>
                      <span className="text-stone-700 text-sm leading-relaxed break-words block">
                        {address}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Professional IDs Card */}
              {(orcidId || scopusId || vidwanId || researcherId || googleScholarId) && (
                <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                    Research Profiles
                  </h4>

                  {orcidId && (
                    <a
                      href={`https://orcid.org/${orcidId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 hover:border-primary/30 transition-all text-stone-700 hover:text-primary gap-1"
                    >
                      <span className="font-semibold font-mono text-[10px] text-stone-400 uppercase tracking-wider">ORCID ID</span>
                      <span className="flex items-center gap-1 text-xs font-semibold font-mono text-stone-800 break-all">
                        {orcidId}
                        <ExternalLink className="h-3 w-3 text-stone-400 shrink-0" />
                      </span>
                    </a>
                  )}

                  {scopusId && (
                    <a
                      href={`https://www.scopus.com/authid/detail.uri?authorId=${scopusId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 hover:border-primary/30 transition-all text-stone-700 hover:text-primary gap-1"
                    >
                      <span className="font-semibold font-mono text-[10px] text-stone-400 uppercase tracking-wider">Scopus ID</span>
                      <span className="flex items-center gap-1 text-xs font-semibold font-mono text-stone-800 break-all">
                        {scopusId}
                        <ExternalLink className="h-3 w-3 text-stone-400 shrink-0" />
                      </span>
                    </a>
                  )}

                  {vidwanId && (
                    <a
                      href={`https://vidwan.inflibnet.ac.in/profile/${vidwanId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 hover:border-primary/30 transition-all text-stone-700 hover:text-primary gap-1"
                    >
                      <span className="font-semibold font-mono text-[10px] text-stone-400 uppercase tracking-wider">Vidwan ID</span>
                      <span className="flex items-center gap-1 text-xs font-semibold font-mono text-stone-800 break-all">
                        {vidwanId}
                        <ExternalLink className="h-3 w-3 text-stone-400 shrink-0" />
                      </span>
                    </a>
                  )}

                  {researcherId && (
                    <a
                      href={`https://www.webofscience.com/wos/author/record/${researcherId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 hover:border-primary/30 transition-all text-stone-700 hover:text-primary gap-1"
                    >
                      <span className="font-semibold font-mono text-[10px] text-stone-400 uppercase tracking-wider text-left">Researcher ID</span>
                      <span className="flex items-center gap-1 text-xs font-semibold font-mono text-stone-800 break-all">
                        {researcherId}
                        <ExternalLink className="h-3 w-3 text-stone-400 shrink-0" />
                      </span>
                    </a>
                  )}

                  {googleScholarId && (
                    <a
                      href={`https://scholar.google.com/citations?user=${googleScholarId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 hover:border-primary/30 transition-all text-stone-700 hover:text-primary gap-1"
                    >
                      <span className="font-semibold font-mono text-[10px] text-stone-400 uppercase tracking-wider">Scholar ID</span>
                      <span className="flex items-center gap-1 text-xs font-semibold font-mono text-stone-800 break-all">
                        {googleScholarId}
                        <ExternalLink className="h-3 w-3 text-stone-400 shrink-0" />
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Tabs */}
            <div className="md:col-span-2 order-1 md:order-2">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full md:w-auto bg-stone-200/50 p-1 mb-6 flex md:inline-flex">
                  <TabsTrigger value="profile" className="flex-1 md:flex-initial px-4 md:px-5 py-2 text-xs sm:text-sm">
                    Profile Details
                  </TabsTrigger>
                  {hasPublications && (
                    <TabsTrigger value="publications" className="flex-1 md:flex-initial px-4 md:px-5 py-2 text-xs sm:text-sm">
                      Publications & Talks
                    </TabsTrigger>
                  )}
                </TabsList>

                {/* Profile Details Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs space-y-6">
                    {/* Basic Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {qualification && (
                        <div>
                          <span className="text-xs text-stone-500 block">Qualification</span>
                          <span className="text-stone-800 font-semibold text-sm">{qualification}</span>
                        </div>
                      )}
                      {experience && (
                        <div>
                          <span className="text-xs text-stone-500 block">Professional Experience</span>
                          <span className="text-stone-800 font-semibold text-sm">{experience}</span>
                        </div>
                      )}
                    </div>

                    {/* Administrative Responsibilities */}
                    {responsibilities && (
                      <div className="border-t border-stone-100 pt-4">
                        <span className="text-xs text-stone-500 block mb-1">Administrative Responsibilities</span>
                        <p className="text-stone-700 text-sm leading-relaxed">{responsibilities}</p>
                      </div>
                    )}

                    {/* Research Interests */}
                    {researchInterest && (
                      <div className="border-t border-stone-100 pt-4">
                        <span className="text-xs text-stone-500 block mb-1">Research Interests</span>
                        <p className="text-stone-700 text-sm leading-relaxed">{researchInterest}</p>
                      </div>
                    )}

                    {/* Research Scholars */}
                    {scholars && (
                      <div className="border-t border-stone-100 pt-4">
                        <span className="text-xs text-stone-500 block mb-2">Research Scholars Guided</span>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-center">
                            <span className="text-2xl font-bold text-primary block">{scholars.pursuing}</span>
                            <span className="text-xs text-stone-500">Pursuing</span>
                          </div>
                          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-center">
                            <span className="text-2xl font-bold text-emerald-600 block">{scholars.awarded}</span>
                            <span className="text-xs text-stone-500">Awarded</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Patents & Grants */}
                    {(patents || grants) && (
                      <div className="border-t border-stone-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {patents && patents !== "-" && (
                          <div>
                            <span className="text-xs text-stone-500 block">Patents</span>
                            <span className="text-stone-800 font-medium text-sm">{patents}</span>
                          </div>
                        )}
                        {grants && grants !== "-" && (
                          <div>
                            <span className="text-xs text-stone-500 block">Research Grants</span>
                            <span className="text-stone-800 font-medium text-sm">{grants}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Publications Tab */}
                {hasPublications && (
                  <TabsContent value="publications" className="space-y-6">
                    <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs space-y-6">
                      
                      {/* Journals */}
                      {publications.journals && publications.journals.length > 0 && (
                        <div>
                          <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                            <BookOpen className="h-4 w-4" />
                            Journals (with citations)
                          </h4>
                          <ol className="list-decimal pl-5 space-y-3 text-sm text-stone-700 leading-relaxed">
                            {publications.journals.map((pub, idx) => (
                              <li key={idx} className="pl-1">{pub}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Conferences */}
                      {publications.conferences && publications.conferences.length > 0 && (
                        <div className="border-t border-stone-100 pt-5">
                          <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                            <Globe className="h-4 w-4" />
                            Conferences / Symposiums
                          </h4>
                          <ol className="list-decimal pl-5 space-y-3 text-sm text-stone-700 leading-relaxed">
                            {publications.conferences.map((conf, idx) => (
                              <li key={idx} className="pl-1">{conf}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Invited Talks */}
                      {publications.invitedTalks && publications.invitedTalks.length > 0 && (
                        <div className="border-t border-stone-100 pt-5">
                          <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                            <Award className="h-4 w-4" />
                            Invited Talks
                          </h4>
                          <ul className="list-disc pl-5 space-y-2 text-sm text-stone-700 leading-relaxed">
                            {publications.invitedTalks.map((talk, idx) => (
                              <li key={idx} className="pl-1">{talk}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Workshops Attended */}
                      {publications.workshops && publications.workshops.length > 0 && (
                        <div className="border-t border-stone-100 pt-5">
                          <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                            <MapPin className="h-4 w-4" />
                            Conferences / Workshops Attended
                          </h4>
                          <ol className="list-decimal pl-5 space-y-2 text-sm text-stone-700 leading-relaxed">
                            {publications.workshops.map((w, idx) => (
                              <li key={idx} className="pl-1">{w}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Awards and Honors */}
                      {publications.awards && publications.awards.length > 0 && (
                        <div className="border-t border-stone-100 pt-5">
                          <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                            <Award className="h-4 w-4" />
                            Awards and Honors
                          </h4>
                          <ol className="list-decimal pl-5 space-y-2 text-sm text-stone-700 leading-relaxed">
                            {publications.awards.map((a, idx) => (
                              <li key={idx} className="pl-1 font-medium text-stone-800">{a}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
