import Image from "next/image";
import { FaUsers } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";
import EAIlogo from "../public/images/EAI-footer.png";

export default function PublicationFooter() {
    return (
        <footer className="border-b border-white bg-slate-950 text-white">
            <div className="container mx-auto px-5 py-12 lg:py-14 lg:px-8 xl:py-16">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
                    {/* Conference affiliation */}
                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold tracking-tight text-white lg:text-2xl">
                            This event is part of the EAI Conference Series
                        </h2>


                    </div>

                    {/* EAI logo */}
                    <a
                        href="https://eai.eu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit the European Alliance for Innovation website"
                        className="group inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/3 px-8 py-5 transition-colors duration-300 hover:border-blue-500/40"
                    >
                        <Image
                            src={EAIlogo}
                            alt="European Alliance for Innovation (EAI)"
                            width={240}
                            height={120}
                            className="h-auto w-60 object-contain transition-opacity duration-300 lg:w-48"
                        />
                    </a>

                    {/* Membership CTA */}
                    <div className="flex flex-col items-center gap-3">
                        <a
                            href="https://iam.eai.eu/realms/eai/protocol/openid-connect/registrations?client_id=services&response_type=code&scope=openid&redirect_uri=https%3A%2F%2Feai.eu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        >
                            <FaUsers className="h-4 w-4" />

                            Become an EAI Member

                            <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}