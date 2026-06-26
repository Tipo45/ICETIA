import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      "AI Ethics, Governance and Responsible Innovation",
      "AI for Education, Healthcare, Agriculture, Finance and Governance",
      "Human-Centred AI and AI-Human Collaboration",
      "Robotics, Automation and Intelligent Agents",
    ],
  },
  {
    title: "Smart Systems, Internet of Things and Intelligent Environments",
    topics: [
      "Network Security",
      "Digital Forensics",
      "Blockchain Security",
      "Privacy Technologies",
      "Threat Intelligence",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  },
  {
    title: "Computing, Cloud, Edge and Emerging Infrastructure",
    topics: [
      "Network Security",
      "Digital Forensics",
      "Blockchain Security",
      "Privacy Technologies",
      "Threat Intelligence",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  },
  {
    title: "Data Science, Analytics and Decision Intelligence",
    topics: [
      "Big Data",
      "Predictive Analytics",
      "Business Intelligence",
      "Data Mining",
      "Data Visualization",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  },
  {
    title: "Software Engineering & Information Systems",
    topics: [
      "Cloud Computing",
      "Enterprise Systems",
      "DevOps",
      "Microservices",
      "Software Quality Assurance",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  },
  {
    title: "Emerging Technologies and Digital Applications",
    topics: [
      "Cloud Computing",
      "Enterprise Systems",
      "DevOps",
      "Microservices",
      "Software Quality Assurance",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  },
  {
    title: "Information Systems, Governance and Society",
    topics: [
      "Cloud Computing",
      "Enterprise Systems",
      "DevOps",
      "Microservices",
      "Software Quality Assurance",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  },
  {
    title: "Interdisciplinary and Applied Technology Research",
    topics: [
      "Cloud Computing",
      "Enterprise Systems",
      "DevOps",
      "Microservices",
      "Software Quality Assurance",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  },
];

export default function ConferenceTracks() {
  return (
    <section
      id="tracks"
      className="py-24 bg-slate-50"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center">
          <span className="uppercase tracking-wider text-blue-700 font-semibold">
            Conference Tracks
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Explore Research Areas
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-12"
        >
          {tracks.map((track) => (
            <AccordionItem
              value={track.title}
              key={track.title}
            >
              <AccordionTrigger className="text-lg">
                {track.title}
              </AccordionTrigger>

              <AccordionContent>
                <ul className="grid grid-cols-2 gap-3 px-4">
                  {track.topics.map((topic) => (
                    <li key={topic} className="text-base">
                      • {topic}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}