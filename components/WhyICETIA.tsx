
import Link from "next/link";
import { LuArrowRight, LuGlobe, LuLightbulb, LuNetwork, LuTarget } from "react-icons/lu";

export default function WhyICETIA() {
  const pillars = [
    {
      icon: <LuTarget />,
      title: "A Flagship Conference",
      description:
        "ICETIA is being established as a flagship international conference that brings together researchers, academics, innovators, industry professionals and emerging technology leaders.",
    },
    {
      icon: <LuNetwork />,
      title: "A Platform for Collaboration",
      description:
        "The conference creates a platform for interdisciplinary dialogue, knowledge exchange and meaningful collaboration between academia, industry, government and the wider technology ecosystem.",
    },
    {
      icon: <LuLightbulb />,
      title: "Advancing Innovation",
      description:
        "ICETIA provides a space for emerging ideas, research breakthroughs and practical innovations that can contribute to solving contemporary challenges and shaping the future.",
    },
    {
      icon: <LuGlobe />,
      title: "An International Outlook",
      description:
        "While hosted by Federal University Otuoke, ICETIA is designed with an international outlook, welcoming diverse perspectives and research communities from Nigeria and beyond.",
    },
  ];

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="container mx-auto px-5 py-5 lg:px-8 lg:py-8 xl:px-10">

        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">

          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              Institutional Vision
            </div>

            <h2 className="mt-4 max-w-md text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
              Why ICETIA 2027 Matters
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-base leading-8 text-slate-600 lg:text-lg lg:leading-9">
              ICETIA 2027 marks the beginning of a new international platform
              for advancing conversations around emerging technologies,
              innovations and their applications to society.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500 lg:text-base lg:leading-8">
              As its maiden edition, ICETIA is being established with a
              long-term vision: to grow into a flagship recurring international
              conference hosted by Federal University Otuoke, providing a
              sustainable platform for research dissemination, collaboration,
              innovation and knowledge exchange.
            </p>
          </div>
        </div>

        {/* Vision statement */}
        <div className="mt-16 border border-blue-100 bg-slate-50 p-9 lg:mt-20 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-10">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-blue-600 text-white">
              <LuLightbulb className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                The Vision
              </p>

              <h3 className="mt-3 max-w-4xl text-2xl font-bold leading-tight text-slate-950 lg:text-3xl">
                Building a lasting platform for technology, research and
                innovation.
              </h3>

              <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-600 lg:text-base lg:leading-8">
                ICETIA is envisioned not simply as a one-time event, but as
                the foundation of a recurring international platform where
                ideas can be shared, partnerships can be formed, research can
                find new applications, and emerging technologies can be
                examined from diverse academic and practical perspectives.
              </p>
            </div>

          </div>
        </div>

        {/* Vision pillars */}
        <div className="mt-10 grid gap-5 grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => {

            return (
              <div
                key={pillar.title}
                className="group border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center border border-blue-100 bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {pillar.icon}
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-950">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing statement */}
        <div className="mt-14 flex flex-col gap-6 border-t border-slate-200 pt-8 items-center lg:items-start">
          <p className="max-w-2xl text-sm leading-7 text-slate-500">
            The 2027 edition is the starting point. Its ambition is to create
            a conference community and intellectual platform that continues to
            grow with each edition.
          </p>

          {/* <Link
            href="/#about"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            Learn more about ICETIA
            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link> */}
        </div>

      </div>
    </section>
  );
}