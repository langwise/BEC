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
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { navigationData } from "@/data/navigation";
import { NavigationItem } from "@/types/navigation";
import { isGroup, isLink } from "@/utils/navigation-gaurd";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-muted">
      <div className="container mx-auto px-4">
        <div className="flex min-h-20 items-center justify-between py-3">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="object-contain h-14 w-auto px-3"
            />
            <div className="hidden whitespace-nowrap flex-col">
              <div className="text-3xl font-bold text-foreground">BEC</div>
              <div className="text-[8px] text-muted-foreground">
                (Autonomous) Bagalkot
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex relative">
            <NavigationMenu>
              <NavigationMenuList className="gap-0.5">
                {navigationData.map((item: NavigationItem) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-accent/50 h-12 px-4">
                      {item.title}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <div className="w-[800px] p-6 space-y-6">
                        {/* Flat links */}
                        {item.items?.some(isLink) && (
                          <div className="grid grid-cols-3 gap-3">
                            {item.items.filter(isLink).map((link) => (
                              <NavigationMenuLink
                                key={link.title}
                                href={link.href}
                                className="block rounded-md p-4 hover:bg-accent"
                              >
                                <div className="text-sm font-medium">
                                  {link.title}
                                </div>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        )}

                        {/* Divider */}
                        {item.items?.some(isLink) &&
                          item.items.some(isGroup) && (
                            <div className="border-t border-muted" />
                          )}

                        {/* Grouped items */}
                        {item.items?.some(isGroup) && (
                          <div className="grid grid-cols-2 gap-8">
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
                                        className="block rounded-md px-4 py-2.5 text-sm hover:bg-accent"
                                      >
                                        {nested.title}
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

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
              <div className="mt-6 mb-6 font-bold text-lg">BEC Bagalkot</div>

              <nav className="flex flex-col gap-1">
                {navigationData.map((item) => (
                  <div key={item.title} className="border-b border-muted py-2">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer py-2 font-medium">
                        {item.title}
                        <ChevronDown className="h-4 w-4 group-open:rotate-180" />
                      </summary>

                      <div className="ml-4 mt-2 space-y-2 pb-2">
                        {item.items?.map((sub) => (
                          <div key={sub.title}>
                            {isGroup(sub) ? (
                              <details>
                                <summary className="flex justify-between cursor-pointer text-sm py-1">
                                  {sub.title}
                                  <ChevronDown className="w-3 h-3 group-open:rotate-180" />
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
