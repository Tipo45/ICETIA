"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { LuArrowRight, LuCalendarDays, LuCircleCheck } from "react-icons/lu";
import PublicationFooter from "@/components/publicationfooter";
import PublicationHeader from "@/components/publicationheader";

const acceptedPapers = [
    {
        id: "ICETIA-2027-001",
        title:
            "Artificial Intelligence Applications for Sustainable Digital Transformation",
        authors: ["Author Name", "Author Name"],
        affiliation: "Federal University Otuoke",
        track: "Artificial Intelligence & Machine Learning",
        status: "Accepted",
    },
    {
        id: "ICETIA-2027-002",
        title:
            "A Data-Driven Framework for Smart Healthcare Systems in Emerging Economies",
        authors: ["Author Name", "Author Name", "Author Name"],
        affiliation: "University Name",
        track: "Data Science & Analytics",
        status: "Accepted",
    },
    {
        id: "ICETIA-2027-003",
        title:
            "Cybersecurity Challenges and Resilience Strategies for Modern Digital Infrastructure",
        authors: ["Author Name", "Author Name"],
        affiliation: "University Name",
        track: "Cybersecurity & Digital Trust",
        status: "Accepted",
    },
    {
        id: "ICETIA-2027-004",
        title:
            "Emerging Technologies and Their Role in Advancing Sustainable Development",
        authors: ["Author Name"],
        affiliation: "University Name",
        track: "Emerging Technologies",
        status: "Accepted",
    },
    {
        id: "ICETIA-2027-005",
        title:
            "Digital Innovation and Technology Adoption in Developing Economies",
        authors: ["Author Name", "Author Name"],
        affiliation: "University Name",
        track: "Innovation & Digital Transformation",
        status: "Accepted",
    },
    {
        id: "ICETIA-2027-006",
        title:
            "Internet of Things and Intelligent Systems for Smart Communities",
        authors: ["Author Name", "Author Name"],
        affiliation: "University Name",
        track: "Internet of Things & Smart Systems",
        status: "Accepted",
    },
];

const tracks = [
    "All Tracks",
    ...Array.from(new Set(acceptedPapers.map((paper) => paper.track))),
];

export default function AcceptedPapersPage() {
    const [search, setSearch] = useState("");
    const [selectedTrack, setSelectedTrack] = useState("All Tracks");

    const filteredPapers = useMemo(() => {
        const query = search.trim().toLowerCase();

        return acceptedPapers.filter((paper) => {
            const matchesTrack =
                selectedTrack === "All Tracks" ||
                paper.track === selectedTrack;

            const matchesSearch =
                !query ||
                paper.title.toLowerCase().includes(query) ||
                paper.id.toLowerCase().includes(query) ||
                paper.authors.some((author) =>
                    author.toLowerCase().includes(query)
                ) ||
                paper.affiliation.toLowerCase().includes(query);

            return matchesTrack && matchesSearch;
        });
    }, [search, selectedTrack]);

    return (
        <section>
            <div className="sticky top-0 z-50">
                <PublicationHeader />
                <Navbar />
            </div>
            <main className="min-h-screen bg-slate-950 text-white mb-2">

                {/* Hero */}
                <section className="relative overflow-hidden border-b border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,139,255,0.16),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(0,209,255,0.08),transparent_30%)]" />

                    <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">


                        <div className="max-w-4xl">

                            <div className="mb-6 inline-flex items-center gap-2 border border-blue-400/20 bg-blue-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                                <LuCircleCheck className="h-4 w-4" />
                                Accepted Papers
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                                Research accepted for
                                <span className="block text-blue-400">
                                    ICETIA 2027.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 lg:text-lg">
                                Explore the research papers accepted for presentation at the
                                International Conference on Emerging Technologies, Innovations &
                                Applications.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <LuCalendarDays className="h-4 w-4 text-blue-400" />
                                    28–30 April 2027
                                </div>

                                <span className="text-slate-300 block">•</span>

                                <div>
                                    Federal University Otuoke
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Introduction / Notice */}
                <section className="border-b border-white/10 bg-[#080f1a]">
                    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

                            <div className="max-w-3xl">
                                <p className="text-sm leading-7 text-slate-400">
                                    The papers listed below have been accepted following the
                                    conference's peer-review process. Authors should proceed with
                                    registration, camera-ready submission, and presentation
                                    requirements according to the official conference timeline.
                                </p>
                            </div>

                            <div className="border border-blue-400/20 bg-blue-400/5 px-6 py-5">
                                <p className="text-xs uppercase tracking-widest text-slate-500">
                                    Accepted Papers
                                </p>

                                <p className="mt-1 text-3xl font-bold text-white">
                                    {/* {acceptedPapers.length} */}
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Papers */}
                <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

                    <p className="flex justify-center">No accepted papers yet</p>
                </section>

                {/* CTA */}
                <section className="bg-linear-to-r from-blue-950/40 via-[#080f1a] to-cyan-950/20">
                    <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8 lg:py-24">

                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                            ICETIA 2027
                        </p>

                        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold text-white lg:text-4xl">
                            Present your research at ICETIA 2027.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
                            Share your research, connect with experts, and contribute to
                            conversations shaping emerging technologies and innovations.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">

                            <Link
                                href="/registration/authors-registration"
                                className="inline-flex items-center gap-2 bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                            >
                                Submit a Paper
                                <LuArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                Back to Home
                            </Link>

                        </div>
                    </div>
                </section>

            </main>
            <PublicationFooter />
            <Footer />
        </section>
    );
}