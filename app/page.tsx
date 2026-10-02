import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import CallForPapers from "@/components/call-for-papers";
import ConferenceTracks from "@/components/conference-tracks";
import ImportantDates from "@/components/important-dates";
import RegistrationCategories from "@/components/registration";
import HostInstitution from "@/components/hostinstitution";
import Footer from "@/components/footer";
import About from "@/components/about";
import Gallery from "@/components/gallery";



export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Hero />

      <About />

      <Gallery />

      <CallForPapers />

      <ConferenceTracks />

      <ImportantDates />

      <RegistrationCategories />

      <HostInstitution />

      <Footer />
    </main>
  );
}
