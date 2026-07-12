import { useState } from "react";
import { Degree, RegistrationFormData, RegistrationFormErrors, RegistrationFormTouched } from "../types/registration";
import { FaArrowRightLong } from "react-icons/fa6";
import { validateEmail, validateFirstName, validateLastName } from "../types/validation";

type Props = {
    formData: RegistrationFormData;
    setFormData: React.Dispatch<
        React.SetStateAction<RegistrationFormData>
    >;

    formErrors: RegistrationFormErrors;
    setFormErrors: React.Dispatch<
        React.SetStateAction<RegistrationFormErrors>
    >;

    formTouched: RegistrationFormTouched;
    setFormTouched: React.Dispatch<
        React.SetStateAction<RegistrationFormTouched>
    >;
};

export default function PersonalInfoStep({ formData,
    setFormData,
    formErrors,
    setFormErrors,
    formTouched,
    setFormTouched,
}: Props) {

    const paymentValue = 30000;

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

    return (
        <div className="flex flex-col gap-6 px-8 py-4">
            {/* <h2 className="text-xl font-bold">Personal Information</h2> */}
            <div className="space-y-2">
                <label className="text-sm">
                    First Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="Enter first name"
                    className={`w-full h-10 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.firstName && formErrors.firstName ? "border-red-500 focus:ring-red-500" : formTouched.firstName && !formErrors.firstName && formData.firstName ? "border-green-500 focus:ring-green-500"
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
                    className={`w-full h-10 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.lastName && formErrors.lastName ? "border-red-500 focus:ring-red-500" : formTouched.lastName && !formErrors.lastName && formData.lastName ? "border-green-500 focus:ring-green-500"
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
                    className={`w-full h-10 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.email && formErrors.email ? "border-red-500 focus:ring-red-500" : formTouched.email && !formErrors.email && formData.email ? "border-green-500 focus:ring-green-500"
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
                    <span className="flex items-center justify-center w-12 h-10 bg-slate-100 text-slate-600 font-bold border-r border-slate-200">
                        ₦
                    </span>
                    <input
                        type="text"
                        value={paymentValue.toLocaleString()}
                        disabled
                        className="flex-1 h-10 px-3 bg-transparent text-slate-900 font-medium cursor-not-allowed outline-none"
                    />
                </div>
            </div>

            {/* <div className="flex gap-4 mt-6">

                <button disabled={!isRegFormValid()} className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl w-full text-base text-white font-semibold shadow-lg hover:shadow-blue-200/50 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <span>Proceed</span>
                    <FaArrowRightLong className="text-xl" />
                </button>
            </div> */}
        </div>
    )
}