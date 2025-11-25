"use client";

import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationData = [
  {
    title: "Institute",
    items: [
      { title: "About Us", href: "/institute/about" },
      { title: "Awards & Recognitions", href: "/institute/awards" },
      {
        title: "History",
        items: [
          { title: "Former Principals", href: "/institute/history/principals" },
          { title: "Former Directors", href: "/institute/history/directors" },
          { title: "Milestones", href: "/institute/history/milestones" },
        ],
      },
      {
        title: "Campus",
        items: [
          { title: "How To Reach", href: "/institute/campus/reach" },
          { title: "Working Hours", href: "/institute/campus/hours" },
          { title: "Campus Amenities", href: "/institute/campus/amenities" },
          { title: "Virtual Campus Tour", href: "/institute/campus/tour" },
        ],
      },
      { title: "Contact Us", href: "/institute/contact" },
      { title: "Institute Brochure", href: "/institute/brochure" },
      { title: "Institute Newsletter", href: "/institute/newsletter" },
      { title: "Gallery", href: "/institute/gallery" },
    ],
  },
  {
    title: "Administration",
    items: [
      { title: "Organizational Chart", href: "/administration/chart" },
      {
        title: "Governing Bodies",
        items: [
          {
            title: "Board of Governors",
            href: "/administration/governing/board",
          },
          { title: "The Senate", href: "/administration/governing/senate" },
        ],
      },
      { title: "Chairperson", href: "/administration/chairperson" },
      { title: "Director", href: "/administration/director" },
      { title: "Principal", href: "/administration/principal" },
      { title: "Deans", href: "/administration/deans" },
      { title: "Heads of Departments", href: "/administration/hods" },
      {
        title: "Public Disclosures",
        items: [{ title: "RTI", href: "/administration/disclosures/rti" }],
      },
    ],
  },
  {
    title: "Academics",
    items: [
      { title: "Academic Office", href: "/academics/office" },
      {
        title: "Programmes",
        items: [
          { title: "UG Programmes", href: "/academics/programmes/ug" },
          { title: "PG Programmes", href: "/academics/programmes/pg" },
          { title: "PhD Research", href: "/academics/programmes/phd" },
          { title: "M.Tech Research", href: "/academics/programmes/mtech" },
        ],
      },
      { title: "Curriculum", href: "/academics/curriculum" },
      { title: "Academic Calendar", href: "/academics/calendar" },
      { title: "Departments", href: "/academics/departments" },
      { title: "Convocation", href: "/academics/convocation" },
    ],
  },
  {
    title: "Facilities",
    items: [
      { title: "Library", href: "/facilities/library" },
      { title: "Central Research Facility", href: "/facilities/research" },
      { title: "Guest House", href: "/facilities/guesthouse" },
      { title: "Campus Amenities", href: "/facilities/amenities" },
      {
        title: "Grievances",
        items: [
          { title: "PwD", href: "/facilities/grievances/pwd" },
          { title: "SC/ST", href: "/facilities/grievances/scst" },
          { title: "OBC", href: "/facilities/grievances/obc" },
          {
            title: "Internal Complaints",
            href: "/facilities/grievances/internal",
          },
        ],
      },
    ],
  },
  {
    title: "Research",
    items: [
      { title: "Overview", href: "/research/overview" },
      { title: "Research Areas", href: "/research/areas" },
      { title: "Centres", href: "/research/centres" },
      { title: "Sponsored Research", href: "/research/sponsored" },
      { title: "PhD Scheme", href: "/research/phd-scheme" },
      { title: "Publications", href: "/research/publications" },
      { title: "Research Facility", href: "/research/facility" },
      { title: "Institutional Relations", href: "/research/relations" },
    ],
  },
  {
    title: "Student Life",
    items: [
      { title: "Overview", href: "/student-life/overview" },
      { title: "Hostels", href: "/student-life/hostels" },
      { title: "Students' Council", href: "/student-life/council" },
      { title: "Activities", href: "/student-life/activities" },
      { title: "NSS", href: "/student-life/nss" },
      { title: "NCC", href: "/student-life/ncc" },
      { title: "Sports and Games", href: "/student-life/sports" },
      {
        title: "Anti Ragging",
        items: [
          { title: "Info", href: "/student-life/anti-ragging/info" },
          { title: "Contact", href: "/student-life/anti-ragging/contact" },
        ],
      },
      { title: "Alumni", href: "/student-life/alumni" },
      { title: "Achievements", href: "/student-life/achievements" },
    ],
  },
  {
    title: "Alumni",
    items: [
      { title: "Notable Alumni", href: "/alumni/notable" },
      { title: "Alumni Startups", href: "/alumni/startups" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-muted">
      <div className="container mx-auto px-4">
        <div className="flex min-h-20 items-center justify-between py-3">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <div className="shrink-0">
              <img
                src="/logo.jpg"
                alt="Logo"
                className="object-contain h-14 w-auto px-3"
              />
            </div>
            <div className="hidden whitespace-nowrap flex-col items-center">
              <div className="text-3xl font-bold text-foreground">
                BEC
              </div>
              <div className="text-[8px] text-muted-foreground">
                (Autonomous) Bagalkot
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex relative">
            <NavigationMenu>
              <NavigationMenuList className="gap-0.5">
                {navigationData.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/70 transition-all duration-150 h-12 px-4 py-2">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[800px] p-6">
                        {/* Separate regular items from grouped items */}
                        <div className="space-y-6">
                          {/* Regular menu items in a grid */}
                          {item.items.filter(subItem => !subItem.items).length > 0 && (
                            <div className="grid grid-cols-3 gap-3">
                              {item.items
                                .filter(subItem => !subItem.items)
                                .map((subItem) => (
                                  <NavigationMenuLink
                                    key={subItem.title}
                                    href={subItem.href}
                                    className="group block select-none rounded-md p-4 leading-none no-underline outline-none transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-tight">
                                      {subItem.title}
                                    </div>
                                  </NavigationMenuLink>
                                ))}
                            </div>
                          )}

                          {/* Separator if both types exist */}
                          {item.items.filter(subItem => !subItem.items).length > 0 && 
                           item.items.filter(subItem => subItem.items).length > 0 && (
                            <div className="border-t border-muted" />
                          )}

                          {/* Grouped items (with sub-sub-items) */}
                          {item.items.filter(subItem => subItem.items).length > 0 && (
                            <div className="grid grid-cols-2 gap-8">
                              {item.items
                                .filter((subItem): subItem is typeof subItem & { items: NonNullable<typeof subItem.items> } => !!subItem.items)
                                .map((subItem) => (
                                  <div key={subItem.title} className="space-y-3">
                                    <div className="text-sm font-semibold text-foreground px-4 py-2 bg-muted/50 rounded-md">
                                      {subItem.title}
                                    </div>
                                    <ul className="space-y-1.5">
                                      {subItem.items.map((nestedItem) => (
                                        <li key={nestedItem.title}>
                                          <NavigationMenuLink
                                            href={nestedItem.href}
                                            className="block select-none rounded-md px-4 py-2.5 text-sm leading-tight no-underline outline-none transition-colors duration-150 hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                                          >
                                            {nestedItem.title}
                                          </NavigationMenuLink>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] overflow-y-auto px-4"
            >
              <div className="mt-6 mb-6">
                <a
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bold text-lg"
                >
                  BEC Bagalkot
                </a>
              </div>
              <nav className="flex flex-col gap-1">
                {navigationData.map((item) => (
                  <div key={item.title} className="border-b border-muted py-2">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer font-medium text-foreground py-2 hover:text-primary transition-colors">
                        {item.title}
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="ml-4 mt-2 space-y-2 pb-2">
                        {item.items.map((subItem) => (
                          <div key={subItem.title}>
                            {subItem.items ? (
                              <details className="group/nested">
                                <summary className="flex items-center justify-between cursor-pointer text-sm text-muted-foreground py-1 hover:text-foreground">
                                  {subItem.title}
                                  <ChevronDown className="h-3 w-3 transition-transform group-open/nested:rotate-180" />
                                </summary>
                                <div className="ml-4 mt-1 space-y-1 border-l pl-2">
                                  {subItem.items.map((nestedItem) => (
                                    <a
                                      key={nestedItem.title}
                                      href={nestedItem.href}
                                      className="block text-sm text-muted-foreground hover:text-primary py-1"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {nestedItem.title}
                                    </a>
                                  ))}
                                </div>
                              </details>
                            ) : (
                              <a
                                href={subItem.href}
                                className="block text-sm text-muted-foreground hover:text-primary py-1"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.title}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
