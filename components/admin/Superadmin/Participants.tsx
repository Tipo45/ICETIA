"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { FunctionReturnType } from "convex/server";
import { Country } from "country-state-city";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuChevronDown, LuFileCheck, LuMail, LuRefreshCw, LuSearch, LuSend, LuUsers } from "react-icons/lu";
import { toast } from "sonner";

type ParticipantData = FunctionReturnType<
    typeof api.registration.getParticipants
>;

interface ParticipantProps {
    participants: ParticipantData | undefined;
    category: "author" | "participant" | "student" | undefined;
    setCategory: React.Dispatch<
        React.SetStateAction<"author" | "participant" | "student" | undefined>
    >;

    tracks: string;
    setTracks: React.Dispatch<React.SetStateAction<string>>;

    country: string;
    setCountry: React.Dispatch<React.SetStateAction<string>>;

    paymentDate: string;
    setPaymentDate: React.Dispatch<React.SetStateAction<string>>;

    setSearch: React.Dispatch<React.SetStateAction<string>>;

    authorsCount: number;
    participantCount: number;
    studentsCount: number;

    paperTracks: string[];
}


export default function Participant({ participants,
    setCategory,
    category,
    tracks,
    setTracks,
    country,
    setCountry,
    paymentDate,
    setPaymentDate,
    setSearch,
    authorsCount,
    participantCount,
    studentsCount,
    paperTracks }: ParticipantProps) {

    const router = useRouter();
    const sendConferenceMail = useMutation(api.registration.sendMail);
    const sendEmailTicket = useMutation(api.registration.sendConferenceTicket);
    const sendReminder = useMutation(api.registration.sendReminder);
    const [sendingId, setSendingId] = useState<Id<"registrations"> | null>(null);

    const participantsList = participants ?? [];

    const coAuthorsCount = participantsList.reduce(
        (total, participant) => total + (participant.coAuthors?.length ?? 0),
        0
    );

    const [searchInput, setSearchInput] = useState("");
    

    useEffect(() => {
        const timer = setTimeout(() => setSearch(searchInput), 400);
        return () => clearTimeout(timer);
    }, [searchInput])

    const clearFilters = () => {
        setSearchInput("");
        setSearch("");
        setCategory(undefined);
        setCountry("");
        setPaymentDate("");
        setTracks("");
    };

    const handleSendReminder = async (registrationId: Id<"registrations">) => {
        try {
            setSendingId(registrationId);

            const token = sessionStorage.getItem("icetia-super-admin-session");

            if (!token) {
                toast.error("Your admin session has expired. Please log in again.");
                router.push("/admin/super-admin-login");
                return;
            }

            await sendReminder({ registrationId, token });
            toast.success("Reminder email sent successfully.");
        } catch (error: any) {
            toast.error(error?.data ?? error?.message ?? "Failed to send reminder email.");
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
            toast.success("Confirmation email sent successfully.");
        } catch (error: any) {
            toast.error(error?.data ?? error?.message ?? "Failed to send confirmation email.");
        } finally {
            setSendingId(null);
        }
    };

    const handleSendConferenceTicket = async (
        registrationId: Id<"registrations">
    ) => {
        try {
            setSendingId(registrationId);
            await sendEmailTicket({ registrationId });
            toast.success("Ticket email sent successfully.");
        } catch (error: any) {
            toast.error(error?.data ?? error?.message ?? "Failed to send ticket email.");
        } finally {
            setSendingId(null);
        }
    };

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold text-slate-950">Participants</h2>
                <p className="mt-2 text-sm text-slate-500">
                    View registrations, payment information, submitted papers and email actions.
                </p>
            </div>

            <div className="grid gap-4 tablet:grid-cols-2 2xl:grid-cols-4">
                {[
                    { label: "Authors", value: authorsCount },
                    { label: "Participants", value: participantCount },
                    { label: "Students", value: studentsCount },
                    { label: "Co-authors", value: coAuthorsCount },
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
                    <div className="flex flex-col justify-between gap-3 tablet:flex-row tablet:items-center">
                        <div>
                            <CardTitle className="text-base">Registration directory</CardTitle>
                            <CardDescription>
                                Search and filter the participant records.
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                            <LuRefreshCw className="mr-2" size={14} />
                            Clear filters
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="mb-5 grid gap-3 tablet:grid-cols-2 2xl:grid-cols-5">
                        <div className="relative 2xl:col-span-2">
                            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <Input
                                value={searchInput}
                                onChange={(event) => setSearchInput(event.target.value)}
                                placeholder="Search name, email or registration number..."
                                className="pl-9"
                            />
                        </div>

                        <Select
                            value={category ?? "all"}
                            onValueChange={(value) =>
                                setCategory(
                                    value === "all"
                                        ? undefined
                                        : (value as "author" | "participant" | "student")
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All categories</SelectItem>
                                <SelectItem value="author">Authors</SelectItem>
                                <SelectItem value="participant">Participants</SelectItem>
                                <SelectItem value="student">Students</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={tracks || "all"} onValueChange={(value) => setTracks(value === "all" ? "" : value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All tracks" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All tracks</SelectItem>
                                {paperTracks.map((track) => (
                                    <SelectItem key={track} value={track}>{track}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={country || "all"} onValueChange={(value) => setCountry(value === "all" ? "" : value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All countries" />
                            </SelectTrigger>
                            <SelectContent className="max-h-80">
                                <SelectItem value="all">All countries</SelectItem>
                                {Country.getAllCountries().map((item) => (
                                    <SelectItem key={item.isoCode} value={item.name}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Input
                            type="date"
                            value={paymentDate}
                            onChange={(event) => setPaymentDate(event.target.value)}
                        />
                    </div>

                    {participants === undefined ? (
                        <div className="py-16 text-center text-sm text-slate-400">
                            <LuRefreshCw className="mx-auto mb-3 animate-spin" size={22} />
                            Loading registrations...
                        </div>
                    ) : participantsList.length === 0 ? (
                        <div className="py-16 text-center">
                            <LuUsers className="mx-auto mb-3 text-slate-300" size={30} />
                            <p className="font-semibold">No registrations found</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your search or filters.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Registration</TableHead>
                                        <TableHead>Participant</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Institution</TableHead>
                                        <TableHead>Country</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead>Co-authors</TableHead>
                                        <TableHead>Papers</TableHead>
                                        <TableHead>Email actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {participantsList.map((participant) => (
                                        <TableRow key={participant._id}>
                                            <TableCell className="font-mono text-xs font-semibold">
                                                {participant.registrationNumber}
                                            </TableCell>

                                            <TableCell>
                                                <p className="whitespace-nowrap text-sm font-semibold">
                                                    {participant.firstName} {participant.lastName}
                                                </p>
                                                <p className="text-xs text-slate-400">{participant.email}</p>
                                            </TableCell>

                                            <TableCell>
                                                <Badge variant="outline">{participant.category}</Badge>
                                            </TableCell>

                                            <TableCell className="max-w-45 truncate">
                                                {participant.institution || "—"}
                                            </TableCell>

                                            <TableCell>{participant.country || "—"}</TableCell>

                                            <TableCell>
                                                <p className="whitespace-nowrap text-sm font-semibold">
                                                    ₦{participant.amount.toLocaleString()}
                                                </p>
                                                <p className={`text-xs ${participant.paymentStatus === "paid" ? "text-emerald-600" : "text-amber-600"}`}>
                                                    {participant.paymentStatus}
                                                </p>
                                            </TableCell>

                                            <TableCell>
                                                {participant.coAuthors?.length ? (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" size="sm">
                                                                {participant.coAuthors.length} co-authors
                                                                <LuChevronDown className="ml-2" size={13} />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="start" className="w-72">
                                                            {participant.coAuthors.map((author, index) => (
                                                                <div key={index} className="border-b p-3 last:border-0">
                                                                    <p className="text-sm font-semibold">
                                                                        {author.firstName} {author.lastName}
                                                                    </p>
                                                                    <p className="text-xs text-slate-500">{author.email || "No email provided"}</p>
                                                                    <p className="text-xs text-slate-500">{author.institution || ""}</p>
                                                                </div>
                                                            ))}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                ) : (
                                                    <span className="text-xs text-slate-400">None</span>
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex min-w-42.5 flex-col gap-2">
                                                    {participant.registrationPaper?.paperTitle && (
                                                        <div>
                                                            <p className="line-clamp-2 text-xs font-medium">
                                                                {participant.registrationPaper.paperTitle}
                                                            </p>
                                                            {participant.registrationPaper.paperUrl && (
                                                                <a
                                                                    href={participant.registrationPaper.paperUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs font-semibold text-blue-600 hover:underline"
                                                                >
                                                                    View registration paper
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}

                                                    {participant.submittedPapers?.map((paper) => (
                                                        <div key={paper._id}>
                                                            <p className="line-clamp-2 text-xs font-medium">{paper.paperTitle}</p>
                                                            {paper.paperUrl && (
                                                                <a
                                                                    href={paper.paperUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs font-semibold text-blue-600 hover:underline"
                                                                >
                                                                    View submitted paper
                                                                </a>
                                                            )}
                                                        </div>
                                                    ))}

                                                    {!participant.registrationPaper?.paperTitle &&
                                                        !participant.submittedPapers?.length && (
                                                            <span className="text-xs text-slate-400">No paper</span>
                                                        )}
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex min-w-37.5 flex-col gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={sendingId === participant._id}
                                                        onClick={() => handleSendReminder(participant._id)}
                                                    >
                                                        <LuSend className="mr-2" size={13} />
                                                        Reminder
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={sendingId === participant._id}
                                                        onClick={() => handleSendConferenceMail(participant._id)}
                                                    >
                                                        <LuMail className="mr-2" size={13} />
                                                        Confirmation
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={sendingId === participant._id}
                                                        onClick={() => handleSendConferenceTicket(participant._id)}
                                                    >
                                                        <LuFileCheck className="mr-2" size={13} />
                                                        Ticket
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}