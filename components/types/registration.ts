export type Degree =
    | "BSc"
    | "MSc"
    | "MPhil"
    | "PhD"
    | "Professor"
    | "Other";

export interface CoAuthor {
    firstName: string;
    lastName: string;
    email: string;
    institution: string;
    department: string;
    country: string;
    degree: Degree | "";
}

export interface RegistrationFormData {
    firstName: string;
    lastName: string;
    email: string;

    institution: string;
    department: string;
    country: string;
    degree: Degree | "";

    paperTitle: string;
    

    coAuthors: CoAuthor[];

    paperFile: File | null;
}

export interface CoAuthorErrors {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  country: string;
  department: string;
  degree: string;
}

export interface RegistrationFormErrors {
    firstName: string;
    lastName: string;
    email: string;

    institution: string;
    department: string;
    country: string;
    degree: string;

    paperTitle: string;
    

    coAuthors: CoAuthorErrors[];

    paperFile: string;
}

export interface CoAuthorTouched {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  institution: boolean;
  country: boolean;
  department: boolean;
  degree: boolean;
}

export interface RegistrationFormTouched {
    firstName: boolean;
    lastName: boolean;
    email: boolean;

    institution: boolean;
    department: boolean;
    country: boolean;
    degree: boolean;

    paperTitle: boolean;
    

    coAuthors: CoAuthorTouched[];

    paperFile: boolean;
}