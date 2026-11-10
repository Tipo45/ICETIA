"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { LuPlus, LuSearch, LuUsers } from "react-icons/lu";
import { toast } from "sonner";

type TeamMember = {
    id: string;
    name: string;
    email: string;
    role: "editor" | "reviewer";
    status: "active" | "inactive";
};

type TeamRole = "editor" | "reviewer";

type Assignment = {
    id: string;
    paperId: string;
    editorId: string;
    reviewerIds: string[];
    deadline: string;
    status: "assigned" | "in_progress" | "completed";
};

interface EditorsAndReviewersProps {
    teamMembers: TeamMember[];
    setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;

    editors: TeamMember[];
    reviewers: TeamMember[];
    assignments: Assignment[];
    openAddMember: (role: TeamRole) => void;

    editingMember: TeamMember | null;
    setEditingMember: React.Dispatch<React.SetStateAction<TeamMember | null>>;
    teamDialogOpen: boolean;
    setTeamDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function EditorsAndReviewers({ teamMembers, setTeamMembers, editors, reviewers, assignments, openAddMember, editingMember, setEditingMember, teamDialogOpen, setTeamDialogOpen }: EditorsAndReviewersProps) {

    const [teamSearch, setTeamSearch] = useState("");
    const [teamRoleFilter, setTeamRoleFilter] = useState("all");
    const [memberName, setMemberName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [memberRole, setMemberRole] = useState<TeamRole>("editor");
    const filteredTeam = teamMembers.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
            member.email.toLowerCase().includes(teamSearch.toLowerCase());

        const matchesRole =
            teamRoleFilter === "all" || member.role === teamRoleFilter;

        return matchesSearch && matchesRole;
    });

    const openEditMember = (member: TeamMember) => {
        setEditingMember(member);
        setMemberName(member.name);
        setMemberEmail(member.email);
        setMemberRole(member.role);
        setTeamDialogOpen(true);
    };

    const toggleMemberStatus = (id: string) => {
        setTeamMembers((current) =>
            current.map((member) =>
                member.id === id
                    ? {
                        ...member,
                        status: member.status === "active" ? "inactive" : "active",
                    }
                    : member
            )
        );
    };

    const resetTeamForm = () => {
        setEditingMember(null);
        setMemberName("");
        setMemberEmail("");
        setMemberRole("editor");
    };


    const deleteMember = (id: string) => {
        setTeamMembers((current) => current.filter((member) => member.id !== id));
        toast.success("Team member removed.");
    };

    const handleSaveMember = () => {
        if (!memberName.trim() || !memberEmail.trim()) {
            toast.error("Name and email address are required.");
            return;
        }

        if (editingMember) {
            setTeamMembers((current) =>
                current.map((member) =>
                    member.id === editingMember.id
                        ? {
                            ...member,
                            name: memberName,
                            email: memberEmail,
                            role: memberRole,
                        }
                        : member
                )
            );

            toast.success("Team member updated.");
        } else {
            const newMember: TeamMember = {
                id: crypto.randomUUID(),
                name: memberName,
                email: memberEmail,
                role: memberRole,
                status: "active",
            };

            setTeamMembers((current) => [...current, newMember]);
            toast.success(`${memberRole === "editor" ? "Editor" : "Reviewer"} added.`);
        }

        setTeamDialogOpen(false);
        resetTeamForm();
    };

    return (
        <div>
            <div className="flex flex-col justify-between gap-4 tablet:flex-row tablet:items-end">
                <div>
                    <h2 className="text-2xl font-bold text-slate-950">Editors & Reviewers</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Manage the editorial team responsible for handling submitted papers.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 my-4">
                    <Button
                        variant="outline"
                        onClick={() => openAddMember("reviewer")}
                    >
                        <LuPlus className="mr-2" size={15} />
                        Add reviewer
                    </Button>
                    <Button
                        onClick={() => openAddMember("editor")}
                        className="bg-[#07111f] hover:bg-slate-800"
                    >
                        <LuPlus className="mr-2" size={15} />
                        Add editor
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 tablet:grid-cols-2 2xl:grid-cols-4 my-4">
                {[
                    { label: "Total team members", value: teamMembers.length },
                    { label: "Editors", value: editors.length },
                    { label: "Reviewers", value: reviewers.length },
                    { label: "Active members", value: teamMembers.filter((member) => member.status === "active").length },
                ].map((item) => (
                    <Card key={item.label} className="rounded-xl border-slate-200 shadow-sm">
                        <CardContent className="p-5">
                            <p className="text-xs text-slate-500">{item.label}</p>
                            <p className="mt-2 text-2xl font-bold">{item.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardHeader>
                    <div className="flex flex-col justify-between gap-3 tablet:flex-row tablet:items-center">
                        <div>
                            <CardTitle className="text-base">Editorial team directory</CardTitle>
                            <CardDescription>
                                View, update and manage your editors and reviewers.
                            </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <div className="relative">
                                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                <Input
                                    value={teamSearch}
                                    onChange={(event) => setTeamSearch(event.target.value)}
                                    placeholder="Search team..."
                                    className="pl-9 tablet:w-56"
                                />
                            </div>
                            <Select value={teamRoleFilter} onValueChange={setTeamRoleFilter}>
                                <SelectTrigger className="w-37.5">
                                    <SelectValue placeholder="All roles" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All roles</SelectItem>
                                    <SelectItem value="editor">Editors</SelectItem>
                                    <SelectItem value="reviewer">Reviewers</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {filteredTeam.length === 0 ? (
                        <div className="py-16 text-center">
                            <LuUsers className="mx-auto mb-3 text-slate-300" size={32} />
                            <p className="font-semibold">No team members added yet</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Add editors and reviewers to begin organising the review process.
                            </p>
                            <button onClick={() => openAddMember("editor")}
                                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#07111f] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#10243b] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                            >
                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400 transition-colors group-hover:bg-cyan-500 group-hover:text-white">
                                    <LuPlus size={16} />
                                </span>
                                Create assignment
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Team member</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Workload</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTeam.map((member) => {
                                        const workload = assignments.filter((assignment) =>
                                            member.role === "editor"
                                                ? assignment.editorId === member.id
                                                : assignment.reviewerIds.includes(member.id)
                                        ).length;

                                        return (
                                            <TableRow key={member.id}>
                                                <TableCell>
                                                    <p className="font-semibold">{member.name}</p>
                                                    <p className="text-xs text-slate-400">{member.email}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={member.role === "editor" ? "border-blue-200 bg-blue-50 text-blue-700" : "border-purple-200 bg-purple-50 text-purple-700"}>
                                                        {member.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-semibold">{workload}</span>
                                                    <span className="ml-1 text-xs text-slate-400">papers</span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={member.status === "active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-500"}>
                                                        {member.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <FiMoreHorizontal size={18} />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => openEditMember(member)}>
                                                                Edit member
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => toggleMemberStatus(member.id)}>
                                                                {member.status === "active" ? "Deactivate" : "Activate"}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-red-600"
                                                                onClick={() => deleteMember(member.id)}
                                                            >
                                                                Remove member
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
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

            <Dialog
                open={teamDialogOpen}
                onOpenChange={(open) => {
                    setTeamDialogOpen(open);
                    if (!open) resetTeamForm();
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto tablet:max-w-130">
                    <DialogHeader>
                        <DialogTitle>
                            {editingMember ? "Edit team member" : "Add editorial team member"}
                        </DialogTitle>
                        <DialogDescription>
                            Enter the member's details and select their editorial role.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label>Full name *</Label>
                            <Input
                                value={memberName}
                                onChange={(event) => setMemberName(event.target.value)}
                                placeholder="Enter full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Email address *</Label>
                            <Input
                                type="email"
                                value={memberEmail}
                                onChange={(event) => setMemberEmail(event.target.value)}
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Editorial role *</Label>
                            <Select
                                value={memberRole}
                                onValueChange={(value) => setMemberRole(value as TeamRole)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="editor">Editor</SelectItem>
                                    <SelectItem value="reviewer">Reviewer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setTeamDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveMember} className="bg-[#07111f] hover:bg-slate-800">
                            {editingMember ? "Save changes" : "Add team member"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}