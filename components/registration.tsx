import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BsFileText } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { FaAward, FaRegCalendarCheck, FaUsers } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";
import { LuCoffee } from "react-icons/lu";
import { MdOutlineDisplaySettings, MdOutlineRecordVoiceOver } from "react-icons/md";
import { PiPresentationChartFill } from "react-icons/pi";

const categories = [
    {
        title: "Authors",
        price: "₦30,000",
        description:
            "Presenting authors with accepted papers.",
    },
    {
        title: "Co-Authors",
        price: "₦30,000",
        description:
            "Additional authors of accepted papers.",
    },
    {
        title: "Non-authors/Participants",
        price: "₦30,000",
        description:
            "Industry professionals and attendees.",
    },
    {
        title: "Students",
        price: "₦20,000",
        description:
            "Undergraduate and postgraduate students.",
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
                <div className="text-center">
                    <span className="uppercase tracking-wider text-blue-700 font-semibold">
                        Registration
                    </span>

                    <h2 className="mt-4 text-4xl font-bold">
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

                                <Button className="mt-8 w-full">
                                    Choose
                                </Button>
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