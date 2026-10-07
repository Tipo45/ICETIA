"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  FaUsers
} from "react-icons/fa";
import {
  LuCalendarDays
} from "react-icons/lu";



export default function CommitteesPage() {
  return (
    <section className="min-h-screen bg-white text-slate-950">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="border-b border-white/10 bg-[#07111f] text-white">
        <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                <FaUsers className="h-4 w-4" />
                ICETIA 2027
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                Conference
                <span className="text-blue-400"> Committees.</span>
              </h1>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
                Meet the committees responsible for the strategic
                leadership, academic quality, coordination and successful
                delivery of the First International Conference on Emerging
                Technologies, Innovation and Applications.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 border-t border-white/10 lg:mt-12 lg:grid-cols-4">
            <div className="border-r border-white/10 px-4 py-5 first:pl-0">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Conference
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                ICETIA 2027
              </p>
            </div>

            <div className="border-r-0 px-4 py-5 lg:border-r lg:border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Edition
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Maiden Edition
              </p>
            </div>

            <div className="hidden border-r border-white/10 px-4 py-5 lg:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Date
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
                <LuCalendarDays className="h-4 w-4 text-blue-400" />
                28 – 30 April, 2027
              </p>
            </div>

            <div className="hidden px-4 py-5 lg:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Host
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Federal University Otuoke
              </p>
            </div>
          </div>
        </div>
      </section>

      
     

     

     
      <Footer />
    </section>
  );
}