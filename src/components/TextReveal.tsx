"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  delay?: number;
  stagger?: number;
  duration?: number;
}

export default function TextReveal({
  text,
  className = "",
  tag = "h2",
  delay = 0,
  stagger = 0.015,
  duration = 1.4,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const Tag = tag;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    // Use gsap.context to isolate animations and prevent React 18 strict double-mount issues
    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll(".reveal-char");
      
      gsap.fromTo(
        chars,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: duration,
          delay: delay,
          stagger: stagger,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%", // Trigger when text is 90% from the top of the viewport
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, duration]);

  // Split text into words, then words into characters
  const words = text.split(" ");

  return (
    <Tag ref={containerRef as any} className={`clip-text inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="reveal-char inline-block translate-y-full transform-gpu"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
