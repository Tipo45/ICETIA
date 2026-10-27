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

const internationalOrganisingCommittee = [
  {
    role: "General Chair",
    name: "Dr. Joshua Teddy Ibibo",
    href: "https://www.linkedin.com/in/dr-joshua-ibibo-83174b85/",
    image: "/images/Josh Ibibo.jpeg",
    affiliation: "Teesside University, United Kingdom",
    objectPosition: "center 20%",
  },
  {
    role: "Co-Chair (Program Chair)",
    name: "Dr Boye Aziboledia Frederick",
    href: "https://www.linkedin.com/in/boye-aziboledia-frederick-a00a02297/",
    image: "/images/Boye Franklin.jpg",
    affiliation: "Federal University Otuoke, Nigeria",
  },
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

      {/* =========================================================
          INTERNATIONAL ORGANISING COMMITTEE
      ========================================================= */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-5 py-6 lg:px-8 lg:py-8 xl:px-10 xl:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Conference Coordination
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                International
                <span className="text-blue-600"> Organising.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              The principal coordinating body responsible for the planning,
              administration and delivery of ICETIA 2027.
            </p>
          </div>


          <div className="mt-10 border-t border-slate-200 lg:mt-12">
            {internationalOrganisingCommittee.map((member, index) => (
              <div
                key={member.name}
                className="group grid grid-cols-1 gap-6 border-b border-slate-200 py-8 lg:grid-cols-1 lg:items-center lg:gap-4 tablet:grid-cols-3 tablet:gap-10 lg:py-10"
              >
                {/* Member number and profile image */}
                <div className="flex items-center gap-4">
                  <span className="shrink-0 text-xs font-bold tracking-widest text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative aspect-square w-full max-w-75 shrink-0 overflow-hidden rounded-xl bg-slate-200 shadow-md ring-1 ring-slate-200 transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 64px), 300px"
                      className="object-cover"
                      style={{
                        objectPosition:
                          member.objectPosition ?? "center 10%",
                      }}
                    />
                  </div>
                </div>

                {/* Role and name */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                    {member.role}
                  </p>

                  <a
                    href={member.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xl font-semibold leading-snug tracking-tight text-slate-900 transition-colors hover:text-blue-500"
                  >
                    {member.name}
                  </a>
                </div>

                {/* Affiliation */}
                <p className="text-sm leading-7 text-slate-500 lg:max-w-md">
                  {member.affiliation}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <PublicationFooter />

      <Footer />
    </section>
  );
}