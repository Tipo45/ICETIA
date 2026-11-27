
"use client";

import { useMemo, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
// import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LuArrowDownToLine, LuArrowUpRight, LuBell, LuBookOpen, LuCalendarDays, LuCheck, LuChevronRight, LuCircleAlert, LuCircleCheck, LuClipboardCheck, LuClock3, LuEye, LuFileText, LuLayoutDashboard, LuLogOut, LuMenu, LuSearch, LuSend, LuShieldCheck, LuUser, LuUserRound, LuUsers, LuX } from "react-icons/lu";

type Page =
  | "overview"
  | "reviews"
  | "notifications"
  | "profile";

type ReviewStatus =
  | "invited"
  | "accepted"
  | "in_progress"
  | "submitted"
  | "declined";

type Recommendation =
  | "accept"
  | "minor_revision"
  | "major_revision"
  | "reject";

type Review = {
  _id: string;
  title: string;
  track: string;
  paperId: string;
  abstract: string;
  author: string;
  assignedDate: string;
  deadline: string;
  status: ReviewStatus;
  fileUrl?: string;
  recommendation?: Recommendation;
  commentsToAuthor?: string;
  confidentialComments?: string;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "invitation" | "deadline" | "update";
};

const initialReviews: Review[] = [
  {
    _id: "REV-001",
    title: "A Machine Learning Framework for Predictive Healthcare Analytics",
    track: "Artificial Intelligence & Machine Learning",
    paperId: "ICETIA-2027-001",
    abstract:
      "This paper proposes a machine learning framework for predictive healthcare analytics. It explores the application of supervised learning techniques to patient data for early detection of potential health conditions. The study evaluates model performance using accuracy, precision, recall and F1-score.",
    author: "Anonymous Author",
    assignedDate: "12 Nov 2026",
    deadline: "10 Dec 2026",
    status: "in_progress",
    fileUrl: "#",
  },
  {
    _id: "REV-002",
    title: "Secure Cloud Computing Architecture for Smart Environments",
    track: "Cybersecurity, Privacy and Digital Trust",
    paperId: "ICETIA-2027-014",
    abstract:
      "This study presents a secure cloud computing architecture designed for smart environments. The proposed model combines access control, encryption and continuous monitoring to improve data protection.",
    author: "Anonymous Author",
    assignedDate: "15 Nov 2026",
    deadline: "05 Dec 2026",
    status: "accepted",
    fileUrl: "#",
  },
  {
    _id: "REV-003",
    title: "Internet of Things-Based Monitoring System for Smart Agriculture",
    track: "Internet of Things and Smart Systems",
    paperId: "ICETIA-2027-026",
    abstract:
      "The research investigates an IoT-based agricultural monitoring system using connected sensors to collect environmental data and support informed farming decisions.",
    author: "Anonymous Author",
    assignedDate: "18 Nov 2026",
    deadline: "15 Dec 2026",
    status: "invited",
    fileUrl: "#",
  },
  {
    _id: "REV-004",
    title: "A Comparative Study of Deep Learning Models for Image Classification",
    track: "Artificial Intelligence & Machine Learning",
    paperId: "ICETIA-2027-032",
    abstract:
      "This paper compares selected deep learning architectures for image classification tasks, with emphasis on model accuracy, computational cost and generalisation.",
    author: "Anonymous Author",
    assignedDate: "08 Nov 2026",
    deadline: "20 Nov 2026",
    status: "submitted",
    recommendation: "minor_revision",
    fileUrl: "#",
  },
];

const initialNotifications: Notification[] = [
  {
    id: "N-001",
    title: "New review invitation",
    message:
      "You have been invited to review ICETIA-2027-026.",
    date: "18 Nov 2026",
    read: false,
    type: "invitation",
  },
  {
    id: "N-002",
    title: "Review deadline approaching",
    message:
      "Your review for ICETIA-2027-001 is due soon.",
    date: "20 Nov 2026",
    read: false,
    type: "deadline",
  },
  {
    id: "N-003",
    title: "Review submitted successfully",
    message:
      "Your review for ICETIA-2027-032 has been recorded.",
    date: "19 Nov 2026",
    read: true,
    type: "update",
  },
];

const statusConfig: Record<
  ReviewStatus,
  { label: string; className: string }
> = {
  invited: {
    label: "Invitation pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  accepted: {
    label: "Accepted",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  in_progress: {
    label: "In progress",
    className: "bg-violet-50 text-violet-700 border-violet-200",
  },
  submitted: {
    label: "Submitted",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  declined: {
    label: "Declined",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

const navItems: {
  id: Page;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "overview", label: "Overview", icon: LuLayoutDashboard },
  { id: "reviews", label: "My Reviews", icon: LuFileText },
  { id: "notifications", label: "Notifications", icon: LuBell },
  { id: "profile", label: "My Profile", icon: LuUser },
];

export default function ReviewerDashboardPage() {
  const [activePage, setActivePage] = useState<Page>("overview");
  const [reviews, setReviews] = useState(initialReviews);
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedReview, setSelectedReview] =
    useState<Review | null>(null);

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [submissionDialogOpen, setSubmissionDialogOpen] =
    useState(false);

  const [recommendation, setRecommendation] =
    useState<Recommendation | "">("");
  const [commentsToAuthor, setCommentsToAuthor] = useState("");
  const [confidentialComments, setConfidentialComments] =
    useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = useMemo(() => {
    return {
      assigned: reviews.filter(
        (review) =>
          review.status !== "declined"
      ).length,
      pending: reviews.filter(
        (review) =>
          ["invited", "accepted", "in_progress"].includes(
            review.status
          )
      ).length,
      submitted: reviews.filter(
        (review) => review.status === "submitted"
      ).length,
      invitations: reviews.filter(
        (review) => review.status === "invited"
      ).length,
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        review.paperId
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        review.track
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        review.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reviews, searchQuery, statusFilter]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const openReview = (review: Review) => {
    setSelectedReview(review);
    setRecommendation(review.recommendation ?? "");
    setCommentsToAuthor(review.commentsToAuthor ?? "");
    setConfidentialComments(
      review.confidentialComments ?? ""
    );
    setReviewDialogOpen(true);
  };

  const updateReviewStatus = (
    reviewId: string,
    status: ReviewStatus
  ) => {
    setReviews((previous) =>
      previous.map((review) =>
        review._id === reviewId
          ? { ...review, status }
          : review
      )
    );
  };

  const handleAcceptInvitation = (review: Review) => {
    updateReviewStatus(review._id, "accepted");
    setSelectedReview({
      ...review,
      status: "accepted",
    });
  };

  const handleDeclineInvitation = (review: Review) => {
    updateReviewStatus(review._id, "declined");
    setReviewDialogOpen(false);
  };

  const handleSaveReview = () => {
    if (!selectedReview || !recommendation) return;

    setReviews((previous) =>
      previous.map((review) =>
        review._id === selectedReview._id
          ? {
              ...review,
              status: "submitted",
              recommendation,
              commentsToAuthor,
              confidentialComments,
            }
          : review
      )
    );

    setReviewDialogOpen(false);
    setSubmissionDialogOpen(false);
  };

  const markAllNotificationsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const navigate = (page: Page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const Sidebar = () => (
    <div className="flex h-full flex-col bg-[#071B33] text-white">
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500">
          <LuBookOpen className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-bold tracking-wide">ICETIA 2027</p>
          <p className="text-xs text-slate-400">
            Reviewer Portal
          </p>
        </div>
      </div>

      <div className="px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Workspace
        </p>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm transition ${
                  active
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-950/20"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>

                {item.id === "notifications" &&
                  unreadCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-white/10 p-4">
        <div className="mb-4 flex items-center gap-3 rounded-lg bg-white/5 p-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-cyan-500 text-white">
              RV
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              Reviewer Account
            </p>
            <p className="text-xs text-slate-400">
              Reviewer
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            // Connect to Convex Auth signOut here.
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <LuLogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  const PageHeader = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div className="mb-7">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );

  const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
    iconClass,
  }: {
    title: string;
    value: number;
    description: string;
    icon: React.ElementType;
    iconClass: string;
  }) => (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );

  const StatusBadge = ({
    status,
  }: {
    status: ReviewStatus;
  }) => (
    <Badge
      variant="outline"
      className={statusConfig[status].className}
    >
      {statusConfig[status].label}
    </Badge>
  );

  const ReviewTable = ({
    items,
  }: {
    items: Review[];
  }) => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-190 text-left text-sm">
        <thead>
          <tr className="border-b bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <th className="px-5 py-4 font-semibold">Manuscript</th>
            <th className="px-5 py-4 font-semibold">Track</th>
            <th className="px-5 py-4 font-semibold">Deadline</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 text-right font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {items.map((review) => (
            <tr
              key={review._id}
              className="transition hover:bg-slate-50/70"
            >
              <td className="max-w-[320px] px-5 py-4">
                <p className="line-clamp-2 font-semibold text-slate-800">
                  {review.title}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {review.paperId}
                </p>
              </td>

              <td className="max-w-45 px-5 py-4 text-xs text-slate-600">
                {review.track}
              </td>

              <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-600">
                {review.deadline}
              </td>

              <td className="px-5 py-4">
                <StatusBadge status={review.status} />
              </td>

              <td className="px-5 py-4 text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openReview(review)}
                  className="gap-2"
                >
                  View
                  <LuChevronRight className="h-3.5 w-3.5" />
                </Button>
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-5 py-12 text-center text-sm text-slate-500"
              >
                No reviews match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderOverview = () => (
    <>
      <PageHeader
        title="Reviewer Overview"
        description="Manage your manuscript assignments and review submissions."
      />

      <div className="grid gap-4 tablet:grid-cols-2 2xl:grid-cols-4">
        <StatCard
          title="Assigned Papers"
          value={stats.assigned}
          description="Your active assignments"
          icon={LuFileText}
          iconClass="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Pending Reviews"
          value={stats.pending}
          description="Awaiting your action"
          icon={LuClock3}
          iconClass="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Submitted Reviews"
          value={stats.submitted}
          description="Successfully completed"
          icon={LuCircleCheck}
          iconClass="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="New Invitations"
          value={stats.invitations}
          description="Awaiting your response"
          icon={LuCircleAlert}
          iconClass="bg-violet-50 text-violet-600"
        />
      </div>

      <div className="mt-7 grid gap-6 2xl:grid-cols-3">
        <Card className="2xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">
                Recent Assignments
              </CardTitle>
              <CardDescription>
                Your latest assigned manuscripts
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("reviews")}
              className="text-cyan-700"
            >
              View all
              <LuChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ReviewTable items={reviews.slice(0, 3)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Review Summary
            </CardTitle>
            <CardDescription>
              Your current review activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">
                  Submitted
                </span>
                <span className="font-semibold text-slate-800">
                  {stats.submitted} / {stats.assigned}
                </span>
              </div>
              {/* <Progress
                value={
                  stats.assigned
                    ? (stats.submitted / stats.assigned) * 100
                    : 0
                }
                className="h-2"
              /> */}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <LuClock3 className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-600">
                  Awaiting action
                </span>
              </div>
              <span className="font-semibold">
                {stats.pending}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <LuCheck className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-600">
                  Completed
                </span>
              </div>
              <span className="font-semibold">
                {stats.submitted}
              </span>
            </div>

            <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-3">
              <p className="text-xs leading-relaxed text-cyan-900">
                Please submit your reviews before their respective
                deadlines to help maintain the conference review
                schedule.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">
            Upcoming Deadlines
          </CardTitle>
          <CardDescription>
            Reviews that still require your attention
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {reviews
            .filter((review) =>
              ["accepted", "in_progress"].includes(review.status)
            )
            .map((review) => (
              <div
                key={review._id}
                className="flex flex-col gap-3 rounded-lg border border-slate-100 p-4 tablet:flex-row tablet:items-center tablet:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <LuCalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {review.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Deadline: {review.deadline}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openReview(review)}
                >
                  Continue review
                </Button>
              </div>
            ))}

          {stats.pending === 0 && (
            <p className="py-6 text-center text-sm text-slate-500">
              You have no pending reviews.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );

  const renderReviews = () => (
    <>
      <PageHeader
        title="My Reviews"
        description="View your manuscript assignments, respond to invitations and submit evaluations."
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
            <div>
              <CardTitle className="text-base">
                Assigned Manuscripts
              </CardTitle>
              <CardDescription>
                {filteredReviews.length} manuscript(s) found
              </CardDescription>
            </div>

            <div className="flex flex-col gap-3 tablet:flex-row">
              <div className="relative">
                <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search manuscripts..."
                  className="pl-9 tablet:w-64"
                />
              </div>

              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="tablet:w-48">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All statuses
                  </SelectItem>
                  <SelectItem value="invited">
                    Invitation pending
                  </SelectItem>
                  <SelectItem value="accepted">
                    Accepted
                  </SelectItem>
                  <SelectItem value="in_progress">
                    In progress
                  </SelectItem>
                  <SelectItem value="submitted">
                    Submitted
                  </SelectItem>
                  <SelectItem value="declined">
                    Declined
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ReviewTable items={filteredReviews} />
        </CardContent>
      </Card>
    </>
  );

  const renderNotifications = () => (
    <>
      <PageHeader
        title="Notifications"
        description="Stay updated on review invitations and important deadlines."
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">
              Recent Notifications
            </CardTitle>
            <CardDescription>
              {unreadCount} unread notification(s)
            </CardDescription>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={markAllNotificationsRead}
          >
            <LuCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </CardHeader>

        <CardContent className="space-y-3">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() =>
                setNotifications((previous) =>
                  previous.map((item) =>
                    item.id === notification.id
                      ? { ...item, read: true }
                      : item
                  )
                )
              }
              className={`flex w-full gap-4 rounded-xl border p-4 text-left transition hover:bg-slate-50 ${
                notification.read
                  ? "border-slate-100 bg-white"
                  : "border-cyan-100 bg-cyan-50/50"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm">
                {notification.type === "invitation" ? (
                  <LuFileText className="h-5 w-5" />
                ) : notification.type === "deadline" ? (
                  <LuClock3 className="h-5 w-5" />
                ) : (
                  <LuCircleCheck className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-800">
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {notification.message}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  {notification.date}
                </p>
              </div>
            </button>
          ))}

          {notifications.length === 0 && (
            <p className="py-12 text-center text-sm text-slate-500">
              You have no notifications.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );

  const renderProfile = () => (
    <>
      <PageHeader
        title="My Profile"
        description="View your reviewer account information."
      />

      <div className="grid gap-6 2xl:grid-cols-3">
        <Card className="2xl:col-span-1">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-[#071B33] text-2xl text-white">
                RV
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Reviewer Account
            </h2>
            <p className="text-sm text-slate-500">
              reviewer@example.com
            </p>
            <Badge className="mt-4 bg-cyan-50 text-cyan-700 hover:bg-cyan-50">
              <LuShieldCheck className="mr-1 h-3.5 w-3.5" />
              Reviewer
            </Badge>
          </CardContent>
        </Card>

        <Card className="2xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">
              Account Information
            </CardTitle>
            <CardDescription>
              Your registered reviewer details
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <div>
              <Label className="text-xs text-slate-500">
                Full name
              </Label>
              <p className="mt-2 text-sm font-medium">
                Reviewer Account
              </p>
            </div>
            <div>
              <Label className="text-xs text-slate-500">
                Email address
              </Label>
              <p className="mt-2 text-sm font-medium">
                reviewer@example.com
              </p>
            </div>
            <div>
              <Label className="text-xs text-slate-500">
                Account role
              </Label>
              <p className="mt-2 text-sm font-medium">
                Reviewer
              </p>
            </div>
            <div>
              <Label className="text-xs text-slate-500">
                Conference
              </Label>
              <p className="mt-2 text-sm font-medium">
                ICETIA 2027
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 2xl:block">
        <Sidebar />
      </aside>

      <div className="2xl:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 tablet:px-7">
          <div className="flex items-center gap-3">
            <Sheet
              open={mobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="2xl:hidden"
                >
                  <LuMenu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 border-0 bg-[#071B33] p-0"
              >
                <Sidebar />
              </SheetContent>
            </Sheet>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                ICETIA 2027
              </p>
              <p className="text-xs text-slate-500">
                Reviewer Workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("notifications")}
            >
              <LuBell className="h-5 w-5 text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
              )}
            </Button>

            <Separator
              orientation="vertical"
              className="h-7"
            />

            <div className="hidden items-center gap-2 tablet:flex">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-cyan-100 text-xs text-cyan-800">
                  RV
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Reviewer
                </p>
                <p className="text-[10px] text-slate-500">
                  Reviewer account
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 tablet:p-7">
          {activePage === "overview" && renderOverview()}
          {activePage === "reviews" && renderReviews()}
          {activePage === "notifications" &&
            renderNotifications()}
          {activePage === "profile" && renderProfile()}
        </main>
      </div>

      <Dialog
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto tablet:max-w-3xl">
          {selectedReview && (
            <>
              <DialogHeader>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="outline">
                    {selectedReview.paperId}
                  </Badge>
                  <StatusBadge status={selectedReview.status} />
                </div>

                <DialogTitle className="text-left text-lg leading-relaxed">
                  {selectedReview.title}
                </DialogTitle>

                <DialogDescription className="text-left">
                  {selectedReview.track}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <div className="grid gap-3 rounded-lg bg-slate-50 p-4 tablet:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">
                      Assigned date
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {selectedReview.assignedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">
                      Review deadline
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {selectedReview.deadline}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-semibold text-slate-800">
                    Abstract
                  </h3>
                  <p className="text-sm leading-7 text-slate-600">
                    {selectedReview.abstract}
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="w-full tablet:w-auto"
                  onClick={() => {
                    if (selectedReview.fileUrl) {
                      window.open(
                        selectedReview.fileUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                >
                  <LuArrowDownToLine className="mr-2 h-4 w-4" />
                  Download manuscript
                </Button>

                {selectedReview.status === "invited" && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm font-semibold text-amber-900">
                      Review invitation
                    </p>
                    <p className="mt-1 text-xs leading-5 text-amber-800">
                      Please accept or decline this invitation.
                      Accepting it will allow you to submit your
                      evaluation.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleAcceptInvitation(selectedReview)
                        }
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <LuCheck className="mr-2 h-4 w-4" />
                        Accept invitation
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleDeclineInvitation(selectedReview)
                        }
                      >
                        <LuX className="mr-2 h-4 w-4" />
                        Decline
                      </Button>
                    </div>
                  </div>
                )}

                {["accepted", "in_progress"].includes(
                  selectedReview.status
                ) && (
                  <>
                    <Separator />

                    <div>
                      <h3 className="mb-3 text-sm font-semibold text-slate-800">
                        Submit Your Evaluation
                      </h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>
                            Overall recommendation
                          </Label>
                          <Select
                            value={recommendation}
                            onValueChange={(value) =>
                              setRecommendation(
                                value as Recommendation
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your recommendation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="accept">
                                Accept
                              </SelectItem>
                              <SelectItem value="minor_revision">
                                Minor Revision
                              </SelectItem>
                              <SelectItem value="major_revision">
                                Major Revision
                              </SelectItem>
                              <SelectItem value="reject">
                                Reject
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>
                            Comments to the author
                          </Label>
                          <Textarea
                            rows={5}
                            value={commentsToAuthor}
                            onChange={(event) =>
                              setCommentsToAuthor(event.target.value)
                            }
                            placeholder="Provide constructive feedback, observations and suggestions for improvement..."
                          />
                          <p className="text-xs text-slate-400">
                            These comments may be shared with the author.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>
                            Confidential comments to the editor
                          </Label>
                          <Textarea
                            rows={4}
                            value={confidentialComments}
                            onChange={(event) =>
                              setConfidentialComments(
                                event.target.value
                              )
                            }
                            placeholder="Provide confidential observations for the editor..."
                          />
                          <p className="text-xs text-slate-400">
                            These comments are only visible to the editorial team.
                          </p>
                        </div>

                        <Button
                          className="w-full bg-[#071B33] hover:bg-[#102d50]"
                          disabled={
                            !recommendation ||
                            !commentsToAuthor.trim()
                          }
                          onClick={() =>
                            setSubmissionDialogOpen(true)
                          }
                        >
                          <LuSend className="mr-2 h-4 w-4" />
                          Submit Review
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {selectedReview.status === "submitted" && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <LuCircleCheck className="h-5 w-5" />
                      <p className="text-sm font-semibold">
                        Review submitted
                      </p>
                    </div>
                    <p className="mt-2 text-xs text-emerald-700">
                      Your evaluation has been recorded. Contact
                      the editorial team if you need to make a
                      correction.
                    </p>
                    {selectedReview.recommendation && (
                      <p className="mt-3 text-sm font-medium text-emerald-900">
                        Recommendation:{" "}
                        {selectedReview.recommendation.replace(
                          "_",
                          " "
                        )}
                      </p>
                    )}
                  </div>
                )}

                {selectedReview.status === "declined" && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    You declined this review invitation.
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setReviewDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={submissionDialogOpen}
        onOpenChange={setSubmissionDialogOpen}
      >
        <DialogContent className="tablet:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit your review?</DialogTitle>
            <DialogDescription>
              Once submitted, your evaluation will be sent to the
              editorial team. You may not be able to edit it
              afterwards.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Your recommendation
            </p>
            <p className="mt-1 font-semibold capitalize text-slate-900">
              {recommendation.replace("_", " ")}
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSubmissionDialogOpen(false)}
            >
              Go back
            </Button>
            <Button
              onClick={handleSaveReview}
              className="bg-[#071B33] hover:bg-[#102d50]"
            >
              <LuSend className="mr-2 h-4 w-4" />
              Confirm submission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
