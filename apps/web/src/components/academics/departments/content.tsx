"use client";

import { motion } from "motion/react";
import { iconMap } from "./icons";

interface ContentGroup {
  subtitle?: string;
  text?: string;
  items?: string[];
}

interface ContentSectionProps {
  id?: string; // Added for potential scroll targets
  title: string;
  content?: string;
  items?: string[];
  groups?: ContentGroup[];
  icon?: string;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 list-none pl-0">
      {items.map((item, i) => (
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

      <div className="prose prose-lg prose-orange max-w-none text-gray-600 leading-relaxed">
        {content && <p>{content}</p>}
        {items && items.length > 0 && <BulletList items={items} />}
        {groups && groups.length > 0 && (
          <div className="not-prose mt-6 space-y-6">
            {groups.map((group, i) => (
              <div key={i}>
                {group.subtitle && (
                  <h3 className="text-base font-semibold uppercase tracking-wide text-secondary mb-1">
                    {group.subtitle}
                  </h3>
                )}
                {group.text && <p className="text-gray-600 leading-relaxed">{group.text}</p>}
                {group.items && group.items.length > 0 && <BulletList items={group.items} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
