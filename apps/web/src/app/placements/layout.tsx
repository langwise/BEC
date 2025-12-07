"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { navigationData } from "@/data/navigation";

// Extract placement navigation items
const placementNav = navigationData.find((item) => item.title === "Placements")?.items || [];

export default function PlacementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24">
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 px-2">
                Placements
              </h2>
              <nav className="flex flex-col space-y-1">
                {placementNav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-white shadow-md shadow-orange-200"
                          : "text-gray-600 hover:bg-orange-50 hover:text-primary"
                      )}
                    >
                      {item.title}
                      {isActive && (
                        <motion.div
                          layoutId="placement-nav-indicator"
                          className="w-1.5 h-1.5 rounded-full bg-white"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Contact Card */}
              <div className="mt-8 p-6 rounded-2xl bg-white border border-orange-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  Need Assistance?
                </h3>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                  Contact our placement cell for recruitment inquiries.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold text-primary">E:</span>
                    becplacement@gmail.com
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold text-primary">M:</span>
                    +91 8904095779
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-sm border border-orange-50/50"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
