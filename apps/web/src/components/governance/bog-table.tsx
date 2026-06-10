import { BogMember, BogCategory } from "@/content/governance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const bogCategoryLabels: Record<BogMember["category"], string> = {
  chair: "Chairman",
  sangha: "B.V.V. Sangha",
  nominee: "Nominee",
  industry: "Industry",
  academia: "Academia",
  faculty: "Faculty",
  invitee: "Invitee",
  government: "Government",
  "member-secretary": "Member Secretary",
  students: "Students",
};

// Distinct, muted accent per category so the table reads at a glance without photos.
const categoryStyles: Record<BogCategory, { pill: string; dot: string; avatar: string }> = {
  chair: { pill: "bg-orange-50 text-orange-700 ring-orange-600/20", dot: "bg-orange-500", avatar: "bg-orange-100 text-orange-700" },
  "member-secretary": { pill: "bg-rose-50 text-rose-700 ring-rose-600/20", dot: "bg-rose-500", avatar: "bg-rose-100 text-rose-700" },
  sangha: { pill: "bg-amber-50 text-amber-700 ring-amber-600/20", dot: "bg-amber-500", avatar: "bg-amber-100 text-amber-700" },
  nominee: { pill: "bg-sky-50 text-sky-700 ring-sky-600/20", dot: "bg-sky-500", avatar: "bg-sky-100 text-sky-700" },
  industry: { pill: "bg-violet-50 text-violet-700 ring-violet-600/20", dot: "bg-violet-500", avatar: "bg-violet-100 text-violet-700" },
  academia: { pill: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", dot: "bg-emerald-500", avatar: "bg-emerald-100 text-emerald-700" },
  faculty: { pill: "bg-teal-50 text-teal-700 ring-teal-600/20", dot: "bg-teal-500", avatar: "bg-teal-100 text-teal-700" },
  government: { pill: "bg-slate-100 text-slate-700 ring-slate-600/20", dot: "bg-slate-500", avatar: "bg-slate-200 text-slate-700" },
  invitee: { pill: "bg-stone-100 text-stone-600 ring-stone-500/20", dot: "bg-stone-400", avatar: "bg-stone-200 text-stone-600" },
  students: { pill: "bg-indigo-50 text-indigo-700 ring-indigo-600/20", dot: "bg-indigo-500", avatar: "bg-indigo-100 text-indigo-700" },
};

function initials(name: string): string {
  // Drop honorifics, then take the first letters of the remaining name words.
  const cleaned = name.replace(/\b(Prof|Dr|Sri|Smt|Mr|Mrs|Ms)\.?\b/gi, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((p) => p[0]).join("");
  return (letters || name.slice(0, 2)).toUpperCase();
}

function CategoryPill({ category }: { category: BogCategory }) {
  const style = categoryStyles[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        style.pill,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
      {bogCategoryLabels[category]}
    </span>
  );
}

function Avatar({ name, category }: { name: string; category: BogCategory }) {
  return (
    <span
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        categoryStyles[category].avatar,
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

export function BogTable({ members }: { members: BogMember[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      {/* Desktop / tablet: full table */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow className="border-stone-200 bg-stone-50/80 hover:bg-stone-50/80">
              <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Member
              </TableHead>
              <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Affiliation
              </TableHead>
              <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Role
              </TableHead>
              <TableHead className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Category
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member.name}
                className="border-stone-100 transition-colors hover:bg-stone-50/60"
              >
                <TableCell className="px-5 py-4 whitespace-normal">
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} category={member.category} />
                    <span className="font-medium text-gray-900">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4 whitespace-normal text-sm text-gray-600">
                  {member.affiliation}
                </TableCell>
                <TableCell className="px-5 py-4 whitespace-normal text-sm text-gray-700">
                  {member.role}
                </TableCell>
                <TableCell className="px-5 py-4 text-right">
                  <CategoryPill category={member.category} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: stacked cards keep the same data readable on narrow screens */}
      <ul className="divide-y divide-stone-100 sm:hidden">
        {members.map((member) => (
          <li key={member.name} className="p-4">
            <div className="flex items-start gap-3">
              <Avatar name={member.name} category={member.category} />
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-600">{member.affiliation}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-medium text-gray-500">{member.role}</span>
                  <CategoryPill category={member.category} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
