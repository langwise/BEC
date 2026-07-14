import { FadeIn } from "@/components/animations/fade-in";
import { LibraryBreadcrumb } from "@/components/library/library-breadcrumb";
import { LibraryPageHeader } from "@/components/library/library-page-header";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { StaffCard } from "@/components/library/staff-card";
import { Users } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Library Staff",
  description:
    "Meet the BEC Central Library team led by Librarian Dr. Shreekant G. Karkun, with assistant librarians Subhas C. Mahendrakar, Gurunath B. Goudar and Deepa M. Kolli.",
  path: "/library/staff",
});

export default function StaffProfilePage() {
  const staffMembers = [
    {
      name: "Dr. Shreekant G. Karkun",
      designation: "Librarian",
      employeeId: "NLB002",
      qualification: "B.Sc., M.L.I.Sc., Ph.D.",
      experience: "35 Years",
      email: "becshrikant@gmail.com",
      address: "“Gajanana” Near Old ESI Hospital, Muchakhandi Cross, Kaladagi Road, Bagalkote-587101",
      image: "facilities/library/staff/dr-shreekant-g-karkun.jpg",
      orcidId: "0000-0002-6584-3004",
      vidwanId: "65775",
      researcherId: "AAU-8025-2020",
      googleScholarId: "bFSOItoAAAAJ",
      responsibilities: "Library Management and Administration",
      researchInterest: "User Study, ICT Applications, Open Source Software’s, Research Metrics.",
      scholars: {
        pursuing: "01",
        awarded: "01"
      },
      patents: "-",
      grants: "-",
      publications: {
        journals: [
          "Use of e-resources by the faculty of Blde Medical College Library Vijayapur, Karnataka: A study, Journal of Library and Information Communication Technology, Vol:9 Issue:2 pp33-44 Article DOI : 10.5958/2456-9399.2020.00012.7",
          "RFID security system in libraries: An overview Journal of Library and Information Communication Technology, Vol:8 Issue:2 pp21-27, Article DOI : 10.5958/2456-9399.2019.00004.X",
          "OPEN ACCESS E-RESOURCES: A BOON FOR ACADEMIC EXCELLENCE, International Journal of Information Movement, Vol:2 Issue:9 pp1-4, ISSN: 2456-0553",
          "Resource Sharing and Library Networks: An Overview, South Indian Journal of Library & Information Sciences, 2016",
          "Mobile Technology: It Applications in Library and Information Services, South Indian Journal of Library & Information Sciences, 2016",
          "Utilization of e-journals and databases by research scholars of universities in Karnataka: A study, International Journal of Library and Information Studies vol:5 Issue:2, 2015, ISSN: 2231-4911",
          "Use of E journals and databases by the faculty and research scholars in the Universities of Karnataka a study, e-Library Science Research Journal, Vol:3 Issue:7, 2015, ISSN:2319-8435"
        ],
        conferences: [
          "A Study on ICT competence and attitude among Teaching Professional in government first grade colleges of Arisikeri Taluk in National Conference on: “Library in the life of user” Tumkur University, Tumkur, 2019",
          "Knowledge Management: It’s Influence on Academic Libraries in International Conference on Knowledge Resources and Library Technologies (ICKRELT), 2017",
          "Applications of Internet of Things in Library Services in 62nd ILA International Conference on “Gearing up for the future: Library initiatives for digital India\", pp447-487, 2017",
          "Cloud computing : Its Impact and Influence on Library Management and Services in 62nd ILA International Conference on “Gearing up for the future: Library initiatives for digital India\", pp509-517, 2017",
          "E-Resources : An Overview, in 62nd ILA International Conference on “Gearing up for the future: Library initiatives for digital India\", pp626-631, 2017",
          "Development of Smart Library in Digital Environment in 2 nd LPA International Conference on “IKOAL (Knowledge Organization in Academic Libraries)-2017” jointly organized by LPA & GOA University pp357-367, 2017",
          "Best Practices of Basaveshwar Science College Library, Bagalkote, 2 nd LPA International Conference on “IKOAL (Knowledge Organization in Academic Libraries)-2017” jointly organized by LPA & GOA University, 322-329, 2017",
          "Use of Infographics and Its Impact On Libraries in 2 nd LPA International Conference on “IKOAL (Knowledge Organization in Academic Libraries)-2017” jointly organized by LPA & GOA University, 215-221, 2017",
          "Use of ICT applications in Medical College libraries: A study in International conference on Managing library and information system in the Digital World: Challenges and Opportunities, pp462-467, 2015",
          "Building Electronic Information resources: Issues and Challenges in International conference on Emerging Technologies and Future of Libraries: Issues and Challenges, pp478-485, 2015",
          "Impact of cloud computing on libraries in International conference on Emerging Technologies and Future of Libraries: Issues and Challenges, PP150-157, 2015",
          "Resource sharing in e environment: A study of P.M.N.M Dental college and hospital library Bagalkote in International conference on Sustainability of Digital Libraries ICSDL, PP426-430, 2014",
          "Knowledge management: Challenges for librarians of Information Technology era in National conference on Empowering libraries for lifelong learning skills, 2012",
          "Information search pattern in the web based environment: A case study of JSS Medical College Mysore in National conference on Empowering libraries for lifelong learning skills, 2012",
          "Maheswarappa B S and Karkun S G. Information Gathering Habits of Biological and Physical Scientists in a University Environment: A Case Study of Karnatak University, Dharwad. In Knowledge Societies and Libraries (Prof AAN Raju Festschrift Volume) edited by N Laxman Rao, S Sudarshan Rao and T V Prafulla Chandra. New Delhi, Ess Ess, 2004. pp 38-73.",
          "Maheswarappa B S and Karkun S G. The Awareness and Usefulness of Information Services of INSDOC and NCSI, IISc, Bangalore among the Biological and Physical Scientists in a University Environment. IN: Dynamics of Librarianship edited and published by Department of Library and Information Science, Annamalai University, Annmalainagar, 1992, pp213- 220."
        ],
        invitedTalks: [
          "Basaveshwar Science College, Bagalkote",
          "BVVs Akkamahadevi Women’s College, Bagalkote",
          "PDA Engineering College, Gulbarga",
          "Basaveshwar Arts College, Bagalkote",
          "S R Kanthi Arts, Commerce, Science College, Mudhol",
          "BVVs Polytechnic Bagalkote",
          "BVVs College of Education, Bagalkote",
          "VTU, Belagavi",
          "KLS Gogte Engineering College, Belagavi",
          "Govt Polytechnic Bagalkote.",
          "BVVs Dental College, Bagalkote",
          "BLDEs Engineering College, Bagalkote",
          "Bhimanna Khandre Engineering College, Bhalki",
          "ASP College of Commerce, Vijayapura"
        ],
        workshops: [
          "Two days’ workshop on information Science digital libraries, 2004 Kuvempu University Shivamogga With the association of ASSIST.",
          "1 ½Workshop on E-learning Resources A P State SPFU with NPIU Noida, 2005 at Hyderabad.",
          "One week Workshop on Web page Design and Institutional Repository, NITTE Meenakshi Institute of Technology at Bangalore. 2006"
        ],
        awards: [
          "Most Dynamic Librarian Award for excellence and leadership in education by Golden AIMS New Delhi, 2020",
          "International Education Award 2020: Best Librarian Award for Life Time Achievements",
          "Best paper and presentation award in 2nd LPA International Conference on “IKOAL (Knowledge Organization in Academic Libraries)-2017” jointly organized by LPA & GOA University, 2017"
        ]
      },
      hasDetails: true
    },
    {
      name: "Subhas C. Mahendrakar",
      designation: "Assistant Librarian",
      employeeId: "NLB007",
      qualification: "B.Com, MLI.Sc, M.Phil",
      experience: "20 Years 6 Months",
      email: "subhas.mahendrakar@gmail.com",
      address: "#119C, Sector No:34 Navanagar Bagalkote",
      image: "facilities/library/staff/subhas-c-mahendrakar.JPG",
      vidwanId: "216125",
      responsibilities: "Digital Library, Library Automation.",
      researchInterest: "Library Automation",
      publications: {
        conferences: [
          "Web Learning: Opportunities and Challenges in National Conference on Inspiring Library Services from 12th-13th July 2013 ISBN: 978-81-926-304-10 Page No-71 to 76",
          "Library Security System in National Conference on Integrating ICT in Academic Libraries: Making a Difference in Knowledge Age from 12 & 13 August-2014 ISBN: 9788-19275-6912 Page No-353 to 355",
          "Knowledge Management in National Conference on Libraries and Librarianship in Transition: Challenges and Opportunities from 22 & 23 August -2014 ISBN: 978-81-929927-0-9 Page No-87 to 91"
        ],
        workshops: [
          "One day “Orientation Program to The Library And Information Science Professionals Of B.V.V.Sangha’s Institutions, Bagalkote”, 2014",
          "3 days International Conference on Knowledge Management and Organization in the Digital Era “ICKMODE” Sri Siddaganga Institute of Technology Tumkur, 2013",
          "One week Short Term Training program on “Trends in Information Communication Technology and It’s Impact on Engineering College Libraries” Basaveshwar Engineering College , Bagalkote Library and Information Centre 2009."
        ]
      },
      hasDetails: true
    },
    {
      name: "Gurunath B. Goudar",
      designation: "Assistant Librarian",
      employeeId: "NLB008",
      qualification: "B.A, MLI.Sc",
      experience: "13 Years 6 Months",
      email: "gurubgoudar@gmail.com",
      address: "Gurunath B Goudar C/o T H Bhavikatti # B-66 Navanagar, Bagalkote",
      image: "facilities/library/staff/gurunath-b-goudar.jpg",
      responsibilities: "Circulation Section",
      publications: {
        workshops: [
          "3 days “Faculty Development Program on Library Automation and e-Resources Management” in P.E.S. College of Engineering Mandya”, 2013.",
          "One day “Orientation Program to The Library And Information Science Professionals Of B.V.V.Sangha’s Institutions, Bagalkote”, 2014.",
          "Two days Orientation Program “Use of Information Technologies in Libraries” Of B.V.V.Sangha’s Institutions, Bagalkote, 2017."
        ]
      },
      hasDetails: true
    },
    {
      name: "Deepa M. Kolli",
      designation: "Assistant Librarian",
      employeeId: "NLB011",
      qualification: "BA, MLISC",
      experience: "5 Years",
      email: "Deeepur197@gmail.com",
      address: "Bagalkote (Contact: 7813091544)",
      image: "facilities/library/staff/deepa-m-kolli.jpg",
      responsibilities: "Book Banks and Journal Section",
      hasDetails: true
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <LibraryBreadcrumb
        items={[
          { label: "Campus" },
          { label: "Library", href: "/library" },
          { label: "Staff Profile" }
        ]}
      />

      <LibraryPageHeader
        icon={Users}
        title="Staff Profile"
        subtitle="Meet our dedicated team of library professionals"
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
                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    Our library team comprises highly qualified and experienced professionals dedicated to
                    providing excellent library services. Each member brings unique expertise and commitment
                    to supporting the academic and research needs of our community. Click on any staff member's
                    card to view their full professional profile, including administrative responsibilities, research
                    interests, and publications.
                  </p>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staffMembers.map((staff, index) => (
                  <StaffCard key={index} {...staff} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
