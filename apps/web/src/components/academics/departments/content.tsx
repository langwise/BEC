"use client";

import { motion } from "motion/react";
import { iconMap } from "./icons";
import { PhotoGallery } from "@/components/common/photo-gallery";

type GroupItem = string | { label: string; value?: string };

interface ContentGroup {
  subtitle?: string;
  text?: string;
  items?: GroupItem[];
  images?: { src: string; alt: string }[];
  /** Render this group's images large (single column) instead of small tiles. */
  featureImages?: boolean;
  /** Render this group's images at a moderate bump (2 per row) instead of small tiles. */
  largeImages?: boolean;
}

interface ContentSectionProps {
  id?: string; // Added for potential scroll targets
  title: string;
  content?: string;
  items?: string[];
  groups?: ContentGroup[];
  icon?: string;
  /** Justify the body paragraph (used for the department Overview). */
  justify?: boolean;
  /** Let the body span the full column width instead of the default readable max-width. */
  wide?: boolean;
}

function BulletList({ items }: { items: GroupItem[] }) {
  // Structured entries (label + optional detail) render as a clean divided list —
  // primary line + muted secondary, never "label — value" crammed into one string.
  const structured = items.some((it) => typeof it !== "string");

  if (structured) {
    return (
      <ul className="mt-3 divide-y divide-stone-100 overflow-hidden rounded-xl border border-stone-200 bg-white not-prose">
        {items.map((item, i) => {
          const obj = typeof item === "string" ? { label: item } : item;
          return (
            <li key={i} className="px-4 py-3">
              <p className="font-medium text-gray-900 leading-snug">{obj.label}</p>
              {obj.value && (
                <p className="mt-0.5 text-sm text-gray-500 leading-relaxed">{obj.value}</p>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="mt-3 space-y-2 list-none pl-0">
      {(items as string[]).map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ContentSection({
  id,
  title,
  content,
  items,
  groups,
  icon,
  justify,
  wide,
}: ContentSectionProps) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <motion.div
      id={id}
      className="mb-12 scroll-mt-28"
    >
      <div className="flex items-center gap-4 mb-4">
        {Icon && (
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100 shadow-sm">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
      </div>

      <div className={`prose prose-lg prose-orange text-gray-600 leading-relaxed ${wide ? "max-w-none" : "max-w-3xl"}`}>
        {content && content.split(/\r?\n\r?\n/).map((para, idx) => (
          <p key={idx} className={`mb-6 last:mb-0 ${justify ? "text-justify" : ""}`}>
            {para}
          </p>
        ))}
        {items && items.length > 0 && <BulletList items={items} />}
      </div>
      {groups && groups.length > 0 && (
        <div className="mt-6 space-y-6">
          {groups.map((group, i) => (
            <div key={i}>
              <div className={wide ? "max-w-none" : "max-w-3xl"}>
                {group.subtitle && (
                  <h3 className="text-base font-semibold uppercase tracking-wide text-secondary mb-1">
                    {group.subtitle}
                  </h3>
                )}
                {group.text && <p className="text-gray-600 leading-relaxed text-justify">{group.text}</p>}
                {group.items && group.items.length > 0 && <BulletList items={group.items} />}
              </div>
              {group.images && group.images.length > 0 && (
                <PhotoGallery
                  images={group.images}
                  centered={!group.featureImages}
                  feature={group.featureImages}
                  large={group.largeImages}
                  className="mt-4"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
