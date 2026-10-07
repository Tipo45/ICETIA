"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Globe2,
  Mic2,
  Sparkles,
} from "lucide-react";

const keynoteSpeakers = [
  {
    id: 1,
    name: "Dr. Balota",
    role: "AI Researcher",
    institution: "Teesside University",
    country: "United Kingdom",
    image: "/images/keynote_1.jpg",
    topic: "TBA",
    bio: "Dr. Balota is a lecturer in Computer Science and he has vast experience in IT Consultancy, he holds a doctorate (PhD) in Computer Science and Engineering and currently worksa as a lecturer in Computer Science at Teesside University",
    expertise: [
      "IoT",
      "Wireless Sensor Networks",
      "Data Capture and Monitoring",
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Data Scientist",
    institution: "University of Lagos",
    country: "Nigeria",
    image: "/images/keynote-speaker-2.jpg",
    topic: "TBc",
    bio: "A brief biography of the keynote speaker will appear here. Highlight their research, leadership experience, publications, awards, and contributions to technology and society.",
    expertise: [
      "TBC",
      "TBa",
      "TBb",
    ],
  },
  {
    id: 3,
    name: "Bob Johnson",
    role: "Technology Entrepreneur",
    institution: "Federal University of Agricutlture, Bassambiri",
    country: "Nigeria",
    image: "/images/keynote-speaker-3.jpg",
    topic: "TBD",
    bio: "A brief biography of the keynote speaker will appear here. Include relevant professional achievements and their impact within the technology ecosystem.",
    expertise: [
      "TBD",
      "TBa",
      "TBb",
    ],
  },
];

export default function KeynotePage() {
  return (
    <section id="keynote" >
        <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,139,255,0.16),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(0,209,255,0.10),transparent_30%)]" />

        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
            <Link
              href="/"
              className="transition-colors hover:text-blue-400"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-slate-300">Keynote Speakers</span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-blue-400/20 bg-blue-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              <Mic2 className="h-4 w-4" />
              Keynote Speakers
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Voices shaping the
              <span className="block text-blue-400">
                future of technology.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              Meet the distinguished scholars, researchers, innovators, and
              technology leaders who will deliver keynote addresses at ICETIA
              2027.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/registration"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Register for ICETIA 2027
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Conference information */}
      <section className="border-b border-white/10 bg-[#080f1a]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          <div className="flex items-center gap-4 px-0 py-8 sm:px-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-400/20 bg-blue-400/5">
              <CalendarDays className="h-5 w-5 text-blue-400" />
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

          <div className="flex items-center gap-4 px-0 py-8 sm:px-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-400/20 bg-blue-400/5">
              <Globe2 className="h-5 w-5 text-blue-400" />
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

          <div className="flex items-center gap-4 px-0 py-8 sm:px-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-400/20 bg-blue-400/5">
              <Sparkles className="h-5 w-5 text-blue-400" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Edition
              </p>
              <p className="mt-1 font-semibold text-white">
                ICETIA 2027
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section
        id="speakers"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
      >
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Distinguished Speakers
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Meet our keynote speakers
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-400">
            Leading voices from academia, industry, research, and innovation
            will share perspectives on the technologies and ideas shaping our
            future.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {keynoteSpeakers.map((speaker) => (
            <article
              key={speaker.id}
              className="group overflow-hidden border border-white/10 bg-[#0a1625] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30"
            >
              {/* Speaker image */}
              <div className="relative aspect-4/4.5 overflow-hidden bg-slate-900">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#0a1625] via-[#0a1625]/60 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="inline-flex items-center gap-2 border border-blue-400/20 bg-slate-950/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-blue-300 backdrop-blur-sm">
                    <Mic2 className="h-3 w-3" />
                    Keynote Speaker
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">
                  {speaker.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-blue-400">
                  {speaker.role}
                </p>

                <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                  <Globe2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {speaker.institution}
                    <br />
                    {speaker.country}
                  </span>
                </div>

                <div className="my-6 h-px bg-white/10" />

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Keynote Topic
                </p>

                <h4 className="mt-2 text-base font-semibold leading-6 text-white">
                  {speaker.topic}
                </h4>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-400">
                  {speaker.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {speaker.expertise.map((item) => (
                    <span
                      key={item}
                      className="border border-white/10 bg-white/3 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Keynote */}
      <section className="border-y border-white/10 bg-[#080f1a]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="flex h-14 w-14 items-center justify-center border border-blue-400/20 bg-blue-400/5">
                <Mic2 className="h-6 w-6 text-blue-400" />
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Featured Keynote
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Shaping the next generation of technological innovation
              </h2>
            </div>

            <div>
              <p className="text-base leading-8 text-slate-400">
                ICETIA 2027 brings together distinguished experts to explore
                emerging technologies, innovative research, digital
                transformation, and their applications across society and
                industry.
              </p>

              <p className="mt-6 text-base leading-8 text-slate-400">
                The keynote programme will provide a platform for thought
                leadership, interdisciplinary dialogue, and new perspectives
                on how technology can address contemporary challenges and
                create sustainable opportunities.
              </p>

              <div className="mt-8 border-l-2 border-blue-500 pl-5">
                <p className="text-sm font-medium leading-7 text-slate-300">
                  Detailed keynote topics, speaker profiles, and presentation
                  schedules will be announced as the conference programme is
                  finalized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Attend */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              More than presentations
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Connect with ideas that move technology forward.
            </h2>
          </div>

          <p className="text-base leading-8 text-slate-400">
            Keynote sessions at ICETIA are designed to encourage meaningful
            conversations between researchers, students, academics,
            practitioners, entrepreneurs, policymakers, and technology
            enthusiasts.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: "01",
              title: "Expert Insights",
              text: "Learn directly from leaders shaping their fields.",
            },
            {
              number: "02",
              title: "New Perspectives",
              text: "Discover emerging ideas, technologies, and approaches.",
            },
            {
              number: "03",
              title: "Meaningful Connections",
              text: "Engage with researchers, professionals, and innovators.",
            },
            {
              number: "04",
              title: "Future Thinking",
              text: "Explore what technology means for tomorrow.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="border border-white/10 bg-[#0a1625] p-6"
            >
              <span className="text-sm font-bold text-blue-400">
                {item.number}
              </span>

              <h3 className="mt-6 text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-linear-to-r from-blue-950/40 via-[#080f1a] to-cyan-950/20">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            ICETIA 2027
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Be part of the conversation.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
            Join researchers, academics, innovators, and technology leaders at
            the International Conference on Emerging Technologies, Innovation
            & Applications.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/registration"
              className="inline-flex items-center gap-2 bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Register for ICETIA 2027
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
    </section>
  );
}