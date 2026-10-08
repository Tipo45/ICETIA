import Image from "next/image";
import Link from "next/link";
import { FaRegBuilding } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";

export default function HostInstitution() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="container mx-auto px-5 py-4 lg:px-8 lg:py-6 xl:px-10 xl:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16">

          {/* Label */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            <FaRegBuilding className="h-4 w-4" />
            Host Institution
          </div>

          {/* Institution information */}
          <div className="border-t border-slate-200 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">

            {/* Institution identity */}
            <Link
              href="https://fuotuoke.edu.ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4"
            >
              {/* Logo */}
              <div className="flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-sm transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-md h-20 w-20">
                <Image
                  src="/images/FUO-Logo.png"
                  alt="Federal University Otuoke Logo"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* School name */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-950 transition-colors group-hover:text-blue-600 lg:text-3xl xl:text-4xl">
                    Federal University Otuoke
                  </h2>

                  <LuArrowUpRight className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
                </div>

                <p className="mt-1 text-sm font-medium text-blue-600">
                  Ogbia, Bayelsa State, Nigeria
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600 lg:text-base lg:leading-8">
              Federal University Otuoke is committed to advancing research,
              innovation and digital transformation through academic
              excellence, collaborative research and industry partnerships.
            </p>

            {/* Bottom information */}
            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Learning

                <span className="text-slate-300">•</span>

                Integrity

                <span className="text-slate-300">•</span>

                Knowledge

                <span className="text-slate-300">•</span>
                Excellence

                <span className="text-slate-300">•</span>

                Service

                <span className="text-slate-300">•</span>

                Schloarship
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                ICETIA 2027
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}