"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  LuArrowDownRight,
  LuArrowUpRight,
  LuBookOpen,
  LuCalendarDays,
  LuCheck,
  LuChevronDown,
  LuClipboardCheck,
  LuFileCheck,
  LuFileText,
  LuGlobe,
  LuMail,
  LuPresentation,
  LuScanSearch,
  LuShieldCheck,
  LuSparkles,
  LuUsers,
} from "react-icons/lu";

const submissionDetails = [
  {
    icon: LuFileText,
    title: "Paper Types Accepted",
    description:
      "Full research papers presenting original theoretical, empirical, applied or interdisciplinary work related to the conference themes.",
  },
  {
    icon: LuFileCheck,
    title: "Paper Length",
    description:
      "Full papers should follow the official ICETIA 2027 page and word limit. Replace this text with the confirmed requirement before publication.",
  },
  {
    icon: LuBookOpen,
    title: "Abstract Submission",
    description:
      "Abstract-only submissions may be accepted where applicable. Confirm the abstract word limit and whether an abstract can be submitted without a full paper.",
  },
  {
    icon: LuClipboardCheck,
    title: "Formatting Template",
    description:
      "All submissions must follow the official ICETIA 2027 formatting template and author guidelines.",
  },
];

const reviewDetails = [
  {
    icon: LuScanSearch,
    title: "Peer Review",
    description:
      "Submissions will undergo academic review based on relevance, originality, methodological quality, clarity and contribution to the conference.",
  },
  {
    icon: LuShieldCheck,
    title: "Originality & Plagiarism",
    description:
      "Submitted work must be original and unpublished. Papers may be screened for plagiarism, duplicate submission and other forms of academic misconduct.",
  },
  {
    icon: LuSparkles,
    title: "Responsible AI Use",
    description:
      "Authors remain responsible for the accuracy, originality and integrity of their submissions. Any AI-assisted content must comply with the final ICETIA 2027 author guidelines.",
  },
];

const publicationDetails = [
  {
    icon: LuPresentation,
    title: "Presentation Required",
    description:
      "Authors of accepted papers will be expected to present their work at ICETIA 2027 in accordance with the conference presentation guidelines.",
  },
  {
    icon: LuFileCheck,
    title: "Camera-Ready Paper",
    description:
      "Accepted papers must be revised according to reviewer and editorial comments and submitted in the required camera-ready format by the stated deadline.",
  },
  {
    icon: LuGlobe,
    title: "Publication Pathway",
    description:
      "Accepted and presented papers will be considered for the official ICETIA 2027 Book of Abstracts and/or Conference Proceedings.",
  },
];

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
      <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-20 xl:px-10 xl:py-24">
        {/* =========================================================
            HEADER
        ========================================================= */}
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
                Accepted authors will be invited to present.
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
                    Original theoretical, empirical, applied and
                    interdisciplinary research.
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

        {/* =========================================================
            SUBMISSION REQUIREMENTS
        ========================================================= */}
        <div className="mt-16 border-t border-white/10 pt-10 lg:mt-24 lg:pt-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-blue-500" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">
                Submission Requirements
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Prepare your paper{" "}
              <span className="text-blue-400">for submission.</span>
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Authors should review the requirements below before submitting
              their work. The official template and final submission
              specifications will govern all submissions.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {submissionDetails.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group bg-slate-950 p-6 transition-colors duration-300 hover:bg-slate-900/80 lg:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <Icon className="h-4 w-4" />
                    </div>

                    <LuArrowUpRight className="h-4 w-4 text-slate-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400" />
                  </div>

                  <h4 className="mt-7 text-sm font-semibold text-white">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            REVIEW PROCESS
        ========================================================= */}
        <div className="mt-16 lg:mt-24">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-blue-500" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">
                  Review & Integrity
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                A clear path from{" "}
                <span className="text-blue-400">submission to decision.</span>
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                Every submission should meet the conference&apos;s academic,
                ethical and editorial standards before it can progress toward
                presentation and publication.
              </p>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {reviewDetails.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex gap-5 py-6"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-white/2 text-blue-400">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="text-sm font-semibold text-white">
                          {item.title}
                        </h4>

                        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            PUBLICATION PATHWAY
        ========================================================= */}
        <div className="mt-16 lg:mt-24">
          <div className="border border-blue-500/20 bg-blue-500/3 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-blue-500" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Publication Pathway
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  From conference{" "}
                  <span className="text-blue-400">to publication.</span>
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Accepted and presented papers will be considered for
                  inclusion in the official ICETIA 2027 Book of Abstracts
                  and/or Conference Proceedings.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {publicationDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="border border-white/10 bg-slate-950/70 p-5"
                    >
                      <Icon className="h-5 w-5 text-blue-400" />

                      <h4 className="mt-5 text-sm font-semibold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-3 text-xs leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs leading-6 text-slate-500">
                Selected high-quality papers may be invited for further
                consideration by an approved journal or publication outlet,
                subject to separate editorial review, quality checks and
                publication requirements.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            SUBMISSION PROCESS
        ========================================================= */}
        <div className="mt-16 lg:mt-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-blue-500" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">
              Submission Process
            </span>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Prepare",
                text: "Prepare your manuscript using the official ICETIA 2027 template.",
              },
              {
                number: "02",
                title: "Submit",
                text: "Submit your paper through the designated conference submission portal.",
              },
              {
                number: "03",
                title: "Review",
                text: "Your submission undergoes academic review and an originality check.",
              },
              {
                number: "04",
                title: "Present",
                text: "Accepted authors revise their papers and present at ICETIA 2027.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="border border-white/10 bg-white/1.5 p-6"
              >
                <span className="font-mono text-xs text-blue-400">
                  {step.number}
                </span>

                <h4 className="mt-5 text-sm font-semibold text-white">
                  {step.title}
                </h4>

                <p className="mt-3 text-xs leading-6 text-slate-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            AUTHOR CHECKLIST
        ========================================================= */}
        <div className="mt-16 lg:mt-20">
          <div className="border-t border-white/10 pt-8">
            <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Before You Submit
                </p>

                <h3 className="mt-3 text-xl font-bold tracking-tight">
                  Author checklist
                </h3>
              </div>

              <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {[
                  "The paper is original and unpublished.",
                  "The manuscript follows the official template.",
                  "All authors and affiliations are correctly listed.",
                  "References and citations are properly formatted.",
                  "The work complies with the conference AI-use policy.",
                  "The authors can commit to presentation if accepted.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-xs leading-5 text-slate-500"
                  >
                    <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SUBMISSION CTA
        ========================================================= */}
        <div className="mt-14 border-t border-white/10 pt-8 lg:mt-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Ready to contribute?
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Prepare your research and submit your work for consideration.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={handleCFPButton}
                className="group h-11 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Submit a Paper
                <LuArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>

              {/* Replace href with your actual template URL */}
              <a
                href="/accepted-papers"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 px-6 text-sm font-semibold text-slate-300 transition-colors hover:border-blue-400/30 hover:text-white"
              >
                View Accepted Papers
                <LuArrowDownRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM STRIP
        ========================================================= */}
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