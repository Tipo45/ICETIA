"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IoMdMenu } from "react-icons/io";
import { LuArrowUpRight } from "react-icons/lu";

export default function Navbar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Committees", href: "/committees" },
    { name: "Call for Papers", href: "/#cfp" },
    { name: "Tracks", href: "/#tracks" },
    { name: "Program", href: "/program" },
    { name: "Sponsorship", href: "/sponsorship" },
    { name: "Contact", href: "/#footer" },
  ];

  const router = useRouter();

  const handleRegistrationNavigation = () => {
    router.push("/#registration");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6 xl:h-18">
        
        {/* Logo / Conference Name */}
        <Link
          href="/"
          className="group flex max-w-70 flex-col leading-tight"
        >
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-slate-950 lg:text-lg">
              ICETIA
            </span>

            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
              2027
            </span>
          </div>

          <p className="mt-0.5 text-[10px] font-medium text-slate-500 lg:text-xs">
            International Conference on Emerging Technologies,
            Innovation & Applications
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden xl:block">
          <Button
            onClick={handleRegistrationNavigation}
            className="group h-10 rounded-full bg-blue-600 px-5 text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
          >
            Register Now
            <LuArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="h-10 w-10 rounded-full text-slate-900 hover:bg-slate-100 xl:hidden"
            >
              <IoMdMenu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[85%] max-w-sm border-r border-slate-200 bg-white px-6"
          >
            {/* Mobile Brand */}
            <div className="mt-8 border-b border-slate-200 pb-6">
              <Link href="/" className="flex flex-col leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-slate-950">
                    ICETIA
                  </span>

                  <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    2027
                  </span>
                </div>

                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  International Conference on Emerging Technologies,
                  Innovation & Applications
                </p>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <nav className="mt-6 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="border-b border-slate-100 py-4 text-base font-medium text-slate-700 transition-colors hover:text-blue-600"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile CTA */}
            <Button
              onClick={handleRegistrationNavigation}
              className="mt-7 h-11 w-full rounded-full bg-blue-600 text-sm font-semibold hover:bg-blue-700"
            >
              Register Now
              <LuArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}