"use client"

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { BsAward } from "react-icons/bs";
import { FaArrowRight, FaCalendar, FaRegLightbulb, FaUsers } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LuFileCheck, LuGraduationCap } from "react-icons/lu";
import { RiProgress1Line } from "react-icons/ri";

const programmeComponents = [
  {
    icon: FaCalendar,
    title: "Opening Ceremony",
    description:
      "Opening ceremony and institutional addresses.",
  },
  {
    icon: RiProgress1Line,
    title: "Keynote & Plenary Sessions",
    description:
      "Presentations delivered by distinguished keynote speakers and invited experts.",
  },
  {
    icon: FiBookOpen,
    title: "Technical Paper Sessions",
    description:
      "Presentation of accepted research papers across conference tracks.",
  },
  {
    icon: LuGraduationCap,
    title: "Workshops & Tutorials",
    description:
      "Hands-on sessions on emerging technologies and research practices.",
  },
  {
    icon: FaUsers,
    title: "Panel Discussions",
    description:
      "Interactive discussions involving academia, industry and government.",
  },
  {
    icon: FaRegLightbulb,
    title: "Innovation Showcase",
    description:
      "Technology exhibitions, product demonstrations and innovation showcases.",
  },
  {
    icon: IoBriefcaseOutline,
    title: "Networking Sessions",
    description:
      "Networking opportunities for researchers, students and industry professionals.",
  },
  {
    icon: BsAward,
    title: "Awards & Closing Ceremony",
    description:
      "Certificate presentation, awards and conference communiqué.",
  },
];

const workshops = [
  "Artificial Intelligence & Machine Learning Applications",
  "Cybersecurity, Privacy & Digital Trust",
  "Smart Systems, Internet of Things & Intelligent Environments",
  "Data Science, Analytics & Decision Intelligence",
  "Cloud Computing, Edge Computing & Digital Infrastructure",
  "Academic Publishing, Research Visibility & Grant Proposal Development",
  "Technology Entrepreneurship & Innovation Commercialisation",
  "Digital Transformation for Education, Governance, Health & Industry",
];

const outputs = [
  "Presentation of high-quality research papers",
  "Strengthened academic and industry collaborations",
  "Increased research visibility for Federal University Otuoke",
  "Publication opportunities for accepted papers",
  "Capacity building for students and early-career researchers",
  "Development of partnerships with sponsors, professional bodies and research organisations",
  "Formal conference communiqué highlighting recommendations and future directions",
];

export default function ProgrammePage() {

    const router = useRouter();
    
    const handleRegistrationNavigation = () => {
      router.push("/#registration")
    }

    const handleSubmitPaperButton  = () => {
      router.push("/registration/authors-registration")
    }

  return (
    <div>
        <Navbar />
      {/* Hero */}

      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-6 text-center">

          <span className="uppercase tracking-widest text-blue-200">
            ICETIA 2027
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Conference Programme
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-blue-100 leading-8">
            ICETIA 2027 has been carefully designed to foster
            collaboration, showcase innovative research, promote
            knowledge exchange and strengthen partnerships among
            academia, industry and government.
          </p>

        </div>
      </section>

      {/* Programme Components */}

      <section className="py-24">

        <div className="container mx-auto px-6">

          <div className="text-center">
            <h2 className="text-4xl font-bold">
              Proposed Programme Components
            </h2>

            <p className="mt-4 text-muted-foreground">
              Activities planned throughout the conference.
            </p>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

            {programmeComponents.map((item) => (
              <Card
                key={item.title}
                className="hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8">

                  <item.icon className="text-2xl text-blue-700" />

                  <h3 className="mt-5 font-bold text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-muted-foreground leading-7">
                    {item.description}
                  </p>

                </CardContent>
              </Card>
            ))}

          </div>

        </div>

      </section>

      {/* Workshop Areas */}

      <section className="py-24 bg-slate-50">

        <div className="container mx-auto px-6">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              Proposed Workshop Areas
            </h2>

            <p className="mt-4 text-muted-foreground">
              Specialised workshops focusing on emerging research
              and innovation.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-6 mt-16">

            {workshops.map((item) => (

              <div
                key={item}
                className="flex items-start gap-4 rounded-xl border bg-white p-6 hover:border-blue-700 transition"
              >

                <FaArrowRight className="mt-1 h-5 w-5 text-blue-700 shrink-0" />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Expected Outputs */}

      <section className="py-24">

        <div className="container mx-auto px-6">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              Expected Conference Outputs
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-8">

            {outputs.map((item) => (

              <Card key={item}>

                <CardContent className="p-8 flex gap-4">

                  <LuFileCheck className="h-6 w-6 text-green-600 mt-1 shrink-0" />

                  <p className="leading-7">
                    {item}
                  </p>

                </CardContent>

              </Card>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24 bg-blue-900 text-white">

        <div className="container mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">
            Join ICETIA 2027
          </h2>

          <p className="max-w-2xl mx-auto mt-6 text-blue-100">
            Be part of an international community of researchers,
            innovators and industry professionals driving sustainable
            digital transformation through emerging technologies.
          </p>

          <div className="mt-5 flex justify-center gap-4">

            <Button onClick={handleRegistrationNavigation} size="lg">
              Register Now
            </Button>

            <Button
            onClick={handleSubmitPaperButton}
              size="lg"
              variant="secondary"
            >
              Submit Paper
            </Button>

          </div>

        </div>

      </section>

<Footer />
    </div>
  );
}