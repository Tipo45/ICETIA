import Image from "next/image";
import Link from "next/link";
import EAILogo from "../public/images/EAI-footer.png";

export default function PublicationHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/20 bg-blue-400/95 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 tablet:px-8">
                {/* EAI Logo */}
                <Link
                    href="https://eai.eu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="EAI homepage"
                    className="shrink-0"
                >
                    <Image
                        src={EAILogo}
                        alt="EAI Logo"
                        width={240}
                        height={80}
                        priority
                        className="h-auto w-50 object-contain tablet:w-70"
                    />
                </Link>

                {/* Navigation Links */}
                <nav className="flex items-center gap-2 text-sm font-medium text-white tablet:gap-4 tablet:text-sm">
                    <a
                        href="https://eudl.eu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 hover:text-slate-950"
                    >
                        EU Digital Library
                    </a>

                    <span className="text-white/60">|</span>

                    <Link
                        href="/contact/contact-us"
                        className="whitespace-nowrap transition-colors duration-200 hover:text-slate-950"
                    >
                        Contact Us
                    </Link>

                    <span className="hidden text-white/60 tablet:inline">|</span>

                    <a
                        href="https://help.eai-conferences.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden whitespace-nowrap transition-colors duration-200 hover:text-slate-950 tablet:inline"
                    >
                        Support
                    </a>

                    <a
                        href="https://iam.eai.eu/realms/eai/protocol/openid-connect/registrations?client_id=services&response_type=code&scope=openid&redirect_uri=https%3A%2F%2Feai.eu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition duration-300 hover:bg-slate-950 tablet:inline-flex"
                    >
                        Join Free
                    </a>
                </nav>
            </div>
        </header>
    );
}