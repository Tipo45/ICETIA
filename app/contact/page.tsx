import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import { FaUser, FaUsers } from "react-icons/fa";
import {
    LuCalendarDays,
    LuMail,
} from "react-icons/lu";

export default function Contact() {
    return (
        <section>
            <Navbar />

            <div className="border-b border-white/10 bg-[#07111f] text-white">
                <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">
                    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
                        <div>
                            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                                <FaUsers className="h-4 w-4" />
                                ICETIA 2027
                            </div>

                            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                                Contact{" "}
                                <span className="text-blue-400">Us.</span>
                            </h1>
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
            </div>

            {/* Contact Cards */}
            <div className="bg-[#080f1a]">
                <div className="container mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-20">
                    <div className="grid gap-6 grid-cols-2">

                        {/* General Contact */}
                        <div className="rounded-lg border border-white/10 bg-[#07111f] p-7 shadow-sm lg:p-8">
                            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                                <LuMail className="h-5 w-5" />
                            </div>

                            <h2 className="mt-6 text-lg font-semibold text-white">
                                Contact
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-slate-500">
                                Feel free to reach out to the conference team for
                                general enquiries, registration information,
                                participation and other conference-related matters.
                            </p>

                            <div className="mt-6 border-t border-white/10 pt-5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                                    Conference Contact
                                </p>

                                <a
                                    href="mailto:info@icetiaconference.org"
                                    className="mt-2 inline-block text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 hover:underline"
                                >
                                    conference@icetiaconference.org
                                </a>
                            </div>
                        </div>

                        {/* Conference Leadership */}
                        <div className="rounded-lg border border-white/10 bg-[#07111f] p-7 shadow-sm lg:p-8">
                            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                                <FaUser className="h-4 w-4" />
                            </div>

                            <h2 className="mt-6 text-lg font-semibold text-white">
                                Conference Contact
                            </h2>

                            <div className="mt-6 space-y-6">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                                        General Chair
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-white">
                                        Dr. Joshua Teddy Ibibo
                                    </p>

                                    <a
                                        href="mailto:j.ibibo@tees.ac.uk"
                                        className="mt-1 inline-block text-sm text-blue-400 transition-colors hover:text-blue-300 hover:underline"
                                    >
                                        j.ibibo@tees.ac.uk
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <PublicationFooter />

            <Footer />
        </section>
    );
}