"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactNode;
  range?: number; // Distance in pixels to activate magnetism
  strength?: number; // Percentage of mouse travel to pull element (0 to 1)
}

export default function Magnetic({ children, range = 60, strength = 0.35 }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use GSAP quickTo for ultra-fluid interpolation (elastic effect)
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = el.getBoundingClientRect();
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Calculate distance from center
      const distance = Math.hypot(distanceX, distanceY);
      
      // Proximity threshold is the button boundary plus the range parameter
      const activeRange = Math.max(rect.width, rect.height) / 2 + range;

      if (distance < activeRange) {
        // Magnetize: pull towards cursor coordinates
        xTo(distanceX * strength);
        yTo(distanceY * strength);
      } else {
        // Snap back to original position
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength]);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
