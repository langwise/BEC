import { LeadershipMessage } from "@/components/common/leadership-message";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Principal's Message",
  description:
    "Message from Dr. B. R. Hiremath, Principal of BEC Bagalkote, on the college's vision for education, NIRF ranking, 100% NBA-accredited UG courses, NAAC and QS I-Gauge recognition.",
  path: "/administration/principal",
});

const message = `
Education plays a vital role in the overall development of the Society and Nation building. The role of education is not just limited to transferring theoretical knowledge to students. The true goal of education is to surpass beyond awarding degree or a certificate to the students. By Education, Mahatma Gandhi meant an overall development of an individual i.e. man-body, mind and spirit. The ultimate goal of education is to discover the meaning of life and its fulfilment for the benefit of mankind as well as for oneself.

The pursuit of education is to acquire knowledge to serve humanity with modest culture and wisdom but it is to be noted that, knowledge is not given but earned and character is not granted but cultivated. Basaveshwar Engineering College (BEC) not only focuses on the theoretical curriculum, but also assists in imparting practical knowledge leading to the overall development of a student personality from all perspectives.

In my opinion, what makes a good institution is - a highly knowledgeable & trained faculty, affluent library, opt teaching methods, autonomy to think and express oneself – which is part of a culture at BEC.
`;

const closingMessage = `
I firmly believe that, our College is more than a place to learn because it has learned faculty with skilled supporting staff and all the state-of-art infrastructure facilities. We provide an opportunity to grow by equipping oneself with everything required to achieve excellence.

At BEC, we ensure students get the best start to their future career to become smart and stately citizen of our glorious country, India. We all must remember that, "We cannot build the future for our students; however we can build our students to face the challenges for the future". Hence, I wish all our students a great success in all the future endeavours.
`;

const achievements = [
  "Secured NIRF ranking within 200",
  "100% accreditation of all UG courses by NBA",
  "Accreditation by NAAC of UGC",
  "Accredited by QS I-Gauge, UK",
  "Awarded E-lead certification by QS I-Gauge",
  "Received grant of Rs. 40.00 crores in TEQIP phases",
  "Selected by AICTE to setup IDEA lab worth Rs. 1.10 crores",
  "Recognised as Incubation Centre by IT-BT, GoK",
  "Placed in Gold Category by AICTE - CII Survey",
  "Started BE in AI & ML and M.Tech in Defence Technology with DRDO",
  "ILL 1:1 – 1000 Mbps bandwidth with wifi campus",
  "Smart Classrooms for Interactive Teaching & Learning",
];

export default function PrincipalMessagePage() {
  return (
    <LeadershipMessage
      eyebrow="Academic Leadership"
      title="Principal's Message"
      subtitle="Building students to face the challenges of the future."
      name="Dr. B. R. Hiremath"
      role="Principal, Basaveshwar Engineering College"
      image={asset("governance/principal/dr-b-r-hiremath.webp")}
      quote={{
        text: "Education is an overall development of an individual — body, mind and spirit.",
        attribution: "Mahatma Gandhi",
      }}
      message={message}
      achievements={achievements}
      closingMessage={closingMessage}
    />
  );
}
