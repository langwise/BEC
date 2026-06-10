"use client";

import { motion, HTMLMotionProps } from "motion/react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
}

/**
 * Static layout wrapper. Entrance animations were removed site-wide so content
 * always renders immediately; the `delay`/`direction` props are accepted (and
 * ignored) so existing call sites keep compiling.
 */
export function FadeIn({
  children,
  delay: _delay,
  direction: _direction,
  fullWidth = false,
  className,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      className={`${fullWidth ? "w-full" : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
