"use client";

import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { IoMdMenu } from "react-icons/io";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Call for Papers", href: "#cfp" },
  { name: "Tracks", href: "#tracks" },
  { name: "Dates", href: "#dates" },
  { name: "Registration", href: "#registration" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="max-w-sm">
          <h1 className="font-bold text-xl text-blue-900">
            ICETIA 2026
          </h1>
          <p className="text-xs text-muted-foreground">
            International Conference on Emerging Technologies,
            Innovation and Application
          </p>
        </Link>

        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition hover:text-blue-700"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Button>
            Register Now
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
            >
              <IoMdMenu />
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <div className="mt-10 flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-6 text-md lg:text-lg font-medium"
                >
                  {item.name}
                </a>
              ))}

              <Button className="mt-4">
                Register Now
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
