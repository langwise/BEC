"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FacultyMember } from "@/types/faculty";
import { ChevronRight, ExternalLink } from "lucide-react";

interface FacultyCardProps {
  member: FacultyMember;
  /** Horizontal card with a small portrait instead of the full-width photo. */
  compact?: boolean;
}

function initials(name: string): string {
  const words = name.replace(/[^a-zA-Z\s.]/g, "").trim().split(/\s+/);
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function Portrait({
  member,
  sizes,
  className,
  initialsClassName,
}: {
  member: FacultyMember;
  sizes: string;
  className?: string;
  initialsClassName?: string;
}) {
  if (member.photoUrl) {
    return (
      <Image
        src={member.photoUrl}
        alt={member.name}
        fill
        sizes={sizes}
        className={cn("object-cover object-top", className)}
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className={cn("text-4xl font-semibold tracking-wide text-stone-300", initialsClassName)}>
        {initials(member.name)}
      </span>
    </div>
  );
}

export function FacultyCard({ member, compact = false }: FacultyCardProps) {
  const hasCv = !!member.cvUrl;

  const card = compact ? (
    <Card
      className={cn(
        "group flex h-full flex-row items-center gap-4 overflow-hidden rounded-xl border-stone-200 p-3 shadow-sm transition-all",
        hasCv && "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
      )}
    >
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100">
        <Portrait
          member={member}
          sizes="80px"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
          initialsClassName="text-xl"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary">
          {member.name}
        </h3>
        <p className="mt-0.5 text-sm leading-snug text-gray-600">
          {member.designation}
        </p>
      </div>
      {hasCv && (
        <ChevronRight className="h-5 w-5 shrink-0 text-stone-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary" />
      )}
    </Card>
  ) : (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border-stone-200 p-0 shadow-sm transition-all",
        hasCv && "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
      )}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-100">
        <Portrait
          member={member}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 items-start gap-2 p-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary">
            {member.name}
          </h3>
          <p className="mt-0.5 text-sm leading-snug text-gray-600">
            {member.designation}
          </p>
        </div>
        {hasCv && (
          <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-stone-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary" />
        )}
      </div>
    </Card>
  );

  // No profile PDF yet → render a static (non-clickable) card.
  if (!hasCv) {
    return card;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="block h-full w-full cursor-pointer rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {card}
        </button>
      </DialogTrigger>

      <DialogContent className="flex h-[90vh] w-[95vw] max-w-5xl flex-col gap-0 overflow-hidden border-none bg-white p-0 shadow-2xl sm:max-w-5xl">
        <div className="flex items-center gap-3 border-b border-stone-200 bg-stone-50 py-3 pl-4 pr-14">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-white shadow-sm">
            <Portrait member={member} sizes="44px" />
          </div>
          <div className="min-w-0 flex-1">
            <DialogTitle className="truncate text-sm font-bold text-gray-900">
              {member.name}
            </DialogTitle>
            <DialogDescription className="truncate text-xs font-medium text-primary">
              {member.designation}
            </DialogDescription>
          </div>
          <a
            href={member.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
          >
            Open <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <iframe
          src={member.cvUrl}
          title={`${member.name} — profile`}
          className="min-h-0 w-full flex-1 bg-stone-100"
        />
      </DialogContent>
    </Dialog>
  );
}
