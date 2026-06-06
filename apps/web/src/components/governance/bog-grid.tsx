import { BogMember } from "@/content/governance";
import { PersonCard, PersonGrid } from "@/components/common/person-card";

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
    <PersonGrid>
      {members.map((member) => {
        const categoryLabel = bogCategoryLabels[member.category];
        return (
          <PersonCard
            key={member.name}
            photo={member.photo}
            name={member.name}
            description={member.affiliation}
            badges={[
              { label: member.role, tone: "primary" },
              // Only show the category when it adds information beyond the role.
              ...(categoryLabel !== member.role
                ? [{ label: categoryLabel, tone: "outline" as const }]
                : []),
            ]}
          />
        );
      })}
    </PersonGrid>
  );
}
