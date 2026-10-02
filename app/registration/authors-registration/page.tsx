"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import AcademicInfoStep from "@/components/Registration/AcademicInfoStep";
import CoAuthorsStep from "@/components/Registration/CoAuthorsStep";
import PaperUploadStep from "@/components/Registration/PaperUpload";
import PersonalInfoStep from "@/components/Registration/PersonalInfoStep";
import ProgressStepper from "@/components/Registration/ProgressStepper";
import ReviewStep from "@/components/Registration/ReviewStep";
import { Degree, RegistrationFormData } from "@/components/types/registration";
import {
    validateCountry,
    validateDegree,
    validateDepartment,
    validateEmail,
    validateFirstName,
    validateInstitution,
    validateLastName,
    validatePaperFile,
    validatePaperTitle,
} from "@/components/types/validation";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
    BsClockHistory,
} from "react-icons/bs";

import {
    FaArrowLeftLong,
    FaArrowRightLong,
} from "react-icons/fa6";

import {
    FaAward,
    FaRegCalendarCheck,
    FaUsers,
} from "react-icons/fa";

import {
    FiBookOpen,
    FiCheckCircle,
    FiFileText,
    FiUserCheck,
} from "react-icons/fi";

import {
    IoIosInformationCircleOutline,
} from "react-icons/io";

import {
    LuArrowUpRight,
    LuBadgeCheck,
    LuBuilding2,
    LuCoffee,
    LuGraduationCap,
    LuSaveAll,
} from "react-icons/lu";

import {
    MdOutlineDisplaySettings,
    MdOutlineRecordVoiceOver,
} from "react-icons/md";

import { PiPresentationChartFill } from "react-icons/pi";

export default function AuthorsRegistrationPage() {
    const router = useRouter();

    const paymentValue = 40000;
    const totalSteps = 5;

    const [step, setStep] = useState(1);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const register = useMutation(api.registration.registerAuthor);
    const sendConfirmationEmail = useMutation(api.registration.sendMail);
    const generateUploadUrl = useMutation(
        api.registration.generateUploadUrl
    );

    const [formData, setFormData] = useState<RegistrationFormData>({
        firstName: "",
        lastName: "",
        email: "",
        institution: "",
        country: "",
        department: "",
        degree: "",
        paperTitle: "",
        coAuthors: [],
        paperFile: null,
    });

    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        institution: "",
        country: "",
        department: "",
        degree: "",
        paperTitle: "",
        coAuthors: [
            {
                firstName: "",
                lastName: "",
                email: "",
                institution: "",
                country: "",
                department: "",
                degree: "",
            },
        ],
        paperFile: "",
    });

    const [formTouched, setFormTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        institution: false,
        country: false,
        department: false,
        degree: false,
        paperTitle: false,
        coAuthors: [
            {
                firstName: false,
                lastName: false,
                email: false,
                institution: false,
                country: false,
                department: false,
                degree: false,
            },
        ],
        paperFile: false,
    });

    const benefits = [
        {
            icon: FaAward,
            text: "Certificate of participation or presentation",
        },
        {
            icon: FaUsers,
            text: "Networking with academics, researchers, industry professionals and policymakers",
        },
        {
            icon: FiBookOpen,
            text: "Conference proceedings and digital materials",
        },
        {
            icon: MdOutlineRecordVoiceOver,
            text: "Access to keynote and plenary sessions",
        },
        {
            icon: PiPresentationChartFill,
            text: "Access to technical paper presentation sessions",
        },
        {
            icon: FaRegCalendarCheck,
            text: "Conference programme and materials",
        },
        {
            icon: LuCoffee,
            text: "Refreshments and conference meals, where applicable",
        },
        {
            icon: MdOutlineDisplaySettings,
            text: "Access to exhibitions, innovation showcases and partner sessions",
        },
    ];

    const isPersonalInfoRegFormValid = () => {
        return (
            !validateFirstName(formData.firstName) &&
            !validateLastName(formData.lastName) &&
            !validateEmail(formData.email)
        );
    };

    const isAcademicInfoRegFormValid = () => {
        return (
            !validateInstitution(formData.institution) &&
            !validateCountry(formData.country) &&
            !validateDepartment(formData.department) &&
            !validateDegree(formData.degree) &&
            !validatePaperTitle(formData.paperTitle)
        );
    };

    const isCoauthorInfoRegFormValid = () => {
        return formData.coAuthors.every((coAuthor) => {
            const isEmpty =
                !coAuthor.firstName &&
                !coAuthor.lastName &&
                !coAuthor.email &&
                !coAuthor.institution &&
                !coAuthor.country &&
                !coAuthor.department &&
                !coAuthor.degree;

            if (isEmpty) {
                return true;
            }

            return (
                !validateFirstName(coAuthor.firstName) &&
                !validateLastName(coAuthor.lastName) &&
                !validateEmail(coAuthor.email) &&
                !validateInstitution(coAuthor.institution) &&
                !validateCountry(coAuthor.country) &&
                !validateDepartment(coAuthor.department) &&
                !validateDegree(coAuthor.degree)
            );
        });
    };

    const isPaperUploadValid = () => {
        return !validatePaperFile(formData.paperFile);
    };

    const isCurrentStepValid = () => {
        switch (step) {
            case 1:
                return isPersonalInfoRegFormValid();

            case 2:
                return isAcademicInfoRegFormValid();

            case 3:
                return isCoauthorInfoRegFormValid();

            case 4:
                return isPaperUploadValid();

            case 5:
                return true;

            default:
                return false;
        }
    };

    const nextStep = () => {
        if (!isCurrentStepValid()) return;

        if (step < totalSteps) {
            setStep((prev) => prev + 1);
        }
    };

    const previousStep = () => {
        if (step > 1) {
            setStep((prev) => prev - 1);
        }
    };

    const registerParticipant = async () => {
        if (!formData.degree) {
            toast.error("Please select your degree.");
            return;
        }

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

            const result = await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                institution: formData.institution,
                country: formData.country,
                degree: formData.degree as Degree,
                department: formData.department,
                paperTitle: formData.paperTitle,
                coAuthors: formData.coAuthors.map((author) => ({
                    ...author,
                    degree: author.degree as Degree,
                })),
                paperFileId: storageId,
            });

            await sendConfirmationEmail({
                registrationId: result.registrationId,
            });

            toast.success("Registration Successful");

            setTimeout(() => {
                router.push(
                    `/registration/success/${result.registrationId}`
                );
            }, 1000);
            setIsSubmitting(false);
        } catch (error: any) {
            setIsSubmitting(false);
            toast.error(
                error?.data ??
                    error?.message ??
                    "Something went wrong. Please try again."
            );
        }
    };

    return (
        <main className="min-h-screen bg-white text-slate-900">
            <Navbar />

            {/* Hero */}
            <section className="border-b border-white/10 bg-[#07111f] text-white">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-14 xl:py-16">
                    <div className="grid gap-10 xl:grid-cols-[1fr_auto] xl:items-end">
                        <div>
                            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                                <span className="h-px w-8 bg-blue-400" />
                                ICETIA 2027
                                <span className="text-white/30">
                                    / Registration
                                </span>
                            </div>

                            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight lg:text-5xl xl:text-6xl">
                                Author Registration
                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 lg:text-lg">
                                Authors whose papers have been accepted for
                                presentation must complete registration and
                                submit the final camera-ready paper.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 xl:justify-end">
                            <div className="border border-white/15 px-4 py-3">
                                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                                    Conference
                                </p>
                                <p className="mt-1 text-sm font-medium">
                                    28–30 April 2027
                                </p>
                            </div>

                            <div className="border border-white/15 px-4 py-3">
                                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                                    Registration
                                </p>
                                <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    Open
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metadata */}
            <section className="border-b border-slate-200 bg-slate-50">
                <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 lg:px-10 tablet:grid-cols-4">
                    <div className="border-r border-slate-200 px-4 py-5 lg:px-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Category
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                            Author
                        </p>
                    </div>

                    <div className="border-r border-slate-200 px-4 py-5 lg:px-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Fee
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                            ₦{paymentValue.toLocaleString()}
                        </p>
                    </div>

                    <div className="border-r border-slate-200 px-4 py-5 lg:px-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Deadline
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                            <BsClockHistory className="text-blue-600" />
                            TBA
                        </p>
                    </div>

                    <div className="px-4 py-5 lg:px-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Location
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                            Federal University Otuoke
                        </p>
                    </div>
                </div>
            </section>

            {/* Main registration area */}
            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-14 xl:py-16">
                <div className="grid gap-10 xl:grid-cols-[minmax(0,1.35fr)_380px]">
                    {/* Form */}
                    <div className="border border-slate-200 bg-white">
                        <div className="border-b border-slate-200 px-6 py-6 lg:px-8">
                            <div className="flex items-start justify-between gap-5">
                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                                        <FiUserCheck />
                                        Registration Form
                                    </div>

                                    <h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                                        {step === 5
                                            ? "Review your details"
                                            : "Complete your registration"}
                                    </h2>

                                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                                        {step === 5
                                            ? "Check your information carefully before submitting your registration."
                                            : "Complete each section before proceeding to the next step."}
                                    </p>
                                </div>

                                <div className="hidden text-right tablet:block">
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                                        Step
                                    </p>
                                    <p className="mt-1 text-xl font-semibold">
                                        {String(step).padStart(2, "0")}
                                        <span className="text-slate-300">
                                            {" "}
                                            / {String(totalSteps).padStart(2, "0")}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-5 lg:px-8">
                            <ProgressStepper step={step} />
                        </div>

                        <div>
                            {step === 1 && (
                                <PersonalInfoStep
                                    formData={formData}
                                    setFormData={setFormData}
                                    formErrors={formErrors}
                                    setFormErrors={setFormErrors}
                                    formTouched={formTouched}
                                    setFormTouched={setFormTouched}
                                />
                            )}

                            {step === 2 && (
                                <AcademicInfoStep
                                    formData={formData}
                                    setFormData={setFormData}
                                    formErrors={formErrors}
                                    setFormErrors={setFormErrors}
                                    formTouched={formTouched}
                                    setFormTouched={setFormTouched}
                                />
                            )}

                            {step === 3 && (
                                <CoAuthorsStep
                                    formData={formData}
                                    setFormData={setFormData}
                                    formErrors={formErrors}
                                    setFormErrors={setFormErrors}
                                    formTouched={formTouched}
                                    setFormTouched={setFormTouched}
                                />
                            )}

                            {step === 4 && (
                                <PaperUploadStep
                                    formData={formData}
                                    setFormData={setFormData}
                                    formErrors={formErrors}
                                    setFormErrors={setFormErrors}
                                    formTouched={formTouched}
                                    setFormTouched={setFormTouched}
                                />
                            )}

                            {step === 5 && (
                                <ReviewStep formData={formData} />
                            )}
                        </div>

                        {/* Navigation */}
                        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/60 px-6 py-5 tablet:flex-row lg:px-8">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={previousStep}
                                    className="flex min-h-12 w-full items-center justify-center gap-2 border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-slate-50 tablet:w-auto tablet:min-w-36"
                                >
                                    <FaArrowLeftLong />
                                    Back
                                </button>
                            )}

                            {step < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!isCurrentStepValid()}
                                    className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-[#07111f] px-6 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Continue
                                    <FaArrowRightLong />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={registerParticipant}
                                    disabled={isSubmitting}
                                    className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-white border-b-white" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Complete Registration
                                            <LuSaveAll />
                                        </span>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Package sidebar */}
                    <aside className="self-start xl:sticky xl:top-24">
                        <div className="bg-[#07111f] p-6 text-white lg:p-7">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                                        Registration Package
                                    </p>

                                    <h3 className="mt-2 text-2xl font-semibold">
                                        Author
                                    </h3>
                                </div>

                                <LuBadgeCheck className="h-7 w-7 text-blue-300" />
                            </div>

                            <div className="mt-7 border-y border-white/10 py-6">
                                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                                    Registration Fee
                                </p>

                                <p className="mt-2 text-4xl font-semibold tracking-tight">
                                    ₦{paymentValue.toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-6">
                                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Included
                                </p>

                                <div className="space-y-4">
                                    {benefits.map((item, index) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={index}
                                                className="flex gap-3"
                                            >
                                                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                                                <span className="text-sm leading-5 text-slate-300">
                                                    {item.text}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="border border-t-0 border-slate-200 bg-slate-50 p-5">
                            <div className="flex gap-3">
                                <LuGraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                                <div>
                                    <p className="text-sm font-semibold">
                                        Accepted paper
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Author registration is intended for
                                        accepted papers and includes submission
                                        of the camera-ready version.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Important information */}
            <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-10 lg:pb-14">
                <div className="border border-amber-200 bg-amber-50/70">
                    <div className="grid gap-6 p-6 lg:grid-cols-[auto_1fr] lg:p-8">
                        <div className="flex h-11 w-11 items-center justify-center border border-amber-200 bg-white">
                            <IoIosInformationCircleOutline className="h-6 w-6 text-amber-600" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Important: Author Registration
                                </h3>
                            </div>

                            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
                                Authors whose papers are accepted for
                                presentation are expected to complete
                                registration before the camera-ready
                                submission deadline. Each accepted paper must
                                have at least one registered author who will
                                present the paper during the conference.
                            </p>

                            <div className="mt-5 border-l-2 border-amber-400 pl-4">
                                <p className="text-sm font-medium leading-6 text-amber-800">
                                    Papers without completed registration by
                                    the stated deadline may not be included in
                                    the final conference programme or
                                    proceedings.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Information blocks */}
            <section className="mx-auto max-w-7xl px-6 pb-14 lg:px-10 xl:pb-16">
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="border border-slate-200 p-6 lg:p-7">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center bg-slate-100">
                                <LuBuilding2 className="h-5 w-5 text-blue-600" />
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Payment
                                </p>
                                <h3 className="mt-1 text-lg font-semibold">
                                    Payment & Confirmation
                                </h3>
                            </div>
                        </div>

                        <p className="mt-5 text-sm leading-6 text-slate-600">
                            All registration payments must be completed
                            through the official conference payment portal.
                            Confirmation of registration will be sent via
                            email upon successful payment. Please keep a copy
                            of your payment receipt for reference.
                        </p>

                        <div className="mt-5 border border-blue-100 bg-blue-50 p-4">
                            <p className="text-sm text-blue-800">
                                <span className="font-semibold">
                                    Early-bird registration:
                                </span>{" "}
                                Details will be announced.
                            </p>
                        </div>
                    </div>

                    <div className="border border-slate-200 p-6 lg:p-7">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center bg-slate-100">
                                <FiCheckCircle className="h-5 w-5 text-emerald-600" />
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Included
                                </p>
                                <h3 className="mt-1 text-lg font-semibold">
                                    Registration Benefits
                                </h3>
                            </div>
                        </div>

                        <ul className="mt-5 space-y-3">
                            {[
                                "Participation in all technical sessions of the conference programme",
                                "Inclusion of the accepted paper in the conference proceedings",
                                "Conference meals, where applicable",
                                "Conference accessories",
                                "Conference soft proceedings",
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-sm leading-5 text-slate-600"
                                >
                                    <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Support */}
            <section className="border-t border-slate-200">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Registration Support
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                            Have questions about the author registration
                            process?
                        </p>
                    </div>

                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                    >
                        Contact support
                        <LuArrowUpRight className="h-4 w-4" />
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}