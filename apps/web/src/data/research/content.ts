import {
  Bot,
  Cpu,
  Eye,
  Building2,
  FlaskConical,
  Radio,
  Layers,
  Mountain,
  Hammer,
  Satellite,
  Settings,
  Sun,
  Gauge,
  Leaf,
  type LucideIcon,
} from "lucide-react";

import { asset } from "@/lib/assets";

// External research portal for BEC faculty publications and profiles.
export const IRINS_URL = "https://becbgk.irins.org/";

// Headline metrics shown in the hero, source: becbgk.edu/Research.
export const researchStats = [
  { value: "10", label: "Recognized Research Centres" },
  { value: "64", label: "Research Supervisors" },
  { value: "123", label: "Research Scholars" },
  { value: "140", label: "Ph.D.s Awarded" },
];

// Message from the Dean (R&D), provided by BEC (Comments_Research_16-06-2026).
export const dean = {
  name: "Dr. Mahabaleshwar S. K.",
  role: "Dean (Research & Development)",
  email: "mahabalesh_sk@yahoo.co.in",
  photo: asset("governance/deans/dr-mahabaleshwar-s-k.webp"),
  message: [
    "At our institution, research is the driving force behind innovation, academic excellence, and societal progress. We are committed to fostering a vibrant research ecosystem that encourages curiosity, creativity, and interdisciplinary collaboration among faculty, researchers, and students. Our focus areas include emerging technologies such as Artificial Intelligence, Machine Learning, Robotics, Image Processing, Biometrics, Data Analytics, and sustainable engineering solutions that address real-world challenges.",
    "We strongly believe that impactful research should contribute not only to academic advancement but also to industry, community, and national development. Through state-of-the-art laboratories, collaborative projects, funded research initiatives, and partnerships with industries and research organizations, we provide an enabling environment for high-quality research and innovation.",
    "I invite aspiring researchers, scholars, and students to join us in this journey of discovery and transformation. Together, let us create knowledge, develop cutting-edge technologies, and build solutions that make a meaningful difference to society.",
  ],
};

// Research office special officers (provided by BEC).
export const specialOfficers = [
  {
    name: "Dr. Mamata J. Sataraddi",
    role: "Special Officer, Research & Development",
    email: "mjsataraddi@gmail.com",
    photo: asset("research/officers/dr-mamata-j-sataraddi.webp"),
  },
  {
    name: "Dr. Vishwanath Kagawade",
    role: "Special Officer, Research & Development",
    email: "vishwanath.1312@gmail.com",
    photo: asset("research/officers/dr-vishwanath-kagwade.webp"),
  },
];

// VTU-recognized research centres — year of recognition, registered guides,
// scholars currently registered, and Ph.D.s awarded (source: becbgk.edu/Research).
export const researchCentres = [
  { centre: "Biotechnology", year: "2010", guides: "4", scholars: "5", phds: "9" },
  { centre: "Civil Engineering", year: "2003", guides: "11", scholars: "18", phds: "22" },
  { centre: "Computer Science & Engineering", year: "2004", guides: "11", scholars: "23", phds: "13" },
  { centre: "Electronics & Communication Engineering", year: "2005", guides: "14", scholars: "18", phds: "25" },
  { centre: "Electrical & Electronics Engineering", year: "2003", guides: "4", scholars: "8", phds: "13" },
  { centre: "Industrial & Production Engineering", year: "2007", guides: "5", scholars: "13", phds: "5" },
  { centre: "Information Science & Engineering", year: "2020", guides: "2", scholars: "2", phds: "—" },
  { centre: "Mechanical Engineering", year: "2003", guides: "9", scholars: "32", phds: "53" },
  { centre: "Physics", year: "2012", guides: "3", scholars: "3", phds: "—" },
  { centre: "Management Studies (MBA)", year: "2020", guides: "1", scholars: "1", phds: "—" },
];

export type CentreOfExcellence = {
  key: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  about: string;
  vision: string;
  mission: string[];
  focusAreas: string[];
  gallery?: { src: string; alt: string }[];
};

// Flagship Centres of Excellence — content provided by BEC.
export const flagshipCentres: CentreOfExcellence[] = [
  {
    key: "robotics",
    icon: Bot,
    title: "Robotics",
    tagline: "Intelligent automation, articulated & mobile robots, VR-enabled simulation",
    about:
      "The Centre of Excellence (CoE) in Robotics is a state-of-the-art facility established to promote innovation, research, skill development, and industry-oriented learning in robotics and intelligent automation. The center serves as a hub for interdisciplinary research and hands-on training, enabling students, faculty, researchers, and industry professionals to explore emerging technologies that are transforming modern industries. It is equipped with advanced robotic systems — including articulated robots, SCARA robots, autonomous mobile robots (AMRs), collaborative robotics platforms, and Virtual Reality (VR)-enabled simulation environments — that let learners design, program, simulate, and deploy robotic solutions for manufacturing, logistics, healthcare, agriculture, and smart infrastructure.",
    vision:
      "To become a leading center for robotics education, research, innovation, and technology development that empowers learners to create intelligent solutions for a smarter and sustainable future.",
    mission: [
      "Provide advanced infrastructure and experiential learning opportunities in robotics and automation.",
      "Promote interdisciplinary research and innovation in AI-enabled robotic systems.",
      "Strengthen industry–academia collaboration through training, consultancy, and joint projects.",
      "Develop skilled professionals and entrepreneurs capable of addressing global technological challenges.",
      "Contribute to societal development through innovative robotic solutions and sustainable technologies.",
    ],
    focusAreas: [
      "Artificial Intelligence & Machine Learning",
      "Computer Vision",
      "Industrial Automation",
      "Human–Robot Interaction",
      "Digital Twins",
      "Internet of Things (IoT)",
      "Industry 4.0 Technologies",
      "Autonomous Mobile Robots",
    ],
    gallery: [
      { src: asset("research/labs/robotics/cine0869.webp"), alt: "Centre of Excellence in Robotics — articulated and SCARA robot cells" },
      { src: asset("research/labs/robotics/cine0861.webp"), alt: "Fleet of autonomous mobile robots with LiDAR and vision sensors" },
      { src: asset("research/labs/robotics/cine0866.webp"), alt: "Autonomous mobile robot with onboard camera and sensors" },
      { src: asset("research/labs/robotics/cine0913.webp"), alt: "Students demonstrating the SCARA robot workstation" },
      { src: asset("research/labs/robotics/cine0896.webp"), alt: "Students programming autonomous mobile robots in the lab" },
      { src: asset("research/labs/robotics/cine0922.webp"), alt: "VR-enabled robotics simulation using a virtual reality headset" },
    ],
  },
  {
    key: "iot",
    icon: Cpu,
    title: "Internet of Things (IoT)",
    tagline: "Connected systems, smart infrastructure, edge & cloud intelligence",
    about:
      "The Centre of Excellence (CoE) in Internet of Things (IoT) is established to foster innovation, research, and skill development in connected technologies that are transforming industries and everyday life. It provides a dynamic platform for students, researchers, and industry professionals to explore, design, and develop smart solutions using IoT, Artificial Intelligence, Cloud Computing, Edge Computing, Data Analytics, and Cybersecurity. Equipped with modern IoT development kits, sensors, embedded systems, communication modules, cloud platforms, and smart device ecosystems, the CoE enables hands-on learning and research in Smart Cities, Smart Agriculture, Industrial IoT, healthcare monitoring, smart energy management, environmental monitoring, and intelligent transportation.",
    vision:
      "To be a premier center for IoT education, research, and innovation, empowering learners to develop intelligent and connected solutions for a digitally transformed world.",
    mission: [
      "Provide advanced infrastructure and hands-on training in IoT technologies and applications.",
      "Promote research and innovation in smart connected systems and intelligent devices.",
      "Strengthen industry–academia collaboration through projects, consultancy, and technology transfer.",
      "Develop skilled professionals capable of designing secure, scalable, and sustainable IoT solutions.",
      "Encourage entrepreneurship and the development of innovative products that address societal and industrial challenges.",
    ],
    focusAreas: [
      "Smart Cities & Smart Infrastructure",
      "Industrial IoT (IIoT) & Industry 4.0",
      "Smart Agriculture & Precision Farming",
      "Healthcare & Remote Patient Monitoring",
      "Smart Energy & Renewable Energy Systems",
      "Wearable Devices & Connected Healthcare",
      "IoT Security & Cybersecurity",
      "AI & Data Analytics for IoT",
      "Cloud & Edge Computing",
      "Environmental Monitoring & Sustainability",
    ],
  },
  {
    key: "computer-vision",
    icon: Eye,
    title: "Computer Vision",
    tagline: "Deep learning, image analysis, biometrics & visual intelligence",
    about:
      "The Centre of Excellence (CoE) in Computer Vision is a dedicated hub for advanced learning, research, innovation, and industry collaboration in intelligent visual computing. The center focuses on enabling machines to interpret, analyze, and understand visual information from images and videos to enhance automation, decision-making, and human–computer interaction. It provides state-of-the-art infrastructure — including high-performance computing systems, AI-enabled workstations, imaging devices, cameras, and GPUs — where students, researchers, and faculty gain hands-on experience with Deep Learning, Machine Learning, Image Processing, Pattern Recognition, and Artificial Intelligence across domains such as facial recognition, biometric authentication, medical image analysis, autonomous vehicles, smart surveillance, and industrial inspection.",
    vision:
      "To be a leading center for education, research, and innovation in Computer Vision, developing intelligent visual technologies that transform industries and improve quality of life.",
    mission: [
      "Provide advanced infrastructure and experiential learning opportunities in Computer Vision and Artificial Intelligence.",
      "Promote interdisciplinary research in image processing, deep learning, and visual analytics.",
      "Strengthen industry–academia collaboration through projects, consultancy, and technology development.",
      "Develop skilled professionals capable of designing and deploying intelligent vision-based solutions.",
      "Encourage innovation and entrepreneurship in emerging visual computing technologies.",
    ],
    focusAreas: [
      "Image Processing & Analysis",
      "Deep Learning for Computer Vision",
      "Object Detection & Recognition",
      "Facial Recognition & Biometrics",
      "Medical Image Analysis",
      "Autonomous Vehicles & Intelligent Transportation",
      "Smart Surveillance & Security Systems",
      "Document Analysis & OCR",
      "Augmented & Mixed Reality",
      "Robotics Vision & Human–Robot Interaction",
    ],
  },
];

// Established, discipline-specific research centres and industry-partnered labs
// (source: becbgk.edu/Research).
export const specializedLabs: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Cpu,
    title: "National MEMS Design Centre",
    description:
      "Established under NPMASS (National Programme for Micro and Smart Structures), a Government of India initiative to promote micro and nano technology.",
  },
  {
    icon: Cpu,
    title: "Intel Intelligent Systems Laboratory",
    description:
      "An exclusive lab set up in association with Intel to carry out innovative projects, under an MoU signed on 16 November 2013.",
  },
  {
    icon: Layers,
    title: "Multimedia, Vision Computing & Image Processing",
    description:
      "Laboratory equipped for multimedia data acquisition and high-performance computing across heterogeneous environments, covering wireless networks and image processing.",
  },
  {
    icon: Radio,
    title: "NOKIA Research Laboratory",
    description:
      "VTU–Nokia Research Lab set up under the Nokia University India Grant to study the latest mobile technologies through mobile research and learning.",
  },
  {
    icon: FlaskConical,
    title: "Centre for Advanced Materials Research Studies",
    description:
      "Focused on synthesizing and characterizing new alloys, established through DRDO grants valued at Rs. 2.62 crores.",
  },
  {
    icon: Layers,
    title: "Smart Composite Structures Research Centre (SCSRC)",
    description:
      "Advanced research facility dedicated to the study and development of composite materials and structures.",
  },
  {
    icon: Mountain,
    title: "Advanced Geotechnical Engineering Laboratory",
    description: "Specialized laboratory for geotechnical engineering research and testing.",
  },
  {
    icon: Hammer,
    title: "Structural Engineering Laboratory",
    description:
      "State-of-the-art facilities created to support advanced structural engineering research.",
  },
  {
    icon: Satellite,
    title: "Remote Sensing and GIS Laboratory",
    description: "Facility for geographic information systems and remote sensing applications.",
  },
  {
    icon: Settings,
    title: "Bosch Rexroth Centre for Industrial Automation",
    description:
      "Focuses on hydraulic and pneumatic technologies for industrial applications across aerospace and material-handling sectors.",
  },
  {
    icon: Sun,
    title: "Renewable Energy Research Centre",
    description:
      "Emphasizes modelling of wind energy conversion systems, solar–wind hybrid systems and related grid technologies.",
  },
  {
    icon: Gauge,
    title: "SCADA for Distribution Automation Research Centre",
    description:
      "Established in 2014 for supervisory control and data acquisition (SCADA) research in distribution automation.",
  },
  {
    icon: Leaf,
    title: "Bioenergy Research, Information & Demonstration Centre (BRIDC)",
    description: "Centre dedicated to bioenergy research, demonstration and outreach.",
  },
];

export type PatentStatus = "Granted" | "Published" | "Filed" | "Under Review";

export type Patent = {
  inventors: string[];
  title: string;
  application?: string;
  publication?: string;
  award?: string;
  status: PatentStatus;
  remarks?: string;
};

export type PatentYear = { year: string; patents: Patent[] };

// Patents filed and granted (provided by BEC — "Patents filed and Granted").
export const patentsByYear: PatentYear[] = [
  {
    year: "2024–25",
    patents: [
      {
        inventors: ["Dr. S. M. Malkapur", "Dr. Shankar H. Sanni"],
        title: "Tree-Fall Resisting System for a slightly Inclined Tree",
        application: "424973-001 · 27-07-2024",
        publication: "424973-001 · 26-03-2025",
        status: "Granted",
      },
      {
        inventors: ["Dr. S. M. Malkapur", "Dr. Shankar H. Sanni"],
        title: "Tree-Fall Resisting System for a straight tree",
        application: "425215-001 · 27-07-2024",
        publication: "425215-001 · 30-07-2024",
        status: "Granted",
      },
      {
        inventors: ["Mahadev Biradar"],
        title: "An Intelligent Attendance System With Geolocation And Anomaly Detection",
        application: "202521023180 · 28-03-2025",
        status: "Published",
      },
    ],
  },
  {
    year: "2023–24",
    patents: [
      {
        inventors: ["Dr. S. M. Malkapur", "Dr. Shankar H. Sanni"],
        title:
          "Tree-Fall Resisting System/Apparatus at the Off-Street Area for an Inclined Tree to Withstand Stronger Wind and Method of its Construction",
        application: "202241009473",
        publication: "202241009473 A · 25-11-2023",
        award: "581459 · 24-02-2026",
        status: "Granted",
      },
      {
        inventors: [
          "Dr. Lokesh B. Bhajantri",
          "Dr. Manjula A. Sutagundar",
          "Dr. Vasudha V. Ayyanavar",
          "Dr. Dhaneswari Hatti",
        ],
        title: "AI and IoT Based Agriculture Crop Cutting Device",
        application: "390551-001 · 18-07-2023",
        publication: "45/2023 · 10-11-2023",
        award: "390551-001 · 07-11-2023",
        status: "Granted",
        remarks: "Registered / Granted",
      },
    ],
  },
  {
    year: "2022–23",
    patents: [
      {
        inventors: ["Dr. Mahabaleshwar S. K."],
        title:
          "Preventing Center Meridian Accidents on highways using nRF module communication between car and medians",
        application: "24-04-2023",
        publication: "26-05-2023",
        status: "Published",
      },
      {
        inventors: ["Dr. Santosh Malakapur", "Dr. S. H. Sanni"],
        title: "Novel Structural system for stabilising a tree (“Treefall resisting system”)",
        status: "Filed",
      },
    ],
  },
  {
    year: "2021–22",
    patents: [
      {
        inventors: ["Pavan Kumar", "Bharati S. Meti", "Manjunath Girigowda"],
        title:
          "Bioformulation of Bacillus subtilis for management of bacterial blight in pomegranate",
        application: "202141033369 · 25-07-2021",
        publication: "30-07-2021",
        status: "Filed",
        remarks: "Reply to FER submitted on 07-02-2022",
      },
      {
        inventors: ["Dr. Lokesh B. Bhajantri"],
        title: "An Application for Divyang to use Voice Mail",
        application: "202241022232 A · 13-04-2022",
        publication: "17/2022 · 29-04-2022",
        status: "Published",
      },
      {
        inventors: ["Dr. Sadhana P. B."],
        title: "Food Analysis Using Chemical Sensor",
        application: "202241003611 · 21-01-2022",
        publication: "05/2022 · 04-02-2022",
        status: "Published",
      },
      {
        inventors: ["Dr. Govindraj B. Chittapur"],
        title:
          "Machine Learning based prediction of recommended song selection based on people mindset using age and emotional words via deep learning",
        application: "202241038948 · 06-07-2022",
        publication: "22-07-2022",
        status: "Published",
      },
      {
        inventors: ["Dr. Lokesh B. Bhajantri"],
        title: "IoT based poultry management system",
        application: "202241034718 A · 17-06-2022",
        publication: "25/2022 · 24-06-2022",
        status: "Published",
      },
      {
        inventors: ["Dr. Praveen S. Challagidad"],
        title: "A Hybrid ensemble learning approach to star-galaxy classification",
        application: "202241011956 · 05-03-2022",
        publication: "202241011956 · 11-03-2022",
        status: "Filed",
        remarks: "Awaiting Request for Examination",
      },
      {
        inventors: ["Dr. Praveen S. Challagidad"],
        title: "Underwater Drone",
        application: "367706-001 · 15-07-2022",
        status: "Filed",
        remarks: "Awaiting publication",
      },
    ],
  },
  {
    year: "2020–21",
    patents: [
      {
        inventors: ["Dr. R. N. Herkal", "Krishnamurthy Bhat"],
        title:
          "An electro-mechanical system for prevention of wastage of cold water stored in hot water pipeline",
        application: "2453/CHE/2015 · 15-05-2015",
        publication: "3471221 · 08-09-2020",
        award: "347122 · 18-09-2020",
        status: "Granted",
      },
      {
        inventors: ["Dr. Rashmi R. Hunnur"],
        title: "Road Escalator field of invention",
        application: "202141013649 · 27-03-2021",
        publication: "02-04-2021",
        status: "Published",
      },
      {
        inventors: ["Dr. Govindraj B. Chittapur"],
        title:
          "Forgery Video Detection System Based on Auto-encoders for Ameliorated Classification",
        application: "202141020483 · 05-05-2021",
        status: "Filed",
        remarks: "Awaiting Request for Examination",
      },
      {
        inventors: ["Dr. P. N. Kulkarni"],
        title:
          "An Approach for Forest Change Detection Using Auto Regressive Module Based Kernel Fuzzy Clustering",
        application: "2121009025 · 04-03-2021",
        publication: "2121009025 · 26-03-2021",
        status: "Filed",
        remarks: "Awaiting Request for Examination",
      },
      {
        inventors: ["Dr. Nagaranta R."],
        title:
          "Blockchain Enabled Hardware System for IoT Infrastructure Integration for Security Optimization",
        application: "202141016943 · 09-04-2021",
        status: "Under Review",
        remarks: "Awaiting reviewer evaluation",
      },
      {
        inventors: ["Bharati S. Meti", "Shivaleela V. B."],
        title: "Cookie mix for special need",
        application: "201641042251 · 10-12-2016",
        publication: "23-12-2016",
        award: "350729 · 03-11-2020",
        status: "Granted",
      },
    ],
  },
  {
    year: "2019–20",
    patents: [
      {
        inventors: ["Dr. Lokesh B. Bhajantri"],
        title: "A Wearable Safety System",
        application: "202041023818 A · 06-06-2020",
        publication: "24/2020 · 12-06-2020",
        status: "Published",
      },
    ],
  },
  {
    year: "2018–19",
    patents: [
      {
        inventors: ["Bharati S. Meti", "Shivaleela V. B."],
        title:
          "Soap preparation using organic waste for animal use to remove body pests like ticks",
        application: "201741034621 · 28-09-2017",
        publication: "05-10-2018",
        award: "394358 · 08-04-2022",
        status: "Granted",
      },
      {
        inventors: ["Shivaleela V. B.", "Bharati S. Meti"],
        title: "Process of purification of glycerine",
        application: "201741034620 · 28-09-2017",
        publication: "05-10-2018",
        award: "385625 · 30-12-2021",
        status: "Granted",
      },
    ],
  },
];

export type SponsoredProject = {
  title: string;
  agency: string;
  leaders: string[];
  started: string;
  completion: string;
  duration?: string;
  funding: string;
  status: "Completed" | "Ongoing";
};

// Sponsored research — completed and ongoing (provided by BEC — "Sponsored Research").
export const sponsoredProjects: SponsoredProject[] = [
  {
    title: "Design and Implementation of Security Service in 5G Wireless Networks",
    agency: "CySECK, KSCST, IISc Bangalore",
    leaders: ["Dr. S. V. Saboji", "Dr. S. M. Hatture"],
    started: "Jan 2022",
    completion: "Jul 2022",
    duration: "6 months",
    funding: "₹0.60 L",
    status: "Completed",
  },
  {
    title: "Cyber Security Threat Detection in Smart Agriculture using Machine Learning Approaches",
    agency: "CySECK, KSCST, IISc Bangalore",
    leaders: ["Dr. S. M. Hatture", "Dr. S. V. Saboji"],
    started: "Jan 2022",
    completion: "Jul 2022",
    duration: "6 months",
    funding: "₹0.60 L",
    status: "Completed",
  },
  {
    title: "Anomaly Based Intrusion Detection in Smart Agriculture using Machine Learning Approach",
    agency: "CySECK, KSCST, IISc Bangalore",
    leaders: ["Dr. S. V. Saboji", "Dr. P. S. Challagidad"],
    started: "Sep 2022",
    completion: "Sep 2023",
    duration: "12 months",
    funding: "₹2.00 L",
    status: "Completed",
  },
  {
    title: "Smart Composite Structures Research Centre",
    agency: "VGST K-FIST Level-I",
    leaders: ["Dr. Shravan B. Kerur"],
    started: "2015–16",
    completion: "2024–25",
    funding: "₹20 L",
    status: "Completed",
  },
  {
    title: "Liquid forging of lightweight Al-Si and Al-Mg alloys: Shaping a sustainable future",
    agency: "VGST K-FIST Level-II",
    leaders: ["Dr. S. M. Jigajinni (PI)", "Prof. V. P. Girisagar (Co-PI)"],
    started: "2024",
    completion: "Ongoing",
    funding: "₹30 L",
    status: "Ongoing",
  },
];
