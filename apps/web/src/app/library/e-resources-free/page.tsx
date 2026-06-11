import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { ResourceCard } from "@/components/library/resource-card";
import { Globe } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Library Free E-Resources",
  description:
    "Open-access e-resources curated by BEC Library: patent databases, information gateways, e-theses, MIT OpenCourseWare, NDLI and institutional repositories.",
  path: "/library/e-resources-free",
});

export default function EResourcesFreePage() {
  // Free / open-access e-resources as listed on becbgk.edu/Library (e-resources free).
  const freeResources = [
    // Patents
    { name: "Free Patents Online", description: "Multi-country patent search.", url: "https://www.freepatentsonline.com/search.html", category: "Patents", type: "free" as const },
    { name: "US Patents (USPTO)", description: "United States Patent and Trademark Office.", url: "https://www.uspto.gov/", category: "Patents", type: "free" as const },
    { name: "European Patent Office", description: "European patent search.", url: "https://www.epo.org/", category: "Patents", type: "free" as const },
    { name: "Indian Patent Office", description: "Office of the Controller General of Patents, India.", url: "https://ipindia.gov.in/", category: "Patents", type: "free" as const },
    // Information gateways
    { name: "InfoMine", description: "Scholarly internet resource collections.", url: "http://infomine.ucr.edu/", category: "Information Gateways", type: "free" as const },
    { name: "Internet Public Library", description: "Curated reference and subject resources.", url: "https://www.ipl.org/", category: "Information Gateways", type: "free" as const },
    { name: "Sakshat", description: "MHRD one-stop education portal.", url: "https://sakshat.ac.in/", category: "Information Gateways", type: "free" as const },
    { name: "EnviroLink", description: "Environmental resources network.", url: "http://www.envirolink.org/", category: "Information Gateways", type: "free" as const },
    { name: "WorldWideScience", description: "Global science gateway searching national databases.", url: "http://worldwidescience.org/", category: "Information Gateways", type: "free" as const },
    { name: "TechXtra", description: "Engineering, mathematics and computing resources.", url: "http://www.techxtra.ac.uk/", category: "Information Gateways", type: "free" as const },
    // Subject resources
    { name: "Internet Directory of Botany", description: "Index of botany resources on the web.", url: "http://www.botany.net/IDB/", category: "Subject Resources", type: "free" as const },
    { name: "Ecology WWW Page", description: "Ecology resources directory.", url: "http://www.people.fas.harvard.edu/~brach/Ecology-WWW.html", category: "Subject Resources", type: "free" as const },
    { name: "English Literature on the Web", description: "Curated English-literature resources.", url: "https://www.lang.nagoya-u.ac.jp/matsuoka/EngLit.html", category: "Subject Resources", type: "free" as const },
    { name: "Biology Browser", description: "Free life-sciences resources.", url: "http://www.biologybrowser.org/", category: "Subject Resources", type: "free" as const },
    // E-theses and dissertations
    { name: "NDLTD", description: "Networked Digital Library of Theses and Dissertations.", url: "http://www.ndltd.org/", category: "E-Theses", type: "free" as const },
    { name: "Open Access Theses and Dissertations", description: "Index of open-access ETDs worldwide.", url: "https://oatd.org/", category: "E-Theses", type: "free" as const },
    { name: "Vidyanidhi", description: "Indian digital library of theses and dissertations.", url: "https://www.vidyanidhi.org.in/", category: "E-Theses", type: "free" as const },
    { name: "MGU PhD Theses Archive", description: "Mahatma Gandhi University theses repository.", url: "http://www.mgutheses.org/", category: "E-Theses", type: "free" as const },
    // Open courseware
    { name: "MIT OpenCourseWare", description: "Free lecture notes, exams and videos from MIT courses.", url: "https://ocw.mit.edu/", category: "Open Courseware", type: "free" as const },
    { name: "Academic Earth", description: "Free online college courses.", url: "https://academicearth.org/", category: "Open Courseware", type: "free" as const },
    { name: "JHSPH OpenCourseWare", description: "Johns Hopkins public-health courseware.", url: "https://ocw.jhsph.edu/", category: "Open Courseware", type: "free" as const },
    { name: "Academia.edu", description: "Platform for sharing academic research papers.", url: "https://www.academia.edu/", category: "Open Courseware", type: "free" as const },
    // Repositories
    { name: "National Digital Library of India", description: "Educational content across disciplines (IIT Kharagpur).", url: "https://ndl.iitkgp.ac.in/", category: "Repositories", type: "free" as const },
    { name: "VTU E-Content", description: "Visvesvaraya Technological University e-content (NPTEL).", url: "http://nptel.vtu.ac.in/econtent", category: "Repositories", type: "free" as const },
    { name: "Vidya Mitra", description: "INFLIBNET integrated e-content portal.", url: "https://vidyamitra.inflibnet.ac.in/", category: "Repositories", type: "free" as const },
    { name: "OpenDOAR", description: "Directory of Open Access Repositories.", url: "https://v2.sherpa.ac.uk/opendoar/", category: "Repositories", type: "free" as const },
    { name: "IISc Bangalore ePrints", description: "Indian Institute of Science research repository.", url: "http://eprints.iisc.ac.in/", category: "Repositories", type: "free" as const },
    { name: "IIT Bombay (DSpace)", description: "IIT Bombay institutional repository.", url: "http://dspace.library.iitb.ac.in/jspui/", category: "Repositories", type: "free" as const },
    { name: "IIT Delhi ePrints", description: "IIT Delhi institutional repository.", url: "http://eprint.iitd.ac.in/dspace/", category: "Repositories", type: "free" as const },
    { name: "ISI Bangalore (DSpace)", description: "Indian Statistical Institute repository.", url: "http://library.isibang.ac.in:8080/dspace/", category: "Repositories", type: "free" as const },
    { name: "IIM Kozhikode (DSpace)", description: "IIM Kozhikode institutional repository.", url: "http://dspace.iimk.ac.in/xmlui/", category: "Repositories", type: "free" as const },
  ];

  return (
    <div className="min-h-screen bg-stone-50">


      <LibraryBreadcrumb
        items={[
          { label: "Campus" },
          { label: "Library", href: "/library" },
          { label: "E-Resources (Free)" }
        ]}
      />

      <LibraryPageHeader
        icon={Globe}
        title="E-Resources (Free)"
        subtitle="Discover free online resources and open-access materials"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <LibrarySidebar />
            </div>

            <div className="lg:col-span-3">
              <FadeIn delay={0.1}>
                <div className="bg-white rounded-lg p-8 mb-8 border border-stone-200">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Explore our curated collection of free online resources, open-access journals, and educational
                    platforms. These resources are freely accessible to everyone and provide valuable learning materials
                    across various disciplines.
                  </p>
                  <div className="bg-orange-50 border-l-4 border-primary p-4 rounded-r">
                    <p className="text-sm text-gray-700">
                      <strong>Open Access:</strong> All resources listed here are freely accessible without any
                      subscription. However, some platforms may require free registration.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {freeResources.map((resource, index) => (
                  <ResourceCard key={index} {...resource} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}