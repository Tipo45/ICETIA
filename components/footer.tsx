import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="container mx-auto px-6 py-16">

        <div className="grid gap-12 lg:grid-cols-3">

          <div>
            <h3 className="font-bold text-2xl">
              ICETIA 2026
            </h3>

            <p className="mt-4 text-slate-400 leading-7">
              International Conference on Emerging
              Technologies, Innovation and Application.
            </p>
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

              <Link href="/contact">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">
              Conference Theme
            </h4>

            <p className="mt-4 text-slate-400">
              Advancing Emerging Technologies,
              Innovations and Applications for
              Sustainable Digital Transformation.
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-slate-500">
          © 2026 Tipotek. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}