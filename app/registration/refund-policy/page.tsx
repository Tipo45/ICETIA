import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
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
        price: "₦55,000",
        description: "For presenting authors with accepted papers.",
        href: "/registration/authors-registration",
    },
    {
        number: "02",
        title: "Participants",
        price: "₦40,000",
        description: "For industry professionals and conference attendees.",
        href: "/registration/participants-registration",
    },
    {
        number: "03",
        title: "Students",
        price: "₦30,000",
        description: "For undergraduate and postgraduate students.",
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
        <section>
            <div className="sticky top-0 z-50">
                <PublicationHeader />
                <Navbar />
            </div>
            <main
                id="registration"
                className="border-b border-slate-200 bg-[#061426]"
            >
                <div className="container mx-auto px-5 py-4 lg:px-8 lg:py-6 xl:px-10 xl:py-10">

                    {/* Header */}
                    <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                        <div>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-400 lg:text-4xl xl:text-5xl">
                                Refund <span className="text-blue-600">Policy.</span>
                            </h2>
                        </div>
                    </div>
                </div>

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

                    </div>
                </div>
            </main>
            <Footer />
        </section>
    );
}