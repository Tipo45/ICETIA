import { FaGraduationCap, FaRegBuilding } from "react-icons/fa";

export default function HostDepartment() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">

        <div className="max-w-4xl mx-auto text-center">

          <FaRegBuilding className="mx-auto h-15 w-15 text-blue-700" />

          <h2 className="mt-6 text-4xl font-bold">
            Host Institution
          </h2>

          <h3 className="mt-4 text-2xl font-semibold">
            Department of Computer Science and Informatics
          </h3>

          <p className="mt-6 text-muted-foreground leading-8">
            The Department of Computer Science and Informatics
            is committed to advancing research, innovation,
            and digital transformation through academic
            excellence, collaborative research, and industry
            partnerships.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm">
            <FaGraduationCap className="h-5 w-5 text-blue-700" />
            Academic Excellence • Research • Innovation
          </div>
        </div>

      </div>
    </section>
  );
}
