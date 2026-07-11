import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import {
  Users,
  Info,
  Building,
  Zap,
  CheckCircle2,
  LayoutDashboard,
} from "lucide-react";

export const metadata = pageMetadata({
  title: "Hostel Facilities & Administration",
  description:
    "BEC Bagalkote offers boys' and girls' hostels managed by the B.V.V. Sangha Student Welfare & Hostel Committee, with vegetarian mess, RO water, gym, internet and 24x7 CCTV.",
  path: "/academics/hostel",
});
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function HostelPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
          About Hostel
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed text-justify">
          Basaveshwar Engineering College (Autonomous), Bagalkote provides
          excellent hostel facilities for boys and girls with a focus on student
          welfare, safety, and a conducive atmosphere for learning.
        </p>
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

      <section className="space-y-6">
        <div className="flex items-center gap-3 text-primary mb-4">
          <Info className="w-6 h-6" />
          <h2 className="text-xl font-bold">Management & Administration</h2>
        </div>

        <FadeIn>
          <div className="bg-orange-50/50 rounded-2xl p-8 border border-orange-100 space-y-6">
            <p className="text-gray-700 leading-relaxed text-justify">
              The hostels of B.V.V. Sangha are managed by a committee set up by
              the Sangha in the name of{" "}
              <strong>Student Welfare and Hostel Committee (SWC)</strong>{" "}
              consisting of 12 members.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Committee Chairman
                </h3>
                <p className="text-gray-700 font-medium bg-white px-4 py-2 rounded-lg border border-orange-100 shadow-xs inline-block">
                  Shri. Kumar Hiremath
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4 text-primary" />
                  Chief Warden
                </h3>
                <p className="text-gray-700 font-medium bg-white px-4 py-2 rounded-lg border border-orange-100 shadow-xs inline-block">
                  Dr. B. R. Hiremath, Principal
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-orange-100/50">
              <h3 className="font-bold text-gray-900">Key Members</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Shri. Virupakshappa S. Koti, Shri Chandrashekar B. Badali, Shri
                Vishwanath V. Palled, Shri Shashidhar V. Goudar, Shri Kumar S.
                Jigalur, Shri Sangamesh M. Guddad, Shri Basavaraj C. Kengapur,
                Shri Channayya P. Balulmath, Shri Prabhu B. Nara, Shri Anand S.
                Sasanur and Shri Manohar M. Navalagi.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

      {/* Facilities Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-primary mb-4">
          <Zap className="w-6 h-6" />
          <h2 className="text-xl font-bold">Facilities Available</h2>
        </div>
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Pure Vegetarian Mess",
              "RO Filter Water",
              "Solar Water Heater",
              "Wood Boiler",
              "Internet Point",
              "Guest room",
              "Generator",
              "Electric Boiler",
              "Hot water",
              "Volley ball ground",
              "Indoor sports (Table Tennis, Badminton, Carom, Chess etc.)",
			  "CC TV Camera",
            ].map((facility, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-100 shadow-xs hover:border-orange-100 hover:shadow-sm transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-gray-700">
                  {facility}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

      {/* Occupancy Details Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-primary mb-4">
          <LayoutDashboard className="w-6 h-6" />
          <h2 className="text-xl font-bold">Hostel Occupancy Details</h2>
        </div>
        <FadeIn delay={0.2}>
          <Card className="bg-white border-stone-200 shadow-sm overflow-hidden text-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-orange-50/50 hover:bg-orange-50/50">
                  <TableHead className="w-[100px] font-bold text-primary border-b border-orange-100 hidden md:table-cell">
                    Sl. No.
                  </TableHead>
                  <TableHead className="font-bold text-primary border-b border-orange-100">
                    Hostel Name
                  </TableHead>
                  <TableHead className="font-bold text-primary border-b border-orange-100">
                    Utility
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    id: 1,
                    name: "Sir M. Visvesavaraya Block",
                    utility: "Boys Hostel (Senior students)",
                  },
                  {
                    id: 2,
                    name: "Netaji Block",
                    utility: "Boys Hostel (First year students)",
                  },
                  { id: 3, name: "Malaprabha hostel", utility: "Girls" },
                  {
                    id: 4,
                    name: "PG Boys hostel",
                    utility: "PG and Research students",
                  },
                ].map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-orange-50/30 transition-colors border-b border-stone-100 last:border-0"
                  >
                    <TableCell className="font-medium text-gray-500 hidden md:table-cell">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {item.utility}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </FadeIn>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

      <section>
        <div className="flex items-center gap-3 text-primary mb-6">
          <Building className="w-6 h-6" />
          <h2 className="text-xl font-bold">Hostel Wardens</h2>
        </div>
        <FadeIn delay={0.1}>
          <div className="space-y-6">
            <div className="p-4 border border-stone-100 rounded-xl bg-stone-50/50 hover:bg-white hover:shadow-md transition-all md:max-w-sm">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                Deputy Chief Warden
              </p>
              <p className="text-lg font-bold text-gray-900">
                Dr. P. L. Timmanagoudar
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Shri B. R. Endigeri",
                "Shri. B. M. Vyas",
                "Dr. Mahabaleshwar S. K.",
                "Dr. A. V. Sutagundar",
                "Shri Vivekanand B. S.",
                "Dr. Shobha Patil",
                "Smt. Sunita Tambakad",
                "Smt. Sudha S. K",
                "Dr. Manjula A. Sutagundar",
                "Smt. Vijaylaxmi S. Patil",
              ].map((warden) => (
                <div
                  key={warden}
                  className="p-4 border border-stone-100 rounded-xl bg-stone-50/50 hover:bg-white hover:shadow-md transition-all"
                >
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                    Warden
                  </p>
                  <p className="font-bold text-gray-800">{warden}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
