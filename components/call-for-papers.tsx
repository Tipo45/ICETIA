"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  LuArrowUpRight,
  LuCalendarDays,
  LuFileText,
  LuUsers,
} from "react-icons/lu";

export default function CallForPapers() {
  const router = useRouter();

  const handleCFPButton = () => {
    router.push("/registration/authors-registration");
  };

  return (
    <section
      id="cfp"
      className="border-b border-slate-900 bg-slate-950 text-white"
    >
      <div className="container mx-auto px-5 py-4 lg:px-8 lg:py-6 xl:px-10 xl:py-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-16">
          
          {/* Main content */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-blue-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Call For Papers
              </span>
            </div>

            <h2 className="mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
              Submit your research.
              <br />
              <span className="text-blue-400">
                Shape what comes next.
              </span>
            </h2>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
              ICETIA 2027 invites researchers, academics, practitioners,
              innovators and industry experts to submit original and
              unpublished research papers that contribute to advancing
              emerging technologies, innovation and applications for
              sustainable digital transformation.
            </p>

            <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
              <Button
                size="lg"
                onClick={handleCFPButton}
                className="group h-11 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Submit a Paper
                <LuArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>

              <span className="text-xs text-slate-500">
                Authors with accepted papers will be invited to present.
              </span>
            </div>
          </div>

          {/* Conference information */}
          <div className="border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Submission
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-blue-400">
                  <LuFileText className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Original Research
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Submit original and unpublished scholarly work.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-blue-400">
                  <LuUsers className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Researchers & Practitioners
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Open to academia, industry and technology professionals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-blue-400">
                  <LuCalendarDays className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    ICETIA 2027
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    28 – 30 April, 2027 · Federal University Otuoke
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom information strip */}
        <div className="mt-12 border-t border-white/10 pt-6 lg:mt-14">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Emerging Technologies · Innovation · Applications
            </p>

            <p className="text-xs text-slate-600">
              International Conference · Maiden Edition
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}