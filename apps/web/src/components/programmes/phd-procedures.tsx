// src/components/programmes/phd-procedures.tsx
"use client";

import { motion } from "motion/react";
import { FileText, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProcedureStep {
  title: string;
  documents: string[];
}

interface PhDProceduresProps {
  availableBranches: Array<{
    slNo: number;
    branch: string;
  }>;
  registrationProcedure: string[];
  admissionProcedure: string[];
}

export function PhDProcedures({
  availableBranches,
  registrationProcedure,
  admissionProcedure,
}: PhDProceduresProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Available Branches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
              Research Centers
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Research Programs leading to Ph.D./M.Sc.(Engg.) are available in
              the following departments
            </p>

            <div className="bg-muted rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                        Sl. No.
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                        Branch / Department
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white">
                    {availableBranches.map((branch, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="hover:bg-primary/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {branch.slNo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                          {branch.branch}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Application Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 bg-linear-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Application Form
                </h3>
                <p className="text-gray-700 mb-4">
                  Application form for Ph.D. Admission to VTU shall be
                  downloaded from the University Website{" "}
                  <a
                    href="https://www.vtu.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    www.vtu.ac.in
                  </a>
                  . Duly filled in applications along with online payment for Rs
                  1500/- receipt and necessary enclosures should be sent to:
                </p>
                <div className="bg-white p-4 rounded-lg border border-border">
                  <p className="font-semibold text-gray-900 mb-1">
                    The Registrar
                  </p>
                  <p className="text-sm text-gray-700">
                    Visvesvaraya Technological University
                  </p>
                  <p className="text-sm text-gray-700">
                    "Jnana Sangama", Belagavi - 590018
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Registration Procedure */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-border p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Procedure for Registration
                </h3>
              </div>
              <ul className="space-y-3">
                {registrationProcedure.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Admission Procedure */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-border p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Procedure for Admission
                </h3>
              </div>
              <ul className="space-y-3">
                {admissionProcedure.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Contact Research Coordinator
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
