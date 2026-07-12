"use client";

import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { Country } from "country-state-city";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Degree, RegistrationFormData, RegistrationFormErrors, RegistrationFormTouched } from "../types/registration";
import { validateCountry, validateDegree, validateDepartment, validateEmail, validateFirstName, validateInstitution, validateLastName } from "../types/validation";
import { toast } from "sonner";

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

export default function CoAuthorsStep({ formData,
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
            coAuthors: prev.coAuthors.filter((_, i) => i !== index),
        }));

        setFormErrors((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.filter((_, i) => i !== index),
        }));

        setFormTouched((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.filter((_, i) => i !== index),
        }));
    };

    const handleChange = (
        index: number,
        field: keyof (typeof formData.coAuthors)[number],
        value: string
    ) => {
        // Update form data
        setFormData((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.map((coAuthor, i) =>
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

        // Mark field as touched
        setFormTouched((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.map((coAuthor, i) =>
                i === index
                    ? {
                        ...coAuthor,
                        [field]: true,
                    }
                    : coAuthor
            ),
        }));

        // Validate
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
                error = validateDegree(value as Degree | "") || "";
                break;
        }

        // Store error
        setFormErrors((prev) => ({
            ...prev,
            coAuthors: prev.coAuthors.map((coAuthor, i) =>
                i === index
                    ? {
                        ...coAuthor,
                        [field]: error,
                    }
                    : coAuthor
            ),
        }));
    };


    return (
        <div className="flex flex-col gap-6 px-8 py-4">
            {/* <h2 className="text-xl font-bold">Co-authors</h2> */}
            <p className="text-lg">If none, please skip</p>
            {formData.coAuthors.map((coauthor, index) => (
                <div
                    key={index}
                    className="space-y-6 border rounded-xl p-6 bg-white shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                            Co-author {index + 1}
                        </h3>

                        {formData.coAuthors.length === 1 ? "" : (<button
                            type="button"
                            onClick={() => removeCoauthor(index)}
                            className="text-red-600 hover:text-red-700"
                        >
                            Remove
                        </button>)}
                    </div>

                    {/* First Name */}
                    <div className="space-y-2">
                        <label className="text-sm">
                            First Name <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            value={coauthor.firstName}
                            onChange={(e) =>
                                handleChange(index, "firstName", e.target.value)
                            }
                            className={`w-full h-10 rounded-lg border px-4 ${formTouched.coAuthors[index]?.firstName &&
                                formErrors.coAuthors[index]?.firstName
                                ? "border-red-500"
                                : "border-input-border"
                                }`}
                        />

                        {formTouched.coAuthors[index]?.firstName &&
                            formErrors.coAuthors[index]?.firstName && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.coAuthors[index].firstName}
                                </p>
                            )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                        <label className="text-sm">
                            Last Name <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            value={coauthor.lastName}
                            onChange={(e) =>
                                handleChange(index, "lastName", e.target.value)
                            }
                            className={`w-full h-10 rounded-lg border px-4 ${formTouched.coAuthors[index]?.lastName &&
                                formErrors.coAuthors[index]?.lastName
                                ? "border-red-500"
                                : "border-input-border"
                                }`}
                        />

                        {formTouched.coAuthors[index]?.lastName &&
                            formErrors.coAuthors[index]?.lastName && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.coAuthors[index].lastName}
                                </p>
                            )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm">
                            Email <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="email"
                            value={coauthor.email}
                            onChange={(e) =>
                                handleChange(index, "email", e.target.value)
                            }
                            className={`w-full h-10 rounded-lg border px-4 ${formTouched.coAuthors[index]?.email &&
                                formErrors.coAuthors[index]?.email
                                ? "border-red-500"
                                : "border-input-border"
                                }`}
                        />

                        {formTouched.coAuthors[index]?.email &&
                            formErrors.coAuthors[index]?.email && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.coAuthors[index].email}
                                </p>
                            )}
                    </div>

                    {/* Institution */}
                    <div className="space-y-2">
                        <label className="text-sm">
                            Institution <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            value={coauthor.institution}
                            onChange={(e) =>
                                handleChange(index, "institution", e.target.value)
                            }
                            className={`w-full h-10 rounded-lg border px-4 ${formTouched.coAuthors[index]?.institution &&
                                formErrors.coAuthors[index]?.institution
                                ? "border-red-500"
                                : "border-input-border"
                                }`}
                        />

                        {formTouched.coAuthors[index]?.institution &&
                            formErrors.coAuthors[index]?.institution && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.coAuthors[index].institution}
                                </p>
                            )}
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                        <label className="text-sm">
                            Country <span className="text-red-500">*</span>
                        </label>

                        <Select
                            value={coauthor.country}
                            onValueChange={(value) =>
                                handleChange(index, "country", value)
                            }
                        >
                            <SelectTrigger className="w-full h-10">
                                <SelectValue placeholder="Select country" />
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

                        {formTouched.coAuthors[index]?.country &&
                            formErrors.coAuthors[index]?.country && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.coAuthors[index].country}
                                </p>
                            )}
                    </div>

                    {/* Department */}
                    <div className="space-y-2">
                        <label className="text-sm">
                            Department <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="text"
                            value={coauthor.department}
                            onChange={(e) =>
                                handleChange(index, "department", e.target.value)
                            }
                            className={`w-full h-10 rounded-lg border px-4 ${formTouched.coAuthors[index]?.department &&
                                formErrors.coAuthors[index]?.department
                                ? "border-red-500"
                                : "border-input-border"
                                }`}
                        />

                        {formTouched.coAuthors[index]?.department &&
                            formErrors.coAuthors[index]?.department && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.coAuthors[index].department}
                                </p>
                            )}
                    </div>

                    {/* Degree */}
                    <div className="space-y-2">
                        <label className="text-sm">
                            Degree <span className="text-red-500">*</span>
                        </label>

                        <Select
                            value={coauthor.degree}
                            onValueChange={(value) =>
                                handleChange(index, "degree", value)
                            }
                        >
                            <SelectTrigger className="w-full h-10">
                                <SelectValue placeholder="Select Degree" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="BSc">BSc</SelectItem>
                                    <SelectItem value="MSc">MSc</SelectItem>
                                    <SelectItem value="MPhil">MPhil</SelectItem>
                                    <SelectItem value="PhD">PhD</SelectItem>
                                    <SelectItem value="Professor">Professor</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {formTouched.coAuthors[index]?.degree &&
                            formErrors.coAuthors[index]?.degree && (
                                <p className="text-red-500 text-sm">
                                    {formErrors.coAuthors[index].degree}
                                </p>
                            )}
                    </div>

                </div>
            ))}

            <div className="flex gap-4 mt-6 px-8 py-4">
                <button onClick={addCoauthor} className="flex justify-center items-center gap-2.5 mt-10 px-6 py-3.5 text-white bg-blue-600 hover:bg-blue-400 rounded-xl w-full text-base font-semibold transition cursor-pointer">Add Co-Author</button>
            </div>
        </div>
    )
}