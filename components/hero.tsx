"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IoCalendarNumber } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Hero() {

  const router = useRouter();

  const handleCFPButton = () => {
      router.push("/registration/authors-registration")
    }
  
    const handleRegButton = () => {
      router.push("/#registration")
    }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-blue-950 to-blue-800" />

      <div className="relative container mx-auto px-6 py-24 lg:py-36">
        <div className="mx-auto max-w-5xl text-center text-white">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              CASCADE 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: .2 }}
            className="mt-8 text-4xl font-bold leading-tight lg:text-6xl"
          >
            International Conference on Cybersecurity, Artificial Intelligence, Smart Systems, Computing, Analytics, Data and Emerging Technologies
          </motion.h1>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: .4 }}
            className="mt-8 text-lg text-slate-200 xl:text-xl"
          >
            Advancing Emerging Technologies, Innovations and
            Applications for Sustainable Digital Transformation.
          </motion.p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <IoCalendarNumber size={20} />
              <span>
                24th – 25th November, 2026
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaRegBuilding size={20} />
              <span>
                Department of Computer Science and Informatics
              </span>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={handleCFPButton}>
              Submit Paper
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleRegButton}
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

