"use client";

import { Country } from "country-state-city";

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

import {
    validateCountry,
    validateDegree,
    validateDepartment,
    validateEmail,
    validateFirstName,
    validateInstitution,
    validateLastName,
} from "../types/validation";

import { toast } from "sonner";

import {
    FiMail,
    FiUser,
} from "react-icons/fi";

import {
    LuBuilding2,
    LuGraduationCap,
    LuPlus,
    LuTrash2,
    LuUsers,
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

export default function CoAuthorsStep({
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    formTouched,
    setFormTouched,
}: Props) {
    const countries = Country.getAllCountries();

    const addCoauthor = () => {
        if (formData.coAuthors.length >= 3) {
            toast.error("Maximum of 3 co-authors allowed.");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            coAuthors: [
                ...prev.coAuthors,
                {
                    firstName: "",
                    lastName: "",
                    email: "",
                    institution: "",
                    country: "",
                    department: "",
                    degree: "" as Degree | "",
                },
            ],
        }));

        setFormErrors((prev) => ({
            ...prev,
            coAuthors: [
                ...prev.coAuthors,
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
        }));

        setFormTouched((prev) => ({
            ...prev,
            coAuthors: [
                ...prev.coAuthors,
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
        }));
    };

    const removeCoauthor = (index: number) => {
        if (formData.coAuthors.length === 1) {
            return;
        }

        setFormData((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.filter(
                (_, i) => i !== index
            ),
        }));

        setFormErrors((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.filter(
                (_, i) => i !== index
            ),
        }));

        setFormTouched((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const handleChange = (
        index: number,
        field: keyof (typeof formData.coAuthors)[number],
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.map(
                (coAuthor, i) =>
                    i === index
                        ? {
                              ...coAuthor,
                              [field]:
                                  field === "degree"
                                      ? (value as Degree)
                                      : value,
                          }
                        : coAuthor
            ),
        }));

        setFormTouched((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.map(
                (coAuthor, i) =>
                    i === index
                        ? {
                              ...coAuthor,
                              [field]: true,
                          }
                        : coAuthor
            ),
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

            case "department":
                error = validateDepartment(value) || "";
                break;

            case "degree":
                error =
                    validateDegree(
                        value as Degree | ""
                    ) || "";
                break;
        }

        setFormErrors((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.map(
                (coAuthor, i) =>
                    i === index
                        ? {
                              ...coAuthor,
                              [field]: error,
                          }
                        : coAuthor
            ),
        }));
    };

    const inputClass = (
        index: number,
        field: keyof (typeof formData.coAuthors)[number]
    ) => {
        const touched =
            formTouched.coAuthors[index]?.[field];

        const error =
            formErrors.coAuthors[index]?.[field];

        return `h-11 w-full border bg-white px-3 text-sm outline-none transition ${
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
                        <LuUsers className="h-4 w-4 text-blue-600" />
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Step 03
                        </p>

                        <h3 className="mt-1 text-lg font-semibold">
                            Co-authors
                        </h3>
                    </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                    Add the details of your co-authors if applicable. You can
                    add up to three co-authors.
                </p>
            </div>

            <div className="border-l-2 border-blue-500 bg-blue-50/60 px-4 py-3">
                <p className="text-sm text-blue-800">
                    If your paper has no co-authors, you can leave this section
                    unchanged and continue.
                </p>
            </div>

            <div className="space-y-6">
                {formData.coAuthors.map((coauthor, index) => (
                    <div
                        key={index}
                        className="border border-slate-200 bg-white"
                    >
                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center bg-[#07111f] text-xs font-semibold text-white">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                                        Contributor
                                    </p>

                                    <h4 className="mt-0.5 text-sm font-semibold">
                                        Co-author {index + 1}
                                    </h4>
                                </div>
                            </div>

                            {formData.coAuthors.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeCoauthor(index)
                                    }
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 transition hover:text-red-800"
                                >
                                    <LuTrash2 className="h-4 w-4" />
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="grid gap-5 p-5 tablet:grid-cols-2 lg:p-6">
                            <Field
                                label="First Name"
                                required
                                error={
                                    formTouched.coAuthors[index]
                                        ?.firstName
                                        ? formErrors.coAuthors[
                                              index
                                          ]?.firstName
                                        : ""
                                }
                            >
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="text"
                                        value={
                                            coauthor.firstName
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "firstName",
                                                e.target.value
                                            )
                                        }
                                        placeholder="First name"
                                        className={`${inputClass(
                                            index,
                                            "firstName"
                                        )} pl-10`}
                                    />
                                </div>
                            </Field>

                            <Field
                                label="Last Name"
                                required
                                error={
                                    formTouched.coAuthors[index]
                                        ?.lastName
                                        ? formErrors.coAuthors[
                                              index
                                          ]?.lastName
                                        : ""
                                }
                            >
                                <input
                                    type="text"
                                    value={coauthor.lastName}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "lastName",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Last name"
                                    className={inputClass(
                                        index,
                                        "lastName"
                                    )}
                                />
                            </Field>

                            <Field
                                label="Email"
                                required
                                error={
                                    formTouched.coAuthors[index]
                                        ?.email
                                        ? formErrors.coAuthors[
                                              index
                                          ]?.email
                                        : ""
                                }
                            >
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="email"
                                        value={coauthor.email}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Email address"
                                        className={`${inputClass(
                                            index,
                                            "email"
                                        )} pl-10`}
                                    />
                                </div>
                            </Field>

                            <Field
                                label="Institution"
                                required
                                error={
                                    formTouched.coAuthors[index]
                                        ?.institution
                                        ? formErrors.coAuthors[
                                              index
                                          ]?.institution
                                        : ""
                                }
                            >
                                <input
                                    type="text"
                                    value={
                                        coauthor.institution
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "institution",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Institution"
                                    className={inputClass(
                                        index,
                                        "institution"
                                    )}
                                />
                            </Field>

                            <Field
                                label="Country"
                                required
                                error={
                                    formTouched.coAuthors[index]
                                        ?.country
                                        ? formErrors.coAuthors[
                                              index
                                          ]?.country
                                        : ""
                                }
                            >
                                <Select
                                    value={coauthor.country}
                                    onValueChange={(value) =>
                                        handleChange(
                                            index,
                                            "country",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger className="h-11 w-full rounded-none border-slate-200 bg-white px-3 text-sm shadow-none">
                                        <SelectValue placeholder="Select country" />
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
                            </Field>

                            <Field
                                label="Department"
                                required
                                error={
                                    formTouched.coAuthors[index]
                                        ?.department
                                        ? formErrors.coAuthors[
                                              index
                                          ]?.department
                                        : ""
                                }
                            >
                                <input
                                    type="text"
                                    value={
                                        coauthor.department
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "department",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Department"
                                    className={inputClass(
                                        index,
                                        "department"
                                    )}
                                />
                            </Field>

                            <Field
                                label="Degree"
                                required
                                error={
                                    formTouched.coAuthors[index]
                                        ?.degree
                                        ? formErrors.coAuthors[
                                              index
                                          ]?.degree
                                        : ""
                                }
                            >
                                <Select
                                    value={coauthor.degree}
                                    onValueChange={(value) =>
                                        handleChange(
                                            index,
                                            "degree",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger className="h-11 w-full rounded-none border-slate-200 bg-white px-3 text-sm shadow-none">
                                        <SelectValue placeholder="Select degree" />
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
                                            <SelectItem value="Other">
                                                Other
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={addCoauthor}
                disabled={formData.coAuthors.length >= 3}
                className="flex min-h-11 w-full items-center justify-center gap-2 border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <LuPlus className="h-4 w-4" />
                Add Co-Author
            </button>

            <div className="flex gap-3 border border-slate-200 bg-slate-50 p-4">
                <LuGraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />

                <p className="text-xs leading-5 text-slate-500">
                    Only add co-authors who should be associated with this
                    conference submission. Their information will be included
                    with your registration record.
                </p>
            </div>
        </div>
    );
}

function Field({
    label,
    required,
    error,
    children,
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                {label}{" "}
                {required && (
                    <span className="text-red-500">*</span>
                )}
            </label>

            {children}

            {error && (
                <p className="text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}