"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  FaUsers,
  FaMoneyBillWave,
  FaBookOpen,
  FaHotel,
  FaClipboardCheck,
  FaLaptop,
} from "react-icons/fa";
import {
  LuBriefcase,
  LuCalendarDays,
  LuCircleCheck,
  LuGraduationCap,
  LuMegaphone,
  LuPresentation,
  LuShieldCheck,
} from "react-icons/lu";
import { CommitteeCard } from "../page";

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
      href: "https://www.researchgate.net/profile/Idayana-Alabere-2",
      affiliation: "Federal University Otuoke, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair & Treasurer",
        name: "Dr Belinda Onyeashie",
        href: "https://www.linkedin.com/in/dr-belinda-onyeashie-b709a398/",
        affiliation:
          "University of the West of England, United Kingdom",
      },
    ],
    members: [
      {
        name: "Dr. Boye Aziboledia Frederick",
        href: "https://www.linkedin.com/in/boye-aziboledia-frederick-a00a02297/",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Dr Ibenate Arubere",
        href: "https://www.linkedin.com/in/dr-ibenate-arubere-998459bb/",
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
      href: "https://www.researchgate.net/profile/Oluwaseun-Bamgboye",
      affiliation: "Edinburgh Napier University, United Kingdom",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Professor Victor Ekong",
        href: "https://www.linkedin.com/in/victor-ekong-6b2b0227b/",
        affiliation: "University of Uyo, Nigeria",
      },
      {
        role: "Co-Chair",
        name: "Professor Abayomi Jegede",
        href: "https://www.linkedin.com/in/abayomi-jegede-46131671/",
        affiliation: "Edo State University Iyamho, Nigeria",
      },
    ],
    members: [
      {
        name: "Associate Prof. Godwin A. Thomas",
        href: "https://scholar.google.com/citations?user=xrLJ2IQAAAAJ&hl=en",
        affiliation: "University of Jos, Nigeria",
      },
      {
        name: "Dr Belinda Onyeashie",
        href: "https://www.linkedin.com/in/dr-belinda-onyeashie-b709a398/",
        affiliation:
          "University of the West of England, United Kingdom",
      },
      {
        name: "Alams Mammuan",
        href: "https://www.researchgate.net/profile/Mammuan-Alams",
        affiliation: "Cranfield University, United Kingdom",
      },
      {
        name: "Dr Fekumo Bolouembeledo",
        href: "https://scholar.google.com/citations?hl=en&user=q8PraKkAAAAJ",
        affiliation: "University of South Africa, Pretoria",
      },
      {
        name: "Faisal A. Garba",
        href: "https://www.linkedin.com/in/2faisalgama/",
        affiliation:
          "Sa'adatu Rimi College of Education, Nigeria",
      },
      {
        name: "Dr. Ikiomoye Douglas Emmanuel",
        href: "https://www.linkedin.com/in/ikiomoye-douglas-emmanuel/",
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
      href: "https://www.linkedin.com/in/c-itp-evans-porbeni-mcpn-mncs-a5ba3287/",
      affiliation:
        "University of Africa Toru-Orua, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Dr. Nwankwe Dimie",
        href: "https://scholar.google.com/citations?hl=en&user=qTHTr6cAAAAJ",
        affiliation: "Rivers State University, Nigeria",
      },
    ],
    members: [
      {
        name: "Godslight Thomas Sese",
        href: "https://www.researchgate.net/profile/Godslight-Sese",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Eleje Chinwendu Best",
        href: "https://www.researchgate.net/profile/Chinwendu-Best-Eleje",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Ogolo-Christian Wisdom Amafurotubo",
        href: "https://www.linkedin.com/in/wisdom-ogolo-christian-906b1a168/",
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
      href: "https://www.linkedin.com/in/goodhead-tomvie-abraham-b7738a2b/",
      affiliation: "Niger Delta University, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Faisal A. Garba",
        href: "https://www.linkedin.com/in/2faisalgama/",
        affiliation:
          "Sa'adatu Rimi College of Education, Nigeria",
      },
      {
        role: "Co-Chair",
        name: "Dr Fekumo Bolouembeledo",
        href: "https://scholar.google.com/citations?hl=en&user=q8PraKkAAAAJ",
        affiliation: "University of South Africa, Pretoria",
      },
      {
        role: "Co-Chair",
        name: "Dr. Ikiomoye Douglas Emmanuel",
        href: "https://www.linkedin.com/in/ikiomoye-douglas-emmanuel/",
        affiliation: "UGM Manchester, United Kingdom",
      },
      {
        role: "Co-Chair",
        name: "Alams Mammuan",
        href: "https://www.researchgate.net/profile/Mammuan-Alams",
        affiliation: "Cranfield University, United Kingdom",
      },
    ],
    members: [
      {
        name: "Ogolo-Christian Wisdom Amafurotubo",
        href: "https://www.linkedin.com/in/wisdom-ogolo-christian-906b1a168/",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Dr. Loveth Eguma Nwabrije",
        href: "https://www.linkedin.com/in/loveth-nwabrije-27a3041b5/",
        affiliation:
          "Federal College of Education, Omoku, Nigeria",
      },
      {
        name: "Dr Belinda Onyeashie",
        href: "https://www.linkedin.com/in/dr-belinda-onyeashie-b709a398/",
        affiliation:
          "University of the West of England, United Kingdom",
      },
      {
        name: "Godslight Thomas Sese",
        href: "https://www.researchgate.net/profile/Godslight-Sese",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "T.K. Waidor",
        href: "https://scholar.google.com/citations?user=acGWEc8AAAAJ&hl=en",
        affiliation: "University of Africa, Nigeria",
      },
      {
        name: "Dr. Thompson Saghanen",
        href: "https://caarnjournals.com/ijmter/author/saghanen-thomson-b",
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
      href: "https://www.linkedin.com/in/victor-ekong-6b2b0227b/",
      affiliation: "University of Uyo, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Professor Abayomi Jegede",
        href: "https://www.linkedin.com/in/abayomi-jegede-46131671/",
        affiliation: "Edo State University Iyamho, Nigeria",
      },
      {
        role: "Co-Chair",
        name: "Dr. Biralatei James Fawei",
        href: "https://scholar.google.com/citations?hl=en&user=gYtsfx4AAAAJ",
        affiliation: "Niger Delta University, Nigeria",
      },
      {
        role: "Co-Chair",
        name: "Dr. Ikiomoye Douglas Emmanuel",
        href: "https://www.linkedin.com/in/ikiomoye-douglas-emmanuel/",
        affiliation: "UGM Manchester, United Kingdom",
      },
    ],
    members: [
      {
        name: "Dr. Oluwaseun Bamgboye",
        href: "https://www.researchgate.net/profile/Oluwaseun-Bamgboye",
        affiliation: "Edinburgh Napier University, United Kingdom",
      },
      {
        name: "Dr. Boye Aziboledia Frederick",
        href: "https://www.linkedin.com/in/boye-aziboledia-frederick-a00a02297/",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Dr Goodhead Tomvie Abraham",
        href: "https://www.linkedin.com/in/goodhead-tomvie-abraham-b7738a2b/",
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
      href: "https://scholar.google.com/citations?user=7THfnLAAAAAJ&hl=en&authuser=3",
      affiliation: "Federal University Otuoke, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Dr. Stella Attah",
        href: "",
        affiliation:
          "Federal College of Education, Omuku, Nigeria",
      },
    ],
    members: [
      {
        name: "Godslight Thomas Sese",
        href: "https://www.researchgate.net/profile/Godslight-Sese",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Banigo Azibator",
        href: "https://www.researchgate.net/profile/Banigo-Azibator",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Dr. (Mrs) Loveth Eguma Nwabrije",
        href: "https://www.linkedin.com/in/loveth-nwabrije-27a3041b5/",
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
      href: "https://www.researchgate.net/profile/Samuel-Ikirigo",
      affiliation:
        "Federal University of Agriculture, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Dr. Ominini Monima Abiye-suku",
        href: "https://www.researchgate.net/profile/Ominini-Abiye-Suku",
        affiliation: "Rivers State University, Nigeria",
      },
    ],
    members: [
      {
        name: "Asotekari Angel Jumbo",
        href: "https://www.researchgate.net/scientific-contributions/Asotekari-Angel-Jombo-2339097255",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Nataram Adumo",
        href: "https://www.researchgate.net/profile/Nataram-Odumo",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Dr. Fortune Baribesia Deedam",
        href: "https://scholar.google.com/citations?hl=en&user=eS71SOQAAAAJ",
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
      href: "https://www.linkedin.com/in/abayomi-jegede-46131671/",
      affiliation: "Edo State University Iyamho, Nigeria",
    },
    coChairs: [
      {
        role: "Co-Chair",
        name: "Associate Prof. Godwin A. Thomas",
        href: "https://scholar.google.com/citations?user=xrLJ2IQAAAAJ&hl=en",
        affiliation: "University of Jos, Nigeria",
      },
      {
        role: "Co-Chair",
        name: "Dr. Biralatei James Fawei",
        href: "https://scholar.google.com/citations?hl=en&user=gYtsfx4AAAAJ",
        affiliation: "Niger Delta University, Nigeria",
      },
    ],
    members: [
      {
        name: "Dr. Samuel Apigi Ikirigo",
        href: "https://www.researchgate.net/profile/Samuel-Ikirigo",
        affiliation:
          "Federal University of Agriculture, Nigeria",
      },
      {
        name: "Dr. Thompson Saghanen",
        href: "https://caarnjournals.com/ijmter/author/saghanen-thomson-b",
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
      href: "https://www.linkedin.com/in/collins-onyegbado-67109119b/",
      affiliation: "Federal University Otuoke, Nigeria",
    },
    coChairs: [],
    members: [
      {
        name: "Banigo Azibator",
        href: "https://www.researchgate.net/profile/Banigo-Azibator",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Ogolo-Christian Wisdom Amafurotubo",
        href: "https://www.linkedin.com/in/wisdom-ogolo-christian-906b1a168/",
        affiliation: "Federal University Otuoke, Nigeria",
      },
      {
        name: "Ikegwuonu-vic Uzoamaka Hope",
        href: "",
        affiliation: "Federal University Otuoke, Nigeria",
      },
    ],
  },
];

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
    </section>
  );
}