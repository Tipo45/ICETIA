import Image from "next/image";
import EAILogo from "../public/images/EAI-Logo.png";
import EAICore from "../public/images/EAI-Logo-CORE.png";
import EAIUDL from "../public/images/EAI-Logo-EUDL.png";
import Atlantispress from "../public/images/atlantis press.jpeg";

const sponsors = [
    {
        name: "European Alliance for Innovation",
        logo: EAILogo,
        href: "https://eai.eu/",
        width: 180,
        height: 90,
    },
    {
        name: "EAI Community Research Series (CORE)",
        logo: EAICore,
        href: "https://compse-conf.eai-conferences.org/2016/media/uploads/EAI%20CORE%20Proceedigns.pdf",
        width: 180,
        height: 90,
    },
    {
        name: "European Union Digital Library (EUDL)",
        logo: EAIUDL,
        href: "https://eudl.eu/",
        width: 180,
        height: 90,
    },
];

export default function Partners() {
    return (
        <section className="border-b border-white bg-slate-950 px-5 py-14 text-white lg:py-16 lg:px-8 xl:py-20">
            <div className="container mx-auto max-w-6xl">
                {/* Section heading */}
                <div className="mb-10 text-center lg:mb-12">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Our Main Sponsors
                    </span>
                </div>

                {/* Main sponsors */}
                <div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                        {sponsors.map((sponsor) => (
                            <a
                                key={sponsor.name}
                                href={sponsor.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${sponsor.name} website`}
                                className="group flex min-h-36 items-center justify-center rounded-xl border border-white/10 bg-white/3 p-6 transition-all duration-300 hover:border-blue-500/40 hover:bg-white/6 lg:min-h-40"
                            >
                                <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    width={sponsor.width}
                                    height={sponsor.height}
                                    className="h-auto max-h-20 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Publication partner */}
                <div className="mt-12 border-t border-white/10 pt-10 lg:mt-14 lg:pt-12">
                    <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">
                        Publication Partner
                    </h3>

                    <div className="flex justify-center">
                        <a
                            href="https://share.google/fZqnio3Tk5z85H02t"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit SpringerLink website"
                            className="group flex min-h-32 w-full max-w-md items-center justify-center rounded-xl border border-white/10 bg-white/3 p-6 transition-all duration-300 hover:border-blue-500/40 hover:bg-white/6 lg:min-h-36"
                        >
                            <Image
                                src={Atlantispress}
                                alt="Atlantis Press"
                                width={200}
                                height={100}
                                className="h-auto max-h-20 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}