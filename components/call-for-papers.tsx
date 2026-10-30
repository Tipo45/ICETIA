"use client";

import { useRouter } from "next/navigation";
import {
  LuArrowDownRight,
  LuArrowUpRight,
  LuCalendarDays,
  LuCheck,
  LuDot,
  LuFileText,
  LuUsers,
} from "react-icons/lu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ConferenceTracks from "./conference-tracks";


const dates = [
  {
    title: "Call for Papers Opens",
    date: "13 October 2026",
  },
  {
    title: "Full Paper Submission Deadline",
    date: "15 February 2027",
  },
  {
    title: "Notification of Acceptance",
    date: "15 March 2027",
  },
  {
    title: "Camera-Ready Paper Submission Deadline",
    date: "25 March 2027",
  },
  {
    title: "Conference Dates",
    date: "28 – 30 April 2027",
  },
];

const items = [
  {
    value: "scope",
    trigger: "Scope",
    content: (
      <div className="space-y-4 text-md leading-7 bg-white/3 text-white p-4 rounded-lg border border-white/10">
        <p>
          The EAI ICETIA 2027 International Conference on Emerging Technologies, Innovations and Applications is a multidisciplinary international conference focused on the development, application and responsible use of emerging technologies for sustainable digital transformation, innovation and societal development. The conference welcomes original theoretical, experimental, applied and interdisciplinary research in areas including Artificial Intelligence and Machine Learning, Cybersecurity, Privacy and Digital Trust, Internet of Things and Smart Systems, Data Science and Big Data Analytics, Cloud, Edge and Distributed Computing, Software Engineering and Digital Applications, Blockchain and Distributed Ledger Technologies, 5G/6G and emerging communication systems, robotics, autonomous systems, immersive technologies and quantum computing.
        </p>
        <p>
          The scope also includes Health Informatics, Digital Health, Medical Laboratory Technology Applications, green and sustainable computing, technology-enabled solutions for education, agriculture, finance, governance and public services, as well as digital transformation, FinTech, EdTech, technology entrepreneurship, responsible innovation, ethics, policy and the wider societal impact of emerging technologies.</p>
        <p>Overall, ICETIA 2027 provides a platform for high-quality research that connects emerging technologies with practical applications, industry needs, policy development and sustainable societal impact across computing, engineering, health sciences, business and related disciplines.</p>
      </div>
    ),
  },
  {
    value: "publication",
    trigger: "Publication",
    content: (
      <div className="">
        <div className="rounded-lg border border-white/10 bg-white/3 p-4">
          <div className="text-sm text-white leading-7">

            <p>
              Selected, accepted and presented papers from ICETIA 2027 will be considered for publication through the conference's approved international proceedings partners, subject to successful peer review, revision, similarity screening, presentation and compliance with publisher requirements.
            </p>


            <p>
              <span className="block">
                EAI Community Research Series – CORE
              </span>

              ICETIA 2027 has established a publication arrangement with the European Alliance for Innovation (EAI) for proceedings publication in the EAI Community Research Series (CORE).
            </p>


            <p>
              Published papers will be available through the European Union Digital Library (EUDL) and are covered by major scholarly discovery services including CrossRef, CNKI, EBSCO and Google Scholar. Eligible proceedings may also be submitted for evaluation by Scopus, Ei Compendex, Web of Science/CPCI, ProQuest and other indexing services, subject to their independent assessment.
            </p>

            <p>
              <span className="block">Atlantis Press – Advances in Computer Science Research</span>

              <span>
                ACSR is discoverable through services including CNKI, Dimensions, EBSCO Discovery Service, INSPEC, Google Scholar, OCLC WorldCat, ProQuest-ExLibris Primo, ProQuest-ExLibris Summon, TD Net and Wanfang Data, with DOIs registered through CrossRef. Selected proceedings volumes may also be submitted for evaluation in CPCI/Web of Science.
              </span>
            </p>

            <p>
              <span className="block">
                Important Notice
              </span>
              All papers will undergo a rigorous double-blind peer-review process. Acceptance for presentation does not automatically guarantee publication. Final publication is subject to academic quality, originality, successful revision, presentation and the requirements of the relevant publisher.
            </p>

            <p>
              Indexing in selective databases such as Scopus, Web of Science, CPCI and Ei Compendex is determined independently by the respective indexing services and cannot be guaranteed by ICETIA 2027.
            </p>

            <p>
              <span className="block">Publication Pathway</span>
              <span className="block">
                ICETIA 2027 has established publication arrangements with two international proceedings publishers:
              </span>
              <span className="block">EAI Community Research Series (CORE)</span><span className="block">Atlantis Press – Advances in Computer Science Research (ACSR), part of Springer Nature</span>
            </p>
            <p>Following peer review and final acceptance, eligible papers will be assigned to the most appropriate publication outlet by the ICETIA 2027 Publications and Editorial Committee, taking into account the paper's subject area, academic quality, publisher scope, formatting requirements and applicable publication conditions.
            </p>
            <p>Each accepted paper will be published in only one proceedings series. Authors will be formally informed of the publication outlet assigned to their paper before the final camera-ready submission stage.</p>
            <p>All papers must successfully complete the conference's double-blind peer-review process, required revisions, similarity and plagiarism screening, author registration and presentation requirements before being considered for final publication.</p>
            <p>Similarity and plagiarism checks will be conducted using recognised publisher-provided or approved systems such as iThenticate, where applicable, alongside appropriate editorial review to assess originality and research integrity.</p>
            <p>Final publication remains subject to the editorial, technical and publication requirements of the respective publisher.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "paper-length",
    trigger: "Paper Length",
    content: (
      <div className="space-y-4 text-sm leading-7 text-white border p-4 bg-white/3 rounded-lg border-white/10">
        <p>
          Full research papers should follow the official ICETIA 2027 formatting template and submission requirements.
        </p>

        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">

          <div className="space-y-2">
            <p className="leading-6 text-slate-200">
              <span className="border-slate-500 rounded-full text-xl" /><span>Full/Regular papers shoul be <span className="font-bold">12-20</span> pages in length. (Excluding appendices, references, appreciation, etc.)</span>
            </p>
            <p className="leading-6 text-slate-200">
              <span className="border-slate-500 rounded-full text-xl" /><span>Short papers should be <span className="font-bold">6-11</span> pages in length. (Excluding appendices, references, appreciation, etc.)</span>
            </p>
          </div>
          <p className="text-xs leading-6 text-slate-400 pt-2">
            *Please note that additional pages will be subject to an extra charge for each extra page uploaded.
          </p>
        </div>

        <p className="text-xs leading-6 text-white">
          Authors should ensure that manuscripts comply with the official template before submission
        </p>
      </div>
    ),
  },
  {
    value: "submission-guidelines",
    trigger: "Submission Guidelines",
    content: (
      <div className="space-y-4 bg-white/3 p-4 rounded-lg border border-white/10">
        <div>
          <span className="text-sm text-blue-500 font-semibold">How to Submit a Paper</span>
          <ol className="list-decimal list-inside space-y-2 leading-6 pt-2 text-white">
            <li>Login to your account</li>
            <li>Select your desired track</li>
            <li>Click the "Upload Paper" and follow the instructions</li>
          </ol>
        </div>
        <span className="ml-1 text-sm text-blue-600">Submission Guidelines</span>
        {[
          "All papers must be submitted in English.",
          "Submitted PDFs must be original and unpublished research.",
          "Manuscripts should follow the official ICETIA 2027 formatting template",
          "All authors and institutional affiliations must be correctly stated.",
          "References and citations should follow the required formatting style.",
          "Authors should ensure that their submission meets the conference's academic and ethical requirements.",
          "Any AI-assisted content must comply with the final ICETIA 2027 responsible AI guidelines.",
          "Accepted authors will be expected to revise and submit a camera-ready version before the stated deadline.",
          "Authors of accepted papers will be expected to present their work at ICETIA 2027",
        ].map((guideline) => (
          <div
            key={guideline}
            className="flex items-start gap-3"
          >
            <LuDot className="mt-1 h-4 w-4 shrink-0 text-blue-400" />

            <span className="text-xs leading-6 text-slate-100">
              {guideline}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  // {
  //   value: "springer-AI-policies-and-guidance",
  //   trigger: "Springer AI Policies and Guidance",
  //   content: (
  //     <div className="bg-white/3 border border-white/10 p-4 rounded-lg space-y-4">
  //       <p>
  //         <span>For full information, click <a href="https://www.springernature.com/gp/policies/book-publishing-policies" target="_blank" rel="noopener noreferrer" className="text-blue-600 no-underline">Here</a></span>
  //       </p>
  //       <div>
  //         <p className="font-semibold text-blue-600">AI Authorship Policy</p>
  //         <p>
  //           Large Language Models (LLMs), such as ChatGPT, do not currently satisfy our authorship criteria. Notably an attribution of authorship carries with it accountability for the work, which cannot be effectively applied to LLMs. We thus ask that the use of an LLM be properly documented in the Acknowledgements, or in the Introduction or Preface of the manuscript.
  //         </p>
  //         <p>
  //           The use of an LLM (or other AI-tool) for “AI assisted copy editing” purposes does not need to be declared. In this context, we define the term “AI assisted copy editing” as AI-assisted improvements to human-generated texts for readability and style, and to ensure that the texts are free of errors in grammar, spelling, punctuation and tone. These AI-assisted improvements may include wording and formatting changes to the texts, but do not include generative editorial work and autonomous content creation. In all cases, there must be human accountability for the final version of the text and agreement from the authors that the edits reflect their original work. This reflects a similar stance taken on the AI generative figures policy, where it was acknowledged that there are cases where AI can be used to generate a figure without being concerned about copyright e.g. to generate a graph based on data provided by the author.
  //         </p>
  //       </div>

  //       <div>
  //         <p className="font-semibold text-blue-600">AI Authorship Guidance</p>
  //         <p>
  //           Authors should familiarise themselves with the current known risks of using AI models before using them in their manuscript. AI models have been known to plagiarise content and to create false content. As such, authors should carry out due diligence to ensure that any AI-generated content in their book is correct, appropriately referenced, and follow the standards as laid out in our Book Authors' Code of Conduct.
  //         </p>
  //       </div>

  //       <div>
  //         <p className="font-semibold text-blue-600">AI-generated Images Policy</p>
  //         <p>
  //           The fast-moving area of generative AI image creation has resulted in novel legal copyright and research integrity issues. As publishers, we strictly follow existing copyright law and best practices regarding publication ethics. While legal issues relating to AI-generated images and videos remain broadly unresolved, Springer Nature journals and books are unable to permit its use for publication.
  //         </p>
  //       </div>

  //       <div>
  //         <span className="text-blue-600 font-semibold underline">Exceptions:</span>
  //         <ul className="mt-2 space-y-2 list-disc list-inside marker:text-blue-600">
  //           <li>
  //             Images/art obtained from agencies that we have contractual relationships with that have created images in a legally acceptable manner.
  //           </li>
  //           <li>
  //             Images and videos that are directly referenced in a piece that is specifically about AI and such cases will be reviewed on a case-by-case basis.
  //           </li>
  //           <li>
  //             The use of generative AI tools developed with specific sets of underlying scientific data that can be attributed, checked and verified for accuracy, provided that ethics, copyright and terms of use restrictions are adhered to.
  //           </li>
  //         </ul>
  //         <p className="mt-4 font-semibold">* All exceptions must be labelled clearly as generated by AI within the image field.</p>
  //       </div>

  //       <div>
  //         <p>
  //           As we expect things to develop rapidly in this field in the near future, we will review this policy regularly and adapt if necessary.
  //         </p>
  //         <p>
  //           Note: Examples of image types covered by this policy include: video and animation, including video stills; photography; illustration such as scientific diagrams, photo-illustrations and other collages, and editorial illustrations such as drawings, cartoons or other 2D or 3D visual representations. Not included in this policy are text-based and numerical display items, such as: tables, flow charts and other simple graphs that do not contain images. Please note that not all AI tools are generative. The use of non-generative machine learning tools to manipulate, combine or enhance existing images or figures should be disclosed in the relevant caption upon submission to allow a case-by-case review.
  //         </p>
  //       </div>

  //       <div>
  //         <p className="font-semibold text-blue-600">AI-generated Images Guidance</p>
  //         <p>
  //           For more information on the inclusion of third party content (i.e. any work that you have not created yourself and which you have reproduced or adapted from other sources) please see <a href="https://www.springernature.com/gp/partners/rights-permissions-third-party-distribution" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-600">Rights, Permissions, Third Party Distribution</a>.
  //         </p>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   value: "author-s-Kit---instructions-and-templates",
  //   trigger: "Author's Kit - Instructions and Templates",
  //   content: (
  //     <div className="space-y-4 bg-white/3 p-4 rounded-lg border border-white/10">
  //       <p>Papers must be formatted using the Springer LNICST Authors' Kit.</p>
  //       <div>
  //         <p>Instructions and templates are available from <a href="https://link.springer.com/series/558/information-for-authors-and-editors" target="_blank" rel="noopener noreferrer" className="text-blue-600">Springer's LNICST homepage</a>:</p>
  //         <ul className="space-y-2 list-disc list-inside marker:text-blue-600">
  //           <li><a href="/templates/EAI-Proceedings-LATEX-Template.zip"
  //           target="_blank" rel="noopener noreferrer"
  //           download="EAI-Proceedings-LATEX-Template.zip" className="text-blue-600">EAI-Proceedings-LATEX-Template(zip)</a></li>
  //           <li><a href="/templates/EAI-Proceedings-DOCX-Template.docx"
  //           target="_blank" rel="noopener noreferrer" className="text-blue-600">EAI-Proceedings-DOCX-Template</a></li>
  //         </ul>
  //         <p className="my-4">
  //           Please make sure that your paper adheres to the format as specified in the instructions and templates.
  //         </p>
  //       </div>
  //       <div>
  //         <p>When uploading the camera-ready copy of your paper, please be sure to upload both:</p>
  //         <ul className="space-y-2 list-disc list-inside marker:text-blue-600">
  //           <li>a PDF copy of your paper formatted according to the above templates, and</li>
  //           <li>an archive in .ZIP file, containing <span className="font-semibold">LaTeX or Word</span> source material prepared according to the above guidelines.</li>
  //         </ul>
  //       </div>
  //     </div>
  //   ),
  // },
];

export default function CallForPapers() {
  const router = useRouter();

  const handleCFPButton = () => {
    router.push("/registration/authors-registration");
  };

  return (
    <section
      id="cfp"
      className="border-b border-white bg-slate-950 text-white"
    >
      <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-20 xl:px-10 xl:py-24">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-16">
          {/* Main content */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-blue-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Call For Papers
              </span>
            </div>

            <h2 className="mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
              Submit your research.
              <br />
              <span className="text-blue-400">
                Shape what comes next.
              </span>
            </h2>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-400 lg:text-base lg:leading-8">
              ICETIA 2027 invites researchers, academics, practitioners,
              innovators and industry experts to submit original and
              unpublished research papers that contribute to advancing
              emerging technologies, innovations and applications for
              sustainable digital transformation.
            </p>

            <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
              {/* <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-500"
              >
                Submit a Paper
                <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a> */}

              <a
                href="/registration"
                className="group inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-transparent px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/5"
              >
                Register for ICETIA 2027
                <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <span className="text-xs leading-5 text-slate-500 lg:ml-1">
                Registered and accepted authors will be invited to present.
              </span>
            </div>
          </div>

          {/* Conference information */}
          <div className="border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Submission
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-blue-400">
                  <LuFileText className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Original Research
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Original theoretical, empirical, applied and
                    interdisciplinary research.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-blue-400">
                  <LuUsers className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Researchers & Practitioners
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Open to academia, industry and technology professionals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-blue-400">
                  <LuCalendarDays className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    ICETIA 2027
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    28 – 30 April, 2027 · Federal University Otuoke
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-y border-slate-200 bg-slate-50 mt-10">
          <div className="container mx-auto px-5 py-12 lg:px-8 lg:py-16 xl:px-10 xl:py-20">
            {/* Header */}
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  <LuCalendarDays className="h-4 w-4" />
                  Paper Submission
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
                  Important
                  <span className="text-blue-600"> dates.</span>
                </h2>
              </div>


            </div>

            {/* Timeline grid */}
            <div className="mt-10 grid border-t border-slate-200 lg:mt-12 lg:grid-cols-2">
              {dates.map((item, index) => (
                <div
                  key={item.title}
                  className={`group border-b border-slate-200 py-6 lg:px-6 lg:py-7 ${index % 2 === 0
                    ? "lg:border-r lg:pl-0"
                    : "lg:pr-0"
                    }`}
                >
                  <div className="flex gap-5">
                    {/* Number */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-bold text-slate-500 transition-colors group-hover:border-blue-500 group-hover:text-blue-600">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                        {item.date}
                      </p>

                      <h3 className="mt-2 text-base font-semibold leading-6 text-slate-900 lg:text-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Notice */}
            <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-3xl text-xs leading-5 text-slate-500 lg:text-sm">
                These dates are provisional and may be updated following
                approval by the Conference Organising Committee.
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                <span>ICETIA 2027</span>
                <LuArrowDownRight className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ConferenceTracks />
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#0b1626]">
          <Accordion
            type="single"
            collapsible
            defaultValue="scope"
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


        {/* =========================================================
            SUBMISSION CTA
        ========================================================= */}
        <div className="mt-14 border-t border-white/10 pt-8 lg:mt-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


            <div className="flex flex-col gap-3 tablet:flex-row">

              {/* <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 text-sm font-semibold bg-blue-600 px-6 text-white hover:bg-blue-500"
              >
                Submit a Paper
                <LuArrowUpRight className="ml-1 h-4 w-4" />
              </a> */}


              {/* Replace href with your actual template URL */}
              <a
                href="/program/accepted-papers"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                View Accepted Papers
                <LuArrowDownRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM STRIP
        ========================================================= */}
        <div className="mt-12 border-t border-white/10 pt-6 lg:mt-14">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Emerging Technologies · Innovations · Applications
            </p>

            <p className="text-xs text-slate-600">
              International Conference · Maiden Edition
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}