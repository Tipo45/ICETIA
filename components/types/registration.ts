export type Degree =
    | "BSc"
    | "MSc"
    | "MPhil"
    | "PhD"
    | "Professor"
    | "Other";

export type PaperTracks = 
    "Cybersecurity, Privacy & Digital Trust" |
    "Artificial Intelligence and Machine Learning" |
    "Smart Systems, Internet of Things and Embedded Computing" |
    "Computing, Cloud, Edge and Distributed Systems" |
    "Data Science, Analytics and Big Data" |
    "Software Development" |
    "Health Informatics, Digtal Health and Medical Laboratory Technology" |
    "Emerging Technologies and Digital Transformation" |
    "Computing for Sustainable Development" |
    "Information Systems, Governance and Society" 
    

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
    paperTrack: PaperTracks;
    paperTitle: string;
    paperFile: File | null;

    coAuthors: CoAuthor[];
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
    paperTrack: string;
    paperTitle: string;
    paperFile: string;


    coAuthors: CoAuthorErrors[];
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
    paperTrack: boolean;
    paperTitle: boolean;
    paperFile: boolean;

    coAuthors: CoAuthorTouched[];
}

export interface SubmissionOfPapers {
    paperTrack: string;
    paperTitle: string;
    abstract: string;
    paperFile: File | null;
}