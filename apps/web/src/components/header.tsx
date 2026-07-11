"use client";

import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

import { navigationData } from "@/data/navigation";
import { NavigationItem } from "@/types/navigation";
import { isGroup, isLink } from "@/utils/navigation-gaurd";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-muted">
      {/* Row 1: brand + mobile menu trigger */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-4 sm:gap-6 min-w-0">
            <img
              src="/bvvs-logo.jpg"
              alt="Basaveshwar Engineering College, Bagalkote logo"
              className="object-contain h-20 sm:h-24 lg:h-28 w-auto shrink-0"
            />
            <div className="hidden sm:flex flex-col justify-center min-w-0">
              <span className="text-sm lg:text-base font-semibold uppercase tracking-wide text-foreground leading-tight">
                B.V.V. Sangha&apos;s
              </span>
              <span className="text-xl lg:text-3xl font-bold text-primary leading-tight">
                Basaveshwar Engineering College, Bagalkote
              </span>
              <span className="hidden md:block max-w-3xl text-xs lg:text-sm font-medium text-foreground/80 leading-snug mt-0.5 text-justify">
                Established 1963. A Government Aided Autonomous College,
                Recognized by AICTE, Permanently Affiliated to Visvesvaraya
                Technological University, Belagavi &amp; Accredited by NAAC with
                &apos;A&apos; Grade from 2024 to 2029. S. Nijalingappa
                Vidyanagar, Bagalkote - 587 102, Karnataka, India
              </span>
            </div>
          </a>

          {/* Institution codes */}
          <div className="hidden lg:flex shrink-0 items-start gap-6 text-[11px] leading-snug">
            <div className="grid grid-cols-[auto_auto] gap-x-2 gap-y-0.5">
              <span className="col-span-2 font-semibold uppercase tracking-wide text-[10px] text-primary">
                CET Code
              </span>
              <span className="text-muted-foreground">Aided</span>
              <span className="font-bold text-foreground">E031</span>
              <span className="text-muted-foreground">Unaided</span>
              <span className="font-bold text-foreground">E049</span>
            </div>
            <div className="grid grid-cols-[auto_auto] gap-x-2 gap-y-0.5">
              <span className="col-span-2 font-semibold uppercase tracking-wide text-[10px] text-primary">
                Other Codes
              </span>
              <span className="text-muted-foreground">COMEDK</span>
              <span className="font-bold text-foreground">E024</span>
              <span className="text-muted-foreground">MBA</span>
              <span className="font-bold text-foreground">B124</span>
              <span className="text-muted-foreground">M.Tech.</span>
              <span className="font-bold text-foreground">T810</span>
              <span className="text-muted-foreground">MCA</span>
              <span className="font-bold text-foreground">C408MC</span>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] px-4 overflow-y-auto"
            >
              <SheetTitle className="mt-6 mb-6 font-bold text-lg">Basaveshwar Engineering College, Bagalkote</SheetTitle>

              <nav className="flex flex-col gap-1">
                {navigationData.map((item) => (
                  <div key={item.title} className="border-b border-muted py-2">
                    {!item.items && item.href ? (
                      <a
                        href={item.href}
                        className="block py-2 font-medium hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </a>
                    ) : (
                    <details className="group/mobile-nav">
                      <summary className="flex items-center justify-between cursor-pointer py-2 font-medium">
                        <span>{item.title}</span>
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open/mobile-nav:rotate-180" />
                      </summary>

                      <div className="ml-4 mt-2 space-y-2 pb-2">
                        {(item.groupsFirst
                          ? [
                              ...(item.items?.filter(isGroup) ?? []),
                              ...(item.items?.filter(isLink) ?? []),
                            ]
                          : item.items ?? []
                        ).map((sub) => (
                          <div key={sub.title}>
                            {isGroup(sub) ? (
                              <details className="group/mobile-subnav">
                                <summary className="flex items-center justify-between gap-3 cursor-pointer text-sm py-1">
                                  <span>{sub.title}</span>
                                  <ChevronDown className="h-3 w-3 shrink-0 transition-transform group-open/mobile-subnav:rotate-180" />
                                </summary>

                                <div className="ml-4 mt-1 space-y-1 border-l pl-2">
                                  {sub.items.map((nested) => (
                                    <a
                                      key={nested.title}
                                      href={nested.href}
                                      className="block text-sm py-1 text-muted-foreground hover:text-primary"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {nested.title}
                                    </a>
                                  ))}
                                </div>
                              </details>
                            ) : (
                              <a
                                href={sub.href}
                                className="block text-sm py-1 text-muted-foreground hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {sub.title}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </details>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Row 2: full-width desktop navigation */}
      <div className="hidden lg:block bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <nav className="relative">
            <NavigationMenu>
              <NavigationMenuList className="gap-0.5">
                {navigationData.map((item: NavigationItem) => (
                  <NavigationMenuItem key={item.title}>
                    {!item.items && item.href ? (
                      <a
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "h-12 bg-transparent text-primary-foreground"
                        )}
                      >
                        {item.title}
                      </a>
                    ) : (
                      <>
                    <NavigationMenuTrigger className="text-sm font-medium bg-transparent text-primary-foreground h-12 px-4">
                      {item.title}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <div className="w-[800px] p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                        {(() => {
                          const flatLinks = item.items?.some(isLink) && (
                            <div className="grid grid-cols-3 gap-3">
                              {item.items.filter(isLink).map((link) => (
                                <NavigationMenuLink
                                  key={link.title}
                                  href={link.href}
                                  className="block rounded-md p-4 hover:bg-white hover:text-primary transition-colors"
                                >
                                  <div className="text-sm font-medium">
                                    {link.title}
                                  </div>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          );

                          const divider = item.items?.some(isLink) &&
                            item.items.some(isGroup) && (
                              <div className="border-t border-muted" />
                            );

                          const groups = item.items?.some(isGroup) && (
                            <div className="grid grid-cols-3 gap-8">
                              {item.items.filter(isGroup).map((group) => (
                                <div key={group.title} className="space-y-3">
                                  <div className="text-sm font-semibold bg-muted/50 px-4 py-2 rounded-md">
                                    {group.title}
                                  </div>

                                  <ul className="space-y-1.5">
                                    {group.items.map((nested) => (
                                      <li key={nested.title}>
                                        <NavigationMenuLink
                                          href={nested.href}
                                          className="block rounded-md px-4 py-2.5 text-sm hover:bg-white hover:text-primary transition-colors"
                                        >
                                          {nested.title}
                                        </NavigationMenuLink>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          );

                          const groupsAsRow = item.items?.some(isGroup) && (
                            <div className="grid grid-cols-3 gap-3">
                              {item.items
                                .filter(isGroup)
                                .flatMap((group) => group.items)
                                .map((nested) => (
                                  <NavigationMenuLink
                                    key={nested.title}
                                    href={nested.href}
                                    className="block rounded-md p-4 hover:bg-white hover:text-primary transition-colors"
                                  >
                                    <div className="text-sm font-medium">
                                      {nested.title}
                                    </div>
                                  </NavigationMenuLink>
                                ))}
                            </div>
                          );

                          return item.groupsFirst ? (
                            <>
                              {groupsAsRow}
                              {divider}
                              {flatLinks}
                            </>
                          ) : (
                            <>
                              {flatLinks}
                              {divider}
                              {groups}
                            </>
                          );
                        })()}
                      </div>
                    </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
