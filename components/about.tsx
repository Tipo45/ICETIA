import { LuArrowDownRight, LuSparkles } from "react-icons/lu";
import ImportantDates from "./important-dates";

const focusAreas = [
  "Cybersecurity",
  "Artificial Intelligence",
  "Smart Systems",
  "Computing",
  "Analytics & Data Science",
  "Software Engineering",
  "Internet of Things",
  "Cloud & Edge Computing",
  "Digital Transformation",
  "Health Informatics",
  "Medical Laboratory Technology",
];

const activities = [
  "Keynote Presentations",
  "Technical Papers",
  "Panel Discussions",
  "Workshops",
  "Exhibitions",
  "Networking",
];

export default function About() {
  return (
    <section
      id="about"
      className="border-b border-slate-200 bg-white"
    >
      <div className="container mx-auto px-5 py-6 lg:px-8 lg:py-8 xl:px-10 xl:py-12">

        {/* Section Header */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.8fr] lg:items-end">

          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              <LuSparkles className="h-4 w-4" />
              About ICETIA
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
              Shaping the future of
              <span className="text-blue-600"> technology.</span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-3xl text-base leading-7 text-slate-600 lg:text-lg lg:leading-8">
              The International Conference on Emerging Technologies,
              Innovations and Applications brings together researchers,
              academics, industry professionals, policymakers, innovators,
              postgraduate students and technology practitioners to exchange
              knowledge and explore emerging developments in digital
              technologies.
            </p>
          </div>
        </div>

        {/* Main Introduction */}
        <div className="mt-12 mb-4 border-t border-slate-200 pt-10 lg:mt-14 lg:pt-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">

            <div>
              <p className="text-lg leading-8 text-slate-700 lg:text-xl lg:leading-9">
                <span className="font-semibold text-slate-950">
                  ICETIA 2027
                </span>{" "}
                is a hybrid international academic conference hosted by{" "}
                <a href="https://fuotuoke.edu.ng/" className="font-semibold text-blue-600 hover:underline">
                  Federal University Otuoke, Nigeria.
                </a>{" "}
                Scheduled for 28–30 April 2027, the maiden edition provides a
                platform for presenting research findings, exchanging ideas,
                developing collaborations and examining how emerging
                technologies can address real-world challenges.
              </p>

              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
                The conference focuses on high-quality scholarly engagement
                and practical collaboration across education, industry,
                governance, healthcare, business, security and sustainable
                development.
              </p>
            </div>

            {/* Conference Details */}
            <div className="border-l border-slate-200 pl-6 lg:pl-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Conference
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs text-slate-400">Edition</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    Maiden Edition
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Date</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    28 – 30 April, 2027
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Host Institution</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    Federal University Otuoke
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    Bayelsa State, Nigeria
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <ImportantDates />

        {/* Research Focus */}
        <div className="mt-14 border-t border-slate-200 pt-10 lg:mt-16 lg:pt-12">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Research Focus
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
                Explore emerging fields
              </h3>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-500 lg:text-right">
              Research, innovations and applications across computing,
              informatics, digital technologies and interdisciplinary fields.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Conference Activities */}
        <div className="mt-14 overflow-hidden rounded-2xl bg-slate-950 lg:mt-16">

          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">

            {/* Activity Introduction */}
            <div className="p-7 lg:p-9 xl:p-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                <LuArrowDownRight className="h-5 w-5" />
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Conference Experience
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                Connect.
                <br />
                Share.
                <br />
                Collaborate.
              </h3>

              <p className="mt-5 text-sm leading-6 text-slate-400">
                ICETIA 2027 supports interdisciplinary dialogue and meaningful
                partnerships between academia, industry, government and
                society.
              </p>
            </div>

            {/* Activities */}
            <div className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-2 lg:border-l lg:border-t-0">
              {activities.map((activity, index) => (
                <div
                  key={activity}
                  className={`flex min-h-28 items-end border-white/10 p-5 lg:min-h-32 lg:p-6 ${
                    index % 2 !== 1 ? "lg:border-r" : ""
                  } ${
                    index < 4 ? "border-b" : ""
                  }`}
                >
                  <div>
                    <span className="text-xs font-medium text-blue-400">
                      0{index + 1}
                    </span>

                    <p className="mt-2 text-sm font-semibold text-white lg:text-base">
                      {activity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-slate-500">
            Join us in shaping the future of technology at{" "}
            <span className="font-semibold text-slate-800">
              ICETIA 2027
            </span>
            .
          </p>

          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Research · Innovation · Collaboration
          </span>
        </div>

      </div>
    </section>
  );
}