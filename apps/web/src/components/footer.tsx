import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">University Institute</h3>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed mb-4">
              A premier institution dedicated to excellence in education,
              research, and innovation.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/institute/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/academics/programmes"
                  className="hover:text-primary transition-colors"
                >
                  Programmes
                </a>
              </li>
              <li>
                <a
                  href="/administration"
                  className="hover:text-primary transition-colors"
                >
                  Administration
                </a>
              </li>
              <li>
                <a
                  href="/research"
                  className="hover:text-primary transition-colors"
                >
                  Research
                </a>
              </li>
              <li>
                <a
                  href="/student-life"
                  className="hover:text-primary transition-colors"
                >
                  Student Life
                </a>
              </li>
              <li>
                <a
                  href="/alumni"
                  className="hover:text-primary transition-colors"
                >
                  Alumni
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/academics/calendar"
                  className="hover:text-primary transition-colors"
                >
                  Academic Calendar
                </a>
              </li>
              <li>
                <a
                  href="/facilities/library"
                  className="hover:text-primary transition-colors"
                >
                  Library
                </a>
              </li>
              <li>
                <a
                  href="/institute/campus"
                  className="hover:text-primary transition-colors"
                >
                  Campus
                </a>
              </li>
              <li>
                <a
                  href="/facilities"
                  className="hover:text-primary transition-colors"
                >
                  Facilities
                </a>
              </li>
              <li>
                <a
                  href="/institute/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/administration/disclosures/rti"
                  className="hover:text-primary transition-colors"
                >
                  RTI
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-secondary-foreground/80">
                  123 University Road, Campus City, State 123456
                </span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-secondary-foreground/80">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-secondary-foreground/80">
                  info@university.edu
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-10 pt-8 text-center text-sm text-secondary-foreground/70">
          <p>
            &copy; {new Date().getFullYear()} University Institute. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
