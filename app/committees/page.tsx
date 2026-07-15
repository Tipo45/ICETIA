

import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaUsers } from "react-icons/fa";
import { LuBriefcase, LuCoffee, LuCrown, LuGraduationCap } from "react-icons/lu";
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
        <div>
            <Navbar />

            {/* Hero */}

            <section className="bg-blue-700 py-28 text-white">

                <div className="container mx-auto px-6 text-center">

                    <span className="uppercase tracking-[0.3em] text-blue-200">
                        CASCADE 2026
                    </span>

                    <h1 className="mt-6 text-5xl font-bold">
                        Conference Committees
                    </h1>

                    <p className="mt-6 max-w-3xl mx-auto text-blue-100 leading-8">
                        CASCADE 2026 is guided by distinguished academics,
                        researchers and professionals dedicated to ensuring
                        the successful planning and delivery of the conference.
                    </p>

                </div>

            </section>

            {/* Steering Committee */}

            <section className="py-24">

                <div className="container mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Steering Committee
                        </h2>

                        <p className="mt-4 text-muted-foreground">
                            Providing strategic leadership and oversight.
                        </p>

                    </div>

                    <div className="grid gap-8 grid-cols-2 mt-16">

                        {steeringCommittee.map((member) => (

                            <Card
                                key={member.name}
                                className="hover:shadow-xl transition-all"
                            >
                                <CardContent className="p-8">

                                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">

                                        <LuCrown className="text-blue-700 text-2xl" />

                                    </div>

                                    <h3 className="mt-6 text-xl font-bold">
                                        {member.name}
                                    </h3>

                                    <p className="mt-2 font-semibold text-blue-700">
                                        {member.role}
                                    </p>

                                    <p className="mt-3 text-muted-foreground">
                                        {member.affiliation}
                                    </p>

                                </CardContent>

                            </Card>

                        ))}

                    </div>

                </div>

            </section>

            {/* Organising Committee */}

            <section className="py-24 bg-slate-50">

                <div className="container mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Organizing Committee
                        </h2>

                    </div>

                    <div className="grid gap-8 grid-cols-2 xl:grid-cols-4 mt-16">

                        {organisingCommittee.map((member) => (

                            <Card key={member.role}>

                                <CardContent className="p-8 flex gap-5">

                                    <div className="rounded-full bg-blue-100 p-4 h-fit">

                                        <member.icon className="text-2xl text-blue-700" />

                                    </div>

                                    <div>

                                        <p className="font-semibold text-blue-700">
                                            {member.role}
                                        </p>

                                        <h3 className="mt-2 text-xl font-bold">
                                            {member.name}
                                        </h3>

                                        <p className="mt-2 text-muted-foreground">
                                            {member.affiliation}
                                        </p>

                                    </div>

                                </CardContent>

                            </Card>

                        ))}

                    </div>

                </div>

            </section>

            {/* Other Committee Positions */}

            <section className="py-24">

                <div className="container mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Other Committee Positions
                        </h2>

                        <p className="mt-4 text-muted-foreground">
                            Additional committee appointments will be announced.
                        </p>

                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mt-16">

                        {otherCommittees.map((item) => (

                            <Card
                                key={item.title}
                                className="hover:border-blue-700 transition-all"
                            >

                                <CardContent className="p-8 text-center">

                                    <item.icon className="mx-auto text-2xl text-blue-700" />

                                    <h3 className="mt-6 font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm text-muted-foreground">
                                        To Be Announced
                                    </p>

                                </CardContent>

                            </Card>

                        ))}

                    </div>

                </div>

            </section>

            {/* Technical Program Committee */}

            <section className="py-24 bg-slate-50">

                <div className="container mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Technical Program Committee Members
                        </h2>

                        <p className="mt-4 text-muted-foreground">
                            Committee members will be announced soon.
                        </p>

                    </div>

                    <div className="mt-16 rounded-2xl border border-dashed p-16 text-center">

                        <LuGraduationCap className="mx-auto text-2xl text-blue-700" />

                        <h3 className="mt-6 text-2xl font-bold">
                            Coming Soon
                        </h3>

                        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                            The full list of Technical Program Committee members
                            will be published after confirmations from participating
                            institutions and partner organizations.
                        </p>

                    </div>

                </div>

            </section>

            <Footer />
        </div>
    );
}