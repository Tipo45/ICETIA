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
    <section className="relative min-h-180 overflow-hidden lg:min-h-170 tablet:min-h-162.5 xl:h-175 xl:min-h-0">

      {/* Background Carousel */}
      <div className="absolute inset-0 h-full w-full">
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
          className="
    relative
    h-180
    w-full
    lg:h-170
    tablet:h-162.5
    xl:h-175
"
        >
          <CarouselContent className="
    ml-0
    h-180
    lg:h-170
    tablet:h-162.5
    xl:h-175
">
            {heroImages.map((image, index) => (
              <CarouselItem
                key={image}
                className="
    relative
    h-180
    basis-full
    pl-0
    lg:h-170
    tablet:h-162.5
    xl:h-175
"
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

          {/* Previous */}
          <CarouselPrevious className="left-3 z-30 border-white/20 bg-black/30 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white lg:left-5" />

          {/* Next */}
          <CarouselNext className="right-3 z-30 border-white/20 bg-black/30 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white lg:right-5" />
        </Carousel>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-br from-slate-950/60 via-blue-950/50 to-blue-800/20" />

      {/* Hero Content */}
      <div className="relative z-20 flex min-h-175 items-center lg:min-h-162.5 xl:h-full xl:min-h-0">
        <div className="container mx-auto px-5 py-16 lg:px-6 lg:py-20 xl:py-24">
          <div className="mx-auto max-w-5xl text-center text-white">

            {/* Conference Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-sm lg:text-sm">
                ICETIA 2027
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-3xl font-bold leading-tight lg:mt-6 lg:text-4xl xl:mt-8 xl:text-6xl"
            >
              International Conference on Emerging Technologies, Innovation
              and Applications
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-200 lg:mt-6 lg:text-lg xl:mt-8 xl:text-xl"
            >
              Advancing Emerging Technologies, Innovations and Applications
              for Sustainable Digital Transformation.
            </motion.p>

            {/* Date */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex flex-wrap justify-center gap-4 lg:mt-8 xl:mt-10"
            >
              <div className="flex items-center gap-2 text-sm lg:text-base">
                <IoCalendarSharp size={18} />
                <span>28th – 30th April, 2027</span>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-7 flex flex-col items-center justify-center gap-3 lg:mt-8 lg:flex-row lg:gap-4 xl:mt-12"
            >
              <Button
                size="lg"
                onClick={handleCFPButton}
                className="w-full lg:w-auto"
              >
                Submit Paper
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={handleRegButton}
                className="w-full lg:w-auto"
              >
                Register Now
              </Button>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}