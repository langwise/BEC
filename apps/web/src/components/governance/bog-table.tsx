import { BogMember } from "@/content/governance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

function initials(name: string): string {
  // Drop honorifics, then take the first letters of the remaining name words.
  const cleaned = name.replace(/\b(Prof|Dr|Sri|Smt|Mr|Mrs|Ms)\.?\b/gi, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((p) => p[0]).join("");
  return (letters || name.slice(0, 2)).toUpperCase();
}

function Avatar({ name }: { name: string }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

export function BogTable({ members }: { members: BogMember[] }) {
  return (
    <div className="overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm">
      {/* Desktop / tablet: full table */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow className="border-stone-200 bg-primary/5 hover:bg-primary/5">
              <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Member
              </TableHead>
              <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Affiliation
              </TableHead>
              <TableHead className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-primary">
                Role
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
                    <Avatar name={member.name} />
                    <span className="font-medium text-gray-900">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4 whitespace-normal text-sm text-gray-600">
                  {member.affiliation}
                </TableCell>
                <TableCell className="px-5 py-4 text-right text-sm font-medium text-gray-700">
                  {member.role}
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
              <Avatar name={member.name} />
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-600">{member.affiliation}</p>
                <p className="pt-1 text-xs font-medium text-primary">{member.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
