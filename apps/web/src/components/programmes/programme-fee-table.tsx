// src/components/programmes/programme-fee-table.tsx
"use client";

import { motion } from "motion/react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeeCategoryDetail {
  quota: string;
  courseType: string;
  description: string;
  amount?: string;
}

interface ProgrammeFeeTableProps {
  feeCategories: FeeCategoryDetail[];
  documents?: Array<{
    title: string;
    url: string;
  }>;
}

export function ProgrammeFeeTable({ feeCategories, documents }: ProgrammeFeeTableProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fee Structure 2025-26
            </h2>
            <p className="text-lg text-gray-600">
              Detailed breakdown of tuition and other fees
            </p>
          </motion.div>

          {/* Fee Categories Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-border overflow-hidden mb-8"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                      Quota Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                      Course Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                      Fee Components
                    </th>
                    {feeCategories.some(cat => cat.amount) && (
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                        Amount
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {feeCategories.map((category, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {category.quota}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {category.courseType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {category.description}
                      </td>
                      {category.amount && (
                        <td className="px-6 py-4 text-sm font-semibold text-primary">
                          {category.amount}
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Fee Documents */}
          {documents && documents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-border p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-gray-900">
                  Fee Structure Documents
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {documents.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary">
                      {doc.title}
                    </span>
                    <Download className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {/* Important Notes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl"
          >
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-amber-600">ℹ️</span>
              Important Information
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Fees are subject to change as per University and Government norms</li>
              <li>• Additional fees may apply for hostel, transport, and other facilities</li>
              <li>• Fee refund policy as per VTU and KEA guidelines</li>
              <li>• Scholarships and fee concessions available for eligible students</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}