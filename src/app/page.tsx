"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";

import ToppingsNav from "@/components/ToppingsNav";
import ToppingsHero from "@/components/ToppingsHero";
import TextReveal from "@/components/TextReveal";
import CaseStudyCard from "@/components/CaseStudyCard";
import Magnetic from "@/components/Magnetic";
import { ArrowUpRight, Compass, Layers, Coffee, Star, MapPin } from "lucide-react";

// Instagram Inline SVG Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Facebook Inline SVG Icon
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


// Menu Culinary Artifacts
const menuArtifacts = [
  {
    id: "dish-hero",
    title: "SIGNATURE DISH HERO",
    category: "SIGNATURE SELECTION",
    index: "01",
    imageUrl: "/images/unnamed-hero.webp",
    year: "HOUSE SPECIAL",
  },
  {
    id: "dish1",
    title: "TOPPED PANCAKES",
    category: "SIGNATURE CULINARY",
    index: "02",
    imageUrl: "/images/6.webp",
    year: "SERVED ALL DAY",
  },
  {
    id: "dish2",
    title: "SLOW DRIP COFFEE",
    category: "ARTISANAL ESPRESSO",
    index: "03",
    imageUrl: "/images/2.webp",
    year: "SINGLE ORIGIN",
  },
  {
    id: "dish3",
    title: "GELATO & CRUMBLE",
    category: "MOUTHFEEL METRICS",
    index: "04",
    imageUrl: "/images/3.webp",
    year: "BAKED FRESH DAILY",
  },
  {
    id: "dish4",
    title: "SPECIALTY COFFEE",
    category: "ROASTED BREWS",
    index: "05",
    imageUrl: "/images/4.webp",
    year: "ORIGIN SELECTION",
  },
  {
    id: "dish5",
    title: "ARTISANAL DELIGHT",
    category: "CRAFT PASTRY",
    index: "06",
    imageUrl: "/images/5.webp",
    year: "SEASONAL CHOICE",
  },
  {
    id: "dish6",
    title: "FINEST SELECTION",
    category: "EXCLUSIVE BREW",
    index: "07",
    imageUrl: "/images/1.webp",
    year: "LIMITED EDITION",
  },
];

export default function Home() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const pinSection = pinSectionRef.current;
      const horizontalContainer = horizontalContainerRef.current;

      if (pinSection && horizontalContainer) {
        // 1. Horizontal Scroll translation for the Menu Section (Pinned)
        const scrollTween = gsap.to(horizontalContainer, {
          x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: pinSection,
            pin: true,
            scrub: 0.1,
            start: "top top",
            end: () => `+=${horizontalContainer.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        });

        // 2. Parallax effect for horizontal slides images
        const images = gsap.utils.toArray(".image-parallax");
        images.forEach((img: any) => {
          gsap.fromTo(
            img,
            { xPercent: -10 },
            {
              xPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      }


      // 3. Grid Line Reveal Animations on Load
      gsap.fromTo(
        ".grid-line-h",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          stagger: 0.25,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".grid-line-v",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.8,
          stagger: 0.25,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top 80%",
          },
        }
      );



    }, mainContainerRef);

    return () => ctx.revert();
  }, []);
  return (
    <SmoothScroll>
      
      {/* Refactored Brand Navigation */}
      <ToppingsNav />

      <main ref={mainContainerRef} className="relative w-full bg-cream overflow-hidden select-none">
        
        {/* Continuous Canvas Background Grid */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="grid-line-h top-[12vh]" />
          <div className="grid-line-h top-[50vh]" />
          <div className="grid-line-h bottom-[15vh]" />
          <div className="grid-line-v left-[12vw]" />
          <div className="grid-line-v left-[50vw]" />
          <div className="grid-line-v right-[35vw]" />
        </div>

        {/* Brand New Hero Canvas */}
        <ToppingsHero />

        <section
          id="menu-teaser"
          className="relative py-36 md:py-48 bg-charcoal text-cream flex items-center justify-center min-h-[68vh] overflow-hidden z-10 border-t border-b border-charcoal/5"
        >
          {/* Centered Content Column */}
          <div className="relative max-w-2xl mx-auto text-center px-6 flex flex-col items-center justify-center z-10">
            
            {/* Title: "THE MENU" - Luxury Serif */}
            <h2 className="font-serif text-5xl sm:text-7xl tracking-wide uppercase font-medium text-cream mb-6">
              THE MENU
            </h2>

            {/* Description Text */}
            <p className="font-sans text-cream/75 text-sm sm:text-base leading-relaxed tracking-wide max-w-md mb-8 mt-2">
              Our delicious Latin fusion food will have you savouring every last bite – before returning for seconds. Entirely gluten-free with plenty of vegan options.
            </p>

            {/* Magnetic CTA button */}
            <div className="pointer-events-auto">
              <Magnetic range={35} strength={0.25}>
                <button
                  onClick={() => alert("Loading full digital menu...")}
                  className="text-[10px] tracking-[0.2em] bg-cream text-charcoal font-semibold px-8 py-3.5 rounded-full uppercase transition-all duration-300 hover:bg-terracotta hover:text-white shadow-md"
                  data-cursor="magnetic"
                >
                  SEE THE FULL MENU
                </button>
              </Magnetic>
            </div>

          </div>
        </section>

        {/* MENU HORIZONTAL PINNED GALLERY */}
        <section id="menu" ref={pinSectionRef} className="relative z-20">
          <div ref={stickyWrapperRef} className="sticky top-0 h-screen overflow-hidden bg-cream flex items-center">
            <div ref={horizontalContainerRef} className="flex h-full items-center w-max pr-12">
              {menuArtifacts.map((item) => (
                <CaseStudyCard key={item.id} study={item} />
              ))}
            </div>
          </div>
        </section>


        {/* VISIT & FOOTER SECTION */}
        <footer id="visit" className="relative py-20 px-6 md:px-12 bg-cream z-10">
          
          <div className="grid-line-h top-0" />

          {/* Top Bar Header with Logo & Book Button */}
          <div className="max-w-7xl mx-auto flex justify-between items-center pb-8 border-b border-charcoal/15">
            {/* Styled Logo */}
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-terracotta uppercase font-bold">
              TOPPINGS
            </span>
            {/* Book a Table button */}
            <div className="pointer-events-auto">
              <Magnetic range={30} strength={0.25}>
                <button
                  onClick={() => alert("Opening reservation system...")}
                  className="bg-terracotta hover:bg-charcoal text-cream font-sans text-xs tracking-[0.2em] uppercase font-bold px-7 py-3 rounded-full transition-colors duration-300 shadow-sm"
                  data-cursor="magnetic"
                >
                  BOOK A TABLE
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Two-Column Editorial Details Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12">
            
            {/* Left Column (Google Map Embed) */}
            <div className="lg:col-span-7 w-full h-[320px] sm:h-[400px] lg:h-[450px] overflow-hidden rounded-md border border-charcoal/15 shadow-md pointer-events-auto relative group bg-[#f5f5f5]">
              <iframe
                src="https://maps.google.com/maps?q=Toppings%20Cafe%20and%20Restaurant,%20Sipajhar,%20Assam&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Toppings Cafe & Restaurant Location Map"
              />
            </div>

            {/* Right Column (Opening Hours, Contacts, Socials) */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              
              {/* Opening Hours list */}
              <div>
                <h4 className="font-italiana text-sm uppercase tracking-widest text-terracotta font-bold mb-5">
                  OPENING HOURS
                </h4>
                <div className="flex flex-col gap-3 font-tenor text-sm md:text-base text-charcoal/85 max-w-sm">
                  <div className="flex justify-between border-b border-charcoal/10 pb-2">
                    <span className="font-bold tracking-wider">WED – FRI</span>
                    <span className="text-charcoal/70">5pm – late</span>
                  </div>
                  <div className="flex justify-between border-b border-charcoal/10 pb-2">
                    <span className="font-bold tracking-wider">SAT – SUN</span>
                    <span className="text-charcoal/70">12pm – late</span>
                  </div>
                </div>
              </div>

              {/* Contact information */}
              <div>
                <h4 className="font-italiana text-sm uppercase tracking-widest text-terracotta font-bold mb-5">
                  CONTACT
                </h4>
                <div className="flex flex-col gap-3 font-tenor text-sm md:text-base text-charcoal/85 max-w-sm">
                  <div className="flex">
                    <span className="w-8 font-bold">E:</span>
                    <a href="mailto:hello@toppings.co" className="hover:text-terracotta transition-colors duration-300 font-medium">hello@toppings.co</a>
                  </div>
                  <div className="flex">
                    <span className="w-8 font-bold">P:</span>
                    <a href="tel:+330561234567" className="hover:text-terracotta transition-colors duration-300 font-medium">+33 (0)5 61 23 45 67</a>
                  </div>
                  
                  <a
                    href="https://www.google.com/maps/place/Toppings+Cafe+and+Restaurant/data=!4m2!3m1!1s0x0:0x5321277d3c398906?sa=X&ved=1t:2428&ictx=111"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-xs hover:text-terracotta hover:underline inline-flex items-center gap-1 self-start font-bold text-charcoal/75 tracking-wider"
                  >
                    Near Transport Office & Bus Stand, Sipajhar, Assam 784145 ↗
                  </a>
                </div>
              </div>

              {/* Social Media Link Icons */}
              <div>
                <h4 className="font-italiana text-sm uppercase tracking-widest text-terracotta font-bold mb-4">
                  SOCIALS
                </h4>
                <div className="flex gap-4 items-center">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-charcoal hover:bg-terracotta text-cream flex items-center justify-center transition-colors duration-300 shadow-sm"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-charcoal hover:bg-terracotta text-cream flex items-center justify-center transition-colors duration-300 shadow-sm"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom copyright sub-bar */}
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-charcoal/10 pt-8 mt-16 font-tenor font-bold text-xs md:text-sm text-charcoal/65 uppercase tracking-widest gap-6">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <span><span className="text-[14px] md:text-[17px] mr-1">© 2026</span> TOPPINGS CAFE & RESTAURANT // ALL RIGHTS RESERVED</span>
              <span className="text-[10px] md:text-[11px] text-charcoal/45 tracking-widest uppercase font-medium">
                DESIGNED BY <a href="https://www.instagram.com/ciranjiib/" target="_blank" rel="noopener noreferrer" className="underline hover:text-terracotta transition-colors duration-300">CHIRANJIB SARMA</a>
              </span>
            </div>
            <div>
              <span>ESTABLISHED ON FLAVOR GRIDS</span>
            </div>
          </div>
        </footer>

      </main>
    </SmoothScroll>
  );
}
