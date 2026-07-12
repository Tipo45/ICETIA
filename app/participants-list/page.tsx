"use client";

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Country } from "country-state-city";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { toast } from "sonner";

export default function ParticipantsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);
  const [category, setCategory] = useState<
    "author" | "participant" | "student" | undefined
  >();
  const [country, setCountry] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const participants = useQuery(
    api.registration.getParticipants,
    {
      search: search || undefined,
      category,
      country: country || undefined,
      paymentDate: paymentDate
        ? new Date(paymentDate).getTime()
        : undefined,
    }
  );

  const participantsList = participants ?? [];

  const totalParticipants = participantsList.reduce((total, participant) => {
    return total + 1 + (participant.coAuthors?.length ?? 0);
  }, 0);

  const sendReminder = useMutation(api.registration.sendReminder);

  const [sendingId, setSendingId] = useState<Id<"registrations"> | null>(null);

  const handleSendReminder = async (
    registrationId: Id<"registrations">
  ) => {
    try {
      setSendingId(registrationId);

      await sendReminder({ registrationId });

      toast.success("Reminder email sent successfully.");
    } catch (error: any) {
      toast.error(
        error.data ??
        error.message ??
        "Failed to send reminder email."
      );
    } finally {
      setSendingId(null);
    }
  };

  {
    participants === undefined && (
      <div className="text-sm text-slate-500">
        Updating results...
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Registered Participants
          </h1>

          <p className="text-slate-500 mt-1">
            View all participants with confirmed payments.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-blue-600 text-white rounded-xl px-6 py-3 shadow">
            <p className="text-xs uppercase opacity-80">
              Total Participants
            </p>

            <h2 className="text-2xl font-bold">
              {totalParticipants}
            </h2>
          </div>
        </div>
      </div>

      {/* ================= Filters ================= */}

      <div className="bg-white rounded-2xl border p-6 shadow-sm">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

          {/* Search */}

          <div className="relative lg:col-span-2">
            <LuSearch className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

            <input
              placeholder="Search name, email or registration number..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-12 pl-10 border rounded-xl focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Category */}

          <Select
            value={category}
            onValueChange={(value) => setCategory(value as any)}
          >
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="participant">Participant</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>

          {/* Country */}

          <Select
            value={country}
            onValueChange={setCountry}
          >
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="Country" />
            </SelectTrigger>

            <SelectContent>
              {Country.getAllCountries().map((country) => (
                <SelectItem
                  key={country.isoCode}
                  value={country.name}
                >
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date */}

          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="h-12 border rounded-xl px-4"
          />

        </div>

        <div className="flex justify-end mt-5">
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setCategory(undefined);
              setCountry("");
              setPaymentDate("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* ================= Table ================= */}

      {participantsList.length === 0 ? (
        <div className="bg-white rounded-2xl border py-20 text-center">

          <h2 className="text-2xl font-semibold">
            No Paid Participants
          </h2>

          <p className="text-slate-500 mt-2">
            There are currently no confirmed registrations.
          </p>

        </div>
      ) : (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-slate-50 border-b">
                <tr className="text-left text-sm font-semibold text-slate-700">

                  <th className="px-5 py-4">#</th>
                  <th className="px-5 py-4">Registration No.</th>
                  <th className="px-5 py-4">Participant</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Institution</th>
                  <th className="px-5 py-4">Country</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Paid At</th>
                  <th className="px-5 py-4">Co-Authors</th>
                  <th className="px-5 py-4">Paper</th>
                  <th className="px-5 py-4 text-center">Action</th>

                </tr>
              </thead>

              <tbody>

                {participantsList.map((participant, index) => (

                  <tr
                    key={participant._id}
                    className="border-b last:border-0 hover:bg-slate-50 transition"
                  >

                    <td className="px-5 py-5">
                      {index + 1}
                    </td>

                    <td className="px-5 py-5 font-medium">
                      {participant.registrationNumber}
                    </td>

                    <td className="px-5 py-5">

                      <div className="font-medium">
                        {participant.firstName} {participant.lastName}
                      </div>

                      <div className="text-sm text-slate-500">
                        {participant.email}
                      </div>

                    </td>

                    <td className="px-5 py-5">
                      <span className="capitalize rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
                        {participant.category}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      {participant.institution}
                    </td>

                    <td className="px-5 py-5">
                      {participant.country}
                    </td>

                    <td className="px-5 py-5 font-semibold text-green-600">
                      ₦{participant.amount.toLocaleString()}
                    </td>

                    <td className="px-5 py-5">
                      {participant.paidAt
                        ? new Date(participant.paidAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-5 py-5">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <span className="cursor-pointer text-blue-600 hover:underline">
                            {participant.coAuthors?.length
                              ? participant.coAuthors.length
                              : "-"}
                          </span>
                        </HoverCardTrigger>

                        {participant.coAuthors && participant.coAuthors.length > 0 && (
                          <HoverCardContent side="right" className="w-72">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm">
                                Co-Authors ({participant.coAuthors.length})
                              </h4>

                              {participant.coAuthors.map((author, i) => (
                                <div
                                  key={i}
                                  className="border-b last:border-0 pb-2 last:pb-0"
                                >
                                  <p className="font-medium">
                                    {author.lastName}, {author.firstName}
                                  </p>

                                  {author.email && (
                                    <p className="text-xs text-slate-500">
                                      {author.email}
                                    </p>
                                  )}

                                  {author.institution && (
                                    <p className="text-xs text-slate-500">
                                      {author.institution}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </HoverCardContent>
                        )}
                      </HoverCard>
                    </td>

                    <td className="px-5 py-5">
                      {participant.paperUrl ? (
                        <a
                          href={participant.paperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Paper
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="px-5 py-5 text-center">

                      <Button
                        size="sm"
                        disabled={sendingId === participant._id}
                        onClick={() => handleSendReminder(participant._id)}
                      >
                        {sendingId === participant._id
                          ? "Sending..."
                          : "Send Reminder"}
                      </Button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}