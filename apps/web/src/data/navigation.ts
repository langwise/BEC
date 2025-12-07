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
      { title: "Overview", href: "/research/overview" },
      { title: "Research Areas", href: "/research/areas" },
      { title: "Centres", href: "/research/centres" },
      { title: "Sponsored Research", href: "/research/sponsored" },
      { title: "PhD Scheme", href: "/research/phd-scheme" },
      { title: "Publications", href: "/research/publications" },
      { title: "Research Facility", href: "/research/facility" },
      { title: "Institutional Relations", href: "/research/relations" },
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

  {
    title: "Alumni",
    items: [
      { title: "Notable Alumni", href: "/alumni/notable" },
      { title: "Alumni Startups", href: "/alumni/startups" },
    ],
  },
];
