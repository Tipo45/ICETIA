import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { it } from "node:test";
import { BsFileText } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { FaAward, FaRegCalendarCheck, FaUsers } from "react-icons/fa";
import { IoIosInformationCircleOutline, IoMdBook } from "react-icons/io";
import { LuCoffee } from "react-icons/lu";
import { MdOutlineDisplaySettings, MdOutlineRecordVoiceOver } from "react-icons/md";
import { PiPresentationChartFill } from "react-icons/pi";

const categories = [
    {
        title: "Authors",
        price: "₦30,000",
        description:
            "Presenting authors with accepted papers.",
        href: "/registration/authors-registration"
    },
    {
        title: "Co-Authors",
        price: "₦30,000",
        description:
            "Additional authors of accepted papers.",
        href: "/registration/co-authors-registration"
    },
    {
        title: "Non-authors/Participants",
        price: "₦30,000",
        description:
            "Industry professionals and attendees.",
        href: "/registration/non-authors-registration"
    },
    {
        title: "Students",
        price: "₦20,000",
        description:
            "Undergraduate and postgraduate students.",
        href: "/registration/students-registration"
    },
];

const benefits = [
    { icon: FaAward, text: "Certificate of participation or presentation" },
    { icon: FaUsers, text: "Networking opportunities with academics, researchers, industry professionals and policymakers" },
    { icon: IoMdBook, text: "Conference proceedings and digital materials" },
    { icon: MdOutlineRecordVoiceOver, text: "Access to keynote and plenary sessions" },
    { icon: PiPresentationChartFill, text: "Access to technical paper presentation sessions" },
    { icon: FaRegCalendarCheck, text: "Conference programme and materials" },
    { icon: LuCoffee, text: "Refreshments and conference meals, where applicable" },
    { icon: MdOutlineDisplaySettings, text: "Access to exhibitions, innovation showcases and partner sessions" },
];

export default function RegistrationCategories() {
    return (
        <section
            id="registration"
            className="py-24 bg-slate-50"
        >
            <div className="container mx-auto px-6">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wider uppercase">
                        Registration
                    </span>
                    <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                        Conference Registration
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                        All authors, co-authors, non-authors, presenters, participants, postgraduate students,
                        undergraduate students, industry representatives and invited guests are required to register
                        for the First International Conference on Emerging Technologies, Innovation and Applications (ICETIA 2026).
                    </p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Registration will provide access to the conference sessions, keynote presentations, technical paper presentations,
                        panel discussions, workshops, conference materials and other approved conference activities.
                    </p>
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                        <IoIosInformationCircleOutline className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800">
                            <span className="font-semibold">Important:</span> At least one author of each accepted paper must complete
                            registration within the specified deadline for the paper to be included in the final conference programme and
                            considered for presentation and publication in the conference proceedings.
                        </p>
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="mt-4 text-2xl font-bold">
                        Registration Categories
                    </h2>

                    <p className="mt-4 text-muted-foreground">
                        Choose the category that best matches your participation.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-2 xl:grid-cols-4 gap-8">
                    {categories.map((item) => (
                        <Card
                            key={item.title}
                            className="hover:shadow-xl transition"
                        >
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold">
                                    {item.title}
                                </h3>

                                <div className="mt-4 text-3xl font-bold text-blue-700">
                                    {item.price}
                                </div>

                                <p className="mt-4 text-muted-foreground">
                                    {item.description}
                                </p>

                                <button className="bg-black text-white mt-12 w-full px-2 py-3 rounded-xl">
                                    <Link href={item.href}>
                                        Choose Category
                                    </Link>
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
                    <div className="p-6 lg:p-8 xl:p-10">
                        <div className="flex items-start gap-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                                <CiCircleCheck className="w-6 h-6 text-blue-700" />
                            </div>
                            <div>
                                <p className="text-base sm:text-lg font-semibold text-slate-900">
                                    What's Included?
                                </p>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Registered participants will be entitled to the following:
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 mt-10">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors group"
                                >
                                    <benefit.icon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-slate-700 leading-relaxed">
                                        {benefit.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        Have questions about registration? <a href="#" className="text-blue-600 hover:underline font-medium">Contact us</a>
                    </p>
                </div>
            </div>
        </section>
    );
}