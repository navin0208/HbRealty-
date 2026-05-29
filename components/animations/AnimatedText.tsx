"use client";
// ── components/animations/AnimatedText.tsx ──
// 🚀 ANTIGRAVITY — Word-by-word staggered text reveal

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
}

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: i * 0.04,
    },
  }),
};

export default function AnimatedText({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.04,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-5%" });

  const words = children.split(" ");

  return (
    <Tag className={className} ref={containerRef as React.RefObject<HTMLHeadingElement>}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.25em" }}
        >
          <motion.span
            className="inline-block"
            variants={wordVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={delay / 1000 + i * stagger}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
