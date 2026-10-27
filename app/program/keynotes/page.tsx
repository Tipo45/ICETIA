import Footer from "@/components/footer";
import KeynotePage from "@/components/keynote";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import PublicationHeader from "@/components/publicationheader";

export default function Keynote() {
    return (
        <section>
            <div className="sticky top-0 z-50">
                <PublicationHeader />
                <Navbar />
            </div>
            <KeynotePage />
            <PublicationFooter />
            <Footer />
        </section>
    )
}