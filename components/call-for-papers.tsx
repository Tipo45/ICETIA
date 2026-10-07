"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  LuArrowDownRight,
  LuArrowUpRight,
  LuCalendarDays,
  LuCheck,
  LuFileCheck,
  LuFileText,
  LuUsers,
} from "react-icons/lu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const dates = [
  {
    title: "Full Paper Submission Deadline",
    date: "15 February 2027",
  },
  {
    title: "Notification of Acceptance",
    date: "15 March 2027",
  },
  {
    title: "Camera-Ready Paper Submission Deadline",
    date: "25 March 2027",
  },
  {
    title: "Conference Dates",
    date: "28 – 30 April 2027",
  },
];

const items = [
  {
    value: "scope",
    trigger: "Scope",
    content: (
      <div className="space-y-4 text-sm leading-7 text-slate-400">
        <p>
          ICETIA 2027 welcomes original research, innovative applications,
          emerging technologies and interdisciplinary studies addressing
          current challenges and opportunities across academia, industry,
          government and society.
        </p>

        <p>
          Contributions should demonstrate a clear connection to emerging
          technologies, innovation or their practical applications in
          advancing research, industry and society.
        </p>
      </div>
    ),
  },

  {
    value: "topic",
    trigger: "Topics",
    content: (
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          "Artificial Intelligence & Machine Learning Applications",
          "Cybersecurity, Privacy & Digital Trust",
          "Smart Systems, Internet of Things & Intelligent Environments",
          "Data Science, Analytics & Decision Intelligence",
          "Cloud Computing, Edge Computing & Digital Infrastructure",
          "Academic Publishing, Research Visibility & Grant Proposal Development",
          "Technology Entrepreneurship & Innovation Commercialisation",
          "Digital Transformation for Education, Governance, Health & Industry",
        ].map((topic) => (
          <div
            key={topic}
            className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/3 p-4"
          >
            <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

            <span className="text-xs leading-5 text-slate-400">
              {topic}
            </span>
          </div>
        ))}
      </div>
    ),
  },

  {
    value: "paper-length",
    trigger: "Paper Length",
    content: (
      <div className="space-y-4 text-sm leading-7 text-slate-400">
        <p>
          Full research papers should follow the official ICETIA 2027
          formatting template and submission requirements.
        </p>

        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <p className="text-xs leading-6 text-slate-400">
            The final paper length, formatting specifications and page
            limitations will be communicated through the official author
            guidelines and submission template.
          </p>
        </div>

        <p className="text-xs leading-6 text-slate-500">
          Authors should ensure that manuscripts comply with the official
          template before submission.
        </p>
      </div>
    ),
  },

  {
    value: "publication",
    trigger: "Publication",
    content: (
      <div className="">
        <div className="rounded-lg border border-white/10 bg-white/3 p-4">
        <p className="text-lg text-white">Accepted and presented papers will be considered for inclusion in the official ICETIA 2027 Book of Abstracts and/or Conference Proceedings. Selected high-quality papers may be invited for further consideration by an approved journal or publication outlet, subject to separate editorial review, quality checks and publication requirements.</p>
        </div>
      </div>
    ),
  },

  {
    value: "submission-guidelines",
    trigger: "Submission Guidelines",
    content: (
      <div className="space-y-4">
        {[
          "Submissions must be original and unpublished research.",
          "Manuscripts should follow the official ICETIA 2027 formatting template.",
          "All authors and institutional affiliations must be correctly stated.",
          "References and citations should follow the required formatting style.",
          "Authors should ensure that their submission meets the conference's academic and ethical requirements.",
          "Any AI-assisted content must comply with the final ICETIA 2027 responsible AI guidelines.",
          "Accepted authors will be expected to revise and submit a camera-ready version before the stated deadline.",
          "Authors of accepted papers will be expected to present their work at ICETIA 2027.",
        ].map((guideline) => (
          <div
            key={guideline}
            className="flex items-start gap-3"
          >
            <LuCheck className="mt-1 h-4 w-4 shrink-0 text-blue-400" />

            <span className="text-xs leading-6 text-slate-400">
              {guideline}
            </span>
          </div>
        ))}
      </div>
    ),
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

        <div className="border-y border-slate-200 bg-slate-50 mt-10">
          <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-16 xl:px-10 xl:py-20">
            {/* Header */}
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  <LuCalendarDays className="h-4 w-4" />
                  Paper Submission
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                  Important
                  <span className="text-blue-600"> dates.</span>
                </h2>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
                Keep track of the key milestones leading up to ICETIA 2027,
                from paper submission and review through author registration
                and the conference itself.
              </p>
            </div>

            {/* Timeline grid */}
            <div className="mt-10 grid border-t border-slate-200 lg:mt-12 lg:grid-cols-2">
              {dates.map((item, index) => (
                <div
                  key={item.title}
                  className={`group border-b border-slate-200 py-6 lg:px-6 lg:py-7 ${index % 2 === 0
                    ? "lg:border-r lg:pl-0"
                    : "lg:pr-0"
                    }`}
                >
                  <div className="flex gap-5">
                    {/* Number */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-bold text-slate-500 transition-colors group-hover:border-blue-500 group-hover:text-blue-600">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                        {item.date}
                      </p>

                      <h3 className="mt-2 text-base font-semibold leading-6 text-slate-900 lg:text-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Notice */}
            <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-3xl text-xs leading-5 text-slate-500 lg:text-sm">
                These dates are provisional and may be updated following
                approval by the Conference Organising Committee.
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                <span>ICETIA 2027</span>
                <LuArrowDownRight className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#0b1626]">
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            {items.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border-b border-white/10 px-5 last:border-b-0 sm:px-6 lg:px-8"
              >
                <AccordionTrigger className="py-6 text-left text-sm font-semibold text-white hover:no-underline">
                  {item.trigger}
                </AccordionTrigger>

                <AccordionContent className="pb-7">
                  <div className="max-w-4xl">
                    {item.content}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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