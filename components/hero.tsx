"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IoCalendarSharp } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";
import { TiVideo } from "react-icons/ti";
import { useRouter } from "next/navigation";

const heroImages = [
  "/images/FUO1.jpg",
  "/images/FUO2.1.jpg",
  "/images/FUO3.1.jpg",
  "/images/FUO6.1.jpg",
];

export default function Hero() {
  const router = useRouter();

  const handleCFPButton = () => {
    router.push("/registration/authors-registration");
  };

  const handleRegButton = () => {
    router.push("/#registration");
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">

      {/* Background Carousel */}
      <div className="absolute inset-0">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
          className="h-150 w-full lg:h-155 xl:h-165"
        >
          <CarouselContent className="ml-0 h-150 lg:h-155 xl:h-165">
            {heroImages.map((image, index) => (
              <CarouselItem
                key={image}
                className="relative h-150 basis-full pl-0 lg:h-155 xl:h-165"
              >
                <Image
                  src={image}
                  alt={`ICETIA 2027 conference image ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 z-30 h-9 w-9 border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-white/20 hover:text-white lg:left-6" />

          <CarouselNext className="right-4 z-30 h-9 w-9 border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-white/20 hover:text-white lg:right-6" />
        </Carousel>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/70" />

      {/* Subtle blue gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/75 to-blue-950/30" />

      {/* Hero Content */}
      <div className="relative z-20 flex min-h-150 items-center lg:min-h-155 xl:min-h-165">
        <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-16 xl:px-10">

          <div className="max-w-4xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 border-l-2 border-blue-500 pl-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300 lg:text-sm">
                International Conference · 2027
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight lg:text-5xl xl:text-7xl"
            >
              Emerging Technologies.
              <br />
              <span className="text-blue-400">
                Innovation & Applications.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 lg:text-base xl:text-lg xl:leading-8"
            >
              The International Conference on Emerging Technologies,
              Innovation and Applications brings researchers, academics,
              industry professionals and technology practitioners together
              to explore ideas shaping the future of digital transformation.
            </motion.p>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-6 flex items-center gap-2 text-sm font-medium text-white lg:text-base"
            >
              <IoCalendarSharp className="h-5 w-5 text-blue-400" />

              <span>28 – 30 April, 2027</span>

              <span className="mx-1 text-slate-500">•</span>

              <span className="text-slate-300">
                Federal University Otuoke
              </span>

              <span className="mx-1 text-slate-500">•</span>
              <TiVideo className="h-5 w-5 text-blue-400" />
              <span> Hybrid Event</span>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center"
            >
              <Button
                size="lg"
                onClick={handleCFPButton}
                className="group h-11 rounded-full bg-blue-600 px-6 text-sm font-semibold hover:bg-blue-500"
              >
                Submit a Paper

                <LuArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleRegButton}
                className="h-11 rounded-full border-white/30 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-slate-950"
              >
                Register Now
              </Button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom information strip */}
      <div className="relative z-20 border-t border-white/10 bg-slate-950/50 backdrop-blur-md">
        <div className="container mx-auto grid grid-cols-2 px-5 lg:grid-cols-4 lg:px-8 xl:px-10">

          <div className="border-r border-white/10 px-4 py-4 first:pl-0">
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Edition
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Maiden Edition
            </p>
          </div>

          <div className="border-r-0 px-4 py-4 lg:border-r lg:border-white/10">
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Location
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Bayelsa State, Nigeria
            </p>
          </div>

          <div className="hidden border-r border-white/10 px-4 py-4 lg:block">
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Focus
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Technology & Innovation
            </p>
          </div>

          <div className="hidden px-4 py-4 lg:block">
            <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Institution
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Federal University Otuoke
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}