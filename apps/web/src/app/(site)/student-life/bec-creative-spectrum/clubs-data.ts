import { 
  Sparkles, Music, Drama, Radio, Code, Cpu, Lightbulb, Camera, BookOpen, Leaf,
  LucideIcon 
} from "lucide-react";

export interface ActionPlanItem {
  month: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  outcome: string;
}

export interface WeekWiseItem {
  period: string;
  activities: string;
}

export interface ClubData {
  id: string;
  name: string;
  clubType: string;
  wing: "Cultural Wing" | "Technical Wing" | "Holistic Development Wing";
  icon: LucideIcon;
  themeColor: string;
  description: string;
  vision: string;
  mission: string[];
  objectives: string[];
  expectedOutcomes?: string[];
  actionPlan: ActionPlanItem[];
  weekWise: WeekWiseItem[];
}

export const detailedClubs: ClubData[] = [
  {
    id: "bec-swara",
    name: "BEC SWARA",
    wing: "Cultural Wing",
    clubType: "Music Club",
    icon: Music,
    themeColor: "rose",
    description: "BEC Swara is the official music club of Basaveshwar Engineering College, dedicated to building a vibrant musical community where students discover, develop, and celebrate their vocal and musical talents through structured practice, performances, and collaborative events.",
    vision: "To create a vibrant musical culture at BEC where students can express their talent, collaborate, and grow through music — building a community that celebrates diverse musical forms and nurtures performers who carry the college's artistic identity forward.",
    mission: [
      "To provide a platform for students to showcase their singing and musical talents across genres.",
      "To conduct regular structured practice sessions improving vocal technique, harmony, and stage confidence.",
      "To organize campus-wide singing competitions and open jamming sessions encouraging broad participation.",
      "To collaborate with BEC Nataraj for music-dance fusion performances and cross-cultural showcases.",
      "To represent BEC at inter-college music competitions every semester."
    ],
    objectives: [
      "Build an active, passionate music community across all branches and years.",
      "Provide consistent performance opportunities for students to gain stage experience.",
      "Encourage musical collaboration between singers, instrumentalists, and other clubs.",
      "Promote appreciation of diverse genres — classical, folk, contemporary, and fusion.",
      "Develop student musicians who are confident, expressive, and performance-ready."
    ],
    actionPlan: [
      {
        month: "Month 1",
        title: "Musical Foundations — Building the Music Community",
        subtitle: "Establishing the Swara community, launching structured vocal training, and creating first performance opportunities.",
        bullets: [
          "Introduction to BEC Swara — vision, structure, and member expectations.",
          "Weekly structured practice sessions for vocal technique, coordination, and individual improvement.",
          "Solo and group singing practice to develop stage confidence.",
          "Open Jamming Session — an informal musical interaction event open to all students."
        ],
        outcome: "Members become familiar with the Swara platform and begin developing musical skills through practice and collaboration."
      },
      {
        month: "Month 2",
        title: "Talent Engagement — Participation and Performance",
        subtitle: "Creating performance platforms and broadening campus participation through competitions.",
        bullets: [
          "Swara Solo Singing Competition — open to all students of the college.",
          "Swara Group Singing Competition — encouraging teamwork, coordination, and vocal harmony.",
          "Weekly rehearsals and performance preparation for Swara members.",
          "Open Jamming Session — informal performances exploring different musical styles and genres."
        ],
        outcome: "Increased campus participation and identification of talented performers to represent BEC."
      },
      {
        month: "Month 3",
        title: "Collaboration and Cultural Showcase — Celebration",
        subtitle: "Culminating the semester with a showcase event demonstrating growth and cross-club collaboration.",
        bullets: [
          "Collaboration with BEC Nataraj for music-dance fusion performances.",
          "Joint rehearsals and cross-club performance preparation.",
          "Inter-College Music Competition participation.",
          "Final cultural showcase featuring BEC Swara as headline performers.",
          "Member reflection and feedback session to plan the next cycle."
        ],
        outcome: "A high-quality showcase event highlighting musical talent and solidifying Swara's campus presence."
      }
    ],
    weekWise: [
      { period: "Week 1", activities: "Club introduction, member orientation, ice-breakers, and goal setting." },
      { period: "Week 2", activities: "Vocal technique exercises, group formation, and individual assessments." },
      { period: "Week 3–4", activities: "Practice performances, mentor feedback, and confidence-building sessions." },
      { period: "Month 2", activities: "Competition preparation, regular sessions, and jamming events." },
      { period: "Month 3", activities: "Inter-college preparation, showcase rehearsals, and final performance." }
    ]
  },
  {
    id: "bec-nataraj",
    name: "BEC NATARAJ",
    wing: "Cultural Wing",
    clubType: "Dance Club",
    icon: Sparkles,
    themeColor: "rose",
    description: "BEC Nataraj is the official dance club of BEC, dedicated to nurturing creativity, cultural appreciation, and physical confidence through structured training, choreography workshops, and stage performances across multiple dance styles including Classical, Folk, Contemporary, and Hip-hop.",
    vision: "To create a vibrant dance community at BEC that celebrates India's diverse dance heritage and contemporary forms — developing students into confident, expressive performers who represent the college's cultural identity with pride.",
    mission: [
      "To provide structured training in Classical, Folk, Contemporary, and Hip-hop dance forms.",
      "To conduct regular practice sessions, choreography workshops, and performance training.",
      "To encourage participation in college events, inter-college competitions, and cultural festivals.",
      "To develop stage confidence, teamwork, and discipline among student performers.",
      "To organize showcase events that celebrate dance talent and inspire broader participation."
    ],
    objectives: [
      "Promote dance culture across all branches and years within BEC.",
      "Encourage student creativity through both group and solo choreography.",
      "Build teamwork and synchronization through ensemble performances.",
      "Organize campus dance events, internal competitions, and inter-college cultural showcases.",
      "Prepare students for cultural competitions and annual day performances."
    ],
    actionPlan: [
      {
        month: "Month 1",
        title: "Fundamentals of Dance — Building the Foundation",
        subtitle: "Building core rhythm coordination and forming initial dance groups.",
        bullets: [
          "Introduction to BEC Nataraj — club overview, dance style selection, and team formation.",
          "Basics of rhythm, body movement, coordination, and physical warm-up routines.",
          "Introduction to basic choreography and structured practice sessions.",
          "Small group performances and internal feedback session."
        ],
        outcome: "Members build foundational movement skills and form collaborative performance groups."
      },
      {
        month: "Month 2",
        title: "Guided Choreography & Practice — Building with Support",
        subtitle: "Refining techniques through professional mentorship and choreography.",
        bullets: [
          "Guided choreography practice with mentors and senior members.",
          "Dance workshop conducted by experienced choreographers or industry professionals.",
          "Group dance practice — focus on synchronization, stage positioning, and expression.",
          "Internal dance showcase or friendly inter-group competition."
        ],
        outcome: "Each team develops a performance-ready choreography with structured mentor guidance."
      },
      {
        month: "Month 3",
        title: "Independent Performance Preparation — Ownership and Showcase",
        subtitle: "Independent preparation culminating in final stage production and showcases.",
        bullets: [
          "Teams independently select themes and develop fusion or genre-specific concepts.",
          "Independent choreography rehearsals — mentors provide feedback only.",
          "Costume planning, stage setup practice, and final performance preparation.",
          "Final dance showcase event at BEC — open to the entire college community.",
          "Collaboration with BEC Swara for music-dance fusion performances."
        ],
        outcome: "A showcase event featuring high-quality independent performances demonstrating member growth."
      }
    ],
    weekWise: [
      { period: "Weeks 1–2", activities: "Fundamentals — rhythm, movement, warm-up routines, and team formation." },
      { period: "Weeks 3–4", activities: "Choreography basics, mentor-guided practice, first group performance." },
      { period: "Weeks 5–8", activities: "Guided choreography, workshop, synchronization training, internal showcase." },
      { period: "Weeks 9–12", activities: "Independent preparation, costume planning, final showcase event." }
    ]
  },
  {
    id: "bec-abhinaya",
    name: "BEC ABHINAYA",
    wing: "Cultural Wing",
    clubType: "Drama & Acting Club",
    icon: Drama,
    themeColor: "rose",
    description: "BEC Abhinaya is the drama and acting club of BEC, dedicated to the art of pure performance — developing students' abilities in expression, storytelling, and stage presence through skits, mono acts, mime, and situational acting.",
    vision: "To build a powerful acting community at BEC where students master the language of expression — cultivating confidence, creativity, and the ability to communicate meaningfully through drama and performance.",
    mission: [
      "To promote the art of pure acting, expression, and storytelling as a valued discipline.",
      "To train members in dialogue delivery, body language, emotional expression, and stage presence.",
      "To provide consistent performance opportunities through skits, mono acts, and mime.",
      "To encourage audience engagement through meaningful dramatic productions.",
      "To build a creative, supportive acting community that earns recognition at inter-college events."
    ],
    objectives: [
      "Enhance acting and expressive skills through structured training and regular practice.",
      "Provide consistent performance formats — skits, mono acts, mime, and group plays.",
      "Build communication confidence and emotional intelligence through drama.",
      "Develop a strong creative community that is recognized campus-wide."
    ],
    actionPlan: [
      {
        month: "Month 1",
        title: "Acting Foundations — Confidence and Expression",
        subtitle: "Fostering raw expression, coordination, and overcoming stage fright.",
        bullets: [
          "Introduction to BEC Abhinaya — acting philosophy, club structure, and expectations.",
          "Acting basics: expression exercises, physicality, and emotional range activities.",
          "Confidence-building activities — ice-breakers, group games, and improvisation exercises.",
          "Introduction to performance formats: skit, mono act, mime, and situational acting."
        ],
        outcome: "Members overcome stage fright and grasp the fundamentals of acting and expression."
      },
      {
        month: "Month 2",
        title: "Skill Development — Scripts, Characters, and Practice",
        subtitle: "Script work, dialogue mechanics, and character representation.",
        bullets: [
          "Dialogue delivery workshops — tone, pause, emotion, and timing.",
          "Body language and physicality training — movement as communication.",
          "Skit formation: script reading, character allocation, and rehearsal planning.",
          "Mono-act and mime practice sessions with structured mentor feedback."
        ],
        outcome: "Members develop specific acting skills and begin working on their first performance pieces."
      },
      {
        month: "Month 3",
        title: "Performance — Rehearsals, Feedback, and Showcase",
        subtitle: "Complete dress rehearsals, peer reviews, and public stage showcase.",
        bullets: [
          "Full rehearsals for all formats with structured feedback sessions.",
          "Audience interaction exercises — rehearsing in front of live peer audiences.",
          "Internal showcase event: skit, mono act, and mime performances.",
          "Reflection session — individual learning, improvement areas, and next cycle planning."
        ],
        outcome: "A complete showcase performance demonstrating member growth and establishing club identity."
      }
    ],
    weekWise: [
      { period: "Week 1", activities: "Introduction to acting, expression exercises, ice-breaker activities." },
      { period: "Week 2", activities: "Dialogue delivery, body language, and situational acting practice." },
      { period: "Week 3", activities: "Skit formation, script understanding, and role allocation." },
      { period: "Week 4+", activities: "Rehearsals, performance refinement, audience feedback sessions, and showcase." }
    ]
  },
  {
    id: "bec-dhwani",
    name: "BEC DHWANI",
    wing: "Cultural Wing",
    clubType: "Radio Club",
    icon: Radio,
    themeColor: "rose",
    description: "BEC Dhwani is the official radio and audio media club of BEC, dedicated to the art of spoken communication — developing student voices through podcasting, audio production, campus radio programming, scripting, and live hosting.",
    vision: "To establish BEC Dhwani as the voice of BEC — a vibrant radio and audio media club where students develop their communication skills, explore audio storytelling, and create content that informs, entertains, and authentically represents the college community.",
    mission: [
      "To train students in radio hosting, voice modulation, and professional audio production.",
      "To produce regular podcast episodes, audio features, and campus radio content.",
      "To build a library of student-created audio content covering college life and general interest topics.",
      "To interview faculty, students, and external guests to create engaging, informative audio pieces.",
      "To develop students who are articulate, confident, and capable of professional audio communication."
    ],
    objectives: [
      "Develop confident, well-spoken communicators through structured audio training.",
      "Produce and publish high-quality podcast episodes and campus radio content.",
      "Build end-to-end audio production skills — scripting, recording, editing, and publishing.",
      "Create a recognizable BEC Dhwani brand that serves as the college's audio voice.",
      "Participate in inter-college media events and audio content competitions."
    ],
    actionPlan: [
      {
        month: "Month 1",
        title: "Voice & Fundamentals — Training the BEC Voice",
        subtitle: "Getting comfortable with equipment, mic setups, and basic modulation.",
        bullets: [
          "Introduction to BEC Dhwani — vision, format, and club structure.",
          "Voice training: modulation, diction, pacing, and clarity exercises.",
          "Introduction to radio scripting — writing for the ear, not the eye.",
          "First recording exercise: each member records a 2-minute self-introduction.",
          "Audio equipment workshop: microphone handling, recording basics, and error prevention.",
          "Listening and analysis session: studying professional podcasts for structure and technique."
        ],
        outcome: "Members understand audio communication fundamentals and produce their first recording."
      },
      {
        month: "Month 2",
        title: "Content Creation — Episodes, Features, and Production",
        subtitle: "Scripting, conducting interviews, and editing audio content.",
        bullets: [
          "First BEC Dhwani episode recorded and published — theme: 'Life at BEC.'",
          "Interview training — preparing questions, conducting interviews, and editing conversations.",
          "Recording of faculty or notable student interviews.",
          "Introduction to audio editing — noise reduction, leveling, and music bed integration.",
          "Launch of 'BEC Buzz' — a weekly audio update on campus events and news.",
          "Group project: produce a 5-minute feature audio documentary on a college topic."
        ],
        outcome: "Multiple polished episodes published; members confident in end-to-end audio production."
      },
      {
        month: "Month 3",
        title: "Campus Radio & Showcase — Going Live",
        subtitle: "Broadcasting on campus and representing BEC in radio challenges.",
        bullets: [
          "Plan and execute a live campus radio event or audio broadcast during a college occasion.",
          "Showcase Episode: best clips, interviews, and features compiled from the full semester.",
          "Live hosted session — quiz, discussion, or interview — open to the college.",
          "Participation in any available inter-college media or public speaking competition.",
          "Reflection and content roadmap session for the next cycle."
        ],
        outcome: "A live campus radio event and showcase episode establish BEC Dhwani as a credible campus media outlet."
      }
    ],
    weekWise: [
      { period: "Week 1", activities: "Introduction, voice training exercises, and first recording task." },
      { period: "Week 2", activities: "Scripting workshop, equipment handling, podcast analysis session." },
      { period: "Week 3–4", activities: "First episode production — recording, editing, and publishing." },
      { period: "Week 5–6", activities: "Interview training, BEC Buzz launch, and feature documentary production." },
      { period: "Week 7–8", activities: "Advanced editing, group projects, and content review sessions." },
      { period: "Week 9–10", activities: "Campus radio planning and live event preparation." },
      { period: "Week 11–12", activities: "Live broadcast, showcase episode release, and reflection session." }
    ]
  },
  {
    id: "developers",
    name: "DEVELOPERS",
    wing: "Technical Wing",
    clubType: "Coding Club",
    icon: Code,
    themeColor: "blue",
    description: "BEC Developers is the coding and software development club of BEC, dedicated to building a strong programming culture through hands-on learning, project development, technical events, and participation in hackathons and competitions.",
    vision: "To build a strong coding community at BEC that transforms students from beginners into confident programmers — capable of logical thinking, real-world problem-solving, and collaborative software development.",
    mission: [
      "To create a collaborative learning environment for consistent coding practice and continuous improvement.",
      "To guide students through hands-on project development in web development, software engineering, and problem-solving.",
      "To encourage participation in hackathons, coding competitions, and inter-college technical events.",
      "To promote peer learning and knowledge sharing through regular sessions and code review practices.",
      "To build a technical foundation that supports academics, internships, and professional careers."
    ],
    objectives: [
      "Strengthen coding and problem-solving abilities through structured, practical sessions.",
      "Develop independent and collaborative student projects — minimum 6–8 per semester.",
      "Build confidence in applying programming concepts to real-world scenarios.",
      "Provide exposure to modern tools, technologies, and development practices.",
      "Motivate students to actively participate in hackathons and coding contests."
    ],
    actionPlan: [
      {
        month: "Month 1",
        title: "Member Selection & Foundation Building",
        subtitle: "Onboarding the cohort and introducing version control workflows.",
        bullets: [
          "Conduct Round 2 of Coding Club auditions and finalize selected members.",
          "Induction session — club structure, expectations, and upcoming activities.",
          "Training sessions: programming fundamentals, IDEs, development environments, and coding practices.",
          "Introduction to tools: Git, version control, and workflow management.",
          "First hands-on assignments to encourage immediate active learning."
        ],
        outcome: "Final cohort selected and onboarded; foundational concepts and workflows established."
      },
      {
        month: "Month 2",
        title: "Skill Development & Mini Projects",
        subtitle: "Diving into core projects, coding challenges, and mentoring.",
        bullets: [
          "Regular weekly coding sessions with structured assignments after each session.",
          "Introduction of mini projects based on topics covered in sessions.",
          "Professional talk by an industry expert or experienced resource person.",
          "Guidance and support for students to participate in external hackathons and competitions.",
          "Code review sessions promoting best practices and collaborative peer learning."
        ],
        outcome: "Members build practical skills and produce their first working mini projects."
      },
      {
        month: "Month 3",
        title: "Project Implementation & Technical Events",
        subtitle: "Organizing coding contests and delivering final systems.",
        bullets: [
          "Internal coding challenge or hackathon within the Developers club.",
          "Advanced coding sessions with complex assignments and real-world problem statements.",
          "Major technical event organized by Developers for the entire college.",
          "Hackathon event — internal or external participation.",
          "Project presentations and progress reviews in preparation for semester showcase."
        ],
        outcome: "6–8 functional student projects developed; two major technical events organized successfully."
      }
    ],
    weekWise: [
      { period: "Week 1", activities: "Administrative planning and audition preparation." },
      { period: "Week 2", activities: "Round 2 audition and final member selection." },
      { period: "Week 3", activities: "Induction session for selected members." },
      { period: "Week 4+", activities: "Regular weekend sessions — coding, assignment, and review cycle." }
    ],
    expectedOutcomes: [
      "Development of 6–8 functional student projects.",
      "Successful organization of two major technical events on campus.",
      "Improved coding confidence and practical programming ability among members.",
      "Active participation in hackathons and national coding competitions.",
      "Strong culture of peer learning and collaborative development at BEC."
    ]
  },
  {
    id: "robotics-and-drone-club",
    name: "ROBOTICS & DRONE CLUB",
    wing: "Technical Wing",
    clubType: "Robotics Club",
    icon: Cpu,
    themeColor: "blue",
    description: "The BEC Robotics and Drone Club is a hands-on technical club dedicated to building student expertise in robotics, electronics, and drone technology — guiding students from foundational concepts to independently building and showcasing working robots at BEC.",
    vision: "To build a dynamic robotics community at BEC that transforms students from beginners into confident innovators through hands-on learning, teamwork, and real-world problem-solving in robotics and drone technology.",
    mission: [
      "To provide step-by-step practical training from basic electronics and microcontrollers to independent robot building.",
      "To ensure every team designs and builds at least one working robot by semester end.",
      "To cultivate hands-on skills in sensors, motor control, programming, and system integration.",
      "To organize internal showcases and Demo Days that encourage innovation and presentation skills.",
      "To establish a strong foundation for advanced robotics projects and future research at BEC."
    ],
    objectives: [
      "Develop robotics fundamentals and hands-on hardware skills in all members.",
      "Encourage independent robot building and creative problem-solving.",
      "Promote teamwork through guided and collaborative build challenges.",
      "Organize a final Demo Day at BEC with faculty and student audience.",
      "Establish long-term robotics capacity and club credibility at BEC."
    ],
    actionPlan: [
      {
        month: "Month 1",
        title: "Fundamentals — Understanding the Basics",
        subtitle: "Mastering electrical circuits, breadboards, Arduino syntax, and sensors.",
        bullets: [
          "Introduction to robotics — components, types, and real-world applications.",
          "Basics of electronics: voltage, current, resistance, and breadboard practice.",
          "LED programming and Arduino introduction.",
          "DC motor and L298N motor driver — motor control using Arduino.",
          "Basics of IR and ultrasonic sensors — reading and interpreting sensor values."
        ],
        outcome: "Students understand core components, basic circuits, and introductory Arduino programming."
      },
      {
        month: "Month 2",
        title: "Guided Robot Building — Building with Support",
        subtitle: "Guided assembly of obstacle avoidance and line following robots.",
        bullets: [
          "Line follower robot (guided build) — IR sensors and motor control logic.",
          "Testing and debugging — fixing alignment issues and improving speed control.",
          "Obstacle avoiding robot (demo build) — ultrasonic sensor logic and autonomous movement.",
          "Internal competition: fastest line follower and smoothest obstacle avoider challenge."
        ],
        outcome: "Each team builds at least one working robot through guided mentorship."
      },
      {
        month: "Month 3",
        title: "Independent Robot Building — Build Without Spoon Feeding",
        subtitle: "Working on customizable tasks and showing them off on Demo Day.",
        bullets: [
          "Teams independently plan and select one project: line follower upgrade, obstacle avoider, or Bluetooth-controlled robot.",
          "Independent build phase — mentors provide guidance only, no direct coding support.",
          "Testing, optimization, and wiring refinement.",
          "Demo Day at BEC — open to faculty and all students; certificate distribution."
        ],
        outcome: "4–6 working robots built independently; successful Demo Day elevates club credibility."
      }
    ],
    weekWise: [
      { period: "Week 1", activities: "Introduction to robotics, components, and team formation." },
      { period: "Week 2", activities: "Electronics fundamentals — breadboard, LED, and resistors." },
      { period: "Week 3", activities: "Motor control — DC motor, L298N, and Arduino programming." },
      { period: "Week 4", activities: "Sensor fundamentals — IR and ultrasonic sensors." },
      { period: "Week 5–6", activities: "Line follower guided build and testing." },
      { period: "Week 7–8", activities: "Obstacle avoider demo build and internal competition." },
      { period: "Week 9–10", activities: "Independent project planning and build phase." },
      { period: "Week 11–12", activities: "Testing, optimization, and Demo Day showcase." }
    ]
  },
  {
    id: "bec-avishkaar",
    name: "BEC AVISHKAAR",
    wing: "Technical Wing",
    clubType: "Innovation Club",
    icon: Lightbulb,
    themeColor: "blue",
    description: "BEC Avishkaar is the official Innovation Club of Basaveshwar Engineering College — a platform that fosters creativity, entrepreneurship, and real-world problem-solving among students. The club operates under BEC's IIC (Institution's Innovation Council) framework, encouraging students to ideate, prototype, and pitch solutions that matter.",
    vision: "To create a culture of innovation, creativity, and entrepreneurship among students — encouraging them to develop solutions for real-world problems and nurturing the next generation of inventors, startups, and changemakers from BEC.",
    mission: [
      "To encourage creative thinking, problem-solving, and a solutions-first mindset among all students.",
      "To support students in developing innovative projects, prototypes, and startup ideas.",
      "To promote entrepreneurship awareness through workshops, EDP sessions, and startup interactions.",
      "To collaborate with industries, BEC STEP, research institutions, and IIC-affiliated programs.",
      "To organize ideathons, hackathons, innovation quizzes, and idea competitions throughout the year."
    ],
    objectives: [
      "Promote an innovation and research culture across all departments at BEC.",
      "Organize ideathons, hackathons, and innovation competitions every semester.",
      "Provide guidance on patents, startup registration, and incubation through BEC STEP.",
      "Conduct workshops, EDP sessions, and training programs on innovation and entrepreneurship.",
      "Encourage interdisciplinary collaboration among students from different branches.",
      "Recognize outstanding innovators through Annual Innovation Awards."
    ],
    actionPlan: [
      {
        month: "Month 1",
        title: "Orientation & Ideation — Building the Foundation",
        subtitle: "Onboarding members, holding ideation workshops, and visiting STEP.",
        bullets: [
          "Formation of Student Committee — Lead, Co-Lead, Treasurer, and functional teams.",
          "Club Constitution and Guidelines session — objectives, code of conduct, and membership rules.",
          "Orientation Session — Introduction to innovation, creativity, and entrepreneurship.",
          "Member registration drive — open to all students across branches and years.",
          "Session on Ideation — how to identify problems and generate viable solutions.",
          "Ideation Workshop — hands-on brainstorming, mind-mapping, and SCAMPER exercises.",
          "Visit to BEC STEP — exposure to incubated startups and real innovation ecosystems."
        ],
        outcome: "Club fully formed, members onboarded, and every student leaves with at least one documented idea."
      },
      {
        month: "Month 2",
        title: "Development & Community — From Ideas to Action",
        subtitle: "Mentoring, startup panels, community visits, and prototyping setups.",
        bullets: [
          "Panel Discussion with BEC Startups — students interact with founders and learn from real journeys.",
          "Participation in all IIC 8.0 activities (1st and 2nd Quarter events).",
          "Community Visit — students identify real-world problems from the community to solve.",
          "Idea Competition — teams present their concepts to a faculty and peer panel.",
          "Workshop on EDP (Entrepreneurship Development Programme) — business thinking and startup basics."
        ],
        outcome: "Students gain external exposure, sharpen their ideas through competition, and begin understanding the startup ecosystem."
      },
      {
        month: "Month 3",
        title: "Hackathon, Refinement & Showcase",
        subtitle: "Hackathons, formal pitching, and launching the Innovation Awards.",
        bullets: [
          "Idea Hackathon — intensive build session where teams develop prototypes or MVPs.",
          "Innovation Quiz — testing knowledge of innovation, technology, and entrepreneurship.",
          "Idea Selection — faculty and IIC panel shortlist the most promising concepts.",
          "Participation in all IIC 8.0 activities (3rd and 4th Quarter events).",
          "Final Pitching of the Idea — selected teams pitch to principal, faculty, and external jury.",
          "Annual Innovation Awards — recognizing the best innovators, prototypes, and ideas of the year."
        ],
        outcome: "Top ideas pitched formally to an institutional panel; outstanding innovations recognized and recommended for incubation or further development."
      }
    ],
    weekWise: [
      { period: "Week 1", activities: "Formation of Student Committee and club guidelines session." },
      { period: "Week 2", activities: "Orientation to innovation and entrepreneurship; member registration." },
      { period: "Week 3", activities: "Session on Ideation and Ideation Workshop." },
      { period: "Week 4", activities: "Visit to BEC STEP — exposure to incubated startups." },
      { period: "Week 5", activities: "Panel discussion with BEC startup founders." },
      { period: "Week 6–7", activities: "IIC 8.0 activities (1st & 2nd Quarter) and Community Visit." },
      { period: "Week 8", activities: "Idea Competition — team presentations to faculty panel." },
      { period: "Week 9", activities: "Workshop on EDP — entrepreneurship development and business thinking." },
      { period: "Week 10", activities: "Idea Hackathon — prototype and MVP development sprint." },
      { period: "Week 11", activities: "Innovation Quiz and Idea Selection by faculty & IIC panel." },
      { period: "Week 12", activities: "Final Idea Pitching, Annual Innovation Awards, and reflection." }
    ],
    expectedOutcomes: [
      "A fully functional Innovation Club with structured teams and clear processes.",
      "Successful organization of at least one Ideathon, one Hackathon, and one Idea Competition.",
      "Top student ideas shortlisted for incubation or further development through BEC STEP.",
      "Active participation in IIC 8.0 quarterly activities.",
      "Annual Innovation Awards recognizing outstanding student innovators.",
      "Foundation laid for patents, startup registrations, and prototype development in subsequent semesters."
    ]
  },
  {
    id: "cinelab",
    name: "CINELAB",
    wing: "Holistic Development Wing",
    clubType: "Photography & Videography Club",
    icon: Camera,
    themeColor: "emerald",
    description: "CineLab is BEC's visual storytelling club, dedicated to building photography and videography skills that go beyond hobby-level — developing students into portfolio-ready visual creators prepared for professional opportunities in media and content.",
    vision: "To build a community of skilled visual storytellers at BEC — developing photography and videography to a level that opens real professional doors, whether through freelance work, curated portfolios, or careers in media and content creation.",
    mission: [
      "To equip every member with a strong technical foundation in photography and videography.",
      "To help each member build a personal portfolio of professional-quality work.",
      "To develop storytelling instincts alongside technical skills — communicating ideas through visuals.",
      "To foster a collaborative, feedback-driven culture where members actively support each other's growth.",
      "To culminate the semester with a public exhibition at Spectrum Week showcasing club talent."
    ],
    objectives: [
      "Build technical proficiency in camera operation, lighting, composition, and editing.",
      "Develop visual storytelling sensibility — creative vision, not just technical skill.",
      "Help every member produce at least one portfolio-ready project.",
      "Create CineLab's visible presence on campus through published content and visual events.",
      "Represent BEC at media and photography competitions."
    ],
    actionPlan: [
      {
        month: "Month 1",
        title: "SEE — Train the Eye",
        subtitle: "Camera operations, manual mode mastery, composition principles, and golden hour shoots.",
        bullets: [
          "Member kickoff and ice-breaker shoot — first hands-on camera session.",
          "Gear orientation: DSLR, mirrorless, and smartphone camera fundamentals.",
          "Manual mode mastery: aperture, shutter speed, ISO — the exposure triangle.",
          "Natural light workshop: direction, quality, golden hour, and blue hour shooting.",
          "Composition principles: rule of thirds, leading lines, negative space, and color theory.",
          "Golden hour assignment and composition challenge — first graded shoot."
        ],
        outcome: "Members develop foundational photography skills and the instinct to see great shots."
      },
      {
        month: "Month 2",
        title: "CREATE — Build the Craft",
        subtitle: "Videography basics, video scripting, and editing toolkits.",
        bullets: [
          "Introduction to videography — frame rates, stabilization, and shot list planning.",
          "Reels and short video production — structure, pacing, and visual storytelling.",
          "Photo and video editing workshops: Lightroom, Premiere Pro, or mobile editing tools.",
          "Storytelling structure for photographers: series photography and visual narratives.",
          "Intermediate challenge: produce a short photo essay or 30–60 second video piece.",
          "Peer feedback and critique sessions for all submitted work."
        ],
        outcome: "Members produce first complete photo essays and short video pieces."
      },
      {
        month: "Month 3",
        title: "EXPRESS — Share the Story",
        subtitle: "Developing final portfolios and holding exhibitions at Spectrum Week.",
        bullets: [
          "Narrative-driven final project — each member produces a portfolio piece with full creative ownership.",
          "Portfolio curation session — selecting, editing, and presenting best work.",
          "Collaborative film project — a short documentary or feature produced by the full club.",
          "Spectrum Week Exhibition: public showcase of CineLab work open to the entire college.",
          "Reflection and growth review — planning for next cycle."
        ],
        outcome: "Each member exits with a curated portfolio; public exhibition establishes CineLab's visual identity at BEC."
      }
    ],
    weekWise: [
      { period: "Week 1–2", activities: "Kickoff, gear orientation, manual mode, and first assignment." },
      { period: "Week 3–4", activities: "Light and composition workshop, color theory, challenge shoot." },
      { period: "Week 5–6", activities: "Videography basics, reels structure, and editing introduction." },
      { period: "Week 7–8", activities: "Photo essays, editing workshops, and peer critique sessions." },
      { period: "Week 9–10", activities: "Final project briefing, portfolio planning, and narrative work." },
      { period: "Week 11–12", activities: "Portfolio curation, collaborative film, Spectrum Week exhibition." }
    ]
  },
  {
    id: "spectrum-literary-club",
    name: "SPECTRUM LITERARY CLUB",
    wing: "Holistic Development Wing",
    clubType: "Literary Club",
    icon: BookOpen,
    themeColor: "emerald",
    description: "The Spectrum Literary Club is BEC's community for readers, writers, speakers, and thinkers — a space where language is celebrated, ideas are sharpened, and students find their voice through creative writing, debate, storytelling, and public speaking.",
    vision: "To create a literary culture at BEC where students move from passive consumers of language to active, confident creators and communicators — building skills that serve them in every dimension of their personal, academic, and professional lives.",
    mission: [
      "To build a reading culture and develop strong vocabulary and expression among members.",
      "To train students in creative and analytical writing — poetry, essays, articles, and stories.",
      "To develop public speaking, debate, and elocution skills through structured sessions and competitions.",
      "To organize a Literary Fest at the end of the semester as a campus-wide celebration of language.",
      "To publish a monthly club newsletter featuring the best written works of members."
    ],
    objectives: [
      "Build foundational reading habits, vocabulary, and comfort with literary expression.",
      "Develop structured writing skills across multiple formats — poetry, essays, and storytelling.",
      "Create confident public speakers and debaters through competitions and workshops.",
      "Publish a monthly digital newsletter featuring member contributions.",
      "Host a Literary Fest bringing the college community together around language and ideas."
    ],
    actionPlan: [
      {
        month: "Month 1",
        title: "THINK — Beginning the Journey with Words (March)",
        subtitle: "Extempore speaking, book reviews, word games, and debate practices.",
        bullets: [
          "Introduction session: word chain, vocabulary games, and favorite quote sharing.",
          "Introduction to literature: poetry, articles, essays, and short stories.",
          "Creative writing practice: articles and poems on assigned themes.",
          "Reading and Sharing Circle — members present their first written work.",
          "Extempore competition: 1-minute thinking, 2-minute speaking on surprise topics.",
          "Structured debate practice — building arguments and counter-arguments.",
          "Book Review Session — students present 3–5 minute reviews of a chosen book."
        ],
        outcome: "Members build comfort with language, discover strengths, and produce first written and spoken pieces."
      },
      {
        month: "Month 2",
        title: "WRITE — Where Ink Flows (April)",
        subtitle: "Poetry workshops, debate competitions, storytelling, and newsletters.",
        bullets: [
          "Poetry Writing Workshop: rhyme, rhythm, imagery, metaphors, and types of poetry.",
          "Theme-based poetry writing on 'Hope' or 'Change.'",
          "Structured Debate Competition — teams for and against, rebuttal practice.",
          "Storytelling Techniques Workshop: plot, conflict, climax, and resolution.",
          "Storytelling Competition with moral or inspirational themes.",
          "Literary Quiz: authors, novels, quotes, and idioms.",
          "Monthly Newsletter compilation and release — best poems, stories, and articles."
        ],
        outcome: "Members produce polished written works, develop debate skills, and publish the first newsletter."
      },
      {
        month: "Month 3",
        title: "EXPRESS — Read Less. Think More. Speak Boldly. (May)",
        subtitle: "Critical thinking, elocution challenges, and holding the Literary Fest.",
        bullets: [
          "Critical Thinking Circle — real-world issues, quote analysis, and defending viewpoints.",
          "Elocution Competition: prepared speeches on leadership, society, and values.",
          "Advanced Article Writing Workshop — opinion-based and analytical writing.",
          "Literary Fest: inter-class debate, slam poetry, and showcase of best articles and poems.",
          "Valedictory session and reflection: 'Who Have I Become in 3 Months?'"
        ],
        outcome: "Members emerge as confident writers, speakers, and thinkers; Literary Fest establishes the club's campus identity."
      }
    ],
    weekWise: [
      { period: "Week 1 (March)", activities: "Introduction, word games, quote sharing, 5-line writing task." },
      { period: "Week 2 (March)", activities: "Literature forms, creative writing practice, sharing circle." },
      { period: "Week 3 (March)", activities: "Extempore, group discussion, debate practice, speech crafting." },
      { period: "Week 4 (March)", activities: "Book review, character analysis, literary discussion, reflection." },
      { period: "Weeks 5–8 (April)", activities: "Poetry, debate competition, storytelling workshop, newsletter." },
      { period: "Weeks 9–12 (May)", activities: "Critical thinking, elocution, article writing, Literary Fest." }
    ]
  },
  {
    id: "eco-club",
    name: "ECO CLUB",
    wing: "Holistic Development Wing",
    clubType: "Environment Club",
    icon: Leaf,
    themeColor: "emerald",
    description: "The BEC Eco Club is the environmental awareness and sustainability club of BEC, dedicated to building a generation of environmentally conscious students who take meaningful action — on campus, in the community, and in their personal choices.",
    vision: "To create a culture of environmental responsibility and sustainable thinking at BEC — inspiring students to understand, respect, and actively protect the natural world through education, direct action, and advocacy.",
    mission: [
      "To raise environmental awareness through campaigns, workshops, and educational events.",
      "To organize meaningful green initiatives on campus: tree planting, waste segregation, and clean-up drives.",
      "To educate students on sustainability, climate change, renewable energy, and environmental science.",
      "To develop student-led environmental projects that create measurable impact on campus and community.",
      "To connect with external organizations and competitions working on environmental causes."
    ],
    objectives: [
      "Develop environmental awareness and ecological literacy among BEC students.",
      "Execute at least three campus-level green initiatives per semester.",
      "Create visible environmental impact through planting, clean-up, and awareness campaigns.",
      "Build a student community that leads by example in sustainable living.",
      "Participate in national environmental campaigns and competitions."
    ],
    actionPlan: [
      {
        month: "Month 1",
        title: "LEARN — Environmental Literacy and Awareness",
        subtitle: "Audit campus energy, understand climate patterns, and launch Eco Pledge.",
        bullets: [
          "Introduction to BEC Eco Club — vision, why it matters, and member onboarding.",
          "Workshop: Understanding Our Environment — biodiversity, ecosystems, and human impact.",
          "Climate change awareness session — causes, consequences, and student action.",
          "Campus environmental audit — mapping waste, water use, and energy patterns at BEC.",
          "Documentary screening and structured reflection discussion.",
          "Launch of 'Eco Pledge' campaign — members publicly commit to one sustainable habit."
        ],
        outcome: "Members understand environmental challenges and begin thinking as responsible ecological citizens."
      },
      {
        month: "Month 2",
        title: "ACT — Green Initiatives on Campus",
        subtitle: "Tree plantation drives, composting workshops, and clean-up drives.",
        bullets: [
          "Tree Plantation Drive: planting trees on BEC campus with labeling and care assignments.",
          "Campus Clean-Up Drive: organized clean-up of college grounds, canteen, and common areas.",
          "Waste Segregation Campaign: educating students and staff on dry/wet waste separation.",
          "Workshop on sustainable practices: composting, rainwater harvesting, and energy conservation.",
          "Eco Art Competition — artworks created from recycled or natural materials.",
          "Collaboration with local NGOs or civic bodies on community environment projects."
        ],
        outcome: "Visible green improvements on campus; members develop practical skills in environmental action."
      },
      {
        month: "Month 3",
        title: "ADVOCATE — Inspire, Campaign, and Showcase",
        subtitle: "Environment Week showcases, eco quizzes, and impact reports.",
        bullets: [
          "Environment Week at BEC: themed daily activities — water, energy, and biodiversity days.",
          "Inter-class eco competition: poster-making, eco quiz, and green project pitches.",
          "Student-led project presentations: outcomes, changes, and future commitments.",
          "Publish an Eco Club impact report documenting the semester's green actions.",
          "Participation in external environmental competitions, essay contests, or awareness campaigns.",
          "Reflection and goal-setting session for the next semester."
        ],
        outcome: "Environment Week creates campus-wide impact; students become active advocates for sustainability."
      }
    ],
    weekWise: [
      { period: "Week 1", activities: "Introduction, environment workshop, and campus audit." },
      { period: "Week 2", activities: "Climate session, documentary screening, Eco Pledge launch." },
      { period: "Week 3–4", activities: "Tree plantation drive and waste segregation campaign." },
      { period: "Week 5–6", activities: "Clean-up drive, sustainability workshop, eco art competition." },
      { period: "Week 7–8", activities: "NGO collaboration and community green project." },
      { period: "Week 9–10", activities: "Environment Week planning and execution." },
      { period: "Week 11–12", activities: "Project presentations, impact report, and reflection." }
    ]
  }
];
