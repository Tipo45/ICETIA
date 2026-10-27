import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import PublicationHeader from "@/components/publicationheader";
import Link from "next/link";
import { LuCalendarDays, LuCheck, LuGlobe, LuMic, LuSparkles } from "react-icons/lu";


export default function workShop() {
    return (
        <section>
            <div className="sticky top-0 z-50">
                <PublicationHeader />
                <Navbar />
            </div>
            <main className="bg-slate-950">
                <section className="border-b border-white/10 bg-slate-950">
                    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

                        {/* Section heading */}
                        <div className="mb-8 max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                                Workshop Papers
                            </p>

                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                                Workshop opportunities by topic
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Workshop paper opportunities for the following conference topics
                                will be announced as they become available.
                            </p>
                        </div>

                        {/* Workshop topics table */}
                        <div className="w-full overflow-x-auto">
                            <table className="w-full min-w-175 border-collapse border border-white/10 text-sm">
                                <thead>
                                    <tr className="bg-white/5">
                                        <th className="border border-white/10 px-5 py-4 text-left font-semibold text-white">
                                            Topic
                                        </th>

                                        <th className="border border-white/10 px-5 py-4 text-left font-semibold text-white">
                                            Workshop Papers
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {[
                                        "Artificial Intelligence & Machine Learning Applications",
                                        "Cybersecurity, Privacy & Digital Trust",
                                        "Smart Systems, Internet of Things & Intelligent Environments",
                                        "Data Science, Analytics & Decision Intelligence",
                                        "Cloud Computing, Edge Computing & Digital Infrastructure",
                                        "Academic Publishing, Research Visibility & Grant Proposal Development",
                                        "Technology Entrepreneurship & Innovation Commercialisation",
                                        "Digital Transformation for Education, Governance, Health & Industry",
                                    ].map((topic, index) => (
                                        <tr
                                            key={topic}
                                            className="transition-colors hover:bg-white/5"
                                        >
                                            <td className="border border-white/10 px-5 py-5 font-medium leading-6 text-slate-300">
                                                {topic}
                                            </td>

                                            <td className="border border-white/10 px-5 py-5">
                                                <span className="inline-flex items-center rounded-full border border-slate-600 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                                                    Not added yet
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </section>
                <section className="border-b border-white/10 bg-[#080f1a]">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-6 lg:px-8">
                        <div className="flex items-center gap-4 px-0 py-8">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-400/20 bg-blue-400/5">
                                <LuCalendarDays className="h-5 w-5 text-blue-400" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-slate-500">
                                    Conference
                                </p>
                                <p className="mt-1 font-semibold text-white">
                                    28–30 April 2027
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-0 py-8">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-400/20 bg-blue-400/5">
                                <LuGlobe className="h-5 w-5 text-blue-400" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-slate-500">
                                    Location
                                </p>
                                <p className="mt-1 font-semibold text-white">
                                    Federal University Otuoke
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-0 py-8">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-400/20 bg-blue-400/5">
                                <LuSparkles className="h-5 w-5 text-blue-400" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-slate-500">
                                    Edition
                                </p>
                                <p className="mt-1 font-semibold text-white">
                                    ICETIA 2027
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <PublicationFooter />
            <Footer />
        </section>
    )
}