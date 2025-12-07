// File: src/app/facilities/library/page.tsx
"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { 
  BookOpen, 
  Users, 
  Building2, 
  Globe, 
  Link as LinkIcon, 
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";

const libraryStats = [
  { value: "1,40,000+", label: "Books & Volumes" },
  { value: "200+", label: "Journals & Periodicals" },
  { value: "50+", label: "E-Resources" },
  { value: "1 Gbps", label: "Internet Speed" },
];

const libraryServices = [
  {
    icon: BookOpen,
    title: "About Library",
    description: "Learn about our rich collection, history, and mission to support academic excellence.",
    href: "/facilities/library/about",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Users,
    title: "Staff Profile",
    description: "Meet our dedicated team of library professionals committed to serving you.",
    href: "/facilities/library/staff",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Users,
    title: "Supporting Staff",
    description: "Our support team ensuring smooth library operations and services.",
    href: "/facilities/library/supporting-staff",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Building2,
    title: "Infrastructure Facility",
    description: "Explore our modern facilities designed for optimal learning and research.",
    href: "/facilities/library/infrastructure",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    icon: Globe,
    title: "E-Resources (Paid)",
    description: "Access premium digital databases, journals, and research materials.",
    href: "/facilities/library/e-resources-paid",
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    icon: Globe,
    title: "E-Resources (Free)",
    description: "Discover free online resources and open-access academic materials.",
    href: "/facilities/library/e-resources-free",
    color: "text-teal-600",
    bgColor: "bg-teal-50"
  },
  {
    icon: LinkIcon,
    title: "Useful Links",
    description: "Quick access to important library resources and external databases.",
    href: "/facilities/library/useful-links",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    icon: Phone,
    title: "Contact Information",
    description: "Get in touch with our library team for assistance and inquiries.",
    href: "/facilities/library/contact",
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
        <div className="absolute inset-0 bg-[url('/section_2_diagonals.svg')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-12 w-12 text-white" />
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
                Central Library
              </h1>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              A gateway to knowledge and innovation, supporting academic excellence since 1963
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {libraryStats.map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Explore Library Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access comprehensive resources and services designed to support your academic journey
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {libraryServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <FadeIn key={index} delay={index * 0.05}>
                  <Link href={service.href}>
                    <div className="group h-full bg-white rounded-lg border border-stone-200 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className={`${service.bgColor} p-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                        <Icon className={`h-12 w-12 ${service.color}`} />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                          Learn More
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          {/* Quick Access Section */}
          <FadeIn delay={0.4}>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Library Hours */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-8">
                <Clock className="h-10 w-10 mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-4">Library Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-90">Monday - Friday:</span>
                    <span className="font-semibold">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">Saturday:</span>
                    <span className="font-semibold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-lg p-8">
                <Phone className="h-10 w-10 mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-75" />
                    <span>+91-8354-234060</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-75" />
                    <span>library@becbgk.edu</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-75" />
                    <span>Central Library Building, BEC Campus</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-8">
                <LinkIcon className="h-10 w-10 mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-4">Quick Access</h3>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block hover:underline opacity-90 hover:opacity-100 transition-opacity">
                    → Online Catalog (OPAC)
                  </a>
                  <a href="#" className="block hover:underline opacity-90 hover:opacity-100 transition-opacity">
                    → Reserve a Book
                  </a>
                  <a href="#" className="block hover:underline opacity-90 hover:opacity-100 transition-opacity">
                    → Renew Books
                  </a>
                  <a href="#" className="block hover:underline opacity-90 hover:opacity-100 transition-opacity">
                    → Digital Library
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}