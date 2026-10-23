import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ConferenceTracks from "@/components/conference-tracks";
import HostInstitution from "@/components/hostinstitution";
import Footer from "@/components/footer";
import About from "@/components/about";
import Gallery from "@/components/gallery";
import WhyICETIA from "@/components/WhyICETIA";
import PublicationFooter from "@/components/publicationfooter";
import Partners from "@/components/Partners";



export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Hero />

      <About />

      <WhyICETIA />

      <Gallery />

      {/* <ConferenceTracks /> */}


      <HostInstitution />

      <Partners />

      <PublicationFooter />

      <Footer />
    </main>
  );
}
