"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/animations/CustomCursor"),
  { ssr: false }
);

export default function GlobalCursorProvider() {
  return <CustomCursor />;
}
