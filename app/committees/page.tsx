"use client";

import {
  FaMoneyBillWave,
  FaBookOpen,
  FaHotel,
  FaClipboardCheck,
  FaLaptop,
} from "react-icons/fa";
import {
  LuBriefcase,
  LuChevronDown,
  LuGraduationCap,
  LuMegaphone,
  LuPresentation,
} from "react-icons/lu";
import { useState } from "react";


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

export function MemberRow({
  role,
  name,
  href,
  affiliation,
}: {
  role?: string;
  name: string;
  href: string;
  affiliation: string;
}) {
  return (
    <div className="border-b border-slate-200 py-5 last:border-b-0">
      {role && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600">
          {role}
        </p>
      )}

      <a href={href} className="mt-1 text-sm font-semibold leading-6 text-slate-900 hover:text-blue-600">
        {name}
      </a>

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

              <a href={committee.chair.href} className="mt-2 text-sm font-bold text-slate-950 hover:text-blue-500">
                {committee.chair.name}
              </a>

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
                      <a href={member.href} className="text-sm font-semibold text-slate-950 hover:text-blue-500">
                        {member.name}
                      </a>

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
                      <a href={member.href} className="text-sm font-semibold text-slate-950 hover:text-blue-600">
                        {member.name}
                      </a>

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
    <></>
  );
}