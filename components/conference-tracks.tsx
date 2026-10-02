"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LuArrowDownRight, LuLayers3 } from "react-icons/lu";

const tracks = [
  {
    title: "Cybersecurity, Privacy & Digital Trust",
    topics: [
      "Cybersecurity and Information Assurance",
      "Network Security and Intrusion Detection Systems",
      "Cyber Threat Intelligence and Risk Management",
      "Digital Forensics and Incident Response",
      "Malware Analysis and Cybercrime Investigation",
      "Cryptography and Secure Communication",
      "Blockchain Security and Distributed Ledger Technologies",
      "Cloud Security, Edge Security and IoT Security",
      "Privacy-Preserving Technologies and Data Protection",
      "Identity Management and Access Control",
      "Critical Infrastructure Protection",
      "Cybersecurity Governance, Policy and Compliance",
      "Cyber Resilience and Security Awareness",
      "Security in 5G, 6G and Future Communication Networks",
    ],
  },
  {
    title: "Artificial Intelligence & Intelligent Systems",
    topics: [
      "Artificial Intelligence Theory, Methods and Applications",
      "Machine Learning and Deep Learning",
      "Generative AI and Large Language Models",
      "Natural Language Processing and Speech Technologies",
      "Computer Vision and Speech Technologies",
      "Intelligent Decision Support Systems",
      "Expert Systems and Knowledge-Based Systems",
      "Reinforcement Learning and Autonomous Intelligence",
      "Explainable AI and Trustworthy AI",
      "AI Ethics, Governance and Responsible Innovation",
      "AI for Education, Healthcare, Agriculture, Finance and Governance",
      "Human-Centred AI and AI-Human Collaboration",
      "Robotics, Automation and Intelligent Agents",
    ],
  },
  {
    title: "Smart Systems, Internet of Things and Intelligent Environments",
    topics: [
      "Internet of Things Systems and Applications",
      "Smart Cities and Smart Communities",
      "Smart Homes, Smart Campuses and Smart Workplaces",
      "Smart Agriculture and Environmental Monitoring",
      "Smart Healthcare and Assistive Technologies",
      "Embedded Systems and Wireless Sensor Networks",
      "Cyber-Physical Systems",
      "Intelligent Transportation Systems",
      "Smart Energy Systems and Sustainable Infrastructure",
      "Industrial IoT and Industry 4.0 Applications",
      "Automation, Control Systems and Intelligent Devices",
      "Sensor-Based Monitoring and Real-Time Systems",
      "Smart Governance and Public Service Innovation",
    ],
  },
  {
    title: "Computing, Cloud, Edge and Emerging Infrastructure",
    topics: [
      "Cloud Computing and Virtualisation Technologies",
      "Edge Computing and Fog Computing",
      "High-Performance Computing",
      "Distributed and Parallel Computing",
      "Quantum Computing and Future Computing Systems",
      "Grid Computing and Scalable Computing Architectures",
      "Mobile Computing and Ubiquitous Computing",
      "Green Computing and Sustainable ICT Infrastructure",
      "Serverless Computing and Microservices",
      "Computing Infrastructure for Digital Transformation",
      "Reliable, Resilient and Energy-Efficient Computing Systems",
      "Emerging Hardware, Architectures and Computing Platforms",
    ],
  },
  {
    title: "Data Science, Analytics and Decision Intelligence",
    topics: [
      "Data Science and Big Data Analytics",
      "Data Mining and Knowledge Discovery",
      "Predictive Analytics and Forecasting",
      "Business Intelligence and Decision Support Systems",
      "Data Visualization and Information Dashboards",
      "Statistical Modelling and Computational Analytics",
      "Social Media Analytics and Web Analytics",
      "Health Data Analytics and Bioinformatics",
      "Financial Analytics and Risk Modelling",
      "Educational Data Mining and Learning Analytics",
      "Geospatial Data Analytics and Remote Sensing Applications",
      "Data Governance, Data Quality and Data Management",
      "Real-Time Analytics and Streaming Data Processing",
    ],
  },
  {
    title: "Software Engineering & Information Systems",
    topics: [
      "Software Engineering Methods and Practices",
      "Software Design, Development and Architecture",
      "Mobile, Web and Enterprise Application Development",
      "Agile Development, DevOps and Software Project Management",
      "Software Testing, Quality Assurance and Maintenance",
      "Requirements Engineering and Software Modelling",
      "Human-Computer Interaction and User Experience Design",
      "Secure Software Development",
      "Open-Source Software and Collaborative Development",
      "Digital Platforms and E-Governance Systems",
      "Educational Software and Learning Management Systems",
      "Health Informatics and Digital Health Applications",
      "Financial Technology and Digital Banking Systems",
    ],
  },
  {
    title: "Emerging Technologies and Digital Applications",
    topics: [
      "Emerging Trends in Computer Science and Informatics",
      "Digital Transformation in Education, Healthcare, Business and Government",
      "Technology Innovation for Sustainable Development",
      "ICT for Development and Digital Inclusion",
      "Technology Entrepreneurship and Start-up Innovation",
      "Innovation Management and Technology Policy",
      "Digital Economy and Platform-Based Innovation",
      "FinTech, InsurTech and RegTech Applications",
      "Blockchain Applications Beyond Cryptocurrency",
      "Extended Reality, Virtual Reality and Augmented Reality",
      "Metaverse Technologies and Immersive Digital Environments",
      "5G, 6G and Next-Generation Network Applications",
      "Emerging Technologies for Developing Economies",
    ],
  },
  {
    title: "Information Systems, Governance and Society",
    topics: [
      "Information Systems Design and Management",
      "E-Governance and Digital Public Services",
      "Digital Identity and Citizen-Centred Services",
      "ICT Policy, Regulation and Governance",
      "Digital Literacy and Technology Adoption",
      "Social, Ethical and Legal Issues in Emerging Technologies",
      "Technology for Community Development",
      "Digital Inclusion and Accessibility",
      "Gender, Youth and Participation in Technology",
      "Responsible Research and Innovation",
      "Digital Transformation in Higher Education",
      "Technology-Enabled Public Sector Reform",
    ],
  },
  {
    title: "Interdisciplinary and Applied Technology Research",
    topics: [
      "Emerging Technologies in Agriculture and Food Security",
      "Digital Health, Telemedicine and Health Informatics",
      "Technology for Environmental Sustainability and Climate Action",
      "Smart Learning Environments and Educational Technology",
      "ICT Applications in Security and Public Safety",
      "Digital Solutions for Small and Medium-Sized Enterprises",
      "Technology Applications in Oil, Gas and Energy Sectors",
      "Innovation for Regional and National Development",
      "Applied Computing for Social and Economic Development",
      "Technology-Driven Solutions for the Niger Delta and Developing Regions",
    ],
  },
];

export default function ConferenceTracks() {
  return (
    <section
      id="tracks"
      className="border-b border-slate-200 bg-white"
    >
      <div className="container mx-auto px-5 py-4 lg:px-8 lg:py-6 xl:px-10 xl:py-10">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              <LuLayers3 className="h-4 w-4" />
              Conference Tracks
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
              Explore the research
              <span className="text-blue-600"> landscape.</span>
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
            ICETIA 2027 welcomes original research and applied work across
            emerging technologies, intelligent systems, digital
            transformation and interdisciplinary technology applications.
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

                    <span className="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600 lg:text-lg">
                      {track.title}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-7 pl-11 pr-4 lg:pl-16 lg:pr-12">
                  <div className="grid gap-x-8 gap-y-3 lg:grid-cols-2">
                    {track.topics.map((topic, topicIndex) => (
                      <div
                        key={`${track.title}-${topicIndex}`}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-600"
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
            <LuArrowDownRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}