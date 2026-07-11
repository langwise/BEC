import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DepartmentLayout } from "@/components/academics/departments/department-layout";
import { getDepartmentData } from "@/data/department/department";
import { getDepartmentContent } from "@/content/departments";
import { departmentCategories } from "@/data/departments-catalog";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbsJsonLd, ProgramJsonLd } from "@/components/seo/jsonld";

function clampDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trim();
}

export function generateStaticParams() {
  return departmentCategories.flatMap((category) =>
    category.departments.map((dept) => ({
      type: category.key,
      slug: dept.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}): Promise<Metadata> {
  const { type, slug } = await params;
  const dept = getDepartmentContent(slug, type);
  if (!dept) return {};

  const description = clampDescription(
    dept.overview ??
      dept.tagline ??
      `${dept.name} at Basaveshwar Engineering College, Bagalkote.`,
  );

  return pageMetadata({
    title: dept.name,
    description,
    path: `/departments/${type}/${slug}`,
  });
}

// ⭐ SERVER COMPONENT (NO "use client")
export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;

  if (!getDepartmentContent(slug, type)) {
    notFound();
  }

  const dept = getDepartmentData(type, slug);
  const content = getDepartmentContent(slug, type);
  const credential =
    type === "pg" ? "M.Tech" : type === "ug" ? "B.E." : undefined;

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50 relative">
      <BreadcrumbsJsonLd
        items={[
          { name: "Departments", path: "/departments" },
          { name: dept.name, path: `/departments/${type}/${slug}` },
        ]}
      />
      <ProgramJsonLd
        name={dept.name}
        description={content?.overview ?? dept.tagline}
        path={`/departments/${type}/${slug}`}
        credential={credential}
      />
      {/* Background Decorations */}
      {/* <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div> */}

      {dept.heroImage ? (
        <section className="relative w-full overflow-hidden border-b border-stone-200 bg-stone-900">
          <div className="relative h-[300px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
            <Image
              src={dept.heroImage.src}
              alt={dept.heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_38%]"
            />
            {/* Legibility scrims — dark base, lightening upward and to the right */}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto max-w-6xl px-4 lg:px-6 pb-8 md:pb-12">
                <div className="max-w-3xl space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white text-balance [text-shadow:0_2px_18px_rgba(0,0,0,0.65)]">
                    {dept.name}
                  </h1>
                  <p className="text-base md:text-lg leading-relaxed text-white/90 max-w-2xl [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
                    {dept.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50 py-14 md:py-18">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
          </div>

          <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
            <div className="mt-4 space-y-4 lg:w-fit">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 text-balance lg:whitespace-nowrap">
                {dept.name}
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-gray-700 lg:whitespace-nowrap text-right">
                {dept.tagline}
              </p>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        {/* Client Layout for Tabs */}
        <DepartmentLayout dept={dept} />
      </div>
    </div>
  );
}
