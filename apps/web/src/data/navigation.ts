import { NavigationItem } from "@/types/navigation";

export const navigationData: NavigationItem[] = [
  // 1. Institute (About Us)
  {
    title: "Institute",
    items: [
      { title: "About Sangha", href: "/institute/about-sangha" },
      { title: "About Us", href: "/institute/about" },
      { title: "Awards & Recognitions", href: "/institute/awards" },
      { title: "History & Milestones", href: "/institute/history" },
      {
        title: "Campus",
        items: [
          { title: "Infrastructure", href: "/institute/campus/infrastructure" },
          { title: "How To Reach", href: "/institute/campus/reach" },
          { title: "Working Hours", href: "/institute/campus/hours" },
          { title: "Campus Amenities", href: "/institute/campus/amenities" },
          { title: "Virtual Campus Tour", href: "/institute/campus/tour" },
        ],
      },
      { title: "Contact Us", href: "/institute/contact" },
      { title: "Institute Brochure", href: "/institute/brochure" },
      { title: "Institute Newsletter", href: "/institute/newsletter" },
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
          { title: "The Senate", href: "/administration/governing/senate" },
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
      { title: "Syllabus", href: "/programs/syllabus" },
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
      { title: "Curriculum", href: "/programs/curriculum" },
      { title: "Academic Calendar", href: "/programs/calendar" },
      { title: "Departments", href: "/programs/departments" },
      { title: "Convocation", href: "/programs/convocation" },
      { title: "Documents to Submit", href: "/programs/documents" },
      { title: "Scholarship Details", href: "/programs/scholarships" },
      { title: "Hostel Admissions", href: "/programs/hostel" },
    ],
  },

  // 4. Research (Commented out to remove from website navigation)
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
      { title: "Central Research Facility", href: "/facilities/research" },
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
      { title: "Students' Council", href: "/student-life/council" },
      { title: "Mindhog Club", href: "/student-life/mindhog" },
      { title: "Activities", href: "/student-life/activities" },
      { title: "NSS", href: "/student-life/nss" },
      { title: "NCC", href: "/student-life/ncc" },
      { title: "IEEE", href: "/student-life/ieee" },
      { title: "Sports and Games", href: "/student-life/sports" },
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
