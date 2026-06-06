import { LeadershipMessage } from "@/components/common/leadership-message";
import { asset } from "@/lib/assets";

const message = `
Today, the technological developments across the Globe are remarkable and also galloping at a very rapid speed. The gap in synchronizing innovative technologies and the rich Indian value system is increasing at a startling pace. Hence, present day education imparted across technical institutes needs rethinking and new strategies must be envisaged.

The Technical Institutes under Basaveshwar Veerashaiva Vidya Vardhak Sangha are the artifact of a vision of excellence. Basaveshwar Engineering College (BEC), Bagalkote is one of the pioneering institutes serving stakeholders in northern Karnataka. The growth of the college since its inception in 1963 is commendable.

Some of the recent accomplishments include the introduction of BE-AIML, M.Tech Defence Technology, sanction of an AICTE Idea Lab worth ₹1.10 Cr, and accreditation of all UG programs. The college has utilized TEQIP grants effectively and is now ready for NEP-2020 implementation.

At BEC, promoting academic excellence, discipline, and strong practical exposure is our culture. We prepare students to face societal challenges and global demands through dedication, commitment, and continuous excellence.
`;

export default function DirectorMessagePage() {
  return (
    <LeadershipMessage
      eyebrow="Leadership Message"
      title="Director's Vision"
      subtitle="Driving excellence in technical education for over six decades."
      name="Dr. R. N. Herkal"
      role="Director of Technical Education, B. V. V. Sangha, Bagalkote"
      image={asset("governance/director/cine9670.webp")}
      message={message}
    />
  );
}
