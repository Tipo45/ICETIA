"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuArrowUpRight, LuImages } from "react-icons/lu";

const galleryImages = [
  {
    src: "/images/FUO1.jpg",
    alt: "Federal University Otuoke campus",
    title: "Federal University Otuoke",
  },
  {
    src: "/images/FUO3.1.jpg",
    alt: "Academic event at Federal University Otuoke",
    title: "Academic Excellence",
  },
  {
    src: "/images/FUO2.1.jpg",
    alt: "Students participating in an academic event",
    title: "Innovation & Learning",
  },
  {
    src: "/images/FUO3.1.jpg",
    alt: "Technology and innovation event",
    title: "Technology & Innovation",
  },
  {
    src: "/images/FUO5.1.jpg",
    alt: "Researchers and academics",
    title: "Research & Collaboration",
  },
  {
    src: "/images/FUO6.1.jpg",
    alt: "Conference presentation",
    title: "Knowledge Exchange",
  },
];

export default function Gallery() {
  const router = useRouter();

  return (
    <section
      id="gallery"
      className="border-b border-slate-200 bg-slate-50"
    >
      <div className="container mx-auto px-5 py-4 lg:px-8 lg:py-6 xl:px-10 xl:py-10">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              <LuImages className="h-4 w-4" />
              Conference Gallery
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
              Moments from{" "}
              <span className="text-blue-600">ICETIA.</span>
            </h2>
          </div>

          <div className="flex items-end justify-between gap-6 lg:max-w-sm">
            <p className="text-sm leading-6 text-slate-500 lg:text-right">
              A glimpse into the people, places and ideas surrounding
              ICETIA 2027.
            </p>
          </div>

        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">

          {/* Large Image */}
          <div className="group relative col-span-2 row-span-2 min-h-80 overflow-hidden rounded-2xl lg:min-h-125">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-5 lg:p-6">
              <p className="text-xs font-medium uppercase tracking-widest text-blue-300">
                Federal University Otuoke
              </p>

              <h3 className="mt-1 text-lg font-semibold text-white lg:text-xl">
                {galleryImages[0].title}
              </h3>
            </div>
          </div>

          {/* Image 2 */}
          <div className="group relative min-h-40 overflow-hidden rounded-2xl lg:min-h-61.5">
            <Image
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-4">
              <p className="text-sm font-semibold text-white">
                {galleryImages[1].title}
              </p>
            </div>
          </div>

          {/* Image 3 */}
          <div className="group relative min-h-40 overflow-hidden rounded-2xl lg:min-h-61.5">
            <Image
              src={galleryImages[2].src}
              alt={galleryImages[2].alt}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-4">
              <p className="text-sm font-semibold text-white">
                {galleryImages[2].title}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-6">

          <p className="hidden text-sm text-slate-500 lg:block">
            Explore more moments from ICETIA 2027.
          </p>

          <button
            onClick={() => router.push("/gallery")}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-all duration-200 hover:border-blue-600 hover:text-blue-600 lg:ml-auto"
          >
            View Full Gallery

            <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>

        </div>

      </div>
    </section>
  );
}