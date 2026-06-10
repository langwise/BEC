// File: src/components/library/resource-card.tsx
"use client";

import Image from "next/image";
import { ExternalLink, Lock, Unlock } from "lucide-react";

interface ResourceCardProps {
  name: string;
  description: string;
  url?: string;
  logo?: string;
  type?: "paid" | "free";
  category?: string;
  index?: number;
}

export function ResourceCard({
  name,
  description,
  url,
  logo,
  type = "free",
  category,
}: ResourceCardProps) {
  const isPaid = type === "paid";
  const TypeIcon = isPaid ? Lock : Unlock;

  return (
    <div className="group flex h-full flex-col bg-white rounded-xl border border-stone-200 hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header band — uniform, brand-tinted */}
      <div className="relative h-28 flex items-center justify-center p-6 bg-stone-50 border-b border-stone-100">
        {logo ? (
          <div className="relative h-full w-full">
            <Image src={logo} alt={name} fill className="object-contain" />
          </div>
        ) : (
          <div className="text-3xl font-bold tracking-wide text-primary/80">
            {name.substring(0, 3).toUpperCase()}
          </div>
        )}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 border border-stone-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-500">
          <TypeIcon className="h-3 w-3" />
          {isPaid ? "Subscribed" : "Open Access"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {category && (
          <span className="mt-2 inline-block w-fit rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {category}
          </span>
        )}

        <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
          {description}
        </p>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
          >
            Access Resource
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
