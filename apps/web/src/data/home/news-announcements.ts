export interface NewsAnnouncementsItem {
  id: number;
  date: string;
  title: string;
  pinned?: boolean;
  href: string;
}

const RESULTS_PORTAL = "http://119.161.97.238:8080/Autonomous/";

export const newsData: NewsAnnouncementsItem[] = [
  {
    id: 1,
    date: "JUN 12, 2026",
    title:
      "IEEE Power and Energy Society (PES) organized “Ethnic and Cultural Activity”",
    href: "#",
  },
  {
    id: 2,
    date: "JUN 05, 2026",
    title:
      "Institute Innovation Council with Civil Engineering organized “Tips & Tricks for Productive Research”",
    href: "#",
  },
  {
    id: 3,
    date: "MAY 25, 2026",
    title:
      "KEA UGCET Seat Allotment Manthana 2026 programme conducted at our institution (25.05.2026 to 30.05.2026)",
    href: "#",
  },
  {
    id: 4,
    date: "MAY 23, 2026",
    title: "Department of ECS conducted CIRCUTECH 2026",
    href: "#",
  },
  {
    id: 5,
    date: "MAY 22, 2026",
    title:
      "IEEE Power and Energy Society (PES) organized Tech-Talk on Power System Hardware Simulator",
    href: "#",
  },
  {
    id: 6,
    date: "MAY 16, 2026",
    title: "BEC Creative Spectrum presents Colosseum-26 (16–17 May 2026)",
    href: "#",
  },
  {
    id: 7,
    date: "MAY 13, 2026",
    title:
      "Institution’s Innovation Council 8.0 & EDC with Department of Management Studies organized Business Plan Competition – 2026",
    href: "#",
  },
  {
    id: 8,
    date: "MAY 04, 2026",
    title:
      "IEEE Power and Energy Society (PES) organized Alumni Seminar on “Abroad Education in Germany”",
    href: "#",
  },
  {
    id: 9,
    date: "APR 30, 2026",
    title:
      "BEC Cricket Team secured runners-up position in the VTU Kalaburagi Division Cricket Tournament",
    href: "#",
  },
  {
    id: 10,
    date: "APR 21, 2026",
    title:
      "Department of AIML with Association of Intelligence Minds (AIM) organized TECHTRONIX 2.0 – The Ultimate Tech Fest (21 & 22 April 2026)",
    href: "#",
  },
  {
    id: 11,
    date: "MAR 13, 2026",
    title:
      "WAVE 3.0 National Level Hackathon conducted at our institution (13–14 March 2026)",
    href: "#",
  },
];

export const announcementsData: NewsAnnouncementsItem[] = [
  {
    id: 1,
    date: "A.Y. 2026–27",
    title: "Admissions open now for A.Y. 2026–27",
    pinned: true,
    href: "/admissions",
  },
  {
    id: 2,
    date: "JUL 13, 2026",
    title:
      "Six-day Students Development Programme on “Quant Edge: Skills for Success” (13.07.2026 to 18.07.2026)",
    pinned: true,
    href: "#",
  },
  {
    id: 3,
    date: "JUN 20, 2026",
    title:
      "Open Day at Basaveshwar Engineering College, Bagalkot (20th June 2026)",
    href: "#",
  },
  {
    id: 4,
    date: "2025–26 EVEN SEM",
    title:
      "Results Announced: BE VI Regular SEE and Reregistered & Reappear Examinations",
    href: RESULTS_PORTAL,
  },
  {
    id: 5,
    date: "2025–26 EVEN SEM",
    title:
      "Results Announced: BE VIII Regular Semester and Reregistered & Reappear courses SEE Examinations",
    href: RESULTS_PORTAL,
  },
];
