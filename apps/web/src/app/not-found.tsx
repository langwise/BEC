"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main className="bg-background text-foreground min-h-[calc(100vh-4rem)] flex flex-col">
      <header className="border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="container mx-auto max-w-6xl px-4 lg:px-6 py-12 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            404 Error
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Page Not Found
          </h1>
          <p className="text-base text-gray-700 leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-12 grow">
        <Card className="rounded-sm border-stone-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Whoops! We couldn&apos;t find that page.
            </CardTitle>
            <CardDescription className="text-sm text-gray-700">
              It looks like the link points to a page that doesn&apos;t exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-stone-50 rounded-md border border-stone-100 text-sm text-gray-600 font-mono break-all">
              Attempted path:{" "}
              <span className="text-gray-900 font-semibold">{pathname}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
