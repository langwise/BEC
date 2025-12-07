import { BogMember } from "@/data/governance/bog-members";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export function BogGrid({ members }: { members: BogMember[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <Card key={member.name} className="rounded-sm border-stone-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {member.name}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-sm bg-primary text-white">{member.role}</Badge>
              <Badge variant="outline" className="rounded-sm text-xs">
                {bogCategoryLabels[member.category]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 leading-relaxed">
            {member.affiliation}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
