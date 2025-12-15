"use client";



import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50">


      <LibraryBreadcrumb
        items={[
          { label: "Facilities", href: "/facilities" },
          { label: "Library", href: "/facilities/library" },
          { label: "Contact" }
        ]}
      />

      <LibraryPageHeader
        icon={Phone}
        title="Contact Information"
        subtitle="Get in touch with us for any assistance"
        bgGradient="from-pink-600 to-rose-600"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <LibrarySidebar />
            </div>

            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Contact Info Cards */}
                <FadeIn delay={0.1}>
                  <div className="bg-white rounded-lg p-8 border border-stone-200">
                    <div className="bg-blue-50 p-4 rounded-lg mb-4 inline-block">
                      <Phone className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Phone</h3>
                    <div className="space-y-2">
                      <a href="tel:+918354234060" className="block text-gray-700 hover:text-primary transition-colors">
                        +91-8354-234060
                      </a>
                      <a href="tel:+918354234061" className="block text-gray-700 hover:text-primary transition-colors">
                        +91-8354-234061 (Ext: 234)
                      </a>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <div className="bg-white rounded-lg p-8 border border-stone-200">
                    <div className="bg-green-50 p-4 rounded-lg mb-4 inline-block">
                      <Mail className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Email</h3>
                    <div className="space-y-2">
                      <a href="mailto:library@becbgk.edu" className="block text-gray-700 hover:text-primary transition-colors">
                        library@becbgk.edu
                      </a>
                      <a href="mailto:librarian@becbgk.edu" className="block text-gray-700 hover:text-primary transition-colors">
                        librarian@becbgk.edu
                      </a>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="bg-white rounded-lg p-8 border border-stone-200">
                    <div className="bg-orange-50 p-4 rounded-lg mb-4 inline-block">
                      <MapPin className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Address</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Central Library Building<br />
                      Basaveshwar Engineering College<br />
                      S. Nijalingappa Vidyanagar<br />
                      Bagalkot - 587102<br />
                      Karnataka, India
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.25}>
                  <div className="bg-white rounded-lg p-8 border border-stone-200">
                    <div className="bg-purple-50 p-4 rounded-lg mb-4 inline-block">
                      <Clock className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Working Hours</h3>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="font-semibold">8:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-semibold">9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-semibold">Closed</span>
                      </div>
                      <div className="pt-2 border-t border-stone-200 text-sm text-gray-600">
                        * Extended hours during examinations
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Contact Form */}
              <FadeIn delay={0.3}>
                <div className="bg-white rounded-lg p-8 border border-stone-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        rows={6}
                        className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-6">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}