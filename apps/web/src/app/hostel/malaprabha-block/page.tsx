import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { Building2, Users, Zap, CheckCircle2, ImageIcon } from "lucide-react";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset } from "@/lib/assets";

export const metadata = pageMetadata({
    title: "Malaprabha Ladies Hostel",
    description:
        "Malaprabha Ladies Hostel at BEC Bagalkote, started in 1998, houses up to 1000 girl students across 374 rooms with vegetarian mess, reading room, solar hot water and CCTV.",
    path: "/hostel/malaprabha-block",
});

const galleryImages = [
    ...[
        "cine0540.webp",
        "cine0547.webp",
        "cine0562.webp",
        "cine0593.webp",
        "cine0513.webp",
        "cine0509.webp",
        "cine0495.webp",
    ].map((file, index) => ({
        src: asset(`facilities/hostels/girls/${file}`),
        alt: `Malaprabha Ladies Hostel at Basaveshwar Engineering College ${index + 1}`,
    })),
    {
        src: asset("facilities/hostels/girls/wardens.webp"),
        alt: "Wardens of the Malaprabha Ladies Hostel at Basaveshwar Engineering College",
        caption: "Hostel wardens",
    },
    {
        src: asset("facilities/hostels/girls/manager.webp"),
        alt: "Managers of the Malaprabha Ladies Hostel at Basaveshwar Engineering College",
        caption: "Hostel managers",
    },
];

const committeeMembers = [
    { sl: 1, name: "Shri B. C. Kengapur", designation: "Committee Chairman" },
    { sl: 2, name: "Dr. B. R. Hiremath, Principal", designation: "Chief Warden" },
    { sl: 3, name: "Dr. Shobha R. Patil", designation: "Deputy Chief Warden" },
    { sl: 4, name: "Smt. Sunita Tambakad", designation: "Warden" },
    { sl: 5, name: "Smt. Sudha K. S.", designation: "Warden" },
    { sl: 6, name: "Dr. Manjula Sutagundar", designation: "Warden" },
    { sl: 7, name: "Smt. Vijayalaxmi Patil", designation: "Warden" },
];

export default function MalaprabhaBlockPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Malaprabha Ladies Hostel</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Girls Hostel
                </p>
            </div>

            <FadeIn>
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-stone-200 shadow-xs sm:aspect-2/1">
                    <Image
                        src={asset("facilities/hostels/girls/malaprabha-hostel.webp")}
                        alt="Malaprabha Ladies Hostel at Basaveshwar Engineering College"
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
                        <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                            The hostel was started in the year <strong>1998</strong> to accommodate the students of Basaveshwar Engineering College Bagalkote. The hostel is well equipped with all requisite facilities to cater to the needs of all Girl students. The total number of rooms available in the hostel are 374 with a total capacity of 1000 students.
                        </p>

                        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-stone-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-primary rounded-lg">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Capacity</p>
                                    <p className="font-bold text-gray-900">1000 Students</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-primary rounded-lg">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Rooms</p>
                                    <p className="font-bold text-gray-900">374 Rooms</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-4">
                    <Users className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Hostel Committee &amp; Wardens</h2>
                </div>
                <FadeIn delay={0.1}>
                    <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-xs bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-orange-50/50 text-primary font-semibold border-b border-stone-100">
                                    <tr>
                                        <th className="px-6 py-4 w-16 text-center hidden md:table-cell">
                                            Sl. No.
                                        </th>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4 text-right">Designation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100">
                                    {committeeMembers.map((member) => (
                                        <tr
                                            key={member.sl}
                                            className="hover:bg-orange-50/30 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-center font-medium text-gray-500 hidden md:table-cell">
                                                {member.sl}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {member.name}
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-600 border-l border-dashed border-stone-100">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                    {member.designation}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                            "Reading Room",
                            "Solar Water Heater",
                            "TV",
                            "Internet Point",
                            "Guest room",
                            "Generator",
                            "Hot water",
                            "Volley ball ground",
                            "Indoor sports (Table Tennis, Badminton, Carom, Chess etc.)",
                            "CC TV Camera",
                        ].map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-100 shadow-xs hover:border-orange-100 hover:shadow-sm transition-all">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm font-medium text-gray-700">{facility}</span>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </section>

            {galleryImages.length > 0 && (
                <>
                    <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 text-primary mb-4">
                            <ImageIcon className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Inside the Hostel</h2>
                        </div>
                        <FadeIn delay={0.1}>
                            <PhotoGallery images={galleryImages} />
                        </FadeIn>
                    </section>
                </>
            )}
        </div>
    );
}
