"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ContactUsPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const collegeInfo = {
    name: "Basaveshwar Engineering College",
    address: "Bagalkot-587103, Karnataka, India",
    phone: "9481351234",
    email: "principal@becbgk.edu",
  };

  const keyContacts = [
    {
      name: "Dr. B. R. Hiremath",
      designation: "Principal",
      phone: "94489 39700",
      email: "principal@becbgk.edu",
      icon: "👤",
    },
    {
      name: "Dr. K Chandrasekhar",
      designation: "Controller of Examinations",
      phone: null,
      email: "coe@becbgk.edu",
      icon: "📋",
    },
    {
      name: "Dr. S. G. Kambalimath",
      designation: "Placement Officer & TEQIP Co-ordinator",
      phone: null,
      email: "placement@becbgk.edu",
      icon: "💼",
    },
    {
      name: "Dr. P. N. Kulkarni",
      designation: "Dean Academic",
      phone: null,
      email: "deanac@becbgk.edu",
      icon: "🎓",
    },
    {
      name: "Prof. B. S. Haravi",
      designation: "Development Officer",
      phone: null,
      email: "do@becbgk.edu",
      icon: "🏗️",
    },
  ];

  const reachUs = {
    byFlight: [
      {
        name: "Hubballi Airport (HBX)",
        location: "Hubballi, Karnataka",
        distance: "122 km",
      },
      {
        name: "Sambra Airport (IXG)",
        location: "Belagavi, Karnataka",
        distance: "130 km",
      },
      {
        name: "Goa International Airport (GOI)",
        location: "Dabolim, Goa",
        distance: "267 km",
      },
    ],
    byTrain: [
      {
        name: "Bagalkot (BGK) Railway Station",
        location: "Bagalkot",
        distance: "5 km",
      },
    ],
  };

  return (
    <div ref={ref} className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-primary to-orange-700">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30"
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto">
              We're here to answer your questions and help you connect with the
              right department
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

      {/* Main Contact Card */}
      <section className="py-16 -mt-20 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden"
          >
            <div className="bg-linear-to-r from-primary to-orange-700 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">{collegeInfo.name}</h2>
              <p className="text-orange-100 text-lg">(Autonomous)</p>
            </div>

            <div className="p-10 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Address */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-2">Address</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {collegeInfo.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-2">Phone</h3>
                    <a
                      href={`tel:${collegeInfo.phone}`}
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {collegeInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-2">Email</h3>
                    <a
                      href={`mailto:${collegeInfo.email}`}
                      className="text-gray-600 hover:text-primary transition-colors break-all"
                    >
                      {collegeInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Contacts Section */}
      <section className="py-24 lg:py-32 bg-linear-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Key Contacts
            </h2>
            <p className="text-xl text-gray-600">
              Connect with our leadership and administrative team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyContacts.map((contact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-2xl hover:border-primary transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {contact.icon}
                </div>

                <h3 className="text-xl font-bold text-primary mb-2">
                  {contact.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6 min-h-10">
                  {contact.designation}
                </p>

                <div className="space-y-3">
                  {contact.phone && (
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-gray-600 hover:text-primary transition-colors text-sm"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-primary shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-gray-600 hover:text-primary transition-colors text-sm break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reach Us Section */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              How to Reach Us
            </h2>
            <p className="text-xl text-gray-600">
              Your journey to BEC starts here
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* By Flight */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-linear-to-br from-orange-50 to-white p-10 rounded-2xl shadow-lg border border-orange-100 h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
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
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-primary">By Flight</h3>
                </div>

                <div className="space-y-6">
                  {reachUs.byFlight.map((airport, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-full text-center flex items-center justify-center font-bold text-primary">
                        {airport.distance}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1">
                          {airport.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {airport.location}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* By Train */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-linear-to-br from-primary to-orange-600 p-10 rounded-2xl shadow-lg h-full text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
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
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold">By Train</h3>
                  </div>

                  <div className="space-y-6">
                    {reachUs.byTrain.map((station, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                      >
                        <div className="shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-white">
                          {station.distance}
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1 text-lg">
                            {station.name}
                          </h4>
                          <p className="text-orange-100 text-sm">
                            {station.location}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="flex items-center gap-3 mb-3">
                        <svg
                          className="w-6 h-6 text-orange-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h4 className="font-semibold text-white">
                          Most Convenient Option
                        </h4>
                      </div>
                      <p className="text-orange-100 text-sm leading-relaxed">
                        Bagalkot Railway Station is the nearest and most
                        convenient option, located just 5 km from the college
                        campus with excellent connectivity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Find Us on Map
            </h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Bagalkot, Karnataka
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100"
          >
            <div className="aspect-video bg-linear-to-br from-orange-100 to-slate-100 flex items-center justify-center">
              <div className="text-center p-8">
                <svg
                  className="w-20 h-20 text-primary mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-gray-600 text-lg">
                  Google Maps integration can be added here
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Bagalkot-587103, Karnataka, India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-primary to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Have Questions?
            </h3>
            <p className="text-xl text-orange-100 mb-8">
              Our team is ready to assist you. Reach out to us through any of
              the channels above.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${collegeInfo.email}`}
                className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Send an Email
              </a>
              <a
                href={`tel:${collegeInfo.phone}`}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
