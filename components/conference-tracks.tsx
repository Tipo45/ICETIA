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
      "Network Security",
      "Digital Forensics",
      "Blockchain Security",
      "Privacy Technologies",
      "Threat Intelligence",
    ],
  },
  {
    title: "Artificial Intelligence & Intelligent Systems",
    topics: [
      "Generative AI",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "AI Ethics",
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
              <AccordionTrigger>
                {track.title}
              </AccordionTrigger>

              <AccordionContent>
                <ul className="grid md:grid-cols-2 gap-3">
                  {track.topics.map((topic) => (
                    <li key={topic}>
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