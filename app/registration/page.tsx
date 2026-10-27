import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import PublicationHeader from "@/components/publicationheader";
import Link from "next/link";
import { CiCircleCheck } from "react-icons/ci";
import { FaAward, FaRegCalendarCheck, FaUsers } from "react-icons/fa";
import {
  IoIosInformationCircleOutline,
  IoMdBook,
} from "react-icons/io";
import { LuArrowUpRight, LuCoffee } from "react-icons/lu";
import {
  MdOutlineDisplaySettings,
  MdOutlineRecordVoiceOver,
} from "react-icons/md";
import { PiPresentationChartFill } from "react-icons/pi";

const categories = [
  {
    number: "01",
    title: "Authors",
    price: "₦40,000",
    earlyBirdPrice: "₦35,000",
    description:
      "For authors of accepted papers who will participate in and present at the conference.",
    href: "/registration/authors-registration",
  },
  {
    number: "02",
    title: "Participants",
    price: "₦40,000",
    earlyBirdPrice: "₦35,000",
    description:
      "For researchers, academics, industry professionals, policymakers and other conference participants.",
    href: "/registration/participants-registration",
  },
  {
    number: "03",
    title: "Students",
    price: "₦30,000",
    earlyBirdPrice: "₦25,000",
    description:
      "For undergraduate and postgraduate students participating in ICETIA 2027.",
    href: "/registration/students-registration",
  },
];

const benefits = [
  {
    icon: FaAward,
    text: "Certificate of participation or presentation",
  },
  {
    icon: FaUsers,
    text: "Networking with academics, researchers, industry professionals and policymakers",
  },
  {
    icon: IoMdBook,
    text: "Conference proceedings and digital materials",
  },
  {
    icon: MdOutlineRecordVoiceOver,
    text: "Access to keynote and plenary sessions",
  },
  {
    icon: PiPresentationChartFill,
    text: "Access to technical paper presentation sessions",
  },
  {
    icon: FaRegCalendarCheck,
    text: "Conference programme and materials",
  },
  {
    icon: LuCoffee,
    text: "Refreshments and conference meals, where applicable",
  },
  {
    icon: MdOutlineDisplaySettings,
    text: "Access to exhibitions, innovation showcases and partner sessions",
  },
];

export default function RegistrationCategories() {
  return (
    <section
      className="border-b border-slate-200 bg-white"
    >
      <div className="sticky top-0 z-50">
        <PublicationHeader />
        <Navbar />
      </div>
      <div className="container mx-auto px-5 py-4 lg:px-8 lg:py-6 xl:px-10 xl:py-10">

        {/* Header */}
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Registration
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
              Join the
              <span className="text-blue-600"> conference.</span>
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-sm leading-7 text-slate-600 lg:text-base lg:leading-8">
              All authors, co-authors, participants, presenters, students,
              industry representatives and invited guests are required to
              register for ICETIA 2027.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Registration provides access to conference sessions, keynote
              presentations, technical papers, panel discussions, workshops,
              conference materials and other approved activities.
            </p>
          </div>
        </div>

        {/* Important notice */}
        <div className="mt-8 flex items-start gap-3 border border-amber-200 bg-amber-50 px-5 py-4 lg:mt-10">
          <IoIosInformationCircleOutline className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

          <p className="text-xs leading-6 text-amber-800 lg:text-sm">
            <span className="font-semibold">Important:</span>{" "}
            At least one author of each accepted paper must complete
            registration within the specified deadline for the paper to be
            included in the final conference programme and considered for
            presentation and publication in the conference proceedings.
          </p>
        </div>

        {/* Registration categories */}
        <div className="mt-12 lg:mt-14">
          <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Registration Categories
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
                Choose your participation
              </h3>
            </div>

            <p className="text-sm text-slate-500">
              Select the category that best matches your role.
            </p>
          </div>

          <div className="grid border-l border-slate-200 lg:grid-cols-3">
            {categories.map((item) => (
              <div
                key={item.title}
                className="group border-b border-r border-slate-200 p-6 lg:min-h-70 lg:p-7 xl:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-slate-400">
                    {item.number}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-blue-500 opacity-60 transition-opacity group-hover:opacity-100" />
                </div>

                <h4 className="mt-8 max-w-xs text-xl font-bold tracking-tight text-slate-950 lg:text-2xl">
                  {item.title}
                </h4>

                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                <div className="mt-7 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Registration Fee
                    </p>

                    <div className="mt-1 flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-blue-600">
                        {item.earlyBirdPrice}
                      </p>

                      <span className="text-xs text-slate-400 line-through">
                        {item.price}
                      </span>
                    </div>

                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-600">
                      Early Bird
                    </p>
                  </div>

                  <Link
                    href={item.href}
                    className="group/link flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                    aria-label={`Choose ${item.title}`}
                  >
                    <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mt-10 w-full overflow-x-auto">
            <table className="w-full min-w-225 border-collapse border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-4 text-left font-semibold text-slate-900">
                    Participation
                  </th>

                  <th className="border border-slate-200 px-4 py-4 text-center font-semibold text-slate-900">
                    Early Bird Author
                    <br />
                    (30 November, 2026)
                  </th>

                  <th className="border border-slate-200 px-4 py-4 text-center font-semibold text-slate-900">
                    Early Bird Participant
                    <br />
                    (30 November, 2026)
                  </th>

                  <th className="border border-slate-200 px-4 py-4 text-center font-semibold text-slate-900">
                    Early Bird Student
                    <br />
                    (30 November, 2026)
                  </th>

                  <th className="border border-slate-200 px-4 py-4 text-center font-semibold text-slate-900">
                    Late Fee Author
                    <br />
                    (1 December, 2026)
                  </th>

                  <th className="border border-slate-200 px-4 py-4 text-center font-semibold text-slate-900">
                    Late Participant
                    <br />
                    (1 December, 2026)
                  </th>

                  <th className="border border-slate-200 px-4 py-4 text-center font-semibold text-slate-900">
                    Late Fee Student
                    <br />
                    (1 December, 2026)
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="transition-colors hover:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-4 font-semibold text-slate-800">
                    Physical
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    ₦ 35,000
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    ₦ 25,000
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    ₦ 20,000
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    ₦ 40,000
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    ₦ 30,000
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    ₦ 25,000
                  </td>
                </tr>

                <tr className="bg-slate-50 transition-colors hover:bg-slate-100">
                  <td className="border border-slate-200 px-4 py-4 font-semibold text-slate-800">
                    Online
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    ₦ 35,000
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    ₦ 25,000
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-400">
                    ₦ —
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    ₦ 40,000
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    ₦ 30,000
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-400">
                    ₦ -
                  </td>
                </tr>

                <tr className="transition-colors hover:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-4 font-semibold text-slate-800">
                    International
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    $ 95
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    $ -
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    $ -
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    $ 100
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    $ -
                  </td>

                  <td className="border border-slate-200 px-4 py-4 text-center text-slate-600">
                    $ -
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* What's included */}
        <div className="mt-12 border-t border-slate-200 pt-10 lg:mt-14 lg:pt-12">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <CiCircleCheck className="h-6 w-6" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                What's Included
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
                Your registration
                <br />
                comes with access.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
                Registered participants will be entitled to the following
                conference experiences and materials.
              </p>
            </div>

            <div className="grid border-t border-slate-200 lg:grid-cols-2 lg:border-l lg:border-t-0">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={index}
                    className={`flex items-start gap-3 border-b border-slate-200 p-4 lg:p-5 ${index % 2 === 0
                      ? "lg:border-r"
                      : ""
                      }`}
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                    <span className="text-sm leading-6 text-slate-600">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Refund & Cancellation Notice */}
        <div className="mt-10 border border-slate-200 bg-slate-50 p-6 lg:mt-12 lg:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <IoIosInformationCircleOutline className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Refund & Cancellation
                </p>

                <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-950">
                  Please review the refund policy before payment.
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  Approved registration refunds are subject to a 10% processing fee.
                  Participants are encouraged to review the full ICETIA 2027 Refund &
                  Cancellation Policy before completing registration and payment.
                </p>
              </div>
            </div>

            <Link
              href="/registration/refund-policy"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600"
            >
              View refund policy
              <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-slate-500">
            Have questions about registration?
          </p>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
          >
            Contact the conference team
            <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      <PublicationFooter />
      <Footer />
    </section>
  );
}