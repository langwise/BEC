import {
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Instagram,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";

const internalQuickLinks = [
  { label: "About Us", href: "/institute/about" },
  { label: "Programmes", href: "/programs/programmes" },
  { label: "Administration", href: "/administration/governance" },
  { label: "Accreditation & Quality", href: "/accreditation" },
  { label: "Student Life", href: "/student-life/overview" },
  { label: "Alumni", href: "/alumni" },
];

const internalResources = [
  { label: "Departments", href: "/departments" },
  { label: "Library", href: "/facilities/library" },
  { label: "Scholarships", href: "/programs/scholarships" },
  { label: "Examinations", href: "/programs/examinations" },
  { label: "Contact Us", href: "/institute/contact" },
  { label: "RTI", href: "/administration/disclosures/rti" },
];

const externalPortals = [
  { label: "Results Portal", href: "http://119.161.97.238:8080/Autonomous/" },
  { label: "Admissions 2025-26", href: "http://119.161.97.228:8080/AdmissionInquiry/" },
  { label: "Grievance Portal", href: "http://119.161.97.228:8080/GrievancyPortal" },
  { label: "Faculty Profiles (IRINS)", href: "https://becbgk.irins.org/" },
  { label: "Web OPAC (Library)", href: "http://119.161.97.235/" },
  { label: "Webmail", href: "https://mail.becbgk.edu/" },
];

const statutoryLinks = [
  { label: "VTU, Belagavi", href: "https://vtu.ac.in/" },
  { label: "AICTE", href: "https://www.aicte-india.org/" },
  { label: "AICTE Feedback", href: "https://www.aicte-india.org/feedback/" },
  { label: "National Scholarship Portal", href: "https://nsp.gov.in/" },
  { label: "SSP Karnataka", href: "https://ssp.postmatric.karnataka.gov.in" },
  { label: "About Bagalkote", href: "https://bagalkot.nic.in/en/" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <div>
            <h3 className="font-bold text-lg mb-4">
              Basaveshwar Engineering College
            </h3>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed mb-4">
              A premier technical institution established in 1963, dedicated to
              excellence in education, research, and innovation. Accredited by
              NBA and NAAC.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://www.facebook.com/BEC1963"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/1963Bec"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/becbgk_official/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {internalQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {internalResources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Online Portals</h3>
            <ul className="space-y-2 text-sm">
              {externalPortals.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    {link.label}
                    <ExternalLinkIcon className="h-3 w-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-secondary-foreground/80">
                  S. Nijalingappa Vidyanagar, Bagalkot - 587102, Karnataka,
                  India
                </span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-secondary-foreground/80">
                  +91-8354-234060 / 234204
                </span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-secondary-foreground/80">
                  principal@becbgk.edu
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-10 pt-6">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-secondary-foreground/80">
            {statutoryLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-6 pt-6 text-center text-sm text-secondary-foreground/70">
          <p>
            &copy; {new Date().getFullYear()} Basaveshwar Engineering College
            (Autonomous), Bagalkot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
