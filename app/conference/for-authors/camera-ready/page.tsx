import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import PublicationHeader from "@/components/publicationheader";
import { FaUsers } from "react-icons/fa";
import { LuCalendarDays, LuCheck, LuFileText } from "react-icons/lu";

const requirements = [
    "At least one author must complete the registration process before the camera-ready paper can be submitted.",
    "One registration covers one accepted paper.",
    "Any author of the accepted paper may submit the camera-ready version once the registration requirement has been fulfilled.",
    "Every author or co-author who wishes to attend the conference in person must register separately.",
    "At least one full registration is required for each accepted paper.",
    "Authors must complete the required payment before submitting the camera-ready version.",
];

const registrationSteps = [
    {
        number: "01",
        title: "Complete your registration",
        content:
            "At least one author of the accepted paper must complete the conference registration and payment process before the camera-ready submission becomes available.",
    },
    {
        number: "02",
        title: "Access the submission system",
        content:
            "Log in to the ICETIA 2027 paper submission system using the account associated with your accepted paper.",
    },
    {
        number: "03",
        title: "Locate your accepted paper",
        content:
            "From your submission dashboard, locate the accepted paper for which you want to submit the camera-ready version.",
    },
    {
        number: "04",
        title: "Upload the camera-ready version",
        content:
            "Select the camera-ready submission option, upload the final version of your paper and any required supplementary files, then complete the submission process.",
    },
];

const cameraReadyFiles = [
    "A final PDF version of the accepted paper.",
    "The editable source files, where required by the conference publication guidelines.",
    "Any additional files or documents specifically requested by the conference organizers.",
];

export default function CameraReadyPapers() {
    return (
        <section className="bg-[#080f1a]">
            <div className="sticky top-0 z-50">
                <PublicationHeader />
                <Navbar />
            </div>

            <main>
                {/* Hero */}
                <div className="border-b border-white/10 bg-[#07111f] text-white">
                    <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">
                        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                                    <FaUsers className="h-4 w-4" />
                                    ICETIA 2027
                                </div>

                                <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                                    Camera-Ready
                                    <span className="text-blue-400">
                                        {" "}
                                        Submission
                                    </span>
                                </h1>
                            </div>

                            <div>
                                <p className="max-w-2xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
                                    Guidelines and instructions for authors of
                                    accepted papers preparing and submitting
                                    their final camera-ready manuscripts for
                                    ICETIA 2027.
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
                </div>

                {/* Important Requirements */}
                <section className="border-b border-white/10 bg-[#080f1a]">
                    <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-7 bg-blue-500" />

                                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-500">
                                    Before You Submit
                                </span>
                            </div>

                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                Important camera-ready
                                <span className="text-blue-500">
                                    {" "}
                                    requirements.
                                </span>
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-slate-500">
                                Authors of accepted papers should ensure that
                                the following requirements are fulfilled before
                                attempting to submit the camera-ready version.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
                            {requirements.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 bg-[#080f1a] p-6"
                                >
                                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                                        <LuCheck className="h-4 w-4 text-blue-400" />
                                    </div>

                                    <p className="text-sm leading-6 text-slate-400">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Registration Process */}
                <section className="border-b border-white/10 bg-[#07111f]">
                    <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-7 bg-blue-500" />

                                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-500">
                                    Submission Process
                                </span>
                            </div>

                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                How to submit your
                                <span className="text-blue-500">
                                    {" "}
                                    camera-ready paper.
                                </span>
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-slate-500">
                                Follow the steps below to prepare and submit
                                the final version of your accepted paper.
                            </p>
                        </div>

                        <div className="mt-10 border-y border-white/10">
                            {registrationSteps.map((step, index) => (
                                <div
                                    key={step.number}
                                    className={`grid gap-6 py-8 lg:grid-cols-[100px_240px_1fr] lg:items-start ${index !== registrationSteps.length - 1
                                        ? "border-b border-white/10"
                                        : ""
                                        }`}
                                >
                                    <div>
                                        <span className="text-3xl font-bold text-blue-500/40">
                                            {step.number}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-semibold text-white">
                                        {step.title}
                                    </h3>

                                    <p className="max-w-2xl text-sm leading-7 text-slate-500">
                                        {step.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Upload Section */}
                <section className="border-b border-white/10 bg-[#080f1a]">
                    <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
                        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                            <div>
                                <div className="flex h-12 w-12 items-center justify-center bg-blue-500/10 text-blue-400">
                                    <LuFileText className="h-5 w-5" />
                                </div>

                                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                                    Camera-ready
                                    <span className="text-blue-500">
                                        {" "}
                                        files.
                                    </span>
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-slate-500">
                                    Please ensure that your final submission
                                    contains all files required by the ICETIA
                                    2027 publication guidelines.
                                </p>
                            </div>

                            <div className="border border-white/10 bg-[#07111f]">
                                {cameraReadyFiles.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 border-b border-white/10 p-6 last:border-b-0"
                                    >
                                        <LuCheck className="mt-1 h-4 w-4 shrink-0 text-blue-400" />

                                        <p className="text-sm leading-6 text-slate-400">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Author Kit */}
                <section className="border-b border-white/10 bg-[#07111f]">
                    <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
                        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="h-px w-7 bg-blue-500" />

                                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-500">
                                        Author&apos;s Kit
                                    </span>
                                </div>

                                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                                    Formatting and
                                    <span className="text-blue-500">
                                        {" "}
                                        templates.
                                    </span>
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-slate-500">
                                    Your camera-ready manuscript should follow
                                    the official formatting requirements and
                                    template provided by the ICETIA 2027
                                    organizing committee.
                                </p>
                            </div>

                            <div className="border border-white/10 bg-[#080f1a] p-7 lg:p-9">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                                    Author&apos;s Kit
                                </p>

                                <p className="mt-4 text-sm leading-7 text-slate-500">
                                    The official paper template, formatting
                                    instructions and publication guidelines
                                    will be made available here once finalized
                                    by the conference organizers.
                                </p>

                                <div className="mt-6">
                                    <span className="inline-flex border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs font-medium text-blue-400">
                                        Templates coming soon
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final Notice */}
                <section className="bg-[#080f1a]">
                    <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
                        <div className="border border-blue-500/20 bg-blue-500/5 p-7 lg:p-9">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-400">
                                Important Notice
                            </p>

                            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">
                                Authors are advised to carefully review their
                                final manuscript before submission. Once the
                                camera-ready deadline has passed, changes to
                                the submitted paper may no longer be accepted.
                                Please ensure that all author names,
                                affiliations, figures, references and other
                                publication details are accurate before
                                completing your submission.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <PublicationFooter />
            <Footer />
        </section>
    );
}