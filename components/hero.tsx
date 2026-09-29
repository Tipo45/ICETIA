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
import { IoCalendarNumber } from "react-icons/io5";
import { useRouter } from "next/navigation";

const heroImages = [
  "/images/FUO1.jpg",
  "/images/FUO2.jpg",
  "/images/ICETIA4.jpg",
  "/images/ICETIA5.jpg",
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
    <section className="relative h-150 overflow-hidden lg:h-175">

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
          className="h-full w-full"
        >
          <CarouselContent className="ml-0 h-150 lg:h-175">
            {heroImages.map((image, index) => (
              <CarouselItem
                key={image}
                className="relative h-150 basis-full pl-0 lg:h-175"
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

          {/* Previous Button */}
          <CarouselPrevious className="left-5 z-30 border-white/20 bg-black/30 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white" />

          {/* Next Button */}
          <CarouselNext className="right-5 z-30 border-white/20 bg-black/30 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white" />
        </Carousel>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-linear-to-br from-slate-950/50 via-blue-950/50 to-blue-800/20" />

      {/* Hero Content */}
      <div className="relative z-20 flex h-full items-center">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl text-center text-white">

            {/* Conference Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                ICETIA 2027
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:mt-8 lg:text-6xl"
            >
              International Conference on Emerging Technologies, Innovation
              and Applications
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-6 max-w-3xl text-base text-slate-200 sm:text-lg lg:mt-8 xl:text-xl"
            >
              Advancing Emerging Technologies, Innovations and Applications
              for Sustainable Digital Transformation.
            </motion.p>

            {/* Date */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap justify-center gap-6 lg:mt-10"
            >
              <div className="flex items-center gap-2">
                <IoCalendarNumber size={20} />
                <span>24th – 25th April, 2027</span>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-wrap justify-center gap-4 lg:mt-12"
            >
              <Button
                size="lg"
                onClick={handleCFPButton}
              >
                Submit Paper
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={handleRegButton}
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