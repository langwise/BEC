"use client"

import { useState } from "react"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigationData = [
  {
    title: "Home",
    href: "/",
  },
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
          { title: "Board of Governors", href: "/administration/governing/board" },
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
          { title: "PhD Research Programmes", href: "/academics/programmes/phd" },
          { title: "M.Tech Research Programmes", href: "/academics/programmes/mtech" },
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
          { title: "Internal Complaints", href: "/facilities/grievances/internal" },
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
          { title: "Anti Ragging", href: "/student-life/anti-ragging/info" },
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
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-muted">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground font-bold text-xl">
              UI
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-bold text-foreground leading-tight">University Institute</div>
              <div className="text-xs text-muted-foreground">Excellence in Education</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigationData.map((item) =>
                item.items ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="text-sm font-medium">{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.items.map((subItem) => (
                          <li key={subItem.title}>
                            {subItem.items ? (
                              <div className="space-y-1">
                                <div className="text-sm font-semibold text-foreground">{subItem.title}</div>
                                <ul className="space-y-1 ml-2">
                                  {subItem.items.map((nestedItem) => (
                                    <li key={nestedItem.title}>
                                      <NavigationMenuLink
                                        href={nestedItem.href}
                                        className="block select-none rounded p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                      >
                                        {nestedItem.title}
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <NavigationMenuLink
                                href={subItem.href}
                                className="block select-none space-y-1 rounded p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{subItem.title}</div>
                              </NavigationMenuLink>
                            )}
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <nav className="flex flex-col gap-4 mt-8">
                {navigationData.map((item) => (
                  <div key={item.title}>
                    {item.items ? (
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer font-medium text-foreground py-2">
                          {item.title}
                          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="ml-4 mt-2 space-y-2">
                          {item.items.map((subItem) => (
                            <div key={subItem.title}>
                              {subItem.items ? (
                                <details className="group/nested">
                                  <summary className="flex items-center justify-between cursor-pointer text-sm text-muted-foreground py-1">
                                    {subItem.title}
                                    <ChevronDown className="h-3 w-3 transition-transform group-open/nested:rotate-180" />
                                  </summary>
                                  <div className="ml-4 mt-1 space-y-1">
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
                    ) : (
                      <a
                        href={item.href}
                        className="block font-medium text-foreground py-2 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </a>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
