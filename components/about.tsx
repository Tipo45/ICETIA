import { LuSparkles } from "react-icons/lu"

export default function About() {
    return (
        <section id="about">
            <div className="max-w-5xl mx-auto px-4 lg:px-6 xl:px-8 py-12 lg:py-16 xl:py-20">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
                        <LuSparkles className="w-4 h-4" />
                        Maiden Edition
                    </div>
                    <h1 className="text-4xl xl:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        About <span className="text-blue-600">ICETIA 2026</span>
                    </h1>
                    <p className="text-lg xl:text-xl text-slate-600 max-w-3xl mx-auto">
                        The First International Conference on Emerging Technologies, Innovation and Applications
                    </p>
                </div>

                

                {/* Content */}
                <div className="space-y-8">
                    <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-6 lg:p-8 xl:p-10 hover:shadow-lg transition-shadow">
                        <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
                            <span className="font-semibold text-blue-600">ICETIA 2026</span> is an academic and professional gathering proposed by the
                            <span className="font-medium text-slate-900"> Department of Computer Science and Informatics, Federal University Otuoke</span>.
                            The conference is designed to provide a platform for researchers, academics, industry professionals, innovators,
                            policymakers, postgraduate students, and technology practitioners to exchange knowledge, present research findings,
                            and explore emerging trends in computing and digital technologies.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-6 lg:p-8 xl:p-10 hover:shadow-lg transition-shadow">
                        <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
                            ICETIA 2026 seeks to promote scholarly dialogue and practical engagement on the role of emerging technologies
                            in addressing contemporary societal, industrial, educational, economic, and developmental challenges. The conference
                            will focus on innovative research, practical applications, and interdisciplinary collaborations in areas such as:
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {[
                                "Artificial Intelligence",
                                "Cybersecurity",
                                "Data Science",
                                "Software Engineering",
                                "Cloud Computing",
                                "Internet of Things",
                                "Digital Transformation",
                                "Robotics",
                                "Smart Systems",
                                "Information Systems"
                            ].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-6 lg:p-8 xl:p-10 hover:shadow-lg transition-shadow">
                        <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
                            As the maiden edition, ICETIA 2026 aims to establish a strong foundation for an internationally recognised
                            conference series that will contribute to research excellence, technological advancement, innovation, and
                            sustainable development. The conference will also create opportunities for networking, academic collaboration,
                            industry partnership, and the dissemination of impactful research from Nigeria, Africa, and the global community.
                        </p>
                    </div>

                    <div className="bg-linear-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200 p-6 sm:p-8 lg:p-10 hover:shadow-lg transition-shadow">
                        <h2 className="text-xl xl:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="bg-blue-600 text-white p-2 rounded-lg">💡</span>
                            Conference Activities
                        </h2>
                        <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
                            Through keynote presentations, technical paper sessions, panel discussions, workshops, and exhibitions,
                            ICETIA 2026 will encourage critical conversations on the future of emerging technologies and their applications
                            across diverse sectors.
                        </p>
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 mt-6">
                            {[
                                "Keynote Presentations",
                                "Technical Papers",
                                "Panel Discussions",
                                "Workshops",
                                "Exhibitions",
                                "Networking Sessions"
                            ].map((activity) => (
                                <div
                                    key={activity}
                                    className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 text-center text-sm font-medium text-slate-700 border border-blue-200/50 hover:bg-white transition-colors"
                                >
                                    {activity}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500">
                        Join us in shaping the future of technology at <span className="font-medium text-slate-700">ICETIA 2026</span>
                    </p>
                </div>
            </div>
        </section>
    )
}