"use client";

import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarDays, Medal, Info } from "lucide-react";

const convocationData = {
  title: "Convocation",
  description:
    "Celebrating academic excellence and the culmination of our students' journey at Basaveshwar Engineering College.",
  overview:
    "Graduation Day is a momentous occasion where we honor the hard work, dedication, and achievements of our innovative engineers. It marks not just the end of an academic chapter, but the beginning of a lifelong commitment to excellence.",
  ceremony: {
    title: "13th Graduation Day",
    date: "September 23, 2023",
    description:
      "The 13th Graduation Day was a grand event celebrating the class of 2023. Distinguished guests, faculty, and proud parents gathered to witness the conferring of degrees and the awarding of gold medals to our top rankers.",
  },
  medalists: [
    {
      name: "Sarvajnya Pujari",
      dept: "Computer Science & Engg.",
      rank: "1st Rank",
      cgpa: "9.14",
    },
    {
      name: "Rashmi Hiremath",
      dept: "Electronics & Comm. Engg.",
      rank: "1st Rank",
      cgpa: "9.40",
    },
    {
      name: "Vinayak R Gotagunki",
      dept: "Information Science & Engg.",
      rank: "1st Rank",
      cgpa: "9.12",
    },
    {
      name: "Akash Chougala",
      dept: "Mechanical Engineering",
      rank: "1st Rank",
      cgpa: "8.76",
    },
    {
      name: "Sahana Siddu Rakkasagi",
      dept: "Civil Engineering",
      rank: "1st Rank",
      cgpa: "8.73",
    },
    {
      name: "Arbazali Choudhari",
      dept: "Automobile Engineering",
      rank: "1st Rank",
      cgpa: "8.73",
    },
    {
      name: "Komal Teli",
      dept: "Electrical & Electronics Engg.",
      rank: "1st Rank",
      cgpa: "8.53",
    },
    {
      name: "Kiran V Mallannavar",
      dept: "Biotechnology",
      rank: "1st Rank",
      cgpa: "8.51",
    },
    {
      name: "Shreya V Shanawad",
      dept: "Industrial & Production Engg.",
      rank: "1st Rank",
      cgpa: "8.39",
    },
    {
      name: "Rajeshwari A Yandigeri",
      dept: "Electronics & Inst. Engg.",
      rank: "1st Rank",
      cgpa: "8.20",
    },
  ],
  guidelines: [
    {
      question: "Eligibility for Gold Medals",
      answer:
        "A student shall be eligible for the award of a Gold Medal if they have passed all the courses of the programme in the first attempt and secured the highest CGPA among the eligible candidates.",
    },
    {
      question: "Rank Awarding Criteria",
      answer:
        "Ranks are awarded based on the CGPA secured from the 3rd to the 8th semester. Candidates must complete the course within the stipulated four academic years without any backlog history.",
    },
    {
      question: "Dress Code",
      answer:
        "Graduands are expected to wear formal attire befitting the solemnity of the occasion. The traditional convocation stole will be provided by the college.",
    },
  ],
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
        {children}
      </h2>
      <div className="h-px flex-1 bg-gray-100"></div>
    </div>
  );
}

function MedalistCard({
  name,
  dept,
  rank,
  cgpa,
}: {
  name: string;
  dept: string;
  rank: string;
  cgpa: string;
}) {
  return (
    <Card className="border-stone-200 hover:shadow-md transition-all duration-300 hover:border-yellow-200 group bg-white">
      <CardContent className="p-5 flex items-start gap-4">
        <div className="p-3 rounded-full bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100 transition-colors shrink-0">
          <Medal className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 leading-tight group-hover:text-yellow-700 transition-colors">
            {name}
          </h4>
          <p className="text-sm text-gray-600 font-medium mt-1">{dept}</p>
          <div className="flex items-center gap-3 mt-3 text-xs font-semibold uppercase tracking-wider">
            <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-sm border border-yellow-100">
              {rank}
            </span>
            <span className="text-stone-400">CGPA {cgpa}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ConvocationPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-12">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-100/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
        <PageHeader
          title={convocationData.title}
          description={convocationData.description}
        />

        {/* Overview / Ceremony Info */}
        <section className="max-w-4xl mx-auto space-y-6 text-center">
          <FadeIn>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
              {convocationData.overview}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 bg-white border border-stone-200 rounded-2xl p-8 shadow-xs inline-flex flex-col items-center">
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-3">
                <CalendarDays className="w-4 h-4" />
                Recent Event
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {convocationData.ceremony.title}
              </h3>
              <p className="text-gray-500 font-medium mb-4">
                {convocationData.ceremony.date}
              </p>
              <p className="text-gray-600 max-w-lg mx-auto">
                {convocationData.ceremony.description}
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Gold Medalists */}
        <section>
          <SectionTitle>Gold Medalists & Rank Holders (2022-23)</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {convocationData.medalists.map((student, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <MedalistCard {...student} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Guidelines */}
        <section className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SectionTitle>Guidelines & Regulations</SectionTitle>
            <Card className="bg-white border-stone-200">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {convocationData.guidelines.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`item-${idx}`}
                      className="border-stone-100"
                    >
                      <AccordionTrigger className="text-base font-semibold text-gray-900 hover:text-primary hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Important Note / Contact */}
          <div>
            <SectionTitle>Information</SectionTitle>
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 text-lg">
                    Degree Certificates
                  </h4>
                  <p className="text-blue-800/80 text-sm mt-2 leading-relaxed">
                    Graduates who could not attend the convocation in person can
                    collect their degree certificates from the Academic Office
                    on working days.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-blue-100">
                <p className="text-xs text-blue-700 font-medium uppercase tracking-wider mb-2">
                  Contact
                </p>
                <p className="text-blue-900 font-semibold">
                  Controller of Examinations
                </p>
                <p className="text-blue-800 text-sm">coe@becbgk.edu</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
