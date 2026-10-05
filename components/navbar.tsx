"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { LuArrowUpRight } from "react-icons/lu";
import Image from "next/image";

export default function Navbar() {
  const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Committees", href: "/committees" },
  { name: "Tracks", href: "/#tracks" },
  { name: "Program", href: "/program" },
  { name: "Travel & Venue", href: "/travel-and-venue" },
  { name: "Sponsorship", href: "/sponsorship" },
  { name: "Contact", href: "/#footer" },
];

const conferenceItems = [
  {
    name: "Call for Papers",
    href: "/#cfp",
    description: "Submission guidelines, requirements and publication opportunities.",
  },
  {
    name: "Accepted Papers",
    href: "/accepted-papers",
    description: "View papers accepted for presentation at ICETIA 2027.",
  },
  {
    name: "Keynote Speakers",
    href: "/#keynote",
    description: "Meet the distinguished speakers joining ICETIA 2027.",
  },
  {
    name: "Important Dates",
    href: "/#dates",
    description: "Important deadlines and key conference dates.",
  },
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
          className="group flex max-w-70 items-center gap-3 leading-tight"
        >
          {/* Logo */}
          <div className="shrink-0">
            <Image
              src="/images/logo.jpg"
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
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden xl:flex">
  <NavigationMenuList className="gap-1">

    {/* Normal navigation items */}
    {navItems.slice(0, 2).map((item) => (
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

    {/* Conference Dropdown */}
    <NavigationMenuItem>
      <NavigationMenuTrigger className="h-10 bg-transparent px-3 text-[13px] font-medium text-slate-600 hover:bg-transparent hover:text-blue-600 focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-blue-600">
        Conference
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <div className="w-[420px] p-3">
          <div className="mb-2 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              ICETIA 2027
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Explore conference information, papers, speakers and key dates.
            </p>
          </div>

          <div className="grid gap-1">
            {conferenceItems.map((item) => (
              <NavigationMenuLink key={item.name} asChild>
                <Link
                  href={item.href}
                  className="group block rounded-md p-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                      {item.name}
                    </span>

                    <LuArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
                  </div>

                  <p className="mt-1 pr-6 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </Link>
              </NavigationMenuLink>
            ))}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>

    {/* Remaining navigation items */}
    {navItems.slice(2).map((item) => (
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

  {navItems.slice(0, 3).map((item) => (
    <Link
      key={item.name}
      href={item.href}
      className="border-b border-slate-100 py-4 text-base font-medium text-slate-700 transition-colors hover:text-blue-600"
    >
      {item.name}
    </Link>
  ))}

  {/* Mobile Conference */}
  <div className="border-b border-slate-100 py-4">
    <p className="text-base font-medium text-slate-700">
      Conference
    </p>

    <div className="mt-2 ml-3 border-l border-slate-200">
      {conferenceItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="block px-4 py-2.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
        >
          {item.name}
        </Link>
      ))}
    </div>
  </div>

  {navItems.slice(3).map((item) => (
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