import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import {
  LuArrowUpRight,
  LuBuilding2,
  LuHandshake,
  LuMegaphone,
  LuUsers,
} from "react-icons/lu";

const opportunities = [
  {
    icon: LuMegaphone,
    number: "01",
    title: "Brand Visibility",
    description:
      "Create meaningful visibility for your organisation among researchers, academics, technology professionals and other conference participants.",
  },
  {
    icon: LuUsers,
    number: "02",
    title: "Industry Engagement",
    description:
      "Connect with emerging talent, researchers and decision-makers through conference activities, exhibitions and professional networking.",
  },
  {
    icon: LuBuilding2,
    number: "03",
    title: "Institutional Partnership",
    description:
      "Support academic research, innovation and knowledge exchange while building stronger relationships with the host institution.",
  },
  {
    icon: LuHandshake,
    number: "04",
    title: "Strategic Collaboration",
    description:
      "Explore opportunities to support technology initiatives, research activities and collaborative programmes beyond the conference.",
  },
];

export default function Sponsorship() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-white/10 bg-slate-950 text-white">
        <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">

            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                <LuHandshake className="h-4 w-4" />
                ICETIA 2027
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                Partner with
                <span className="text-blue-400"> ICETIA.</span>
              </h1>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
                Support a platform bringing together researchers, academics,
                industry professionals, innovators and technology
                practitioners to exchange knowledge and explore emerging
                technologies.
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
                Dates
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                28 – 30 April, 2027
              </p>
            </div>

            <div className="hidden border-r border-white/10 px-4 py-5 lg:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Host
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Federal University Otuoke
              </p>
            </div>

            <div className="hidden px-4 py-5 lg:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Location
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Bayelsa State, Nigeria
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Why Partner
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                Support research.
                <br />
                <span className="text-blue-600">
                  Connect with innovation.
                </span>
              </h2>
            </div>

            <div className="border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">

              <p className="max-w-3xl text-base leading-8 text-slate-600 lg:text-lg">
                Sponsorship of ICETIA 2027 provides organisations with an
                opportunity to contribute to a platform dedicated to
                emerging technologies, innovations and practical applications.
              </p>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500 lg:text-base">
                Through strategic partnerships, the conference aims to
                strengthen connections between academia, industry, government
                and the wider technology ecosystem while supporting research,
                knowledge exchange and professional development.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Opportunities */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Partnership Opportunities
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                Ways to
                <span className="text-blue-600"> engage.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              Sponsorship opportunities can be tailored to support different
              organisational objectives and areas of interest.
            </p>

          </div>

          <div className="mt-10 grid border-l border-t border-slate-200 lg:mt-12 lg:grid-cols-2">

            {opportunities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group border-b border-r border-slate-200 bg-white p-6 transition-colors duration-300 hover:bg-slate-950 lg:p-8"
                >
                  <div className="flex items-start justify-between gap-5">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-slate-300 transition-colors group-hover:text-slate-600">
                      {item.number}
                    </span>

                  </div>

                  <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500 transition-colors group-hover:text-slate-400">
                    {item.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 transition-colors group-hover:text-blue-400">
                    Partnership
                    <LuArrowUpRight className="h-4 w-4" />
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Sponsorship Package */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="overflow-hidden rounded-2xl bg-slate-950">

            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">

              <div className="p-7 lg:p-10 xl:p-12">

                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-blue-500" />

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Sponsorship Package
                  </span>
                </div>

                <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl xl:text-5xl">
                  Detailed partnership packages
                  <span className="text-blue-400"> are coming soon.</span>
                </h2>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
                  Sponsorship tiers, benefits, contribution levels and
                  partnership opportunities will be published as the
                  conference planning progresses.
                </p>

              </div>

              <div className="border-t border-white/10 p-7 lg:border-l lg:border-t-0 lg:p-10">

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-blue-400">
                  <LuHandshake className="h-5 w-5" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Partnership Enquiries
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Contact information for sponsorship enquiries will be
                  published when the official partnership package is
                  available.
                </p>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                    Coming Soon
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                ICETIA 2027
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
                Build connections around emerging technology.
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              <span>28 – 30 April, 2027</span>
              <LuArrowUpRight className="h-4 w-4 text-blue-600" />
            </div>

          </div>

        </div>
      </section>

      <PublicationFooter />

      <Footer />
    </main>
  );
}