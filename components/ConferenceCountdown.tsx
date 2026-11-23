
"use client";

import { useEffect, useState } from "react";

const CONFERENCE_START = new Date("2027-04-28T00:00:00+01:00").getTime();
const CONFERENCE_END = new Date("2027-04-30T23:59:59+01:00").getTime();

type CountdownTime = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

const getCountdown = (): CountdownTime => {
    const difference = Math.max(0, CONFERENCE_START - Date.now());

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
};

const timeUnits = [
    { key: "days", label: "Days" },
    { key: "hours", label: "Hours" },
    { key: "minutes", label: "Minutes" },
    { key: "seconds", label: "Seconds" },
] as const;

export default function ConferenceCountdown() {
    const [countdown, setCountdown] = useState<CountdownTime | null>(null);
    const [now, setNow] = useState<number | null>(null);

    useEffect(() => {
        const updateCountdown = () => {
            const currentTime = Date.now();

            setNow(currentTime);
            setCountdown(getCountdown());
        };

        updateCountdown();

        const interval = window.setInterval(updateCountdown, 1000);

        return () => window.clearInterval(interval);
    }, []);

    if (now === null || countdown === null) {
        return null;
    }

    const hasStarted = now >= CONFERENCE_START;
    const hasEnded = now > CONFERENCE_END;

    return (
        <section className="relative overflow-hidden bg-[#071629] py-16 tablet:py-20">
            {/* Background glow */}
            <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="relative mx-auto max-w-6xl px-5">
                <div className="mx-auto max-w-3xl text-center">

                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                        ICETIA 2027
                    </span>

                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-white tablet:text-4xl">
                        {hasEnded
                            ? "Thank You for Being Part of ICETIA 2027"
                            : hasStarted
                                ? "ICETIA 2027 Is Here!"
                                : "The Countdown Has Begun"}
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 tablet:text-base">
                        {hasEnded
                            ? "Thank you to all our participants, researchers, authors and partners for making this conference memorable."
                            : "Join researchers, innovators and technology professionals as we explore emerging technologies, innovations and applications."}
                    </p>

                    {!hasEnded && (
                        <>
                            {hasStarted ? (
                                <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-white/4 px-6 py-8">
                                    <p className="text-lg font-semibold text-cyan-300">
                                        The conference is currently underway!
                                    </p>
                                    <p className="mt-2 text-sm text-slate-300">
                                        28th – 30th April, 2027
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-10 flex items-center justify-center gap-2 tablet:gap-5">
                                    {timeUnits.map((unit, index) => (
                                        <div key={unit.key} className="flex items-center gap-2 tablet:gap-5">
                                            <div className="group rounded-2xl border border-white/10 bg-white/4 px-1 py-2 lg:px-3 lg:py-6 backdrop-blur-sm transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/6 tablet:px-8 tablet:py-8">
                                                <div className="text-sm lg:text-2xl font-extrabold tabular-nums tracking-tight text-white tablet:text-6xl">
                                                    {String(countdown[unit.key]).padStart(2, "0")}
                                                </div>

                                                <div className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                                                    {unit.label}
                                                </div>
                                            </div>

                                            {index !== timeUnits.length - 1 && (
                                                <span className="text-lg font-bold text-cyan-400 tablet:text-4xl">
                                                    :
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* <div className="mt-9 flex flex-col items-center justify-center gap-3 text-sm text-slate-300 tablet:flex-row tablet:gap-6">
                        <span className="flex items-center gap-2">
                            <span className="text-cyan-400">📅</span>
                            28th – 30th April, 2027
                        </span>

                        <span className="hidden h-1 w-1 rounded-full bg-cyan-400 tablet:block" />

                        <span className="flex items-center gap-2">
                            <span className="text-cyan-400">📍</span>
                            Federal University Otuoke, Nigeria
                        </span>
                    </div> */}

                    {!hasStarted && (
                        <a
                            href="/registration"
                            className="mt-9 inline-flex items-center justify-center rounded-full bg-cyan-500 px-8 py-3.5 text-sm font-bold text-[#071629] shadow-lg shadow-cyan-500/20 transition hover:-translate-y-1 hover:bg-cyan-400"
                        >
                            Register for ICETIA 2027
                            <span className="ml-2">→</span>
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
