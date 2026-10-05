"use client";

import { LuArrowUpRight, LuBookOpen, LuFileText, LuGlobe } from "react-icons/lu";

const publicationOptions = [
    {
        number: "01",
        icon: LuBookOpen,
        title: "Book of Abstracts",
        description:
            "Accepted and presented papers will be considered for inclusion in the official ICETIA 2027 Book of Abstracts.",
    },
    {
        number: "02",
        icon: LuFileText,
        title: "Conference Proceedings",
        description:
            "Accepted and presented papers may also be considered for inclusion in the official ICETIA 2027 Conference Proceedings.",
    },
    {
        number: "03",
        icon: LuGlobe,
        title: "Journal Opportunities",
        description:
            "Selected high-quality papers may be invited for further consideration by an approved journal or publication outlet.",
    },
];

export default function PublicationOpportunities() {
    return (
        <section
            id="publications"
            className="relative overflow-hidden bg-[#07111f] py-20 sm:py-24 lg:py-28"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-100 w-100 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

            <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-cyan-400/5 blur-[100px]" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                {/* Section heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-5 inline-flex items-center gap-2 border border-blue-400/20 bg-blue-400/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        Publication
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Publication{" "}
                        <span className="text-blue-400">Opportunities</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
                        From research presentation to wider academic dissemination,
                        ICETIA 2027 provides opportunities for selected research
                        contributions to reach broader scholarly audiences.
                    </p>
                </div>

                {/* Publication cards */}
                <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
                    {publicationOptions.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.number}
                                className="group relative bg-[#0a1625] p-7 transition-colors duration-300 hover:bg-[#0d1c2f] sm:p-8 lg:p-9"
                            >
                                {/* Number */}
                                <div className="flex items-start justify-between">
                                    <span className="font-mono text-xs tracking-[0.15em] text-blue-400/60">
                                        {item.number}
                                    </span>

                                    <div className="flex h-10 w-10 items-center justify-center border border-blue-400/20 bg-blue-400/5 text-blue-400 transition-all duration-300 group-hover:border-blue-400/40 group-hover:bg-blue-400/10">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mt-10">
                                    <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-white/45">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom accent */}
                                <div className="mt-8 h-px w-10 bg-blue-500/50 transition-all duration-300 group-hover:w-20 group-hover:bg-blue-400" />
                            </div>
                        );
                    })}
                </div>

                {/* Important qualification */}
                <div className="relative mt-6 border border-white/10 bg-[#0a1625] p-6 sm:p-7 lg:flex lg:items-center lg:justify-between lg:gap-10">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                                Important Publication Note
                            </span>
                        </div>

                        <p className="max-w-4xl text-sm leading-7 text-white/50">
                            Selected high-quality papers may be invited for further
                            consideration by an approved journal or publication
                            outlet, subject to separate editorial review, quality
                            checks and publication requirements.
                        </p>
                    </div>

                    <a
                        href="#call-for-papers"
                        className="mt-6 inline-flex shrink-0 items-center gap-2 border border-blue-400/30 bg-blue-500/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-300 transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-white lg:mt-0"
                    >
                        Submit Your Research
                        <LuArrowUpRight className="h-4 w-4" />
                    </a>
                </div>

                {/* Bottom statement */}
                <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs uppercase tracking-[0.14em] text-white/25">
                        ICETIA 2027 · Research · Innovation · Impact
                    </p>

                    <div className="flex items-center gap-2 text-xs text-white/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        <span>Subject to editorial and publication requirements</span>
                    </div>
                </div>
            </div>
        </section>
    );
}