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
import { validateCountry, validateDegree, validateDepartment, validateEmail, validateFirstName, validateInstitution, validateLastName, validatePaperFile, validatePaperTitle } from "@/components/types/validation";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { FaAward, FaRegCalendarCheck, FaRegCreditCard, FaUsers } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { FiCoffee, FiFileText, FiUserCheck, FiUsers } from "react-icons/fi";
import { IoIosInformationCircleOutline, IoMdBook } from "react-icons/io";
import { MdOutlineDisplaySettings, MdOutlineEventNote, MdOutlineRecordVoiceOver, MdOutlineVerified } from "react-icons/md";
import { LuCoffee, LuSaveAll } from "react-icons/lu";
import { toast } from "sonner";
import { PiPresentationChartFill } from "react-icons/pi";

export default function AuthorsRegistrationPage() {

    const benefits = [
    { icon: FaAward, text: "Certificate of participation or presentation" },
    { icon: FaUsers, text: "Networking opportunities with academics, researchers, industry professionals and policymakers" },
    { icon: IoMdBook, text: "Conference proceedings and digital materials" },
    { icon: MdOutlineRecordVoiceOver, text: "Access to keynote and plenary sessions" },
    { icon: PiPresentationChartFill, text: "Access to technical paper presentation sessions" },
    { icon: FaRegCalendarCheck, text: "Conference programme and materials" },
    { icon: LuCoffee, text: "Refreshments and conference meals, where applicable" },
    { icon: MdOutlineDisplaySettings, text: "Access to exhibitions, innovation showcases and partner sessions" },
]

    const register = useMutation(api.registration.registerAuthor);
    const sendConfirmationEmail = useMutation(api.registration.sendMail);
    const generateUploadUrl = useMutation(api.registration.generateUploadUrl);
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
            }
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
            }
        ],
        paperFile: false,
    });

    const paymentValue = 30000;
    const router = useRouter();
    const [step, setStep] = useState(1);

    const totalSteps = 5;

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

if (formData.paperFile) {
    const postUrl = await generateUploadUrl();

    const result = await fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": formData.paperFile.type,
        },
        body: formData.paperFile,
    });

    const { storageId: uploadedStorageId } = await result.json();

    storageId = uploadedStorageId;
}


        try {
            const result = await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                institution: formData.institution,
                country: formData.country,
                degree: formData.degree as Degree,
                department: formData.department,
                paperTitle: formData.paperTitle,
                coAuthors: formData.coAuthors.map(author => ({
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
                router.push(`/registration/success/${result.registrationId}`);
            }, 1000);
            // resetForm();
        } catch (error: any) {
            toast.error(
                error.data ??
                error.message ??
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <section className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
                        <MdOutlineEventNote className="w-4 h-4" />
                        Registration Portal
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Author <span className="text-blue-700">Registration</span>
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        Authors whose papers have been accepted must complete registration
                        before the camera-ready deadline.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-2">
                            <BsClockHistory className="w-4 h-4 text-amber-600" />
                            Deadline: <span className="font-semibold text-amber-700">TBA</span>
                        </span>
                        <span className="hidden lg:inline text-slate-300">|</span>
                        <span className="flex items-center gap-2">
                            <MdOutlineVerified className="w-4 h-4 text-green-600" />
                            Status: <span className="font-semibold text-green-700">Open</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">

                    <div className="rounded-3xl border-2 border-slate-200/60 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                        <div className="p-6 lg:p-10">
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-100 rounded-xl">
                                        <FiUserCheck className="w-6 h-6 text-blue-700" />
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">
                                        Registration Information
                                    </h3>
                                </div>

                                {step === 5 ? (<p className="text-muted-foreground ml-12">Review the information you provided</p>) : (<p className="text-muted-foreground ml-12">
                                    Complete the form below to begin your conference registration.
                                </p>)}
                            </div>
                        </div>
                        <ProgressStepper step={step} />
                        {step === 1 && (<PersonalInfoStep
                            formData={formData}
                            setFormData={setFormData}
                            formErrors={formErrors}
                            setFormErrors={setFormErrors}
                            formTouched={formTouched}
                            setFormTouched={setFormTouched}
                        />)}
                        {step === 2 && (<AcademicInfoStep
                            formData={formData}
                            setFormData={setFormData}
                            formErrors={formErrors}
                            setFormErrors={setFormErrors}
                            formTouched={formTouched}
                            setFormTouched={setFormTouched}
                        />)}
                        {step === 3 && (<CoAuthorsStep formData={formData}
                            setFormData={setFormData}
                            formErrors={formErrors}
                            setFormErrors={setFormErrors}
                            formTouched={formTouched}
                            setFormTouched={setFormTouched} />)}
                        {step === 4 && (<PaperUploadStep formData={formData}
                            setFormData={setFormData}
                            formErrors={formErrors}
                            setFormErrors={setFormErrors}
                            formTouched={formTouched}
                            setFormTouched={setFormTouched} />)}
                        {step === 5 && (<ReviewStep formData={formData} />)}

                        <div className="flex gap-4 mt-6 px-8 py-4">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={previousStep}
                                    className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl w-full text-base font-semibold transition"
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
                                    className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl w-full text-base text-white font-semibold shadow-lg hover:shadow-blue-200/50 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Proceed
                                    <FaArrowRightLong />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={registerParticipant}
                                    className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl w-full text-base text-white font-semibold shadow-lg"
                                >
                                    Register
                                    <LuSaveAll />
                                </button>
                            )}
                        </div>
                    </div>
                    <Card className="sticky top-24 rounded-3xl border-2 border-blue-200/60 shadow-xl bg-linear-to-br from-white to-blue-50/30 overflow-hidden">
                        <CardContent className="p-6">
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                                    <FiUserCheck className="w-3 h-3" />
                                    Author Package
                                </div>
                                <p className="text-sm text-muted-foreground">Registration Fee</p>
                                <p className="text-5xl lg:text-6xl font-bold text-blue-700 mt-1">
                                    ₦{paymentValue.toLocaleString()}
                                </p>
                                <div className="mt-2 h-px bg-linear-to-r from-transparent via-blue-200 to-transparent"></div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <p className="text-sm font-semibold text-slate-700 mb-3">What's Included:</p>
                                {benefits.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
                                        <item.icon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>

            <div className="container mx-auto px-6 mt-16">
                <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-red-100/60 rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-100 rounded-2xl shrink-0">
                                <IoIosInformationCircleOutline className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    Important: Author Registration
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                                    Authors whose papers are accepted for presentation are expected to complete registration
                                    before the camera-ready submission deadline. Each accepted paper must have at least one
                                    registered author who will present the paper during the conference.
                                </p>
                                <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                                    <IoIosInformationCircleOutline className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-700 font-medium">
                                        Papers without completed registration by the stated deadline may not be included in
                                        the final conference programme or proceedings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-2 border-blue-100/60 hover:shadow-xl transition-shadow duration-300 rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-100 rounded-2xl">
                                <FaRegCreditCard className="w-6 h-6 text-blue-700" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">Payment & Confirmation</h4>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            All registration payments must be completed through the official conference payment portal.
                            Confirmation of registration will be sent via email upon successful payment.
                            Please ensure you keep a copy of your payment receipt for reference.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                            <p className="text-sm text-blue-800">
                                <span className="font-semibold">🎯 Early Bird Registration:</span> Register before TBA to enjoy special rates.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-green-100/60 hover:shadow-xl transition-shadow duration-300 rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-green-100 rounded-2xl">
                                <IoIosInformationCircleOutline className="w-6 h-6 text-green-700" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">What's Included</h4>
                        </div>
                        <div className="space-y-3">
                            <h5 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                                <FiUserCheck className="w-4 h-4 text-blue-600" />
                                Technical Session Registration Fee Includes:
                            </h5>
                            <ul className="space-y-2">
                                {[
                                    "Participation in all technical sessions of the conference program",
                                    "Inclusion of a paper in the conference proceedings (Authors only)",
                                    "All meals during the course of the conference",
                                    "Conference accessories",
                                    "Conference Soft Proceedings"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CiCircleCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="my-12 text-center">
                <p className="text-sm text-slate-500">
                    Have questions about registration?{" "}
                    <a href="/contact" className="text-blue-600 hover:underline font-medium hover:text-blue-800 transition-colors">
                        Contact our support team
                    </a>
                </p>
            </div>
            <Footer />
        </section>

    );
}