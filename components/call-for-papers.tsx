"use client";

import { Button } from "@/components/ui/button";
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
              All accepted and presented papers will be published in the EAI Community Research Series (EAI CORE), and will be submitted for indexing to CPCI, CNKI, EBSCO, Web of Science, Scopus, ProQuest, Google Scholar, CrossRef and European Union Digital Library (EUDL) can view and download the full-text PDFs of the proceeding papers.
            </p>


            <p>
              Authors have the opportunity to submit an extended version of their paper in the Proposed series to be published: Advances in Computer Science Research is 2352-538X, and the print ISSN of Advances in Computer Science Research is 2948-1961 and the website is <a href="https://www.atlantis-press.com/proceedings/series/acsr" target="_blank" rel="noopener noreferrer" className="text-blue-600 no-underline">https://www.atlantis-press.com/proceedings/series/acsr</a>
            </p>


            <p>
              About EUDL
              The European Union Digital Library (EUDL) is the central repository for all content published by European Alliance for Innovation (EAI). EUDL additionally indexes content published by different publishing partners (Springer, ACM, IEEE) in collaboration with EAI.
            </p>

            <p>
              <span className="block">EUDL includes:</span>

              <span>
                EAI Community Research Series (CORE) – EAI’s ICT-focused books and proceedings series
                EAI Computing and Communication in Emerging Regions (CCER) – EAI’s multidisciplinary proceedings series
                EAI Endorsed Transactions, a list of peer-reviewed, open access research journals
                Abstracts of EAI/Springer Lecture Notes of the Institute for Computer Sciences, Social Informatics and Telecommunications Engineering (LNICST)
                A complete index of proceedings from conferences held by EAI and ICST
                Each item in the digital library receives a unique Digital Object Identifier (DOI) via CrossRef, the world's largest inter-publisher cooperative project. The CrossRef system enables the cross-referencing and cross-citation of tens of millions of documents from more than 4300 participating societies and publishers.
              </span>
            </p>

            <p>
              Indexing
              Content hosted in EUDL is submitted for inclusion in multiple citation indexes and databases, with the number of indexing partners constantly growing.
            </p>

            Currently, our contents are indistinctly indexed in:

            DOAJ,
            DBLP,
            ProQuest,
            EBSCO,
            CNKI,
            Google Scholar,
            Scopus,
            Web of Science,
            Engineering Village (Compendex),
            ACM Digital Library,
            and many more.
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
          Papers should be submitted through the EAI <a href="#" className="no-underline text-blue-600">'Confy+'</a> system, and have to comply with the Springer format (see Author’s kit section).
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
          All conference papers undergo a thorough peer review process prior to the final decision and publication. This process is facilitated by experts in the Technical Program Committee during a dedicated conference period. Standard peer review is enhanced by EAI Community Review which allows EAI members to bid to review specific papers. All review assignments are ultimately decided by the responsible Technical Program Committee Members while the Technical Program Committee Chair is responsible for the final acceptance selection. You can learn more about Community Review <a href="https://help.eai-conferences.org/conference/community/community-review/" className="text-blue-900 hover:text-white">here</a>
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
          <span className="text-sm text-blue-500 font-semibold">How to Submit a Paper in Confy</span>
          <ol className="list-decimal list-inside space-y-2 leading-6 pt-2 text-white">
            <li>Go to <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600">Confy+</a> website</li>
            <li>Log in or sign up as a new user</li>
            <li>Select your desired track</li>
            <li>Click the "Submit Paper" link within the track and follow the instructions</li>
          </ol>
          <p className="mt-4 text-slate-300">Alternatively, go to the Confy+ homepage and click on “Open Conferences.”</p>
        </div>
        <span className="ml-1 text-sm text-blue-600">Submission Guidelines</span>
        {[
          "All papers must be submitted in English.",
          "Submitted PDFs must be original and unpublished research.",
          "Previously published work cannot be submitted, nor can it be concurrently submitted to any other conference or journal. These papers will be rejected without review.",
          "Papers must follow the Springer formatting guidelines (available in the Author's Kit section).",
          `Authors must read and agree to the ${<a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600">Publication Ethics and Malpractice Statement</a>}.`,
          "As per new EU accessibility requirements, going forward, all figures, illustrations, tables, and images should have descriptive text accompanying them. Please refer to the document below, which will assist you in crafting Alternative Text (Alt Text)",
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
        <p><a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-500">HOW TO WRITE GOOD ALT TEXT</a></p>
      </div>
    ),
  },
  {
    value: "springer-AI-policies-and-guidance",
    trigger: "Springer AI Policies and Guidance",
    content: (
      <div className="bg-white/3 border border-white/10 p-4 rounded-lg space-y-4">
        <p>
          <span>For full information, click <a href="https://www.springernature.com/gp/policies/book-publishing-policies" target="_blank" rel="noopener noreferrer" className="text-blue-600 no-underline">Here</a></span>
        </p>
        <div>
          <p className="font-semibold text-blue-600">AI Authorship Policy</p>
          <p>
            Large Language Models (LLMs), such as ChatGPT, do not currently satisfy our authorship criteria. Notably an attribution of authorship carries with it accountability for the work, which cannot be effectively applied to LLMs. We thus ask that the use of an LLM be properly documented in the Acknowledgements, or in the Introduction or Preface of the manuscript.
          </p>
          <p>
            The use of an LLM (or other AI-tool) for “AI assisted copy editing” purposes does not need to be declared. In this context, we define the term “AI assisted copy editing” as AI-assisted improvements to human-generated texts for readability and style, and to ensure that the texts are free of errors in grammar, spelling, punctuation and tone. These AI-assisted improvements may include wording and formatting changes to the texts, but do not include generative editorial work and autonomous content creation. In all cases, there must be human accountability for the final version of the text and agreement from the authors that the edits reflect their original work. This reflects a similar stance taken on the AI generative figures policy, where it was acknowledged that there are cases where AI can be used to generate a figure without being concerned about copyright e.g. to generate a graph based on data provided by the author.
          </p>
        </div>

        <div>
          <p className="font-semibold text-blue-600">AI Authorship Guidance</p>
          <p>
            Authors should familiarise themselves with the current known risks of using AI models before using them in their manuscript. AI models have been known to plagiarise content and to create false content. As such, authors should carry out due diligence to ensure that any AI-generated content in their book is correct, appropriately referenced, and follow the standards as laid out in our Book Authors' Code of Conduct.
          </p>
        </div>

        <div>
          <p className="font-semibold text-blue-600">AI-generated Images Policy</p>
          <p>
            The fast-moving area of generative AI image creation has resulted in novel legal copyright and research integrity issues. As publishers, we strictly follow existing copyright law and best practices regarding publication ethics. While legal issues relating to AI-generated images and videos remain broadly unresolved, Springer Nature journals and books are unable to permit its use for publication.
          </p>
        </div>

        <div>
          <span className="text-blue-600 font-semibold underline">Exceptions:</span>
          <ul className="mt-2 space-y-2 list-disc list-inside marker:text-blue-600">
            <li>
              Images/art obtained from agencies that we have contractual relationships with that have created images in a legally acceptable manner.
            </li>
            <li>
              Images and videos that are directly referenced in a piece that is specifically about AI and such cases will be reviewed on a case-by-case basis.
            </li>
            <li>
              The use of generative AI tools developed with specific sets of underlying scientific data that can be attributed, checked and verified for accuracy, provided that ethics, copyright and terms of use restrictions are adhered to.
            </li>
          </ul>
          <p className="mt-4 font-semibold">* All exceptions must be labelled clearly as generated by AI within the image field.</p>
        </div>

        <div>
          <p>
            As we expect things to develop rapidly in this field in the near future, we will review this policy regularly and adapt if necessary.
          </p>
          <p>
            Note: Examples of image types covered by this policy include: video and animation, including video stills; photography; illustration such as scientific diagrams, photo-illustrations and other collages, and editorial illustrations such as drawings, cartoons or other 2D or 3D visual representations. Not included in this policy are text-based and numerical display items, such as: tables, flow charts and other simple graphs that do not contain images. Please note that not all AI tools are generative. The use of non-generative machine learning tools to manipulate, combine or enhance existing images or figures should be disclosed in the relevant caption upon submission to allow a case-by-case review.
          </p>
        </div>

        <div>
          <p className="font-semibold text-blue-600">AI-generated Images Guidance</p>
          <p>
            For more information on the inclusion of third party content (i.e. any work that you have not created yourself and which you have reproduced or adapted from other sources) please see <a href="https://www.springernature.com/gp/partners/rights-permissions-third-party-distribution" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-600">Rights, Permissions, Third Party Distribution</a>.
          </p>
        </div>
      </div>
    ),
  },
  {
    value: "author-s-Kit---instructions-and-templates",
    trigger: "Author's Kit - Instructions and Templates",
    content: (
      <div className="space-y-4 bg-white/3 p-4 rounded-lg border border-white/10">
        <p>Papers must be formatted using the Springer LNICST Authors' Kit.</p>
        <div>
          <p>Instructions and templates are available from <a href="https://link.springer.com/series/558/information-for-authors-and-editors" target="_blank" rel="noopener noreferrer" className="text-blue-600">Springer's LNICST homepage</a>:</p>
          <ul className="space-y-2 list-disc list-inside marker:text-blue-600">
            <li><a href="/templates/EAI-Proceedings-LATEX-Template.zip"
            target="_blank" rel="noopener noreferrer"
            download="EAI-Proceedings-LATEX-Template.zip" className="text-blue-600">EAI-Proceedings-LATEX-Template(zip)</a></li>
            <li><a href="/templates/EAI-Proceedings-DOCX-Template.docx"
            target="_blank" rel="noopener noreferrer" className="text-blue-600">EAI-Proceedings-DOCX-Template</a></li>
          </ul>
          <p className="my-4">
            Please make sure that your paper adheres to the format as specified in the instructions and templates.
          </p>
        </div>
        <div>
          <p>When uploading the camera-ready copy of your paper, please be sure to upload both:</p>
          <ul className="space-y-2 list-disc list-inside marker:text-blue-600">
            <li>a PDF copy of your paper formatted according to the above templates, and</li>
            <li>an archive in .ZIP file, containing <span className="font-semibold">LaTeX or Word</span> source material prepared according to the above guidelines.</li>
          </ul>
        </div>
      </div>
    ),
  },
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
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-500"
              >
                Submit a Paper
                <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

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

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 text-sm font-semibold bg-blue-600 px-6 text-white hover:bg-blue-500"
              >
                Submit a Paper
                <LuArrowUpRight className="ml-1 h-4 w-4" />
              </a>


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