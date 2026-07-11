"use client";

import { Mail, Phone, User } from "lucide-react";
import { iconMap } from "./icons";

interface ContactPerson {
  name?: string;
  designation?: string;
  phone?: string;
  email?: string;
}

interface ContactSectionProps {
  title: string;
  icon?: string;
  people: ContactPerson[];
}

function ContactCard({ person }: { person: ContactPerson }) {
  return (
    <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary">
          <User className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          {person.name && (
            <h3 className="text-lg font-bold leading-snug text-gray-900">{person.name}</h3>
          )}
          {person.designation && (
            <p className="mt-0.5 text-sm font-medium text-gray-500">{person.designation}</p>
          )}
        </div>
      </div>

      {(person.phone || person.email) && (
        <div className="mt-5 space-y-2 border-t border-stone-100 pt-4">
          {person.phone && (
            <a
              href={`tel:${person.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 text-sm text-gray-600 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="truncate">{person.phone}</span>
            </a>
          )}
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="flex items-center gap-3 text-sm text-gray-600 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="truncate">{person.email}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContactSection({ title, icon, people }: ContactSectionProps) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <div className="mb-12 scroll-mt-28">
      <div className="mb-6 flex items-center gap-4">
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 shadow-sm">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">{title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {people.map((person, i) => (
          <ContactCard key={i} person={person} />
        ))}
      </div>
    </div>
  );
}
