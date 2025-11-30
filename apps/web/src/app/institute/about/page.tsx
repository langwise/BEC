"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function AboutUsPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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

  const milestones = [
    {
      year: "1963",
      title: "Foundation",
      desc: "Established with 3 Engineering programs",
    },
    {
      year: "1968",
      title: "Government Recognition",
      desc: "Received grant-in-aid code",
    },
    {
      year: "1983-2003",
      title: "Phase II Expansion",
      desc: "7 UG & 4 PG programs added",
    },
    {
      year: "2004-2009",
      title: "TEQIP-I",
      desc: "Rs. 14.16 crores grant received",
    },
    {
      year: "2007",
      title: "Autonomous Status",
      desc: "Granted by UGC, New Delhi",
    },
    { year: "2011", title: "TEQIP-II", desc: "Rs. 12.50 crores for R&D" },
    {
      year: "2019-20",
      title: "NIRF Ranking",
      desc: "Rank band 201-250 nationally",
    },
  ];

  const achievements = [
    { icon: "🏆", title: "NIRF Ranking", desc: "201-250 at All India Level" },
    { icon: "🎓", title: "Academic Programs", desc: "9 UG & 8 PG Programmes" },
    { icon: "🔬", title: "R&D Centers", desc: "10 VTU Recognized Departments" },
    { icon: "💡", title: "AICTE IDEA Lab", desc: "Worth Rs. 1.10 Crores" },
    {
      icon: "🌟",
      title: "TEQIP Excellence",
      desc: "Best Performing Institute",
    },
    { icon: "🤝", title: "Mentorship", desc: "Under UGC Paramarsh Scheme" },
  ];

  return (
    <div ref={ref} className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-primary to-orange-700">
        <motion.div
          style={{ y }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-900/30 rounded-full blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-6 border border-white/30"
            >
              Since 1963
            </motion.span>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Basaveshwar Engineering College
            </h1>
            <p className="text-xl lg:text-2xl text-orange-50 font-light mb-4">
              (Autonomous)
            </p>
            <p className="text-lg lg:text-xl text-orange-100 max-w-3xl mx-auto">
              Six decades of excellence in technical education and innovation
            </p>
          </motion.div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 lg:py-32 bg-linear-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-linear-to-br from-primary to-orange-600 p-12 rounded-2xl shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-6 backdrop-blur-sm">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-6">Vision</h2>
                  <p className="text-xl text-orange-50 leading-relaxed italic">
                    "{visionMission.vision}"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white p-12 rounded-2xl shadow-xl border-2 border-orange-100 hover:border-primary transition-all duration-500 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl mb-6">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-primary mb-8">
                  Mission
                </h2>
                <div className="space-y-4">
                  {visionMission.mission.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <span className="text-primary group-hover:text-white font-bold text-sm">
                          {idx + 1}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed pt-1">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              About the College
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-linear-to-br from-slate-50 to-orange-50/30 p-12 rounded-2xl shadow-lg text-gray-700 leading-relaxed space-y-6 text-justify">
              <p className="text-xl first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                Basaveshwar Engineering College (BEC), Bagalkot is undergoing
                unswerving growth since 1963. It started as a private institute
                with only three Engineering programs viz. Civil, Mechanical &
                Electrical Engineering and came into Government grant in-aid
                code from 1968. Today, the institute offers 9 undergraduate and
                8 post graduate programmes with 10 departments recognized as R&D
                centers by VTU, Belagavi.
              </p>

              <p>
                It is a matter of pride for BEC to be placed in the rank band of
                201-250 at all India level for the year 2019-20 by the National
                Institutional Ranking Framework (NIRF) of MHRD, New Delhi.
              </p>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-orange-200 my-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Three Phases of Growth
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-primary text-lg mb-2">
                      Phase I (1963-1983): Foundation & Consolidation
                    </h4>
                    <p className="text-gray-700">
                      The main focus during this phase was consolidation and
                      strengthening of the basic infrastructure facilities to
                      achieve academic excellence.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-primary text-lg mb-2">
                      Phase II (1983-2003): Expansion & Development
                    </h4>
                    <p className="text-gray-700">
                      Emphasis on expansion of UG programmes, introduction of PG
                      programmes, upgradation of faculty qualifications and
                      initiation of research activities. By 2003, the college
                      started 7 additional UG and 4 new PG programmes, including
                      MCA, enhancing students' strength from 300 to 2300 and
                      faculty strength from 20 to 140.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-primary text-lg mb-2">
                      Phase III (2003-Present): Excellence & Recognition
                    </h4>
                    <p className="text-gray-700">
                      The selection of College under Technical Education Quality
                      Improvement Program (TEQIP-I, 2004-2009) of MHRD, New
                      Delhi was onset of new era. The TEQIP-I grant of Rs.14.16
                      crores was effectively utilized for scaling up UG programs
                      and College was granted academic autonomy from UGC, New
                      Delhi in 2007.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The performance of College in TEQIP-I led to the selection under
                TEQIP-II on merit basis. A grant of Rs. 12.50 crores was
                sanctioned for scaling up PG programs and R&D activities in
                2011. During this phase the programs were also accredited by
                NBA, New Delhi. Based on its performance during TEQIP-II the
                College was recognized as best performing institute by National
                Project Implementation Unit (NPIU) and granted an additional
                fund of 5.00 Crores.
              </p>

              <p>
                Further, in Phase-III of TEQIP it received a grant of 7.00
                crores to strengthen R&D activities and has the pride of being
                selected to mentor Rajakiya Engineering College, Bijnor, UP.
                Once again the college was recognized as one of the best
                performing colleges and received an additional grant of Rs. 1.47
                crores.
              </p>

              <p>
                The phenomenal growth during the three phases abetted the
                college in securing NIRF ranking and also recognition at Global
                level. The core values of the institution emphasize on
                teaching-learning, research and administrative processes. Hence,
                to stimulate the academic environment for promotion of Quality,
                the College looks forward for academic audit by National level
                bodies.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 lg:py-32 bg-linear-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Six decades of continuous growth and excellence
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-primary to-orange-600 hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`flex items-center gap-8 ${
                    idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      idx % 2 === 0 ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100 hover:shadow-xl hover:border-primary transition-all duration-300">
                      <span className="text-3xl font-bold text-primary">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800 mt-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{milestone.desc}</p>
                    </div>
                  </div>

                  <div className="hidden lg:flex w-12 h-12 bg-primary rounded-full items-center justify-center z-10 ring-8 ring-white shadow-lg">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Key Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Recognition and excellence at every step
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-linear-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl hover:border-primary transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Banner */}
      <section className="py-16 bg-linear-to-r from-primary to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Distinguished Credentials
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-orange-50">
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>NBA Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>NAAC Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>QS I-Gauge Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>AICTE-CII Gold Category</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>E-Lead Certified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
