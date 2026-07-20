"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { iconMap } from "./icons";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { cn } from "@/lib/utils";

import { ChevronDown, CheckCircle2, Sparkles, FileText } from "lucide-react";

type GroupItem = string | { label: string; value?: string; image?: string };

interface DataTable {
  title: string;
  columns: string[];
  rows: string[][];
  collapsed?: boolean;
}

interface ContentGroup {
  subtitle?: string;
  text?: string;
  items?: GroupItem[];
  images?: { src: string; alt: string }[];
  /** Render this group's images large (single column) instead of small tiles. */
  featureImages?: boolean;
  /** Render this group's images at a moderate bump (2 per row) instead of small tiles. */
  largeImages?: boolean;
  table?: DataTable;
}

interface ContentSectionProps {
  id?: string; // Added for potential scroll targets
  title?: string;
  content?: string;
  items?: string[];
  groups?: ContentGroup[];
  icon?: string;
  /** Justify the body paragraph and bullet items (used for the department Overview and relocated PEOs/PSOs). */
  justify?: boolean;
  /** Let the body span the full column width instead of the default readable max-width. */
  wide?: boolean;
}

function withOrdinalSuperscripts(text: string) {
  const parts = text.split(/(\d+)(st|nd|rd|th)\b/g);
  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i]);
    if (parts[i + 1] !== undefined)
      nodes.push(
        <span key={i}>
          {parts[i + 1]}
          <sup>{parts[i + 2]}</sup>
        </span>,
      );
  }
  return nodes;
}

function BulletList({ items, justify }: { items: GroupItem[]; justify?: boolean }) {
  // Structured entries (label + optional detail + optional image) render as a clean divided list —
  // primary line + muted secondary, organized in a responsive 2-column grid.
  const structured = items.some((it) => typeof it !== "string");

  if (structured) {
    return (
      <ul className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 not-prose w-full">
        {items.map((item, i) => {
          const obj = typeof item === "string" ? { label: item } : item;
          return (
            <li
              key={i}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-stone-200/80 bg-white px-3.5 py-2.5 transition-all hover:border-primary/40 hover:shadow-2xs",
                obj.image ? "items-start py-3" : "items-center"
              )}
            >
              {obj.image ? (
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-stone-100 border border-stone-200">
                  <Image src={obj.image} alt={obj.label} fill sizes="44px" className="object-cover object-top" />
                </div>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-stone-900 text-sm leading-snug">{obj.label}</p>
                {obj.value && (
                  obj.value.startsWith("http") || obj.value.includes(".pdf") ? (
                    <a
                      href={obj.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-orange-700 hover:underline mt-1"
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0 text-primary" />
                      <span>View Report / Document (PDF)</span>
                    </a>
                  ) : (
                    <p className="mt-0.5 text-xs text-stone-500 leading-relaxed whitespace-pre-line">{obj.value}</p>
                  )
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  const stringItems = items as string[];

  // If majority of items are short (e.g. Technical Areas Covered), render as a modern tech badge grid
  const shortCount = stringItems.filter((it) => typeof it === "string" && it.length < 65).length;
  const isBadgeGrid = shortCount >= 3 && shortCount / stringItems.length >= 0.7;

  if (isBadgeGrid) {
    return (
      <div className="mt-2.5 flex flex-wrap gap-2 not-prose w-full">
        {stringItems.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 rounded-lg border border-orange-200/70 bg-orange-50/50 px-3.5 py-1.5 text-xs font-semibold text-stone-800 hover:bg-orange-100/60 hover:border-orange-300 transition-all"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    );
  }

  // Render multi-item lists as a clean, compact 2-column grid with check icons
  return (
    <ul className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 not-prose w-full">
      {stringItems.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 rounded-lg border border-stone-200/70 bg-stone-50/40 px-3.5 py-2.5 transition-all hover:bg-white hover:border-primary/30 hover:shadow-2xs"
        >
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span className={cn("text-xs md:text-sm font-medium text-stone-700 leading-relaxed", justify ? "text-justify" : "")}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function DataGrid({ table, framed = true }: { table: DataTable; framed?: boolean }) {
  return (
    <div
      className={
        framed
          ? "overflow-x-auto rounded-md border border-stone-200 bg-white shadow-sm"
          : "overflow-x-auto border-t border-stone-200"
      }
    >
      <table className="min-w-full divide-y divide-stone-200 text-sm">
        <thead className="bg-primary/5">
          <tr>
            {table.columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="min-w-[160px] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-primary"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 bg-white">
          {table.rows.map((row, rowIndex) => (
            <tr key={`${table.title}-${rowIndex}`} className="align-top">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${table.title}-${rowIndex}-${cellIndex}`}
                  className="min-w-[180px] px-4 py-3 leading-relaxed text-stone-700 first:font-medium first:text-gray-900 whitespace-pre-line"
                >
                  {cell || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
      {title && (
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
      )}

      <div className={`prose prose-lg prose-orange text-gray-600 leading-relaxed ${wide ? "max-w-none" : "w-full max-w-none"}`}>
        {content && content.split(/\r?\n\r?\n/).map((para, idx) => (
          <p key={idx} className={`mb-6 last:mb-0 ${justify ? "text-justify" : ""}`}>
            {para}
          </p>
        ))}
        {items && items.length > 0 && <BulletList items={items} justify={justify} />}
      </div>
      {groups && groups.length > 0 && (
        <div className="mt-6 space-y-6">
          {groups.map((group, i) => {
            if (group.subtitle === "Vision") {
              const visionText = group.text || (typeof group.items?.[0] === "string" ? group.items[0] : group.items?.[0]?.label);
              return (
                <div key={i} className="my-4">
                  <div className="rounded-2xl border border-orange-200/90 bg-gradient-to-br from-orange-50/90 via-amber-50/40 to-white p-6 md:p-7 shadow-2xs">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-wider uppercase mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span>Vision</span>
                    </div>
                    <p className="text-base md:text-lg font-medium text-stone-800 leading-relaxed italic">
                      &ldquo;{visionText}&rdquo;
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div key={i}>
                <div className={wide ? "max-w-none" : "w-full max-w-none"}>
                  {group.subtitle && (
                    <h3 className="text-base font-semibold tracking-wide text-secondary mb-1">
                      {group.subtitle}
                    </h3>
                  )}
                  {group.text && <p className="text-gray-600 leading-relaxed text-justify">{withOrdinalSuperscripts(group.text)}</p>}
                  {group.items && group.items.length > 0 && <BulletList items={group.items} justify={justify} />}
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
                {group.table && (
                  <div className="mt-4">
                    {group.table.collapsed ? (
                      <details className="group/table rounded-md border border-stone-200 bg-white shadow-sm">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-base font-semibold text-primary hover:bg-primary/5">
                          <span>{group.table.title}</span>
                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open/table:rotate-180" />
                        </summary>
                        <DataGrid table={group.table} framed={false} />
                      </details>
                    ) : (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-primary">{group.table.title}</h4>
                        <DataGrid table={group.table} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
