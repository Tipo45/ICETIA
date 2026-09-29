import { FaCalendar } from "react-icons/fa";

const dates = [
  {
    title: "Conference Website Launch & Call for Papers",
    date: "November - December 2026",
  },
  {
    title: "Paper Submission Opens",
    date: "January 2027",
  },
  {
    title: "Paper Submission Deadline",
    date: "February 2027",
  },
  {
    title: "Notification of Acceptance",
    date: "March 2027",
  },
  {
    title: "Author Registration Opens",
    date: "March 2027",
  },
  {
    title: "Camera-Ready Paper Submission",
    date: "Mid-March 2027",
  },
  {
    title: "Author Registration Deadline",
    date: "Late March 2027",
  },
  {
    title: "Conference Dates",
    date: "28th - 30th April 2027",
  },
];

export default function ImportantDates() {
  return (
    <section
      id="dates"
      className="bg-slate-50 py-24"
    >
      <div className="container mx-auto px-6">
        <div className="text-center">
          <span className="uppercase tracking-widest text-blue-700 font-semibold">
            Conference Timeline
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Important Dates
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Please note that these dates are provisional and may be updated
            following approval by the Conference Organising Committee.
          </p>
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          {dates.map((item, index) => (
            <div
              key={item.title}
              className="flex gap-6"
            >
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-blue-700 p-3 text-white shadow-lg">
                  <FaCalendar size={18} />
                </div>

                {index !== dates.length - 1 && (
                  <div className="w-1 h-24 bg-blue-200 rounded-full" />
                )}
              </div>

              <div className="flex-1 rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
                <h3 className="font-semibold text-lg text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-blue-700 font-medium">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}