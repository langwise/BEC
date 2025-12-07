"use client";

import { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "#",
    color: "bg-white text-muted-foreground hover:bg-primary hover:text-primary-foreground border-b border-border last:border-0",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "#",
    color: "bg-white text-muted-foreground hover:bg-primary hover:text-primary-foreground border-b border-border last:border-0",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "#",
    color: "bg-white text-muted-foreground hover:bg-primary hover:text-primary-foreground border-b border-border last:border-0",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "#",
    color: "bg-white text-muted-foreground hover:bg-primary hover:text-primary-foreground border-b border-border last:border-0",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "#",
    color: "bg-white text-muted-foreground hover:bg-primary hover:text-primary-foreground border-b border-border last:border-0",
  },
];

export function SocialMediaSidebar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show social sidebar after scrolling past hero section (approximately 100vh)
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      setIsVisible(scrollPosition > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        >
          <div className="flex flex-col gap-0 shadow-lg">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`${social.color} p-2 transition-all duration-300 flex items-center justify-center group relative`}
                  aria-label={social.name}
                >
                  <Icon className="size-5" />

                  {/* Tooltip */}
                  <span className="absolute right-full mr-2 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {social.name}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
