import { LuArrowDownRight, LuCalendarDays } from "react-icons/lu";

const dates = [
  {
    title: "Conference Website Launch",
    date: "5 October 2026",
  },
  {
    title: "Call for Papers Opens",
    date: "13 October 2026",
  },
  {
    title: "Full Paper Submission Deadline",
    date: "15 February 2027",
  },
  {
    title: "Notification of Acceptance",
    date: "15 March 2027",
  },
  {
    title: "Camera-Ready Paper Submission Deadline",
    date: "25 March 2027",
  },
  {
    title: "Author Registration Deadline",
    date: "31 March 2027",
  },
  {
    title: "Conference Dates",
    date: "28 – 30 April 2027",
  },
];

export default function ImportantDates() {
  return (
    <section
      id="dates"
      className="border-b border-slate-200 bg-slate-50"
    >
      <div className="container mx-auto px-5 py-4 lg:px-8 lg:py-6 xl:px-10 xl:py-10">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              <LuCalendarDays className="h-4 w-4" />
              Conference Timeline
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl xl:text-5xl">
              Important
              <span className="text-blue-600"> dates.</span>
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-500 lg:justify-self-end lg:text-base lg:leading-8">
            Keep track of the key milestones leading up to ICETIA 2027,
            from paper submission and review through author registration
            and the conference itself.
          </p>
        </div>

        {/* Timeline grid */}
        <div className="mt-10 grid border-t border-slate-200 lg:mt-12 lg:grid-cols-2">
          {dates.map((item, index) => (
            <div
              key={item.title}
              className={`group border-b border-slate-200 py-6 lg:px-6 lg:py-7 ${
                index % 2 === 0
                  ? "lg:border-r lg:pl-0"
                  : "lg:pr-0"
              }`}
            >
              <div className="flex gap-5">
                {/* Number */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-bold text-slate-500 transition-colors group-hover:border-blue-500 group-hover:text-blue-600">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                    {item.date}
                  </p>

                  <h3 className="mt-2 text-base font-semibold leading-6 text-slate-900 lg:text-lg">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-3xl text-xs leading-5 text-slate-500 lg:text-sm">
            These dates are provisional and may be updated following
            approval by the Conference Organising Committee.
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <span>ICETIA 2027</span>
            {/* <LuArrowDownRight className="h-4 w-4 text-blue-600" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}