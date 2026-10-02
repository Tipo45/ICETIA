"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import {
    Degree,
    RegistrationFormData,
    RegistrationFormErrors,
    RegistrationFormTouched,
} from "../types/registration";

import { Country } from "country-state-city";

import {
    validateCountry,
    validateDegree,
    validateDepartment,
    validateInstitution,
    validatePaperTitle,
} from "../types/validation";

import {
    FiBookOpen,
} from "react-icons/fi";

import {
    LuBuilding2,
    LuGraduationCap,
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

export default function AcademicInfoStep({
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    formTouched,
    setFormTouched,
}: Props) {
    const countries = Country.getAllCountries();

    const handleChange = (
        field: keyof typeof formData,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]:
                field === "degree"
                    ? (value as Degree)
                    : value,
        }));

        setFormTouched((prev) => ({
            ...prev,
            [field]: true,
        }));

        let error = "";

        switch (field) {
            case "institution":
                error = validateInstitution(value) || "";
                break;

            case "country":
                error = validateCountry(value) || "";
                break;

            case "department":
                error = validateDepartment(value) || "";
                break;

            case "degree":
                error =
                    validateDegree(
                        value as Degree | ""
                    ) || "";
                break;

            case "paperTitle":
                error = validatePaperTitle(value) || "";
                break;
        }

        setFormErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    };

    const fieldClass = (field: keyof typeof formErrors) => {
        const touched =
            formTouched[field as keyof typeof formTouched];

        const error =
            formErrors[field as keyof typeof formErrors];

        return `h-12 w-full border bg-white px-4 text-sm outline-none transition ${
            touched && error
                ? "border-red-400 focus:border-red-500"
                : touched && !error
                ? "border-emerald-400 focus:border-emerald-500"
                : "border-slate-200 focus:border-blue-600"
        }`;
    };

    return (
        <div className="space-y-7 px-6 py-7 lg:px-8 lg:py-8">
            <div className="border-b border-slate-200 pb-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center bg-slate-100">
                        <FiBookOpen className="h-4 w-4 text-blue-600" />
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Step 02
                        </p>

                        <h3 className="mt-1 text-lg font-semibold">
                            Academic information
                        </h3>
                    </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                    Provide your institutional information and the title of
                    your accepted research paper.
                </p>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                    Institution{" "}
                    <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                    <LuBuilding2 className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        value={formData.institution}
                        onChange={(e) =>
                            handleChange(
                                "institution",
                                e.target.value
                            )
                        }
                        placeholder="Enter institution"
                        className={`${fieldClass(
                            "institution"
                        )} pl-11`}
                    />
                </div>

                {formTouched.institution &&
                    formErrors.institution && (
                        <p className="text-xs text-red-500">
                            {formErrors.institution}
                        </p>
                    )}
            </div>

            <div className="grid gap-6 tablet:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                        Country{" "}
                        <span className="text-red-500">*</span>
                    </label>

                    <Select
                        value={formData.country}
                        onValueChange={(value) =>
                            handleChange("country", value)
                        }
                    >
                        <SelectTrigger
                            className={`h-12 w-full rounded-none border bg-white px-4 text-sm shadow-none ${
                                formTouched.country &&
                                formErrors.country
                                    ? "border-red-400"
                                    : formTouched.country &&
                                      !formErrors.country &&
                                      formData.country
                                    ? "border-emerald-400"
                                    : "border-slate-200"
                            }`}
                        >
                            <SelectValue placeholder="Choose country" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                {countries.map((country) => (
                                    <SelectItem
                                        key={country.isoCode}
                                        value={country.name}
                                    >
                                        {country.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {formTouched.country &&
                        formErrors.country && (
                            <p className="text-xs text-red-500">
                                {formErrors.country}
                            </p>
                        )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                        Department{" "}
                        <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        value={formData.department}
                        onChange={(e) =>
                            handleChange(
                                "department",
                                e.target.value
                            )
                        }
                        placeholder="Enter department"
                        className={fieldClass("department")}
                    />

                    {formTouched.department &&
                        formErrors.department && (
                            <p className="text-xs text-red-500">
                                {formErrors.department}
                            </p>
                        )}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                    Degree{" "}
                    <span className="text-red-500">*</span>
                </label>

                <Select
                    value={formData.degree}
                    onValueChange={(value) =>
                        handleChange("degree", value)
                    }
                >
                    <SelectTrigger
                        className={`h-12 w-full rounded-none border bg-white px-4 text-sm shadow-none ${
                            formTouched.degree &&
                            formErrors.degree
                                ? "border-red-400"
                                : formTouched.degree &&
                                  !formErrors.degree &&
                                  formData.degree
                                ? "border-emerald-400"
                                : "border-slate-200"
                        }`}
                    >
                        <SelectValue placeholder="Choose degree" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="BSc">
                                BSc
                            </SelectItem>
                            <SelectItem value="MSc">
                                MSc
                            </SelectItem>
                            <SelectItem value="MPhil">
                                MPhil
                            </SelectItem>
                            <SelectItem value="PhD">
                                PhD
                            </SelectItem>
                            <SelectItem value="Professor">
                                Professor
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {formTouched.degree &&
                    formErrors.degree && (
                        <p className="text-xs text-red-500">
                            {formErrors.degree}
                        </p>
                    )}
            </div>

            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                    Paper Title{" "}
                    <span className="text-red-500">*</span>
                </label>

                <textarea
                    value={formData.paperTitle}
                    onChange={(e) =>
                        handleChange(
                            "paperTitle",
                            e.target.value
                        )
                    }
                    placeholder="Enter the title of your accepted paper"
                    rows={4}
                    className={`w-full resize-none border bg-white px-4 py-3 text-sm outline-none transition ${
                        formTouched.paperTitle &&
                        formErrors.paperTitle
                            ? "border-red-400 focus:border-red-500"
                            : formTouched.paperTitle &&
                              !formErrors.paperTitle &&
                              formData.paperTitle
                            ? "border-emerald-400 focus:border-emerald-500"
                            : "border-slate-200 focus:border-blue-600"
                    }`}
                />

                {formTouched.paperTitle &&
                    formErrors.paperTitle && (
                        <p className="text-xs text-red-500">
                            {formErrors.paperTitle}
                        </p>
                    )}
            </div>

            <div className="flex gap-3 border border-blue-100 bg-blue-50 p-4">
                <LuGraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                <p className="text-xs leading-5 text-blue-800">
                    Ensure your paper title matches the title associated with
                    your accepted submission.
                </p>
            </div>
        </div>
    );
}