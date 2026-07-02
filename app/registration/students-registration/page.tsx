"use client"

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegCreditCard } from "react-icons/fa";
import { FiUserCheck, FiUsers, FiFileText, FiCoffee, FiUser, FiMail, FiTag, FiDollarSign, FiEdit2 } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineEventNote, MdOutlineVerified } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { toast } from "sonner";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function RegistrationSection() {

    const paymentValue = 20000;
    const register = useMutation(api.registration.register);
    const [step, setStep] = useState<1 | 2>(1);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [formTouched, setFormTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
    });

    const resetForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
        });

        setFormErrors({
            firstName: "",
            lastName: "",
            email: "",
        });

        setFormTouched({
            firstName: false,
            lastName: false,
            email: false,
        });
    }

    const validateFirstName = (firstName: string): string | null => {
        if (!firstName.trim()) return "First Name is required";
        if (firstName.length < 3) return "First Name must be at least 3 characters";
        if (!/^[a-zA-Z\s\-]+$/.test(firstName)) return "First Name should only contain letters and spaces";
        return null;
    };

    const validateLastName = (lastName: string): string | null => {
        if (!lastName.trim()) return "Last Name is required";
        if (lastName.length < 3) return "Last Name must be at least 3 characters";
        if (!/^[a-zA-Z\s\-]+$/.test(lastName)) return "Last Name should only contain letters and spaces";
        return null;
    };

    const validateEmail = (email: string): string | null => {
        if (!email.trim()) return "Email Address is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email))
            return "Please enter a valid email address";

        return null;
    };


    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        setFormTouched(prev => ({
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
        }

        setFormErrors(prev => ({
            ...prev,
            [field]: error,
        }));
    };

    const isRegFormValid = () => {
        return (
            !validateFirstName(formData.firstName) &&
            !validateLastName(formData.lastName) &&
            !validateEmail(formData.email)
        );
    };



    const proceed = () => {
        const firstNameError = validateFirstName(formData.firstName);
        const lastNameError = validateLastName(formData.lastName);
        const emailError = validateEmail(formData.email);

        setFormErrors({
            firstName: firstNameError || "",
            lastName: lastNameError || "",
            email: emailError || "",
        });

        setFormTouched({
            firstName: true,
            lastName: true,
            email: true,
        });

        if (firstNameError || lastNameError || emailError) {
            return;
        }

        setStep(2);
    };

    const registerParticipant = async () => {

        try {
            await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                category: "student",
                amount: 20000,
            })


            toast.success("Registered Succesfully");
            resetForm();

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
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
                        <MdOutlineEventNote className="w-4 h-4" />
                        Registration Portal
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Student <span className="text-blue-700">Registration</span>
                    </h1>
                    {/* <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        Authors whose papers have been accepted must complete registration
                        before the camera-ready deadline.
                    </p> */}
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

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">

                    <div className="">
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
                                    {step === 1 ? (<p className="text-muted-foreground ml-12">
                                        Complete the form below to begin your conference registration.
                                    </p>) : (<p className="text-muted-foreground ml-12">Review Your Details</p>)}
                                </div>

                                {step === 1 && (<div className="flex flex-col gap-6 mt-8">
                                    <div className="space-y-2">
                                        <label className="text-sm">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleChange("firstName", e.target.value)}
                                            placeholder="Enter first name"
                                            className={`w-full h-12 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.firstName && formErrors.firstName ? "border-red-500 focus:ring-red-500" : formTouched.firstName && !formErrors.firstName && formData.firstName ? "border-green-500 focus:ring-green-500"
                                                : "border-input-border"}`}
                                        />
                                        {formTouched.firstName && formErrors.firstName && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => handleChange("lastName", e.target.value)}
                                            placeholder="Enter last name"
                                            className={`w-full h-12 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.lastName && formErrors.lastName ? "border-red-500 focus:ring-red-500" : formTouched.lastName && !formErrors.lastName && formData.lastName ? "border-green-500 focus:ring-green-500"
                                                : "border-input-border"}`}
                                        />
                                        {formTouched.lastName && formErrors.lastName && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            placeholder="Enter email address"
                                            className={`w-full h-12 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.email && formErrors.email ? "border-red-500 focus:ring-red-500" : formTouched.email && !formErrors.email && formData.email ? "border-green-500 focus:ring-green-500"
                                                : "border-input-border"}`}
                                        />
                                        {formTouched.email && formErrors.email && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">
                                            Amount <span className="text-slate-400">(NGN)</span>
                                        </label>
                                        <div className="flex items-center border-2 border-slate-200 rounded-xl bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
                                            <span className="flex items-center justify-center w-12 h-12 bg-slate-100 text-slate-600 font-bold border-r border-slate-200">
                                                ₦
                                            </span>
                                            <input
                                                type="text"
                                                value={paymentValue.toLocaleString()}
                                                disabled
                                                className="flex-1 h-12 px-3 bg-transparent text-slate-900 font-medium cursor-not-allowed outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button onClick={proceed} disabled={!isRegFormValid()} className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl w-full text-base text-white font-semibold shadow-lg hover:shadow-blue-200/50 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                            <span>Proceed</span>
                                            <FaArrowRightLong className="text-xl" />
                                        </button>
                                    </div>
                                </div>)}
                                {step === 2 && (
                                    <div>
                                        <div className="bg-white rounded-2xl border-2 border-slate-200/60 overflow-hidden shadow-sm">
                                            <div className="divide-y divide-slate-100">
                                                <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-1.5 bg-blue-100 rounded-lg">
                                                            <FiUser className="w-3.5 h-3.5 text-blue-600" />
                                                        </div>
                                                        <span className="text-sm text-slate-500">Full Name</span>
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-900">
                                                        {formData.firstName} {formData.lastName}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-1.5 bg-blue-100 rounded-lg">
                                                            <FiMail className="w-3.5 h-3.5 text-blue-600" />
                                                        </div>
                                                        <span className="text-sm text-slate-500">Email</span>
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-900">
                                                        {formData.email}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-1.5 bg-blue-100 rounded-lg">
                                                            <FiTag className="w-3.5 h-3.5 text-blue-600" />
                                                        </div>
                                                        <span className="text-sm text-slate-500">Category</span>
                                                    </div>
                                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                                        Student
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50/30 to-white hover:bg-blue-50/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-1.5 bg-blue-200 rounded-lg">
                                                            <FiDollarSign className="w-3.5 h-3.5 text-blue-700" />
                                                        </div>
                                                        <span className="text-sm font-semibold text-slate-700">Total Amount</span>
                                                    </div>
                                                    <span className="text-xl font-bold text-blue-700">
                                                        ₦{paymentValue.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex px-8 gap-4 mt-6">
                                            <button onClick={() => setStep(1)} className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-gray-400 rounded-xl w-full text-base text-white font-semibold shadow-lg hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer">
                                                <span>Edit Details </span>
                                                <FiEdit2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="flex gap-4 mt-6">
                                            <button onClick={registerParticipant} disabled={!isRegFormValid()} className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl w-full text-base text-white font-semibold shadow-lg hover:shadow-blue-200/50 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                                <span>Make Payment</span>
                                                <RiSecurePaymentLine className="text-xl" />
                                            </button>
                                        </div>
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>


                    <Card className="sticky top-24 rounded-3xl border-2 border-blue-200/60 shadow-xl bg-linear-to-br from-white to-blue-50/30 overflow-hidden">
                        <CardContent className="p-6">
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">
                                    <FiUserCheck className="w-3 h-3" />
                                    Student Package
                                </div>
                                <p className="text-sm text-muted-foreground">Registration Fee</p>
                                <p className="text-5xl lg:text-6xl font-bold text-blue-700 mt-1">
                                    ₦{paymentValue.toLocaleString()}
                                </p>
                                <div className="mt-2 h-px bg-linear-to-r from-transparent via-blue-200 to-transparent"></div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <p className="text-sm font-semibold text-slate-700 mb-3">What's Included:</p>
                                {[
                                    { icon: FiUserCheck, text: "Access to Conference Sessions" },
                                    { icon: FiFileText, text: "Paper in Conference Proceedings" },
                                    { icon: MdOutlineVerified, text: "Certificate of Presentation" },
                                    { icon: FiCoffee, text: "Conference Meals & Refreshments" },
                                    { icon: FiUsers, text: "Networking Opportunities" },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
                                        <CiCircleCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>


                </div>

                {/* Important Information Section */}
                <div className="container mx-auto px-6 mt-16">
                    <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-red-100/60 rounded-3xl overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-100 rounded-2xl shrink-0">
                                    <IoIosInformationCircleOutline className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        Important: Student Registration
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                                        A discounted registration fee of ₦20,000 is available for students. This category is open to undergraduate and postgraduate students who wish to attend, present papers, participate in workshops or engage with the academic and professional activities of the conference.
                                    </p>
                                    <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                                        <IoIosInformationCircleOutline className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                        <p className="text-sm text-red-700 font-medium">
                                            Students may be required to provide valid institutional identification during registration or payment confirmation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment & General Info Grid */}
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

                {/* Footer CTA */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500">
                        Have questions about registration?{" "}
                        <a href="/contact" className="text-blue-600 hover:underline font-medium hover:text-blue-800 transition-colors">
                            Contact our support team
                        </a>
                    </p>
                </div>
            </div>

            <Footer />
        </section>
    );
}