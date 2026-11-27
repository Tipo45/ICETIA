
"use client";

import { useMemo, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LuArrowUpRight, LuBell, LuBookOpen, LuChevronRight, LuCircleAlert, LuCircleCheck, LuClipboardCheck, LuClock3, LuEye, LuFileText, LuLayoutDashboard, LuLogOut, LuMenu, LuSearch, LuUserRound, LuUsers } from "react-icons/lu";

type Page =
    | "overview"
    | "papers"
    | "progress"
    | "notifications"
    | "profile";

type PaperStatus =
    | "awaiting_reviewers"
    | "under_review"
    | "review_completed"
    | "revision_required";

type Paper = {
    _id: string;
    title: string;
    track: string;
    paperSource: "registration" | "call-for-papers";
    author: string;
    assignedDate: string;
    deadline: string;
    status: PaperStatus;
    reviewers: {
        name: string;
        status: "pending" | "accepted" | "completed";
    }[];
};

const initialPapers: Paper[] = [
    {
        _id: "1",
        title: "AI-Driven Healthcare Systems for Predictive Diagnosis",
        track: "Artificial Intelligence & Machine Learning",
        paperSource: "registration",
        author: "John Anderson",
        assignedDate: "20 Nov 2026",
        deadline: "10 Dec 2026",
        status: "under_review",
        reviewers: [
            { name: "Dr. Michael James", status: "completed" },
            { name: "Prof. Sarah Williams", status: "accepted" },
        ],
    },
    {
        _id: "2",
        title: "Blockchain Security Framework for Digital Transactions",
        track: "Cybersecurity, Privacy & Digital Trust",
        paperSource: "call-for-papers",
        author: "Mary Johnson",
        assignedDate: "21 Nov 2026",
        deadline: "12 Dec 2026",
        status: "awaiting_reviewers",
        reviewers: [],
    },
    {
        _id: "3",
        title: "Smart IoT Applications in Modern Agriculture",
        track: "Internet of Things",
        paperSource: "registration",
        author: "David Brown",
        assignedDate: "22 Nov 2026",
        deadline: "15 Dec 2026",
        status: "review_completed",
        reviewers: [
            { name: "Dr. Peter Adams", status: "completed" },
            { name: "Dr. Grace Okoro", status: "completed" },
        ],
    },
    {
        _id: "4",
        title: "Cloud Computing and Scalable Data Infrastructure",
        track: "Cloud Computing & Distributed Systems",
        paperSource: "call-for-papers",
        author: "Elizabeth Wilson",
        assignedDate: "23 Nov 2026",
        deadline: "18 Dec 2026",
        status: "revision_required",
        reviewers: [
            { name: "Dr. Michael James", status: "completed" },
            { name: "Prof. Sarah Williams", status: "completed" },
        ],
    },
];

const notifications = [
    {
        id: 1,
        title: "New paper assigned",
        message: "You have been assigned a new paper on Blockchain Security.",
        time: "Today",
        type: "assignment",
        unread: true,
    },
    {
        id: 2,
        title: "Review completed",
        message: "Dr. Michael James has submitted a review.",
        time: "Yesterday",
        type: "review",
        unread: true,
    },
    {
        id: 3,
        title: "Upcoming deadline",
        message: "A paper review deadline is approaching.",
        time: "2 days ago",
        type: "deadline",
        unread: false,
    },
];

const statusConfig: Record<
    PaperStatus,
    { label: string; className: string }
> = {
    awaiting_reviewers: {
        label: "Awaiting reviewers",
        className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    under_review: {
        label: "Under review",
        className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    review_completed: {
        label: "Review completed",
        className: "bg-green-500/10 text-green-600 border-green-500/20",
    },
    revision_required: {
        label: "Revision required",
        className: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    },
};

const navigation = [
    {
        label: "Overview",
        value: "overview" as Page,
        icon: LuLayoutDashboard,
    },
    {
        label: "My Papers",
        value: "papers" as Page,
        icon: LuFileText,
    },
    {
        label: "Review Progress",
        value: "progress" as Page,
        icon: LuClipboardCheck,
    },
    {
        label: "Notifications",
        value: "notifications" as Page,
        icon: LuBell,
    },
    {
        label: "My Profile",
        value: "profile" as Page,
        icon: LuUserRound,
    },
];

export default function EditorDashboard() {
    const [activePage, setActivePage] = useState<Page>("overview");
    const [papers] = useState<Paper[]>(initialPapers);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [readNotifications, setReadNotifications] = useState<number[]>([]);

    // Replace these with the authenticated editor's information.
    const editor = {
        name: "Dr. John Smith",
        email: "john@example.com",
        role: "Editor",
    };

    const unreadCount = notifications.filter(
        (notification) =>
            notification.unread &&
            !readNotifications.includes(notification.id)
    ).length;

    const activePapers = papers.filter(
        (paper) =>
            paper.status === "under_review" ||
            paper.status === "awaiting_reviewers"
    ).length;

    const awaitingReviewers = papers.filter(
        (paper) => paper.status === "awaiting_reviewers"
    ).length;

    const completedPapers = papers.filter(
        (paper) => paper.status === "review_completed"
    ).length;

    const totalReviewers = papers.reduce(
        (total, paper) => total + paper.reviewers.length,
        0
    );

    const completedReviews = papers.reduce(
        (total, paper) =>
            total +
            paper.reviewers.filter(
                (reviewer) => reviewer.status === "completed"
            ).length,
        0
    );

    const filteredPapers = useMemo(() => {
        return papers.filter((paper) => {
            const matchesSearch =
                paper.title.toLowerCase().includes(search.toLowerCase()) ||
                paper.author.toLowerCase().includes(search.toLowerCase()) ||
                paper.track.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "all" || paper.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [papers, search, statusFilter]);

    const navigate = (page: Page) => {
        setActivePage(page);
        setMobileMenuOpen(false);
    };

    const SidebarContent = () => (
        <div className="flex h-full flex-col">
            {/* Brand */}
            <div className="flex h-20 items-center gap-3 border-b px-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <LuBookOpen className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="font-bold tracking-wide">ICETIA 2027</h2>
                    <p className="text-xs text-muted-foreground">
                        Editorial Workspace
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 space-y-2 px-3 py-6">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Workspace
                </p>

                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.value;

                    return (
                        <button
                            key={item.value}
                            onClick={() => navigate(item.value)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>

                            {item.value === "notifications" &&
                                unreadCount > 0 && (
                                    <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${
                                        isActive
                                            ? "bg-white/20 text-white"
                                            : "bg-blue-600 text-white"
                                    }`}>
                                        {unreadCount}
                                    </span>
                                )}
                        </button>
                    );
                })}
            </div>

            {/* User profile */}
            <div className="border-t p-4">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>JS</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                            {editor.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {editor.role}
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        title="Logout"
                        onClick={() => {
                            // Connect your Convex Auth signOut function here.
                        }}
                    >
                        <LuLogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );

    const PageHeading = ({
        title,
        description,
    }: {
        title: string;
        description: string;
    }) => (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );

    const PaperStatusBadge = ({ status }: { status: PaperStatus }) => (
        <Badge
            variant="outline"
            className={statusConfig[status].className}
        >
            {statusConfig[status].label}
        </Badge>
    );

    const PaperTable = ({ data }: { data: Paper[] }) => (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Paper</TableHead>
                        <TableHead>Reviewers</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead className="text-right">View</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length > 0 ? (
                        data.map((paper) => (
                            <TableRow key={paper._id}>
                                <TableCell className="min-w-60">
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            {paper.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {paper.author} · {paper.track}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {paper.reviewers.length}
                                </TableCell>

                                <TableCell>
                                    <PaperStatusBadge status={paper.status} />
                                </TableCell>

                                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                                    {paper.deadline}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => setSelectedPaper(paper)}
                                    >
                                        <LuEye className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="h-28 text-center text-muted-foreground"
                            >
                                No papers found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );

    const PaperFilters = () => (
        <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
            <div className="relative w-full tablet:max-w-sm">
                <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search papers, authors or tracks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full tablet:w-52">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="awaiting_reviewers">
                        Awaiting reviewers
                    </SelectItem>
                    <SelectItem value="under_review">
                        Under review
                    </SelectItem>
                    <SelectItem value="review_completed">
                        Review completed
                    </SelectItem>
                    <SelectItem value="revision_required">
                        Revision required
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );

    const OverviewPage = () => (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
                <PageHeading
                    title={`Welcome, ${editor.name.split(" ")[0]}`}
                    description="Here's an overview of your editorial activities."
                />

                <Button onClick={() => navigate("papers")}>
                    View my papers
                    <LuArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 2xl:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Assigned Papers
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                                {papers.length}
                            </p>
                        </div>
                        <div className="rounded-lg bg-blue-500/10 p-3 text-blue-600">
                            <LuFileText className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Under Review
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                                {activePapers}
                            </p>
                        </div>
                        <div className="rounded-lg bg-amber-500/10 p-3 text-amber-600">
                            <LuClock3 className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Awaiting Reviewers
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                                {awaitingReviewers}
                            </p>
                        </div>
                        <div className="rounded-lg bg-orange-500/10 p-3 text-orange-600">
                            <LuUsers className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-5">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Completed
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                                {completedPapers}
                            </p>
                        </div>
                        <div className="rounded-lg bg-green-500/10 p-3 text-green-600">
                            <LuCircleCheck className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Review progress */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base">
                                Overall Review Progress
                            </CardTitle>
                            <CardDescription>
                                Review submissions across your assigned papers.
                            </CardDescription>
                        </div>
                        <LuClipboardCheck className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Completed reviews
                        </span>
                        <span className="font-semibold">
                            {completedReviews}/{totalReviewers}
                        </span>
                    </div>

                    {/* <Progress
                        value={
                            totalReviewers
                                ? (completedReviews / totalReviewers) * 100
                                : 0
                        }
                    /> */}

                    <p className="mt-2 text-xs text-muted-foreground">
                        Based on reviewer submissions recorded for your papers.
                    </p>
                </CardContent>
            </Card>

            {/* Recent papers */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base">
                                Recent Assignments
                            </CardTitle>
                            <CardDescription>
                                Papers recently assigned to you.
                            </CardDescription>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("papers")}
                        >
                            View all
                            <LuChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <PaperTable data={papers.slice(0, 4)} />
                </CardContent>
            </Card>

            {/* Quick notifications */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">
                        Recent Notifications
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {notifications.slice(0, 3).map((notification) => (
                        <div
                            key={notification.id}
                            className="flex items-start gap-3"
                        >
                            <div className="rounded-full bg-blue-500/10 p-2 text-blue-600">
                                <LuBell className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.message}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {notification.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

    const PapersPage = () => (
        <div className="space-y-6">
            <PageHeading
                title="My Papers"
                description="View and manage papers assigned to you."
            />

            <Card>
                <CardContent className="space-y-5 p-5">
                    <PaperFilters />
                    <PaperTable data={filteredPapers} />
                </CardContent>
            </Card>
        </div>
    );

    const ProgressPage = () => (
        <div className="space-y-6">
            <PageHeading
                title="Review Progress"
                description="Monitor reviewer activity and review completion."
            />

            <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
                <Card>
                    <CardContent className="p-5">
                        <p className="text-sm text-muted-foreground">
                            Total Reviewers
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                            {totalReviewers}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5">
                        <p className="text-sm text-muted-foreground">
                            Completed Reviews
                        </p>
                        <p className="mt-2 text-2xl font-bold text-green-600">
                            {completedReviews}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5">
                        <p className="text-sm text-muted-foreground">
                            Outstanding Reviews
                        </p>
                        <p className="mt-2 text-2xl font-bold text-amber-600">
                            {totalReviewers - completedReviews}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Paper Review Status</CardTitle>
                    <CardDescription>
                        Reviewer progress for each assigned paper.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {papers.map((paper) => {
                        const completed = paper.reviewers.filter(
                            (reviewer) => reviewer.status === "completed"
                        ).length;

                        const progress = paper.reviewers.length
                            ? (completed / paper.reviewers.length) * 100
                            : 0;

                        return (
                            <div key={paper._id} className="space-y-3">
                                <div className="flex flex-col gap-2 tablet:flex-row tablet:items-center tablet:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold">
                                            {paper.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {completed} of {paper.reviewers.length}{" "}
                                            reviews completed
                                        </p>
                                    </div>
                                    <PaperStatusBadge status={paper.status} />
                                </div>

                                {/* <Progress value={progress} /> */}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    );

    const NotificationsPage = () => (
        <div className="space-y-6">
            <PageHeading
                title="Notifications"
                description="Stay updated on your assignments and reviewer activity."
            />

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base">
                                All Notifications
                            </CardTitle>
                            <CardDescription>
                                {unreadCount} unread notifications
                            </CardDescription>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setReadNotifications(
                                    notifications.map((item) => item.id)
                                )
                            }
                        >
                            Mark all as read
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-1">
                    {notifications.map((notification) => {
                        const isUnread =
                            notification.unread &&
                            !readNotifications.includes(notification.id);

                        return (
                            <button
                                key={notification.id}
                                onClick={() =>
                                    setReadNotifications((prev) =>
                                        prev.includes(notification.id)
                                            ? prev
                                            : [...prev, notification.id]
                                    )
                                }
                                className="flex w-full items-start gap-3 rounded-lg p-4 text-left transition-colors hover:bg-muted"
                            >
                                <div className="rounded-full bg-blue-500/10 p-2 text-blue-600">
                                    {notification.type === "deadline" ? (
                                        <LuCircleAlert className="h-4 w-4" />
                                    ) : (
                                        <LuBell className="h-4 w-4" />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold">
                                            {notification.title}
                                        </p>
                                        {isUnread && (
                                            <span className="h-2 w-2 rounded-full bg-blue-600" />
                                        )}
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {notification.message}
                                    </p>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        {notification.time}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    );

    const ProfilePage = () => (
        <div className="space-y-6">
            <PageHeading
                title="My Profile"
                description="View your editorial account information."
            />

            <Card>
                <CardContent className="flex flex-col gap-6 p-6 tablet:flex-row tablet:items-center">
                    <Avatar className="h-20 w-20">
                        <AvatarFallback className="text-xl">
                            JS
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h2 className="text-xl font-bold">{editor.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            {editor.email}
                        </p>
                        <Badge className="mt-2">Editor</Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">
                        Account Information
                    </CardTitle>
                    <CardDescription>
                        Your ICETIA editorial account details.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Full name
                            </p>
                            <p className="mt-1 text-sm font-medium">
                                {editor.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Email address
                            </p>
                            <p className="mt-1 text-sm font-medium">
                                {editor.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Account role
                            </p>
                            <p className="mt-1 text-sm font-medium">
                                {editor.role}
                            </p>
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Contact the conference administrator if your account
                        information needs to be changed.
                    </p>
                </CardContent>
            </Card>
        </div>
    );

    const pageTitles: Record<Page, string> = {
        overview: "Overview",
        papers: "My Papers",
        progress: "Review Progress",
        notifications: "Notifications",
        profile: "My Profile",
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="flex min-h-screen">
                {/* Desktop sidebar */}
                <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background tablet:block">
                    <SidebarContent />
                </aside>

                {/* Main content */}
                <main className="min-w-0 flex-1 tablet:pl-64">
                    {/* Top header */}
                    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur tablet:px-6">
                        <div className="flex items-center gap-3">
                            {/* Mobile menu */}
                            <Sheet
                                open={mobileMenuOpen}
                                onOpenChange={setMobileMenuOpen}
                            >
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="tablet:hidden"
                                    >
                                        <LuMenu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>

                                <SheetContent
                                    side="left"
                                    className="w-72 p-0"
                                >
                                    <SidebarContent />
                                </SheetContent>
                            </Sheet>

                            <div>
                                <p className="text-sm font-semibold">
                                    {pageTitles[activePage]}
                                </p>
                                <p className="hidden text-xs text-muted-foreground tablet:block">
                                    ICETIA 2027 Editorial Portal
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                                onClick={() => navigate("notifications")}
                            >
                                <LuBell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                                )}
                            </Button>

                            <Avatar className="h-8 w-8">
                                <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                        </div>
                    </header>

                    <div className="mx-auto max-w-7xl p-4 tablet:p-6 2xl:p-8">
                        {activePage === "overview" && <OverviewPage />}
                        {activePage === "papers" && <PapersPage />}
                        {activePage === "progress" && <ProgressPage />}
                        {activePage === "notifications" && (
                            <NotificationsPage />
                        )}
                        {activePage === "profile" && <ProfilePage />}
                    </div>
                </main>
            </div>

            {/* Paper details dialog */}
            <Dialog
                open={Boolean(selectedPaper)}
                onOpenChange={(open) => {
                    if (!open) setSelectedPaper(null);
                }}
            >
                <DialogContent className="max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Paper Details</DialogTitle>
                        <DialogDescription>
                            Assignment information and reviewer progress.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPaper && (
                        <div className="space-y-5">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Paper title
                                </p>
                                <h3 className="mt-1 font-semibold">
                                    {selectedPaper.title}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Author
                                    </p>
                                    <p className="mt-1 text-sm font-medium">
                                        {selectedPaper.author}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Paper source
                                    </p>
                                    <p className="mt-1 text-sm font-medium">
                                        {selectedPaper.paperSource ===
                                        "registration"
                                            ? "Registration"
                                            : "Call for Papers"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Conference track
                                    </p>
                                    <p className="mt-1 text-sm font-medium">
                                        {selectedPaper.track}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Review deadline
                                    </p>
                                    <p className="mt-1 text-sm font-medium">
                                        {selectedPaper.deadline}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold">
                                        Assigned Reviewers
                                    </h4>
                                    <Badge variant="secondary">
                                        {selectedPaper.reviewers.length}
                                    </Badge>
                                </div>

                                {selectedPaper.reviewers.length > 0 ? (
                                    selectedPaper.reviewers.map(
                                        (reviewer, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-lg border p-3"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>
                                                            {reviewer.name
                                                                .split(" ")
                                                                .map((part) => part[0])
                                                                .slice(0, 2)
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium">
                                                        {reviewer.name}
                                                    </span>
                                                </div>

                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        reviewer.status ===
                                                        "completed"
                                                            ? "border-green-500/20 bg-green-500/10 text-green-600"
                                                            : reviewer.status ===
                                                              "accepted"
                                                            ? "border-blue-500/20 bg-blue-500/10 text-blue-600"
                                                            : "border-amber-500/20 bg-amber-500/10 text-amber-600"
                                                    }
                                                >
                                                    {reviewer.status}
                                                </Badge>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">
                                        No reviewers have been assigned yet.
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedPaper(null)}
                                >
                                    Close
                                </Button>

                                <Button
                                    onClick={() => {
                                        // Connect paper download / details action.
                                    }}
                                >
                                    <LuEye className="mr-2 h-4 w-4" />
                                    View Paper
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
