
import Image from "next/image";
import EAILogo from "../public/images/EAI-Logo.png";
import EAICore from "../public/images/EAI-Logo-CORE.png";
import EAIUDL from "../public/images/EAI-Logo-EUDL.png";

const sponsors = [
    {
        name: "European Alliance for Innovation",
        logo: EAILogo,
        href: "https://eai.eu/",
        width: 120,
        height: 60,
    },
    {
        name: "EAI Community Research Series (CORE)",
        logo: EAICore,
        href: "https://eudl.eu/core-publish",
        width: 120,
        height: 60,
    },
    {
        name: "European Union Digital Library (EUDL)",
        logo: EAIUDL,
        href: "https://eudl.eu/",
        width: 120,
        height: 60,
    },
];

export default function Partners() {
    return (
        <section className="border-b border-white bg-slate-950 px-5 py-6 text-white lg:px-8 lg:py-8">
            <div className="container mx-auto max-w-6xl">
                {/* Section heading */}
                <div className="mb-5 text-center lg:mb-6">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Our Main Sponsors
                    </span>
                </div>

                {/* Main sponsors */}
                <div>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
                        {sponsors.map((sponsor) => (
                            <a
                                key={sponsor.name}
                                href={sponsor.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${sponsor.name} website`}
                                className="group flex min-h-24 items-center justify-center rounded-xl border border-white/10 bg-white/3 transition-all duration-300 hover:border-blue-500/40 hover:bg-white/6 lg:min-h-28"
                            >
                                <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    width={sponsor.width}
                                    height={sponsor.height}
                                    className="h-auto max-h-16 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Publication partner */}
                <div className="mt-7 border-t border-white/10 pt-6 lg:mt-8 lg:pt-7">
                    <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">
                        Publication Partner
                    </h3>

                    <div className="flex justify-center gap-4">
                        <a
                            href="https://eudl.eu/core-publish"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit EAI CORE website"
                            className="group flex min-h-24 w-full max-w-md items-center justify-center rounded-xl border border-white/10 bg-white/3 p-4 transition-all duration-300 hover:border-blue-500/40 hover:bg-white/6 lg:min-h-28"
                        >
                            <Image
                                src={EAICore}
                                alt="EAI CORE"
                                width={200}
                                height={100}
                                className="h-auto max-h-16 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
