"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * BookNook polish — Step 7 (optional animation requirement).
 * A tiny fade-and-rise wrapper: content starts slightly transparent and
 * low, then animates in the first time it scrolls into view.
 *
 * Why Framer Motion and not AOS? AOS needs a global init in a client
 * effect and its own CSS, and it fights Next.js App Router navigation.
 * Framer Motion is a React component — drop it around any section and
 * it just works, server pages included (this file is the client boundary).
 *
 * Usage (in a server page, e.g. src/app/page.tsx):
 *   import FadeIn from "../components/FadeIn";
 *   <FadeIn><h2>New Arrivals</h2>...</FadeIn>
 *   <FadeIn delay={0.1}>...</FadeIn>   // stagger, optional
 */
export default function FadeIn({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
