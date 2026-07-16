import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Building2, Users, Zap, CheckCircle2, ImageIcon, Phone } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset } from "@/lib/assets";

const galleryImages = [
    { key: "entrance", caption: "Block entrance", alt: "Sir M. Visvesavaraya Block hostel entrance" },
    { key: "room-study", caption: "Students in their room", alt: "Students studying in a Sir M. Visvesavaraya Block hostel room" },
    { key: "room", caption: "Hostel room", alt: "Four-bed room in the Sir M. Visvesavaraya Block hostel" },
].map(({ key, caption, alt }) => ({
    src: asset(`facilities/hostels/v-block/${key}.webp`),
    alt: `${alt} at Basaveshwar Engineering College`,
    caption,
}));

export const metadata = pageMetadata({
    title: "Sir M. Visvesavaraya Block",
    description:
        "Sir M. Visvesavaraya Block at BEC Bagalkote, started in 1968 for senior boys, offers 128 rooms for 384 students with vegetarian mess, library, gym and computer centre.",
    path: "/hostel/v-block",
});

export default function VBlockPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Sir M. Visvesavaraya Block</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Boys Hostel (Senior Students)
                </p>
            </div>

            <FadeIn>
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-stone-200 shadow-xs sm:aspect-2/1">
                    <Image
                        src={asset("facilities/hostels/netaji-block/building.webp")}
                        alt="Sir M. Visvesavaraya Block boys hostel at Basaveshwar Engineering College"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                    />
                </div>
            </FadeIn>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <Building2 className="w-6 h-6" />
                    <h2 className="text-xl font-bold">About the Block</h2>
                </div>

                <FadeIn>
                    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            The Visvesavaraya hostel was started in the year <strong>1968</strong> to accommodate boys of Basaveshwar Engineering College Bagalkote. The hostel has grown many folds and is equipped with all facilities since from its inception. The total number of rooms in the hostel is 128 with a total capacity of 384.
                        </p>
                        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-stone-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-primary rounded-lg">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Capacity</p>
                                    <p className="font-bold text-gray-900">384 Students</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-primary rounded-lg">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Rooms</p>
                                    <p className="font-bold text-gray-900">128 Rooms</p>
                                </div>
                            </div>
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
                            "Pure Vegetarian Mess", "Library", "Computer centre with Internet",
                            "TV", "Multi Gym", "Guest room",
                            "Generator", "Laundry", "Hot water",
                            "Volley ball ground", "Indoor sports (Table Tennis, Badminton, Carom, Chess etc.)"
                        ].map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-100 shadow-xs hover:border-orange-100 hover:shadow-sm transition-all">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm font-medium text-gray-700">{facility}</span>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </section>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <ImageIcon className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Inside the Block</h2>
                </div>
                <FadeIn delay={0.1}>
                    <PhotoGallery images={galleryImages} />
                </FadeIn>
            </section>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <Building2 className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Faculty in Charge</h2>
                </div>
                <FadeIn delay={0.2}>
                    <Card className="bg-white border-stone-200 shadow-sm overflow-hidden text-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-orange-50/50 hover:bg-orange-50/50">
                                    <TableHead className="font-bold text-primary border-b border-orange-100">
                                        Designation
                                    </TableHead>
                                    <TableHead className="font-bold text-primary border-b border-orange-100">
                                        Name
                                    </TableHead>
                                    <TableHead className="font-bold text-primary border-b border-orange-100">
                                        Mobile
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { role: "Chief Warden", name: "Dr. B.R Hiremath", phone: null },
                                    { role: "Deputy Chief Warden", name: "Dr. P. L. Timmanagoudar", phone: "+91 94486 93600" },
                                    { role: "Warden", name: "Prof. B. S. Vivekananda", phone: "+91 94802 34598" },
                                    { role: "Warden", name: "Prof. B. R. Endigeri", phone: "+91 98456 57310" },
                                ].map((faculty) => (
                                    <TableRow
                                        key={faculty.name}
                                        className="hover:bg-orange-50/30 transition-colors border-b border-stone-100 last:border-0"
                                    >
                                        <TableCell className="font-semibold text-gray-900">
                                            {faculty.role}
                                        </TableCell>
                                        <TableCell className="text-gray-700">
                                            {faculty.name}
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {faculty.phone ? (
                                                <a
                                                    href={`tel:${faculty.phone.replace(/[^+\d]/g, "")}`}
                                                    className="inline-flex items-center gap-1.5 text-primary hover:underline"
                                                >
                                                    <Phone className="w-3.5 h-3.5" />
                                                    {faculty.phone}
                                                </a>
                                            ) : (
                                                "—"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </FadeIn>
            </section>
        </div>
    );
}
