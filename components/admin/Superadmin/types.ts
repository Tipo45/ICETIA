import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FunctionReturnType } from "convex/server";

export type PaperRow = {
    id: string;
    paperSource: "registration" | "call-for-papers";
    registrationId: Id<"registrations">;
    submittedPaperId?: Id<"submittedPapers">;
    registrationNumber: string;
    author: string;
    email: string;
    title: string;
    track: string;
    url?: string | null;
    source: "Registration" | "Call for Papers";
    status: string;
};



export type AssignmentData = FunctionReturnType<
  typeof api.registration.viewAssignments
>[number];

export type TeamRole = "super-admin" | "editor" | "reviewer";

export type EditorialRole = "editor" | "reviewer";

export type TeamMember = {
    id: Id<"users">;
    name: string;
    email: string;
    role: TeamRole | undefined;
    status: "active" | "inactive";
    createdAt: number;
};

export type EditorialMember = Omit<TeamMember, "role"> & {
    role: EditorialRole;
};

export type ParticipantData = FunctionReturnType<
    typeof api.registration.getParticipants
>;

export type Section =
    | "overview"
    | "participants"
    | "team"
    | "papers"
    | "assignments"
    | "reviews"
    | "reports";

export type Paper = {
    id: string;
    title: string;
}

