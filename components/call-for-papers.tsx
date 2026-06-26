import { Button } from "@/components/ui/button";

export default function CallForPapers() {
  return (
    <section
      id="cfp"
      className="py-24"
    >
      <div className="container mx-auto px-6">
        <div className="rounded-3xl bg-linear-to-r from-blue-900 to-blue-700 text-white p-10 lg:p-16">

          <span className="uppercase tracking-widest text-sm">
            Call For Papers
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Submit Your Original Research
          </h2>

          <p className="mt-6 max-w-3xl text-slate-200 leading-8">
            ICETIA 2026 invites researchers, academics,
            practitioners, and industry experts to submit
            original and unpublished research papers that
            contribute to advancing emerging technologies,
            innovations, and applications for sustainable
            digital transformation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              variant="secondary"
              size="lg"
            >
              Submit Paper
            </Button>

            {/* <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-white hover:text-black"
            >
              Download Template
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}