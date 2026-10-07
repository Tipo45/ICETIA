import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { LuCheck, LuShieldCheck } from "react-icons/lu";

export default function Visa() {
    return (
        <section>
            <Navbar />

            {/* =========================================================
          VISA
      ========================================================= */}
            <div
                id="visa"
                className="border-b border-white/10 bg-[#080f1a]"
            >
                <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-24 xl:px-10">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">

                        {/* Intro */}
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-7 bg-blue-500" />

                                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-500">
                                    International Participants
                                </span>
                            </div>

                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white xl:text-4xl">
                                Travelling to{" "}
                                <span className="text-blue-500">
                                    Nigeria?
                                </span>
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-slate-500">
                                International participants attending ICETIA 2027
                                should review Nigerian entry and visa requirements
                                well in advance of their planned travel.
                            </p>

                            <p className="mt-4 text-sm leading-7 text-slate-500">
                                Participants are responsible for determining
                                whether they require a visa, completing the
                                appropriate application process and meeting all
                                Nigerian entry requirements.
                            </p>
                        </div>

                        {/* Visa Letter */}
                        <div className="border border-white/10 bg-[#080f1a] p-7 lg:p-9">
                            <div className="flex h-11 w-11 items-center justify-center bg-blue-500/10 text-blue-400">
                                <LuShieldCheck className="h-5 w-5" />
                            </div>

                            <h3 className="mt-7 text-lg font-semibold text-white">
                                Visa invitation letters
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-500">
                                Eligible international participants who require
                                supporting documentation for a Nigerian visa
                                application may request an official ICETIA 2027
                                invitation letter from the conference organizing
                                committee.
                            </p>

                            <div className="mt-7">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                                    Who may request a letter?
                                </p>

                                <div className="mt-4 space-y-3">
                                    {[
                                        "Registered conference participants whose registration has been completed.",
                                        "ICETIA 2027 organizing committee members.",
                                        "Invited speakers and guests.",
                                        "Other individuals specifically approved by the organizing committee.",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-start gap-3"
                                        >
                                            <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                                            <p className="text-xs leading-5 text-slate-500">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-7 border-t border-white/10 pt-6">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                                    Important
                                </p>

                                <p className="mt-2 text-xs leading-6 text-slate-500">
                                    Visa invitation letter requests will be
                                    considered after conference registration
                                    opens and the participant has completed the
                                    required registration process. An invitation
                                    letter supports a visa application but does
                                    not guarantee visa approval.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================
          VISA LETTER REQUIREMENTS
      ========================================================= */}
           <div className="border-b border-white/10 bg-[#080f1a]">
    <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
        <div className="max-w-3xl">
            <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-blue-500" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-500">
                    Invitation Letter Request
                </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Information required for your{" "}
                <span className="text-blue-500">
                    request.
                </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500">
                When requesting an official invitation letter,
                international participants should provide complete
                and accurate information and submit the required
                supporting documents to allow the organizing
                committee to process the request.
            </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
            {[
                "Full name as it appears on your passport.",
                "Job title, position or academic status.",
                "Department and affiliated institution or organization.",
                "Full address of the affiliated institution or organization.",
                "Confirmation of completed conference registration.",
                "Proof of payment for the conference registration.",
            ].map((item) => (
                <div
                    key={item}
                    className="flex items-start gap-3 bg-[#080f1a] p-6"
                >
                    <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                    <p className="text-sm leading-6 text-slate-500">
                        {item}
                    </p>
                </div>
            ))}
        </div>

        {/* Email Instructions */}
        <div className="mt-8 border border-blue-500/20 bg-blue-500/5 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-400">
                How to submit your request
            </p>

            <p className="mt-3 text-xs leading-6 text-slate-500">
                Send your invitation letter request and the required
                supporting documents to:
            </p>

            <a
                href="mailto:conference@icetiaconference.org"
                className="mt-3 inline-block text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
                conference@icetiaconference.org
            </a>

            <div className="mt-5 border-t border-blue-500/10 pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Email subject format
                </p>

                <div className="mt-3 border border-white/10 bg-[#080f1a] px-4 py-3">
                    <p className="text-xs font-medium text-slate-300">
                       ICETIA 2027 Visa Invitation Letter Request – [Your Full Name]
                    </p>
                </div>
            </div>

            <div className="mt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Required attachments
                </p>

                <div className="mt-3 space-y-3">
                    {[
                        "Proof of completed conference registration.",
                        "Proof of payment.",
                    ].map((item) => (
                        <div
                            key={item}
                            className="flex items-start gap-3"
                        >
                            <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                            <p className="text-xs leading-5 text-slate-500">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="mt-8 border border-blue-500/20 bg-blue-500/5 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-400">
                Processing notice
            </p>

            <p className="mt-3 text-xs leading-6 text-slate-500">
                Invitation letter requests will only be processed after
                conference registration and payment have been confirmed.
                Participants are responsible for ensuring that all
                information submitted is accurate and that their passport
                remains valid for the intended period of travel.
            </p>

            <p className="mt-3 text-xs leading-6 text-slate-500">
                An invitation letter supports a visa application but does
                not guarantee visa approval. Participants should submit
                their visa applications through the appropriate Nigerian
                authorities and allow sufficient time for processing.
            </p>
        </div>
    </div>
</div>

            {/* =========================================================
          VISA RESPONSIBILITY
      ========================================================= */}
            <div className="border-b border-white/10 bg-[#080f1a]">
                <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
                    <div className="grid gap-10 lg:grid-cols-2">

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-500">
                                Before You Travel
                            </p>

                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                Check your visa requirements early.
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-slate-500">
                                Visa requirements can vary depending on your
                                nationality, travel document and purpose of
                                travel. Participants should verify the current
                                requirements that apply to them before making
                                travel arrangements.
                            </p>
                        </div>

                        <div className="border border-white/10 bg-[#080f1a] p-7">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                                Participant responsibility
                            </p>

                            <div className="mt-5 space-y-4">
                                {[
                                    "Review the current Nigerian visa and entry requirements applicable to your nationality.",
                                    "Submit your visa application through the appropriate official channel.",
                                    "Allow sufficient time for visa processing before travelling.",
                                    "Pay all applicable visa, processing and travel-related fees.",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3"
                                    >
                                        <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                                        <p className="text-xs leading-6 text-slate-500">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================
          TRAVEL CHECKLIST
      ========================================================= */}
            <div className="bg-[#080f1a] mb-2">
                <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
                    <div className="border-t border-white/10 pt-8">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                                    Before You Travel
                                </p>

                                <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                                    Plan ahead for ICETIA 2027.
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-2 lg:max-w-2xl">
                                {[
                                    "Complete your conference registration.",
                                    "Request an invitation letter if required.",
                                    "Check Nigerian visa requirements.",
                                    "Allow sufficient time for visa processing.",
                                    "Book accommodation early.",
                                    "Keep your conference documents accessible.",
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
                                Emerging Technologies · Innovation · Applications
                            </p>

                            <p className="text-xs text-slate-600">
                                ICETIA 2027 · 28 – 30 April · Federal University Otuoke
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </section>
    );
}