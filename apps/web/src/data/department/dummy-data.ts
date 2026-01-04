import { FacultyProfile } from "@/types/faculty";

export const dummyFaculty: FacultyProfile[] = [
  {
    basicInfo: {
      name: "Dr. Suresh K. Patel",
      designation: "Professor & Head",
      department: "Computer Science & Engineering",
      qualification: "Ph.D. (IIT Bombay), M.Tech",
      profilePhotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    contactDetails: {
      email: "suresh.patel@becbgk.edu",
      phone: "+91 98765 43210",
      linkedIn: "https://linkedin.com/in/example",
      googleScholar: "https://scholar.google.com/",
    },
    education: [
      {
        degree: "Ph.D.",
        specialization: "Artificial Intelligence",
        universityOrInstitution: "IIT Bombay",
        yearOfAward: 2015,
      },
      {
        degree: "M.Tech",
        specialization: "Computer Science",
        universityOrInstitution: "NIT Surathkal",
        yearOfAward: 2008,
      },
    ],
    workExperience: [
      {
        position: "Professor & Head",
        organization: "Basaveshwar Engineering College",
        fromDate: "2020",
        toDate: undefined, // Present
      },
      {
        position: "Associate Professor",
        organization: "Basaveshwar Engineering College",
        fromDate: "2015",
        toDate: "2020",
      },
    ],
    teaching: {
      coursesCurrentlyTeaching: [
        { courseName: "Machine Learning" },
        { courseName: "Advanced Algorithms" },
      ],
      coursesPreviouslyTaught: [
        { program: "B.E", courses: ["Data Structures", "DBMS", "OS"] },
      ],
      teachingInterests: {
        teachingCourses: ["AI", "ML", "Algorithms"],
        pedagogicalApproaches: ["Project-based Learning", "Flipped Classroom"],
      },
    },
    research: {
      researchInterests: ["Deep Learning", "Computer Vision", "Natural Language Processing"],
    },
    publications: {
      journalPapers: [
        {
          title: "A Novel Approach to Image Segmentation using Deep Learning",
          authors: ["Suresh K. Patel", "Ramesh Kumar"],
          journalOrConference: "IEEE Transactions on Image Processing",
          year: 2022,
          volumeOrEdition: "Vol 31",
          doiOrUrl: "https://ieee.org",
        },
      ],
      conferencePapers: [
        {
          title: "Real-time Object Detection in Autonomous Vehicles",
          authors: ["Suresh K. Patel", "Student A"],
          journalOrConference: "CVPR 2021",
          year: 2021,
        },
      ],
    },
    professionalDevelopment: {
      workshopsAttended: [],
      fdpOrSttpAttended: [
        {
           programName: "Advanced AI techniques",
           organizingInstitution: "IIT Madras",
           duration: "2 Weeks"
        }
      ],
    },
    researchSupervision: {
      ugProjects: [
        { studentName: "Team Alpha", thesisTitle: "Smart Traffic Management", status: "Completed" },
        { studentName: "Team Beta", thesisTitle: "Crop Disease Detection", status: "Ongoing" },
      ],
      pgProjects: [
        { studentName: "Rahul Verma", thesisTitle: "GANs for Image Synthesis", status: "Completed" },
      ],
      phdProjects: [
         { studentName: "Priya Singh", thesisTitle: "Explainable AI in Healthcare", status: "Ongoing" },
      ]
    },
  },
  {
    basicInfo: {
      name: "Prof. Anita Sharma",
      designation: "Assistant Professor",
      department: "Computer Science & Engineering",
      qualification: "M.Tech (VTU)",
      // No photo to test fallback
    },
    contactDetails: {
      email: "anita.sharma@becbgk.edu",
    },
    education: [
      {
        degree: "M.Tech",
        specialization: "Digital Electronics",
        universityOrInstitution: "VTU Belagavi",
        yearOfAward: 2012,
      },
    ],
    workExperience: [
      {
        position: "Assistant Professor",
        organization: "Basaveshwar Engineering College",
        fromDate: "2013",
        toDate: undefined,
      },
    ],
    teaching: {
       coursesCurrentlyTeaching: [{ courseName: "Web Development" }],
       coursesPreviouslyTaught: [],
       teachingInterests: {
           teachingCourses: ["Web Stack", "IoT"],
           pedagogicalApproaches: []
       }
    },
    research: {
      researchInterests: ["IoT", "Web Technologies"],
    },
    publications: {
      journalPapers: [],
      conferencePapers: [],
    },
    professionalDevelopment: {
        workshopsAttended: [],
        fdpOrSttpAttended: []
    },
    researchSupervision: {
      ugProjects: [],
      pgProjects: []
    }
  },
];
