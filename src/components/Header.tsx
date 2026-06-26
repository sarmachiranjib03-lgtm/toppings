"use client";

import Magnetic from "./Magnetic";

export default function Header() {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none mix-blend-difference">
      {/* Brand Logo - Magnetic */}
      <div className="pointer-events-auto">
        <Magnetic range={40} strength={0.3}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-xs tracking-[0.3em] text-cream uppercase cursor-none"
            data-cursor="magnetic"
          >
            AETHERIS //
          </button>
        </Magnetic>
      </div>

      {/* Nav Menu Items */}
      <nav className="hidden md:flex items-center gap-10 pointer-events-auto">
        <Magnetic range={30} strength={0.25}>
          <button
            onClick={() => handleScrollToSection("philosophy")}
            className="font-mono text-[10px] tracking-[0.2em] text-cream uppercase cursor-none py-2 px-4"
            data-cursor="pointer"
          >
            01 / PHILOSOPHY
          </button>
        </Magnetic>
        <Magnetic range={30} strength={0.25}>
          <button
            onClick={() => handleScrollToSection("portfolio")}
            className="font-mono text-[10px] tracking-[0.2em] text-cream uppercase cursor-none py-2 px-4"
            data-cursor="pointer"
          >
            02 / CASE STUDIES
          </button>
        </Magnetic>
        <Magnetic range={30} strength={0.25}>
          <button
            onClick={() => handleScrollToSection("capabilities")}
            className="font-mono text-[10px] tracking-[0.2em] text-cream uppercase cursor-none py-2 px-4"
            data-cursor="pointer"
          >
            03 / CAPABILITIES
          </button>
        </Magnetic>
      </nav>

      {/* Contact CTA - Magnetic */}
      <div className="pointer-events-auto">
        <Magnetic range={40} strength={0.3}>
          <button
            onClick={() => handleScrollToSection("contact")}
            className="font-mono text-xs tracking-[0.2em] border border-cream/30 hover:border-cream/80 transition-colors duration-300 rounded-full px-5 py-2 text-cream uppercase cursor-none"
            data-cursor="magnetic"
          >
            START PROJECT
          </button>
        </Magnetic>
      </div>
    </header>
  );
}
