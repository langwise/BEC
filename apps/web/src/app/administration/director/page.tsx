"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function DirectorMessageSection() {
  const ref = useRef(null);

  // subtle parallax background
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const director = {
    name: "Dr. R. N. Herkal",
    title: "Director of Technical Education, B. V. V. Sangha, Bagalkote",
    image: "https://www.becbgk.edu/img/core-img/rnh.png",
    message: `
Today, the technological developments across the Globe are remarkable and also galloping at a very rapid speed. The gap in synchronizing innovative technologies and the rich Indian value system is increasing at a startling pace. Hence, present day education imparted across technical institutes needs rethinking and new strategies must be envisaged.

The Technical Institutes under Basaveshwar Veerashaiva Vidya Vardhak Sangha are the artifact of a vision of excellence. Basaveshwar Engineering College (BEC), Bagalkote is one of the pioneering institutes serving stakeholders in northern Karnataka. The growth of the college since its inception in 1963 is commendable.

Some of the recent accomplishments include the introduction of BE-AIML, M.Tech Defence Technology, sanction of an AICTE Idea Lab worth ₹1.10 Cr, and accreditation of all UG programs. The college has utilized TEQIP grants effectively and is now ready for NEP-2020 implementation.

At BEC, promoting academic excellence, discipline, and strong practical exposure is our culture. We prepare students to face societal challenges and global demands through dedication, commitment, and continuous excellence.
    `,
  };

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-linear-to-br from-slate-50 via-blue-50/30 to-white overflow-hidden"
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
            Director's Vision
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Driving excellence in technical education for over six decades
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
                src={director.image}
                alt={director.name}
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
                {director.name}
              </h3>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                {director.title}
              </p>
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
              {/* Decorative Gradient Blob */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30" />

              <div className="relative text-base lg:text-lg text-gray-700 leading-relaxed space-y-5">
                {director.message
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
                    {director.name}
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
