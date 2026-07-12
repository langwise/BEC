import Link from "next/link";
import { Pin, ExternalLink } from "lucide-react";

import type { NewsAnnouncementsItem } from "@/data/home/news-announcements";
import { cn } from "@/lib/utils";

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

function hasLink(href: string) {
  return href !== "#" && href.trim() !== "";
}

function ItemRow({ item }: { item: NewsAnnouncementsItem }) {
  const external = isExternal(item.href);
  const linked = hasLink(item.href);

  const title = (
    <span className="text-[15px] md:text-base font-semibold leading-snug text-gray-800">
      {item.title}
      {external ? (
        <ExternalLink className="ml-1.5 inline h-3.5 w-3.5 -translate-y-px text-primary" />
      ) : null}
    </span>
  );

  return (
    <li
      className={cn(
        "border-b border-gray-100 py-5 last:border-b-0",
        item.pinned && "bg-orange-50/40 -mx-4 px-4 md:-mx-6 md:px-6",
      )}
    >
      <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {item.date}
      </div>
      <div className="flex items-start gap-2.5">
        {item.pinned ? (
          <Pin className="mt-1 h-4 w-4 shrink-0 rotate-[45deg] fill-green-600 text-green-600" />
        ) : null}
        {linked ? (
          <Link
            href={item.href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="transition-colors hover:text-primary"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </div>
    </li>
  );
}

export function NewsList({ items }: { items: NewsAnnouncementsItem[] }) {
  const pinned = items.filter((item) => item.pinned);
  const rest = items.filter((item) => !item.pinned);
  const ordered = [...pinned, ...rest];

  if (ordered.length === 0) {
    return (
      <p className="py-16 text-center text-sm font-medium text-muted-foreground">
        Nothing to show at the moment. Please check back soon.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-transparent">
      {ordered.map((item) => (
        <ItemRow key={item.id} item={item} />
      ))}
    </ul>
  );
}
