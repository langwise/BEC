"use client";

import { PageHeader } from "@/components/placements/page-header";
import { placementContent } from "@/data/placements/content";
import { Mail, Phone, MapPin, UserSquare2 } from "lucide-react";

export default function PlacementContactPage() {
  const { contact } = placementContent.home;

  return (
    <div className="space-y-12">
      <PageHeader
        title="Contact Us"
        description="Get in touch with our Training and Placement Cell."
      />

      <div className="max-w-2xl bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl shadow-orange-100/20">
        <div className="flex items-start justify-between mb-8">
            <div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {contact.name}
                 </h3>
                 <p className="text-primary font-medium">
                    {contact.role}
                 </p>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <UserSquare2 className="w-8 h-8" />
            </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-sm">
                <Mail className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</p>
                <a href={`mailto:${contact.email}`} className="text-gray-900 font-semibold hover:text-primary">
                    {contact.email}
                </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-sm">
                <Phone className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Mobile (Recruiters)</p>
                <a href={`tel:${contact.mobile}`} className="text-gray-900 font-semibold hover:text-primary">
                    {contact.mobile}
                </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-sm">
                 <MapPin className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Address</p>
                <p className="text-gray-900 font-medium text-sm">
                    {contact.address}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
