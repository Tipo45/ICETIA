
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Id } from "@/convex/_generated/dataModel";
import { LuActivity, LuFileCheck } from "react-icons/lu";
import { AssignmentData, PaperRow, Section, TeamMember } from "./types";



interface ReviewsandDecisionsProps {
    assignments: AssignmentData[];

    getMember: (id: Id<"users">) => TeamMember | undefined;

    statusBadge: (status: string) => React.ReactNode;

    setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
}

export default function ReviewsandDecisions({ assignments, getMember, statusBadge, setActiveSection }: ReviewsandDecisionsProps) {
    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold text-slate-950">Reviews & Decisions</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Monitor assigned reviews and prepare editorial decisions.
                </p>
            </div>

            <div className="grid gap-4 tablet:grid-cols-3 my-4">
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-xs text-slate-500">Assigned for review</p>
                        <p className="mt-2 text-2xl font-bold">{assignments.length}</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-xs text-slate-500">In progress</p>
                        <p className="mt-2 text-2xl font-bold">
                            {assignments.filter((item) => item.status === "under_review").length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-xs text-slate-500">Completed assignments</p>
                        <p className="mt-2 text-2xl font-bold">
                            {assignments.filter((item) => item.status === "completed").length}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-xl border-slate-200 shadow-sm mb-4">
                <CardHeader>
                    <CardTitle className="text-base">Review tracking</CardTitle>
                    <CardDescription>
                        Review progress for papers assigned to editors and reviewers.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {assignments.length === 0 ? (
                        <div className="py-16 text-center">
                            <LuFileCheck className="mx-auto mb-3 text-slate-300" size={34} />
                            <p className="font-semibold">No reviews to track yet</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Paper review records will appear here after assignments are created.
                            </p>
                            <Button
                                className="mt-4 bg-[#07111f]"
                                onClick={() => setActiveSection("assignments")}
                            >
                                Go to assignments
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Paper</TableHead>
                                        <TableHead>Editor</TableHead>
                                        <TableHead>Reviewers assigned</TableHead>
                                        <TableHead>Deadline</TableHead>
                                        <TableHead>Progress</TableHead>
                                        <TableHead>Decision</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assignments.map((assignment) => (
                                        <TableRow key={assignment._id}>
                                            <TableCell className="min-w-55 font-semibold">
                                                {assignment.paper?.paperTitle ?? "Paper unavailable"}
                                            </TableCell>
                                            <TableCell>{getMember(assignment.editorId)?.name ?? "—"}</TableCell>
                                            <TableCell>{assignment.reviewerIds.length}</TableCell>
                                            <TableCell className="whitespace-nowrap text-xs">
                                                {assignment.reviewDeadline
                                                    ? new Date(assignment.reviewDeadline).toLocaleDateString("en-NG")
                                                    : "Not set"}
                                            </TableCell>
                                            <TableCell>{statusBadge(assignment.status)}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">Pending decision</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-5">
                <div className="flex gap-3">
                    <LuActivity className="mt-0.5 shrink-0 text-cyan-700" size={20} />
                    <div>
                        <p className="text-sm font-semibold text-slate-900">
                            Review and decision workflow
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">
                            This section currently displays assignment progress. Reviewer comments,
                            review recommendations, decision letters and final acceptance or rejection
                            actions will need their own Convex records and mutations before they can
                            be saved or sent.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}