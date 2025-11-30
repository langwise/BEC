"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function PrincipalMessageSection() {
  const ref = useRef(null);

  // subtle parallax background
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const principal = {
    name: "Dr. B. R. Hiremath",
    title: "Principal, Basaveshwar Engineering College",
    image: "https://www.becbgk.edu/brh.png", // Replace with actual principal image
    message: `
Education plays a vital role in the overall development of the Society and Nation building. The role of education is not just limited to transferring theoretical knowledge to students. The true goal of education is to surpass beyond awarding degree or a certificate to the students. By Education, Mahatma Gandhi meant an overall development of an individual i.e. man-body, mind and spirit". The ultimate goal of education is to discover the meaning of life and its fulfilment for the benefit of mankind as well as for oneself.

The pursuit of education is to acquire knowledge to serve humanity with modest culture and wisdom but it is to be noted that, knowledge is not given but earned and character is not granted but cultivated. Basaveshwar Engineering College (BEC) not only focuses on the theoretical curriculum, but also assists in imparting practical knowledge leading to the overall development of a student personality from all perspectives.

In my opinion, what makes a good institution is - a highly knowledgeable & trained faculty, affluent library, opt teaching methods, autonomy to think and express oneself – which is part of a culture at BEC.
    `,
    achievements: [
      "Secured NIRF ranking within 200",
      "100% accreditation of all UG courses by NBA",
      "Accreditation by NAAC of UGC",
      "Accredited by QS I-Gauge, UK",
      "Awarded E-lead certification by QS I-Gauge",
      "Received grant of Rs. 40.00 crores in TEQIP phases",
      "Selected by AICTE to setup IDEA lab worth Rs. 1.10 crores",
      "Recognised as Incubation Centre by IT-BT, GoK",
      "Placed in Gold Category by AICTE - CII Survey",
      "Started BE in AI & ML and M.Tech in Defence Technology with DRDO",
      "ILL 1:1 – 1000 Mbps bandwidth with wifi campus",
      "Smart Classrooms for Interactive Teaching & Learning",
    ],
    closingMessage: `
I firmly believe that, our College is more than a place to learn because it has learned faculty with skilled supporting staff and all the state-of-art infrastructure facilities. We provide an opportunity to grow by equipping oneself with everything required to achieve excellence.

At BEC, we ensure students get the best start to their future career to become smart and stately citizen of our glorious country, India. We all must remember that, "We cannot build the future for our students; however we can build our students to face the challenges for the future". Hence, I wish all our students a great success in all the future endeavours.
    `,
  };

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-linear-to-br from-slate-50 via-orange-50/30 to-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-32 left-10 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-30" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
          >
            Academic Leadership
          </motion.span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mt-2 mb-4">
            Principal's Message
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Building students to face the challenges of the future
          </p>
        </motion.div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* LEFT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="relative h-[500px] overflow-hidden shadow-2xl group bg-linear-to-br from-orange-50 to-orange-50">
              <div className="absolute inset-0 bg-linear-to-t from-orange-600/20 via-transparent to-transparent opacity-60" />
              <Image
                src={principal.image}
                alt={principal.name}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-105 p-6"
              />

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-orange-500/20 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-orange-500/20 to-transparent rounded-tr-full" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                {principal.name}
              </h3>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                {principal.title}
              </p>

              {/* Gandhi Quote */}
              <div className="mt-6 pt-6 border-t border-orange-100">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                  <div>
                    <p className="text-gray-700 text-sm italic leading-relaxed">
                      "Man - body, mind and spirit"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      — Mahatma Gandhi on Education
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT PANEL – TEXT & ACHIEVEMENTS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Main Message */}
            <div className="bg-white p-8 lg:p-12 shadow-lg border border-gray-100 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-linear-to-br from-orange-100 to-orange-50 rounded-full blur-3xl opacity-40" />

              <div className="relative text-base lg:text-lg text-gray-700 leading-relaxed space-y-5">
                {principal.message
                  .trim()
                  .split("\n\n")
                  .map((paragraph, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="text-justify"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
              </div>
            </div>

            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-linear-to-br from-orange-50 to-white p-8 lg:p-10 shadow-lg border border-orange-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full blur-2xl opacity-30" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
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
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold text-primary">
                    Key Achievements
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {principal.achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                      className="flex items-start gap-2 group"
                    >
                      <svg
                        className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {achievement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Closing Message */}
            <div className="bg-white p-8 lg:p-12 shadow-lg border border-gray-100 relative overflow-hidden">
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-linear-to-br from-orange-100 to-orange-50 rounded-full blur-3xl opacity-40" />

              <div className="relative text-base lg:text-lg text-gray-700 leading-relaxed space-y-5">
                {principal.closingMessage
                  .trim()
                  .split("\n\n")
                  .map((paragraph, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="text-justify"
                    >
                      {paragraph}
                    </motion.p>
                  ))}

                {/* Signature Style */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="pt-6 mt-8 border-t border-gray-200"
                >
                  <p className="text-primary/80 font-semibold text-lg">
                    With Best Wishes,
                  </p>
                  <p className="text-primary font-bold text-xl mt-1">
                    {principal.name}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {principal.title}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
