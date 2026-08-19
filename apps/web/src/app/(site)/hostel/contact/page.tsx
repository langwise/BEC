import { pageMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/animations/fade-in";
import { Phone, MapPin, UserCircle } from "lucide-react";

export const metadata = pageMetadata({
    title: "Hostel Contact & Wardens",
    description:
        "Contact BEC Bagalkote's hostel administration for admission inquiries — reach the Boys and Girls Hostel Deputy Chief Wardens and the Chief Warden at the Vidyagiri campus.",
    path: "/hostel/contact",
});

const contacts = [
    {
        role: "Deputy Chief Warden — Boys Hostel",
        name: "Dr. P. L. Timmanagoudar",
        phone: "+91 94486 93600",
    },
    {
        role: "Deputy Chief Warden — Girls Hostel",
        name: "Dr. Shobha R. Patil",
        phone: "+91 94495 34202",
    },
    {
        role: "Chief Warden",
        name: "Dr. B. R. Hiremath",
        detail: "Principal",
    },
];

export default function HostelContactPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Contact Information</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Get in touch with the hostel administration for admission inquiries and assistance.
                </p>
            </div>

            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent my-8" />

            <section className="grid md:grid-cols-2 gap-6">
                <FadeIn>
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 hover:shadow-md transition-shadow h-full">
                        <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            Warden&apos;s Office
                        </h2>
                        <div className="space-y-4">
                            {contacts.map((c) => (
                                <div key={c.role} className="p-4 bg-white rounded-xl flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 text-primary flex items-center justify-center shrink-0">
                                        <UserCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{c.role}</p>
                                        <p className="font-bold text-gray-900">{c.name}</p>
                                        {c.detail ? (
                                            <p className="text-sm text-gray-500">{c.detail}</p>
                                        ) : null}
                                        {c.phone ? (
                                            <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className="text-primary font-medium hover:underline">
                                                {c.phone}
                                            </a>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 hover:shadow-md transition-shadow h-full">
                        <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Address
                        </h2>
                        <div className="p-4 bg-white rounded-xl">
                            <p className="text-gray-700 leading-relaxed">
                                Basaveshwar Engineering College <br />
                                Vidyagiri, Bagalkote &ndash; 587 102<br />
                                Karnataka, India
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
}
