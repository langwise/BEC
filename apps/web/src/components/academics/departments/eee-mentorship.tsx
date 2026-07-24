"use client";

import React from "react";
import {
  Users,
  Target,
  Compass,
  Briefcase,
  GraduationCap,
  Calendar,
  Sparkles,
  BookOpen,
  Award,
  Clock,
  Mail,
  UserPlus,
  FileDown
} from "lucide-react";
import { asset } from "@/lib/assets";

export default function EeeMentorshipProgram() {
  const mentorCategories = [
    {
      title: "Industry Alumni",
      description: "Working professionals guiding students on career paths, industry standards, and modern technologies.",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Academia Alumni",
      description: "Researchers and professors supporting students in higher studies, research publications, and academic pursuits.",
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Entrepreneur Alumni",
      description: "Founders and co-founders inspiring innovation, design thinking, and guiding student startups.",
      icon: Sparkles,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  ];

  const mentorRoles = [
    {
      title: "Guide & Advisor",
      description: "Mentors identify student strengths and co-create personalized pathways to bring out the best in every mentee.",
      icon: Compass
    },
    {
      title: "Adaptive Learning",
      description: "Recognizing that every student learns differently, mentors experiment with approaches suited to each individual.",
      icon: BookOpen
    },
    {
      title: "Build Confidence",
      description: "Mentors help students break through mental blocks and develop the resilience needed for upcoming career challenges.",
      icon: Target
    }
  ];

  const workflow = [
    {
      step: "1",
      title: "Pairing",
      description: "Students are grouped in cohorts of 4-5 and matched with a mentor based on their interests."
    },
    {
      step: "2",
      title: "Virtual Launch",
      description: "Kick-off sessions bring the mentors and mentees together online to align on expectations."
    },
    {
      step: "3",
      title: "Ongoing Sessions",
      description: "Direct student-led coordination for monthly online check-ins tailored around schedules."
    },
    {
      step: "4",
      title: "Semester Report",
      description: "Feedback and summary of outcomes collected at the end of each academic term."
    }
  ];

  const stats = [
    { value: "71+", label: "Alumni Mentors", desc: "From diverse global sectors" },
    { value: "240+", label: "Students Mentored", desc: "Empowered for career success" },
    { value: "5", label: "Batches Covered", desc: "2019 to 2023 admitted students" },
    { value: "2021", label: "Program Launched", desc: "Growing stronger every semester" }
  ];

  const chartData = [
    { batch: "2019 Batch", students: 47, mentors: 24 },
    { batch: "2020 Batch", students: 49, mentors: 11 },
    { batch: "2021 Batch", students: 51, mentors: 12 },
    { batch: "2022 Batch", students: 48, mentors: 13 },
    { batch: "2023 Batch", students: 49, mentors: 12 }
  ];

  const milestones = [
    { src: "/departments/eee/mentorship/poster-1.png", title: "Milestone Poster 1" },
    { src: "/departments/eee/mentorship/poster-2.png", title: "Milestone Poster 2" },
    { src: "/departments/eee/mentorship/poster-3.png", title: "Milestone Poster 3" },
    { src: "/departments/eee/mentorship/poster-4.png", title: "Milestone Poster 4" },
    { src: "/departments/eee/mentorship/poster-5.png", title: "Milestone Poster 5" },
    { src: "/departments/eee/mentorship/poster-6.png", title: "Milestone Poster 6" },
    { src: "/departments/eee/mentorship/poster-7.png", title: "Milestone Poster 7" },
    { src: "/departments/eee/mentorship/poster-8.png", title: "Milestone Poster 8" }
  ];

  const mentorLists = [
    "/departments/eee/mentorship/mentor-1.png",
    "/departments/eee/mentorship/mentor-2.png",
    "/departments/eee/mentorship/mentor-3.png"
  ];

  return (
    <div className="mt-16 space-y-16 border-t border-stone-200 pt-16">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-orange-950 p-8 md:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-72 h-72 rounded-full bg-orange-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl" />
        
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Established 2021
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Alumni Mentorship Program
          </h2>
          <p className="text-sm font-medium text-orange-400">
            DEPARTMENT OF ELECTRICAL & ELECTRONICS ENGINEERING
          </p>
          <p className="text-base text-stone-300 leading-relaxed pt-2">
            Connecting distinguished alumni from industry, academia, and entrepreneurship with current Electrical & Electronics students — bridging the gap between the classroom and the real world since 2021.
          </p>
        </div>
      </div>

      {/* Program Overview & Categories */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Program Overview</h3>
          <p className="text-sm text-gray-500">
            Pairs distinguished E&E alumni with small groups of current students to guide their professional journey.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {mentorCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} className="flex flex-col bg-stone-50 border border-stone-200/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-md">
                <div className={`w-12 h-12 rounded-xl ${cat.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${cat.color}`} />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{cat.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{cat.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Role of a Mentor */}
      <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-8 md:p-10 space-y-8">
        <div className="max-w-2xl space-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            The Role of a Mentor
          </h3>
          <p className="text-sm text-gray-600">
            Guides, Advisors & Champions helping mentees develop resilience and build confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {mentorRoles.map((role, i) => {
            const Icon = role.icon;
            return (
              <div key={i} className="space-y-3 bg-white p-5 rounded-xl border border-stone-100 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100/60 flex items-center justify-center text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{role.title}</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{role.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it Works / Workflow */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Mentorship in Practice</h3>
          <p className="text-sm text-gray-500">
            A flexible, student-driven model designed to fit into busy schedules.
          </p>
        </div>

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-stone-200 -translate-y-6 -z-10" />
          
          {workflow.map((flow, i) => (
            <div key={i} className="relative bg-white border border-stone-200 rounded-2xl p-6 shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm mx-auto border-4 border-white shadow-sm -mt-10 lg:mt-0">
                {flow.step}
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{flow.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{flow.description}</p>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-stone-500 text-center italic max-w-xl mx-auto leading-relaxed pt-2">
          Note: After the official virtual launch, student groups coordinate directly with their mentors to schedule sessions (typically once or twice a month) based on mutual availability.
        </p>
      </div>

      {/* Program Structure & Outcomes */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Structure */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Program Structure
          </h3>
          
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="text-sm font-semibold text-gray-900 block">Small Groups, Big Impact</strong>
                <span className="text-xs text-gray-600 leading-relaxed">Each mentor works with 4–5 students, ensuring personalized attention and meaningful engagement.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="text-sm font-semibold text-gray-900 block">Virtual & Flexible</strong>
                <span className="text-xs text-gray-600 leading-relaxed">All interactions happen online, making it easy for alumni across different geographies to participate.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="text-sm font-semibold text-gray-900 block">Student-Led Coordination</strong>
                <span className="text-xs text-gray-600 leading-relaxed">Student groups take ownership of scheduling and follow-ups, building leadership skills along the way.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Outcomes */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" /> Student Outcomes
          </h3>
          
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="text-sm font-semibold text-gray-900 block">Technical Knowledge</strong>
                <span className="text-xs text-gray-600 leading-relaxed">Mentors help students stay current with industry trends and deepen their technical expertise beyond the syllabus.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="text-sm font-semibold text-gray-900 block">Career Guidance</strong>
                <span className="text-xs text-gray-600 leading-relaxed">Informed decisions on electives, internships, and projects aligned with real-world market demands.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <strong className="text-sm font-semibold text-gray-900 block">Professional Network</strong>
                <span className="text-xs text-gray-600 leading-relaxed">Students build valuable technical contacts that can open doors to opportunities throughout their careers.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Program Impact Statistics */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 md:p-10 shadow-lg">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-white">Program Impact</h3>
          <p className="text-xs text-stone-400">By the Numbers — growing cohort engagement over the semesters</p>
        </div>

        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl md:text-4xl font-extrabold text-orange-500">{stat.value}</div>
              <div className="text-sm font-bold text-white">{stat.label}</div>
              <div className="text-xs text-stone-400">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Batch-wise Participation Details */}
      <div className="grid gap-8 md:grid-cols-12 items-center">
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Batch-wise Participation</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            The Alumni Mentorship Program has maintained consistent participation across all cohorts, supporting admitted students from the 2019 batch through the 2023 batch.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Notably, the <strong className="text-primary font-semibold">2019 batch</strong> saw the highest mentor-to-student ratio, averaging nearly 1 mentor for every 2 students, offering highly detailed, individualized support.
          </p>
          <div className="pt-2 border-t border-stone-200/80">
            <p className="text-xs text-stone-500 italic">
              * Participation covers five admitted batches with custom ratios targeted to provide small-group interactions (4–5 students per mentor).
            </p>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-center">
          <div className="w-full max-w-sm bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <h4 className="text-xs font-bold text-gray-900 mb-4 text-center">Alumni & Students by Batch</h4>
            
            {/* Legend */}
            <div className="flex justify-center gap-6 mb-5 text-[10px] font-bold">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-xs bg-orange-500" />
                <span className="text-gray-500">Students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-xs bg-stone-700" />
                <span className="text-gray-500">Mentors</span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex h-44 items-stretch gap-1.5">
              {/* Y Axis Ticks */}
              <div className="flex flex-col justify-between text-[9px] font-bold text-stone-400 w-4 select-none pb-4 text-right pr-1">
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>

              {/* Bars Area */}
              <div className="flex-1 flex justify-around items-end border-b border-l border-stone-200 pb-1.5 relative">
                {/* Grid Lines */}
                <div className="absolute inset-x-0 bottom-1.5 top-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-b border-stone-100 w-full" />
                  <div className="border-b border-stone-100 w-full" />
                  <div className="border-b border-stone-100 w-full" />
                  <div className="border-b border-stone-100 w-full" />
                  <div className="w-full" />
                </div>

                {/* Columns */}
                {chartData.map((d, idx) => (
                  <div key={idx} className="flex flex-col items-center group relative z-10 w-10">
                    <div className="flex items-end gap-1 h-32 w-full justify-center">
                      {/* Students Bar */}
                      <div 
                        style={{ height: `${(d.students / 80) * 100}%` }}
                        className="w-3 bg-orange-500 rounded-t-xs transition-all duration-300 hover:bg-orange-600 relative group/bar"
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/bar:block bg-stone-900 text-white text-[9px] font-bold py-0.5 px-1.5 rounded-md shadow-md whitespace-nowrap z-35">
                          Students: {d.students}
                        </div>
                      </div>
                      {/* Mentors Bar */}
                      <div 
                        style={{ height: `${(d.mentors / 80) * 100}%` }}
                        className="w-3 bg-stone-700 rounded-t-xs transition-all duration-300 hover:bg-stone-800 relative group/bar"
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/bar:block bg-stone-900 text-white text-[9px] font-bold py-0.5 px-1.5 rounded-md shadow-md whitespace-nowrap z-35">
                          Mentors: {d.mentors}
                        </div>
                      </div>
                    </div>
                    {/* X Axis Label */}
                    <span className="text-[9px] font-bold text-stone-400 mt-1 select-none whitespace-nowrap">
                      {d.batch.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[9px] text-center text-stone-400 mt-1.5 font-bold">Admitted Batch</p>
          </div>
        </div>
      </div>

      {/* Our Mentors Roster */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Our Mentors</h3>
          <p className="text-sm text-gray-500">
            A diverse group of dedicated alumni guides, each bringing unique expertise from various sectors.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {mentorLists.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-stone-200 shadow-xs bg-white group transition-all duration-300 hover:shadow-md hover:border-stone-300">
              <img 
                src={src} 
                alt={`Alumni Mentors list Page ${i+1}`} 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-500 italic text-center">
          And many more... representing cutting-edge industries, leading global research institutions, and visionary startups.
        </p>
      </div>

      {/* Program Milestones Gallery */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Program Milestones</h3>
          <p className="text-sm text-gray-500">
            Launch posters and kick-off campaign images from each cohort since establishment.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {milestones.map((milestone, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl border border-stone-200/80 bg-white group shadow-2xs hover:shadow-sm hover:border-stone-300 transition-all duration-300">
              <img 
                src={milestone.src} 
                alt={milestone.title} 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-103"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Get Involved Call to Action */}
      <div className="border-t border-stone-200 pt-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Alumni Sign Up */}
          <div className="bg-linear-to-br from-stone-50 to-orange-50/20 border border-stone-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-primary">
                <UserPlus className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900">For Alumni</h4>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Register as a mentor to share your expertise, professional network, and guide the next generation of E&E engineers.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                Contact department coordinator to register
              </span>
            </div>
          </div>

          {/* Student Sign Up */}
          <div className="bg-linear-to-br from-stone-50 to-orange-50/20 border border-stone-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900">For Students</h4>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Ready to learn from industry experts? Reach out to get paired with a mentor this semester.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                Reach out to your department advisor
              </span>
            </div>
          </div>
        </div>

        {/* PDF Document Download */}
        <div className="mt-8 flex justify-center">
          <a
            href={asset("departments/eee/alumni/Alumni-Mentorship-Program.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-orange-200 bg-orange-50/20 text-xs font-semibold text-primary hover:bg-orange-50 hover:border-orange-300 transition-all shadow-2xs hover:shadow-xs group"
          >
            <FileDown className="w-4 h-4 text-primary transition-transform group-hover:translate-y-0.5" />
            Download Alumni Mentorship Program Document (PDF)
          </a>
        </div>

        {/* Contact Info Footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500 bg-stone-50 border border-stone-200 rounded-xl p-4">
          <span className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-stone-400" />
            Inquiries: <strong className="text-gray-700">Dept. of Electrical & Electronics Engineering</strong>
          </span>
          <span className="hidden sm:inline text-stone-300">|</span>
          <span className="text-center sm:text-left">Welcoming collaborations from faculty, alumni & industry leaders.</span>
        </div>
      </div>
    </div>
  );
}
