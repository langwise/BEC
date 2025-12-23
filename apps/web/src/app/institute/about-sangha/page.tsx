import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSanghaPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50 py-14 md:py-18">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
               Institute
            </p>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            About B.V.V. Sangha
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl leading-relaxed">
            A century of selfless service and educational excellence, upholding social values and the philosophy of "Work is Worship".
          </p>
        </div>
      </section>

      <section className="py-14 md:py-18 container mx-auto max-w-6xl px-4 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6 text-base text-gray-700 leading-relaxed text-justify">
            <p>
              <span className="font-semibold text-gray-900">Basaveshwar Veerashaiva Vidya Vardhak Sangha (B. V. V. Sangha)</span>,
              Bagalkot is situated in the northern part of Karnataka. Established in 1906 by his Holiness
              <span className="font-semibold text-gray-900"> Gurubasav Swamiji of Bilur</span>, the Sangha started with a Sanskrit
              pathashala and is now a leading educational organization running more than <span className="font-semibold text-gray-900">120 institutes</span> and
              various campuses spread over more than 600 acres in 4 districts.
            </p>
            <p>
              The Sangha has been serving the poor, the underprivileged, and needy people of this area for more than a century,
              upholding social, human, and ethical values with emphasis on <span className="italic font-medium text-primary">"WORK IS WORSHIP"</span> — the basic philosophy of Lord Basaveshwar.
              It stands distinct in Southern India for its high-order selfless service and efforts to provide quality modern education to all sections of society.
            </p>
            <p>
              Prominent colleges cover domains such as Arts, Science, Commerce, Law, Engineering & Technology, Dental, Medicine, Management, Education, HR Training, Sports, and Vocational trades.
              Most institutions are recognized and accredited by organizations of national and international repute.
            </p>
             <h3 className="text-xl font-semibold text-gray-900 mt-8">Growth & Expansion</h3>
            <p>
              Around <span className="font-semibold text-gray-900">50,000 students</span> are learning under the supervision and support of nearly
              <span className="font-semibold text-gray-900"> 5,000 well-qualified dedicated staff members</span>.
              There are 24 boys and girls hostels accommodating thousands of students with state-of-the-art facilities.
            </p>
            <p>
              A new phase of growth began two decades ago with the launch of job-oriented Diploma, paramedical courses, and community colleges.
              The Sangha has since forged ahead, opening new institutes annually. Courses range from vocational trades like vehicle driving and tailoring
              to professional courses like medical and engineering, research centers, management studies, and Open University study centers.
            </p>
             <div className="rounded-sm bg-stone-50 border border-stone-200 p-5 my-6">
                <p className="mb-2 font-medium text-gray-900">International Collaboration</p>
                <p className="text-sm">
                  The Sangha has activities including a Memorandum of Understanding (MoU) with Sagina Valley State University (SVSU), USA for faculty and student exchange programs.
                </p>
            </div>
             <p>
              Besides education, the Sangha serves society through cultural Melas, literary conferences (Kannada Sahitya Sammelana, Sharana Sahitya Sammelana), and sports events.
              Underprivileged sections are served through the Science and Technology Entrepreneurship Park (STEP), and rural development initiatives like RDF and SETI.
            </p>
            <p>
               In recognition of the services rendered by BEC-STEP, Former President of India <span className="font-semibold text-gray-900">Sri A. P. J. Abdul Kalam</span> awarded it the BEST STEP in the country.
            </p>
          </div>

          <div className="space-y-6">
             <Card className="rounded-sm border-stone-200 shadow-sm">
              <CardContent className="pt-6 space-y-4">
                 <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">1906</p>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Year Established</p>
                 </div>
                 <div className="w-full h-px bg-stone-100"/>
                 <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">120+</p>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Institutes</p>
                 </div>
                 <div className="w-full h-px bg-stone-100"/>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">50k+</p>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Students</p>
                 </div>
                 <div className="w-full h-px bg-stone-100"/>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary">600+</p>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Acres Campus</p>
                 </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm border-stone-200 shadow-sm bg-stone-50/50">
                <CardContent className="pt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Institutions List</h4>
                    <p className="text-sm text-gray-600 mb-4">
                        Download the full list of institutions run by Shri Basaveshwar Vidya Vardhak Sangha.
                    </p>
                     <a
                        href="https://www.becbgk.edu/Documents/others/Institute_list.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline hover:underline-offset-4"
                      >
                        Download PDF ↗
                      </a>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
