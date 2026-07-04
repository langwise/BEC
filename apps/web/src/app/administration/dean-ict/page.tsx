import Image from "next/image";
import { Check, Monitor, Users } from "lucide-react";

import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/section-heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = pageMetadata({
  title: "Dean ICT",
  description:
    "Message from Dr. Mahabaleshwar S. Kakkasageri, Dean of Information and Communications Technology at BEC Bagalkote, on the institution's robust IT infrastructure, campus network, and digital learning environment.",
  path: "/administration/dean-ict",
});

const message = `
It is a privilege to serve a community that is committed to education, innovation, and societal progress. The Department of Information and Communications Technology at Basaveshwar Engineering College strives not only to develop skilled engineers but also responsible citizens who contribute positively to society.

To our students, I encourage you to embrace learning with curiosity, integrity, and determination. The opportunities available today in technology and communication are limitless, and your dedication can transform challenges into innovations that benefit humanity.

To our community and stakeholders, thank you for your continued trust and support. Your partnership enables us to create meaningful learning experiences, promote research and entrepreneurship, and prepare graduates who are ready to address real-world challenges.

Together, we are building a future driven by knowledge, technology, and service to society. I am confident that our students will continue to uphold the values of excellence, professionalism, and social responsibility wherever they go.

I wish all our students success in their academic and professional endeavors and look forward to strengthening our connection with the community in the years ahead.
`;

const ictTeam = [
  { sno: 1, name: "Dr. Mahabaleshwar S. Kakkasageri", designation: "Dean" },
  { sno: 2, name: "Mr. Kupendrakumar H. B.", designation: "Foreman" },
  { sno: 3, name: "Mr. Prashant Kalhal", designation: "Network Administrator" },
  { sno: 4, name: "Mr. Santosh Mani", designation: "Network Administrator" },
  { sno: 5, name: "Mr. Kallappa Kumbar", designation: "Peon" },
];

const infraHighlights = [
  "Protected campus network with advanced Firewall Security.",
  "1000 Mbps (1:1) Internet Leased Line connectivity ensuring high-speed and reliable internet access.",
  "More than 1,200 computers connected across the campus network.",
  "Over 80 wireless access points providing seamless Wi-Fi connectivity throughout the campus.",
  "More than 1,000 wireless devices connected to the campus network.",
  "Access to Microsoft DreamSpark (Microsoft Imagine) resources, including Microsoft operating systems and development tools for students.",
  "All classrooms equipped with Smart Boards and Multimedia Projectors to facilitate innovative teaching and interactive learning.",
  "Endpoint Antivirus Security deployed on desktops for enhanced cyber protection.",
  "Comprehensive CCTV surveillance system for campus security and monitoring.",
  "RFID-enabled Identity Cards for secure access and efficient campus management.",
  "More than 12 high-performance servers supporting academic, administrative, and research applications.",
  "Biometric Attendance System for faculty and staff attendance management.",
];

const infraPhotos = [
  { key: "administration/dean-ict/infra-01.webp", alt: "ICT Infrastructure — Campus Network" },
  { key: "administration/dean-ict/infra-02.webp", alt: "ICT Infrastructure — Server Room" },
  { key: "administration/dean-ict/infra-03.webp", alt: "ICT Infrastructure — Smart Classroom" },
  { key: "administration/dean-ict/infra-04.webp", alt: "ICT Infrastructure — Campus Wi-Fi" },
];

export default function DeanICTPage() {
  const paragraphs = message
    .trim()
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="bg-background text-foreground">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Academic Leadership
          </p>
          <div className="mt-4 max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Dean ICT's Message
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Building a technology-driven learning environment for the campus community.
            </p>
          </div>
        </div>
      </section>

      {/* ── Dean's Message ────────────────────────────────── */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.75fr_1.55fr] lg:px-6 items-start">
          {/* Left: photo + name card */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm">
              <Image
                src={asset("governance/deans/dean-ict-dr-mahabaleshwar-s-k.webp")}
                alt="Dr. Mahabaleshwar S. Kakkasageri"
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover object-top"
                priority
              />
            </div>
            <Card className="rounded-sm border-stone-200 shadow-sm">
              <CardContent className="space-y-2 p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Dr. Mahabaleshwar S. Kakkasageri
                </h2>
                <p className="text-sm leading-relaxed text-gray-600">
                  Dean, Information and Communications Technology (ICT)
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  Basaveshwar Engineering College, Bagalkote
                </p>
                <p className="pt-1 text-sm text-gray-500">
                  <a
                    href="mailto:mahabaleshwar_sk@yahoo.co.in"
                    className="hover:text-primary transition-colors"
                  >
                    mahabaleshwar_sk@yahoo.co.in
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right: message body */}
          <div className="space-y-8">
            <div className="space-y-5 text-base leading-relaxed text-gray-700">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="border-t border-stone-200 pt-6">
              <p className="text-sm text-gray-500">Warm regards,</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                Dr. Mahabaleshwar S. Kakkasageri
              </p>
              <p className="text-sm text-gray-600">
                Dean, Information and Communications Technology (ICT)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ICT Team ──────────────────────────────────────── */}
      <section className="border-t border-stone-200 bg-stone-50/60 py-14 md:py-18">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 space-y-8">
          <SectionHeading
            eyebrow="Our Team"
            title="ICT Team"
            description="The team responsible for managing and maintaining the campus-wide information and communications technology infrastructure."
          />
          <div className="overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-stone-50">
                  <TableHead className="w-16 font-semibold text-gray-900">Sl. No.</TableHead>
                  <TableHead className="font-semibold text-gray-900">Name</TableHead>
                  <TableHead className="font-semibold text-gray-900">Designation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ictTeam.map((member) => (
                  <TableRow key={member.sno}>
                    <TableCell className="text-gray-600">{member.sno}</TableCell>
                    <TableCell className="font-medium text-gray-900">{member.name}</TableCell>
                    <TableCell className="text-gray-700">{member.designation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* ── ICT Infrastructure Highlights ─────────────────── */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 space-y-10">
          <SectionHeading
            eyebrow="Campus Infrastructure"
            title="ICT Infrastructure Highlights"
            description="The institution is equipped with a robust and secure IT infrastructure to support academic, research, administrative, and learning activities across the campus."
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            {/* Highlights list */}
            <Card className="rounded-sm border-stone-200 bg-stone-50/70 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <ul className="space-y-3">
                  {infraHighlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-relaxed text-gray-700"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Infra photos grid */}
            <div className="grid grid-cols-2 gap-3 content-start">
              {infraPhotos.map((photo) => (
                <div
                  key={photo.key}
                  className="relative aspect-video overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm"
                >
                  <Image
                    src={asset(photo.key)}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="col-span-2 mt-2 flex items-center gap-2 text-sm text-gray-500">
                <Monitor className="size-4 shrink-0 text-primary" />
                <span>
                  This state-of-the-art IT ecosystem enables a technology-driven learning environment,
                  ensuring seamless access to digital resources, secure communication, and enhanced
                  academic excellence.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
