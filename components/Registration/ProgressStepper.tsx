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
        <div className="flex justify-between items-center mb-10">

            {steps.map((item, index) => {

                const current = index + 1;

                return (

                    <div
                        key={item}
                        className="flex flex-col items-center flex-1"
                    >

                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                            
                            ${current < step
                                    ? "bg-green-600 text-white"
                                    : current === step
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-200"
                                }
                            
                            `}
                        >
                            {current < step ? (
                                <LuCheck size={18} />
                            ) : (
                                current
                            )}
                        </div>

                        <p
                            className={`mt-2 text-sm text-center ${current === step
                                    ? "font-semibold text-blue-600"
                                    : ""
                                }`}
                        >
                            {item}
                        </p>

                    </div>
                );
            })}
        </div>
    );
}