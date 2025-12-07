// src/components/programmes/programme-layout.tsx
"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProgrammeNav } from "./programme-nav";
import { ReactNode } from "react";

interface ProgrammeLayoutProps {
  children: ReactNode;
  currentProgramme: "ug" | "pg" | "mba" | "mca" | "phd";
}

export function ProgrammeLayout({ children, currentProgramme }: ProgrammeLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgrammeNav currentProgramme={currentProgramme} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}