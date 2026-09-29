"use client";

import { useState } from "react";
import Image from "next/image";
import { IoClose, IoExpandOutline } from "react-icons/io5";
import { LuImages } from "react-icons/lu";

const galleryImages = [
  {
    src: "/images/FUO1.jpg",
    alt: "Federal University Otuoke campus",
    title: "Federal University Otuoke",
  },
  {
    src: "/images/FUO2.jpg",
    alt: "Academic event at Federal University Otuoke",
    title: "Academic Excellence",
  },
  {
    src: "/images/FUO3.jpg",
    alt: "Students participating in an academic event",
    title: "Innovation & Learning",
  },
  {
    src: "/images/ICETIA4.jpg",
    alt: "Technology and innovation event",
    title: "Technology & Innovation",
  },
  {
    src: "/images/ICETIA5.jpg",
    alt: "Researchers and academics",
    title: "Research & Collaboration",
  },
  {
    src: "/images/ICETIA6.jpg",
    alt: "Conference presentation",
    title: "Knowledge Exchange",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id="gallery"
      className="bg-white py-24"
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <LuImages className="h-4 w-4" />
            Gallery
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Moments & Memories
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Explore highlights, activities and memorable moments from the
            academic community, research environment and conference events.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">

          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setSelectedImage(image.src)}
              className={`group relative overflow-hidden rounded-2xl bg-slate-100 text-left ${
                index === 0
                  ? "col-span-2 row-span-2 min-h-87.5 md:min-h-[500px]"
                  : "min-h-55"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 50vw, 33vw"
                }
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Text */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-end justify-between gap-4">

                  <div>
                    <h3 className="text-base font-semibold sm:text-lg">
                      {image.title}
                    </h3>

                    <p className="mt-1 text-sm text-white/80">
                      View image
                    </p>
                  </div>

                  <div className="rounded-full bg-white/20 p-2 backdrop-blur-md transition group-hover:bg-white/30">
                    <IoExpandOutline className="h-5 w-5" />
                  </div>

                </div>
              </div>
            </button>
          ))}

        </div>

        {/* Gallery Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            More conference moments will be added as ICETIA 2027 activities
            progress.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <IoClose className="h-7 w-7" />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Expanded gallery image"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}