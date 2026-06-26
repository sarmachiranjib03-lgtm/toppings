"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import { ArrowDown } from "lucide-react";

export default function ToppingsHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Staggered Character/Word Reveal for "TOPPINGS"
      gsap.to(".hero-reveal-char", {
        y: "0%",
        duration: 1.8,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.2,
      });

      // 2. Fade in sub-labels
      gsap.fromTo(
        ".hero-label-fade",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.8, stagger: 0.15 }
      );

      // 3. Weighted Scroll Parallax on the central image
      gsap.to(".hero-parallax-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("menu-teaser");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full bg-cream flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 overflow-hidden z-10"
    >
      
      {/* Decorative anchors in corners */}
      <div className="hero-label-fade flex justify-between items-start font-sans text-[9px] text-charcoal/40 uppercase tracking-[0.25em] z-10 w-full">
        <span>EST. — CAFE & RESTAURANT</span>
        <span>OPEN DAILY // 07:00 — LATE</span>
      </div>

      {/* Main Image Frame with Overlapping serif text */}
      <div className="relative my-auto w-full max-w-[88vw] mx-auto flex items-center justify-center h-[68vh] sm:h-[76vh]">
        
        {/* Parallax Image Frame */}
        <div className="absolute inset-0 w-full h-full overflow-hidden border border-charcoal/10 shadow-xl z-0 rounded-sm">
          <div className="hero-parallax-img relative w-full h-[120%] -top-[10%]">
            <Image
              src="/images/unnamed-hero.webp"
              alt="Toppings Premium Culinary Hero"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Dark warm overlay to give contrast to the overlaying text */}
            <div className="absolute inset-0 bg-charcoal/45" />
          </div>
        </div>

        {/* Small Left Offset Label */}
        <div className="hero-label-fade absolute left-4 sm:left-10 top-[32%] z-20 hidden md:block">
          <span className="font-serif text-[11px] text-cream/70 uppercase tracking-[0.3em] italic">
            Artisanal Cuisine
          </span>
        </div>

        {/* Massive Serif Overlay Title: "TOPPINGS" */}
        <div className="relative flex select-none z-10 overflow-hidden leading-none px-4">
          <div className="flex overflow-hidden">
            {"TOPPINGS".split("").map((char, idx) => (
              <span key={idx} className="inline-block overflow-hidden clip-text">
                <span className="hero-reveal-char inline-block translate-y-[110%] font-serif text-[14vw] sm:text-[13.5vw] font-normal tracking-tighter text-cream uppercase">
                  {char}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Small Right Offset Label */}
        <div className="hero-label-fade absolute right-4 sm:right-10 bottom-[32%] z-20 hidden md:block">
          <span className="font-serif text-[11px] text-cream/70 uppercase tracking-[0.3em] italic">
            Cafe & Restaurant
          </span>
        </div>

      </div>

      {/* Hero Footer Controls */}
      <div className="hero-label-fade flex flex-col sm:flex-row sm:items-end justify-between border-t border-charcoal/10 pt-6 gap-6 z-10 w-full">
        
        {/* Monospace Sub-headline statement */}
        <div className="max-w-md font-sans text-[9px] text-charcoal/50 uppercase tracking-[0.2em] leading-relaxed">
          <span>FLAVORS PILED HIGH.</span><br />
          <span className="text-terracotta">MEMORIES MADE OVER COFFEE.</span>
        </div>

        {/* Magnetic Scroll Down Indicator */}
        <div className="pointer-events-auto self-end sm:self-auto">
          <Magnetic range={40} strength={0.3}>
            <button
              onClick={handleScrollDown}
              className="group flex items-center gap-3 bg-charcoal hover:bg-terracotta px-6 py-3 rounded-full text-cream hover:text-white font-sans text-[9px] tracking-widest uppercase transition-colors duration-500 shadow-md"
              data-cursor="magnetic"
            >
              SCROLL DOWN
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </Magnetic>
        </div>

      </div>

    </section>
  );
}
