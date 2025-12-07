"use client";

import { motion } from "motion/react";
import { PageHeader } from "@/components/placements/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Plane,
  Train,
  Clock,
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactUsPage() {
  const collegeInfo = {
    name: "Basaveshwar Engineering College",
    address: "Bagalkot-587103, Karnataka, India",
    phone: "9481351234",
    email: "principal@becbgk.edu",
    hours: "Mon - Sat: 9:00 AM - 5:00 PM",
  };

  const keyContacts = [
    {
      name: "Dr. B. R. Hiremath",
      designation: "Principal",
      phone: "94489 39700",
      email: "principal@becbgk.edu",
    },
    {
      name: "Dr. K Chandrasekhar",
      designation: "Controller of Examinations",
      phone: null,
      email: "coe@becbgk.edu",
    },
    {
      name: "Dr. S. G. Kambalimath",
      designation: "Placement Officer",
      phone: null,
      email: "placement@becbgk.edu",
    },
    {
      name: "Dr. P. N. Kulkarni",
      designation: "Dean Academic",
      phone: null,
      email: "deanac@becbgk.edu",
    },
    {
      name: "Prof. B. S. Haravi",
      designation: "Development Officer",
      phone: null,
      email: "do@becbgk.edu",
    },
  ];

  const reachUs = {
    byFlight: [
      {
        name: "Hubballi Airport (HBX)",
        location: "Hubballi, Karnataka",
        distance: "122 km",
      },
      {
        name: "Sambra Airport (IXG)",
        location: "Belagavi, Karnataka",
        distance: "130 km",
      },
      {
        name: "Goa International Airport (GOI)",
        location: "Dabolim, Goa",
        distance: "267 km",
      },
    ],
    byTrain: [
      {
        name: "Bagalkot (BGK) Railway Station",
        location: "Bagalkot",
        distance: "5 km",
      },
      {
          name: "Hubballi Junction (UBL)",
          location: "Hubballi",
          distance: "125 km",
      }
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Contact Us"
        description="We are here to help. Reach out to the right department for your queries."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Institute", href: "/institute" },
          { label: "Contact", href: "/institute/contact", active: true },
        ]}
      />

      {/* Main Contact Section */}
      <section className="pb-20 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
            <FadeIn>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Address Card */}
                    <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
                        <p className="text-gray-600 font-medium leading-relaxed mb-4">{collegeInfo.name}<br/>{collegeInfo.address}</p>
                    </div>

                    {/* Phone & Hours */}
                    <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Phone & Hours</h3>
                        <p className="text-gray-600 font-medium mb-1">
                            <a href={`tel:${collegeInfo.phone}`} className="hover:text-primary transition-colors">{collegeInfo.phone}</a>
                        </p>
                         <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
                            <Clock className="w-4 h-4" />
                            {collegeInfo.hours}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                        <p className="text-gray-600 font-medium break-all">
                            <a href={`mailto:${collegeInfo.email}`} className="hover:text-primary transition-colors">{collegeInfo.email}</a>
                        </p>
                        <div className="mt-4 pt-4 border-t border-stone-100">
                             <p className="text-sm text-gray-500">For admissions:</p>
                             <a href="mailto:admissions@becbgk.edu" className="text-primary font-medium hover:underline">admissions@becbgk.edu</a>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
      </section>

      {/* Key Contacts */}
      <section className="py-20 bg-stone-50/50 border-y border-stone-100">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
          <FadeIn className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Key Contacts</h2>
            <p className="text-gray-600 max-w-2xl text-lg">Direct lines to our administration and departments.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyContacts.map((contact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-xl border border-stone-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                  <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-stone-50 rounded-lg text-gray-500">
                           <User className="w-6 h-6" />
                      </div>
                      {contact.phone && (
                          <a href={`tel:${contact.phone}`} className="p-2 text-gray-400 hover:text-primary hover:bg-orange-50 rounded-full transition-colors">
                              <Phone className="w-4 h-4" />
                          </a>
                      )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{contact.designation}</p>
                  
                  <div className="mt-auto pt-4 border-t border-stone-50">
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                      </a>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
           <FadeIn className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Intro */}
                <div>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                        <Navigation className="w-3.5 h-3.5" />
                        Directions
                     </div>
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-6">
                        How to Reach Us
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        Basaveshwar Engineering College is well connected by road, rail, and air. The campus is located in the heart of Bagalkot city.
                    </p>
                    
                    {/* Train Info */}
                    <div className="mb-8">
                         <div className="flex items-center gap-3 mb-4">
                             <div className="p-2 bg-orange-100 text-primary rounded-lg">
                                 <Train className="w-5 h-5" />
                             </div>
                             <h3 className="text-xl font-bold text-gray-900">By Train</h3>
                         </div>
                         <div className="space-y-4 pl-4 border-l-2 border-stone-100">
                             {reachUs.byTrain.map((station, i) => (
                                 <div key={i} className="relative pl-6">
                                     <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-stone-300" />
                                     <h4 className="font-semibold text-gray-900">{station.name}</h4>
                                     <p className="text-sm text-gray-500">{station.distance} away</p>
                                 </div>
                             ))}
                         </div>
                    </div>

                    {/* Flight Info */}
                    <div>
                         <div className="flex items-center gap-3 mb-4">
                             <div className="p-2 bg-orange-100 text-primary rounded-lg">
                                 <Plane className="w-5 h-5" />
                             </div>
                             <h3 className="text-xl font-bold text-gray-900">By Flight</h3>
                         </div>
                         <div className="space-y-4 pl-4 border-l-2 border-stone-100">
                             {reachUs.byFlight.map((airport, i) => (
                                 <div key={i} className="relative pl-6">
                                     <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-stone-300" />
                                     <h4 className="font-semibold text-gray-900">{airport.name}</h4>
                                     <p className="text-sm text-gray-500">{airport.location} ({airport.distance})</p>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>

                {/* Map */}
                <div className="h-full min-h-[400px] bg-stone-50 rounded-3xl border border-stone-100 relative overflow-hidden group">
                    {/* Placeholder Map Pattern */}
                     <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-5 grayscale group-hover:grayscale-0 transition-all duration-700" />
                     
                     <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-primary mb-4 animate-bounce">
                              <MapPin className="w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Google Maps</h3>
                          <p className="text-gray-500 max-w-xs mb-6">Interactive map integration would go here to show exact campus location.</p>
                          <a 
                             href="https://maps.google.com/?q=Basaveshwar+Engineering+College" 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
                          >
                              Open in Maps
                          </a>
                     </div>
                </div>
           </FadeIn>
        </div>
      </section>

    </div>
  );
}
