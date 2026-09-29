"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Degree, RegistrationFormData, RegistrationFormErrors, RegistrationFormTouched } from "../types/registration";
import { Country } from "country-state-city";
import { validateCountry, validateDegree, validateDepartment, validateInstitution, validatePaperTitle } from "../types/validation";

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

export default function AcademicInfoStep({ formData,
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

        setFormData(prev => ({
            ...prev,
            [field]: field === "degree"
                ? (value as Degree)
                : value,
        }));

        setFormTouched(prev => ({
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
                error = validateDegree(value as Degree | "") || "";
                break;

            case "paperTitle":
                error = validatePaperTitle(value) || "";
                break;
        }

        setFormErrors(prev => ({
            ...prev,
            [field]: error,
        }));
    };

    return (
        <div className="flex flex-col gap-6 px-8 py-4">
            {/* <h2 className="text-xl font-bold">Academic Information</h2> */}
            <div className="space-y-2">
                <label className="text-sm">
                    Institution <span className="text-red-500">*</span>
                </label>
                <input type="text"
                    value={formData.institution}
                    onChange={(e) => handleChange("institution", e.target.value)} className={`w-full h-10 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.institution && formErrors.institution ? "border-red-500 focus:ring-red-500" : formTouched.institution && !formErrors.institution && formData.institution ? "border-green-500 focus:ring-green-500"
                        : "border-input-border"}`}
                />
                {formTouched.institution && formErrors.institution && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.institution}</p>
                )}
            </div>
            <div className="space-y-2">
                <label className="text-sm">
                    Country   <span className="text-red-500">*</span>
                </label>
                <Select value={formData.country}
                    onValueChange={(value) => handleChange("country", value)}>
                    <SelectTrigger className={`w-full h-10 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.country && formErrors.country ? "border-red-500 focus:ring-red-500" : formTouched.country && !formErrors.country && formData.country ? "border-green-500 focus:ring-green-500" : "border-input-border"}`}>
                        <SelectValue placeholder="Choose Country" />
                    </SelectTrigger>
                    <SelectContent>

                        <SelectGroup >
                            {countries.map((country) => (
                                <SelectItem key={country.isoCode} value={country.name}>{country.name}</SelectItem>))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <label className="text-sm">
                    Department <span className="text-red-500">*</span>
                </label>
                <input type="text"
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)} className={`w-full h-10 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.department && formErrors.department ? "border-red-500 focus:ring-red-500" : formTouched.department && !formErrors.department && formData.department ? "border-green-500 focus:ring-green-500"
                        : "border-input-border"}`}
                />
                {formTouched.department && formErrors.department && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.department}</p>
                )}
            </div>
            <div className="space-y-2">
                <label className="text-sm">
                    Degree <span className="text-red-500">*</span>
                </label>
                <Select value={formData.degree}
                    onValueChange={(value) =>
                        handleChange("degree", value)
                    }>
                    <SelectTrigger className={`w-full h-10 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.degree && formErrors.degree ? "border-red-500 focus:ring-red-500" : formTouched.degree && !formErrors.degree && formData.degree ? "border-green-500 focus:ring-green-500" : "border-input-border"}`}>
                        <SelectValue placeholder="Choose degree" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="BSc">BSc</SelectItem>
                            <SelectItem value="MSc">MSc</SelectItem>
                            <SelectItem value="MPhil">MPhil</SelectItem>
                            <SelectItem value="PhD">PhD</SelectItem>
                            <SelectItem value="Professor">Professor</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <label className="text-sm">
                    Paper Title <span className="text-red-500">*</span>
                </label>
                <input type="text"
                    value={formData.paperTitle}
                    onChange={(e) => handleChange("paperTitle", e.target.value)} className={`w-full h-10 border placeholder:text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600 transition ${formTouched.paperTitle && formErrors.paperTitle ? "border-red-500 focus:ring-red-500" : formTouched.paperTitle && !formErrors.paperTitle && formData.paperTitle ? "border-green-500 focus:ring-green-500"
                        : "border-input-border"}`}
                />
                {formTouched.paperTitle && formErrors.paperTitle && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.paperTitle}</p>
                )}
            </div>
        </div>
    );
}