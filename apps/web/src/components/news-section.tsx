"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { FadeIn } from "./animations/fade-in";

const newsItems = [
  {
    title: "Research Breakthrough in Advanced Materials",
    date: "January 15, 2025",
    description:
      "Faculty members achieve groundbreaking results in sustainable materials research.",
    image: "/story1.jpg", // Ensure you use real paths
  },
  {
    title: "International Conference 2025 Announced",
    date: "January 10, 2025",
    description:
      "Institute to host prestigious international conference on emerging technologies.",
    image: "/story2.jpg",
  },
  {
    title: "New PhD Programmes Launched",
    date: "January 5, 2025",
    description:
      "Five new doctoral programmes introduced in cutting-edge fields of study.",
    image: "/story3.jpg",
  },
];

export function NewsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with Flex Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <FadeIn direction="right">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
              Latest News
            </h2>
            <p className="text-gray-600 text-lg max-w-xl">
              Stay updated with our recent achievements, announcements, and
              campus stories.
            </p>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <Button variant="outline" className="hidden md:flex group">
              View All News
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1} className="h-full">
              <Card className="group h-full overflow-hidden border-0 shadow-none hover:shadow-xl transition-all duration-500 flex flex-col">
                {/* Image Wrapper with Zoom Effect */}
                <div className="relative h-56 overflow-hidden rounded-t-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>

                <CardHeader className="pb-3 pt-6 px-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-primary mb-3 uppercase tracking-wider">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </div>
                  <CardTitle className="text-xl font-serif leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-2 pb-6 grow">
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>

                <CardFooter className="px-0 pt-0">
                  <Button
                    variant="link"
                    className="text-primary p-0 h-auto font-semibold text-base group/btn"
                  >
                    Read more{" "}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <Button variant="outline" className="w-full">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
}
