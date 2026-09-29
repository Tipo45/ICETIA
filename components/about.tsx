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
                        About <span className="text-blue-600">ICETIA 2027</span>
                    </h1>
                    <p className="text-lg xl:text-xl text-slate-600 max-w-3xl mx-auto">
                        The First International Conference on Emerging Technologies, Innovation and Applications
                    </p>
                </div>

                

                {/* Content */}
                <div className="space-y-8">
                    <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-6 lg:p-8 xl:p-10 hover:shadow-lg transition-shadow">
                        <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
                            <span className="font-semibold text-blue-600">ICETIA 2027</span> is an international academic conference hosted by the
                            <span className="font-medium text-slate-900"> Federal University Otuoke, Nigeria</span>.
                            The conference is scheduled to take place in April 2027 and is designed to provide a reputable platform for researchers, academics, industry professionals, policymakers, innovators,
                             postgraduate students and technology practitioners to exchange knowledge, present research findings,
                            and explore current and emerging developments in computing, informatics and digital technologies.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-6 lg:p-8 xl:p-10 hover:shadow-lg transition-shadow">
                        <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
                            ICETIA 2027 seeks to promote high-quality scholarly engagement and practical collaboration in response to the growing influence of emerging technologies on education, industry, governance, healthcare, business, security and sustainable development. The conference
                            will focus on  research, innovation and applications in areas such as:
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {[
                                "Cybersecurity",
                                "Artificial Intelligence","Smart Systems",
                                "Computing",
                                "Analytics",
                                "Data Science",
                                "Software Engineering","Internet of Things",
                                "Cloud and Edge Computing",
                                "Digital Transformation",
                                "Health Informatics",
                                "Medical Laboratory Technology Applications"
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
                            As the maiden edition, ICETIA 2027 represents an important milestone for Federal University Otuoke, Nigeria, as it strengthens the University's commitment to research excellence, innovation, knowledge exchange and global academic collaboration. The conference will create opportunities for participants to engage in critcal discussions, build professional networks, share innovative solutions and contribute to the advancement of emerging technologies within Nigeria, Africa and the wider international community.
                        </p>
                    </div>

                    <div className="bg-linear-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200 p-6 sm:p-8 lg:p-10 hover:shadow-lg transition-shadow">
                        <h2 className="text-xl xl:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="bg-blue-600 text-white p-2 rounded-lg">💡</span>
                            Conference Activities
                        </h2>
                        <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
                            Through keynote presentations, technical paper sessions, workshops, panel discussions, exhibitions and networking activities, ICETIA 2027 will support interdisciplinary dialogue and encourage meaningful partnerships between academia, industry, government and society. The conference is expected to contribute to sustainable digital transformation while enhancing the visibility of Federal University Otuoke as an emerging centre for research, innovation and technological development
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
                        Join us in shaping the future of technology at <span className="font-medium text-slate-700">ICETIA 2027</span>
                    </p>
                </div>
            </div>
        </section>
    )
}