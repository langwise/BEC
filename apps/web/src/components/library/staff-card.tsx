// File: src/components/library/staff-card.tsx
"use client";

import Image from "next/image";
import { Mail, Phone, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

interface StaffCardProps {
  name: string;
  designation: string;
  qualification?: string;
  email?: string;
  phone?: string;
  image?: string;
  index?: number;
}

export function StaffCard({
  name,
  designation,
  qualification,
  email,
  phone,
  image = "/placeholder-avatar.jpg",
  index = 0,
}: StaffCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 bg-linear-to-br from-primary/10 to-accent/10">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-primary font-semibold mb-3">{designation}</p>

        {qualification && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span>{qualification}</span>
          </div>
        )}

        <div className="space-y-2 pt-4 border-t border-stone-200">
          {email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <a
                href={`mailto:${email}`}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {email}
              </a>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-400" />
              <a
                href={`tel:${phone}`}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
