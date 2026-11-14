"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import {
  LuActivity,
  LuClipboardList,
  LuFileCheck,
  LuFileText,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuRefreshCw,
  LuShieldCheck,
  LuUsers,
  LuUserRound,
  LuX,
} from "react-icons/lu";
import Overview from "@/components/admin/Superadmin/Overview";
import Participant from "@/components/admin/Superadmin/Participants";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import EditorsAndReviewers from "@/components/admin/Superadmin/Editors&Reviewers";
import Papers from "@/components/admin/Superadmin/Papers";
import PaperAssignments from "@/components/admin/Superadmin/PaperAssignments";
import ReviewsandDecisions from "@/components/admin/Superadmin/Reviews&Decisions";
import ReportsandActivity from "@/components/admin/Superadmin/Reports&Activity";
import { useAuthActions } from "@convex-dev/auth/react";
import { getErrorMessage } from "@/components/lib/error-handler";

type Section =
  | "overview"
  | "participants"
  | "team"
  | "papers"
  | "assignments"
  | "reviews"
  | "reports";

type TeamRole = "editor" | "reviewer";

type TeamMember = {
  id: Id<"users">;
  name: string;
  email: string;
  role: "editor" | "reviewer";
  status: "active" | "inactive";
};

type PaperRow = {
  id: string;
  registrationId: Id<"registrations">;
  registrationNumber: string;
  author: string;
  email: string;
  title: string;
  track: string;
  url?: string | null;
  source: string;
  status: string;
};

type Assignment = {
  id: Id<"paperAssignments">;
  paperId: string;
  editorId: string;
  reviewerIds: string[];
  deadline: string;
  status: "assigned" | "in_progress" | "completed";
};


const navigation: {
  label: string;
  value: Section;
  icon: React.ElementType;
  group: string;
}[] = [
    { label: "Overview", value: "overview", icon: LuLayoutDashboard, group: "Workspace" },
    { label: "Participants", value: "participants", icon: LuUsers, group: "Workspace" },
    { label: "Papers", value: "papers", icon: LuFileText, group: "Editorial" },
    { label: "Editors & Reviewers", value: "team", icon: LuUserRound, group: "Editorial" },
    { label: "Paper Assignments", value: "assignments", icon: LuClipboardList, group: "Editorial" },
    { label: "Reviews & Decisions", value: "reviews", icon: LuFileCheck, group: "Editorial" },
    { label: "Reports & Activity", value: "reports", icon: LuActivity, group: "Administration" },
  ];

export default function SuperAdminPage() {
  const admin = useQuery(api.registration.getCurrentAdmin);
  const router = useRouter();
  const paperTracks = [
    "Cybersecurity, Privacy & Digital Trust",
    "Artificial Intelligence and Machine Learning",
    "Smart Systems, Internet of Things and Embedded Computing",
    "Computing, Cloud, Edge and Distributed Systems",
    "Data Science, Analytics and Big Data",
    "Software Development",
    "Health Informatics, Digital Health and Medical Laboratory Technology",
    "Emerging Technologies and Digital Transformation",
    "Computing for Sustainable Development",
    "Information Systems, Governance and Society",
  ];
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [isLoggingOut, setIsLoggingOut] = useState(false);


  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<
    "author" | "participant" | "student" | undefined
  >();
  const [selectedTrack, setSelectedTrack] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  // Editorial UI state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState<TeamRole>("editor");

  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [selectedPaperId, setSelectedPaperId] = useState("");
  const [selectedEditorId, setSelectedEditorId] = useState("");
  const [selectedReviewerIds, setSelectedReviewerIds] = useState<string[]>([]);
  const [assignmentDeadline, setAssignmentDeadline] = useState("");


  const toggleReviewer = (id: string) => {
    setSelectedReviewerIds((current) =>
      current.includes(id)
        ? current.filter((reviewerId) => reviewerId !== id)
        : [...current, id]
    );
  };

  const saveMember = useMutation(api.registration.handleSaveMember);
  const updateMember = useMutation(api.registration.updateTeamMember);
  const saveAssignment = useMutation(
    api.registration.handleSaveAssignment
  );

  const editAssignment = useMutation(
    api.registration.updateAssignment
  );

  const assignmentss = useQuery(
    api.registration.viewAssignments,
    {}
  );

  const handleSaveMember = async () => {
    if (!memberName.trim() || !memberEmail.trim()) {
      toast.error("Name and email address are required.");
      return;
    }

    if (!memberRole) {
      toast.error("Please select a role.");
      return;
    }

    try {
      if (editingMember) {
        await updateMember({
          memberId: editingMember.id as Id<"users">,
          name: memberName.trim(),
          email: memberEmail.trim(),
          role: memberRole,
        });

        toast.success("Team member updated.");
      } else {
        await saveMember({
          name: memberName.trim(),
          email: memberEmail.trim(),
          role: memberRole,
        });

        toast.success(
          `${memberRole === "editor" ? "Editor" : "Reviewer"} added.`
        );
      }

      setTeamDialogOpen(false);
      resetTeamForm();

    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleCreateAssignment = async () => {
    if (!selectedPaperId || !selectedEditorId || selectedReviewerIds.length === 0) {
      toast.error("Select a paper, an editor and at least one reviewer.");
      return;
    }

    if (!assignmentDeadline) {
      toast.error("Please select a review deadline.");
      return;
    }

    try {
      const reviewDeadline = new Date(assignmentDeadline).getTime();

      if (Number.isNaN(reviewDeadline) || reviewDeadline <= Date.now()) {
        toast.error("Please select a valid future review deadline.");
        return;
      }

      await saveAssignment({
        paperId: selectedPaperId as Id<"submittedPapers">,
        editorId: selectedEditorId as Id<"users">,
        reviewerIds: selectedReviewerIds as Id<"users">[],
        status: "editor_assigned",
        reviewDeadline,
      });

      setAssignmentDialogOpen(false);

      setSelectedPaperId("");
      setSelectedEditorId("");
      setSelectedReviewerIds([]);
      setAssignmentDeadline("");

      toast.success("Paper assignment created successfully.");

    } catch (error) {
      console.error("Assignment creation failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create paper assignment. Please try again."
      );
    }
  };

  const handleUpdateAssignment = () => { };

  const [paperSearch, setPaperSearch] = useState("");
  const [paperStatusFilter, setPaperStatusFilter] = useState("all");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin/login/super-admin");
    }
  }, [isAuthenticated, isLoading, router]);

  const participants = useQuery(api.registration.getParticipants, {
    search: search || undefined,
    category,
    paperTrack: selectedTrack,
    country: country || undefined,
    paymentDate: paymentDate
      ? new Date(paymentDate).getTime()
      : undefined,
  });

  const participantsList = participants ?? [];

  const totalPeople = participantsList.reduce(
    (total, participant) =>
      total + 1 + (participant.coAuthors?.length ?? 0),
    0
  );

  const authorsCount = participantsList.filter(
    (participant) => participant.category === "author"
  ).length;

  const studentsCount = participantsList.filter(
    (participant) => participant.category === "student"
  ).length;

  const participantCount = participantsList.filter(
    (participant) => participant.category === "participant"
  ).length;

  const paidCount = participantsList.filter(
    (participant) => participant.paymentStatus === "paid"
  ).length;

  // Build a unified paper list from the paper data already returned
  // by getParticipants.
  const papers = useMemo(() => {
    const result: PaperRow[] = [];

    for (const participant of participantsList) {
      if (
        participant.registrationPaper?.paperTitle &&
        participant.registrationPaper?.paperTrack
      ) {
        result.push({
          id: `${participant._id}-registration`,
          registrationId: participant._id,
          registrationNumber: participant.registrationNumber,
          author: `${participant.firstName} ${participant.lastName}`,
          email: participant.email,
          title: participant.registrationPaper.paperTitle,
          track: participant.registrationPaper.paperTrack,
          url: participant.registrationPaper.paperUrl,
          source: "Registration",
          status: "submitted",
        });
      }

      for (const paper of participant.submittedPapers ?? []) {
        result.push({
          id: paper._id,
          registrationId: participant._id,
          registrationNumber: participant.registrationNumber,
          author: `${participant.firstName} ${participant.lastName}`,
          email: participant.email,
          title: paper.paperTitle,
          track: paper.paperTrack,
          url: paper.paperUrl,
          source: "Call for Papers",
          status: paper.status,
        });
      }
    }

    return result;
  }, [participantsList]);

  const assignedPaperIds = assignments.map((item) => item.paperId);
  const unassignedPapers = papers.filter(
    (paper) => !assignedPaperIds.includes(paper.id)
  );

  const editors = teamMembers.filter((member) => member.role === "editor");
  const reviewers = teamMembers.filter((member) => member.role === "reviewer");

  const activeEditors = editors.filter((member) => member.status === "active");
  const activeReviewers = reviewers.filter((member) => member.status === "active");

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(paperSearch.toLowerCase()) ||
      paper.author.toLowerCase().includes(paperSearch.toLowerCase()) ||
      paper.registrationNumber.toLowerCase().includes(paperSearch.toLowerCase());

    const matchesStatus =
      paperStatusFilter === "all" || paper.status === paperStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await signOut();

      router.replace("/admin/login/super-admin");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const resetTeamForm = () => {
    setEditingMember(null);
    setMemberName("");
    setMemberEmail("");
    setMemberRole("editor");
  };

  const openAddMember = (role: TeamRole) => {
    resetTeamForm();
    setMemberRole(role);
    setTeamDialogOpen(true);
  };


  const getPaper = (id: string) => papers.find((paper) => paper.id === id);
  const getMember = (id: string) => teamMembers.find((member) => member.id === id);

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      submitted: "bg-blue-50 text-blue-700 border-blue-200",
      under_review: "bg-amber-50 text-amber-700 border-amber-200",
      accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
      revision_required: "bg-purple-50 text-purple-700 border-purple-200",
      assigned: "bg-blue-50 text-blue-700 border-blue-200",
      in_progress: "bg-amber-50 text-amber-700 border-amber-200",
      completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };

    return (
      <Badge
        variant="outline"
        className={`rounded-md font-medium ${styles[status] ?? "bg-slate-50 text-slate-600"}`}
      >
        {status.replaceAll("_", " ")}
      </Badge>
    );
  };


  if (!isAuthenticated || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">
        <div className="text-center">
          <LuRefreshCw className="mx-auto h-7 w-7 animate-spin text-cyan-400" />
          <p className="mt-4 text-sm text-slate-300">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  const Sidebar = () => (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col border-r border-white/10 bg-[#07111f] text-white transition-transform duration-300 xl:translate-x-0 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex h-20.5 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-sm font-black text-[#07111f]">
          IC
        </div>
        <div>
          <p className="text-sm font-bold tracking-wide">ICETIA 2027</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
            Admin workspace
          </p>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="ml-auto text-slate-400 xl:hidden"
          aria-label="Close navigation"
        >
          <LuX size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {["Workspace", "Editorial", "Administration"].map((group) => (
          <div key={group} className="mb-7">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {group}
            </p>

            <nav className="space-y-1">
              {navigation
                .filter((item) => item.group === group)
                .map((item) => {
                  const Icon = item.icon;
                  const active = activeSection === item.value;

                  return (
                    <button
                      key={item.value}
                      onClick={() => {
                        setActiveSection(item.value);
                        setMobileSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${active
                        ? "bg-cyan-400 font-semibold text-[#07111f]"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <Icon size={17} />
                      <span>{item.label}</span>

                      {item.value === "assignments" && unassignedPapers.length > 0 && (
                        <span className="ml-auto rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                          {unassignedPapers.length}
                        </span>
                      )}
                    </button>
                  );
                })}
            </nav>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <LuShieldCheck className="text-cyan-400" size={18} />
            <span className="text-xs font-semibold">Super Administrator</span>
          </div>
          <p className="mt-1 text-[10px] text-slate-500">
            ICETIA Editorial Management
          </p>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
        >
          {isLoggingOut ? "Logging out..." : <><LuLogOut size={17} />
            Sign out</>}
        </button>
      </div>
    </aside>
  );

  const sectionTitle = navigation.find(
    (item) => item.value === activeSection
  )?.label;


  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <Sidebar />

      {mobileSidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 xl:hidden"
        />
      )}

      <div className="min-h-screen xl:pl-67.5">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-19 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 xl:hidden"
              aria-label="Open navigation"
            >
              <LuMenu size={20} />
            </button>

            <div>
              <p className="text-xs text-slate-400">ICETIA 2027 / Admin</p>
              <h1 className="text-sm font-bold text-slate-900">
                {sectionTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right tablet:block">
              <p className="text-xs font-semibold text-slate-800">
                Admin Office
              </p>
              <p className="text-[10px] text-slate-400">
                ICETIA
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#07111f] text-xs font-bold text-cyan-400">
              {admin?.name?.split(" ").map((word) => word.charAt(0).toUpperCase()).join("")}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-7 px-5 py-7 lg:px-8 lg:py-9">
          {/* ==========================================
              OVERVIEW
          ========================================== */}

          {activeSection === "overview" && (
            <Overview
              participants={participants}
              papers={papers}
              editors={editors}
              reviewers={reviewers}
              assignments={assignments}
              unassignedPapers={unassignedPapers}
              authorsCount={authorsCount}
              studentsCount={studentsCount}
              paidCount={paidCount}
              totalPeople={totalPeople}
              activeEditors={activeEditors}
              activeReviewers={activeReviewers}
              setActiveSection={setActiveSection}
              openAddMember={openAddMember}
              statusBadge={statusBadge}
              editingMember={editingMember}
              setEditingMember={setEditingMember}
              teamDialogOpen={teamDialogOpen}
              setTeamDialogOpen={setTeamDialogOpen}
              memberName={memberName}
              setMemberName={setMemberName}
              memberEmail={memberEmail}
              setMemberEmail={setMemberEmail}
              memberRole={memberRole}
              setMemberRole={setMemberRole}
              handleSaveMember={handleSaveMember}
            />
          )}

          {/* ==========================================
              PARTICIPANTS
          ========================================== */}

          {activeSection === "participants" && (
            <Participant
              participants={participants}
              participantsList={participantsList}
              paperTracks={paperTracks}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
              category={category}
              setCategory={setCategory}
              country={country}
              setCountry={setCountry}
              paymentDate={paymentDate}
              setPaymentDate={setPaymentDate}
              setSearch={setSearch}
              authorsCount={authorsCount}
              participantCount={participantCount}
              studentsCount={studentsCount}
            />
          )}

          {/* ==========================================
              EDITORS & REVIEWERS
          ========================================== */}

          {activeSection === "team" && (
            <EditorsAndReviewers
              editors={editors}
              reviewers={reviewers}
              teamMembers={teamMembers}
              setTeamMembers={setTeamMembers}
              assignments={assignments}
              openAddMember={openAddMember}
              editingMember={editingMember}
              setEditingMember={setEditingMember}
              teamDialogOpen={teamDialogOpen}
              setTeamDialogOpen={setTeamDialogOpen}
              memberName={memberName}
              setMemberName={setMemberName}
              memberEmail={memberEmail}
              setMemberEmail={setMemberEmail}
              memberRole={memberRole}
              setMemberRole={setMemberRole}
              handleSaveMember={handleSaveMember} />
          )}

          {/* ==========================================
              PAPER MANAGEMENT
          ========================================== */}

          {activeSection === "papers" && (
            <Papers
              papers={papers}
              assignments={assignments}
              unassignedPapers={unassignedPapers}
              participants={participants}
              paperSearch={paperSearch}
              setPaperSearch={setPaperSearch}
              paperStatusFilter={paperStatusFilter}
              setPaperStatusFilter={setPaperStatusFilter}
              filteredPapers={filteredPapers}
              statusBadge={statusBadge}
            />
          )}

          {/* ==========================================
              PAPER ASSIGNMENTS
          ========================================== */}

          {activeSection === "assignments" && (
            <PaperAssignments
              papers={papers}
              assignments={assignments}
              unassignedPapers={unassignedPapers}
              setAssignmentDialogOpen={setAssignmentDialogOpen}
              assignmentDialogOpen={assignmentDialogOpen}
              setSelectedPaperId={setSelectedPaperId}
              selectedPaperId={selectedPaperId}
              selectedEditorId={selectedEditorId}
              setSelectedEditorId={setSelectedEditorId}
              activeEditors={activeEditors}
              activeReviewers={activeReviewers}
              selectedReviewerIds={selectedReviewerIds}
              toggleReviewer={toggleReviewer}
              assignmentDeadline={assignmentDeadline}
              setAssignmentDeadline={setAssignmentDeadline}
              handleCreateAssignment={handleCreateAssignment}
              getPaper={getPaper}
              getMember={getMember}
              statusBadge={statusBadge}
            />
          )}

          {/* ==========================================
              REVIEWS & DECISIONS
          ========================================== */}

          {activeSection === "reviews" && (
            <ReviewsandDecisions
              assignments={assignments}
              getPaper={getPaper}
              getMember={getMember}
              setActiveSection={setActiveSection}
              statusBadge={statusBadge}
            />
          )}

          {/* ==========================================
              REPORTS & ACTIVITY
          ========================================== */}

          {activeSection === "reports" && (
            <ReportsandActivity
              participantsList={participantsList}
              totalPeople={totalPeople}
              papers={papers}
              assignments={assignments}
              authorsCount={authorsCount}
              participantCount={participantCount}
              studentsCount={studentsCount}
              editors={editors}
              reviewers={reviewers}
              unassignedPapers={unassignedPapers}
            />
          )}
        </main>
      </div>

    </div>
  );
}
