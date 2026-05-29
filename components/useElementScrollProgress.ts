"use client";

import { useEffect, type RefObject } from "react";
import {
  scroll,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ElementScrollOffset = any[];

export function useElementScrollProgress(
  target: RefObject<HTMLElement | null>,
  offset: ElementScrollOffset
): MotionValue<number> {
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const targetElement = target.current;
    if (!targetElement) return;

    return scroll(
      (_progress, { y }) => {
        scrollYProgress.set(y.progress);
      },
      {
        target: targetElement,
        offset,
      }
    );
  }, [target, offset, scrollYProgress]);

  return scrollYProgress;
}
