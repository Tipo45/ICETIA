"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    FileText,
    Search,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
            <Navbar />
            <main className="min-h-screen bg-slate-950 text-white mb-2">

                {/* Hero */}
                <section className="relative overflow-hidden border-b border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,139,255,0.16),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(0,209,255,0.08),transparent_30%)]" />

                    <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

                        {/* Breadcrumb */}
                        <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
                            <Link
                                href="/"
                                className="transition-colors hover:text-blue-400"
                            >
                                Home
                            </Link>

                            <ChevronRight className="h-4 w-4" />

                            <span className="text-slate-300">
                                Accepted Papers
                            </span>
                        </div>

                        <div className="max-w-4xl">

                            <div className="mb-6 inline-flex items-center gap-2 border border-blue-400/20 bg-blue-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                                <CheckCircle2 className="h-4 w-4" />
                                Accepted Papers
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                Research accepted for
                                <span className="block text-blue-400">
                                    ICETIA 2027.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
                                Explore the research papers accepted for presentation at the
                                International Conference on Emerging Technologies, Innovation &
                                Applications.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-blue-400" />
                                    28–30 April 2027
                                </div>

                                <span className="hidden text-slate-700 sm:block">•</span>

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
                                    {acceptedPapers.length}
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Papers */}
                <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

                    {/* Heading */}
                    <div className="mb-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                            Paper List
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Accepted research papers
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                            Search by paper title, author, institution, or paper ID, or filter
                            the list by conference track.
                        </p>
                    </div>

                    {/* Search + Filter */}
                    <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_280px]">

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search papers, authors, institutions..."
                                className="h-12 w-full border border-white/10 bg-[#0a1625] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition-colors focus:border-blue-500/50"
                            />
                        </div>

                        {/* Track */}
                        <select
                            value={selectedTrack}
                            onChange={(e) => setSelectedTrack(e.target.value)}
                            className="h-12 border border-white/10 bg-[#0a1625] px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50"
                        >
                            {tracks.map((track) => (
                                <option
                                    key={track}
                                    value={track}
                                    className="bg-slate-950"
                                >
                                    {track}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Result count */}
                    <div className="mb-5 flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-widest text-slate-600">
                            {filteredPapers.length}{" "}
                            {filteredPapers.length === 1 ? "paper" : "papers"} found
                        </p>
                    </div>

                    {/* Paper list */}
                    <div className="space-y-4">

                        {filteredPapers.length > 0 ? (
                            filteredPapers.map((paper) => (
                                <article
                                    key={paper.id}
                                    className="group border border-white/10 bg-[#0a1625] p-6 transition-all duration-300 hover:border-blue-400/30 sm:p-7"
                                >
                                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                                        {/* Main information */}
                                        <div className="min-w-0">

                                            {/* ID + status */}
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
                                                    {paper.id}
                                                </span>

                                                <span className="inline-flex items-center gap-1.5 border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    {paper.status}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="mt-4 max-w-4xl text-lg font-semibold leading-7 text-white transition-colors group-hover:text-blue-300 sm:text-xl">
                                                {paper.title}
                                            </h3>

                                            {/* Authors */}
                                            <p className="mt-4 text-sm leading-6 text-slate-400">
                                                <span className="font-medium text-slate-300">
                                                    Authors:
                                                </span>{" "}
                                                {paper.authors.join(", ")}
                                            </p>

                                            {/* Institution */}
                                            <p className="mt-2 text-sm text-slate-500">
                                                {paper.affiliation}
                                            </p>

                                        </div>

                                        {/* Track */}
                                        <div className="shrink-0 lg:max-w-xs lg:text-right">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                                                Conference Track
                                            </p>

                                            <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                                {paper.track}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Bottom */}
                                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">

                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <FileText className="h-4 w-4" />
                                            ICETIA 2027 Accepted Paper
                                        </div>

                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 transition-colors hover:text-blue-300"
                                        >
                                            View Details
                                            <ArrowRight className="h-4 w-4" />
                                        </button>

                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="border border-white/10 bg-[#0a1625] px-6 py-16 text-center">
                                <FileText className="mx-auto h-8 w-8 text-slate-700" />

                                <h3 className="mt-5 text-lg font-semibold text-white">
                                    No papers found
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Try changing your search or selecting another conference
                                    track.
                                </p>
                            </div>
                        )}

                    </div>
                </section>

                {/* Important Notice */}
                <section className="border-y border-white/10 bg-[#080f1a]">
                    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">

                        <div className="border-l-2 border-blue-500 bg-blue-500/3 px-6 py-6 sm:px-8">

                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                                Author Notice
                            </p>

                            <h2 className="mt-3 text-xl font-semibold text-white">
                                Acceptance does not replace the remaining author requirements.
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-400">
                                Authors of accepted papers should carefully review the official
                                conference instructions for registration, camera-ready
                                submission, presentation requirements, and publication
                                procedures. Additional programme details will be communicated
                                as the conference schedule is finalized.
                            </p>

                            <Link
                                href="/#cfp"
                                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 transition-colors hover:text-blue-300"
                            >
                                View Author Guidelines
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-linear-to-r from-blue-950/40 via-[#080f1a] to-cyan-950/20">
                    <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8 lg:py-24">

                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                            ICETIA 2027
                        </p>

                        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
                            Present your research at ICETIA 2027.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                            Share your research, connect with experts, and contribute to
                            conversations shaping emerging technologies and innovation.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">

                            <Link
                                href="/registration/authors-registration"
                                className="inline-flex items-center gap-2 bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                            >
                                Submit a Paper
                                <ArrowRight className="h-4 w-4" />
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
            <Footer />
        </section>
    );
}