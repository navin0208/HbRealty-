"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export default function LazyVideo({ src, className, ...props }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "200px" });
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldLoad(true);
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && (
        <video {...props} className="w-full h-full object-cover">
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
