import { PageHero } from "@/components/common/page-hero";
import { NewsList } from "@/components/news/news-list";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { newsData } from "@/data/home/news-announcements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "News & Updates",
  description:
    "Latest news and recent updates from Basaveshwar Engineering College, Bagalkote — events, activities, competitions, seminars and achievements across departments.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <main className="bg-background text-foreground">
      <BreadcrumbsJsonLd items={[{ name: "News & Updates", path: "/news" }]} />
      <PageHero
        eyebrow="Campus"
        title="News & Updates"
        description="Recent events, activities, competitions, seminars and achievements from across Basaveshwar Engineering College, Bagalkote."
      />
      <section className="container mx-auto max-w-4xl px-4 lg:px-6 py-14 md:py-18">
        <NewsList items={newsData} />
      </section>
    </main>
  );
}
