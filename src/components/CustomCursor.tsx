"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorInner = cursorInnerRef.current;
    const cursorText = cursorTextRef.current;
    
    if (!cursor || !cursorInner || !cursorText) return;

    // Check if device has pointer (mouse)
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      cursor.style.display = "none";
      return;
    }

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    const speed = 0.15; // smooth lag speed

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Smooth movement using GSAP ticker
    const updatePosition = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    };

    gsap.ticker.add(updatePosition);

    // Mouse hover delegate for custom actions
    const onMouseEnterDelegate = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement;
      if (!target) return;

      const cursorType = target.getAttribute("data-cursor");

      if (cursorType === "view") {
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: "#e11d48", // crimson
          borderColor: "transparent",
          mixBlendMode: "normal",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorInner, { scale: 0, duration: 0.2 });
        cursorText.textContent = "VIEW";
        gsap.to(cursorText, { scale: 1, opacity: 1, color: "#ffffff", duration: 0.3 });
      } else if (cursorType === "drag") {
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: "#00f0ff", // neon-blue
          borderColor: "transparent",
          mixBlendMode: "normal",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorInner, { scale: 0, duration: 0.2 });
        cursorText.textContent = "DRAG";
        gsap.to(cursorText, { scale: 1, opacity: 1, color: "#080808", duration: 0.3 });
      } else if (cursorType === "magnetic") {
        gsap.to(cursor, {
          width: 50,
          height: 50,
          backgroundColor: "rgba(13, 13, 13, 0.08)",
          borderColor: "#e11d48",
          mixBlendMode: "normal",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorInner, { scale: 1.5, backgroundColor: "#e11d48", duration: 0.2 });
      } else if (cursorType === "pointer") {
        gsap.to(cursor, {
          width: 45,
          height: 45,
          backgroundColor: "rgba(13, 13, 13, 0.08)",
          borderColor: "transparent",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorInner, { scale: 0, duration: 0.2 });
      }
    };

    const onMouseLeaveDelegate = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement;
      if (!target) return;

      // Reset cursor styling
      gsap.to(cursor, {
        width: 32,
        height: 32,
        backgroundColor: "transparent",
        borderColor: "#f5f4f0",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorInner, {
        scale: 1,
        backgroundColor: "#f5f4f0",
        duration: 0.2,
      });
      gsap.to(cursorText, { scale: 0, opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mouseover", onMouseEnterDelegate);
    window.addEventListener("mouseout", onMouseLeaveDelegate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseEnterDelegate);
      window.removeEventListener("mouseout", onMouseLeaveDelegate);
      gsap.ticker.remove(updatePosition);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream flex items-center justify-center mix-blend-difference"
      style={{ transform: "translate3d(-50%, -50%, 0)" }}
    >
      <div
        ref={cursorInnerRef}
        className="w-1.5 h-1.5 bg-cream rounded-full transition-transform duration-300"
      />
      <span
        ref={cursorTextRef}
        className="absolute text-[10px] tracking-[0.2em] font-mono font-bold scale-0 opacity-0 transition-all duration-300"
      />
    </div>
  );
}
