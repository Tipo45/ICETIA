// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { useAction, useMutation, useQuery } from "convex/react";
// import { Country } from "country-state-city";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   LuCalendarDays,
//   LuChevronDown,
//   LuCircleCheck,
//   LuFileText,
//   LuMail,
//   LuRefreshCw,
//   LuSearch,
//   LuSend,
//   LuUsers,
// } from "react-icons/lu";
// import { toast } from "sonner";

// export default function SuperAdminPage() {
//   const [searchInput, setSearchInput] = useState("");
//   const [search, setSearch] = useState("");
//   const router = useRouter();
//   const sendConferenceMail = useMutation(api.registration.sendMail);
//   const sendEmailTicket = useMutation(api.registration.sendConferenceTicket);
//   const sendReminder = useMutation(api.registration.sendReminder);
//   const verifySession = useAction(api.paperSubmission.verifyAdminSession);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [isChecking, setIsChecking] = useState(true);
//   const logOutAdmin = useAction(api.paperSubmission.logoutAdmin)

//   const [category, setCategory] = useState<
//     "author" | "participant" | "student" | undefined
//   >();
//   const paperTracks = [
//     { name: "Cybersecurity, Privacy & Digital Trust" },
//     { name: "Artificial Intelligence and Machine Learning" },
//     { name: "Smart Systems, Internet of Things and Embedded Computing" },
//     { name: "Computing, Cloud, Edge and Distributed Systems" },
//     { name: "Data Science, Analytics and Big Data" },
//     { name: "Software Development" },
//     { name: "Health Informatics, Digtal Health and Medical Laboratory Technology" },
//     { name: "Emerging Technologies and Digital Transformation" },
//     { name: "Computing for Sustainable Development" },
//     { name: "Information Systems, Governance and Society" },
//   ]

//   const [tracks, setTracks] = useState("")

//   const [country, setCountry] = useState("");
//   const [paymentDate, setPaymentDate] = useState("");

//   const [sendingId, setSendingId] =
//     useState<Id<"registrations"> | null>(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setSearch(searchInput);
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [searchInput]);

//   const participants = useQuery(api.registration.getParticipants, {
//     search: search || undefined,
//     category,
//     country: country || undefined,
//     paymentDate: paymentDate
//       ? new Date(paymentDate).getTime()
//       : undefined,
//   });

//   const participantsList = participants ?? [];

//   const totalParticipants = participantsList.reduce(
//     (total, participant) => {
//       return total + 1 + (participant.coAuthors?.length ?? 0);
//     },
//     0
//   );

//   const authorsCount = participantsList.filter(
//     (participant) => participant.category === "author"
//   ).length;

//   const studentsCount = participantsList.filter(
//     (participant) => participant.category === "student"
//   ).length;

//   const participantCount = participantsList.filter(
//     (participant) => participant.category === "participant"
//   ).length;

//   const clearFilters = () => {
//     setSearchInput("");
//     setSearch("");
//     setCategory(undefined);
//     setCountry("");
//     setPaymentDate("");
//   };

//   const handleSendReminder = async (
//     registrationId: Id<"registrations">
//   ) => {
//     try {
//       setSendingId(registrationId);

//       const token = sessionStorage.getItem("icetia-super-admin-session");

//       if (!token) {
//         toast.error("Your admin session has expired. Please log in again.");
//         router.push("/admin/super-admin-login");
//         return;
//       }

//       await sendReminder({ registrationId, token });

//       toast.success("Reminder email sent successfully.");
//     } catch (error: any) {
//       toast.error(
//         error?.data ??
//         error?.message ??
//         "Failed to send reminder email."
//       );
//     } finally {
//       setSendingId(null);
//     }
//   };

//   const handleSendConferenceMail = async (
//     registrationId: Id<"registrations">
//   ) => {
//     try {
//       setSendingId(registrationId);

//       await sendConferenceMail({ registrationId });

//       toast.success("Email sent successfully.");
//     } catch (error: any) {
//       toast.error(
//         error?.data ??
//         error?.message ??
//         "Failed to send reminder email."
//       );
//     } finally {
//       setSendingId(null);
//     }
//   };

//   const handleSendConferenceTIcket = async (
//     registrationId: Id<"registrations">
//   ) => {
//     try {
//       setSendingId(registrationId);

//       await sendEmailTicket({ registrationId });

//       toast.success("Email sent successfully.");
//     } catch (error: any) {
//       toast.error(
//         error?.data ??
//         error?.message ??
//         "Failed to send reminder email."
//       );
//     } finally {
//       setSendingId(null);
//     }
//   };


//   const handleLogOut = async () => {
//     const sessionToken = sessionStorage.getItem(
//       "icetia-super-admin-session"
//     );

//     try {
//       if (sessionToken) {
//         await logOutAdmin({ sessionToken });
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Could not revoke the admin session.");
//       return;
//     }

//     toast.success("Logged out successfully")

//     sessionStorage.removeItem("icetia-super-admin-session");
//     router.replace("/admin/login/super-admin");
//   };

//   useEffect(() => {
//     let cancelled = false;

//     const checkSession = async () => {
//       const token = sessionStorage.getItem(
//         "icetia-super-admin-session"
//       );

//       if (!token) {
//         router.replace("/admin/login/super-admin");
//         return;
//       }

//       try {
//         const result = await verifySession({
//           sessionToken: token,
//         });

//         if (cancelled) return;

//         if (!result.valid) {
//           sessionStorage.removeItem(
//             "icetia-super-admin-session"
//           );

//           router.replace("/admin/login/super-admin");
//           return;
//         }

//         setIsAuthorized(true);
//       } catch {
//         if (!cancelled) {
//           router.replace("/admin/login/super-admin");
//         }
//       } finally {
//         if (!cancelled) {
//           setIsChecking(false);
//         }
//       }
//     };

//     void checkSession();

//     return () => {
//       cancelled = true;
//     };
//   }, [router, verifySession]);

//   if (isChecking || !isAuthorized) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <p>Verifying admin access...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-8 xl:px-10">

//         {/* ================= HEADER ================= */}

//         <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
//           <div>
//             <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
//               <LuUsers className="h-4 w-4" />
//               Registration Management
//             </div>

//             <h1 className="text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
//               Registered Participants
//             </h1>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
//               View, filter and manage confirmed conference registrations.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="border border-slate-200 bg-white px-4 py-3">
//               <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
//                 Showing
//               </p>

//               <p className="mt-1 text-lg font-bold text-slate-950">
//                 {participants === undefined
//                   ? "—"
//                   : participantsList.length}
//               </p>
//             </div>

//             <div className="border border-slate-900 bg-[#07111f] px-4 py-3 text-white">
//               <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
//                 Total People
//               </p>

//               <p className="mt-1 text-lg font-bold">
//                 {participants === undefined
//                   ? "—"
//                   : totalParticipants}
//               </p>
//             </div>

//             <Button
//               onClick={handleLogOut}
//               className="h-auto bg-red-600 rounded-2xl px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white hover:bg-red-700"
//             >
//               Logout
//             </Button>
//           </div>
//         </div>

//         {/* ================= SUMMARY ================= */}

//         <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 tablet:grid-cols-4">
//           <div className="bg-white p-5">
//             <div className="flex items-center justify-between">
//               <span className="text-xs font-medium text-slate-500">
//                 Authors
//               </span>

//               <LuFileText className="h-4 w-4 text-blue-600" />
//             </div>

//             <p className="mt-3 text-2xl font-bold text-slate-950">
//               {authorsCount}
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Paper submissions
//             </p>
//           </div>

//           <div className="bg-white p-5">
//             <div className="flex items-center justify-between">
//               <span className="text-xs font-medium text-slate-500">
//                 Participants
//               </span>

//               <LuUsers className="h-4 w-4 text-blue-600" />
//             </div>

//             <p className="mt-3 text-2xl font-bold text-slate-950">
//               {participantCount}
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               General attendees
//             </p>
//           </div>

//           <div className="bg-white p-5">
//             <div className="flex items-center justify-between">
//               <span className="text-xs font-medium text-slate-500">
//                 Students
//               </span>

//               <LuCircleCheck className="h-4 w-4 text-blue-600" />
//             </div>

//             <p className="mt-3 text-2xl font-bold text-slate-950">
//               {studentsCount}
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Student registrations
//             </p>
//           </div>

//           <div className="bg-white p-5">
//             <div className="flex items-center justify-between">
//               <span className="text-xs font-medium text-slate-500">
//                 Co-authors
//               </span>

//               <LuUsers className="h-4 w-4 text-blue-600" />
//             </div>

//             <p className="mt-3 text-2xl font-bold text-slate-950">
//               {participantsList.reduce(
//                 (total, participant) =>
//                   total + (participant.coAuthors?.length ?? 0),
//                 0
//               )}
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Additional authors
//             </p>
//           </div>
//         </div>

//         {/* ================= FILTERS ================= */}

//         <section className="mb-6 border border-slate-200 bg-white">
//           <div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <h2 className="text-sm font-semibold text-slate-950">
//                 Search & Filters
//               </h2>

//               <p className="mt-1 text-xs text-slate-500">
//                 Narrow the registration list using the available filters.
//               </p>
//             </div>

//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={clearFilters}
//               className="w-fit text-slate-500 hover:text-slate-950"
//             >
//               <LuRefreshCw className="mr-2 h-4 w-4" />
//               Clear filters
//             </Button>
//           </div>

//           <div className="grid gap-4 p-5 tablet:grid-cols-2 xl:grid-cols-5">

//             {/* Search */}

//             <div className="relative xl:col-span-2">
//               <LuSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//               <input
//                 type="text"
//                 placeholder="Search name, email or registration number..."
//                 value={searchInput}
//                 onChange={(e) =>
//                   setSearchInput(e.target.value)
//                 }
//                 className="h-11 w-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
//               />
//             </div>

//             {/* Category */}

//             <Select
//               value={category}
//               onValueChange={(value) =>
//                 setCategory(
//                   value as
//                   | "author"
//                   | "participant"
//                   | "student"
//                 )
//               }
//             >
//               <SelectTrigger className="h-11 rounded-none border-slate-200 bg-slate-50 text-sm">
//                 <SelectValue placeholder="All categories" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="author">
//                   Author
//                 </SelectItem>

//                 <SelectItem value="participant">
//                   Participant
//                 </SelectItem>

//                 <SelectItem value="student">
//                   Student
//                 </SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Track */}
//             <Select
//               value={tracks}
//               onValueChange={setTracks}
//             >
//               <SelectTrigger className="h-11 rounded-none border-slate-200 bg-slate-50 text-sm">
//                 <SelectValue placeholder="All categories" />
//               </SelectTrigger>

//               <SelectContent>
//                 {paperTracks.map((item) => (
//                   <SelectItem
//                     key={item.name}
//                     value={item.name}>
//                     {item.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Country */}

//             <Select
//               value={country}
//               onValueChange={setCountry}
//             >
//               <SelectTrigger className="h-11 rounded-none border-slate-200 bg-slate-50 text-sm">
//                 <SelectValue placeholder="All countries" />
//               </SelectTrigger>

//               <SelectContent className="max-h-80">
//                 {Country.getAllCountries().map((item) => (
//                   <SelectItem
//                     key={item.isoCode}
//                     value={item.name}
//                   >
//                     {item.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Payment Date */}

//             <div className="relative">
//               <LuCalendarDays className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//               <input
//                 type="date"
//                 value={paymentDate}
//                 onChange={(e) =>
//                   setPaymentDate(e.target.value)
//                 }
//                 className="h-11 w-full border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
//               />
//             </div>
//           </div>
//         </section>

//         {/* ================= LOADING ================= */}

//         {participants === undefined && (
//           <div className="border border-slate-200 bg-white px-6 py-16 text-center">
//             <LuRefreshCw className="mx-auto h-6 w-6 animate-spin text-blue-600" />

//             <p className="mt-4 text-sm font-medium text-slate-700">
//               Updating results...
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Fetching the latest registrations.
//             </p>
//           </div>
//         )}

//         {/* ================= EMPTY ================= */}

//         {participants !== undefined &&
//           participantsList.length === 0 && (
//             <div className="border border-slate-200 bg-white px-6 py-20 text-center">
//               <div className="mx-auto flex h-12 w-12 items-center justify-center border border-slate-200 bg-slate-50">
//                 <LuUsers className="h-5 w-5 text-slate-400" />
//               </div>

//               <h2 className="mt-5 text-lg font-semibold text-slate-950">
//                 No registrations found
//               </h2>

//               <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
//                 No confirmed registrations match the current search
//                 and filter settings.
//               </p>

//               <Button
//                 variant="outline"
//                 className="mt-5 rounded-none"
//                 onClick={clearFilters}
//               >
//                 Clear filters
//               </Button>
//             </div>
//           )}

//         {/* ================= TABLE ================= */}

//         {participants !== undefined &&
//           participantsList.length > 0 && (
//             <section className="overflow-hidden border border-slate-200 bg-white">

//               {/* Table header */}

//               <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
//                 <div>
//                   <h2 className="text-sm font-semibold text-slate-950">
//                     Confirmed Registrations
//                   </h2>

//                   <p className="mt-1 text-xs text-slate-500">
//                     {participantsList.length} registration
//                     {participantsList.length !== 1 ? "s" : ""} displayed
//                   </p>
//                 </div>

//                 {/* <div className="flex items-center gap-2 text-xs text-slate-400">
//                   <LuCircleCheck className="h-4 w-4 text-green-600" />
//                   Confirmed payment
//                 </div> */}
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-312.5 w-full">

//                   <thead>
//                     <tr className="border-b border-slate-200 bg-slate-50 text-left">
//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         #
//                       </th>

//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Registration
//                       </th>

//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Participant
//                       </th>

//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Category
//                       </th>

//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Institution
//                       </th>

//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Country
//                       </th>

//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Payment
//                       </th>

//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Co-authors
//                       </th>
//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Track
//                       </th>
//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Title
//                       </th>

//                       <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Paper
//                       </th>

//                       <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Send Reminder Mail
//                       </th>

//                       <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Send Confirmation Mail
//                       </th>

//                       <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
//                         Send Ticket Mail
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-slate-100">

//                     {participantsList.map(
//                       (participant, index) => (
//                         <tr
//                           key={participant._id}
//                           className="group transition-colors hover:bg-slate-50/80"
//                         >
//                           {/* Number */}

//                           <td className="px-5 py-4 align-top text-xs font-medium text-slate-400">
//                             {String(index + 1).padStart(2, "0")}
//                           </td>

//                           {/* Registration */}

//                           <td className="px-5 py-4 align-top">
//                             <span className="font-mono text-xs font-semibold text-slate-700">
//                               {participant.registrationNumber}
//                             </span>
//                           </td>

//                           {/* Participant */}

//                           <td className="px-5 py-4 align-top">
//                             <div className="flex items-start gap-3">

//                               <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#07111f] text-xs font-bold text-white">
//                                 {participant.firstName
//                                   ?.charAt(0)
//                                   .toUpperCase()}
//                                 {participant.lastName
//                                   ?.charAt(0)
//                                   .toUpperCase()}
//                               </div>

//                               <div className="min-w-0">
//                                 <p className="font-semibold text-slate-900">
//                                   {participant.firstName}{" "}
//                                   {participant.lastName}
//                                 </p>

//                                 <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
//                                   <LuMail className="h-3 w-3" />

//                                   {participant.email}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>

//                           {/* Category */}

//                           <td className="px-5 py-4 align-top">
//                             <span
//                               className={`inline-flex items-center border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${participant.category ===
//                                 "author"
//                                 ? "border-blue-200 bg-blue-50 text-blue-700"
//                                 : participant.category ===
//                                   "student"
//                                   ? "border-purple-200 bg-purple-50 text-purple-700"
//                                   : "border-slate-200 bg-slate-50 text-slate-600"
//                                 }`}
//                             >
//                               {participant.category}
//                             </span>
//                           </td>

//                           {/* Institution */}

//                           <td className="max-w-55 px-5 py-4 align-top">
//                             <p
//                               className="truncate text-sm text-slate-700"
//                               title={participant.institution}
//                             >
//                               {participant.institution}
//                             </p>
//                           </td>

//                           {/* Country */}

//                           <td className="px-5 py-4 align-top">
//                             <span className="text-sm text-slate-600">
//                               {participant.country}
//                             </span>
//                           </td>

//                           {/* Payment */}

//                           <td className="px-5 py-4 align-top">
//                             <div>
//                               <p className="font-semibold text-slate-900">
//                                 ₦
//                                 {participant.amount.toLocaleString()}
//                               </p>

//                               {participant.paidAt ?
//                                 <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
//                                   <LuCircleCheck className="h-3.5 w-3.5" /> {new Date(participant.paidAt).toLocaleDateString()}
//                                 </p>
//                                 :
//                                 <p className="mt-1 flex items-center gap-1 text-xs text-red-600">Pending...
//                                 </p>}

//                             </div>
//                           </td>

//                           {/* Co-authors */}

//                           <td className="px-5 py-4 align-top">
//                             {participant.coAuthors &&
//                               participant.coAuthors.length > 0 ? (
//                               <HoverCard>
//                                 <HoverCardTrigger asChild>
//                                   <button className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
//                                     {participant.coAuthors.length}

//                                     <LuChevronDown className="h-3 w-3" />
//                                   </button>
//                                 </HoverCardTrigger>

//                                 <HoverCardContent
//                                   side="left"
//                                   className="w-80 border-slate-200 p-4"
//                                 >
//                                   <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
//                                     <h4 className="text-sm font-semibold text-slate-950">
//                                       Co-authors
//                                     </h4>

//                                     <span className="text-xs text-slate-400">
//                                       {
//                                         participant
//                                           .coAuthors
//                                           .length
//                                       }{" "}
//                                       total
//                                     </span>
//                                   </div>

//                                   <div className="space-y-3">
//                                     {participant.coAuthors.map(
//                                       (author, i) => (
//                                         <div
//                                           key={i}
//                                           className="border-b border-slate-100 pb-3 last:border-0 last:pb-0"
//                                         >
//                                           <p className="text-sm font-semibold text-slate-900">
//                                             {author.firstName}{" "}
//                                             {author.lastName}
//                                           </p>

//                                           {author.email && (
//                                             <p className="mt-1 text-xs text-slate-500">
//                                               {author.email}
//                                             </p>
//                                           )}

//                                           {author.institution && (
//                                             <p className="mt-1 text-xs text-slate-500">
//                                               {
//                                                 author.institution
//                                               }
//                                             </p>
//                                           )}
//                                         </div>
//                                       )
//                                     )}
//                                   </div>
//                                 </HoverCardContent>
//                               </HoverCard>
//                             ) : (
//                               <span className="text-xs text-slate-400">
//                                 None
//                               </span>
//                             )}
//                           </td>

//                           {/* Paper */}
//                           {/* Paper Track */}
//                           <td className="px-5 py-4 align-top">
//                             <div className="flex flex-col gap-2">
//                               {participant.registrationPaper?.paperTrack && (
//                                 <p className="text-xs font-medium text-slate-700">
//                                   {participant.registrationPaper.paperTrack}
//                                   <span className="ml-1 text-[10px] text-slate-400">
//                                     (Registration)
//                                   </span>
//                                 </p>
//                               )}

//                               {participant.submittedPapers?.map((paper) => (
//                                 <p key={paper._id} className="text-xs text-slate-700">
//                                   {paper.paperTrack}
//                                   <span className="ml-1 text-[10px] text-slate-400">
//                                     (Call for Papers)
//                                   </span>
//                                 </p>
//                               ))}

//                               {!participant.registrationPaper?.paperTrack &&
//                                 !participant.submittedPapers?.length && (
//                                   <span className="text-xs text-slate-400">
//                                     Not available
//                                   </span>
//                                 )}
//                             </div>
//                           </td>

//                           {/* Paper Title */}
//                           <td className="px-5 py-4 align-top">
//                             <div className="flex flex-col gap-2">
//                               {participant.registrationPaper?.paperTitle && (
//                                 <p className="text-xs font-medium text-slate-700">
//                                   {participant.registrationPaper.paperTitle}
//                                   <span className="ml-1 text-[10px] text-slate-400">
//                                     (Registration)
//                                   </span>
//                                 </p>
//                               )}

//                               {participant.submittedPapers?.map((paper) => (
//                                 <p key={paper._id} className="text-xs text-slate-700">
//                                   {paper.paperTitle}
//                                   <span className="ml-1 text-[10px] text-slate-400">
//                                     (Call for Papers)
//                                   </span>
//                                 </p>
//                               ))}

//                               {!participant.registrationPaper?.paperTitle &&
//                                 !participant.submittedPapers?.length && (
//                                   <span className="text-xs text-slate-400">
//                                     Not available
//                                   </span>
//                                 )}
//                             </div>
//                           </td>

//                           {/* Paper File */}
//                           <td className="px-5 py-4 align-top">
//                             <div className="flex flex-col gap-2">
//                               {participant.registrationPaper?.paperUrl && (
//                                 <a
//                                   href={participant.registrationPaper.paperUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition hover:text-blue-800"
//                                 >
//                                   <LuFileText className="h-4 w-4" />
//                                   View paper
//                                   <span className="text-[10px] text-slate-400">
//                                     (Registration)
//                                   </span>
//                                 </a>
//                               )}

//                               {participant.submittedPapers?.map((paper) => (
//                                 paper.paperUrl && (
//                                   <a
//                                     key={paper._id}
//                                     href={paper.paperUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition hover:text-blue-800"
//                                   >
//                                     <LuFileText className="h-4 w-4" />
//                                     View paper
//                                     <span className="text-[10px] text-slate-400">
//                                       (Call for Papers)
//                                     </span>
//                                   </a>
//                                 )
//                               ))}

//                               {!participant.registrationPaper?.paperUrl &&
//                                 !participant.submittedPapers?.some((paper) => paper.paperUrl) && (
//                                   <span className="text-xs text-slate-400">
//                                     Not available
//                                   </span>
//                                 )}
//                             </div>
//                           </td>

//                           {/* Action */}

//                           <td className="px-5 py-4 text-right align-top">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               disabled={
//                                 sendingId ===
//                                 participant._id
//                               }
//                               onClick={() =>
//                                 handleSendReminder(
//                                   participant._id
//                                 )
//                               }
//                               className="rounded-none border-slate-200 text-xs"
//                             >
//                               <LuSend className="mr-2 h-3.5 w-3.5" />

//                               {sendingId ===
//                                 participant._id
//                                 ? "Sending..."
//                                 : "Reminder"}
//                             </Button>
//                           </td>

//                           <td className="px-5 py-4 text-right align-top">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               disabled={
//                                 sendingId ===
//                                 participant._id
//                               }
//                               onClick={() =>
//                                 handleSendConferenceMail(
//                                   participant._id
//                                 )
//                               }
//                               className="rounded-none border-slate-200 text-xs"
//                             >
//                               <LuSend className="mr-2 h-3.5 w-3.5" />

//                               {sendingId ===
//                                 participant._id
//                                 ? "Sending..."
//                                 : "Conference"}
//                             </Button>
//                           </td>

//                           <td className="px-5 py-4 text-right align-top">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               disabled={
//                                 sendingId ===
//                                 participant._id
//                               }
//                               onClick={() =>
//                                 handleSendConferenceTIcket(
//                                   participant._id
//                                 )
//                               }
//                               className="rounded-none border-slate-200 text-xs"
//                             >
//                               <LuSend className="mr-2 h-3.5 w-3.5" />

//                               {sendingId ===
//                                 participant._id
//                                 ? "Sending..."
//                                 : "Ticket"}
//                             </Button>
//                           </td>
//                         </tr>
//                       )
//                     )}

//                   </tbody>
//                 </table>
//               </div>
//             </section>
//           )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Country } from "country-state-city";
import { useAction, useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  LuActivity,
  LuChevronDown,
  LuClipboardList,
  LuDownload,
  LuFileCheck,
  LuFileText,
  LuLayoutDashboard,
  LuLogOut,
  LuMail,
  LuMenu,
  LuPlus,
  LuRefreshCw,
  LuSearch,
  LuSend,
  LuShieldCheck,
  LuUsers,
  LuUserRound,
  LuX,
} from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

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
  id: string;
  name: string;
  email: string;
  institution: string;
  expertise: string;
  role: TeamRole;
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
  id: string;
  paperId: string;
  editorId: string;
  reviewerIds: string[];
  deadline: string;
  status: "assigned" | "in_progress" | "completed";
};

// --------------------------------------------------
// CONSTANTS
// --------------------------------------------------

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

// --------------------------------------------------
// MAIN PAGE
// --------------------------------------------------

export default function SuperAdminPage() {
  const router = useRouter();

  // Existing authentication
  const verifySession = useAction(api.paperSubmission.verifyAdminSession);
  const logOutAdmin = useAction(api.paperSubmission.logoutAdmin);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Existing email functions
  const sendConferenceMail = useMutation(api.registration.sendMail);
  const sendEmailTicket = useMutation(api.registration.sendConferenceTicket);
  const sendReminder = useMutation(api.registration.sendReminder);

  // Navigation
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Existing participant filters
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<
    "author" | "participant" | "student" | undefined
  >();
  const [tracks, setTracks] = useState("");
  const [country, setCountry] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const [sendingId, setSendingId] =
    useState<Id<"registrations"> | null>(null);

  // Editorial UI state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberInstitution, setMemberInstitution] = useState("");
  const [memberExpertise, setMemberExpertise] = useState("");
  const [memberRole, setMemberRole] = useState<TeamRole>("editor");

  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [selectedPaperId, setSelectedPaperId] = useState("");
  const [selectedEditorId, setSelectedEditorId] = useState("");
  const [selectedReviewerIds, setSelectedReviewerIds] = useState<string[]>([]);
  const [assignmentDeadline, setAssignmentDeadline] = useState("");

  const [paperSearch, setPaperSearch] = useState("");
  const [paperStatusFilter, setPaperStatusFilter] = useState("all");
  const [teamSearch, setTeamSearch] = useState("");
  const [teamRoleFilter, setTeamRoleFilter] = useState("all");

  // --------------------------------------------------
  // EXISTING AUTHENTICATION CHECK
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      const token = sessionStorage.getItem("icetia-super-admin-session");

      if (!token) {
        router.replace("/admin/login/super-admin");
        return;
      }

      try {
        const result = await verifySession({ sessionToken: token });

        if (cancelled) return;

        if (!result.valid) {
          sessionStorage.removeItem("icetia-super-admin-session");
          router.replace("/admin/login/super-admin");
          return;
        }

        setIsAuthorized(true);
      } catch {
        if (!cancelled) {
          router.replace("/admin/login/super-admin");
        }
      } finally {
        if (!cancelled) setIsChecking(false);
      }
    };

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [router, verifySession]);

  // --------------------------------------------------
  // EXISTING PARTICIPANT QUERY
  // --------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 400);
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

  const coAuthorsCount = participantsList.reduce(
    (total, participant) => total + (participant.coAuthors?.length ?? 0),
    0
  );

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

  const filteredTeam = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(teamSearch.toLowerCase());

    const matchesRole =
      teamRoleFilter === "all" || member.role === teamRoleFilter;

    return matchesSearch && matchesRole;
  });

  // --------------------------------------------------
  // EXISTING PARTICIPANT ACTIONS
  // --------------------------------------------------

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

  const handleLogOut = async () => {
    const sessionToken = sessionStorage.getItem("icetia-super-admin-session");

    try {
      if (sessionToken) await logOutAdmin({ sessionToken });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Could not revoke the admin session.");
      return;
    }

    toast.success("Logged out successfully");
    sessionStorage.removeItem("icetia-super-admin-session");
    router.replace("/admin/login/super-admin");
  };

  // --------------------------------------------------
  // TEAM MANAGEMENT UI
  // --------------------------------------------------

  const resetTeamForm = () => {
    setEditingMember(null);
    setMemberName("");
    setMemberEmail("");
    setMemberInstitution("");
    setMemberExpertise("");
    setMemberRole("editor");
  };

  const openAddMember = (role: TeamRole) => {
    resetTeamForm();
    setMemberRole(role);
    setTeamDialogOpen(true);
  };

  const openEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setMemberName(member.name);
    setMemberEmail(member.email);
    setMemberInstitution(member.institution);
    setMemberExpertise(member.expertise);
    setMemberRole(member.role);
    setTeamDialogOpen(true);
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
                institution: memberInstitution,
                expertise: memberExpertise,
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
        institution: memberInstitution,
        expertise: memberExpertise,
        role: memberRole,
        status: "active",
      };

      setTeamMembers((current) => [...current, newMember]);
      toast.success(`${memberRole === "editor" ? "Editor" : "Reviewer"} added.`);
    }

    setTeamDialogOpen(false);
    resetTeamForm();
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

  const deleteMember = (id: string) => {
    setTeamMembers((current) => current.filter((member) => member.id !== id));
    toast.success("Team member removed.");
  };

  // --------------------------------------------------
  // PAPER ASSIGNMENT UI
  // --------------------------------------------------

  const toggleReviewer = (id: string) => {
    setSelectedReviewerIds((current) =>
      current.includes(id)
        ? current.filter((reviewerId) => reviewerId !== id)
        : [...current, id]
    );
  };

  const handleCreateAssignment = () => {
    if (!selectedPaperId || !selectedEditorId || selectedReviewerIds.length === 0) {
      toast.error("Select a paper, an editor and at least one reviewer.");
      return;
    }

    if (!assignmentDeadline) {
      toast.error("Please select a review deadline.");
      return;
    }

    const assignment: Assignment = {
      id: crypto.randomUUID(),
      paperId: selectedPaperId,
      editorId: selectedEditorId,
      reviewerIds: selectedReviewerIds,
      deadline: assignmentDeadline,
      status: "assigned",
    };

    setAssignments((current) => [...current, assignment]);
    setAssignmentDialogOpen(false);

    setSelectedPaperId("");
    setSelectedEditorId("");
    setSelectedReviewerIds([]);
    setAssignmentDeadline("");

    toast.success("Paper assignment created.");
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

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (isChecking || !isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">
        <div className="text-center">
          <LuRefreshCw className="mx-auto h-7 w-7 animate-spin text-cyan-400" />
          <p className="mt-4 text-sm text-slate-300">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // SIDEBAR
  // --------------------------------------------------

  const Sidebar = () => (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-white/10 bg-[#07111f] text-white transition-transform duration-300 xl:translate-x-0 ${
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-[82px] items-center gap-3 border-b border-white/10 px-6">
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
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                        active
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
          onClick={handleLogOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
        >
          <LuLogOut size={17} />
          Sign out
        </button>
      </div>
    </aside>
  );

  // --------------------------------------------------
  // PAGE HEADER
  // --------------------------------------------------

  const sectionTitle = navigation.find(
    (item) => item.value === activeSection
  )?.label;

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

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

      <div className="min-h-screen xl:pl-[270px]">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur-md lg:px-8">
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
                Editorial Office
              </p>
              <p className="text-[10px] text-slate-400">
                Federal University Otuoke
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#07111f] text-xs font-bold text-cyan-400">
              SA
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-7 px-5 py-7 lg:px-8 lg:py-9">
          {/* ==========================================
              OVERVIEW
          ========================================== */}

          {activeSection === "overview" && (
            <>
              <div className="flex flex-col justify-between gap-4 tablet:flex-row tablet:items-end">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
                    Conference administration
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
                    Editorial Management Dashboard
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Manage conference registrations, submitted papers,
                    editorial assignments and peer-review activities.
                  </p>
                </div>

                <Button
                  onClick={() => setActiveSection("assignments")}
                  className="bg-[#07111f] text-white hover:bg-slate-800"
                >
                  <LuPlus className="mr-2" size={16} />
                  Create assignment
                </Button>
              </div>

              {/* SUMMARY CARDS */}
              <div className="grid gap-4 tablet:grid-cols-2 2xl:grid-cols-4">
                {[
                  {
                    label: "Registrations",
                    value: participants === undefined ? "—" : participantsList.length,
                    note: `${totalPeople} registered people including co-authors`,
                    icon: LuUsers,
                    color: "text-blue-600 bg-blue-50",
                  },
                  {
                    label: "Submitted papers",
                    value: participants === undefined ? "—" : papers.length,
                    note: "Papers available in the current participant results",
                    icon: LuFileText,
                    color: "text-cyan-700 bg-cyan-50",
                  },
                  {
                    label: "Editors",
                    value: editors.length,
                    note: `${activeEditors.length} active`,
                    icon: LuUserRound,
                    color: "text-purple-600 bg-purple-50",
                  },
                  {
                    label: "Reviewers",
                    value: reviewers.length,
                    note: `${activeReviewers.length} active`,
                    icon: LuClipboardList,
                    color: "text-emerald-600 bg-emerald-50",
                  },
                ].map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <Card key={stat.label} className="rounded-xl border-slate-200 shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-medium text-slate-500">
                              {stat.label}
                            </p>
                            <p className="mt-3 text-3xl font-bold text-slate-950">
                              {stat.value}
                            </p>
                          </div>
                          <div className={`rounded-xl p-3 ${stat.color}`}>
                            <Icon size={20} />
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-slate-400">{stat.note}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* SECONDARY STATS */}
              <div className="grid gap-4 tablet:grid-cols-3">
                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                    <p className="text-xs text-slate-500">Authors</p>
                    <p className="mt-2 text-2xl font-bold">{authorsCount}</p>
                    <p className="mt-1 text-xs text-slate-400">Author registrations</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                    <p className="text-xs text-slate-500">Students</p>
                    <p className="mt-2 text-2xl font-bold">{studentsCount}</p>
                    <p className="mt-1 text-xs text-slate-400">Student registrations</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                    <p className="text-xs text-slate-500">Paid registrations</p>
                    <p className="mt-2 text-2xl font-bold">{paidCount}</p>
                    <p className="mt-1 text-xs text-slate-400">Based on current results</p>
                  </CardContent>
                </Card>
              </div>

              {/* OVERVIEW CONTENT */}
              <div className="grid gap-6 2xl:grid-cols-[1.4fr_1fr]">
                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Editorial workflow</CardTitle>
                    <CardDescription>
                      A quick view of the current paper assignment workload.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {[
                      {
                        label: "Papers received",
                        value: papers.length,
                        total: papers.length || 1,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Papers assigned",
                        value: assignments.length,
                        total: papers.length || 1,
                        color: "bg-cyan-500",
                      },
                      {
                        label: "Unassigned papers",
                        value: unassignedPapers.length,
                        total: papers.length || 1,
                        color: "bg-amber-500",
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="font-medium text-slate-600">{item.label}</span>
                          <span className="font-bold text-slate-900">{item.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${item.color}`}
                            style={{
                              width: `${Math.min((item.value / item.total) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Quick actions</CardTitle>
                    <CardDescription>
                      Common editorial administration tasks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <button
                      onClick={() => openAddMember("editor")}
                      className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50/50"
                    >
                      <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                        <LuPlus size={18} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">Add an editor</span>
                        <span className="text-xs text-slate-400">Register an editorial team member</span>
                      </span>
                    </button>

                    <button
                      onClick={() => openAddMember("reviewer")}
                      className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50/50"
                    >
                      <span className="rounded-lg bg-purple-50 p-2 text-purple-600">
                        <LuPlus size={18} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">Add a reviewer</span>
                        <span className="text-xs text-slate-400">Expand the reviewer pool</span>
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveSection("papers")}
                      className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50/50"
                    >
                      <span className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                        <LuFileText size={18} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">Review submitted papers</span>
                        <span className="text-xs text-slate-400">Browse paper submissions</span>
                      </span>
                    </button>
                  </CardContent>
                </Card>
              </div>

              {/* RECENT PAPERS */}
              <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Recently available papers</CardTitle>
                    <CardDescription>Paper submissions from the current participant results.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveSection("papers")}>
                    View all
                  </Button>
                </CardHeader>
                <CardContent>
                  {papers.length === 0 ? (
                    <p className="py-8 text-center text-sm text-slate-400">
                      No papers are available in the current results.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {papers.slice(0, 5).map((paper) => (
                        <div
                          key={paper.id}
                          className="flex flex-col justify-between gap-3 rounded-lg border border-slate-100 p-4 tablet:flex-row tablet:items-center"
                        >
                          <div className="min-w-0">
                            <p className="line-clamp-1 text-sm font-semibold text-slate-900">
                              {paper.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {paper.author} · {paper.track}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {statusBadge(paper.status)}
                            {paper.url && (
                              <a
                                href={paper.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-blue-600 hover:underline"
                              >
                                View paper
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* ==========================================
              PARTICIPANTS
          ========================================== */}

          {activeSection === "participants" && (
            <>
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

              <Card className="rounded-xl border-slate-200 shadow-sm">
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

                              <TableCell className="max-w-[180px] truncate">
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
                                <div className="flex min-w-[170px] flex-col gap-2">
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
                                <div className="flex min-w-[150px] flex-col gap-2">
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
            </>
          )}

          {/* ==========================================
              EDITORS & REVIEWERS
          ========================================== */}

          {activeSection === "team" && (
            <>
              <div className="flex flex-col justify-between gap-4 tablet:flex-row tablet:items-end">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">Editors & Reviewers</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Manage the editorial team responsible for handling submitted papers.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
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

              <div className="grid gap-4 tablet:grid-cols-2 2xl:grid-cols-4">
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
                        <SelectTrigger className="w-[150px]">
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
                      <Button
                        onClick={() => openAddMember("editor")}
                        className="mt-4 bg-[#07111f]"
                      >
                        <LuPlus className="mr-2" size={15} />
                        Add first member
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Team member</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Institution</TableHead>
                            <TableHead>Expertise</TableHead>
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
                                <TableCell>{member.institution || "—"}</TableCell>
                                <TableCell className="max-w-[200px]">
                                  <p className="line-clamp-2 text-xs text-slate-600">
                                    {member.expertise || "Not specified"}
                                  </p>
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
            </>
          )}

          {/* ==========================================
              PAPER MANAGEMENT
          ========================================== */}

          {activeSection === "papers" && (
            <>
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Paper Management</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Review all papers received through participant registration and the call for papers.
                </p>
              </div>

              <div className="grid gap-4 tablet:grid-cols-3">
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
                        <SelectTrigger className="w-[170px]">
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
                                <TableCell className="min-w-[230px]">
                                  <p className="font-semibold">{paper.title}</p>
                                  <p className="mt-1 font-mono text-[10px] text-slate-400">
                                    {paper.registrationNumber}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <p className="whitespace-nowrap text-sm">{paper.author}</p>
                                  <p className="text-xs text-slate-400">{paper.email}</p>
                                </TableCell>
                                <TableCell className="min-w-[180px] text-xs">{paper.track}</TableCell>
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
            </>
          )}

          {/* ==========================================
              PAPER ASSIGNMENTS
          ========================================== */}

          {activeSection === "assignments" && (
            <>
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

              <div className="grid gap-4 tablet:grid-cols-3">
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

              <Card className="rounded-xl border-slate-200 shadow-sm">
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
                                <TableCell className="min-w-[220px]">
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
            </>
          )}

          {/* ==========================================
              REVIEWS & DECISIONS
          ========================================== */}

          {activeSection === "reviews" && (
            <>
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Reviews & Decisions</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Monitor assigned reviews and prepare editorial decisions.
                </p>
              </div>

              <div className="grid gap-4 tablet:grid-cols-3">
                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                    <p className="text-xs text-slate-500">Assigned for review</p>
                    <p className="mt-2 text-2xl font-bold">{assignments.length}</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                    <p className="text-xs text-slate-500">In progress</p>
                    <p className="mt-2 text-2xl font-bold">
                      {assignments.filter((item) => item.status === "in_progress").length}
                    </p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                    <p className="text-xs text-slate-500">Completed assignments</p>
                    <p className="mt-2 text-2xl font-bold">
                      {assignments.filter((item) => item.status === "completed").length}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Review tracking</CardTitle>
                  <CardDescription>
                    Review progress for papers assigned to editors and reviewers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {assignments.length === 0 ? (
                    <div className="py-16 text-center">
                      <LuFileCheck className="mx-auto mb-3 text-slate-300" size={34} />
                      <p className="font-semibold">No reviews to track yet</p>
                      <p className="mt-1 text-sm text-slate-400">
                        Paper review records will appear here after assignments are created.
                      </p>
                      <Button
                        className="mt-4 bg-[#07111f]"
                        onClick={() => setActiveSection("assignments")}
                      >
                        Go to assignments
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Paper</TableHead>
                            <TableHead>Editor</TableHead>
                            <TableHead>Reviewers assigned</TableHead>
                            <TableHead>Deadline</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Decision</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {assignments.map((assignment) => (
                            <TableRow key={assignment.id}>
                              <TableCell className="min-w-[220px] font-semibold">
                                {getPaper(assignment.paperId)?.title ?? "Paper unavailable"}
                              </TableCell>
                              <TableCell>{getMember(assignment.editorId)?.name ?? "—"}</TableCell>
                              <TableCell>{assignment.reviewerIds.length}</TableCell>
                              <TableCell className="whitespace-nowrap text-xs">
                                {new Date(assignment.deadline).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{statusBadge(assignment.status)}</TableCell>
                              <TableCell>
                                <Badge variant="outline">Pending decision</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-xl border border-cyan-100 bg-cyan-50/70 p-5">
                <div className="flex gap-3">
                  <LuActivity className="mt-0.5 shrink-0 text-cyan-700" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Review and decision workflow
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      This section currently displays assignment progress. Reviewer comments,
                      review recommendations, decision letters and final acceptance or rejection
                      actions will need their own Convex records and mutations before they can
                      be saved or sent.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ==========================================
              REPORTS & ACTIVITY
          ========================================== */}

          {activeSection === "reports" && (
            <>
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Reports & Activity</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Monitor registration figures and editorial workload.
                </p>
              </div>

              <div className="grid gap-4 tablet:grid-cols-2 2xl:grid-cols-4">
                {[
                  { label: "Registrations", value: participantsList.length, icon: LuUsers },
                  { label: "Total people", value: totalPeople, icon: LuUserRound },
                  { label: "Submitted papers", value: papers.length, icon: LuFileText },
                  { label: "Paper assignments", value: assignments.length, icon: LuClipboardList },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.label} className="rounded-xl border-slate-200 shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500">{item.label}</p>
                          <Icon className="text-cyan-700" size={19} />
                        </div>
                        <p className="mt-3 text-2xl font-bold">{item.value}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="grid gap-6 2xl:grid-cols-2">
                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Registration breakdown</CardTitle>
                    <CardDescription>Current category distribution.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {[
                      { label: "Authors", value: authorsCount, color: "bg-blue-500" },
                      { label: "Participants", value: participantCount, color: "bg-cyan-500" },
                      { label: "Students", value: studentsCount, color: "bg-purple-500" },
                    ].map((item) => {
                      const percentage = participantsList.length
                        ? (item.value / participantsList.length) * 100
                        : 0;

                      return (
                        <div key={item.label}>
                          <div className="mb-2 flex justify-between text-xs">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-slate-500">{item.value} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Editorial workload</CardTitle>
                    <CardDescription>Current assignments by role.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
                      <div>
                        <p className="text-sm font-semibold">Editors</p>
                        <p className="text-xs text-slate-400">Registered editorial leads</p>
                      </div>
                      <p className="text-2xl font-bold">{editors.length}</p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
                      <div>
                        <p className="text-sm font-semibold">Reviewers</p>
                        <p className="text-xs text-slate-400">Registered peer reviewers</p>
                      </div>
                      <p className="text-2xl font-bold">{reviewers.length}</p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
                      <div>
                        <p className="text-sm font-semibold">Unassigned papers</p>
                        <p className="text-xs text-slate-400">Awaiting editorial allocation</p>
                      </div>
                      <p className="text-2xl font-bold">{unassignedPapers.length}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Activity log</CardTitle>
                  <CardDescription>
                    Activity history will appear here when audit logging is connected.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center py-12 text-center">
                    <LuActivity className="mb-3 text-slate-300" size={32} />
                    <p className="text-sm font-semibold">No activity records available</p>
                    <p className="mt-1 max-w-md text-xs leading-5 text-slate-400">
                      A persistent activity log can record editor changes, paper assignments,
                      review submissions, decisions and email actions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>

      {/* ==========================================
          ADD / EDIT TEAM MEMBER DIALOG
      ========================================== */}

      <Dialog
        open={teamDialogOpen}
        // onOpenChange={(open) => {
        //   setTeamDialogOpen(open);
        //   if (!open) resetTeamForm();
        // }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto tablet:max-w-[520px]">
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

            <div className="space-y-2">
              <Label>Institution</Label>
              <Input
                value={memberInstitution}
                onChange={(event) => setMemberInstitution(event.target.value)}
                placeholder="University or organisation"
              />
            </div>

            <div className="space-y-2">
              <Label>Area of expertise</Label>
              {/* <Textarea
                value={memberExpertise}
                onChange={(event) => setMemberExpertise(event.target.value)}
                placeholder="e.g. Artificial Intelligence, Cybersecurity, Data Science..."
                rows={3}
              /> */}
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

      {/* ==========================================
          PAPER ASSIGNMENT DIALOG
      ========================================== */}

      <Dialog open={assignmentDialogOpen} onOpenChange={setAssignmentDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto tablet:max-w-[650px]">
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
                      {editor.name} — {editor.institution || "Institution not specified"}
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
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{reviewer.name}</span>
                        <span className="block text-xs text-slate-400">
                          {reviewer.expertise || reviewer.institution || reviewer.email}
                        </span>
                      </span>
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
  );
}
