"use client";

import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { motion } from "motion/react";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/BEC1963",
    color: "bg-[#1877F2] text-white",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://x.com/1963Bec",
    color: "bg-[#1DA1F2] text-white",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/becbgk_official/",
    color: "bg-[#E4405F] text-white",
  },
];

export function FollowUsSection() {
  return (
    <section className="w-full bg-white border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-8">
          <h3 className="text-lg font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
            Follow us on
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${social.color} p-3 rounded-full shadow-sm hover:shadow-md transition-shadow flex items-center justify-center`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Icon className="size-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
