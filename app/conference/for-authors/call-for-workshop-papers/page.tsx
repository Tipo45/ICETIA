import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import PublicationHeader from "@/components/publicationheader";
import Link from "next/link";
import {
  LuArrowUpRight,
  LuCalendarDays,
  LuCheck,
  LuFileText,
  LuGlobe,
  LuMic,
  LuSend,
  LuSparkles,
} from "react-icons/lu";

const workshopTopics = [
  {
    name: "Artificial Intelligence & Machine Learning Applications",
    href: "/conference/for-authors/call-for-workshop-papers/artificial-intelligence-&-machine-learning-applications"
  },
  {
    name: "Cybersecurity, Privacy & Digital Trust",
    href: "/conference/for-authors/call-for-workshop-papers/cybersecurity-privacy-&-digital-trust"
  },
  {
    name: "Smart Systems, Internet of Things & Intelligent Environments",
    href: "/conference/for-authors/call-for-workshop-papers/smart-systems-internet-of-things-&-intelligent-environments"
  },
  {
    name: "Data Science, Analytics & Decision Intelligence",
    href: "/conference/for-authors/call-for-workshop-papers/data-science-analytics-&-decision-intelligence"
  },
  {
    name: "Cloud Computing, Edge Computing & Digital Infrastructure",
    href: "/conference/for-authors/call-for-workshop-papers/cloud-computing-edge-computing-&-digital-infrastructure"
  },
  {
    name: "Academic Publishing, Research Visibility & Grant Proposal Development",
    href: "/conference/for-authors/call-for-workshop-papers/academic-publishing-research-visibility-&-grant-proposal-development"
  },
  {
    name: "Technology Entrepreneurship & Innovation Commercialisation",
    href: "/conference/for-authors/call-for-workshop-papers/technology-entrepreneurship-&-innovation-commercialisation"
  },
  {
    name: "Digital Transformation for Education, Governance, Health & Industry",
    href: "/conference/for-authors/call-for-workshop-papers/digital-transformation-for-education-governance-health-&-industry"
  }
];

const submissionRequirements = [
  "Original workshop papers presenting research, emerging ideas, practical solutions, case studies, or innovative applications.",
  "Submissions should clearly identify the problem, proposed approach, contribution, and relevance to the workshop theme.",
  "Papers should follow the official ICETIA submission and formatting guidelines.",
  "All submissions will be subject to an appropriate review process before acceptance.",
];

export default function WorkShop() {
  return (
    <section>
      <div className="sticky top-0 z-50">
        <PublicationHeader />
        <Navbar />
      </div>

      <main className="bg-slate-950">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,139,255,0.16),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(0,209,255,0.10),transparent_30%)]" />

          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 border border-blue-400/20 bg-blue-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                <LuMic className="h-4 w-4" />
                Call for Workshop Papers
              </div>

              <p className="mb-5 text-sm font-medium text-blue-300">
                ICETIA 2027 · 28–30 April 2027
              </p>

              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white lg:text-5xl xl:text-6xl">
                Workshops for Emerging Ideas, Practical Solutions & New
                Directions
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-7 text-slate-400 lg:text-lg">
                ICETIA 2027 invites researchers, academics, practitioners,
                innovators and technology professionals to submit workshop
                papers exploring emerging technologies, practical applications,
                new methodologies and ideas that can stimulate focused
                discussion and collaboration.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/registration"
                  className="inline-flex items-center gap-2 bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                  Register for ICETIA 2027
                  <LuArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-transparent border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  Submit Workshop Paper
                  <LuSend className="h-4 w-4" />
                </Link>


              </div>
            </div>
          </div>
        </section>

        {/* Conference information */}
        <section className="border-b border-white/10 bg-[#080f1a]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-6 lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:px-8">
            <div className="flex items-center gap-4 py-7 lg:px-8 lg:first:pl-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-400/20 bg-blue-400/5">
                <LuCalendarDays className="h-5 w-5 text-blue-400" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Conference
                </p>

                <p className="mt-1 font-semibold text-white">
                  28–30 April 2027
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-7 lg:px-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-400/20 bg-blue-400/5">
                <LuGlobe className="h-5 w-5 text-blue-400" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Location
                </p>

                <p className="mt-1 font-semibold text-white">
                  Federal University Otuoke
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-7 lg:px-8 lg:last:pr-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-400/20 bg-blue-400/5">
                <LuSparkles className="h-5 w-5 text-blue-400" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Edition
                </p>

                <p className="mt-1 font-semibold text-white">ICETIA 2027</p>
              </div>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="border-b border-white/10 bg-[#080f1a]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Suggested Areas
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                Workshop topics
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Workshop submissions may address, but are not limited to, the
                following areas.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 border-l border-t border-white/10 lg:grid-cols-3 xl:grid-cols-4">
              {workshopTopics.map((topic, index) => (
                <div
                  key={topic.name}
                  className="group flex min-h-52 flex-col border-b border-r border-white/10 p-6 transition-colors duration-300 hover:bg-white/3 lg:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <LuCheck className="h-4 w-4 text-blue-400 opacity-60 transition-opacity group-hover:opacity-100" />
                  </div>

                  <p className="mt-6 flex-1 text-sm font-medium leading-6 text-slate-300 transition-colors group-hover:text-white">
                    {topic.name}
                  </p>

                  {/* <a
        href={topic.href}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#07111f]"
      >
        Submit Paper
        <LuArrowUpRight className="h-4 w-4" />
      </a> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submission requirements */}
        <section className="border-b border-white/10 bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              <div>
                <div className="flex h-12 w-12 items-center justify-center border border-blue-400/20 bg-blue-400/5">
                  <LuFileText className="h-5 w-5 text-blue-400" />
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Submission Requirements
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                  What to submit
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Prepare your workshop paper according to the official ICETIA
                  submission guidelines before submitting it for review.
                </p>
              </div>

              <div className="divide-y divide-white/10 border-y border-white/10">
                {submissionRequirements.map((requirement, index) => (
                  <div
                    key={requirement}
                    className="flex gap-5 py-6"
                  >
                    <span className="text-xs font-bold text-blue-400">
                      0{index + 1}
                    </span>

                    <p className="text-sm leading-7 text-slate-400">
                      {requirement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Submission process */}
        <section className="border-b border-white/10 bg-[#080f1a]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Submission Process
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                From submission to workshop
              </h2>
            </div>

            <div className="mt-12 grid border-l border-t border-white/10 grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Prepare",
                  text: "Prepare your workshop paper according to the ICETIA submission requirements.",
                },
                {
                  number: "02",
                  title: "Submit",
                  text: "Submit your paper through the official ICETIA submission platform.",
                },
                {
                  number: "03",
                  title: "Review & Decision",
                  text: "Submissions will be reviewed and authors will be notified of the outcome.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="border-b border-r border-white/10 p-7 lg:p-8"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-blue-400">
                    {step.number}
                  </span>

                  <h3 className="mt-8 text-xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-blue-600">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.15),transparent_35%)]" />

          <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Ready to contribute?
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Submit your workshop paper to ICETIA 2027.
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Share your research, ideas and practical innovations with a
                diverse community of researchers and technology professionals.
              </p>
            </div>

            <div className="flex-row space-y-4 space-x-2">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
              >
                Submit Workshop Paper
                <LuSend className="h-4 w-4" />
              </Link>
              <Link
                href="/program/workshops"
                className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#080f1a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#080f1a]/90"
              >
                View Workshop Papers
                <LuArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicationFooter />

      <Footer />
    </section>
  );
}