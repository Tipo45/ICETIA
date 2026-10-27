"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LuArrowLeft,
  LuArrowUpRight,
  LuImages,
  LuX,
} from "react-icons/lu";
import Footer from "@/components/footer";
import PublicationFooter from "@/components/publicationfooter";
import Navbar from "@/components/navbar";
import PublicationHeader from "@/components/publicationheader";

const allGalleryImages = [
  {
    src: "/images/PSC_1788.jpg",
    alt: "Federal University Otuoke campus",
    title: "Federal University Otuoke",
  },
  {
    src: "/images/PSC_1695.jpg",
    alt: "Academic Event",
  },
  {
    src: "/images/PSC_1731.jpg",
    alt: "Innovation & Learning",
  },
  {
    src: "/images/PSC_1716.jpg",
    alt: "Technology and Innovation",
  },
  {
    src: "/images/PSC_1706.jpg",
    alt: "Research and Academics",
  },
  {
    src: "/images/PSC_1816.jpg",
    alt: "Academic Events",
  },
  {
    src: "/images/PSC_1804.jpg",
    alt: "Innovation & Learning",
  },
  {
    src: "/images/PSC_1794.jpg",
    alt: "Technology and Innovation event",
  },
  {
    src: "/images/PSC_1809.jpg",
    alt: "Researchers and Academics",
  },
  {
    src: "/images/PSC_1800.jpg",
    alt: "Researchers and Academics",
  },
  {
    src: "/images/PSC_1796.jpg",
    alt: "Researchers and Academics",
  },
  {
    src: "/images/PSC_1780.jpg",
    alt: "Researchers and Academics",
  },
];

export default function GalleryPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const selectedImageData = allGalleryImages.find(
    (image) => image.src === selectedImage
  );

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="sticky top-0 z-50">
        <PublicationHeader />
        <Navbar />
      </div>
      {/* Header */}
      <section className="border-b border-white/10 bg-slate-950 text-white">
        <div className="container mx-auto px-5 py-10 lg:px-8 lg:py-14 xl:px-10 xl:py-16">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">

            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                <LuImages className="h-4 w-4" />
                ICETIA 2027
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                Gallery
                <span className="text-blue-400">. </span>
              </h1>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
                Explore
                ICETIA 2027 at Federal University Otuoke.
              </p>
            </div>

          </div>

          {/* Header Meta */}
          <div className="mt-10 grid grid-cols-2 border-t border-white/10 lg:mt-12 lg:grid-cols-4">

            <div className="border-r border-white/10 px-4 py-5 first:pl-0">
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                Edition
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Maiden Edition
              </p>
            </div>

            <div className="border-r-0 px-4 py-5 lg:border-r lg:border-white/10">
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                Date
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                28 – 30 April, 2027
              </p>
            </div>

            <div className="hidden border-r border-white/10 px-4 py-5 lg:block">
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                Location
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Bayelsa State, Nigeria
              </p>
            </div>

            <div className="hidden px-4 py-5 lg:block">
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                Collection
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {allGalleryImages.length} Images
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Gallery */}
      <section>
        <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">

          {/* Section Intro */}
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Visual Archive
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
                Host Institution
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500 lg:text-right">
              Click any image to view it in full size.
            </p>

          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-4">

            {/* Featured Image */}
            <button
              type="button"
              onClick={() => setSelectedImage(allGalleryImages[0].src)}
              className="group relative min-h-80 overflow-hidden rounded-2xl bg-slate-100 text-left lg:col-span-2 lg:row-span-2 lg:min-h-130"
            >
              <Image
                src={allGalleryImages[0].src}
                alt={allGalleryImages[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7">
                <div className="flex items-end justify-between gap-4">

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                      01 / Featured
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-white lg:text-2xl">
                      {allGalleryImages[0].title}
                    </h3>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 group-hover:border-blue-400 group-hover:bg-blue-600">
                    <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>

                </div>
              </div>
            </button>

            {/* Remaining Images */}
            {allGalleryImages.slice(1).map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(image.src)}
                className="group relative min-h-64 overflow-hidden rounded-2xl bg-slate-100 text-left lg:min-h-62.5"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                  <div className="flex items-end justify-between gap-3">

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                        {String(index + 2).padStart(2, "0")}
                      </p>

                      <h3 className="mt-1 text-sm font-semibold text-white lg:text-base">
                        {image.title}
                      </h3>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <LuArrowUpRight className="h-3.5 w-3.5" />
                    </span>

                  </div>
                </div>
              </button>
            ))}

          </div>

          {/* Bottom Information */}
          <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-sm font-semibold text-slate-900">
                ICETIA 2027
              </p>
              <p className="mt-1 text-xs text-slate-500">
                International Conference on Emerging Technologies,
                Innovations and Applications
              </p>
            </div>

            <button
              onClick={() => router.push("/#about")}
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 transition-colors hover:text-blue-700"
            >
              About the Conference
              <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm lg:p-8"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 lg:right-6 lg:top-6"
          >
            <LuX className="h-5 w-5" />
          </button>

          {/* Image */}
          <div
            className="relative h-[75vh] w-full max-w-7xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={
                selectedImageData?.alt ||
                "ICETIA 2027 conference gallery image"
              }
              fill
              sizes="100vw"
              className="object-contain"
            />

            {/* Image Caption */}
            {selectedImageData && (
              <div className="absolute bottom-0 left-1/2 w-full max-w-xl -translate-x-1/2 translate-y-full pt-4 text-center">
                <p className="text-sm font-semibold text-white">
                  {selectedImageData.title}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <PublicationFooter />
      <Footer />
    </main>
  );
}