import Image from "next/image";
import EAILogo from "../public/images/EAI-Logo.png"

export default function PublicationHeader () {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-blue-400 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-around px-4 lg:px-6 xl:h-22">
        <Image src={EAILogo} alt="" width={120} height={40} />
        <div className="space-x-2 text-white">
          <a href="https://eudl.eu/">EU Digital Library</a>
          <a href="https://help.eai-conferences.org/">Support</a>
        </div>
      </div>
      </header>
    )
}