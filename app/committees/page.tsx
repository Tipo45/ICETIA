"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  FaUsers,
  FaUserTie,
  FaMoneyBillWave,
  FaBullhorn,
  FaBookOpen,
  FaHotel,
  FaClipboardCheck,
  FaLaptop,
} from "react-icons/fa";
import {
  LuArrowUpRight,
  LuBriefcase,
  LuCalendarDays,
  LuCircleCheck,
  LuChevronDown,
  LuCoffee,
  LuCrown,
  LuFileText,
  LuGlobe,
  LuGraduationCap,
  LuMegaphone,
  LuMonitor,
  LuPresentation,
  LuShieldCheck,
  LuUsers,
} from "react-icons/lu";
import { useState } from "react";

const steeringCommittee = [
  {
    role: "Chair",
    name: "Professor Olugbenga Akinade",
    affiliation:
      "Professor of Digital Innovation, Teesside University, United Kingdom",
  },
  {
    role: "Co-Chair",
    name: "Dr Josiah Balota",
    affiliation: "Teesside University, United Kingdom",
  },
  {
    role: "Chief Host",
    name: "Professor Promise Mebine",
    affiliation:
      "Vice-Chancellor, Federal University Otuoke, Nigeria",
  },
  {
    role: "Host",
    name: "Professor Nateinyin Joy Akporehwe",
    affiliation:
      "Deputy Vice-Chancellor, Research and Development (R&D), Federal University Otuoke",
  },
  {
    role: "Member",
    name: "Professor Johnson Ohakwe",
    affiliation:
      "Dean, Faculty of Science, Federal University Otuoke, Nigeria",
  },
  {
    role: "Member",
    name: "Professor Olufunso O. Abosede",
    affiliation:
      "Director of Research, Federal University Otuoke, Nigeria",
  },
];

const internationalOrganisingCommittee = [
  {
    role: "General Chair",
    name: "Dr Joshua Ibibo",
    affiliation: "Teesside University, United Kingdom",
  },
  {
    role: "Co-Chair (Program Chair)",
    name: "Dr Boye Aziboledia Frederick",
    affiliation: "Federal University Otuoke, Nigeria",
  },
  {
    role: "Secretary",
    name: "Dr. (Mrs) Merosobo Lawson-Ikuru",
    affiliation: "Federal University Otuoke, Nigeria",
  },
  {
    role: "Assistant Secretary",
    name: "Dr Ibenate Arubere",
    affiliation: "Federal University Otuoke, Nigeria",
  },
];

const secretariat = [
  {
    role: "Secretary",
    name: "Dr. (Mrs) Merosobo Lawson-Ikuru",
    affiliation: "Federal University Otuoke, Nigeria",
  },
  {
    role: "Assistant Secretary",
    name: "Dr Ibenate Arubere",
    affiliation: "Federal University Otuoke, Nigeria",
  },
];

const committees = [
  {
    number: "04",
    title: "Finance & Budget Committee",
    shortTitle: "Finance & Budget",
    description:
      "Responsible for conference budgeting, financial records, payment reconciliation, sponsorship receipts and financial accountability.",
    icon: FaMoneyBillWave,
    chair: {
      role: "Chair",
      name: "Dr. Alabere Idayana",
      affiliation: "Federal University Otuoke, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair & Treasurer",
        name: "Dr Belinda Onyeashie",
        affiliation:
          "University of the West of England, United Kingdom",
      },
    ],
    members: [
      {
        name: "Dr. Boye Aziboledia Frederick",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Dr Ibenate Arubere",
        affiliation: "Federal University Otuoke, Nigeria",
      },
    ],
  },

  {
    number: "05",
    title: "Technical Programme Committee",
    shortTitle: "Technical Programme",
    description:
      "Coordinates the Call for Papers, peer review, technical tracks, paper decisions, camera-ready submissions and the technical conference programme.",
    icon: LuGraduationCap,
    chair: {
      role: "Chair",
      name: "Dr Oluwaseun Bamgboye",
      affiliation: "Edinburgh Napier University, United Kingdom",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Professor Victor Ekong",
        affiliation: "University of Uyo, Nigeria",
      },
      {
        role: "Co-Chair",
        name: "Professor Abayomi Jegede",
        affiliation: "Edo State University Iyamho, Nigeria",
      },
    ],
    members: [
      {
        name: "Associate Prof. Godwin A. Thomas",
        affiliation: "University of Jos, Nigeria",
      },
      {
        name: "Dr Belinda Onyeashie",
        affiliation:
          "University of the West of England, United Kingdom",
      },
      {
        name: "Alams Mammuan",
        affiliation: "Cranfield University, United Kingdom",
      },
      {
        name: "Dr Fekumo Bolouembeledo",
        affiliation: "University of South Africa, Pretoria",
      },
      {
        name: "Faisal A. Garba",
        affiliation:
          "Sa'adatu Rimi College of Education, Nigeria",
      },
      {
        name: "Dr. Ikiomoye Douglas Emmanuel",
        affiliation: "UGM Manchester, United Kingdom",
      },
    ],
  },

  {
    number: "06",
    title: "Sponsorship, Partnership & Exhibition Committee",
    shortTitle: "Sponsorship & Exhibition",
    description:
      "Leads sponsor engagement, strategic partnerships, sponsorship packages, exhibition opportunities and sponsor recognition.",
    icon: LuBriefcase,
    chair: {
      role: "Chair",
      name: "Evans Porbeni",
      affiliation:
        "University of Africa Toru-Orua, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Dr. Nwankwe Dimie",
        affiliation: "Rivers State University, Nigeria",
      },
    ],
    members: [
      {
        name: "Godslight Thomas Sese",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Eleje Chinwendu Best",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Ogolo-Christian Wisdom Amafurotubo",
        affiliation: "Federal University Otuoke, Nigeria",
      },
    ],
  },

  {
    number: "07",
    title: "Publicity, Media & Website Committee",
    shortTitle: "Publicity, Media & Website",
    description:
      "Develops and implements the conference publicity strategy, website, social media, media engagement and digital documentation.",
    icon: LuMegaphone,
    chair: {
      role: "Chair",
      name: "Dr Goodhead Tomvie Abraham",
      affiliation: "Niger Delta University, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Faisal A. Garba",
        affiliation:
          "Sa'adatu Rimi College of Education, Nigeria",
      },
      {
        role: "Co-Chair",
        name: "Dr Fekumo Bolouembeledo",
        affiliation: "University of South Africa, Pretoria",
      },
      {
        role: "Co-Chair",
        name: "Dr. Ikiomoye Douglas Emmanuel",
        affiliation: "UGM Manchester, United Kingdom",
      },
      {
        role: "Co-Chair",
        name: "Alams Mammuan",
        affiliation: "Cranfield University, United Kingdom",
      },
    ],
    members: [
      {
        name: "Ogolo-Christian Wisdom Amafurotubo",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Dr. Loveth Eguma Nwabrije",
        affiliation:
          "Federal College of Education, Omoku, Nigeria",
      },
      {
        name: "Dr Belinda Onyeashie",
        affiliation:
          "University of the West of England, United Kingdom",
      },
      {
        name: "Godslight Thomas Sese",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "T.K. Waidor",
        affiliation: "University of Africa, Nigeria",
      },
      {
        name: "Dr. Thompson Saghanen",
        affiliation: "Elechi Amadi Polytechnic, Nigeria",
      },
    ],
  },

  {
    number: "08",
    title: "Publications & Editorial Committee",
    shortTitle: "Publications & Editorial",
    description:
      "Coordinates the Book of Abstracts, accepted papers, editorial standards, manuscript checks and approved publication arrangements.",
    icon: FaBookOpen,
    chair: {
      role: "Chair",
      name: "Professor Victor Ekong",
      affiliation: "University of Uyo, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Professor Abayomi Jegede",
        affiliation: "Edo State University Iyamho, Nigeria",
      },
      {
        role: "Co-Chair",
        name: "Dr. Biralatei James Fawei",
        affiliation: "Niger Delta University, Nigeria",
      },
      {
        role: "Co-Chair",
        name: "Dr. Ikiomoye Douglas Emmanuel",
        affiliation: "UGM Manchester, United Kingdom",
      },
    ],
    members: [
      {
        name: "Dr Oluwaseun Bamgboye",
        affiliation: "Edinburgh Napier University, United Kingdom",
      },
      {
        name: "Dr. Boye Aziboledia Frederick",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Dr Goodhead Tomvie Abraham",
        affiliation: "Niger Delta University, Nigeria",
      },
    ],
  },

  {
    number: "09",
    title: "Logistics, Protocol & Accommodation Committee",
    shortTitle: "Logistics & Protocol",
    description:
      "Coordinates venue arrangements, accommodation information, transportation, protocol, security, meeting spaces and conference facilities.",
    icon: FaHotel,
    chair: {
      role: "Chair",
      name: "Dr. Shobowole R. Temitope",
      affiliation: "Federal University Otuoke, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Dr. Stella Attah",
        affiliation:
          "Federal College of Education, Omuku, Nigeria",
      },
    ],
    members: [
      {
        name: "Godslight Thomas Sese",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Banigo Azibator",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Dr. (Mrs) Loveth Eguma Nwabrije",
        affiliation:
          "Federal College of Education, Omuku, Nigeria",
      },
    ],
  },

  {
    number: "10",
    title: "Registration & Welfare Committee",
    shortTitle: "Registration & Welfare",
    description:
      "Manages participant registration, payment verification, accreditation, registration desks, delegate assistance, welfare and certificates.",
    icon: FaClipboardCheck,
    chair: {
      role: "Chair",
      name: "Dr. Samuel Apigi Ikirigo",
      affiliation:
        "Federal University of Agriculture, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Dr. Ominini Monima Abiye-suku",
        affiliation: "Rivers State University, Nigeria",
      },
    ],
    members: [
      {
        name: "Asotekari Angel Jumbo",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Nataram Adumo",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Dr. Fortune Baribesia Deedam",
        affiliation: "Rivers State University, Nigeria",
      },
    ],
  },

  {
    number: "11",
    title: "Workshop & Special Sessions Committee",
    shortTitle: "Workshops & Special Sessions",
    description:
      "Coordinates workshops, tutorials, industry-led sessions, postgraduate sessions, technology demonstrations and professional development activities.",
    icon: LuPresentation,
    chair: {
      role: "Chair",
      name: "Professor Abayomi Jegede",
      affiliation: "Edo State University Iyamho, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Associate Prof. Godwin A. Thomas",
        affiliation: "University of Jos, Nigeria",
      },
      {
        role: "Co-Chair",
        name: "Dr. Biralatei James Fawei",
        affiliation: "Niger Delta University, Nigeria",
      },
    ],
    members: [
      {
        name: "Dr. Samuel Apigi Ikirigo",
        affiliation:
          "Federal University of Agriculture, Nigeria",
      },
      {
        name: "Dr. Thompson Saghanen",
        affiliation: "Elechi Amadi Polytechnic, Nigeria",
      },
    ],
  },

  {
    number: "12",
    title: "ICT, Virtual Participation & Technical Support Team",
    shortTitle: "ICT & Technical Support",
    description:
      "Supports the hybrid conference environment, virtual platforms, connectivity, presentations, streaming, digital systems and technical operations.",
    icon: FaLaptop,
    chair: {
      role: "Coordinator",
      name: "Collins Uchenna Onyegbado",
      affiliation: "Federal University Otuoke, Nigeria",
    },
    coChairs: [],
    members: [
      {
        name: "Banigo Azibator",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Ogolo-Christian Wisdom Amafurotubo",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Ikegwuonu-vic Uzoamaka Hope",
        affiliation: "Federal University Otuoke, Nigeria",
      },
    ],
  },
];

const governanceItems = [
  {
    label: "Strategic Leadership",
    value: "Steering Committee",
    icon: LuCrown,
  },
  {
    label: "Conference Coordination",
    value: "International Organising Committee",
    icon: FaUsers,
  },
  {
    label: "Academic Quality",
    value: "Technical Programme Committee",
    icon: LuGraduationCap,
  },
  {
    label: "Conference Delivery",
    value: "Specialised Committees",
    icon: LuBriefcase,
  },
];

export function MemberRow({
  role,
  name,
  affiliation,
}: {
  role?: string;
  name: string;
  affiliation: string;
}) {
  return (
    <div className="border-b border-slate-200 py-5 last:border-b-0">
      {role && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600">
          {role}
        </p>
      )}

      <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">
        {name}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {affiliation}
      </p>
    </div>
  );
}

export function CommitteeCard({
  committee,
}: {
  committee: (typeof committees)[number];
}) {
  const [open, setOpen] = useState(false);
  const Icon = committee.icon;

  return (
    <div className="border border-slate-200 bg-white transition-colors duration-300 hover:border-blue-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between gap-5 p-5 lg:p-6">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Committee {committee.number}
              </p>

              <h3 className="mt-1 text-base font-bold leading-6 tracking-tight text-slate-950 lg:text-lg">
                {committee.title}
              </h3>

              <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">
                {committee.description}
              </p>
            </div>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-slate-200 text-slate-500">
            <LuChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-5 lg:px-6">
          <div className="grid gap-6 tablet:grid-cols-2 xl:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600">
                {committee.chair.role}
              </p>

              <p className="mt-2 text-sm font-bold text-slate-950">
                {committee.chair.name}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {committee.chair.affiliation}
              </p>
            </div>

            {committee.coChairs.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600">
                  Co-Chairs
                </p>

                <div className="mt-2 space-y-4">
                  {committee.coChairs.map((member) => (
                    <div key={member.name}>
                      <p className="text-sm font-semibold text-slate-950">
                        {member.name}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {member.affiliation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {committee.members.length > 0 && (
              <div
                className={
                  committee.coChairs.length === 0
                    ? "tablet:col-span-1 xl:col-span-2"
                    : ""
                }
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600">
                  Members
                </p>

                <div className="mt-2 grid gap-x-6 tablet:grid-cols-2">
                  {committee.members.map((member) => (
                    <div key={member.name} className="py-2">
                      <p className="text-sm font-semibold text-slate-950">
                        {member.name}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {member.affiliation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CommitteesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Navbar />


      {/* =========================================================
          GOVERNANCE OVERVIEW
      ========================================================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Governance Structure
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                Built for
                <span className="text-blue-600"> collaboration.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              ICETIA 2027 operates through a structured committee system
              designed to support effective governance, academic quality,
              financial accountability, operational efficiency and successful
              conference delivery.
            </p>
          </div>

          <div className="mt-10 grid border-l border-t border-slate-200 tablet:grid-cols-2 xl:grid-cols-4">
            {governanceItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="group border-b border-r border-slate-200 p-5 transition-colors duration-300 hover:bg-[#07111f] lg:p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-9 w-9 items-center justify-center bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-slate-300 group-hover:text-slate-600">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600">
                    {item.label}
                  </p>

                  <h3 className="mt-2 text-base font-bold text-slate-900 transition-colors group-hover:text-white">
                    {item.value}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          STEERING COMMITTEE
      ========================================================= */}

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
              high-level guidance for ICETIA 2027.
            </p>
          </div>

          <div className="mt-10 grid border-l border-t border-slate-200 tablet:grid-cols-2 xl:grid-cols-3">
            {steeringCommittee.map((member, index) => (
              <div
                key={member.name}
                className="group border-b border-r border-slate-200 p-6 transition-colors duration-300 hover:bg-[#07111f] lg:min-h-64 lg:p-7 xl:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <LuCrown className="h-5 w-5" />
                  </div>

                  <span className="text-xs font-bold tracking-widest text-slate-300 group-hover:text-slate-600">
                    {String(index + 1).padStart(2, "0")}
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

      {/* =========================================================
          INTERNATIONAL ORGANISING COMMITTEE
      ========================================================= */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Conference Coordination
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                International
                <span className="text-blue-600"> Organising.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              The principal coordinating body responsible for the planning,
              administration and delivery of ICETIA 2027.
            </p>
          </div>

          <div className="mt-10 border-t border-slate-200 lg:mt-12">
            {internationalOrganisingCommittee.map(
              (member, index) => (
                <div
                  key={member.name}
                  className="group grid gap-5 border-b border-slate-200 py-6 lg:grid-cols-[80px_1fr_1fr] lg:items-center lg:gap-8 lg:py-7"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold tracking-widest text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center bg-white text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <FaUsers className="h-4 w-4" />
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
                    {member.affiliation}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECRETARIAT
      ========================================================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
            <div>
              <div className="flex h-11 w-11 items-center justify-center border border-slate-200 bg-slate-50 text-blue-600">
                <LuFileText className="h-5 w-5" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Administration
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                Conference
                <span className="text-blue-600"> Secretariat.</span>
              </h2>
            </div>

            <div className="border-t border-slate-200 pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="grid gap-6 tablet:grid-cols-2">
                {secretariat.map((member) => (
                  <MemberRow
                    key={`${member.role}-${member.name}`}
                    role={member.role}
                    name={member.name}
                    affiliation={member.affiliation}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SPECIALISED COMMITTEES
      ========================================================= */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Conference Operations
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                Specialised
                <span className="text-blue-600"> committees.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
              Each committee has an assigned operational responsibility,
              working collaboratively under the conference coordination
              structure.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:mt-12 tablet:grid-cols-2">
            {committees.map((committee) => (
              <CommitteeCard
                key={committee.number}
                committee={committee}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          COORDINATION
      ========================================================= */}

      <section className="border-b border-slate-200 bg-[#07111f] text-white">
        <div className="container mx-auto px-5 py-14 lg:px-8 lg:py-16 xl:px-10 xl:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <div className="flex h-11 w-11 items-center justify-center bg-blue-600 text-white">
                <LuShieldCheck className="h-5 w-5" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Committee Coordination
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                One structure.
                <span className="text-blue-400"> Shared responsibility.</span>
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
                All committees work collaboratively under the coordination
                of the Local Organising Committee. Committee chairs are
                expected to develop work plans, assign responsibilities,
                provide progress updates, maintain records and submit final
                reports following the conference.
              </p>

              <div className="mt-7 grid gap-3 tablet:grid-cols-2">
                {[
                  "Strategic direction",
                  "Academic quality",
                  "Operational delivery",
                  "Financial accountability",
                  "Stakeholder engagement",
                  "Conference reporting",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border border-white/10 px-4 py-3"
                  >
                    <LuCircleCheck className="h-4 w-4 shrink-0 text-blue-400" />

                    <span className="text-xs font-medium text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}