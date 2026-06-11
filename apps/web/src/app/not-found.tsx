"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main className="bg-background text-foreground min-h-[calc(100vh-5rem)] flex items-center">
      <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          404 — Page Not Found
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-secondary tracking-tight">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          The page may have been moved, renamed, or is no longer available.
        </p>

        {pathname && (
          <p className="mt-6 text-sm font-mono text-muted-foreground break-all">
            {pathname}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="gap-2 h-11"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="gap-2 h-11 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Button>
        </div>
      </div>
    </main>
  );
}
