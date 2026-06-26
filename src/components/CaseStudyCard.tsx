"use client";

import Image from "next/image";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  index: string;
  imageUrl: string;
  year: string;
}

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="flex-shrink-0 w-[75vw] sm:w-[38vw] h-full flex flex-col justify-center px-4 sm:px-6 select-none">
      <div className="relative group w-full h-[48vh] flex flex-col justify-center">
        
        {/* Image Frame - Fitted to the card dimensions */}
        <div
          className="relative w-full h-full overflow-hidden bg-neutral-100 shadow-md rounded-sm"
          data-cursor="view"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={study.imageUrl}
              alt={study.title}
              fill
              className="object-cover scale-115 transition-transform duration-700 ease-out image-parallax transform-gpu"
              sizes="(max-width: 640px) 75vw, 38vw"
              priority
            />
          </div>
          {/* Subtle gradient vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cream/30 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
