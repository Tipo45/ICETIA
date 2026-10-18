"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { IoMdMenu } from "react-icons/io";
import { LuArrowUpRight, LuChevronDown } from "react-icons/lu";
import Image from "next/image";


export default function Navbar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Sponsorship", href: "/sponsorship" },
    { name: "Contact", href: "/contact" },
  ];

  const conferenceItems = [
    {
      name: "Virtual Participants",
      href: "/conference/virtual-participants",
    },
  ];

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

  const programItems = [
    {
      name: "Accepted Papers",
      href: "/program/accepted-papers"
    },
    {
      name: "Workshops",
      href: "/program/workshops"
    },
    {
      name: "Keynotes",
      href: "/program/keynotes"
    }
  ];

  const locationItems = [
    {
      name: "Venue",
      href: "/location/venue"
    },
    {
      name: "Visa",
      href: "/location/visa"
    },
  ];

  const router = useRouter();

  const handleRegistrationNavigation = () => {
    router.push("/registration");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-6 xl:h-22">

        {/* Logo / Conference Name */}
        <Link
          href="/"
          className="group flex max-w-70 items-center gap-3 leading-tight"
        >
          {/* Logo */}
          <div className="shrink-0">
            <Image
              src="/images/logo-no-bg.png"
              alt="ICETIA Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>

          {/* Text */}
          <div className="min-w-0">
            {/* ICETIA + 2027 */}
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-slate-950 lg:text-lg">
                ICETIA
              </span>

              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                2027
              </span>
            </div>

            {/* Conference name */}
            <p className="mt-0.5 text-[10px] font-medium leading-4 text-slate-500 lg:text-xs">
              International Conference on Emerging Technologies,
              Innovation & Applications
            </p>
          </div>

          <div className="shrink-0">
            <Image
              src="/images/FUO-Logo.png"
              alt="Federal University Otuoke Logo"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 object-contain"
            />
          </div>

        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList className="gap-1">

            {/* Normal navigation items */}
            {navItems.slice(0, 1).map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="inline-flex h-10 items-center justify-center px-3 text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {/* Conference */}
            <div className="group/conference relative">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center px-3 text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600"
              >
                Conference
              </button>

              <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-2 group-hover/conference:block">
                <div className="w-50 rounded-md border border-slate-200 bg-white p-2 shadow-lg">
                  <div className="grid gap-1">
                    <div className="rounded-md p-2">
                      <div className="mb-2 text-sm font-semibold text-slate-800">
                        For Authors
                      </div>

                      <div className="ml-3 border-l border-slate-200">
                        <Link
                          href="/conference/for-authors/camera-ready"
                          className="block rounded-md px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                        >
                          Camera Ready
                        </Link>

                        <Link
                          href="/conference/for-authors/call-for-papers"
                          className="block rounded-md px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                        >
                          Call For Papers
                        </Link>

                        <Link
                          href="/conference/for-authors/call-for-workshop-papers"
                          className="block rounded-md px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                        >
                          Call For Workshop Papers
                        </Link>
                      </div>
                    </div>

                    {conferenceItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-center justify-between rounded-md p-2 transition-colors hover:bg-slate-50 text-slate-600 hover:text-blue-600"
                      >
                        <span className="text-sm font-semibold">
                          {item.name}
                        </span>

                        {/* <LuArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" /> */}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            {/* Committees */}
            <div className="group/committees relative">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center px-3 text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600"
              >
                Committees
              </button>

              <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-2 group-hover/committees:block">
                <div className="w-50 rounded-md border border-slate-200 bg-white p-2 shadow-lg">
                  <div className="grid gap-1">
                    {committeeItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group block rounded-md p-2 transition-colors hover:bg-slate-50 text-slate-600 hover:text-blue-600"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">
                            {item.name}
                          </span>

                          {/* <LuArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" /> */}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            {/* Program */}
            <div className="group/program relative">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center px-3 text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600"
              >
                Program
              </button>

              <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-2 group-hover/program:block">
                <div className="w-35 rounded-md border border-slate-200 bg-white p-2 shadow-lg">
                  <div className="grid gap-1">
                    {programItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group block rounded-md p-2 transition-colors hover:bg-slate-50 text-slate-600 hover:text-blue-600"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold ">
                            {item.name}
                          </span>

                          {/* <LuArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> */}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            {/* Location */}
            <div className="group/location relative">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center px-3 text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600"
              >
                Location
              </button>

              <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 group-hover/location:block">
                <div className="w-20 rounded-md border border-slate-200 bg-white p-2 shadow-lg">
                  <div className="grid gap-1">
                    {locationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group block rounded-md p-2 transition-colors hover:bg-slate-50 text-slate-600 hover:text-blue-600"
                      >
                        <div className="flex items-center justify-between ">
                          <span className="text-sm font-semibold">
                            {item.name}
                          </span>

                          {/* <LuArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> */}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining navigation items */}
            {navItems.slice(1).map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="inline-flex h-10 items-center justify-center px-3 text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

          </NavigationMenuList>
        </NavigationMenu>

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
            className="flex h-dvh w-[85%] max-w-sm flex-col overflow-hidden border-r border-slate-200 bg-white px-6"
          >
            {/* Mobile Brand */}
            <div className="mt-8 border-b border-slate-200 pb-6">
              <Link
                href="/"
                className="flex items-center gap-3 leading-tight"
              >
                {/* ICETIA Logo */}
                <Image
                  src="/images/logo.jpg"
                  alt="ICETIA Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 object-contain"
                />

                {/* Conference Information */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-slate-950">
                      ICETIA
                    </span>

                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      2027
                    </span>
                  </div>

                  <p className="mt-1 max-w-60 text-xs leading-relaxed text-slate-500">
                    International Conference on Emerging Technologies,
                    Innovation & Applications
                  </p>
                </div>

                {/* FUO Logo */}
                <Image
                  src="/images/FUO-Logo.png"
                  alt="FUO Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 object-contain"
                />
              </Link>
            </div>

            {/* Mobile Navigation */}
            <nav className="mt-6 min-h-0 flex-1 overflow-y-auto overscroll-contain flex flex-col">

              {navItems.slice(0, 1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="border-b border-slate-100 py-4 text-base font-medium text-slate-700 transition-colors hover:text-blue-600"
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Conference Dropdown */}
              <Collapsible className="border-b border-slate-100">
                <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-slate-700 hover:text-blue-600 data-[state=open]:text-blue-600">
                  <span>Conference</span>
                  <span className="text-lg leading-none transition-transform duration-200 [&[data-state=open]>svg]:rotate-180">
                    <LuChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </span>
                </CollapsibleTrigger>


                <CollapsibleContent className="pb-3">

                  <Collapsible className="ml-3 border-l border-slate-200">
                    <CollapsibleTrigger className="group flex w-full items-center justify-between px-4 py-2.5 text-slate-700 transition-colors">
                      <span>For Authors</span>

                      <LuChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pb-3">
                      <div className="ml-8 flex flex-col space-y-4 py-2 text-sm text-slate-500">
                        <Link href="/conference/for-authors/camera-ready" className="hover:text-blue-500">
                          Camera Ready
                        </Link>

                        <Link href="/conference/for-authors/call-for-papers" className="hover:text-blue-500">
                          Call for Papers
                        </Link>

                        <Link href="/conference/for-authors/call-for-workshop-papers" className="hover:text-blue-500">
                          Call For Workshop Papers
                        </Link>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="ml-3 border-l border-slate-200">
                    {conferenceItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 transition-colors hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Mobile Committee Dropdown */}
              <Collapsible className="border-b border-slate-100">
                <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-slate-700 hover:text-blue-600 data-[state=open]:text-blue-600">
                  <span>Committees</span>
                  <span className="text-lg leading-none transition-transform duration-200 [&[data-state=open]>svg]:rotate-180">
                    <LuChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </span>
                </CollapsibleTrigger>

                <CollapsibleContent className="pb-3">
                  <div className="ml-3 border-l border-slate-200">
                    {committeeItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Mobile Program Dropdown */}
              <Collapsible className="border-b border-slate-100">
                <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-slate-700 hover:text-blue-600 data-[state=open]:text-blue-600 group">
                  <span>Program</span>
                  <span className="text-lg leading-none transition-transform duration-200 [&[data-state=open]>svg]:rotate-180">
                    <LuChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </span>
                </CollapsibleTrigger>

                <CollapsibleContent className="pb-3">
                  <div className="ml-3 border-l border-slate-200">
                    {programItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Mobile Location Dropdown */}
              <Collapsible className="border-b border-slate-100">
                <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-slate-700 hover:text-blue-600 data-[state=open]:text-blue-600 group">
                  <span>Location</span>
                  <span className="text-lg leading-none transition-transform duration-200 [&[data-state=open]>svg]:rotate-180">
                    <LuChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </span>
                </CollapsibleTrigger>

                <CollapsibleContent className="pb-3">
                  <div className="ml-3 border-l border-slate-200">
                    {locationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {navItems.slice(1).map((item) => (
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
            <div className="shrink-0 border-t border-slate-200 bg-white pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
              <Button
                onClick={handleRegistrationNavigation}
                className="h-12 w-full rounded-full bg-blue-600 text-sm font-semibold hover:bg-blue-700"
              >
                Register Now
                <LuArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}