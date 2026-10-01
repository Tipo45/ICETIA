"use client";

import Image from "next/image";
import { useState } from "react";
import { LuArrowLeft, LuX, LuImages } from "react-icons/lu";
import { useRouter } from "next/navigation";

const allGalleryImages = [
  {
    src: "/images/FUO4.jpg",
    alt: "Federal University Otuoke campus",
    title: "Federal University Otuoke",
  },
  {
    src: "/images/FUO1.jpg",
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

export default function GalleryPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-blue-950 py-20 text-white">
        <div className="container mx-auto px-6">

          <button
            onClick={() => router.back()}
            className="mb-8 inline-flex items-center gap-2 text-sm text-blue-200 transition hover:text-white"
          >
            <LuArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <LuImages className="h-8 w-8" />

            <div>
              <p className="text-sm uppercase tracking-widest text-blue-300">
                ICETIA 2027
              </p>

              <h1 className="mt-1 text-4xl font-bold lg:text-5xl">
                Conference Gallery
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Explore moments, activities, presentations and highlights from
            ICETIA 2027.
          </p>

        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-6 py-16">

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {allGalleryImages.map((image) => (
            <button
              key={image.src}
              onClick={() => setSelectedImage(image.src)}
              className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-slate-200 text-left"
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-medium">
                  {image.title}
                </p>
              </div>
            </button>
          ))}

        </div>

      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <LuX className="h-6 w-6" />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="ICETIA 2027 gallery image"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}

    </main>
  );
}