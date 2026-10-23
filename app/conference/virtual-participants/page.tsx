import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import { LuCircleHelp, LuGlobe, LuLaptop, LuWifi } from "react-icons/lu";


export default function virtualParticipants () {
    return (
        <section>
            <Navbar />
             {/* =========================================================
          HYBRID PARTICIPATION
      ========================================================= */}
      <main
        className="border-b border-white/10 bg-[#080f1a]"
      >
        <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-24 xl:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 border border-blue-400/20 bg-blue-400/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400">
              <LuWifi className="h-3.5 w-3.5" />
              Hybrid Participation
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight xl:text-4xl text-white">
              Participate from{" "}
              <span className="text-blue-400">
                anywhere.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              ICETIA 2027 may provide online participation options for
              registered participants who are unable to attend the conference
              physically.
            </p>
          </div>

          <div className="mt-12 grid gap-6 grid-cols-3">
            <div className="border border-white/10 bg-[#080f1a] p-7">
              <LuLaptop className="h-5 w-5 text-blue-400" />

              <h3 className="mt-6 text-sm font-semibold text-white">
                Online Presentation
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Accepted presenters participating remotely will receive
                instructions on presentation format, connection details and
                session timing.
              </p>
            </div>

            <div className="border border-white/10 bg-[#080f1a] p-7">
              <LuWifi className="h-5 w-5 text-blue-400" />

              <h3 className="mt-6 text-sm font-semibold text-white">
                Virtual Access
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Registered online participants will receive the relevant
                access information and technical instructions before the
                conference.
              </p>
            </div>

            <div className="border border-white/10 bg-[#080f1a] p-7">
              <LuGlobe className="h-5 w-5 text-blue-400" />

              <h3 className="mt-6 text-sm font-semibold text-white">
                International Participation
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                International participants who cannot travel to Nigeria may
                participate remotely where the applicable conference
                participation option is available.
              </p>
            </div>
          </div>

          <div className="mt-8 border border-white/10 bg-[#080f1a] p-6">
            <div className="flex gap-4">
              <LuCircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />

              <div>
                <p className="text-sm font-semibold text-white">
                  Online presentation guidance
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Detailed online presentation requirements, supported
                  platforms, presentation duration and technical checks will
                  be communicated to accepted presenters before the event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PublicationFooter />
      <Footer />
        </section>
    )
}