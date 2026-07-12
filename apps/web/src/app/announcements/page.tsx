import { PageHero } from "@/components/common/page-hero";
import { NewsList } from "@/components/news/news-list";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { announcementsData } from "@/data/home/news-announcements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Announcements",
  description:
    "Official announcements and flash news from Basaveshwar Engineering College, Bagalkote — admissions, examination results, open days and institutional notices.",
  path: "/announcements",
});

export default function AnnouncementsPage() {
  return (
    <main className="bg-background text-foreground">
      <BreadcrumbsJsonLd
        items={[{ name: "Announcements", path: "/announcements" }]}
      />
      <PageHero
        eyebrow="Notices"
        title="Announcements"
        description="Official announcements and flash news — admissions, examination results, open days and institutional notices from Basaveshwar Engineering College, Bagalkote."
      />
      <section className="container mx-auto max-w-4xl px-4 lg:px-6 py-14 md:py-18">
        <NewsList items={announcementsData} />
      </section>
    </main>
  );
}
