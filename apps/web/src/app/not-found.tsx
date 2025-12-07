"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  const quickLinks = [
    {
      name: "Home",
      path: "/",
      icon: "🏠",
      description: "Back to homepage",
    },
    {
      name: "About Us",
      path: "/about",
      icon: "ℹ️",
      description: "Learn about BEC",
    },
    {
      name: "Departments",
      path: "/departments",
      icon: "🎓",
      description: "Explore our programs",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: "📧",
      description: "Get in touch",
    },
  ];

  return (
    <div className="min-h-screen py-20 bg-linear-to-br from-orange-50 via-white to-slate-50 flex items-center justify-center relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center">
          {/* 404 Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.h1
                className="text-[180px] lg:text-[250px] font-bold bg-linear-to-br from-primary to-orange-600 bg-clip-text text-transparent leading-none"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                404
              </motion.h1>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-8 -right-8 text-6xl"
                animate={{
                  rotate: [0, 15, -15, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🔍
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 text-5xl"
                animate={{
                  rotate: [0, -15, 15, 0],
                  x: [0, -15, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                📄
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oops! The page you're looking for seems to have wandered off.
              Let's get you back on track.
            </p>
          </motion.div>

          {/* Quick Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-700 mb-8">
              Try these instead:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {quickLinks.map((link, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => router.push(link.path)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-2xl hover:border-primary transition-all duration-300 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {link.name}
                  </h4>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              onClick={() => router.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-linear-to-r from-primary to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </motion.button>

            <motion.button
              onClick={() => router.push("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-primary rounded-xl font-semibold border-2 border-primary hover:bg-orange-50 transition-all duration-300 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </motion.button>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-16 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-100 max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
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
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-800 mb-2">Need Help?</h4>
                <p className="text-gray-600 text-sm">
                  If you believe this is an error or need assistance, please
                  contact us at{" "}
                  <a
                    href="mailto:principal@becbgk.edu"
                    className="text-primary hover:underline font-semibold"
                  >
                    principal@becbgk.edu
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
