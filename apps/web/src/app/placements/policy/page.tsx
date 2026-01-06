"use client";

import { PageHeader } from "@/components/placements/page-header";
import { placementContent } from "@/data/placements/content";
import { FadeIn } from "@/components/animations/fade-in";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function PlacementPolicyPage() {
  const { policy } = placementContent;

  return (
    <div className="space-y-12">
      <PageHeader
        title="Placement Policy"
        description="Guidelines and slot structures for the campus recruitment process."
      />

      {/* Slots Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-primary rounded-full"></span>
          Recruitment Slots
        </h3>
        <div className="grid lg:grid-cols-3 gap-6">
          {policy.slots.map((slot, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-orange-400"></div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-orange-50 text-primary text-xs font-bold rounded-full mb-3 border border-orange-100">
                  {slot.duration}
                </span>
                <h4 className="text-lg font-bold text-gray-900 leading-tight">
                  {slot.title}
                </h4>
                <p className="text-sm font-semibold text-gray-600 mt-1">
                  CTC: <span className="text-green-600">{slot.ctc}</span>
                </p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {slot.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* General Rules Section */}
      <div className="bg-orange-50/50 rounded-2xl p-8 border border-orange-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          General Instructions & Eligibility
        </h3>
        <div className="grid gap-3">
          {policy.generalRules.map((rule, idx) => (
            <FadeIn key={idx} delay={idx * 0.05}>
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                <span className="text-sm text-gray-700 leading-relaxed font-medium">
                  {rule}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
