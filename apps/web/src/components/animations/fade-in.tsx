"use client";

import { motion, useInView, HTMLMotionProps } from "motion/react";
import { useRef } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  fullWidth = false,
  className,
  ...props
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
      className={`${fullWidth ? "w-full" : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
