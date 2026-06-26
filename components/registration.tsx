import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
    {
        title: "Authors",
        price: "₦30,000",
        description:
            "Presenting authors with accepted papers.",
    },
    {
        title: "Co-Authors",
        price: "₦30,000",
        description:
            "Additional authors of accepted papers.",
    },
    {
        title: "Non-authors/Participants",
        price: "₦30,000",
        description:
            "Industry professionals and attendees.",
    },
    {
        title: "Students",
        price: "₦20,000",
        description:
            "Undergraduate and postgraduate students.",
    },
];

export default function RegistrationCategories() {
    return (
        <section
            id="registration"
            className="py-24 bg-slate-50"
        >
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <span className="uppercase tracking-wider text-blue-700 font-semibold">
                        Registration
                    </span>

                    <h2 className="mt-4 text-4xl font-bold">
                        Registration Categories
                    </h2>

                    <p className="mt-4 text-muted-foreground">
                        Choose the category that best matches your participation.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-2 xl:grid-cols-4 gap-8">
                    {categories.map((item) => (
                        <Card
                            key={item.title}
                            className="hover:shadow-xl transition"
                        >
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold">
                                    {item.title}
                                </h3>

                                <div className="mt-4 text-4xl font-bold text-blue-700">
                                    {item.price}
                                </div>

                                <p className="mt-4 text-muted-foreground">
                                    {item.description}
                                </p>

                                <Button className="mt-8 w-full">
                                    Register
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-10">
                    <p><span className="font-bold">N/B:</span>Registered participants will be entitled to the following, subject to the approved conference package:</p>
                    <ul>
                        <li>Access</li>
                        <li>Access</li>
                        <li>Participation</li>
                        <li>Conference</li>
                        <li>Certificate</li>
                        <li>Networking</li>
                        <li>Access</li>
                        <li>Refreshments</li>
                    </ul>
                </div>
            </div>

        </section>
    );
}