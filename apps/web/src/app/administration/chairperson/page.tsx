"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function ChairmanMessageSection() {
  const ref = useRef(null);

  // subtle parallax background
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const chairman = {
    name: "Dr. Veeranna Charantimath",
    title: "Chairman, B. V. V. Sangha, Bagalkote",
    image: "https://www.becbgk.edu/img/core-img/chairman.png", // Replace with actual chairman image
    message: `
Basaveshwar Engineering College (BEC) is a premier Technical Institute recognised at National level catering to the needs of rural masses in Northern part of Karnataka. Ever since its inception in 1963 with only three disciplines, now in 2021 BEC has 9 UG & 8 PG programmes and is recognised at National level by securing NIRF ranking persistently for the past 3 years.

I have been very closely associated with BEC from the day I took charge as the Chairman of B. V. V. Sangha in 1991 and in my opinion; the faculty have persistently worked hard to envisage the vision of Basaveshwar Veershaiva Vidya Vardhak Sangha (BVVS) by starting new courses in several disciplines and stood the testimony of time by accomplishing many feats.

My future endeavour will be to involve all worthy staff in the ventures of BEC with a view to enhance the quality of technical education and make its presence profoundly felt not only within India but also at International level. At BEC, we create opportunities to all stakeholders not only to learn, but also for them to experience the fulfilment that comes from sharing their learning skills with others.

We at BVVS strongly believe in the philosophy of Lord Basaveshwar of 12th century, "Work is Worship" and also inculcate a concrete value system amongst the faculty and students. The B. V. V. Sangha has an everlasting commitment for developing professionals with humane and pragmatic approach to bring about change in the society.

I express my sincere thanks to all for the members and confidence showered on me to lead 150+ institutions ranging from kindergarten to research with profound humility. I seek absolute support and commitment from within and outside to steer BVVS to new panorama and array of success.
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
            Leadership Message
          </motion.span>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mt-2 mb-4">
            Chairman's Vision
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Leading 150+ institutions with a commitment to excellence and social
            transformation
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
                src={chairman.image}
                alt={chairman.name}
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
                {chairman.name}
              </h3>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                {chairman.title}
              </p>

              {/* Philosophy Quote */}
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
                    <p className="text-primary font-semibold text-sm">
                      "Work is Worship"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      — Lord Basaveshwar, 12th Century
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT PANEL – TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white p-8 lg:p-12 shadow-lg border border-gray-100 relative overflow-hidden">
              {/* Decorative linear Blob */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-linear-to-br from-orange-100 to-orange-50 rounded-full blur-3xl opacity-40" />

              <div className="relative text-base lg:text-lg text-gray-700 leading-relaxed space-y-5">
                {chairman.message
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
                    {chairman.name}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{chairman.title}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
