import Footer from "@/components/footer";
import KeynotePage from "@/components/keynote";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";

export default function Keynote() {
    return (
        <section>
            <Navbar />
            <KeynotePage />
            <PublicationFooter />
            <Footer />
        </section>
    )
}