
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { LuDownload, LuSearch } from "react-icons/lu";

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

type Assignment = {
    id: string;
    paperId: string;
    editorId: string;
    reviewerIds: string[];
    deadline: string;
    status: "assigned" | "in_progress" | "completed";
};

type ParticipantData = FunctionReturnType<
    typeof api.registration.getParticipants
>;

interface PapersProps {
    papers: PaperRow[];
    assignments: Assignment[];
    unassignedPapers: PaperRow[];
    participants: ParticipantData | undefined;

    paperSearch: string;
    setPaperSearch: React.Dispatch<React.SetStateAction<string>>;

    paperStatusFilter: string;
    setPaperStatusFilter: React.Dispatch<React.SetStateAction<string>>;

    filteredPapers: PaperRow[];

    statusBadge: (status: string) => React.ReactNode;
}

export default function Papers({ papers,
    assignments,
    unassignedPapers,
    participants,
    paperSearch,
    setPaperSearch,
    paperStatusFilter,
    setPaperStatusFilter,
    filteredPapers,
    statusBadge, }: PapersProps) {
    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold text-slate-950">Paper Management</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Review all papers received through participant registration and the call for papers.
                </p>
            </div>

            <div className="grid gap-4 tablet:grid-cols-3 my-4">
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-xs text-slate-500">Total papers</p>
                        <p className="mt-2 text-2xl font-bold">{papers.length}</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-xs text-slate-500">Assigned papers</p>
                        <p className="mt-2 text-2xl font-bold">{assignments.length}</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                        <p className="text-xs text-slate-500">Awaiting assignment</p>
                        <p className="mt-2 text-2xl font-bold">{unassignedPapers.length}</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardHeader>
                    <div className="flex flex-col justify-between gap-3 tablet:flex-row tablet:items-center">
                        <div>
                            <CardTitle className="text-base">Submitted papers</CardTitle>
                            <CardDescription>
                                Search papers, view files and monitor their status.
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <div className="relative">
                                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                <Input
                                    value={paperSearch}
                                    onChange={(event) => setPaperSearch(event.target.value)}
                                    placeholder="Search papers..."
                                    className="pl-9 tablet:w-64"
                                />
                            </div>
                            <Select value={paperStatusFilter} onValueChange={setPaperStatusFilter}>
                                <SelectTrigger className="w-42.5">
                                    <SelectValue placeholder="All statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All statuses</SelectItem>
                                    <SelectItem value="submitted">Submitted</SelectItem>
                                    <SelectItem value="under_review">Under review</SelectItem>
                                    <SelectItem value="accepted">Accepted</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="revision_required">Revision required</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {participants === undefined ? (
                        <p className="py-10 text-center text-sm text-slate-400">Loading papers...</p>
                    ) : filteredPapers.length === 0 ? (
                        <p className="py-12 text-center text-sm text-slate-400">No matching papers found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Paper title</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Track</TableHead>
                                        <TableHead>Source</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Assignment</TableHead>
                                        <TableHead>File</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPapers.map((paper) => {
                                        const assignment = assignments.find((item) => item.paperId === paper.id);

                                        return (
                                            <TableRow key={paper.id}>
                                                <TableCell className="min-w-57.5">
                                                    <p className="font-semibold">{paper.title}</p>
                                                    <p className="mt-1 font-mono text-[10px] text-slate-400">
                                                        {paper.registrationNumber}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="whitespace-nowrap text-sm">{paper.author}</p>
                                                    <p className="text-xs text-slate-400">{paper.email}</p>
                                                </TableCell>
                                                <TableCell className="min-w-45 text-xs">{paper.track}</TableCell>
                                                <TableCell>
                                                    <span className="text-xs text-slate-500">{paper.source}</span>
                                                </TableCell>
                                                <TableCell>{statusBadge(paper.status)}</TableCell>
                                                <TableCell>
                                                    {assignment ? (
                                                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                                                            Assigned
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline">Unassigned</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {paper.url ? (
                                                        <a
                                                            href={paper.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                                                        >
                                                            <LuDownload size={14} />
                                                            Open file
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-slate-400">No file</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}