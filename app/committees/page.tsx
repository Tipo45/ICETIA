import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import {
  LuArrowUpRight,
  LuBriefcase,
  LuCoffee,
  LuCrown,
  LuGraduationCap,
} from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { MdOutlineLaptop } from "react-icons/md";
import { IoMdMegaphone } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";

const steeringCommittee = [
  {
    role: "Chair",
    name: "Professor Promise Mebine",
    affiliation:
      "Vice Chancellor, Federal University Otuoke, Nigeria",
  },
  {
    role: "Co-Chair",
    name: "Professor Nateinyin Joy Akporehw",
    affiliation:
      "Deputy Vice Chancellor, Research & Development",
  },
  {
    role: "Co-Chair",
    name: "Professor Olufunso O. Abosede",
    affiliation:
      "Director, Research Coordinator, Federal University Otuoke",
  },
];

const organisingCommittee = [
  {
    role: "Host",
    name: "Associate Professor (Mrs.) May Tamara Stow",
    affiliation:
      "Ag. Head, Department of Computer Science & Informatics",
    icon: LuCrown,
  },
  {
    role: "General Chair",
    name: "Dr Joshua Ibibo",
    affiliation: "Federal University Otuoke",
    icon: FaUsers,
  },
  {
    role: "General Co-Chair",
    name: "Dr Boye A. Frederick",
    affiliation: "Federal University Otuoke",
    icon: FaUsers,
  },
  {
    role: "Technical Program Committee Chair",
    name: "Professor Promise Nlerum",
    affiliation: "",
    icon: LuGraduationCap,
  },
];

const otherCommittees = [
  {
    title: "Technical Program Committee Co-Chair",
    icon: LuGraduationCap,
  },
  {
    title: "Web Chairs",
    icon: MdOutlineLaptop,
  },
  {
    title: "Publicity & Social Media Chair",
    icon: IoMdMegaphone,
  },
  {
    title: "Workshop Chair",
    icon: CiGlobe,
  },
  {
    title: "Sponsorship & Exhibit Chair",
    icon: LuBriefcase,
  },
  {
    title: "Publication Chair",
    icon: FiBookOpen,
  },
  {
    title: "Accommodation / Ticket Committee",
    icon: FaUsers,
  },
  {
    title: "Refreshments Committee",
    icon: LuCoffee,
  },
];

export default function CommitteesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-white/10 bg-slate-950 text-white">
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
                ICETIA 2027 is guided by distinguished academics,
                researchers and professionals dedicated to the successful
                planning and delivery of the conference.
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
              <p className="mt-1 text-sm font-semibold text-white">
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

      {/* Steering Committee */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Strategic Leadership
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                Steering
                <span className="text-blue-600"> Committee.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              Providing strategic leadership, institutional oversight and
              direction for the successful delivery of ICETIA 2027.
            </p>

          </div>

          <div className="mt-10 grid border-l border-t border-slate-200 lg:mt-12 lg:grid-cols-3">

            {steeringCommittee.map((member, index) => (
              <div
                key={member.name}
                className="group border-b border-r border-slate-200 p-6 transition-colors duration-300 hover:bg-slate-950 lg:min-h-75 lg:p-7 xl:p-8"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <LuCrown className="h-5 w-5" />
                  </div>

                  <span className="text-xs font-bold tracking-widest text-slate-300 transition-colors group-hover:text-slate-600">
                    0{index + 1}
                  </span>

                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600 group-hover:text-blue-400">
                  {member.role}
                </p>

                <h3 className="mt-3 text-xl font-bold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-white lg:text-2xl">
                  {member.name}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-500 transition-colors group-hover:text-slate-400">
                  {member.affiliation}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Organising Committee */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Conference Delivery
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                Organising
                <span className="text-blue-600"> Committee.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              Responsible for coordinating the operational, academic and
              administrative activities required to deliver the conference.
            </p>

          </div>

          <div className="mt-10 border-t border-slate-200 lg:mt-12">

            {organisingCommittee.map((member, index) => {
              const Icon = member.icon;

              return (
                <div
                  key={member.role}
                  className="group grid gap-5 border-b border-slate-200 py-6 lg:grid-cols-[80px_1fr_1fr] lg:items-center lg:gap-8 lg:py-7"
                >

                  <div className="flex items-center gap-4">

                    <span className="text-xs font-bold tracking-widest text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>

                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                      {member.role}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">
                      {member.name}
                    </h3>
                  </div>

                  <p className="text-sm leading-6 text-slate-500 lg:max-w-md">
                    {member.affiliation || "Federal University Otuoke"}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Other Committee Positions */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Additional Roles
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                Committee
                <span className="text-blue-600"> positions.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              Additional committee appointments and role holders will be
              announced as planning and confirmations progress.
            </p>

          </div>

          <div className="mt-10 grid border-l border-t border-slate-200 lg:mt-12 lg:grid-cols-2 xl:grid-cols-4">

            {otherCommittees.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group border-b border-r border-slate-200 p-5 transition-colors duration-300 hover:bg-slate-950 lg:p-6"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-slate-300 group-hover:text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>

                  <h3 className="mt-6 text-base font-semibold leading-6 text-slate-900 transition-colors group-hover:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs font-medium uppercase tracking-widest text-slate-400 transition-colors group-hover:text-slate-500">
                    To Be Announced
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Technical Program Committee */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">

            <div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-slate-200 text-blue-600">
                <LuGraduationCap className="h-5 w-5" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Research & Review
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                Technical Program
                <span className="text-blue-600"> Committee.</span>
              </h2>

            </div>

            <div className="border-t border-slate-200 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">

              <div className="flex items-center gap-3">
                <FaUserTie className="h-5 w-5 text-blue-600" />

                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Members Coming Soon
                </span>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 lg:text-base lg:leading-8">
                The full list of Technical Program Committee members will be
                published after confirmations from participating institutions
                and partner organisations.
              </p>

              <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
                <span>To Be Announced</span>
                <LuArrowUpRight className="h-4 w-4" />
              </div>

            </div>

          </div>

        </div>
      </section>

     

      <Footer />
    </main>
  );
}