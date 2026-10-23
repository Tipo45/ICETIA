"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import Link from "next/link";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FcCustomerSupport } from "react-icons/fc";
import {
    LuArrowUpRight,
    LuFileText,
    LuMailOpen,
    LuMessageCircle,
} from "react-icons/lu";
import PublicationHeader from "@/components/publicationheader";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white text-[#001F3F]">
           <div className="sticky top-0 z-50">
                <PublicationHeader />
                <Navbar />
            </div>

            {/* Hero */}
            <section className="relative isolate overflow-hidden bg-[#001F3F]">
                <div className="absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-[#008BFF]/20 blur-3xl" />
                <div className="absolute -bottom-40 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#00D1FF]/10 blur-3xl" />

                <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24 xl:px-12 xl:py-28">

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#00D1FF]/30 bg-[#00D1FF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#00D1FF]">
                            <LuMessageCircle className="h-4 w-4" />
                            We're here to help
                        </span>

                        <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-7xl">
                            Contact{" "}
                            <span className="text-[#00D1FF]">
                                Us.
                            </span>
                        </h1>
                    </div>

                </div>

                <div className="h-1 w-full bg-linear-to-r from-[#008BFF] via-[#00D1FF] to-transparent" />
            </section>

            {/* Contact content */}
            <section className="mx-auto max-w-7xl px-5 py-16">
                {/* Contact information */}
                <div>
                    <div className="mt-9 grid grid-cols-1 gap-4 tablet:grid-cols-3">
                        <div className="group flex items-center tablet:flex-col gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-[#008BFF]/50 hover:shadow-lg hover:shadow-[#001F3F]/5">
                            <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-xl bg-[#008BFF]/10 text-[#008BFF]">
                                <TfiHeadphoneAlt className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="font-semibold tablet:text-center">
                                    Help
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    For questions about the conference,
                                    participation, and general information.
                                </p>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    For questions related to the conference organization process and EAI's Community services, please visit our <a href="https://help.eai-conferences.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 no-underline hover:underline">
                                        Help pages</a>.
                                </p>

                            </div>
                        </div>

                        <div className="group flex items-center tablet:flex-col gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-[#008BFF]/50 hover:shadow-lg hover:shadow-[#001F3F]/5">
                            <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-xl bg-[#00D1FF]/15 text-[#0077C8]">
                                <LuMailOpen className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="font-semibold tablet:text-center">
                                    Contact
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    In case you don’t find the answer in the Help pages, or for any support requests you might have regarding this event, please contact the Conference Manager. Please make sure that the conference name is clearly specified in your message.
                                </p>
                            </div>
                        </div>

                        <div className="group flex items-center tablet:flex-col gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-[#008BFF]/50 hover:shadow-lg hover:shadow-[#001F3F]/5">

                            <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-xl bg-[#001F3F]/5 text-[#001F3F]">
                                <FcCustomerSupport className="h-10 w-10" />

                            </div>

                            <div>
                                <h3 className="font-semibold tablet:text-center">
                                    Conference Support
                                </h3>


                                <Link
                                    href="mailto:conferences@eai.eu"
                                    className="mt-3 inline-flex items-center text-sm font-semibold text-[#008BFF] hover:underline"
                                >
                                    conferences@eai.eu
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Help banner */}
            <section className="px-5 pb-1 lg:px-8 lg:pb-24">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl bg-[#001F3F] px-6 py-9 lg:px-10 items-center lg:items-start justify-betwee xl:px-14 lg:py-12">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00D1FF]">
                            Explore ICETIA 2027
                        </p>
                        <h2 className="mt-3 text-2xl font-bold text-white lg:text-3xl">
                            Looking for conference information?
                        </h2>
                        <p className="mt-3 leading-7 text-slate-300">
                            Explore the conference details, discover the
                            research tracks, and find submission information
                            before contacting the organising team.
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-[#00D1FF] px-6 py-3.5 text-sm font-semibold text-[#001F3F] transition hover:bg-white"
                    >
                        Explore ICETIA
                        <LuArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            <PublicationFooter />

            <Footer />
        </main>
    );
}