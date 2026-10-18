"use client"

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SubmissionOfPapers } from "@/components/types/registration";
import { validateAbstract, validatePaperFile, validatePaperTitle, validatePaperTrack } from "@/components/types/validation";
import VerifyRegistrationForm from "@/components/verifyID";
import { api } from "@/convex/_generated/api";
import { useAction, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { LuCloudUpload, LuFileCheck2 } from "react-icons/lu";
import { toast } from "sonner";




export default function DataSciencePage() {

    const [formData, setFormData] = useState<SubmissionOfPapers>({
        paperTrack: "",
        paperTitle: "",
        abstract: "",
        paperFile: null,
    });

    const [formErrors, setFormErrors] = useState({
        paperTitle: "",
        abstract: "",
        paperFile: "",
    });

    const [formTouched, setFormTouched] = useState({
        paperTitle: false,
        abstract: false,
        paperFile: false,
    });

    const generateUploadUrl = useMutation(
        api.registration.generateUploadUrl
    );
    const [isVerified, setIsVerified] = useState(false);
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sessionToken, setSessionToken] = useState("");
    const validateSession = useAction(api.verify.validatePaperSubmissionSession);
    const submitWorkshopPaper = useMutation(api.registration.submitWorkshopPaper);
    const track = "Data Science, Analytics and Decision Intelligence";
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const router = useRouter();

    const handleChange = (
        field: keyof typeof formData,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        setFormTouched((prev) => ({
            ...prev,
            [field]: true,
        }));

        let error = "";

        switch (field) {
            case "paperTrack":
                error = validatePaperTrack(value) || "";
                break;

            case "paperTitle":
                error = validatePaperTitle(value) || "";
                break;

            case "abstract":
                error = validateAbstract(value) || "";
                break;
        }

        setFormErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        setFormTouched((prev) => ({
            ...prev,
            paperFile: true,
        }));

        if (!file) {
            setFormData((prev) => ({
                ...prev,
                paperFile: null,
            }));

            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setFormErrors((prev) => ({
                ...prev,
                paperFile:
                    "File size must not exceed 5 MB.",
            }));

            return;
        }

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            setFormErrors((prev) => ({
                ...prev,
                paperFile:
                    "Only PDF files are allowed.",
            }));

            return;
        }

        setFormErrors((prev) => ({
            ...prev,
            paperFile: "",
        }));

        setFormData((prev) => ({
            ...prev,
            paperFile: file,
        }));
    };

    const isFormValid = () => {
        return (
            !validatePaperTitle(formData.paperTitle) &&
            !validateAbstract(formData.abstract) &&
            !validatePaperFile(formData.paperFile)
        );
    };

    const handleSubmit = async () => {

        let storageId;

        setIsSubmitting(true);

        try {

            if (formData.paperFile) {
                const postUrl = await generateUploadUrl();

                const uploadResult = await fetch(postUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": formData.paperFile.type,
                    },
                    body: formData.paperFile,
                });

                if (!uploadResult.ok) {
                    throw new Error("Paper upload failed. Please try again.");
                }

                const {
                    storageId: uploadedStorageId,
                } = await uploadResult.json();

                storageId = uploadedStorageId;
            }


            const paper = await submitWorkshopPaper({
                registrationNumber,
                paperTrack: track,
                paperTitle: formData.paperTitle,
                abstract: formData.abstract,
                paperFileId: storageId,
                sessionToken,
            });

            if (paper.success) {
                router.push("/conference/for-authors/call-for-workshop-papers")
            }

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


            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

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

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="mx-auto w-full max-w-5xl px-4 py-12 lg:px-8 lg:py-16">
                <div className="mb-10 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        ICETIA 2027
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                        Workshop Paper Submission
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 lg:text-base">
                        Submit your workshop paper for consideration at ICETIA 2027. {" "}
                        {isVerified === true ? (<>Complete the details below and upload your paper in PDF or Word format.</>) : (<>Verify your Registration Number first</>)}
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
                                onRegistrationIdChange={setRegistrationNumber}
                                registrationId={registrationNumber}
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
                                        Workshop Paper Details
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Provide the details of your paper accurately. Fields marked
                                        with an asterisk (*) are required.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-800">
                                        Registration Number
                                    </label>

                                    <input value={registrationNumber}
                                        className="bg-gray-300 border border-blue-100 rounded-lg p-4 w-full font-semibold" readOnly />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        className="block text-sm font-semibold text-slate-800"
                                    >
                                        Paper Track <span className="text-red-600">*</span>
                                    </label>

                                    <textarea
                                        value={track}
                                        readOnly
                                        rows={2}
                                        className="w-full resize-none rounded-lg border border-blue-100 bg-gray-300 p-4 text-sm font-semibold leading-6 text-slate-800 focus:outline-none"
                                    />

                                </div>

                                <div className="space-y-2">
                                    <label
                                        className="block text-sm font-semibold text-slate-800"
                                    >
                                        Paper Title <span className="text-red-600">*</span>
                                    </label>

                                    <input
                                        value={formData.paperTitle}
                                        onChange={(e) => handleChange("paperTitle", e.target.value)}
                                        required
                                        maxLength={300}
                                        placeholder="Enter the full title of your workshop paper"
                                        className={`w-full min-w-0 rounded-xl border-2 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 ${formTouched.paperTitle && formErrors.paperTitle
                                            ? "border-red-400 focus:border-red-500"
                                            : formTouched.paperTitle && !formErrors.paperTitle
                                                ? "border-emerald-400 focus:border-emerald-500"
                                                : "border-slate-300 focus:border-blue-600"
                                            }`}
                                    />

                                    <p className="text-xs text-slate-500">
                                        Use a clear, concise title that reflects your research.
                                    </p>

                                    {formTouched.paperTitle &&
                                        formErrors.paperTitle && (
                                            <p className="mt-2 text-xs text-red-500">
                                                {
                                                    formErrors.paperTitle
                                                }
                                            </p>
                                        )}
                                </div>

                                <div className="space-y-2">
                                    <label
                                        className="block text-sm font-semibold text-slate-800"
                                    >
                                        Abstract <span className="text-red-600">*</span>
                                    </label>

                                    <textarea
                                        value={formData.abstract}
                                        onChange={(e) => handleChange("abstract", e.target.value)}
                                        required
                                        rows={7}
                                        placeholder="Summarise your research objectives, methodology, key findings, and conclusions..."
                                        className={`w-full min-w-0 resize-y rounded-xl border-2 bg-white px-4 py-3.5 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 ${formTouched.abstract && formErrors.abstract
                                            ? "border-red-400 focus:border-red-500"
                                            : formTouched.abstract && !formErrors.abstract
                                                ? "border-emerald-400 focus:border-emerald-500"
                                                : "border-slate-300 focus:border-blue-600"
                                            }`}
                                    />

                                    <p className="text-xs leading-5 text-slate-500">
                                        Provide a concise overview of the research presented in your paper.
                                    </p>

                                    {formTouched.abstract &&
                                        formErrors.abstract && (
                                            <p className="mt-2 text-xs text-red-500">
                                                {
                                                    formErrors.abstract
                                                }
                                            </p>
                                        )}
                                </div>

                                <div className="space-y-3">
                                    <label
                                        className="block text-sm font-semibold text-slate-800"
                                    >
                                        Upload Workshop Paper{" "}
                                        <span className="text-red-600">*</span>
                                    </label>

                                    <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50/50 p-5 lg:p-7">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                                                <LuCloudUpload className="h-7 w-7 text-blue-600" />
                                            </div>

                                            <p className="text-sm font-semibold text-slate-800">
                                                Choose your paper document
                                            </p>

                                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                                Upload the final version of your workshop paper.
                                            </p>

                                            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                            
                                                <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                                                    Maximum 5 MB
                                                </span>
                                            </div>

                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                onChange={handleFileChange}
                                                required
                                                className="mt-6 block w-full max-w-md cursor-pointer rounded-lg border border-slate-200 bg-white text-sm text-slate-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-600 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                                            />

                                            <p className="mt-3 text-xs leading-5 text-slate-500">
                                                Ensure your file is in PDF or Word format (.doc, .docx) and does not exceed
                                                5 MB (5,242,880 bytes).
                                            </p>
                                        </div>
                                    </div>

                                    {formData.paperFile && (
                                        <div className="flex items-center gap-4 border border-emerald-200 bg-emerald-50 p-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white">
                                                <LuFileCheck2 className="h-5 w-5 text-emerald-600" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold text-slate-900">
                                                    {formData.paperFile.name}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {(
                                                        formData.paperFile.size /
                                                        1024 /
                                                        1024
                                                    ).toFixed(2)}{" "}
                                                    MB
                                                </p>
                                            </div>

                                            <span className="hidden text-xs font-semibold text-emerald-700 tablet:block">
                                                File selected
                                            </span>
                                        </div>
                                    )}

                                    {formTouched.paperFile &&
                                        formErrors.paperFile && (
                                            <div className="border border-red-200 bg-red-50 p-4">
                                                <p className="text-sm font-medium text-red-700">
                                                    {formErrors.paperFile}
                                                </p>
                                            </div>
                                        )}
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-800">
                                        Before you submit
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Review your paper details carefully. Your uploaded document must
                                        be a PDF or Word format file no larger than 5 MB.
                                    </p>
                                </div>

                                <div className="border-t border-slate-100 pt-6 flex flex-col items-center text-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !isFormValid()}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto lg:min-w-52"
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