import { FaAward, FaRegCalendarCheck, FaUsers } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";
import { LuCoffee } from "react-icons/lu";
import { MdOutlineDisplaySettings, MdOutlineRecordVoiceOver } from "react-icons/md";
import { PiPresentationChartFill } from "react-icons/pi";
import { Card, CardContent } from "@/components/ui/card";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegCreditCard } from "react-icons/fa";
import { FiUserCheck, FiUsers, FiFileText, FiCoffee } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineEventNote, MdOutlineVerified } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { RiSecurePaymentLine } from "react-icons/ri";

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



export default function RegistrationSection() {

    const paymentValue = 30000;

    return (
        <section className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
                        <MdOutlineEventNote className="w-4 h-4" />
                        Registration Portal
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Co-Authors <span className="text-blue-700">Registration</span>
                    </h1>
                    {/* <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        Co-Authors whose papers have been accepted must complete registration
                        before the camera-ready deadline.
                    </p> */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-2">
                            <BsClockHistory className="w-4 h-4 text-amber-600" />
                            Deadline: <span className="font-semibold text-amber-700">TBA</span>
                        </span>
                        <span className="hidden lg:inline text-slate-300">|</span>
                        <span className="flex items-center gap-2">
                            <MdOutlineVerified className="w-4 h-4 text-green-600" />
                            Status: <span className="font-semibold text-green-700">Open</span>
                        </span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">

                    <div className="">
                        <div className="rounded-3xl border-2 border-slate-200/60 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                            <div className="p-6 lg:p-10">
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-100 rounded-xl">
                                            <FiUserCheck className="w-6 h-6 text-blue-700" />
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">
                                            Registration Information
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground ml-12 :ml-14">
                                        Complete the form below to begin your conference registration.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-6 mt-8">
                                    <div className="space-y-2">
                                        <label className="text-sm">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="w-full h-12 border placeholder:text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter last name"
                                            className="w-full h-12 border placeholder:text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter email address"
                                            className="w-full h-12 border placeholder:text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        />
                                    </div>

<div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">
                                            Amount <span className="text-slate-400">(NGN)</span>
                                        </label>
                                        <div className="flex items-center border-2 border-slate-200 rounded-xl bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
                                            <span className="flex items-center justify-center w-12 h-12 bg-slate-100 text-slate-600 font-bold border-r border-slate-200">
                                                ₦
                                            </span>
                                            <input
                                                type="text"
                                                value={paymentValue.toLocaleString()}
                                                disabled
                                                className="flex-1 h-12 px-3 bg-transparent text-slate-900 font-medium cursor-not-allowed outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl w-full text-base text-white font-semibold shadow-lg hover:shadow-blue-200/50 transition-all duration-300 cursor-pointer">
                                            <span>Make Payment</span>
                                            <RiSecurePaymentLine className="text-xl" />
                                        </button>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>

                    
                        <Card className="sticky top-24 rounded-3xl border-2 border-blue-200/60 shadow-xl bg-linear-to-br from-white to-blue-50/30 overflow-hidden">
                            <CardContent className="p-6">
                                <div className="text-center">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                                        <FiUserCheck className="w-3 h-3" />
                                        Co-Authors Package
                                    </div>
                                    <p className="text-sm text-muted-foreground">Registration Fee</p>
                                    <p className="text-5xl lg:text-6xl font-bold text-blue-700 mt-1">
                                        {paymentValue.toLocaleString()}
                                    </p>
                                    <div className="mt-2 h-px bg-linear-to-r from-transparent via-blue-200 to-transparent"></div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <p className="text-sm font-semibold text-slate-700 mb-3">What's Included:</p>
                                    {benefits.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
                                            <CiCircleCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-sm text-slate-700">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    

                </div>

                {/* Important Information Section */}
                <div className="container mx-auto px-6 mt-16">
                    <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-red-100/60 rounded-3xl overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-100 rounded-2xl shrink-0">
                                    <IoIosInformationCircleOutline className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        Important: Co-Authors Registration
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                                        Co-authors who wish to attend the conference, participate in sessions, receive conference materials or obtain certificates are required to complete registration. Co-authors may also present accepted papers where authorised by the corresponding author and approved by the conference organising committee.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment & General Info Grid */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-2 border-blue-100/60 hover:shadow-xl transition-shadow duration-300 rounded-3xl overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-blue-100 rounded-2xl">
                                    <FaRegCreditCard className="w-6 h-6 text-blue-700" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">Payment & Confirmation</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                All registration payments must be completed through the official conference payment portal.
                                Confirmation of registration will be sent via email upon successful payment.
                                Please ensure you keep a copy of your payment receipt for reference.
                            </p>
                            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                                <p className="text-sm text-blue-800">
                                    <span className="font-semibold">🎯 Early Bird Registration:</span> Register before TBA to enjoy special rates.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-green-100/60 hover:shadow-xl transition-shadow duration-300 rounded-3xl overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-green-100 rounded-2xl">
                                    <IoIosInformationCircleOutline className="w-6 h-6 text-green-700" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">What's Included</h4>
                            </div>
                            <div className="space-y-3">
                                <h5 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                                    <FiUserCheck className="w-4 h-4 text-blue-600" />
                                    Technical Session Registration Fee Includes:
                                </h5>
                                <ul className="space-y-2">
                                    {[
                                        "Participation in all technical sessions of the conference program",
                                        "Inclusion of a paper in the conference proceedings (Authors only)",
                                        "All meals during the course of the conference",
                                        "Conference accessories",
                                        "Conference Soft Proceedings"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CiCircleCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer CTA */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500">
                        Have questions about registration?{" "}
                        <a href="/contact" className="text-blue-600 hover:underline font-medium hover:text-blue-800 transition-colors">
                            Contact our support team
                        </a>
                    </p>
                </div>
            </div>

            <Footer />
        </section>
    );
}