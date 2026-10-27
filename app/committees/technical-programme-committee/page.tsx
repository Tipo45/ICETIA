"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  FaUsers
} from "react-icons/fa";
import {
  LuCalendarDays
} from "react-icons/lu";
import Image from "next/image";
import PublicationFooter from "@/components/publicationfooter";
import PublicationHeader from "@/components/publicationheader";

const technicalProgrammeCommittee = [
  {
    role: "Chair",
    name: "Dr Oluwaseun Bamgboye",
    href: "https://www.researchgate.net/profile/Oluwaseun-Bamgboye",
    image: "/public/images",
    affiliation: "Edinburgh Napier University, United Kingdom",
  },
  {
    role: "Co-Chair",
    name: "Professor Victor Ekong",
    href: "https://www.linkedin.com/in/victor-ekong-6b2b0227b/",
    image: "/public/images",
    affiliation: "University of Uyo, Nigeria",
  },
  {
    role: "Co-Chair",
    name: "Professor Abayomi Jegede",
    href: "https://www.linkedin.com/in/abayomi-jegede-46131671/",
    image: "/public/images",
    affiliation: "Edo State University Iyamho, Nigeria",
  },
  {
    role: "Member",
    name: "Associate Prof. Godwin A. Thomas",
    href: "https://scholar.google.com/citations?user=xrLJ2IQAAAAJ&hl=en",
    image: "/public/images",
    affiliation: "University of Jos, Nigeria",
  },
  {
    role: "Member",
    name: "Dr Belinda Onyeashie",
    href: "https://www.linkedin.com/in/dr-belinda-onyeashie-b709a398/",
    image: "/public/images",
    affiliation:
      "University of the West of England, United Kingdom",
  },
  {
    role: "Member",
    name: "Alams Mammuan",
    href: "https://www.researchgate.net/profile/Mammuan-Alams",
    image: "/public/images",
    affiliation: "Cranfield University, United Kingdom",
  },
  {
    role: "Member",
    name: "Dr Fekumo Bolouembeledo",
    href: "https://scholar.google.com/citations?hl=en&user=q8PraKkAAAAJ",
    image: "/public/images",
    affiliation: "University of South Africa, Pretoria",
  },
  {
    role: "Member",
    name: "Faisal A. Garba",
    href: "https://www.linkedin.com/in/2faisalgama/",
    image: "/public/images",
    affiliation:
      "Sa'adatu Rimi College of Education, Nigeria",
  },
  {
    role: "Member",
    name: "Dr. Ikiomoye Douglas Emmanuel",
    href: "https://www.linkedin.com/in/ikiomoye-douglas-emmanuel/",
    image: "/public/images",
    affiliation: "UGM Manchester, United Kingdom",
  },
]


export default function CommitteesPage() {
  return (
    <section className="min-h-screen bg-white text-slate-950">
      <div className="sticky top-0 z-50">
        <PublicationHeader />
        <Navbar />
      </div>

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


      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-5 py-6 lg:px-8 lg:py-8 xl:px-10 xl:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Technical Evaluation
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                Technical
                <span className="text-blue-600"> Programme.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              Coordinates the call for Papers, peer review, technical tracks, paper decisions, camera-ready submissions and the technical conference programme.
            </p>
          </div>

          <div className="mt-10 border-t border-slate-200 lg:mt-12">
            {technicalProgrammeCommittee.map(
              (member, index) => (
                <div
                  key={member.name}
                  className="group grid gap-5 border-b border-slate-200 py-6 lg:grid-cols-[80px_1fr_1fr] lg:items-center lg:gap-8 lg:py-7"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold tracking-widest text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
                      <Image src={member.image} width={48} height={48} alt={member.name} className="rounded-md w-12 h-12 object-cover" />
                    </div> */}
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                      {member.role}
                    </p>

                    <a href={member.href} target="blank" className="mt-2 text-lg font-semibold tracking-tight text-slate-900 lg:text-xl hover:text-blue-500">
                      {member.name}
                    </a>
                  </div>

                  <p className="text-sm leading-6 text-slate-500 lg:max-w-md">
                    {member.affiliation}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <PublicationFooter />

      <Footer />
    </section>
  );
}