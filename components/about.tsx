import { Card, CardContent } from "@/components/ui/card";
import { BsCpuFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoGlobeSharp } from "react-icons/io5";

const stats = [
  {
    title: "Research Tracks",
    value: "10+",
    icon: BsCpuFill,
  },
  {
    title: "Expected Participants",
    value: "500+",
    icon: FaUsers,
  },
  {
    title: "International Reach",
    value: "20+",
    icon: IoGlobeSharp,
  },
  {
    title: "Innovation Focus",
    value: "100%",
    icon: HiOutlineLightBulb,
  },
];

export default function AboutConference() {
  return (
    <section
      id="about"
      className="py-24 bg-slate-50"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-700 font-semibold uppercase tracking-wider">
              About ICETIA 2026
            </span>

            <h2 className="mt-4 text-4xl font-bold">
              Driving Innovation Through Emerging Technologies
            </h2>

            <p className="mt-6 text-muted-foreground leading-8">
              The International Conference on Emerging Technologies,
              Innovation and Application (ICETIA 2026) provides a
              global platform for researchers, academics, innovators,
              industry professionals, policymakers, and students to
              share cutting-edge research findings, technological
              advancements, and innovative applications.
            </p>

            <p className="mt-4 text-muted-foreground leading-8">
              Hosted by the Department of Computer Science and
              Informatics, the conference focuses on emerging
              technologies and their role in sustainable digital
              transformation across industries, governments, and
              societies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-8">
                  <stat.icon className="h-10 w-10 text-blue-700 mb-4" />

                  <h3 className="text-4xl font-bold">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    {stat.title}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}