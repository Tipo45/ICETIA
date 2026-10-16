"use client"

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import VerifyRegistrationForm from "@/components/verifyID";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "sonner";


export default function AIPage() {
    const [isVerified, setIsVerified] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [paperTrack, setPaperTrack] = useState("");
    const [paperTitle, setPaperTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [paperFile, setPaperFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sessionToken, setSessionToken] = useState("");
    const validateSession = useAction(api.verify.validatePaperSubmissionSession);
    const track = "Artificial Intelligence & Machine Learning";

    useEffect(() => {
        let cancelled = false;

        const restoreSession = async () => {
            const savedToken = sessionStorage.getItem(
                "icetia-paper-session"
            );

            if (!savedToken) {
                setIsCheckingSession(false);
                return;
            }

            try {
                const result = await validateSession({
                    sessionToken: savedToken,
                });

                if (cancelled) return;

                if (result.valid) {
                    setSessionToken(savedToken);
                    setIsVerified(true);
                } else {
                    sessionStorage.removeItem("icetia-paper-session");
                    setSessionToken("");
                    setIsVerified(false);
                }
            } catch {
                if (cancelled) return;

                // Do not treat a network error as proof that the session expired.
                // Keep the saved token so the user can retry after connectivity returns.
                toast.error(
                    "Unable to verify your saved session. Please refresh and try again."
                );
            } finally {
                if (!cancelled) {
                    setIsCheckingSession(false);
                }
            }
        };

        void restoreSession();

        return () => {
            cancelled = true;
        };
    }, [validateSession]);

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        setPaperFile(null);
        setFileError("");

        if (!file) return;

        const isPdf =
            file.type === "application/pdf" &&
            file.name.toLowerCase().endsWith(".pdf");

        if (!isPdf) {
            setFileError("Invalid file format. Please upload a PDF file only.");
            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setFileError("File size exceeds 5 MB. Please upload a smaller PDF.");
            event.target.value = "";
            return;
        }

        setPaperFile(file);
    }

    const handleSubmit = async () => {

        setFileError("");

        if (!paperFile) {
            setFileError("Please upload a valid PDF file not exceeding 5 MB.");
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("paperTrack", track);
            formData.append("paperTitle", paperTitle.trim());
            formData.append("abstract", abstract.trim());
            formData.append("file", paperFile);
            formData.append("sessionToken", sessionToken);

            // Connect this request to your authenticated API route.


            sessionStorage.removeItem("icetia-paper-session");
            setSessionToken("");
            setIsVerified(false);

            toast.success("Your paper has been submitted successfully.");
        } catch (err) {
            const rawMessage = err instanceof Error ? err.message : "";

            const knownErrors = [
                "Your verification session has expired. Please verify your registration again.",
                "Registration is not eligible for paper submission.",
                "You have already submitted a paper for this track.",
                "Unable to upload your paper. Please try again.",
            ];

            const errorMessage =
                knownErrors.find((message) => rawMessage.includes(message)) ??
                "Unable to submit your paper. Please try again.";

            setFileError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="mx-auto w-full max-w-5xl px-4 py-12 lg:px-8 lg:py-16">
                <div className="mb-10 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        ICETIA 2027
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                        Paper Submission
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 lg:text-base">
                        Submit your research paper for consideration at ICETIA 2027. {" "}
                        {isVerified === true ? (<>Complete the details below and upload your paper in PDF format.</>) : (<>Verify your Registration Number first</>)}
                    </p>
                </div>

                {isCheckingSession ? (
                    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
                        <p className="text-sm text-slate-600">
                            Checking your verification session...
                        </p>
                    </div>
                ) : (
                    <>
                        {!isVerified && (
                            <VerifyRegistrationForm
                                onVerified={(token) => {
                                    sessionStorage.setItem(
                                        "icetia-paper-session",
                                        token
                                    );

                                    setSessionToken(token);
                                    setIsVerified(true);
                                }}
                            />
                        )}

                        {isVerified && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                                className="mt-8 space-y-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-10"
                            >
                                <div className="border-b border-slate-100 pb-6">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Research Paper Details
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Provide the details of your paper accurately. Fields marked
                                        with an asterisk (*) are required.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="paperTrack"
                                        className="block text-sm font-semibold text-slate-800"
                                    >
                                        Paper Track <span className="text-red-600">*</span>
                                    </label>

                                    <input value={track} className="bg-gray-300 border border-blue-100 rounded-lg p-4 w-full font-semibold" readOnly />

                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="paperTitle"
                                        className="block text-sm font-semibold text-slate-800"
                                    >
                                        Paper Title <span className="text-red-600">*</span>
                                    </label>

                                    <input
                                        id="paperTitle"
                                        value={paperTitle}
                                        onChange={(e) => setPaperTitle(e.target.value)}
                                        required
                                        maxLength={300}
                                        placeholder="Enter the full title of your research paper"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />

                                    <p className="text-xs text-slate-500">
                                        Use a clear, concise title that reflects your research.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="abstract"
                                        className="block text-sm font-semibold text-slate-800"
                                    >
                                        Abstract <span className="text-red-600">*</span>
                                    </label>

                                    <textarea
                                        id="abstract"
                                        value={abstract}
                                        onChange={(e) => setAbstract(e.target.value)}
                                        required
                                        rows={7}
                                        placeholder="Summarise your research objectives, methodology, key findings, and conclusions..."
                                        className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />

                                    <p className="text-xs leading-5 text-slate-500">
                                        Provide a concise overview of the research presented in your paper.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <label
                                        htmlFor="paperFile"
                                        className="block text-sm font-semibold text-slate-800"
                                    >
                                        Upload Research Paper{" "}
                                        <span className="text-red-600">*</span>
                                    </label>

                                    <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50/50 p-5 lg:p-7">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.7"
                                                    className="h-7 w-7"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 16V4m0 0L7 9m5-5 5 5M5 16v3a1 1 0 001 1h12a1 1 0 001-1v-3"
                                                    />
                                                </svg>
                                            </div>

                                            <p className="text-sm font-semibold text-slate-800">
                                                Choose your paper document
                                            </p>

                                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                                Upload the final version of your research paper.
                                                Only PDF documents are accepted.
                                            </p>

                                            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                                <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                                                    PDF only
                                                </span>
                                                <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                                                    Maximum 5 MB
                                                </span>
                                            </div>

                                            <input
                                                id="paperFile"
                                                type="file"
                                                accept=".pdf,application/pdf"
                                                onChange={handleFileChange}
                                                required
                                                className="mt-6 block w-full max-w-md cursor-pointer rounded-lg border border-slate-200 bg-white text-sm text-slate-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-600 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                                            />

                                            <p className="mt-3 text-xs leading-5 text-slate-500">
                                                Ensure your file is in PDF format and does not exceed
                                                5 MB (5,242,880 bytes).
                                            </p>
                                        </div>
                                    </div>

                                    {paperFile && (
                                        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.7"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14 3v6h5M9 14h6m-6 3h6"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold text-emerald-900">
                                                    {paperFile.name}
                                                </p>
                                                <p className="mt-1 text-xs text-emerald-700">
                                                    {(paperFile.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {fileError && (
                                        <p
                                            role="alert"
                                            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                                        >
                                            {fileError}
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-800">
                                        Before you submit
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Review your paper details carefully. Your uploaded document must
                                        be a PDF file no larger than 5 MB.
                                    </p>
                                </div>

                                <div className="border-t border-slate-100 pt-6 flex flex-col items-center text-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto lg:min-w-52"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                Submitting...
                                            </>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                Submit Paper
                                                <FaArrowRight />
                                            </span>
                                        )}
                                    </button>

                                    <p className="mt-3 text-xs leading-5 text-slate-400">
                                        By submitting, you confirm that the information provided is accurate.
                                    </p>
                                </div>
                            </form>
                        )}
                    </>
                )}

            </main>

            <Footer />
        </div>
    )
}