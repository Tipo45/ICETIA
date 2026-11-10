import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { LuClipboardList, LuFileText, LuPlus, LuUserRound, LuUsers } from "react-icons/lu";

type ParticipantData = FunctionReturnType<
    typeof api.registration.getParticipants
>;

type Section =
    | "overview"
    | "participants"
    | "team"
    | "papers"
    | "assignments"
    | "reviews"
    | "reports";

type PaperRow = {
    id: string;
    registrationId: string;
    registrationNumber: string;
    author: string;
    email: string;
    title: string;
    track: string;
    url?: string | null;
    source: string;
    status: string;
}

type EditorialMember = {
    id: string;
    name: string;
    email: string;
    role: "editor" | "reviewer";
    status: "active" | "inactive";
}

type Assignment = {
    id: string;
    paperId: string;
    editorId: string;
    reviewerIds: string[];
    deadline: string;
    status: "assigned" | "in_progress" | "completed";
}

type Paper = {
    id: string;
    title: string;
}

interface OverviewProps {
    participants: ParticipantData | undefined;

    papers: PaperRow[];
    editors: EditorialMember[];
    reviewers: EditorialMember[];
    assignments: Assignment[];
    unassignedPapers: Paper[];

    authorsCount: number;
    studentsCount: number;
    paidCount: number;
    totalPeople: number;

    activeEditors: EditorialMember[];
    activeReviewers: EditorialMember[];

    setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
    openAddMember: (role: "editor" | "reviewer") => void;

    statusBadge: (status: string) => React.ReactNode;
}

export default function Overview({ participants,
    papers,
    editors,
    reviewers,
    assignments,
    unassignedPapers,
    authorsCount,
    studentsCount,
    paidCount,
    totalPeople,
    activeEditors,
    activeReviewers,
    setActiveSection,
    openAddMember,
    statusBadge,
}: OverviewProps) {

    const participantsList = participants ?? [];
    return (
        <div>
            <div className="flex flex-col justify-between gap-4 tablet:flex-row tablet:items-end">
                <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
                        Conference administration
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
                        Editorial Management Dashboard
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Manage conference registrations, submitted papers,
                        editorial assignments and peer-review activities.
                    </p>
                </div>

                <button
                    onClick={() => setActiveSection("assignments")}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#07111f] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#10243b] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                >
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400 transition-colors group-hover:bg-cyan-500 group-hover:text-white">
                        <LuPlus size={16} />
                    </span>
                    Create assignment
                </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid gap-4 tablet:grid-cols-2 2xl:grid-cols-4 my-4">
                {[
                    {
                        label: "Registrations",
                        value: participants === undefined ? "—" : participantsList.length,
                        note: `${totalPeople} registered people including co-authors`,
                        icon: LuUsers,
                        color: "text-blue-600 bg-blue-50",
                    },
                    {
                        label: "Submitted papers",
                        value: participants === undefined ? "—" : papers.length,
                        note: "Papers available in the current participant results",
                        icon: LuFileText,
                        color: "text-cyan-700 bg-cyan-50",
                    },
                    {
                        label: "Editors",
                        value: editors.length,
                        note: `${activeEditors.length} active`,
                        icon: LuUserRound,
                        color: "text-purple-600 bg-purple-50",
                    },
                    {
                        label: "Reviewers",
                        value: reviewers.length,
                        note: `${activeReviewers.length} active`,
                        icon: LuClipboardList,
                        color: "text-emerald-600 bg-emerald-50",
                    },
                ].map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Card key={stat.label} className="rounded-xl border-slate-200 shadow-sm">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            {stat.label}
                                        </p>
                                        <p className="mt-3 text-3xl font-bold text-slate-950">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className={`rounded-xl p-3 ${stat.color}`}>
                                        <Icon size={20} />
                                    </div>
                                </div>
                                <p className="mt-3 text-xs text-slate-400">{stat.note}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* SECONDARY STATS */}
            <div className="grid gap-4 tablet:grid-cols-3 my-4">
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-xs text-slate-500">Authors</p>
                        <p className="mt-2 text-2xl font-bold">{authorsCount}</p>
                        <p className="mt-1 text-xs text-slate-400">Author registrations</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-xs text-slate-500">Students</p>
                        <p className="mt-2 text-2xl font-bold">{studentsCount}</p>
                        <p className="mt-1 text-xs text-slate-400">Student registrations</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-xs text-slate-500">Paid registrations</p>
                        <p className="mt-2 text-2xl font-bold">{paidCount}</p>
                        <p className="mt-1 text-xs text-slate-400">Based on current results</p>
                    </CardContent>
                </Card>
            </div>

            {/* OVERVIEW CONTENT */}
            <div className="grid gap-6 2xl:grid-cols-[1.4fr_1fr] my-4">
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Editorial workflow</CardTitle>
                        <CardDescription>
                            A quick view of the current paper assignment workload.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        {[
                            {
                                label: "Papers received",
                                value: papers.length,
                                total: papers.length || 1,
                                color: "bg-blue-500",
                            },
                            {
                                label: "Papers assigned",
                                value: assignments.length,
                                total: papers.length || 1,
                                color: "bg-cyan-500",
                            },
                            {
                                label: "Unassigned papers",
                                value: unassignedPapers.length,
                                total: papers.length || 1,
                                color: "bg-amber-500",
                            },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="mb-2 flex justify-between text-xs">
                                    <span className="font-medium text-slate-600">{item.label}</span>
                                    <span className="font-bold text-slate-900">{item.value}</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className={`h-full rounded-full ${item.color}`}
                                        style={{
                                            width: `${Math.min((item.value / item.total) * 100, 100)}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Quick actions</CardTitle>
                        <CardDescription>
                            Common editorial administration tasks.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <button
                            onClick={() => openAddMember("editor")}
                            className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50/50"
                        >
                            <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                                <LuPlus size={18} />
                            </span>
                            <span>
                                <span className="block text-sm font-semibold">Add an editor</span>
                                <span className="text-xs text-slate-400">Register an editorial team member</span>
                            </span>
                        </button>

                        <button
                            onClick={() => openAddMember("reviewer")}
                            className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50/50"
                        >
                            <span className="rounded-lg bg-purple-50 p-2 text-purple-600">
                                <LuPlus size={18} />
                            </span>
                            <span>
                                <span className="block text-sm font-semibold">Add a reviewer</span>
                                <span className="text-xs text-slate-400">Expand the reviewer pool</span>
                            </span>
                        </button>

                        <button
                            onClick={() => setActiveSection("papers")}
                            className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50/50"
                        >
                            <span className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                                <LuFileText size={18} />
                            </span>
                            <span>
                                <span className="block text-sm font-semibold">Review submitted papers</span>
                                <span className="text-xs text-slate-400">Browse paper submissions</span>
                            </span>
                        </button>
                    </CardContent>
                </Card>
            </div>

            {/* RECENT PAPERS */}
            <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-base">Recently available papers</CardTitle>
                        <CardDescription>Paper submissions from the current participant results.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveSection("papers")}>
                        View all
                    </Button>
                </CardHeader>
                <CardContent>
                    {papers.length === 0 ? (
                        <p className="py-8 text-center text-sm text-slate-400">
                            No papers are available in the current results.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {papers.slice(0, 5).map((paper) => (
                                <div
                                    key={paper.id}
                                    className="flex flex-col justify-between gap-3 rounded-lg border border-slate-100 p-4 tablet:flex-row tablet:items-center"
                                >
                                    <div className="min-w-0">
                                        <p className="line-clamp-1 text-sm font-semibold text-slate-900">
                                            {paper.title}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {paper.author} · {paper.track}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {statusBadge(paper.status)}
                                        {paper.url && (
                                            <a
                                                href={paper.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-semibold text-blue-600 hover:underline"
                                            >
                                                View paper
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}