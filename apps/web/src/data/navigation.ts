import { NavigationItem } from "@/types/navigation";
import { departmentCategories, departmentHref } from "@/data/departments-catalog";

export const navigationData: NavigationItem[] = [
  // 1. Institute (About Us)
  {
    title: "Institute",
    items: [
      { title: "About Sangha", href: "/institute/about-sangha" },
      { title: "About Us", href: "/institute/about" },
      { title: "History & Milestones", href: "/institute/history" },
      {
        title: "Accreditation & Quality",
        items: [
          { title: "Overview", href: "/accreditation" },
          { title: "NAAC", href: "/accreditation/naac" },
          { title: "NBA", href: "/accreditation/nba" },
          { title: "NIRF Rankings", href: "/accreditation/nirf" },
          { title: "IQAC", href: "/accreditation/iqac" },
          { title: "VTU Affiliation", href: "/accreditation/vtu" },
          { title: "TEQIP", href: "/accreditation/teqip" },
        ],
      },
      {
        title: "Cells & Centres",
        items: [
          { title: "Overview", href: "/institute/cells" },
          { title: "Innovation Council (IIC)", href: "/institute/cells/iic" },
          { title: "Innovation & Entrepreneurship Policy", href: "/institute/cells/iep" },
          { title: "Industry Partnership (IIPC)", href: "/institute/cells/iipc" },
          { title: "NAIN Incubation", href: "/institute/cells/nain" },
          { title: "BEC-STEP", href: "/institute/cells/step" },
          { title: "BEC-CED", href: "/institute/cells/ced" },
        ],
      },
      {
        title: "Campus",
        items: [
          { title: "Infrastructure", href: "/institute/campus/infrastructure" },
          { title: "Campus Amenities", href: "/facilities/amenities" },
        ],
      },
      { title: "Contact Us", href: "/institute/contact" },
      { title: "Institute Brochure", href: "/institute/brochure" },
      { title: "Gallery", href: "/institute/gallery" },
    ],
  },

  // 2. Administration (Governance)
  {
    title: "Administration",
    items: [
      { title: "Governance Overview", href: "/administration/governance" },
      { title: "Organizational Chart", href: "/administration/governance#org-chart" },
      {
        title: "Governing Bodies",
        items: [
          {
            title: "Board of Governors",
            href: "/administration/governance#bog",
          },
        ],
      },
      { title: "Chairperson", href: "/administration/chairperson" },
      { title: "Director", href: "/administration/director" },
      { title: "Principal", href: "/administration/principal" },
      { title: "Deans", href: "/administration/governance#deans" },
      { title: "Heads of Departments", href: "/administration/governance#hods" },
      {
        title: "Public Disclosures",
        items: [{ title: "RTI", href: "/administration/disclosures/rti" }],
      },
    ],
  },

  // 3. Programs (Programmes)
  {
    title: "Programs",
    items: [
      { title: "Examinations", href: "/programs/examinations" },
      { title: "Academic Office", href: "/programs/office" },
      { title: "First-Year Syllabus", href: "/programs/first-year" },
      {
        title: "Programmes",
        items: [
          { title: "Under Graduate/BE", href: "/programs/programmes/ug" },
          { title: "Post Graduate/M.Tech", href: "/programs/programmes/pg" },
          { title: "MBA", href: "/programs/programmes/mba" },
          { title: "MCA", href: "/programs/programmes/mca" },
          { title: "M.Sc.(Engg.)/Ph.D", href: "/programs/programmes/phd" },
        ],
      },
      { title: "Documents to Submit", href: "/programs/documents" },
      { title: "Scholarship Details", href: "/programs/scholarships" },
      { title: "Hostel Admissions", href: "/programs/hostel" },
    ],
  },

  // 4. Departments (top-level — UG, PG and Science & Humanities)
  {
    title: "Departments",
    items: departmentCategories.map((category) => ({
      title: category.navLabel,
      items: category.departments.map((dept) => ({
        title: dept.name,
        href: departmentHref(category.key, dept.slug),
      })),
    })),
  },

  // 5. Research (Commented out to remove from website navigation)
  /*
  {
    title: "Research",
    items: [
      { title: "About Research", href: "/research/about" },
      {
        title: "Research Centres",
        items: [
          { title: "Biotechnology", href: "/research/centres/biotech" },
          { title: "Civil Engg.", href: "/research/centres/civil" },
          { title: "Computer Science", href: "/research/centres/cs" },
          { title: "Electronics & Comm.", href: "/research/centres/ec" },
          { title: "Electrical & Electronics", href: "/research/centres/ee" },
          { title: "Industrial & Production", href: "/research/centres/ip" },
          { title: "Information Science", href: "/research/centres/is" },
          { title: "Mechanical", href: "/research/centres/mechanical" },
          { title: "Physics", href: "/research/centres/physics" },
          { title: "MBA", href: "/research/centres/mba" },
        ],
      },
      {
        title: "Lab's with Industries",
        items: [
          { title: "Bosch Rexroth", href: "/research/labs/bosch" },
          { title: "MEMS Design", href: "/research/labs/mems" },
          { title: "Nokia", href: "/research/labs/nokia" },
          { title: "SCADA Lab", href: "/research/labs/scada" },
          { title: "Renewable Energy", href: "/research/labs/renewable" },
          { title: "Intel Intelligent Lab", href: "/research/labs/intel" },
          { title: "Materials Lab", href: "/research/labs/materials" },
          { title: "Multimedia Lab", href: "/research/labs/multimedia" },
          { title: "Bio-diesel", href: "/research/labs/biodiesel" },
        ],
      },
      {
        title: "Centres of Excellence",
        href: "/research/centres-of-excellence",
      },
      { title: "Patents", href: "/research/patents" },
      { title: "Sponsored Research", href: "/research/sponsored" },
      { title: "BEC Guidelines", href: "/research/guidelines" },
      { title: "Research Policy", href: "/research/policy" },
      {
        title: "Research Committees",
        items: [
          {
            title: "Advisory Committee",
            href: "/research/committees/advisory",
          },
          { title: "Ethics Committee", href: "/research/committees/ethics" },
          { title: "Review Committee", href: "/research/committees/review" },
        ],
      },
      {
        title: "Scopus Publications",
        href: "/research/scopus",
      },
    ],
  },
  */

  // 5. Facilities (Infrastructure)
  {
    title: "Facilities",
    items: [
      { title: "Library", href: "/facilities/library" },
      { title: "Research", href: "/facilities/research" },
      { title: "Guest House", href: "/facilities/guesthouse" },
      { title: "Campus Amenities", href: "/facilities/amenities" },
      {
        title: "Grievances",
        items: [
          { title: "PwD", href: "/facilities/grievances/pwd" },
          { title: "SC/ST", href: "/facilities/grievances/scst" },
          { title: "OBC", href: "/facilities/grievances/obc" },
          {
            title: "Internal Complaints",
            href: "/facilities/grievances/internal",
          },
        ],
      },
    ],
  },

  // 6. Placements
  {
    title: "Placements",
    href: "/placements",
  },

  // 7. Student Life
  {
    title: "Student Life",
    items: [
      { title: "Overview", href: "/student-life/overview" },
      { title: "Hostels", href: "/student-life/hostels" },
      { title: "Mindhog Club", href: "/student-life/mindhog" },
      { title: "Activities", href: "/student-life/activities" },
      { title: "Symposia Archive", href: "/student-life/symposia" },
      { title: "Sports & Gymkhana", href: "/student-life/gymkhana" },
      { title: "IEEE", href: "/student-life/ieee" },
      { title: "NSS", href: "/student-life/nss" },
      {
        title: "Anti Ragging",
        items: [
          { title: "Info", href: "/student-life/anti-ragging/info" },
          { title: "Contact", href: "/student-life/anti-ragging/contact" },
        ],
      },
      { title: "Alumni", href: "/student-life/alumni" },
      { title: "BEC-FM Radio", href: "/student-life/bec-fm" },
      { title: "Achievements", href: "/student-life/achievements" },
    ],
  },
];
