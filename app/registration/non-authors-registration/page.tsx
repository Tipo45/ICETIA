"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Country } from "country-state-city";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import { api } from "@/convex/_generated/api";

import {
    validateCountry,
    validateEmail,
    validateFirstName,
    validateInstitution,
    validateLastName,
} from "@/components/types/validation";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    FiArrowLeft,
    FiArrowRight,
    FiCheck,
    FiLoader,
    FiMail,
    FiUser,
} from "react-icons/fi";

import {
    LuBuilding2,
    LuCalendarDays,
    LuCheck,
    LuCircleDollarSign,
    LuCoffee,
    LuCreditCard,
    LuFileText,
    LuGlobe,
    LuInfo,
    LuLockKeyhole,
    LuPresentation,
    LuUsers,
} from "react-icons/lu";

import { MdOutlineEventNote } from "react-icons/md";

const benefits = [
    {
        icon: LuFileText,
        text: "Conference proceedings and digital materials",
    },
    {
        icon: LuPresentation,
        text: "Access to keynote and plenary sessions",
    },
    {
        icon: LuPresentation,
        text: "Access to technical paper presentation sessions",
    },
    {
        icon: LuUsers,
        text: "Networking with academics, researchers, industry professionals and policymakers",
    },
    {
        icon: LuCalendarDays,
        text: "Conference programme and materials",
    },
    {
        icon: LuCoffee,
        text: "Refreshments and conference meals, where applicable",
    },
    {
        icon: LuPresentation,
        text: "Access to exhibitions, innovation showcases and partner sessions",
    },
];

export default function RegistrationSection() {
    const paymentValue = 40000;

    const router = useRouter();
    const countries = Country.getAllCountries();

    const register = useMutation(
        api.registration.registerParticipant
    );

    const sendConfirmationEmail = useMutation(
        api.registration.sendMail
    );

    const [step, setStep] = useState<1 | 2>(1);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        institution: "",
        country: "",
    });

    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        institution: "",
        country: "",
    });

    const [formTouched, setFormTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        institution: false,
        country: false,
    });

    const resetForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            institution: "",
            country: "",
        });

        setFormErrors({
            firstName: "",
            lastName: "",
            email: "",
            institution: "",
            country: "",
        });

        setFormTouched({
            firstName: false,
            lastName: false,
            email: false,
            institution: false,
            country: false,
        });

        setStep(1);
    };

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
            case "firstName":
                error = validateFirstName(value) || "";
                break;

            case "lastName":
                error = validateLastName(value) || "";
                break;

            case "email":
                error = validateEmail(value) || "";
                break;

            case "institution":
                error = validateInstitution(value) || "";
                break;

            case "country":
                error = validateCountry(value) || "";
                break;
        }

        setFormErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    };

    const isRegFormValid = () => {
        return (
            !validateFirstName(formData.firstName) &&
            !validateLastName(formData.lastName) &&
            !validateEmail(formData.email) &&
            !validateInstitution(formData.institution) &&
            !validateCountry(formData.country)
        );
    };

    const proceed = () => {
        const firstNameError =
            validateFirstName(formData.firstName);

        const lastNameError =
            validateLastName(formData.lastName);

        const emailError =
            validateEmail(formData.email);

        const institutionError =
            validateInstitution(formData.institution);

        const countryError =
            validateCountry(formData.country);

        setFormErrors({
            firstName: firstNameError || "",
            lastName: lastNameError || "",
            email: emailError || "",
            institution: institutionError || "",
            country: countryError || "",
        });

        setFormTouched({
            firstName: true,
            lastName: true,
            email: true,
            institution: true,
            country: true,
        });

        if (
            firstNameError ||
            lastNameError ||
            emailError ||
            institutionError ||
            countryError
        ) {
            return;
        }

        setStep(2);
    };

    const registerParticipant = async () => {
        setIsSubmitting(true);
        try {
            const result = await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                institution: formData.institution,
                country: formData.country,
            });

            await sendConfirmationEmail({
                registrationId: result.registrationId,
            });

            toast.success("Registered successfully");

            setTimeout(() => {
                router.push(
                    `/registration/success/${result.registrationId}`
                );
            }, 1000);

            setIsSubmitting(false);
            resetForm();
        } catch (error: any) {
            setIsSubmitting(false);
            toast.error(
                error?.data ??
                error?.message ??
                "Something went wrong. Please try again."
            );
        }
    };

    const inputClass = (
        field: keyof typeof formData
    ) => `
        w-full h-12 rounded-none border bg-white px-4
        text-sm text-slate-900 outline-none transition
        placeholder:text-slate-400
        focus:border-blue-600 focus:ring-1 focus:ring-blue-600
        ${formTouched[field] && formErrors[field]
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : formTouched[field] &&
                !formErrors[field] &&
                formData[field]
                ? "border-green-500"
                : "border-slate-300"
        }
    `;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* HERO */}
            <section className="border-b border-slate-200 bg-[#061426] text-white">
                <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16 xl:py-20">
                    <div className="max-w-4xl">
                        <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                            <MdOutlineEventNote className="text-base" />
                            ICETIA 2027 · Registration Portal
                        </div>

                        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight lg:text-5xl xl:text-6xl">
                            Non-Authors
                            <span className="text-blue-400">
                                {" "} / Participants
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 lg:text-base">
                            Register to attend and participate in the
                            International Conference on Emerging Technologies,
                            Innovation and Applications without submitting or
                            presenting a paper.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6 text-xs text-slate-300">
                            <div className="flex items-center gap-2">
                                <LuCalendarDays className="text-blue-400" />
                                <span>28–30 April, 2027</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <LuCircleDollarSign className="text-blue-400" />
                                <span>
                                    Participant fee: ₦
                                    {paymentValue.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <LuGlobe className="text-blue-400" />
                                <span>Federal University Otuoke</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN REGISTRATION */}
            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-14 xl:py-16">
                <div className="grid gap-10 xl:grid-cols-[minmax(0,1.25fr)_380px] xl:gap-16">

                    {/* FORM */}
                    <div>
                        {/* STEPPER */}
                        <div className="mb-10 flex items-center">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${step === 1
                                            ? "bg-blue-600 text-white"
                                            : "bg-green-600 text-white"
                                        }`}
                                >
                                    {step === 1 ? (
                                        "01"
                                    ) : (
                                        <FiCheck />
                                    )}
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Step 01
                                    </p>

                                    <p className="text-sm font-semibold text-slate-900">
                                        Your details
                                    </p>
                                </div>
                            </div>

                            <div className="mx-5 h-px flex-1 bg-slate-200" />

                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${step === 2
                                            ? "bg-blue-600 text-white"
                                            : "bg-slate-100 text-slate-400"
                                        }`}
                                >
                                    02
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Step 02
                                    </p>

                                    <p
                                        className={`text-sm font-semibold ${step === 2
                                                ? "text-slate-900"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        Review & register
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border border-slate-200">
                            {/* HEADER */}
                            <div className="border-b border-slate-200 px-5 py-6 lg:px-8">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600">
                                    Registration information
                                </p>

                                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 lg:text-3xl">
                                    {step === 1
                                        ? "Tell us about yourself"
                                        : "Review your registration"}
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {step === 1
                                        ? "Complete the required information below to continue."
                                        : "Check your information carefully before completing registration."}
                                </p>
                            </div>

                            {/* STEP 1 */}
                            {step === 1 && (
                                <div className="space-y-7 p-5 lg:p-8">

                                    {/* NAME */}
                                    <div className="grid gap-6 lg:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-800">
                                                First Name{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    formData.firstName
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "firstName",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter first name"
                                                className={inputClass(
                                                    "firstName"
                                                )}
                                            />

                                            {formTouched.firstName &&
                                                formErrors.firstName && (
                                                    <p className="mt-2 text-xs text-red-500">
                                                        {
                                                            formErrors.firstName
                                                        }
                                                    </p>
                                                )}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-800">
                                                Last Name{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    formData.lastName
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "lastName",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter last name"
                                                className={inputClass(
                                                    "lastName"
                                                )}
                                            />

                                            {formTouched.lastName &&
                                                formErrors.lastName && (
                                                    <p className="mt-2 text-xs text-red-500">
                                                        {
                                                            formErrors.lastName
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    </div>

                                    {/* EMAIL */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-800">
                                            Email Address{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <div className="relative">
                                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your email address"
                                                className={`${inputClass(
                                                    "email"
                                                )} pl-11`}
                                            />
                                        </div>

                                        {formTouched.email &&
                                            formErrors.email && (
                                                <p className="mt-2 text-xs text-red-500">
                                                    {formErrors.email}
                                                </p>
                                            )}
                                    </div>

                                    {/* INSTITUTION */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-800">
                                            Institution{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <div className="relative">
                                            <LuBuilding2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type="text"
                                                value={
                                                    formData.institution
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        "institution",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your institution or organisation"
                                                className={`${inputClass(
                                                    "institution"
                                                )} pl-11`}
                                            />
                                        </div>

                                        {formTouched.institution &&
                                            formErrors.institution && (
                                                <p className="mt-2 text-xs text-red-500">
                                                    {
                                                        formErrors.institution
                                                    }
                                                </p>
                                            )}
                                    </div>

                                    {/* COUNTRY */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-800">
                                            Country{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <Select
                                            value={formData.country}
                                            onValueChange={(value) =>
                                                handleChange(
                                                    "country",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                className={`h-12 w-full rounded-none border bg-white px-4 ${formTouched.country &&
                                                        formErrors.country
                                                        ? "border-red-500"
                                                        : formTouched.country &&
                                                            !formErrors.country &&
                                                            formData.country
                                                            ? "border-green-500"
                                                            : "border-slate-300"
                                                    }`}
                                            >
                                                <SelectValue placeholder="Choose your country" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    {countries.map(
                                                        (country) => (
                                                            <SelectItem
                                                                key={
                                                                    country.isoCode
                                                                }
                                                                value={
                                                                    country.name
                                                                }
                                                            >
                                                                {
                                                                    country.name
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        {formTouched.country &&
                                            formErrors.country && (
                                                <p className="mt-2 text-xs text-red-500">
                                                    {
                                                        formErrors.country
                                                    }
                                                </p>
                                            )}
                                    </div>

                                    {/* FEE */}
                                    <div className="border border-slate-200 bg-slate-50 p-5">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Registration fee
                                                </p>

                                                <p className="mt-1 text-sm text-slate-700">
                                                    Non-author / Participant
                                                </p>
                                            </div>

                                            <p className="text-2xl font-semibold text-slate-900">
                                                ₦
                                                {paymentValue.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={proceed}
                                        disabled={!isRegFormValid()}
                                        className="flex h-12 w-full items-center justify-center gap-3 bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Continue to review
                                        <FiArrowRight />
                                    </button>
                                </div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <div className="p-5 lg:p-8">
                                    <div className="divide-y divide-slate-200 border border-slate-200">

                                        <ReviewRow
                                            icon={<FiUser />}
                                            label="Full Name"
                                            value={`${formData.firstName} ${formData.lastName}`}
                                        />

                                        <ReviewRow
                                            icon={<FiMail />}
                                            label="Email"
                                            value={formData.email}
                                        />

                                        <ReviewRow
                                            icon={<LuBuilding2 />}
                                            label="Institution"
                                            value={formData.institution}
                                        />

                                        <ReviewRow
                                            icon={<LuGlobe />}
                                            label="Country"
                                            value={formData.country}
                                        />

                                        <div className="flex flex-col gap-3 bg-slate-50 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Registration category
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                                    Non-Author / Participant
                                                </p>
                                            </div>

                                            <p className="text-2xl font-semibold text-blue-600">
                                                ₦
                                                {paymentValue.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-col gap-3 lg:flex-row">
                                        <button
                                            onClick={() =>
                                                setStep(1)
                                            }
                                            className="flex h-12 flex-1 items-center justify-center gap-2 border border-slate-300 px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-slate-50"
                                        >
                                            <FiArrowLeft />
                                            Edit details
                                        </button>

                                        <button
                                            onClick={
                                                registerParticipant
                                            }
                                            disabled={
                                                !isRegFormValid() || isSubmitting
                                            }
                                            className="flex h-12 flex-1 items-center justify-center gap-2 bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <FiLoader className="animate-spin" />Submitting...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Complete registration
                                                    <LuCreditCard />
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SECURITY NOTE */}
                        <div className="mt-5 flex items-start gap-3 border-t border-slate-200 pt-5">
                            <LuLockKeyhole className="mt-0.5 shrink-0 text-slate-400" />

                            <p className="text-xs leading-5 text-slate-500">
                                Your registration information is used for
                                conference registration and confirmation
                                purposes. Please ensure the details provided
                                are accurate.
                            </p>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <aside className="xl:sticky xl:top-24 xl:self-start">

                        {/* PRICE */}
                        <div className="bg-[#061426] p-6 text-white lg:p-7">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
                                        Participant package
                                    </p>

                                    <p className="mt-2 text-sm text-slate-300">
                                        Conference registration
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5">
                                    <LuUsers />
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-6">
                                <p className="text-xs uppercase tracking-wider text-slate-400">
                                    Registration fee
                                </p>

                                <p className="mt-1 text-4xl font-semibold tracking-tight lg:text-5xl">
                                    ₦
                                    {paymentValue.toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-6 border-t border-white/10 pt-5">
                                <div className="flex items-center gap-2 text-xs text-slate-300">
                                    <LuCalendarDays className="text-blue-400" />
                                    28–30 April, 2027
                                </div>

                                <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                                    <LuGlobe className="text-blue-400" />
                                    Federal University Otuoke
                                </div>
                            </div>
                        </div>

                        {/* BENEFITS */}
                        <div className="border-x border-b border-slate-200 p-6 lg:p-7">
                            <div className="mb-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-600">
                                    What's included
                                </p>

                                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                                    Participant benefits
                                </h3>
                            </div>

                            <div className="space-y-5">
                                {benefits.map((item, index) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
                                                <Icon className="text-sm" />
                                            </div>

                                            <p className="text-sm leading-5 text-slate-600">
                                                {item.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* PARTICIPANT NOTE */}
                        <div className="mt-5 border border-blue-200 bg-blue-50 p-5">
                            <div className="flex items-start gap-3">
                                <LuInfo className="mt-0.5 shrink-0 text-blue-600" />

                                <div>
                                    <p className="text-sm font-semibold text-blue-900">
                                        Who can register?
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-blue-800">
                                        This category is intended for
                                        academics, researchers, industry
                                        practitioners, government
                                        representatives, innovators,
                                        entrepreneurs and members of the
                                        wider technology community who wish
                                        to attend without submitting or
                                        presenting a paper.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* PARTICIPANT INFORMATION */}
            <section className="border-y border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-14">
                    <div className="grid gap-8 lg:grid-cols-2">

                        {/* PAYMENT */}
                        <div className="border border-slate-200 bg-white p-6 lg:p-8">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-600">
                                    <LuCreditCard />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                        Payment
                                    </p>

                                    <h3 className="text-lg font-semibold text-slate-900">
                                        Payment & confirmation
                                    </h3>
                                </div>
                            </div>

                            <p className="text-sm leading-6 text-slate-600">
                                Registration payments must be completed through
                                the official conference payment portal.
                                Confirmation of registration will be sent via
                                email upon successful payment.
                            </p>

                            <div className="mt-5 border-l-2 border-blue-600 bg-blue-50 px-4 py-3">
                                <p className="text-xs leading-5 text-blue-800">
                                    Please retain your payment receipt for
                                    future reference.
                                </p>
                            </div>
                        </div>

                        {/* INCLUDED */}
                        <div className="border border-slate-200 bg-white p-6 lg:p-8">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center bg-green-50 text-green-600">
                                    <LuCheck />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
                                        Participation
                                    </p>

                                    <h3 className="text-lg font-semibold text-slate-900">
                                        What's included
                                    </h3>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    "Participation in technical sessions",
                                    "Access to keynote and plenary sessions",
                                    "Conference programme and materials",
                                    "Conference meals and refreshments, where applicable",
                                    "Access to exhibitions and innovation showcases",
                                ].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-sm text-slate-600"
                                    >
                                        <LuCheck className="mt-0.5 shrink-0 text-green-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-6 py-12 text-center lg:px-10 lg:py-14">
                <p className="text-sm text-slate-500">
                    Have questions about registration?
                </p>

                <a
                    href="/contact"
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                >
                    Contact the conference support team
                    <FiArrowRight />
                </a>
            </section>

            <Footer />
        </main>
    );
}

function ReviewRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex flex-col gap-2 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
                    {icon}
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {label}
                </span>
            </div>

            <span className="break-all text-sm font-medium text-slate-900 lg:text-right">
                {value}
            </span>
        </div>
    );
}