"use client";

import { LuCheck } from "react-icons/lu";

const steps = [
    "Personal",
    "Academic",
    "Co-authors",
    "Paper",
    "Review",
];

interface Props {
    step: number;
}

export default function ProgressStepper({ step }: Props) {
    return (
        <div className="w-full overflow-x-auto">
            <div className="mx-auto flex min-w-130 items-start">
                {steps.map((item, index) => {
                    const current = index + 1;

                    const completed = current < step;
                    const active = current === step;
                    const upcoming = current > step;

                    return (
                        <div
                            key={item}
                            className="flex flex-1 items-start"
                        >
                            {/* Step */}
                            <div className="flex min-w-0 flex-1 flex-col items-center">
                                <div
                                    className={`relative z-10 flex h-9 w-9 items-center justify-center border text-xs font-semibold transition-all duration-300 lg:h-10 lg:w-10 ${
                                        completed
                                            ? "border-blue-600 bg-blue-600 text-white"
                                            : active
                                            ? "border-[#07111f] bg-[#07111f] text-white ring-4 ring-blue-100"
                                            : "border-slate-300 bg-white text-slate-400"
                                    }`}
                                >
                                    {completed ? (
                                        <LuCheck className="h-4 w-4 lg:h-5 lg:w-5" />
                                    ) : (
                                        current
                                    )}
                                </div>

                                <p
                                    className={`mt-2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.08em] transition-colors lg:text-xs ${
                                        active
                                            ? "font-semibold text-[#07111f]"
                                            : completed
                                            ? "text-blue-600"
                                            : "text-slate-400"
                                    }`}
                                >
                                    {item}
                                </p>
                            </div>

                            {/* Connector */}
                            {index < steps.length - 1 && (
                                <div className="relative mt-4.5 h-px flex-1 bg-slate-200 lg:mt-5">
                                    <div
                                        className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                                            current < step
                                                ? "w-full bg-blue-600"
                                                : "w-0 bg-blue-600"
                                        }`}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}