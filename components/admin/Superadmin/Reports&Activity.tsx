import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuActivity, LuClipboardList, LuFileText, LuUserRound, LuUsers } from "react-icons/lu";
import { AssignmentData, PaperRow, ParticipantData, TeamMember } from "./types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";



interface ReportsandActivityProps {
    participantsList: NonNullable<ParticipantData>; 
    totalPeople: number; 
    papers: PaperRow[]; 
    assignments: AssignmentData[]; 
    authorsCount: number; 
    participantCount: number; 
    studentsCount: number; 
    editors: TeamMember[];
    reviewers: TeamMember[];
    unassignedPapers: PaperRow[];
}

export default function ReportsandActivity ({ participantsList, totalPeople, papers, assignments, authorsCount, participantCount, studentsCount, editors, reviewers, unassignedPapers }: ReportsandActivityProps) {

  const auditLogs = useQuery(api.editorial.getAuditLogs);
    return (
        <div>
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Reports & Activity</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Monitor registration figures and editorial workload.
                </p>
              </div>

              <div className="grid gap-4 tablet:grid-cols-2 2xl:grid-cols-4 my-4">
                {[
                  { label: "Registrations", value: participantsList.length, icon: LuUsers },
                  { label: "Total people", value: totalPeople, icon: LuUserRound },
                  { label: "Submitted papers", value: papers.length, icon: LuFileText },
                  { label: "Paper assignments", value: assignments.length, icon: LuClipboardList },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.label} className="rounded-xl border-slate-200 shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500">{item.label}</p>
                          <Icon className="text-cyan-700" size={19} />
                        </div>
                        <p className="mt-3 text-2xl font-bold">{item.value}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="grid gap-6 2xl:grid-cols-2 my-4">
                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Registration breakdown</CardTitle>
                    <CardDescription>Current category distribution.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {[
                      { label: "Authors", value: authorsCount, color: "bg-blue-500" },
                      { label: "Participants", value: participantCount, color: "bg-cyan-500" },
                      { label: "Students", value: studentsCount, color: "bg-purple-500" },
                    ].map((item) => {
                      const percentage = participantsList.length
                        ? (item.value / participantsList.length) * 100
                        : 0;

                      return (
                        <div key={item.label}>
                          <div className="mb-2 flex justify-between text-xs">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-slate-500">{item.value} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Editorial workload</CardTitle>
                    <CardDescription>Current assignments by role.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
                      <div>
                        <p className="text-sm font-semibold">Editors</p>
                        <p className="text-xs text-slate-400">Registered editorial leads</p>
                      </div>
                      <p className="text-2xl font-bold">{editors.length}</p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
                      <div>
                        <p className="text-sm font-semibold">Reviewers</p>
                        <p className="text-xs text-slate-400">Registered peer reviewers</p>
                      </div>
                      <p className="text-2xl font-bold">{reviewers.length}</p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
                      <div>
                        <p className="text-sm font-semibold">Unassigned papers</p>
                        <p className="text-xs text-slate-400">Awaiting editorial allocation</p>
                      </div>
                      <p className="text-2xl font-bold">{unassignedPapers.length}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl border-slate-200 shadow-sm">
  <CardHeader>
    <CardTitle className="text-base">Activity log</CardTitle>
    <CardDescription>
      A history of administrative and editorial activities.
    </CardDescription>
  </CardHeader>

  <CardContent>
    {auditLogs === undefined ? (
      <div className="py-12 text-center text-sm text-slate-400">
        Loading activity...
      </div>
    ) : auditLogs.length === 0 ? (
      <div className="flex flex-col items-center py-12 text-center">
        <LuActivity className="mb-3 text-slate-300" size={32} />

        <p className="text-sm font-semibold text-slate-700">
          No activity records available
        </p>

        <p className="mt-1 max-w-md text-xs leading-5 text-slate-400">
          Administrative and editorial activities will appear here
          as they happen.
        </p>
      </div>
    ) : (
      <div className="max-h-150 space-y-5 overflow-y-auto pr-2">
        {auditLogs.map((activity) => (
          <div
            key={activity._id}
            className="flex gap-3"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <LuActivity size={16} className="text-slate-600" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col justify-between gap-1 tablet:flex-row tablet:items-start">
                <p className="text-sm font-medium text-slate-800">
                  {activity.description}
                </p>

                <span className="shrink-0 text-[11px] text-slate-400">
                  {new Date(activity.createdAt).toLocaleString("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Africa/Lagos",
                  })}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-500">
                  {activity.actorName}
                </span>

                {activity.actorRole && (
                  <>
                    <span className="text-slate-300">·</span>
                    <span className="text-[11px] capitalize text-slate-400">
                      {activity.actorRole.replace("-", " ")}
                    </span>
                  </>
                )}

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] capitalize text-slate-500">
                  {activity.category}
                </span>
              </div>
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