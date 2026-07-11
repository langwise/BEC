"use client";

import { Target, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

const visionMission = {
  vision:
    "To be an institution of excellence in education, research and innovation for sustainable future",
  mission: [
    "Develop globally competent professionals for future talent requirements",
    "Nurture a culture of research, Innovation and entrepreneurship",
    "Promote collaborations, extension and outreach programs for addressing industrial and societal needs",
    "Imbibe moral and ethical values",
    "Foster ecological and environmental consciousness",
  ],
};

export function VisionMissionSection() {
  return (
    <section className="pt-20 lg:pt-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        {/* Vision - Centered & Prominent */}
        <FadeIn>
          <div className="relative rounded-[2.5rem] bg-gray-900 overflow-hidden shadow-2xl mb-12">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-30" />
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20" />

            <div className="relative text-center py-20 px-6 lg:px-20 z-10">
              <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/10">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Our Vision
              </h3>
              <p className="text-2xl md:text-3xl text-gray-200 font-medium leading-relaxed max-w-4xl mx-auto">
                &quot;{visionMission.vision}&quot;
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Mission - Clean List Design */}
        <FadeIn delay={0.2}>
          <div className="bg-orange-50/50 rounded-[2.5rem] border border-orange-100 p-10 lg:p-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              <div className="lg:w-1/3">
                <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-orange-100 text-primary mb-6">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Guided by our vision, we strive to achieve these core
                  objectives in our pursuit of educational excellence.
                </p>
              </div>
              <div className="lg:w-2/3">
                <ul className="grid gap-6">
                  {visionMission.mission.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300"
                    >
                      <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5 shadow-sm">
                        {idx + 1}
                      </div>
                      <p className="text-lg text-gray-800 font-medium leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
