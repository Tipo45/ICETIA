"use client"

import { getErrorMessage } from "@/components/lib/error-handler";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { LuClipboardList, LuPlus } from "react-icons/lu";
import { toast } from "sonner";

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
  id: Id<"paperAssignments">;
  paperId: string;
  editorId: string;
  reviewerIds: string[];
  deadline: string;
  status: "assigned" | "in_progress" | "completed";
};

type TeamMember = {
  id: Id<"users">;
  name: string;
  email: string;
  role: "editor" | "reviewer";
  status: "active" | "inactive";
};

interface PaperAssignmentsProps {
  papers: PaperRow[];
  assignments: Assignment[];
  unassignedPapers: PaperRow[];

  setAssignmentDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  assignmentDialogOpen: boolean;

  setSelectedPaperId: React.Dispatch<React.SetStateAction<string>>;
  selectedPaperId: string;

  selectedEditorId: string;
  setSelectedEditorId: React.Dispatch<React.SetStateAction<string>>;

  activeEditors: TeamMember[];
  activeReviewers: TeamMember[];

  selectedReviewerIds: string[];
  toggleReviewer: (id: string) => void;

  assignmentDeadline: string;
  setAssignmentDeadline: React.Dispatch<React.SetStateAction<string>>;

  handleCreateAssignment: () => void;

  getPaper: (paperId: string) => PaperRow | undefined;
  getMember: (memberId: string) => TeamMember | undefined;
  statusBadge: (status: string) => React.ReactNode;
}

export default function PaperAssignments({
  papers,
  assignments,
  unassignedPapers,
  setAssignmentDialogOpen,
  assignmentDialogOpen,
  setSelectedPaperId,
  selectedPaperId,
  selectedEditorId,
  setSelectedEditorId,
  activeEditors,
  activeReviewers,
  selectedReviewerIds,
  toggleReviewer,
  assignmentDeadline,
  setAssignmentDeadline,
  handleCreateAssignment,
  getPaper,
  getMember,
  statusBadge }: PaperAssignmentsProps) {

  const handleDeleteAssignment = useMutation(api.registration.deleteAssignments);

  const deleteAssignment = async (id: Id<"paperAssignments">) => {
    try {
      await handleDeleteAssignment({ assignmentId: id });
      toast.success("Team member removed.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 tablet:flex-row tablet:items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">Paper Assignments</h2>
          <p className="mt-2 text-sm text-slate-500">
            Allocate papers to editors and reviewers and set review deadlines.
          </p>
        </div>
        <Button
          onClick={() => setAssignmentDialogOpen(true)}
          className="bg-[#07111f] hover:bg-slate-800"
          disabled={papers.length === 0}
        >
          <LuPlus className="mr-2" size={15} />
          New assignment
        </Button>
      </div>

      <div className="grid gap-4 tablet:grid-cols-3 my-4">
        {[
          { label: "Total assignments", value: assignments.length },
          { label: "Awaiting review", value: assignments.filter((item) => item.status === "assigned").length },
          { label: "Completed", value: assignments.filter((item) => item.status === "completed").length },
        ].map((item) => (
          <Card key={item.label} className="rounded-xl border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-xl border-slate-200 shadow-sm my-4">
        <CardHeader>
          <CardTitle className="text-base">Assignment register</CardTitle>
          <CardDescription>
            Each assignment connects one paper to an editor and one or more reviewers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <div className="py-16 text-center">
              <LuClipboardList className="mx-auto mb-3 text-slate-300" size={34} />
              <p className="font-semibold">No paper assignments yet</p>
              <p className="mt-1 text-sm text-slate-400">
                Start by assigning a submitted paper to an editor and reviewers.
              </p>
              <Button
                className="mt-4 bg-[#07111f]"
                onClick={() => setAssignmentDialogOpen(true)}
                disabled={papers.length === 0}
              >
                <LuPlus className="mr-2" size={15} />
                Create assignment
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paper</TableHead>
                    <TableHead>Editor</TableHead>
                    <TableHead>Reviewers</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => {
                    const paper = getPaper(assignment.paperId);
                    const editor = getMember(assignment.editorId);

                    return (
                      <TableRow key={assignment.id}>
                        <TableCell className="min-w-55">
                          <p className="font-semibold">{paper?.title ?? "Paper unavailable"}</p>
                          <p className="text-xs text-slate-400">{paper?.track}</p>
                        </TableCell>
                        <TableCell>{editor?.name ?? "Unavailable"}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {assignment.reviewerIds.map((id) => (
                              <span key={id} className="text-xs">
                                {getMember(id)?.name ?? "Unavailable"}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-xs">
                          {new Date(assignment.deadline).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{statusBadge(assignment.status)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Papers awaiting assignment</CardTitle>
          <CardDescription>
            These papers do not currently have an assignment in this dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {unassignedPapers.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              There are no unassigned papers in the current results.
            </p>
          ) : (
            <div className="space-y-3">
              {unassignedPapers.slice(0, 8).map((paper) => (
                <div key={paper.id} className="flex flex-col justify-between gap-3 rounded-lg border border-slate-100 p-4 tablet:flex-row tablet:items-center">
                  <div>
                    <p className="text-sm font-semibold">{paper.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {paper.author} · {paper.track}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedPaperId(paper.id);
                      setAssignmentDialogOpen(true);
                    }}
                  >
                    Assign paper
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={assignmentDialogOpen} onOpenChange={setAssignmentDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto tablet:max-w-162.5">
          <DialogHeader>
            <DialogTitle>Assign paper to editorial team</DialogTitle>
            <DialogDescription>
              Select the submitted paper, its handling editor, reviewers and review deadline.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label>Submitted paper *</Label>
              <Select value={selectedPaperId} onValueChange={setSelectedPaperId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a paper" />
                </SelectTrigger>
                <SelectContent>
                  {unassignedPapers.map((paper) => (
                    <SelectItem key={paper.id} value={paper.id}>
                      {paper.title.length > 75
                        ? `${paper.title.slice(0, 75)}...`
                        : paper.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {unassignedPapers.length === 0 && (
                <p className="text-xs text-amber-600">
                  No unassigned papers are currently available.
                </p>
              )}
            </div>

            {selectedPaperId && (
              <div className="rounded-lg border border-cyan-100 bg-cyan-50/60 p-3">
                <p className="text-xs font-semibold text-slate-800">
                  {getPaper(selectedPaperId)?.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {getPaper(selectedPaperId)?.track}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label>Handling editor *</Label>
              <Select value={selectedEditorId} onValueChange={setSelectedEditorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an editor" />
                </SelectTrigger>
                <SelectContent>
                  {activeEditors.map((editor) => (
                    <SelectItem key={editor.id} value={editor.id}>
                      {editor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {activeEditors.length === 0 && (
                <p className="text-xs text-amber-600">
                  Add an active editor before creating an assignment.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Assign reviewers *</Label>
              <p className="text-xs text-slate-400">
                Select one or more reviewers for this paper.
              </p>

              {activeReviewers.length === 0 ? (
                <p className="rounded-lg border border-dashed p-4 text-center text-xs text-slate-400">
                  No active reviewers available. Add reviewers first.
                </p>
              ) : (
                <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-slate-200 p-3">
                  {activeReviewers.map((reviewer) => (
                    <label
                      key={reviewer.id}
                      className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedReviewerIds.includes(reviewer.id)}
                        onChange={() => toggleReviewer(reviewer.id)}
                        className="h-4 w-4 accent-cyan-600"
                      />
                    </label>
                  ))}
                </div>
              )}
              <p className="text-xs text-slate-500">
                {selectedReviewerIds.length} reviewer(s) selected
              </p>
            </div>

            <div className="space-y-2">
              <Label>Review deadline *</Label>
              <Input
                type="date"
                value={assignmentDeadline}
                onChange={(event) => setAssignmentDeadline(event.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateAssignment}
              className="bg-[#07111f] hover:bg-slate-800"
              disabled={activeEditors.length === 0 || activeReviewers.length === 0 || unassignedPapers.length === 0}
            >
              Create assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}