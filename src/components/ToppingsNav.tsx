"use client";

import { useState, useEffect, useRef } from "react";
import Magnetic from "./Magnetic";

export default function ToppingsNav() {
  const links = ["Menu", "Visit"];
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Check if at top
      if (currentScrollY < 60) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);

        // 2. Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY.current) {
          // Scroll down - hide
          setIsVisible(false);
        } else {
          // Scroll up - show
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const targetId = id === "Menu" ? "menu-teaser" : id.toLowerCase();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] py-6 md:py-8
        ${isAtTop 
          ? "bg-transparent border-transparent" 
          : "bg-[#f5efe1]/95 backdrop-blur-md border-b border-[#2a2522]/10 shadow-sm"
        }
      `}
      style={{
        transform: isVisible 
          ? "perspective(1000px) rotateX(0deg) translateY(0)" 
          : "perspective(1000px) rotateX(-90deg) translateY(-100%)",
        transformOrigin: "top",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      
      {/* Brand logo - Luxury Serif (Cormorant) in Terracotta */}
      <div>
        <Magnetic range={40} strength={0.3}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-serif tracking-tight text-terracotta font-medium uppercase text-3xl md:text-4xl lg:text-5xl"
            data-cursor="magnetic"
          >
            TOPPINGS
          </button>
        </Magnetic>
      </div>

      {/* Right navigation links */}
      <nav className="flex items-center gap-8 md:gap-12">
        {links.map((link) => (
          <Magnetic key={link} range={25} strength={0.2}>
            <button
              onClick={() => handleScrollToSection(link)}
              className="font-sans tracking-[0.2em] text-charcoal/80 hover:text-terracotta transition-colors duration-300 uppercase py-2 font-bold text-[13px] md:text-[15px] lg:text-[16px]"
              data-cursor="pointer"
            >
              {link}
            </button>
          </Magnetic>
        ))}
      </nav>

    </header>
  );
}
