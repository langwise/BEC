import { FacultyProfile } from "@/types/faculty";

// Define the supported section types
export type DepartmentSection =
  | { id?: string; type: "content"; title: string; content: string; icon?: string }
  | { id?: string; type: "faculty-list"; title: string; faculty: FacultyProfile[] }
  | { id?: string; type: "stats"; title: string; stats: { label: string; value: string; icon?: string }[] }
  | { id?: string; type: "gallery"; title: string; images: { src: string; alt: string }[] };

export interface DepartmentData {
  name: string;
  tagline: string;

  // We can keep these strictly typed for the "Overview" section which is common
  // Or we could move them into the sections array too. 
  // For now, let's keep them as "default" sections that always appear at the top,
  // and 'sections' will be appended after.
  overview: { title: string; content: string; icon: string };
  vision: { title: string; content: string; icon: string };
  mission: { title: string; content: string; icon: string };

  highlights: string[];
  
  sidebar: { id: string; label: string; icon: string }[];

  // Dynamic sections
  sections?: DepartmentSection[];
}

const defaultSidebar = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About Department", icon: "graduation-cap" },
  { id: "faculty", label: "Teaching Faculty", icon: "users" },
  { id: "staff", label: "Supporting Staff", icon: "users-round" },
  { id: "timetable", label: "Time Table", icon: "calendar" },
  { id: "syllabus", label: "Scheme & Syllabus", icon: "file-text" },
  { id: "infrastructure", label: "Infrastructure", icon: "building-2" },
  { id: "board", label: "Board of Studies", icon: "clipboard" },
];

import { dummyFaculty } from "@/data/department/dummy-data";

const placeholderData: DepartmentData = {
  name: "",
  tagline: "Excellence in Education & Innovation",

  overview: {
    title: "Overview",
    content:
      "This is placeholder department overview content. Later this will be pulled dynamically based on the slug.",
    icon: "book",
  },

  vision: {
    title: "Vision",
    content:
      "Placeholder vision statement. When real content is provided, this block updates automatically.",
    icon: "eye",
  },

  mission: {
    title: "Mission",
    content:
      "This is a temporary mission statement. You can swap this with CMS-driven content anytime.",
    icon: "target",
  },

  highlights: [
    "Modern labs & research facilities",
    "Highly qualified faculty",
    "Strong industry partnerships",
    "Hands-on learning ecosystem",
  ],

  sidebar: defaultSidebar,
  sections: [
    {
      id: "faculty",
      type: "faculty-list",
      title: "Meet Our Faculty",
      faculty: dummyFaculty,
    },
  ],
};

export function getDepartmentData(type: string, slug: string): DepartmentData {
  return {
    ...placeholderData,
    name: `Department of ${slug.replace(/-/g, " ")}`,
  };
}
