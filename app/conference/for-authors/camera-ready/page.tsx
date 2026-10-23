import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import PublicationHeader from "@/components/publicationheader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaUsers } from "react-icons/fa";
import { LuCalendarDays, LuDot } from "react-icons/lu";


const items = [
    {
        value: "step-1",
        trigger: "Step 1: Complete the Registration Process",
        content: (
            <div className="space-y-4 text-md leading-7 bg-white/3 text-white p-4 rounded-lg border border-white/10">
            </div>
        ),
    },
    {
        value: "step-2",
        trigger: "Step 2: Log in to Confy+",
        content: (
            <div className="rounded-lg border border-white/10 bg-white/3 p-4">
                <div className="text-sm text-white leading-7">
                    <p>Confy+ <a href="https://confyplus.eai.eu/" target="_blank" rel="noopener noreferrer" className="text-blue-600">Click Here</a> to login</p>
                </div>
            </div>
        ),
    },
    {
        value: "step-3",
        trigger: "Step 3: Submit Camera-ready",
        content: (
            <div className="space-y-4 text-sm leading-7 text-white border p-4 bg-white/3 rounded-lg border-white/10">
            </div>
        ),
    },
    {
        value: "step-4",
        trigger: "Step 4: To make changes or re-upload your Camera-ready submission",
        content: (
            <div className="space-y-4 bg-white/3 p-4 rounded-lg border border-white/10">
            </div>
        ),
    },
    {
        value: "author-s-Kit---instructions-and-templates",
        trigger: "Author's Kit - Instructions and Templates",
        content: (
            <div className="space-y-4 bg-white/3 p-4 rounded-lg border border-white/10 text-white">
                <p>Papers must be formatted using the Springer LNICST Authors' Kit.</p>
                <div>
                    <p>Instructions and templates are available from <a href="https://link.springer.com/series/558/information-for-authors-and-editors" target="_blank" rel="noopener noreferrer" className="text-blue-600">Springer's LNICST homepage</a>:</p>
                    <ul className="space-y-2 list-disc list-inside marker:text-blue-600">
                        <li><a href="/templates/EAI-Proceedings-LATEX-Template.zip"
                            target="_blank" rel="noopener noreferrer"
                            download="EAI-Proceedings-LATEX-Template.zip" className="text-blue-600">EAI-Proceedings-LATEX-Template(zip)</a></li>
                        <li><a href="/templates/EAI-Proceedings-DOCX-Template.docx"
                            target="_blank" rel="noopener noreferrer" className="text-blue-600">EAI-Proceedings-DOCX-Template</a></li>
                        <li><a href="https://bigiot-edu.eai-conferences.org/2025/wp-content/uploads/sites/948/2024/11/How-to-Write-Good-Alt-Text.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600">HOW TO WRITE GOOD ALT TEXT (pdf)</a></li>
                    </ul>
                    <p className="my-4">
                        Please make sure that your paper adheres to the format as specified in the instructions and templates.
                    </p>
                </div>
                <div>
                    <p>When uploading the camera-ready copy of your paper, please be sure to upload both:</p>
                    <ul className="space-y-2 list-disc list-inside marker:text-blue-600">
                        <li>a PDF copy of your paper formatted according to the above templates, and</li>
                        <li>an archive file (e.g. zip, tar.gz) containing the both a PDF copy of your paper and LaTeX or Word source material prepared according to the above guidelines.</li>
                    </ul>
                </div>
            </div>
        ),
    },
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
                                        Submission (Confy+)
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

                {/* Upload Section */}
                <section className="border-b border-white/10 bg-[#07111f]">
                    <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
                        <div className="mx-auto max-w-5xl">
                            {/* Section heading */}
                            <div className="mb-8 border-l-4 border-[#00D1FF] pl-5">
                                <h2 className="text-xl font-bold leading-snug text-white lg:text-2xl">
                                    Uploading the Camera-ready Version in Confy+
                                </h2>

                                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                                    Please review the following registration requirements
                                    before uploading your final paper.
                                </p>
                            </div>

                            {/* Requirements */}
                            <ul className="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
                                <li className="flex gap-4 p-5">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#008BFF]/15 text-sm font-bold text-[#00D1FF]">
                                        01
                                    </span>

                                    <p className="text-sm leading-7 text-slate-300">
                                        At least one author must complete the registration process before they are given access to upload the Camera-ready version of their paper.
                                    </p>
                                </li>

                                <li className="mx-5 border-t border-white/10" />

                                <li className="flex gap-4 p-5">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#008BFF]/15 text-sm font-bold text-[#00D1FF]">
                                        02
                                    </span>

                                    <p className="text-sm leading-7 text-slate-300">
                                        One author registration covers 1 paper. The camera-ready upload may be performed by any of the paper’s authors if at least one of them has registered with the full registration fee.
                                    </p>
                                </li>

                                <li className="mx-5 border-t border-white/10" />

                                <li className="flex gap-4 p-5">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#008BFF]/15 text-sm font-bold text-[#00D1FF]">
                                        03
                                    </span>

                                    <p className="text-sm leading-7 text-slate-300">
                                        At least one full registration is required to upload a Camera-ready version.
                                    </p>
                                </li>

                                <li className="mx-5 border-t border-white/10" />

                                <li className="flex gap-4 p-5">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#008BFF]/15 text-sm font-bold text-[#00D1FF]">
                                        04
                                    </span>

                                    <p className="text-sm leading-7 text-slate-300">
                                        Refunds and invoice amendments are subject to a
                                        processing fee.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Registration Process */}
                <section className="border-b border-white/10 bg-[#080f1a]">
                    <div className="container mx-auto px-5 py-16 lg:px-8 lg:py-20 xl:px-10">
                        <div className="mx-auto max-w-5xl">
                            {/* Section heading */}
                            <div className="mb-8 border-l-4 border-[#00D1FF] pl-5">
                                <h2 className="text-xl font-bold leading-snug text-white lg:text-2xl">
                                    Registration process Steps:
                                </h2>

                                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                                    Please adhere to these steps
                                    before uploading your final paper.
                                </p>
                            </div>
                            <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#0b1626]">
                                <Accordion
                                    type="single"
                                    collapsible
                                    defaultValue="step-1"
                                    className="w-full"
                                >
                                    {items.map((item) => (
                                        <AccordionItem
                                            key={item.value}
                                            value={item.value}
                                            className="border-b border-white/10 last:border-b-0 px-6 lg:px-8"
                                        >
                                            <AccordionTrigger className="py-6 text-left text-sm font-semibold text-white hover:no-underline">
                                                {item.trigger}
                                            </AccordionTrigger>

                                            <AccordionContent className="pb-7">
                                                <div className="">
                                                    {item.content}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <PublicationFooter />

            <Footer />
        </section>
    );
}