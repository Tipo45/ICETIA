import Link from "next/link";
import { LuCalendarDays, LuMail, LuMapPin, LuPhone } from "react-icons/lu";

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-950 text-white">
      <div className="container mx-auto px-6 py-16">

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
          <div>
            <h3 className="font-bold text-2xl">
              ICETIA 2027
            </h3>

            <p className="mt-4 text-slate-400 leading-7">
              International Conference on Emerging Technologies, Innovation and Applications
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <LuCalendarDays className="h-4 w-4 text-blue-500" />
              <span>April, 2027</span>
            </div>


          </div>

          <div>
            <h4 className="font-semibold">
              Quick Links
            </h4>

            <div className="mt-4 flex flex-col gap-3">
              <Link href="/#about">
                About
              </Link>

              <Link href="/committees">
                Committees
              </Link>

              <Link href="#cfp">
                Call For Papers
              </Link>

              <Link href="/program">
                Program
              </Link>

              <Link href="/registration">
                Registration
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-slate-400">

              <div className="flex gap-3">
                <LuMapPin className="mt-1 h-5 w-5 text-blue-500" />
                <p>
                  Department of Computer Science & Informatics
                  <br />
                  Federal University Otuoke
                </p>
              </div>

              <div className="flex gap-3">
                <LuMail className="h-5 w-5 text-blue-500" />
                {/* <span>conference@icetia.org</span> */}
              </div>

              <div className="flex gap-3">
                <LuPhone className="h-5 w-5 text-blue-500" />
                {/* <span>+234 XXX XXX XXXX</span> */}
              </div>

            </div>
          </div>

          <div>
            <h4 className="font-semibold">
              Sponsorship
            </h4>

            <div className="mt-4 flex flex-col gap-3">
              <ul>
                <li>MTN</li>
                <li>GLO</li>
                <li>Bayelsa State Government</li>
                <li>NDDC</li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-slate-500">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-500 md:flex-row">

            <p>
              © {new Date().getFullYear()} Tipotek. All Rights Reserved.
            </p>

            {/* <p>
              Powered by the Department of Computer Science &
              Informatics, Federal University Otuoke.
            </p> */}

          </div>

        </div>

      </div>
    </footer>
  );
}