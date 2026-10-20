"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useMutation, useQuery } from "convex/react";
import { Country } from "country-state-city";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LuCalendarDays,
  LuChevronDown,
  LuCircleCheck,
  LuFileText,
  LuMail,
  LuRefreshCw,
  LuSearch,
  LuSend,
  LuUsers,
} from "react-icons/lu";
import { toast } from "sonner";

export default function ParticipantsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const sendConferenceMail = useMutation(api.registration.sendMail);
  const sendEmailTicket = useMutation(api.registration.sendConferenceTicket);
  const sendReminder = useMutation(api.registration.sendReminder);
  const logOutAdmin = useAction(api.paperSubmission.logoutAdmin)

  const [category, setCategory] = useState<
    "author" | "participant" | "student" | undefined
  >();

  const [country, setCountry] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const [sendingId, setSendingId] =
    useState<Id<"registrations"> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const participants = useQuery(api.registration.getParticipants, {
    search: search || undefined,
    category,
    country: country || undefined,
    paymentDate: paymentDate
      ? new Date(paymentDate).getTime()
      : undefined,
  });

  const participantsList = participants ?? [];

  const totalParticipants = participantsList.reduce(
    (total, participant) => {
      return total + 1 + (participant.coAuthors?.length ?? 0);
    },
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

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory(undefined);
    setCountry("");
    setPaymentDate("");
  };

  const handleSendReminder = async (
    registrationId: Id<"registrations">
  ) => {
    try {
      setSendingId(registrationId);

      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        toast.error("Your admin session has expired. Please log in again.");
        router.push("/admin-login");
        return;
      }

      await sendReminder({ registrationId, token });

      toast.success("Reminder email sent successfully.");
    } catch (error: any) {
      toast.error(
        error?.data ??
        error?.message ??
        "Failed to send reminder email."
      );
    } finally {
      setSendingId(null);
    }
  };

  const handleSendConferenceMail = async (
    registrationId: Id<"registrations">
  ) => {
    try {
      setSendingId(registrationId);

      await sendConferenceMail({ registrationId });

      toast.success("Email sent successfully.");
    } catch (error: any) {
      toast.error(
        error?.data ??
        error?.message ??
        "Failed to send reminder email."
      );
    } finally {
      setSendingId(null);
    }
  };

  const handleSendConferenceTIcket = async (
    registrationId: Id<"registrations">
  ) => {
    try {
      setSendingId(registrationId);

      await sendEmailTicket({ registrationId });

      toast.success("Email sent successfully.");
    } catch (error: any) {
      toast.error(
        error?.data ??
        error?.message ??
        "Failed to send reminder email."
      );
    } finally {
      setSendingId(null);
    }
  };


  const handleLogOut = async () => {
    const sessionToken = sessionStorage.getItem("icetia-admin-session");

    try {
      if (sessionToken) {
        await logOutAdmin({ sessionToken });
      }

      sessionStorage.removeItem("icetia-admin-session");

      toast.success("Logged out successfully.");
      router.replace("/admin-login");
    } catch {
      toast.error("Unable to complete logout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-8 xl:px-10">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              <LuUsers className="h-4 w-4" />
              Registration Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
              Registered Participants
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              View, filter and manage confirmed conference registrations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="border border-slate-200 bg-white px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Showing
              </p>

              <p className="mt-1 text-lg font-bold text-slate-950">
                {participants === undefined
                  ? "—"
                  : participantsList.length}
              </p>
            </div>

            <div className="border border-slate-900 bg-[#07111f] px-4 py-3 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Total People
              </p>

              <p className="mt-1 text-lg font-bold">
                {participants === undefined
                  ? "—"
                  : totalParticipants}
              </p>
            </div>

            <Button
              onClick={handleLogOut}
              className="h-auto bg-red-600 rounded-2xl px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white hover:bg-red-700"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* ================= SUMMARY ================= */}

        <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 tablet:grid-cols-4">
          <div className="bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Authors
              </span>

              <LuFileText className="h-4 w-4 text-blue-600" />
            </div>

            <p className="mt-3 text-2xl font-bold text-slate-950">
              {authorsCount}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Paper submissions
            </p>
          </div>

          <div className="bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Participants
              </span>

              <LuUsers className="h-4 w-4 text-blue-600" />
            </div>

            <p className="mt-3 text-2xl font-bold text-slate-950">
              {participantCount}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              General attendees
            </p>
          </div>

          <div className="bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Students
              </span>

              <LuCircleCheck className="h-4 w-4 text-blue-600" />
            </div>

            <p className="mt-3 text-2xl font-bold text-slate-950">
              {studentsCount}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Student registrations
            </p>
          </div>

          <div className="bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Co-authors
              </span>

              <LuUsers className="h-4 w-4 text-blue-600" />
            </div>

            <p className="mt-3 text-2xl font-bold text-slate-950">
              {participantsList.reduce(
                (total, participant) =>
                  total + (participant.coAuthors?.length ?? 0),
                0
              )}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Additional authors
            </p>
          </div>
        </div>

        {/* ================= FILTERS ================= */}

        <section className="mb-6 border border-slate-200 bg-white">
          <div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-950">
                Search & Filters
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Narrow the registration list using the available filters.
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="w-fit text-slate-500 hover:text-slate-950"
            >
              <LuRefreshCw className="mr-2 h-4 w-4" />
              Clear filters
            </Button>
          </div>

          <div className="grid gap-4 p-5 tablet:grid-cols-2 xl:grid-cols-5">

            {/* Search */}

            <div className="relative xl:col-span-2">
              <LuSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search name, email or registration number..."
                value={searchInput}
                onChange={(e) =>
                  setSearchInput(e.target.value)
                }
                className="h-11 w-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Category */}

            <Select
              value={category}
              onValueChange={(value) =>
                setCategory(
                  value as
                  | "author"
                  | "participant"
                  | "student"
                )
              }
            >
              <SelectTrigger className="h-11 rounded-none border-slate-200 bg-slate-50 text-sm">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="author">
                  Author
                </SelectItem>

                <SelectItem value="participant">
                  Participant
                </SelectItem>

                <SelectItem value="student">
                  Student
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Country */}

            <Select
              value={country}
              onValueChange={setCountry}
            >
              <SelectTrigger className="h-11 rounded-none border-slate-200 bg-slate-50 text-sm">
                <SelectValue placeholder="All countries" />
              </SelectTrigger>

              <SelectContent className="max-h-80">
                {Country.getAllCountries().map((item) => (
                  <SelectItem
                    key={item.isoCode}
                    value={item.name}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Payment Date */}

            <div className="relative">
              <LuCalendarDays className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="date"
                value={paymentDate}
                onChange={(e) =>
                  setPaymentDate(e.target.value)
                }
                className="h-11 w-full border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              />
            </div>
          </div>
        </section>

        {/* ================= LOADING ================= */}

        {participants === undefined && (
          <div className="border border-slate-200 bg-white px-6 py-16 text-center">
            <LuRefreshCw className="mx-auto h-6 w-6 animate-spin text-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-700">
              Updating results...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Fetching the latest registrations.
            </p>
          </div>
        )}

        {/* ================= EMPTY ================= */}

        {participants !== undefined &&
          participantsList.length === 0 && (
            <div className="border border-slate-200 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-slate-200 bg-slate-50">
                <LuUsers className="h-5 w-5 text-slate-400" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-950">
                No registrations found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                No confirmed registrations match the current search
                and filter settings.
              </p>

              <Button
                variant="outline"
                className="mt-5 rounded-none"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </div>
          )}

        {/* ================= TABLE ================= */}

        {participants !== undefined &&
          participantsList.length > 0 && (
            <section className="overflow-hidden border border-slate-200 bg-white">

              {/* Table header */}

              <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-950">
                    Confirmed Registrations
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {participantsList.length} registration
                    {participantsList.length !== 1 ? "s" : ""} displayed
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <LuCircleCheck className="h-4 w-4 text-green-600" />
                  Confirmed payment
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-312.5 w-full">

                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-left">
                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        #
                      </th>

                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Registration
                      </th>

                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Participant
                      </th>

                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Category
                      </th>

                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Institution
                      </th>

                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Country
                      </th>

                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Payment
                      </th>

                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Co-authors
                      </th>

                      <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Paper
                      </th>

                      <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Send Reminder Mail
                      </th>

                      <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Send Confirmation Mail
                      </th>

                      <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Send Ticket Mail
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {participantsList.map(
                      (participant, index) => (
                        <tr
                          key={participant._id}
                          className="group transition-colors hover:bg-slate-50/80"
                        >
                          {/* Number */}

                          <td className="px-5 py-4 align-top text-xs font-medium text-slate-400">
                            {String(index + 1).padStart(2, "0")}
                          </td>

                          {/* Registration */}

                          <td className="px-5 py-4 align-top">
                            <span className="font-mono text-xs font-semibold text-slate-700">
                              {participant.registrationNumber}
                            </span>
                          </td>

                          {/* Participant */}

                          <td className="px-5 py-4 align-top">
                            <div className="flex items-start gap-3">

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#07111f] text-xs font-bold text-white">
                                {participant.firstName
                                  ?.charAt(0)
                                  .toUpperCase()}
                                {participant.lastName
                                  ?.charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div className="min-w-0">
                                <p className="font-semibold text-slate-900">
                                  {participant.firstName}{" "}
                                  {participant.lastName}
                                </p>

                                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                  <LuMail className="h-3 w-3" />

                                  {participant.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}

                          <td className="px-5 py-4 align-top">
                            <span
                              className={`inline-flex items-center border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${participant.category ===
                                "author"
                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                : participant.category ===
                                  "student"
                                  ? "border-purple-200 bg-purple-50 text-purple-700"
                                  : "border-slate-200 bg-slate-50 text-slate-600"
                                }`}
                            >
                              {participant.category}
                            </span>
                          </td>

                          {/* Institution */}

                          <td className="max-w-55 px-5 py-4 align-top">
                            <p
                              className="truncate text-sm text-slate-700"
                              title={participant.institution}
                            >
                              {participant.institution}
                            </p>
                          </td>

                          {/* Country */}

                          <td className="px-5 py-4 align-top">
                            <span className="text-sm text-slate-600">
                              {participant.country}
                            </span>
                          </td>

                          {/* Payment */}

                          <td className="px-5 py-4 align-top">
                            <div>
                              <p className="font-semibold text-slate-900">
                                ₦
                                {participant.amount.toLocaleString()}
                              </p>

                              <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                                <LuCircleCheck className="h-3.5 w-3.5" />

                                {participant.paidAt
                                  ? new Date(
                                    participant.paidAt
                                  ).toLocaleDateString()
                                  : "Confirmed"}
                              </p>
                            </div>
                          </td>

                          {/* Co-authors */}

                          <td className="px-5 py-4 align-top">
                            {participant.coAuthors &&
                              participant.coAuthors.length > 0 ? (
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <button className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
                                    {participant.coAuthors.length}

                                    <LuChevronDown className="h-3 w-3" />
                                  </button>
                                </HoverCardTrigger>

                                <HoverCardContent
                                  side="left"
                                  className="w-80 border-slate-200 p-4"
                                >
                                  <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
                                    <h4 className="text-sm font-semibold text-slate-950">
                                      Co-authors
                                    </h4>

                                    <span className="text-xs text-slate-400">
                                      {
                                        participant
                                          .coAuthors
                                          .length
                                      }{" "}
                                      total
                                    </span>
                                  </div>

                                  <div className="space-y-3">
                                    {participant.coAuthors.map(
                                      (author, i) => (
                                        <div
                                          key={i}
                                          className="border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                                        >
                                          <p className="text-sm font-semibold text-slate-900">
                                            {author.firstName}{" "}
                                            {author.lastName}
                                          </p>

                                          {author.email && (
                                            <p className="mt-1 text-xs text-slate-500">
                                              {author.email}
                                            </p>
                                          )}

                                          {author.institution && (
                                            <p className="mt-1 text-xs text-slate-500">
                                              {
                                                author.institution
                                              }
                                            </p>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            ) : (
                              <span className="text-xs text-slate-400">
                                None
                              </span>
                            )}
                          </td>

                          {/* Paper */}

                          <td className="px-5 py-4 align-top">
                            {participant.paperUrl ? (
                              <a
                                href={participant.paperUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition hover:text-blue-800"
                              >
                                <LuFileText className="h-4 w-4" />
                                View paper
                              </a>
                            ) : (
                              <span className="text-xs text-slate-400">
                                Not available
                              </span>
                            )}
                          </td>

                          {/* Action */}

                          <td className="px-5 py-4 text-right align-top">
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={
                                sendingId ===
                                participant._id
                              }
                              onClick={() =>
                                handleSendReminder(
                                  participant._id
                                )
                              }
                              className="rounded-none border-slate-200 text-xs"
                            >
                              <LuSend className="mr-2 h-3.5 w-3.5" />

                              {sendingId ===
                                participant._id
                                ? "Sending..."
                                : "Reminder"}
                            </Button>
                          </td>

                          <td className="px-5 py-4 text-right align-top">
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={
                                sendingId ===
                                participant._id
                              }
                              onClick={() =>
                                handleSendConferenceMail(
                                  participant._id
                                )
                              }
                              className="rounded-none border-slate-200 text-xs"
                            >
                              <LuSend className="mr-2 h-3.5 w-3.5" />

                              {sendingId ===
                                participant._id
                                ? "Sending..."
                                : "Conference"}
                            </Button>
                          </td>

                          <td className="px-5 py-4 text-right align-top">
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={
                                sendingId ===
                                participant._id
                              }
                              onClick={() =>
                                handleSendConferenceTIcket(
                                  participant._id
                                )
                              }
                              className="rounded-none border-slate-200 text-xs"
                            >
                              <LuSend className="mr-2 h-3.5 w-3.5" />

                              {sendingId ===
                                participant._id
                                ? "Sending..."
                                : "Ticket"}
                            </Button>
                          </td>
                        </tr>
                      )
                    )}

                  </tbody>
                </table>
              </div>
            </section>
          )}
      </div>
    </div>
  );
}