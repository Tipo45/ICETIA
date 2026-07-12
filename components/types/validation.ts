import { Degree } from "./registration";

export const validateFirstName = (firstName: string): string | null => {
    if (!firstName.trim()) return "First Name is required";
    if (firstName.length < 3) return "First Name must be at least 3 characters";
    if (!/^[a-zA-Z\s\-]+$/.test(firstName)) return "First Name should only contain letters and spaces";
    return null;
};

export const validateLastName = (lastName: string): string | null => {
    if (!lastName.trim()) return "Last Name is required";
    if (lastName.length < 3) return "Last Name must be at least 3 characters";
    if (!/^[a-zA-Z\s\-]+$/.test(lastName)) return "Last Name should only contain letters and spaces";
    return null;
};

export const validateEmail = (email: string): string | null => {
    if (!email.trim()) return "Email Address is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email))
        return "Please enter a valid email address";

    return null;
};

export const validateInstitution = (institution: string): string | null => {
    if (!institution.trim())
        return "Institution is required.";
    if (institution.length < 3) return "Institution must be at least 3 characters";
    if (!/^[a-zA-Z\s\-]+$/.test(institution)) return "Institution should only contain letters and spaces";
    return null;
};

export const validateDepartment = (department: string): string | null => {
    if (!department.trim())
        return "Department is required.";
    if (department.length < 3) return "Department must be at least 3 characters";
    if (!/^[a-zA-Z\s\-]+$/.test(department)) return "Department should only contain letters and spaces";
    return null;
};

export const validateCountry = (country: string): string | null => {
    if (!country.trim())
        return "Country is required.";
    return null;
};

export const validateDegree = (
    value: Degree | ""
) => {

    if (!value)
        return "Degree is required.";

    return "";
};

export const validatePaperTitle = (paperTitle: string): string | null => {
    if (!paperTitle.trim())
        return "Paper Title is required.";
    if (paperTitle.length < 3) return "Paper Title must be at least 3 characters";
    if (!/^[a-zA-Z\s\-]+$/.test(paperTitle)) return "Paper Title should only contain letters and spaces";
    return null;
};


export const validatePaperFile = (file: File | null) => {
    if (!file) {
        return "Please upload your paper.";
    }

    if (file.size > 5 * 1024 * 1024) {
        return "File size must not exceed 5 MB.";
    }

    return "";
};