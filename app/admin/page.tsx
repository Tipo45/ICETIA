import Link from "next/link";
import { LuClipboardCheck, LuLockKeyhole, LuShieldCheck, LuArrowRight } from "react-icons/lu";
import { MdCheckCircleOutline } from "react-icons/md";
import { RiFileEditLine } from "react-icons/ri";


const adminRoles = [
  {
    title: "Super Admin",
    description:
      "Manage the entire ICETIA conference administration system, administrators, registrations and payments.",
    href: "/admin/login/super-admin",
    icon: LuShieldCheck,
    color: "from-cyan-500 to-blue-600",
    permissions: [
      "Full system access",
      "Manage administrators and roles",
      "Manage participants and registrations",
      "Monitor payments and reports",
    ],
  },
  {
    title: "Reviewer",
    description:
      "Access assigned conference papers, evaluate submissions and provide recommendations to the editorial team.",
    href: "/admin/login/reviewer",
    icon: LuClipboardCheck,
    color: "from-violet-500 to-indigo-600",
    permissions: [
      "View assigned submissions",
      "Evaluate conference papers",
      "Submit review comments",
      "Recommend acceptance or rejection",
    ],
  },
  {
    title: "Editor",
    description:
      "Manage paper submissions, oversee the review process and make editorial decisions.",
    href: "/admin/login/editor",
    icon: RiFileEditLine,
    color: "from-emerald-500 to-teal-600",
    permissions: [
      "Manage paper submissions",
      "Monitor reviewer assignments",
      "Manage revision requests",
      "Make editorial decisions",
    ],
  },
];

export default function AdminPortalPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#001326] px-5 py-16 text-white tablet:px-10">
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-14 text-center">
          <Link href="/" className="mb-8 inline-flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
              <span className="text-lg font-black text-cyan-400">I</span>
            </div>
            <span className="text-left">
              <span className="block text-lg font-bold tracking-wide">
                ICETIA <span className="text-cyan-400">2027</span>
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-slate-400">
                ADMINISTRATION PORTAL
              </span>
            </span>
          </Link>

          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold tracking-wider text-cyan-300">
              <LuLockKeyhole className="h-3.5 w-3.5" />
              SECURE ADMINISTRATIVE ACCESS
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight tablet:text-5xl">
            Welcome to the{" "}
            <span className="text-cyan-400">Admin Portal</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 tablet:text-base">
            Select your administrative role to continue. Each access level
            provides dedicated tools and permissions for managing ICETIA 2027.
          </p>
        </div>

        {/* Admin role cards */}
        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 xl:grid-cols-3">
          {adminRoles.map((role) => {
            const Icon = role.icon;

            return (
              <div
                key={role.title}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/4 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.07] tablet:p-7"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${role.color} shadow-lg`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wider text-slate-400">
                    ADMIN ACCESS
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white">
                  {role.title}
                </h2>

                <p className="mt-3 min-h-20 text-sm leading-6 text-slate-400">
                  {role.description}
                </p>

                <div className="my-6 h-px bg-white/10" />

                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-300">
                  Access permissions
                </p>

                <ul className="mb-8 flex-1 space-y-3">
                  {role.permissions.map((permission) => (
                    <li
                      key={permission}
                      className="flex items-start gap-2.5 text-xs text-slate-400"
                    >
                      <MdCheckCircleOutline className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      {permission}
                    </li>
                  ))}
                </ul>

                <Link
                  href={role.href}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3.5 text-sm font-bold text-[#001326] transition hover:bg-cyan-400"
                >
                  Continue as {role.title}
                  <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Security notice */}
        <div className="mx-auto mt-12 flex max-w-2xl items-start gap-4 rounded-xl border border-white/10 bg-white/3 p-5">
          <LuLockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
          <div>
            <h3 className="text-sm font-semibold text-white">
              Authorized Access Only
            </h3>
            <p className="mt-1 text-xs leading-6 text-slate-400">
              This portal is exclusively for authorized ICETIA 2027
              administrators. Your assigned role determines the resources
              and administrative functions available to you.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-14 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-slate-500">
            © 2027 ICETIA | Federal University Otuoke
          </p>
          <p className="mt-2 text-[11px] text-slate-600">
            Emerging Technologies. Advancing Possibilities.
          </p>
        </footer>
      </div>
    </main>
  );
}
