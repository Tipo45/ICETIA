import Image from "next/image";
import Link from "next/link";
import {
  LuArrowUpRight,
  LuCalendarDays,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

const quickLinks = [
  { name: "About", href: "/#about" },
  { name: "Registration", href: "/registration" },
];

const programItems = [
  {
    name: "Accepted Papers",
    href: "/program/accepted-papers"
  },
  {
    name: "Workshop",
    href: "/program/workshops"
  },
  {
    name: "Keynotes",
    href: "/program/keynotes"
  }
]

const committeeItems = [
  {
    name: "Steering Committee",
    href: "/committees/steering-committee",
  },
  {
    name: "Organsing committee",
    href: "/committees/organising-committee",
  },
  {
    name: "Technical Programme Commitee",
    href: "/committees/technical-programme-committee",
  },
  {
    name: "Specialised Committee",
    href: "/committees/specialised-committee",
  },
];

const forAuthorItems = [
  {
    name: "Camera Ready",
    href: "/conference/for-authors/camera-ready",
  },
  {
    name: "Call For Papers",
    href: "/conference/for-authors/call-for-papers",
  },
  {
    name: "Call For Workshop Papers",
    href: "/conference/for-authors/call-for-workshop-papers",
  },
];

const locationItems = [
  {
    name: "Venue",
    href: "/location/venue"
  },
  {
    name: "Visa",
    href: "/location/visa"
  }
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
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-no-bg.png"
                alt="ICETIA Logo"
                width={60}
                height={60}
                className="h-20 w-20 shrink-0 object-contain"
              />

              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight">
                  ICETIA
                </h3>

                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                  2027
                </span>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              International Conference on Emerging Technologies,
              Innovations and Applications.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-500">
              <LuCalendarDays className="h-4 w-4 text-blue-500" />
              28 – 30 April, 2027
            </div>

            <Link
              href="https://fuotuoke.edu.ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs text-slate-600 transition-colors hover:text-blue-500"
            >
              <Image
                src="/images/FUO-Logo.png"
                alt="Federal University Otuoke Logo"
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 object-contain"
              />

              <span>
                Federal University Otuoke · Bayelsa State, Nigeria
              </span>
            </Link>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Explore
            </h4>

            <nav className="mt-5 flex flex-col gap-3">

              {/* for authors */}
              <Collapsible>
                <CollapsibleTrigger className="text-sm text-slate-400 hover:text-white">For Authors</CollapsibleTrigger>
                <CollapsibleContent className="pb-3">
                  <div className="ml-3 border-l border-slate-200">
                    {forAuthorItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-500 transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* committee */}
              <Collapsible>
                <CollapsibleTrigger className="text-sm text-slate-400 hover:text-white">Committees</CollapsibleTrigger>
                <CollapsibleContent className="pb-3">
                  <div className="ml-3 border-l border-slate-200">
                    {committeeItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-500 transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* program */}
              <Collapsible>
                <CollapsibleTrigger className="text-sm text-slate-400 hover:text-white">Program</CollapsibleTrigger>
                <CollapsibleContent className="pb-3">
                  <div className="ml-3 border-l border-slate-200">
                    {programItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-500 transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>


              {/* about */}
              {quickLinks.slice(3).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="w-fit text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}


              {/* location */}
              <Collapsible>
                <CollapsibleTrigger className="text-sm text-slate-400 hover:text-white">Location</CollapsibleTrigger>
                <CollapsibleContent className="pb-3">
                  <div className="ml-3 border-l border-slate-200">
                    {locationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-500 transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {quickLinks.slice(0).map((link) => (
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
                  Directorate of Research and Quality Assurance
                  <br />
                  Federal University Otuoke
                  <br />
                  PMB 126 Bayelsa State
                  <br />
                  Nigeria
                </p>
              </div>

              <div className="flex items-center gap-3">
                <LuMail className="h-4 w-4 shrink-0 text-blue-500" />

                <a href="mailto:conference@icetiaconference.org" className="text-slate-500 transition-colors hover:text-blue-600 hover:underline">
                  conference@icetiaconference.org
                </a>
              </div>

              <div className="flex items-center gap-3">
                <LuPhone className="h-4 w-4 shrink-0 text-blue-500" />

                <span className="text-slate-500">
                  <a href="tel:+2348069225628" className="transition-colors hover:text-blue-600 hover:underline">+2348069225628</a>
                  <br />
                  <a href="tel:+447377083132" className="transition-colors hover:text-blue-600 hover:underline">+447377083132</a>
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
          <div className="flex flex-col gap-3 text-base text-slate-600 lg:flex-row lg:items-center lg:justify-between">

            <div className="space-y-1">
              <p>
              © EAI ICETIA 2027. All Rights Reserved.
            </p>
            <p className="text-xs">Developed by <a href="https://techlinkinnovations.com" target="blank">TechLink Innovations</a></p>
            </div>

            <p>
              Hosted by the Federal University Otuoke.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}