"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  FaUsers,
} from "react-icons/fa";
import {
  LuCalendarDays,
  LuFileText,
} from "react-icons/lu";
import { MemberRow } from "../../../components/committee";
import Image from "next/image";
import PublicationFooter from "@/components/publicationfooter";

const steeringCommittee = [
  {
    role: "Chair",
    name: "Professor Olugbenga Akinade",
    href: "https://www.linkedin.com/in/ol%C3%BAgb%C3%A9nga-akinad%C3%A9-4b63624a/",
    image: "/images/Olugbenga Akinade.jpg",
    affiliation:
      "Professor of Digital Innovation, Teesside University, United Kingdom",
  },
  {
    role: "Co-Chair",
    name: "Dr. Josiah Balota",
    href: "https://www.linkedin.com/in/josiahspeaks/",
    image: "/images/keynote_1.jpg",
    affiliation: "Teesside University, United Kingdom",
  },
  {
    role: "Chief Host",
    name: "Professor Promise Mebine",
    href: "https://scholar.google.com/citations?hl=en&user=jgEx56AAAAAJ",
    image: "/images/VC.jpeg",
    affiliation:
      "Vice-Chancellor, Federal University Otuoke, Nigeria",
  },
  {
    role: "Host",
    name: "Professor Nateinyin Joy Akporehwe",
    href: "https://scholar.google.com/citations?hl=en&user=cSNjRoAAAAAJ",
    image: "/images/joy nateinyin dvc.jpeg",
    affiliation:
      "Deputy Vice-Chancellor, Research and Development (R&D), Federal University Otuoke",
      objectPosition: "center 10%",
  },
  {
    role: "Host",
    name: "Professor Johnson Ohakwe",
    href: "https://www.researchgate.net/profile/Ohakwe-Johnson",
    image: "/images/dean FOS.jpeg",
    affiliation:
      "Dean, Faculty of Science, Federal University Otuoke, Nigeria",
      objectPosition: "center 10%",
  },
  {
    role: "Host",
    name: "Professor Olufunso O. Abosede",
    href: "https://scholar.google.com/citations?hl=en&user=MZ7FYG4AAAAJ",
    image: "/images/Abosede.jpeg",
    affiliation:
      "Director of Research, Federal University Otuoke, Nigeria",
      objectPosition: "center 10%",
  },
];

const secretariat = [
  {
    role: "Secretary",
    name: "Dr. (Mrs) Merosobo Lawson-Ikuru",
    href: "https://www.linkedin.com/in/merosobo-lawson-ikuru-phd-49609790/",
    image: "/images/secretary.jpeg",
    affiliation: "Federal University Otuoke, Nigeria",
  },
  {
    role: "Assistant Secretary",
    name: "Dr. Ibenate Arubere",
    href: "https://www.linkedin.com/in/dr-ibenate-arubere-998459bb/",
    image: "/images/Ibenate Arubere.jpg",
    affiliation: "Federal University Otuoke, Nigeria",
  },
];


export default function CommitteesPage() {
  return (
    <section className="min-h-screen bg-white text-slate-950">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="border-b border-white/10 bg-[#07111f] text-white">
        <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                <FaUsers className="h-4 w-4" />
                ICETIA 2027
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                Conference
                <span className="text-blue-400"> Committees.</span>
              </h1>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
                Meet the committees responsible for the strategic
                leadership, academic quality, coordination and successful
                delivery of the First International Conference on Emerging
                Technologies, Innovations and Applications.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 border-t border-white/10 lg:mt-12 lg:grid-cols-4">
            <div className="border-r border-white/10 px-4 py-5 first:pl-0">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Conference
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                ICETIA 2027
              </p>
            </div>

            <div className="border-r-0 px-4 py-5 lg:border-r lg:border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Edition
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Maiden Edition
              </p>
            </div>

            <div className="hidden border-r border-white/10 px-4 py-5 lg:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Date
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
                <LuCalendarDays className="h-4 w-4 text-blue-400" />
                28 – 30 April, 2027
              </p>
            </div>

            <div className="hidden px-4 py-5 lg:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Host
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Federal University Otuoke
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STEERING COMMITTEE
      ========================================================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-5 py-6 lg:px-8 lg:py-8 xl:px-10 xl:py-10">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Strategic Leadership
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                Steering
                <span className="text-blue-600"> Committee.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              Providing strategic leadership, institutional oversight and
              high-level guidance for ICETIA 2027.
            </p>
          </div>


<div className="mt-10 grid border-l border-t border-slate-200 tablet:grid-cols-2 xl:grid-cols-3">
  {steeringCommittee.map((member, index) => (
    <div
      key={member.name}
      className="group border-b border-r border-slate-200 p-6 transition-colors duration-300 hover:bg-[#07111f] lg:min-h-64 lg:p-7 xl:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="relative h-75 w-75 max-w-full shrink-0 overflow-hidden rounded-xl bg-slate-200 shadow-md ring-1 ring-slate-200 transition-transform duration-300 group-hover:scale-[1.02]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 90vw, 300px"
            className="object-cover"
            style={{
              objectPosition: member.objectPosition ?? "center 25%",
            }}
          />
        </div>

        <span className="shrink-0 text-xs font-bold tracking-widest text-slate-300 transition-colors group-hover:text-slate-600">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600 transition-colors group-hover:text-blue-400">
        {member.role}
      </p>

      <a
        href={member.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-xl font-bold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-white lg:text-2xl"
      >
        {member.name}
      </a>

      <p className="mt-4 text-sm leading-6 text-slate-500 transition-colors group-hover:text-slate-400">
        {member.affiliation}
      </p>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* =========================================================
                SECRETARIAT
            ========================================================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
            <div>
              <div className="flex h-11 w-11 items-center justify-center border border-slate-200 bg-slate-50 text-blue-600">
                <LuFileText className="h-5 w-5" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Administration
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                Conference
                <span className="text-blue-600"> Secretariat.</span>
              </h2>
            </div>

            <div className="border-t border-slate-200 pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="grid gap-6 tablet:grid-cols-2">
                {secretariat.map((member) => (
                  <MemberRow
                    key={`${member.role}-${member.name}`}
                    role={member.role}
                    name={member.name}
                    href={member.href}
                    image={member.image}
                    affiliation={member.affiliation}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicationFooter />


      <Footer />
    </section>
  );
}