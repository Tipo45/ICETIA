"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import {
  LuArrowUpRight,
  LuBuilding2,
  LuBus,
  LuCalendarDays,
  LuCheck,
  LuCircleHelp,
  LuGlobe,
  LuHotel,
  LuLaptop,
  LuMapPin,
  LuNavigation,
  LuPlane,
  LuShieldCheck,
  LuWifi,
} from "react-icons/lu";

export default function TravelVenue() {
  return (
    <section>
      <Navbar />
      <main className="min-h-screen bg-[#080f1a] text-white mb-2">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-white/10">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />

        <div className="container relative mx-auto px-5 pb-16 pt-20 lg:px-8 lg:pb-24 lg:pt-28 xl:px-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-blue-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Travel & Venue
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Plan your journey.
              <br />
              <span className="text-blue-400">
                Join us at ICETIA 2027.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
              Everything you need to plan your participation at the
              International Conference on Emerging Technologies, Innovations
              and Applications. Find venue information, accommodation,
              transportation guidance and options for participating online.
            </p>

            {/* <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#venue"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Explore the Venue
                <LuArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="/conferences/virtual-participants"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 px-6 text-sm font-semibold text-slate-300 transition-colors hover:border-blue-400/30 hover:text-white"
              >
                Virtual Participation
              </a>
            </div> */}
          </div>

          {/* Quick facts */}
          <div className="mt-14 grid border border-white/10 grid-cols-1">
            <div className="border-b border-white/10 p-5">
              <LuCalendarDays className="h-5 w-5 text-blue-400" />

              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Conference Dates
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                28 – 30 April 2027
              </p>
            </div>

            <div className="border-b border-white/10 p-5">
              <LuBuilding2 className="h-5 w-5 text-blue-400" />

              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Venue
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                TBA
              </p>
            </div>

            <div className="border-b border-white/10 p-5">
              <LuMapPin className="h-5 w-5 text-blue-400" />

              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Location
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                Otuoke, Bayelsa State, Nigeria
              </p>
            </div>

            <div className="p-5">
              <LuGlobe className="h-5 w-5 text-blue-400" />

              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Participation
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                On-site & Hybrid
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VENUE
      ========================================================= */}
      <section
        id="venue"
        className="border-b border-white/10"
      >
        <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-24 xl:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* Text */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-blue-500" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">
                  Conference Venue
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight lg:text-4xl">
                Meet us at{" "}
                <span className="text-blue-400">
                  Federal University Otuoke.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                ICETIA 2027 will be hosted at the Federal University Otuoke
                campus in Otuoke, Bayelsa State, Nigeria.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-500/10 text-blue-400">
                    <LuBuilding2 className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Proposed Conference Venue
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      TBA
                      <br />
                      Federal University Otuoke
                      <br />
                      Otuoke, Ogbia LGA
                      <br />
                      Bayelsa State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-500/10 text-blue-400">
                    <LuMapPin className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Campus Location
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      The university is located in Otuoke, Ogbia Local
                      Government Area of Bayelsa State.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border border-blue-500/20 bg-blue-500/3 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-400">
                  Venue Notice
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Final conference hall and campus venue details will be
                  confirmed by the ICETIA 2027 organizing committee and
                  published here ahead of the conference.
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden border border-white/10 bg-slate-900">
              <div className="relative aspect-16/10 w-full">
                <iframe
                  title="Federal University Otuoke location map"
                  src="https://www.google.com/maps?q=Federal%20University%20Otuoke%2C%20Bayelsa%20State%2C%20Nigeria&output=embed"
                  className="absolute inset-0 h-full w-full border-0 grayscale-20"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex gap-3 border-t border-white/10 p-5 flex-row items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Federal University Otuoke
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Otuoke, Bayelsa State, Nigeria
                  </p>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Federal+University+Otuoke+Bayelsa+State+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 transition-colors hover:text-blue-300"
                >
                  Open in Google Maps
                  <LuArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRAVEL
      ========================================================= */}
      <section className="border-b border-white/10 bg-[#080f1a]">
        <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-24 xl:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-blue-500" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">
                Getting Here
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight lg:text-4xl">
              Travel to{" "}
              <span className="text-blue-400">
                Otuoke & Bayelsa.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              Otuoke is located in Ogbia Local Government Area of Bayelsa
              State. Participants travelling from outside the state should
              plan their onward ground transportation to Otuoke in advance.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
            {/* By Air */}
            <div className="bg-[#080f1a] p-7 lg:p-9">
              <div className="flex h-11 w-11 items-center justify-center bg-blue-500/10 text-blue-400">
                <LuPlane className="h-5 w-5" />
              </div>

              <h3 className="mt-7 text-lg font-semibold">
                By Air
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                International and long-distance travellers can fly into a
                suitable regional airport and arrange onward road
                transportation to Otuoke.
              </p>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  Airport Guidance
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Detailed airport recommendations, transfer arrangements and
                  estimated travel times will be published by the organizing
                  committee.
                </p>
              </div>
            </div>

            {/* By Road */}
            <div className="bg-[#080f1a] p-7 lg:p-9">
              <div className="flex h-11 w-11 items-center justify-center bg-blue-500/10 text-blue-400">
                <LuBus className="h-5 w-5" />
              </div>

              <h3 className="mt-7 text-lg font-semibold">
                By Road
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Participants travelling from within Nigeria can reach Bayelsa
                by road and continue onward to Otuoke. We recommend arranging
                reliable local transportation before arrival.
              </p>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  Local Transfers
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Conference shuttle and local transfer information will be
                  announced closer to the event.
                </p>
              </div>
            </div>
          </div>

          {/* Travel note */}
          <div className="mt-6 flex gap-4 border border-white/10 bg-slate-950 p-5">
            <LuNavigation className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />

            <div>
              <p className="text-sm font-semibold text-white">
                Travel planning
              </p>

              <p className="mt-1 text-xs leading-6 text-slate-500">
                Participants are encouraged to allow sufficient travel time
                between their arrival point and Otuoke, particularly when
                travelling on the day before the conference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACCOMMODATION
      ========================================================= */}
      <section
        id="accommodation"
        className="border-b border-white/10"
      >
        <div className="container mx-auto px-5 py-8 lg:px-8 lg:py-16 xl:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-blue-500" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">
                  Accommodation
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight lg:text-4xl">
                Where to{" "}
                <span className="text-blue-400">
                  stay.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                Participants may choose accommodation in Otuoke or nearby
                Yenagoa depending on availability, budget and preferred
                travel arrangements.
              </p>

              <div className="mt-8 border border-blue-500/20 bg-blue-500/3 p-5">
                <LuHotel className="h-5 w-5 text-blue-400" />

                <p className="mt-4 text-sm font-semibold text-white">
                  Accommodation guidance
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  A recommended accommodation list, including contact details
                  and approximate distance from the venue, can be added here
                  once the organizing committee confirms partner hotels.
                </p>
              </div>
            </div>

            <div className="grid gap-4 grid-cols-2">
              <div className="border border-white/10 bg-[#080f1a] p-6">
                <LuBuilding2 className="h-5 w-5 text-blue-400" />

                <h3 className="mt-6 text-sm font-semibold text-white">
                  Otuoke
                </h3>

                <p className="mt-3 text-xs leading-6 text-slate-500">
                  Staying in or around Otuoke can provide convenient access
                  to the university campus.
                </p>
              </div>

              <div className="border border-white/10 bg-[#080f1a] p-6">
                <LuHotel className="h-5 w-5 text-blue-400" />

                <h3 className="mt-6 text-sm font-semibold text-white">
                  Yenagoa
                </h3>

                <p className="mt-3 text-xs leading-6 text-slate-500">
                  Yenagoa offers additional accommodation and hospitality
                  options for participants who prefer to stay in the state
                  capital.
                </p>
              </div>

              <div className="border border-white/10 bg-[#080f1a] p-6 col-span-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  Important
                </p>

                <p className="mt-3 text-xs leading-6 text-slate-500">
                  Participants are responsible for making their own
                  accommodation arrangements unless otherwise stated by the
                  conference organizers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =========================================================
          TRAVEL CHECKLIST
      ========================================================= */}
      <section className="bg-[#080f1a]">
        <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
          <div className="">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Before You Travel
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight">
                  Plan ahead for ICETIA 2027.
                </h2>
              </div>

              <div className="grid gap-3 grid-cols-2 lg:grid-cols-1 lg:max-w-2xl">
                {[
                  "Confirm your registration.",
                  "Book accommodation early.",
                  "Plan your route to Otuoke.",
                  "Check visa requirements if applicable.",
                  "Keep your conference confirmation accessible.",
                  "Watch for final travel and venue updates.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-500"
                  >
                    <LuCheck className="h-4 w-4 shrink-0 text-blue-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer strip */}
          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Emerging Technologies · Innovations · Applications
              </p>

              <p className="text-xs text-slate-600">
                ICETIA 2027 · 28 – 30 April · Federal University Otuoke
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <PublicationFooter />
    <Footer />
    </section>
  );
}