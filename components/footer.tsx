import Link from "next/link";
import {
  LuArrowUpRight,
  LuCalendarDays,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";

const quickLinks = [
  { name: "About", href: "/#about" },
  { name: "Committees", href: "/committees" },
  { name: "Call For Papers", href: "/#cfp" },
  { name: "Tracks", href: "/#tracks" },
  { name: "Program", href: "/program" },
  { name: "Registration", href: "/#registration" },
];

const sponsors = [
  "MTN",
  "GLO",
  "Bayelsa State Government",
  "NDDC",
  "UBA",
  "Airtel Nigeria",
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-slate-950 text-white"
    >
      <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">

        {/* Main footer */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.7fr_1fr_0.8fr] lg:gap-8 xl:gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold tracking-tight">
                ICETIA
              </h3>

              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                2027
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              International Conference on Emerging Technologies,
              Innovation and Applications.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-500">
              <LuCalendarDays className="h-4 w-4 text-blue-500" />
              28 – 30 April, 2027
            </div>

            <p className="mt-3 text-xs text-slate-600">
              Federal University Otuoke · Bayelsa State, Nigeria
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Explore
            </h4>

            <nav className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="w-fit text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Contact
            </h4>

            <div className="mt-5 flex flex-col gap-4 text-sm text-slate-400">

              <div className="flex items-start gap-3">
                <LuMapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />

                <p className="leading-6">
                  Federal University Otuoke
                  <br />
                  Ogbia, Bayelsa State, Nigeria
                </p>
              </div>

              <div className="flex items-center gap-3">
                <LuMail className="h-4 w-4 shrink-0 text-blue-500" />

                <span className="text-slate-500">
                  Conference email coming soon
                </span>
              </div>

              <div className="flex items-center gap-3">
                <LuPhone className="h-4 w-4 shrink-0 text-blue-500" />

                <span className="text-slate-500">
                  Contact number coming soon
                </span>
              </div>
            </div>
          </div>

          {/* Sponsorship */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Sponsorship
            </h4>

            <p className="mt-5 text-sm leading-6 text-slate-500">
              Supporting organisations and partners.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {/* {sponsors.map((sponsor) => (
                <span
                  key={sponsor}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400"
                >
                  {sponsor}
                </span>
              ))} */}
            </div>

            <Link
              href="/sponsorship"
              className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 transition-colors hover:text-blue-300"
            >
              Become a Sponsor
              <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-slate-600 lg:flex-row lg:items-center lg:justify-between">

            <p>
              © {new Date().getFullYear()} Tipotek. All Rights Reserved.
            </p>

            <p>
              Hosted by the Federal University Otuoke.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}