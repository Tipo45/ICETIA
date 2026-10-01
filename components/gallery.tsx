"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuImages, LuArrowRight } from "react-icons/lu";

const galleryImages = [
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

export default function Gallery() {
  const router = useRouter();

  return (
    <section id="gallery" className="bg-white py-24">
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <LuImages className="h-4 w-4" />
            Conference Gallery
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Moments from <span className="text-blue-600">ICETIA</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Explore highlights, moments and activities from ICETIA 2027.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">

          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0
                  ? "col-span-2 row-span-2 min-h-87.5 md:min-h-[500px]"
                  : "min-h-50 md:min-h-[240px]"
              }`}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 50vw, 33vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Image Title */}
              {/* <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium">
                  {image.title}
                </p>
              </div> */}
            </div>
          ))}

        </div>

        {/* See More Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => router.push("/gallery")}
            className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            See More Gallery
            <LuArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}