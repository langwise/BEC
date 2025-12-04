"use client";

import { motion } from "motion/react";
import { GraduationCap, FileCheck, Phone, MapPin } from "lucide-react"; // DollarSign removed
import { Button } from "@/components/ui/button";

interface ProgrammeAdmissionProps {
  eligibility: {
    title: string;
    criteria: string[];
  };
  entrance: {
    title: string;
    exams: Array<{
      name: string;
      description: string;
    }>;
  };
  // The 'fees' prop is REMOVED from the required props
  contact: {
    central: {
      name: string;
      address: string;
      phone: string;
    };
    admission: {
      name: string;
      address: string;
      phone: string;
    };
  };
}

// 'fees' is REMOVED from the component function signature
export function ProgrammeAdmission({
  eligibility,
  entrance,
  contact,
}: ProgrammeAdmissionProps) {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Admissions
            </h2>
            <p className="text-lg text-gray-600">
              Complete information about eligibility, entrance exams, and
              admission process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Eligibility */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-stone-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {eligibility.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {eligibility.criteria.map((criterion, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Entrance Exams */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-stone-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {entrance.title}
                </h3>
              </div>
              <div className="space-y-4">
                {entrance.exams.map((exam, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {exam.name}
                    </h4>
                    <p className="text-sm text-gray-600">{exam.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* FEE STRUCTURE BLOCK REMOVED: 
              The ProgrammeFeeTable component handles this data elsewhere. */}

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-linear-to-br from-primary to-primary/80 p-8 rounded-xl text-white"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              Contact for Admissions
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Central Office */}
              <div className="space-y-4">
                <h4 className="font-bold text-lg">{contact.central.name}</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{contact.central.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{contact.central.phone}</span>
                  </div>
                </div>
              </div>

              {/* Admission Section */}
              <div className="space-y-4">
                <h4 className="font-bold text-lg">{contact.admission.name}</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{contact.admission.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{contact.admission.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-stone-100"
              >
                Apply Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
