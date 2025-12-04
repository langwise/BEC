export interface DepartmentData {
  name: string;
  tagline: string;

  overview: { title: string; content: string; icon: string };
  vision: { title: string; content: string; icon: string };
  mission: { title: string; content: string; icon: string };

  highlights: string[];
}

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
};

export function getDepartmentData(type: string, slug: string): DepartmentData {
  return {
    ...placeholderData,
    name: `Department of ${slug.replace(/-/g, " ")}`,
  };
}
