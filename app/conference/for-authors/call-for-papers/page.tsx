import CallForPapers from "@/components/call-for-papers";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PublicationFooter from "@/components/publicationfooter";
import PublicationHeader from "@/components/publicationheader";


export default function callForPapers() {
    return (
        <div>
            <PublicationHeader />
            <Navbar />
            <CallForPapers />
            <PublicationFooter />
            <Footer />
        </div>
    )
}