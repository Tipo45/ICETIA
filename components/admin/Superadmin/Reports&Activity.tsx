import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { LuActivity, LuClipboardList, LuFileText, LuUserRound, LuUsers } from "react-icons/lu";

type ParticipantData = FunctionReturnType<
    typeof api.registration.getParticipants
>;

type Assignment = {
    id: string;
    paperId: string;
    editorId: string;
    reviewerIds: string[];
    deadline: string;
    status: "assigned" | "in_progress" | "completed";
};

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
};

type EditorialMember = {
    id: string;
    name: string;
    email: string;
    role: "editor" | "reviewer";
    status: "active" | "inactive";
};

interface ReportsandActivityProps {
    participantsList: NonNullable<ParticipantData>; 
    totalPeople: number; 
    papers: PaperRow[]; 
    assignments: Assignment[]; 
    authorsCount: number; 
    participantCount: number; 
    studentsCount: number; 
    editors: EditorialMember[];
    reviewers: EditorialMember[];
    unassignedPapers: PaperRow[];
}

export default function ReportsandActivity ({ participantsList, totalPeople, papers, assignments, authorsCount, participantCount, studentsCount, editors, reviewers, unassignedPapers }: ReportsandActivityProps) {
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
                    Activity history will appear here when audit logging is connected.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center py-12 text-center">
                    <LuActivity className="mb-3 text-slate-300" size={32} />
                    <p className="text-sm font-semibold">No activity records available</p>
                    <p className="mt-1 max-w-md text-xs leading-5 text-slate-400">
                      A persistent activity log can record editor changes, paper assignments,
                      review submissions, decisions and email actions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
    )
}