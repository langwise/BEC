"use client";

import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const syllabusData = [
  {
    year: "2023-24",
    items: [
      {
        id: 1,
        title: "BE 1st year Scheme and Syllabi of CSE stream 23-24",
        link: "#",
      },
      {
        id: 2,
        title: "BE 1st year Scheme and Syllabi of Civil stream 23-24",
        link: "#",
      },
      {
        id: 3,
        title: "BE 1st year Scheme and Syllabi of EE stream 23-24",
        link: "#",
      },
      {
        id: 4,
        title: "BE 1st year Scheme and Syllabi of ME stream 23-24",
        link: "#",
      },
    ],
  },
  {
    year: "2022-23",
    items: [
      {
        id: 5,
        title: "BE 1st year Scheme and Syllabi of CSE stream 22-23",
        link: "#",
      },
      {
        id: 6,
        title: "BE 1st year Scheme and Syllabi of Civil stream 22-23",
        link: "#",
      },
      {
        id: 7,
        title: "BE 1st year Scheme and Syllabi of EE stream 22-23",
        link: "#",
      },
      {
        id: 8,
        title: "BE 1st year Scheme and Syllabi of ME stream 22-23",
        link: "#",
      },
      {
        id: 9,
        title:
          "Syllabus of Samskruthika Kannada and Balake Kannada for all streams 22-23",
        link: "#",
      },
    ],
  },
  {
    year: "Previous Schemes",
    items: [
      {
        id: 10,
        title: "BE I & II Semester Scheme and Syllabus 2021-22",
        link: "#",
      },
      {
        id: 11,
        title: "BE I & II Semester Scheme and Syllabus 2020-21",
        link: "#",
      },
      {
        id: 12,
        title: "BE I & II Semester Scheme and Syllabus 2019-20",
        link: "#",
      },
      {
        id: 13,
        title: "BE I & II Semester Scheme and Syllabus 2018-19",
        link: "#",
      },
      {
        id: 14,
        title: "BE I & II Semester Scheme and Syllabus 2017-18",
        link: "#",
      },
    ],
  },
];

export default function SyllabusPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative pb-12">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10 space-y-12">
        <PageHeader
          title="Scheme and Syllabus"
          description="Access detailed schemes and syllabi for First and Second Semester Engineering programmes."
        />

        <section className="max-w-4xl mx-auto">
          <FadeIn>
            <Card className="bg-white border-stone-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-orange-50/50 border-b border-orange-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 text-primary rounded-lg">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    Scheme and Syllabus for 1st & 2nd Semester
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 space-y-8">
                {syllabusData.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-4">
                    {group.year !== "Previous Schemes" && (
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-stone-100 pb-2">
                        Academic Year {group.year}
                      </h3>
                    )}
                    {group.year === "Previous Schemes" && (
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-stone-100 pb-2 mt-8">
                        Archives
                      </h3>
                    )}

                    <ul className="grid gap-3">
                      {group.items.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.link}
                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-100"
                          >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-stone-100 text-stone-500 text-xs font-bold mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                              {item.id}
                            </span>
                            <div className="flex-1">
                              <span className="text-gray-700 font-medium group-hover:text-primary transition-colors block">
                                {item.title}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
