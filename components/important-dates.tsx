import { FaCalendar } from "react-icons/fa";


const dates = [
  {
    title: "Paper Submission Opens",
    date: "TBA",
  },
  {
    title: "Paper Submission Deadline",
    date: "TBA",
  },
  {
    title: "Notification of Acceptance",
    date: "TBA",
  },
  {
    title: "Camera Ready Submission",
    date: "TBA",
  },
  {
    title: "Author Registration Deadline",
    date: "TBA",
  },
  {
    title: "Conference Dates",
    date: "24 - 25 November 2026",
  },
];

export default function ImportantDates() {
  return (
    <section
      id="dates"
      className="py-24"
    >
      <div className="container mx-auto px-6">
        <div className="text-center">
          <span className="uppercase tracking-wider text-blue-700 font-semibold">
            Timeline
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Important Dates
          </h2>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          {dates.map((item, index) => (
            <div
              key={item.title}
              className="flex gap-6"
            >
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-blue-700 p-3 text-white">
                  <FaCalendar size={18} />
                </div>

                {index !== dates.length - 1 && (
                  <div className="w-px h-20 bg-blue-200" />
                )}
              </div>

              <div className="pb-10">
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="text-muted-foreground">
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