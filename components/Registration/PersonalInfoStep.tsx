"use client";

import {
    RegistrationFormData,
    RegistrationFormErrors,
    RegistrationFormTouched,
} from "../types/registration";
import {
    validateEmail,
    validateFirstName,
    validateLastName,
} from "../types/validation";

import {
    FiMail,
    FiUser,
} from "react-icons/fi";

import {
    LuBadgeCheck,
} from "react-icons/lu";

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

export default function PersonalInfoStep({
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    formTouched,
    setFormTouched,
}: Props) {
    const paymentValue = 40000;

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
        }

        setFormErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    };

    const inputClass = (field: "firstName" | "lastName" | "email") => {
        const hasError =
            formTouched[field] && formErrors[field];

        const isValid =
            formTouched[field] &&
            !formErrors[field] &&
            formData[field];

        return `h-12 w-full border bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 ${
            hasError
                ? "border-red-400 focus:border-red-500"
                : isValid
                ? "border-emerald-400 focus:border-emerald-500"
                : "border-slate-200 focus:border-blue-600"
        }`;
    };

    return (
        <div className="space-y-7 px-6 py-7 lg:px-8 lg:py-8">
            <div className="border-b border-slate-200 pb-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center bg-slate-100">
                        <FiUser className="h-4 w-4 text-blue-600" />
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Step 01
                        </p>

                        <h3 className="mt-1 text-lg font-semibold">
                            Personal information
                        </h3>
                    </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                    Enter the personal details that should appear on your
                    conference registration record.
                </p>
            </div>

            <div className="grid gap-6 tablet:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                        First Name{" "}
                        <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                            handleChange(
                                "firstName",
                                e.target.value
                            )
                        }
                        placeholder="Enter first name"
                        className={inputClass("firstName")}
                    />

                    {formTouched.firstName &&
                        formErrors.firstName && (
                            <p className="text-xs text-red-500">
                                {formErrors.firstName}
                            </p>
                        )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                        Last Name{" "}
                        <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                            handleChange(
                                "lastName",
                                e.target.value
                            )
                        }
                        placeholder="Enter last name"
                        className={inputClass("lastName")}
                    />

                    {formTouched.lastName &&
                        formErrors.lastName && (
                            <p className="text-xs text-red-500">
                                {formErrors.lastName}
                            </p>
                        )}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                    Email Address{" "}
                    <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            handleChange(
                                "email",
                                e.target.value
                            )
                        }
                        placeholder="Enter email address"
                        className={`${inputClass(
                            "email"
                        )} pl-11`}
                    />
                </div>

                {formTouched.email &&
                    formErrors.email && (
                        <p className="text-xs text-red-500">
                            {formErrors.email}
                        </p>
                    )}
            </div>

            <div className="border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-5">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Registration Fee
                        </p>

                        <p className="mt-2 text-2xl font-semibold tracking-tight">
                            ₦{(paymentValue - paymentValue * 0.125).toLocaleString()} {" "}
                           <span className=" text-slate-400 line-through"> ₦{paymentValue.toLocaleString()}</span>
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Author registration category.
                        </p>
                    </div>

                    <LuBadgeCheck className="h-6 w-6 text-blue-600" />
                </div>
            </div>
        </div>
    );
}