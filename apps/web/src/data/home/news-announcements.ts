export interface NewsAnnouncementsItem {
  id: number;
  date: string;
  title: string;
  pinned?: boolean;
  href: string;
}

export const newsData: NewsAnnouncementsItem[] = [
  {
    id: 1,
    date: "JUN 12, 2026",
    title: "Best oral presentation award to Dr. Bharati S. Meti at the International Conference on Biotechnology.",
    href: "/news/biotech-award",
  },
  {
    id: 2,
    date: "JUN 10, 2026",
    title: "Prof. Shankar Kambalimath nominated as a member of the State Level Technical Advisory Committee.",
    href: "/news/advisory-nomination",
  },
  {
    id: 3,
    date: "JUN 08, 2026",
    title: "BEC Bagalkote enters into a strategic MoU with leading tech giants for AI/ML Research & Incubation.",
    pinned: true,
    href: "/news/ai-ml-mou",
  },
  {
    id: 4,
    date: "MAY 28, 2026",
    title: "BEC sports team wins first place at the VTU State Level Athletic Meet 2026.",
    href: "/news/vtu-sports-first-place",
  },
  {
    id: 5,
    date: "MAY 15, 2026",
    title: "Dr. Veeranna C. Charantimath, Chairman, B.V.V. Sangha, inaugurates the newly constructed PG Block & Library Extension.",
    pinned: true,
    href: "/news/pg-block-inauguration",
  },
  {
    id: 6,
    date: "MAY 10, 2026",
    title: "BEC Bagalkote secures a 4-star rating from the Institution's Innovation Council (IIC) for 2025-26 activities.",
    href: "/news/iic-rating-2026",
  },
  {
    id: 7,
    date: "APR 28, 2026",
    title: "National Conference on Sustainable Energy Systems to be hosted by EEE Department in July.",
    href: "/news/eee-conference",
  },
  {
    id: 8,
    date: "APR 15, 2026",
    title: "BEC Alumni Association organizes global virtual meet with over 1500+ participants.",
    href: "/news/alumni-global-meet",
  }
];

export const announcementsData: NewsAnnouncementsItem[] = [
  {
    id: 1,
    date: "JUN 15, 2026",
    title: "Admissions open for BE / B.Tech programmes for the academic year 2026-27 under Management Quota.",
    pinned: true,
    href: "/academics/programmes/ug",
  },
  {
    id: 2,
    date: "JUN 14, 2026",
    title: "Walk-in-interview for Recruitment of Temporary Faculty in ECE, CSE, ISE and Civil Departments.",
    pinned: true,
    href: "/administration/governance#recruitment",
  },
  {
    id: 3,
    date: "JUN 12, 2026",
    title: "Circular regarding Semester End Examination (SEE) registration and fees payment for Even Semester.",
    href: "/academics/examinations",
  },
  {
    id: 4,
    date: "JUN 08, 2026",
    title: "Applications invited for Junior Research Fellow (JRF) position in ISRO-sponsored research project in Biotechnology.",
    href: "/research#jrf-biotech",
  },
  {
    id: 5,
    date: "JUN 05, 2026",
    title: "Notification regarding the postponement of VTU Theory Examinations scheduled on June 18, 2026.",
    href: "/academics/examinations#postponement",
  },
  {
    id: 6,
    date: "JUN 01, 2026",
    title: "Hostel Admission process, application forms and hostel fee structure for the academic year 2026-27.",
    href: "/academics/hostel",
  },
  {
    id: 7,
    date: "MAY 25, 2026",
    title: "Circular: Schedule for first-year syllabus feedback and academic audit committee visit.",
    href: "/academics/first-year",
  },
  {
    id: 8,
    date: "MAY 20, 2026",
    title: "Advertisement for the post of Project Assistant in Civil Engineering Department (Geotechnical Lab).",
    href: "/administration/governance#project-assistant",
  }
];
