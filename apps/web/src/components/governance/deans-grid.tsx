import { Person } from "@/content/governance";
import {
  PersonBadge,
  PersonCard,
  PersonGrid,
} from "@/components/common/person-card";

export function DeansGrid({ deans }: { deans: Person[] }) {
  return (
    <PersonGrid>
      {deans.map((dean) => {
        const badges: PersonBadge[] = [];
        // Show the role as a badge only when the name is the card title,
        // otherwise the title already is the role.
        if (dean.name) {
          if (dean.roleBadges?.length) {
            for (const b of dean.roleBadges)
              badges.push({ label: b.label, tone: "primary", link: b.link });
          } else {
            badges.push({ label: dean.role, tone: "primary" });
          }
        }
        if (dean.placeholder)
          badges.push({ label: "To be updated", tone: "outline" });

        return (
          <PersonCard
            key={dean.role}
            photo={dean.photo}
            name={dean.name || dean.role}
            description={dean.focus}
            email={dean.email}
            link={dean.link}
            badges={badges}
          />
        );
      })}
    </PersonGrid>
  );
}
