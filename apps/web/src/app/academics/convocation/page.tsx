"use client";

import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Marquee } from "@/components/ui/marquee";
import { Award, Scroll, CalendarDays, Medal, Info } from "lucide-react";

const GalleryCard = ({ item }: { item: number }) => {
  return (
    <div className="group relative aspect-video w-[300px] md:w-[400px] bg-stone-100 rounded-xl overflow-hidden cursor-pointer select-none mx-2">
      <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-stone-300 transition-colors duration-300">
        <span className="sr-only">View Image {item}</span>
        <img
          src={`/placeholder-gallery-${item}.jpg`}
          alt={`Convocation Moment ${item}`}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            (e.target as HTMLImageElement).parentElement!.classList.add(
              "bg-stone-200"
            );
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
          <Info className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
};

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
      cgpa: "9.82",
    },
    {
      name: "Sahana Siddu Rakkasagi",
      dept: "Civil Engineering",
      rank: "1st Rank",
      cgpa: "9.75",
    },
    {
      name: "Rashmi Hiremath",
      dept: "Electronics & Comm. Engg.",
      rank: "1st Rank",
      cgpa: "9.68",
    },
    {
      name: "Komal Teli",
      dept: "Electrical & Electronics Engg.",
      rank: "1st Rank",
      cgpa: "9.55",
    },
    {
      name: "Vinayak R Gotagunki",
      dept: "Information Science & Engg.",
      rank: "1st Rank",
      cgpa: "9.45",
    },
    {
      name: "Akash Chougala",
      dept: "Mechanical Engineering",
      rank: "1st Rank",
      cgpa: "9.60",
    },
    {
      name: "Arbazali Choudhari",
      dept: "Automobile Engineering",
      rank: "1st Rank",
      cgpa: "9.20",
    },
    {
      name: "Kiran V Mallannavar",
      dept: "Biotechnology",
      rank: "1st Rank",
      cgpa: "9.85",
    },
    {
      name: "Akshata Konnur",
      dept: "Electronics & Inst. Engg.",
      rank: "1st Rank",
      cgpa: "9.30",
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
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-100/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
        <PageHeader
          title={convocationData.title}
          description={convocationData.description}
        />

        {/* Gallery Preview */}
        <section className="overflow-hidden -mt-6 mb-12">
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-background/50 py-4">
            <Marquee pauseOnHover className="[--duration:40s]">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <GalleryCard key={item} item={item} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:40s]">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <GalleryCard key={item} item={item} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-white dark:from-background"></div>
          </div>
        </section>

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
