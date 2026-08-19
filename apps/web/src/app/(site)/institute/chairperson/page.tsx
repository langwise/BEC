import { LeadershipMessage } from "@/components/common/leadership-message";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Chairman's Message",
  description:
    "Message from the Chairman of B.V.V. Sangha, the trust leading 190+ institutions that founded BEC Bagalkote in 1963, on its vision for quality technical education and social change.",
  path: "/institute/chairperson",
});

const message = `
Basaveshwar Engineering College (BEC) is a premier Technical Institute recognised at National level catering to the needs of rural masses in Northern part of Karnataka. Ever since its inception in 1963 with only three disciplines, now BEC has 10 UG & 3 PG programmes and is recognised at National level by securing NIRF ranking persistently.

I have been very closely associated with BEC from the day I took charge as the Chairman of B. V. V. Sangha and in my opinion, the faculty have persistently worked hard to envisage the vision of Basaveshwar Veershaiva Vidya Vardhak Sangha (BVVS) by starting new courses in several disciplines and stood the testimony of time by accomplishing many feats.

My future endeavour will be to involve all worthy staff in the ventures of BEC with a view to enhance the quality of technical education and make its presence profoundly felt not only within India but also at International level. At BEC, we create opportunities to all stakeholders not only to learn, but also for them to experience the fulfilment that comes from sharing their learning skills with others.

We at BVVS strongly believe in the philosophy of Lord Basaveshwar of 12th century, "Work is Worship" and also inculcate a concrete value system amongst the faculty and students. The B. V. V. Sangha has an everlasting commitment for developing professionals with humane and pragmatic approach to bring about change in the society.

I express my sincere thanks to all the members for the confidence showered on me to lead 190+ institutions ranging from kindergarten to research with profound humility. I seek absolute support and commitment from within and outside to steer BVVS to new panorama and array of success.
`;

export default function ChairmanMessagePage() {
  return (
    <LeadershipMessage
      eyebrow="Leadership Message"
      title="Chairman's Vision"
      subtitle="Leading 190+ institutions with a commitment to excellence and social transformation."
      name="Dr. Veeranna C. Charantimath"
      role="Chairman, B. V. V. Sangha, Bagalkote"
      image={asset("governance/chairman.jpg")}
      imageFit="cover"
      imageAspectRatio="aspect-[3/4]"
      columnRatio="lg:grid-cols-[0.75fr_1.55fr]"
      quote={{
        text: "Work is Worship.",
        attribution: "Lord Basaveshwar, 12th Century",
      }}
      message={message}
    />
  );
}
