import { PlacementsSidebar } from "@/components/placements/placements-sidebar";

export default function PlacementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-orange-50 via-white to-slate-50">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <PlacementsSidebar />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
