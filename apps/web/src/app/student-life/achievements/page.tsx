"use client";

import { PageHeader } from "@/components/placements/page-header";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  Lightbulb,
  Code,
  GraduationCap,
  Gavel,
  Cpu,
  Activity,
  Palette,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    label: "Median Package",
    value: "₹4.0 LPA",
    desc: "Up from ₹3.4 LPA",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Graduation Rate",
    value: "90%+",
    desc: "Completed without backlogs",
    icon: GraduationCap,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "IIC Rating",
    value: "4.5/5",
    desc: "Best in South West Zone",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    label: "Projects Funded",
    value: "18,550+",
    desc: "KSCST Student Projects",
    icon: Lightbulb,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const sportsAchievements = [
  {
    title: "Hockey Championship",
    category: "VTU Inter-Zonal",
    year: "2018",
    desc: "College team secured the Championship Trophy at VVCE, Mysore.",
  },
  {
    title: "Handball Winners",
    category: "VTU Gulbarga Zone",
    year: "2018",
    desc: "Students lifted the Championship Trophy in the zonal tournament.",
  },
  {
    title: "Wushu Gold Medals",
    category: "State Championship",
    year: "2017",
    desc: "Jyothi V Mokashi (Civil) won 2 Gold medals at the Karnataka State Championship.",
  },
  {
    title: "Floorball Bronze",
    category: "National Level",
    year: "2017",
    desc: "Mr. Mahesh I G (ISE) won Bronze at the National Floorball Championship.",
  },
  {
    title: "Srishti Champions",
    category: "State Level",
    year: "2010",
    desc: "Hat-trick championship win for 3 consecutive years with 19 prizes.",
  },
];

const technicalAchievements = [
  {
    title: "Smart India Hackathon",
    category: "National Winner",
    year: "2020",
    desc: "Team 'We_ASCLEPIUS' won the Software Edition solving critical digital challenges.",
  },
  {
    title: "Best in Wind Energy",
    category: "Institutional Award",
    year: "2022",
    desc: "Recognized by NWAY as the Best Institution of Higher Learning in Wind Energy.",
  },
  {
    title: "KSCST Selected Project",
    category: "State Exhibition",
    year: "2024",
    desc: "47th Series: 'Fire Fighting Robot' selected for State Level Exhibition.",
  },
  {
    title: "Robotic Rehabilitation",
    category: "Innovation",
    year: "2024",
    desc: "Project for 'Paralyzed Arm' selected for KSCST State Level Presentation.",
  },
  {
    title: "Wastewater Treatment",
    category: "Sustainability",
    year: "2024",
    desc: "Constructed Wetland project selected for KSCST Exhibition.",
  },
];

export default function AchievementsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Student Achievements"
        description="Celebrating the triumphs of our scholars, innovators, and athletes on the global stage."
      />

      {/* Hero Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-none shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-slate-400 max-w-[120px] mx-auto">
                    {stat.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Hall of Fame Spotlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl bg-slate-900 p-6 lg:p-12 relative overflow-hidden text-white"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center">
            <div className="space-y-6 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold uppercase tracking-wider border border-yellow-500/30">
                <Trophy className="w-4 h-4" />
                Hall of Fame
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Champions of{" "}
                <span className="text-orange-400">Innovation & Sport</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                From winning the **Smart India Hackathon** to lifting the **VTU
                Zonal Trophies**, BEC students consistently prove their mettle
                on national and state platforms.
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
                <div className="px-2 py-3 sm:px-4 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">19</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 uppercase truncate">
                    Srishti Prizes
                  </div>
                </div>
                <div className="px-2 py-3 sm:px-4 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">9.0+</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 uppercase truncate">
                    Top CGPA
                  </div>
                </div>
                <div className="px-2 py-3 sm:px-4 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">615</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 uppercase truncate">
                    Graduates (2022)
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 w-full">
              <div className="bg-linear-to-br from-orange-500 to-red-600 p-1 rounded-2xl rotate-3 transform hover:rotate-0 transition-all duration-500">
                <div className="bg-slate-900 rounded-xl p-6 h-full">
                  <Code className="w-10 h-10 text-white mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Smart India Hackathon
                  </h3>
                  <p className="text-sm text-slate-300 mb-4">
                    Team We_ASCLEPIUS won the 2020 Software Edition.
                  </p>
                  <Badge className="bg-orange-500 hover:bg-orange-600">
                    National Winner
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Categories Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="technical" className="w-full">
          <div className="flex justify-center mb-8 px-4">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-full shadow-sm h-auto flex flex-nowrap justify-center w-full sm:w-auto">
              <TabsTrigger
                value="technical"
                className="rounded-full px-1 py-2 sm:px-6 text-[10px] xs:text-xs sm:text-sm flex-1 sm:flex-none data-[state=active]:bg-orange-600 data-[state=active]:text-white whitespace-nowrap text-center tracking-tight"
              >
                Technical & Research
              </TabsTrigger>
              <TabsTrigger
                value="sports"
                className="rounded-full px-1 py-2 sm:px-6 text-[10px] xs:text-xs sm:text-sm flex-1 sm:flex-none data-[state=active]:bg-orange-600 data-[state=active]:text-white whitespace-nowrap text-center tracking-tight"
              >
                Sports & Games
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="technical"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {technicalAchievements.map((item, index) => (
              <Card
                key={index}
                className="group hover:border-orange-200 hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {item.year === "2024" ? (
                        <Cpu className="w-5 h-5" />
                      ) : (
                        <Lightbulb className="w-5 h-5" />
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-600"
                    >
                      {item.year}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">
                    {item.category}
                  </p>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent
            value="sports"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sportsAchievements.map((item, index) => (
              <Card
                key={index}
                className="group hover:border-orange-200 hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <Activity className="w-5 h-5" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-600"
                    >
                      {item.year}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">
                    {item.category}
                  </p>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
