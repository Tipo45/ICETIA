"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BsAward } from "react-icons/bs";
import {
  FaArrowRight,
  FaCalendar,
  FaRegLightbulb,
  FaUsers,
} from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { IoBriefcaseOutline } from "react-icons/io5";
import {
  LuArrowUpRight,
  LuFileCheck,
  LuGraduationCap,
  LuLayers3,
} from "react-icons/lu";
import { RiProgress1Line } from "react-icons/ri";

const programmeComponents = [
  {
    icon: FaCalendar,
    number: "01",
    title: "Opening Ceremony",
    description:
      "Opening ceremony and institutional addresses.",
  },
  {
    icon: RiProgress1Line,
    number: "02",
    title: "Keynote & Plenary Sessions",
    description:
      "Presentations delivered by distinguished keynote speakers and invited experts.",
  },
  {
    icon: FiBookOpen,
    number: "03",
    title: "Technical Paper Sessions",
    description:
      "Presentation of accepted research papers across conference tracks.",
  },
  {
    icon: LuGraduationCap,
    number: "04",
    title: "Workshops & Tutorials",
    description:
      "Hands-on sessions on emerging technologies and research practices.",
  },
  {
    icon: FaUsers,
    number: "05",
    title: "Panel Discussions",
    description:
      "Interactive discussions involving academia, industry and government.",
  },
  {
    icon: FaRegLightbulb,
    number: "06",
    title: "Innovation Showcase",
    description:
      "Technology exhibitions, product demonstrations and innovation showcases.",
  },
  {
    icon: IoBriefcaseOutline,
    number: "07",
    title: "Networking Sessions",
    description:
      "Networking opportunities for researchers, students and industry professionals.",
  },
  {
    icon: BsAward,
    number: "08",
    title: "Awards & Closing Ceremony",
    description:
      "Certificate presentation, awards and conference communiqué.",
  },
];

const workshops = [
  "Artificial Intelligence & Machine Learning Applications",
  "Cybersecurity, Privacy & Digital Trust",
  "Smart Systems, Internet of Things & Intelligent Environments",
  "Data Science, Analytics & Decision Intelligence",
  "Cloud Computing, Edge Computing & Digital Infrastructure",
  "Academic Publishing, Research Visibility & Grant Proposal Development",
  "Technology Entrepreneurship & Innovation Commercialisation",
  "Digital Transformation for Education, Governance, Health & Industry",
];

const outputs = [
  "Presentation of high-quality research papers",
  "Strengthened academic and industry collaborations",
  "Increased research visibility for Federal University Otuoke",
  "Publication opportunities for accepted papers",
  "Capacity building for students and early-career researchers",
  "Development of partnerships with sponsors, professional bodies and research organisations",
  "Formal conference communiqué highlighting recommendations and future directions",
];

export default function ProgrammePage() {
  const router = useRouter();

  const handleRegistrationNavigation = () => {
    router.push("/#registration");
  };

  const handleSubmitPaperButton = () => {
    router.push("/registration/authors-registration");
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-white/10 bg-slate-950 text-white">
        <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">

            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                <LuLayers3 className="h-4 w-4" />
                ICETIA 2027
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                Conference
                <span className="text-blue-400"> Programme.</span>
              </h1>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
                ICETIA 2027 has been designed to foster collaboration,
                showcase innovative research, promote knowledge exchange and
                strengthen partnerships among academia, industry and
                government.
              </p>
            </div>

          </div>

          {/* Programme Meta */}
          <div className="mt-10 grid grid-cols-2 border-t border-white/10 lg:mt-12 lg:grid-cols-4">

            <div className="border-r border-white/10 px-4 py-5 first:pl-0">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Dates
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                28 – 30 April, 2027
              </p>
            </div>

            <div className="border-r-0 px-4 py-5 lg:border-r lg:border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Venue
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Federal University Otuoke
              </p>
            </div>

            <div className="hidden border-r border-white/10 px-4 py-5 lg:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Programme Areas
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                08 Components
              </p>
            </div>

            <div className="hidden px-4 py-5 lg:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Focus
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Research & Innovation
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Programme Components */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Programme Structure
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                What to expect
                <span className="text-blue-600"> at ICETIA.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              The conference programme brings together presentations,
              discussions, practical sessions, exhibitions and opportunities
              for meaningful professional connections.
            </p>

          </div>

          <div className="mt-10 border-t border-slate-200 lg:mt-12">

            {programmeComponents.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group grid gap-5 border-b border-slate-200 py-6 lg:grid-cols-[80px_1fr_1.2fr] lg:items-center lg:gap-8 lg:py-7"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold tracking-widest text-slate-400">
                      {item.number}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-6 text-slate-500 lg:max-w-xl">
                    {item.description}
                  </p>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Workshops */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Practical Sessions
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                Proposed
                <span className="text-blue-600"> workshops.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              Specialised workshops will provide practical and focused
              engagement around emerging technologies, research practice,
              innovation and digital transformation.
            </p>

          </div>

          <div className="mt-10 grid border-l border-t border-slate-200 lg:mt-12 lg:grid-cols-2">

            {workshops.map((item, index) => (
              <div
                key={item}
                className={`group flex items-start gap-4 border-b border-r border-slate-200 bg-white p-5 transition-colors hover:bg-slate-950 lg:p-6 ${
                  index % 2 === 0 ? "" : ""
                }`}
              >
                <span className="text-xs font-bold tracking-widest text-blue-600 transition-colors group-hover:text-blue-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">

                    <p className="text-sm font-semibold leading-6 text-slate-800 transition-colors group-hover:text-white lg:text-base">
                      {item}
                    </p>

                    <FaArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-400" />

                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Expected Outputs */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">

            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <LuFileCheck className="h-5 w-5" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Conference Outcomes
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                Expected
                <span className="text-blue-600"> outputs.</span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">
                ICETIA 2027 aims to create tangible academic, professional
                and institutional outcomes beyond the conference itself.
              </p>
            </div>

            <div className="border-t border-slate-200 lg:border-l lg:border-t-0">

              {outputs.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 border-b border-slate-200 px-0 py-5 lg:px-6"
                >
                  <span className="mt-1 text-xs font-bold tracking-widest text-blue-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-6 text-slate-600 lg:text-base">
                    {item}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950/90 text-white mb-2">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-16">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-blue-500" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                  Participate
                </span>
              </div>

              <h2 className="mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                Be part of the
                <span className="text-blue-400"> conversation.</span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
                Join an international community of researchers, innovators
                and industry professionals driving sustainable digital
                transformation through emerging technologies.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">

              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                ICETIA 2027
              </p>

              <div className="mt-5 flex flex-col gap-3">

                <Button
                  onClick={handleRegistrationNavigation}
                  size="lg"
                  className="group h-11 rounded-full bg-blue-600 px-6 text-sm font-semibold hover:bg-blue-500"
                >
                  Register Now
                  <LuArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>

                <Button
                  onClick={handleSubmitPaperButton}
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full border-white/20 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white hover:text-slate-950"
                >
                  Submit a Paper
                </Button>

              </div>

            </div>

          </div>

          <div className="mt-12 border-t border-white/10 pt-6 lg:mt-14">

            <div className="flex flex-col gap-3 text-xs text-slate-600 lg:flex-row lg:items-center lg:justify-between">

              <span>
                Emerging Technologies · Innovation · Applications
              </span>

              <span>
                28 – 30 April, 2027 · Federal University Otuoke
              </span>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}