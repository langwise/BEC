"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHeight, setLogoHeight] = useState<number>();
  const brandTextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = brandTextRef.current;
    if (!el) return;
    const update = () => setLogoHeight(el.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Anything that pins below the header (sidebars, anchor navs, scroll-margin)
  // reads --header-h rather than hardcoding a guess.
  useIsomorphicLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${Math.round(el.getBoundingClientRect().height)}px`,
      );
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white border-b border-muted"
    >
      {/* Top strip */}
      <div className="bg-primary h-2" />

      {/* Row 1: brand + mobile menu trigger */}
      <div className="bg-primary/[0.06] border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 py-2 sm:py-3">
          {/* Logo */}
          <a href="/" className="flex min-w-0 flex-1 items-center gap-5 sm:gap-7 lg:gap-9">
            <img
              src="/logo-crest.png"
              alt="Basaveshwar Engineering College, Bagalkote logo"
              style={logoHeight ? { height: `${logoHeight * 1.25}px` } : undefined}
              className="h-12 max-h-24 w-auto shrink-0 object-contain -ml-2 sm:-ml-4 lg:-ml-6 md:h-24 md:max-h-none lg:h-28"
            />
            <div ref={brandTextRef} className="flex flex-col justify-center min-w-0">
              <span className="text-sm font-semibold uppercase tracking-wide text-foreground leading-tight">
                B.V.V. Sangha&apos;s
              </span>
              <div className="w-fit">
                <span className="block text-base sm:text-xl lg:text-2xl font-bold text-primary leading-tight">
                  Basaveshwar Engineering College, Bagalkote
                </span>
                <span className="block text-right text-[11px] font-semibold italic uppercase tracking-wide text-foreground/80 leading-tight">
                  ESTD: 1963
                </span>
              </div>
              <span className="mt-0.5 hidden max-w-2xl text-[10px] font-medium text-foreground/85 leading-snug md:block md:text-xs">
                [A Government Aided Autonomous College, Recognized by AICTE, Permanently
                Affiliated to Visvesvaraya Technological University, Belagavi &amp;
                Accredited by NAAC with &apos;A&apos; Grade from 2024 to 2029]
              </span>
              <span className="hidden text-[10px] font-bold text-primary leading-tight md:block md:text-xs">
                S. Nijalingappa Vidyanagar, Bagalkote - 587 102, Karnataka, India
              </span>
            </div>
          </a>

          {/* Institution codes */}
          <div className="hidden lg:flex shrink-0 items-start gap-x-6 rounded-lg border border-primary/20 bg-white px-5 py-3 text-sm font-bold leading-tight shadow-sm">
            <div className="grid grid-cols-[auto_auto] gap-x-3 gap-y-1">
              <span className="col-span-2 mb-1 font-extrabold uppercase tracking-wide text-xs text-primary">
                CET Code
              </span>
              <span className="uppercase text-foreground">Aided</span>
              <span className="text-left font-bold tabular-nums text-foreground">E031</span>
              <span className="uppercase text-foreground">Unaided</span>
              <span className="text-left font-bold tabular-nums text-foreground">E049</span>
            </div>
            <div className="w-px self-stretch bg-primary/15" />
            <div className="grid grid-cols-[auto_auto] gap-x-3 gap-y-1">
              <span className="col-span-2 mb-1 font-extrabold uppercase tracking-wide text-xs text-primary">
                Other Codes
              </span>
              <span className="uppercase text-foreground">COMEDK</span>
              <span className="text-left font-bold tabular-nums text-foreground">E024</span>
              <span className="uppercase text-foreground">MBA</span>
              <span className="text-left font-bold tabular-nums text-foreground">B124</span>
              <span className="uppercase text-foreground">M.Tech.</span>
              <span className="text-left font-bold tabular-nums text-foreground">T810</span>
              <span className="uppercase text-foreground">MCA</span>
              <span className="text-left font-bold tabular-nums text-foreground">C408MC</span>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden shrink-0">
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
      </div>

      {/* Row 2: full-width desktop navigation */}
      <div className="hidden lg:block bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <nav className="relative">
            <NavigationMenu viewport={false} className="max-w-none w-full justify-start">
              <NavigationMenuList className="gap-0.5 justify-start">
                {navigationData.map((item: NavigationItem, index: number) => (
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

                    <NavigationMenuContent
                      className={cn(
                        index >= navigationData.length / 2 && "!left-auto right-0"
                      )}
                    >
                      <div className="w-[800px] max-w-[calc(100vw-2rem)] p-6 space-y-6 max-h-[70vh] overflow-y-auto">
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
