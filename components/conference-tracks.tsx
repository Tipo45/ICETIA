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
      "Technology Innovation for Sustainable Developmen",
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
                <ul className="grid grid-cols-2 gap px-6">
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