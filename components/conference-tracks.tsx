"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LuLayers3 } from "react-icons/lu";

const tracks = [
  {
    title: "Cybersecurity, Privacy & Digital Trust",
    topics: [
      "Cybersecurity and Information Assurance",
      "Network and Systems Security",
      "Cyber Threat Intelligence",
      "Intrusion Detection and Prevention Systems",
      "Malware Analysis",
      "Digital Forensics and Incident Response",
      "Cybercrime and Cyber Investigation",
      "Identity and Access Management",
      "Cryptography and Secure Communication",
      "Cloud Security",
      "Internet of Things Security",
      "Blockchain Security",
      "Privacy-enhancing Technologies",
      "Data Protection amd Digital Privacy",
      "Critical Infrastructure Protection",
      "Cyber Risk management",
      "Cyber Resilience",
      "Security Awareness and Human Factors",
      "Zero Trust Security Architectures",
      "Security of 5G, 6G and Future Communication Networks",
    ],
  },
  {
    title: "Artificial Intelligence and Machine Learning",
    topics: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Generative Artificial Intelligence",
      "Large Language Models",
      "Natural Language Processing",
      "Computer Vision",
      "Image and Video Processing",
      "Speech Recognitionand Language Technologies",
      "Explainable Artificial Intelligence",
      "Trustworthy and Responsible AI",
      "AI Ethics, Governance",
      "Reinforcement Learning",
      "Intelligent Decision-Support Systems",
      "Expert Systems",
      "AI-assited Automation",
      "AI for Education",
      "AI for Healthcare",
      "AI for Agriculture",
      "AI for Finance Services",
      "AI for Public Administration and Governance",
      
    ],
  },
  {
    title: "Smart Systems, Internet of Things and Embedded Computing",
    topics: [
      "Internet of Things",
      "Industrial Internet of Things",
      "Smart Cities",
      "Smart Communities",
      "Smart Homes",
      "Smart Campuses",
      "Smart Agriculture",
      "Smart Healthcare",
      "Smart Energy",
      "Intelligent Transportation Systems",
      "Wireless Sensor Networks",
      "Embedded Systems",
      "Cyber-Physical Systems",
      "Automation and Control Systems",
      "Robotics and Autonomous Systems",
      "Intelligent Sensing",
      "Environmental Monitoring",
      "Real-Time Systems",
      
    ],
  },
  {
    title: "Computing, Cloud, Edge and Distributed Systems",
    topics: [
      "Cloud Computing",
      "Edge and Fog Computing",
      "Distributed Systems",
      "Parallel Computing",
      "High-Performance Computing",
      "Mobile Computing",
      "Ubiquitos Computing",
      "Serveless Computing",
      "Virtualisation",
      "Microservices",
      "Computing Architecture",
      "Green Computing",
      "Energy-Efficient Computing",
      "Resilient Computing Infrastructure",
      "Quantum Computing",
      "Next-Generation Computing Systems"
    ],
  },
  {
    title: "Data Science, Analytics and Big Data",
    topics: [
      "Data Science",
      "Big Data Analytics",
      "Data Mining",
      "Predictive Analytics",
      "Business Intelligence",
      "Statistical Computing",
      "Data Visualization",
      "Knowledge Discovery",
      "Real-time Analytics",
      "Streaming Data Analysis",
      "Social Media Analytics",
      "Educational Analytics",
      "Financial Analytics",
      "Healthcare Analytics",
      "Geospatial Analytics",
      "Data Governance",
      "Data Quality",
      "Data Management",
      "Decision Intelligence"
    ],
  },
  {
    title: "Software Development",
    topics: [
      "Software Engineering",
      "Software Architecture",
      "Software Development Methodologies",
      "Agile Software Development",
      "DevOps",
      "Software Testing",
      "Software Quality Assurance",
      "Requirements Engineering",
      "Web Application Development",
      "Mobile Application Development",
      "Enterprise Systems",
      "Human-Computer Interaction",
      "User Experience Design",
      "Secure software Development",
      "Open-Source Software",
    ],
  },
  {
    title: "Health Informatics, Digtal Health and Medical Laboratory Technology",
    topics: [
      "Health Informatics",
      "Medical Informatics",
      "Digital Health Records",
      "Electronic Health Records",
      "Telemedicine and Telehealth",
      "Health Information Systems",
      "AI-assisted Clinical Decision Support",
      "Healthcare Data Analytics",
      "Medical Imaging and Image Analysis",
      "Public Health Informatics",
      "Mobile Health Applications",
      "Remote Patient Monitoring",
      "Biomedical Data Science",
      "Laboratory Information Management System",
      "Medical Laboratory Automation",
      "Digital Laboratory Technologies",
      "Biosensors and Intelligent Diagnostic Systems",
      "Laboratory Data Management",
      "Digital Transformation in Medical Laboratories",
      "Bioninformatics",
      "Emerging Technologies for Disease Surveillance and Diagnostics",
    ],
  },
  {
    title: "Emerging Technologies and Digital Transformation",
    topics: [
      "Blockchain Technologies",
      "Digital Transformation",
      "Financial Technology",
      "Educational Technology",
      "Health Technology",
      "Agrictural Technology",
      "Regulatory Technology",
      "Virtual and Augmented Reality",
      "Extended Reality",
      "Immersive Technologies",
      "Metaverse Applications",
      "Digital Twins",
      "5G and 6G Technologies",
      "Emerging Network Technologies",
      "Future Internet Technologies",
      "Digital identity",
      "Digital Economy",
      "Technology Entrepreneurship",
      "Innovation Management",
      "Start-up Ecosystems"
    ],
  },
  {
    title: "Computing for Sustainable Development",
    topics: [
      "ICT for Sustainable Development",
      "Green ICT",
      "Climate Informatics",
      "Environmental Monitoring",
      "Sustainable Smart Cities",
      "Renewable Energy Technologies",
      "Technology for Agriculture and Food Security",
      "Digital Inclusion",
      "Technology for Rural Development",
      "Technology for Community Development",
      "Digital Solutions for Developing Economies",
      "Technology for DIsaster Management",
      "Technology Applications within the Niger Delta",
      "Sustainable Digital Infrastructure",
    ],
  },
  {
    title: "Information Systems, Governance and Society",
    topics: [
      "Digital Governance",
      "E-Government",
      "Public-Sector Digital Transformation",
      "Technology Policy",
      "Digital Regulation",
      "Information Systems Governance",
      "Technology Adoption",
      "Digital Literacy",
      "Social Implications of Emerging Technologies",
      "Ethical and Legal Dimensions of Technology",
      "Technology and Society",
      "Responsible Innovation",
      "Digital Inclusion and Accessibility",
      "Gender and Technology",
      "Youth Participation in Technology",
    ],
  },
];

export default function ConferenceTracks() {
  return (
    <section
      id="tracks"
      className="border-b border-[#080f1a]/200"
    >
      <div className="container mx-auto px-5 py-4 lg:px-8 lg:py-6 xl:px-10 xl:py-10">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              <LuLayers3 className="h-4 w-4" />
              Conference Tracks
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl xl:text-5xl">
              Explore the research
              <span className="text-blue-600"> landscape.</span>
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
            ICETIA 2027 welcomes original research papers, review articles, case studies, technical reports, industry contributions, innovation demonstrations and interdisciplinary research across a broad range of emerging technology areas.
          </p>
        </div>

        {/* Track list */}
        <div className="mt-10 border-t border-slate-200 lg:mt-12">
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            {tracks.map((track, index) => (
              <AccordionItem
                value={track.title}
                key={track.title}
                className="border-b border-slate-200"
              >
                <AccordionTrigger className="group py-5 text-left hover:no-underline lg:py-6">
                  <div className="flex items-center gap-4 pr-4 lg:gap-6">
                    <span className="w-7 shrink-0 text-xs font-semibold tracking-wider text-slate-400 lg:w-10">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-base font-semibold text-white transition-colors group-hover:text-blue-600 lg:text-lg">
                      {track.title}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-7 pl-11 pr-4 lg:pl-16 lg:pr-12">
                  <div className="grid gap-x-8 gap-y-3 lg:grid-cols-2">
                    {track.topics.map((topic, topicIndex) => (
                      <div
                        key={`${track.title}-${topicIndex}`}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-400"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-xs leading-5 text-slate-500 lg:text-sm">
            Contributions may address theoretical research, applied studies,
            emerging technologies, practical implementations or
            interdisciplinary approaches.
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
            <span>09 Research Tracks</span>
            {/* <LuArrowDownRight className="h-4 w-4" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}