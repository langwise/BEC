import { NavigationItem } from "@/types/navigation";

export const navigationData: NavigationItem[] = [
  {
    title: "Institute",
    items: [
      { title: "About Us", href: "/institute/about" },
      { title: "Awards & Recognitions", href: "/institute/awards" },
      {
        title: "History",
        items: [
          { title: "Former Principals", href: "/institute/history/principals" },
          { title: "Former Directors", href: "/institute/history/directors" },
          { title: "Milestones", href: "/institute/history/milestones" },
        ],
      },
      {
        title: "Campus",
        items: [
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

  {
    title: "Academics",
    items: [
      { title: "Academic Office", href: "/academics/office" },
      {
        title: "Programmes",
        items: [
          { title: "Under Graduate/BE", href: "/academics/programmes/ug" },
          { title: "Post Graduate/M.Tech", href: "/academics/programmes/pg" },
          { title: "MBA", href: "/academics/programmes/mba" },
          { title: "MCA", href: "/academics/programmes/mca" },
          { title: "M.Sc.(Engg.)/Ph.D", href: "/academics/programmes/phd" },
        ],
      },
      { title: "Curriculum", href: "/academics/curriculum" },
      { title: "Academic Calendar", href: "/academics/calendar" },
      { title: "Departments", href: "/academics/departments" },
      { title: "Convocation", href: "/academics/convocation" },
    ],
  },

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
        items: [
          { title: "2022-2023", href: "/research/scopus/2022-2023" },
          { title: "2021-2022", href: "/research/scopus/2021-2022" },
          { title: "2020-2021", href: "/research/scopus/2020-2021" },
          { title: "2019-2020", href: "/research/scopus/2019-2020" },
          { title: "2018-2019", href: "/research/scopus/2018-2019" },
          { title: "2017-2018", href: "/research/scopus/2017-2018" },
        ],
      },
    ],
  },

  {
    title: "Student Life",
    items: [
      { title: "Overview", href: "/student-life/overview" },
      { title: "Hostels", href: "/student-life/hostels" },
      { title: "Students' Council", href: "/student-life/council" },
      { title: "Activities", href: "/student-life/activities" },
      { title: "NSS", href: "/student-life/nss" },
      { title: "NCC", href: "/student-life/ncc" },
      { title: "Sports and Games", href: "/student-life/sports" },
      {
        title: "Anti Ragging",
        items: [
          { title: "Info", href: "/student-life/anti-ragging/info" },
          { title: "Contact", href: "/student-life/anti-ragging/contact" },
        ],
      },
      { title: "Alumni", href: "/student-life/alumni" },
      { title: "Achievements", href: "/student-life/achievements" },
    ],
  },

  // {
  //   title: "Alumni",
  //   items: [
  //     { title: "Notable Alumni", href: "/alumni/notable" },
  //     { title: "Alumni Startups", href: "/alumni/startups" },
  //   ],
  // },

  {
    title: "Placements",
    items: [
      { title: "Home", href: "/placements" },
      {
        title: "Placement Policy",
        href: "/placements/policy", // PDF route (or direct PDF if needed)
      },
      { title: "Facilities", href: "/placements/facilities" },
      {
        title: "Placement Process & Calendar",
        href: "/placements/process-calendar",
      },
      {
        title: "Brochure",
        href: "/placements/brochure", // modal can be handled at page level
      },
      { title: "Our Recruiters", href: "/placements/recruiters" },
      { title: "Why Recruit", href: "/placements/why-recruit" },
      { title: "MoUs", href: "/placements/mous" },
      {
        title: "Contact Us",
        href: "/placements/contact", // modal / page
      },
    ],
  },
];
