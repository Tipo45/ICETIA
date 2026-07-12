"use client";

import {
    RegistrationFormData,
    RegistrationFormErrors,
    RegistrationFormTouched,
} from "../types/registration";
import { LuFileText } from "react-icons/lu";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { TbAlertTriangle } from "react-icons/tb";

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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function PaperUploadStep({
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    formTouched,
    setFormTouched,
}: Props) {

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        setFormTouched((prev) => ({
            ...prev,
            paperFile: true,
        }));

        if (!file) {
            setFormData((prev) => ({
                ...prev,
                paperFile: null,
            }));

            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setFormErrors((prev) => ({
                ...prev,
                paperFile: "File size must not exceed 5 MB.",
            }));

            return;
        }

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            setFormErrors((prev) => ({
                ...prev,
                paperFile: "Only PDF files are allowed.",
            }));

            return;
        }

        setFormErrors((prev) => ({
            ...prev,
            paperFile: "",
        }));

        setFormData((prev) => ({
            ...prev,
            paperFile: file,
        }));
    };

    return (
        <div className="flex flex-col gap-6 px-8 py-4">

            <div>
                <h2 className="text-2xl font-bold text-slate-900">
                    Upload Camera Ready Paper
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Upload the final version of your accepted paper.
                </p>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 transition-colors bg-slate-50">

                <label
                    htmlFor="paper-upload"
                    className="cursor-pointer flex flex-col items-center justify-center py-12 px-6"
                >
                    <RiUploadCloud2Fill className="w-14 h-14 text-blue-600 mb-4" />

                    <h3 className="font-semibold text-lg">
                        Click to upload your paper
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                        PDF
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                        Maximum file size: 5 MB
                    </p>

                    <input
                        id="paper-upload"
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            {formData.paperFile && (
                <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">

                    <LuFileText className="w-6 h-6 text-green-600" />

                    <div className="flex-1">
                        <p className="font-medium">
                            {formData.paperFile.name}
                        </p>

                        <p className="text-sm text-slate-500">
                            {(formData.paperFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                </div>
            )}

            {formTouched.paperFile && formErrors.paperFile && (
                <p className="text-red-500 text-sm">
                    {formErrors.paperFile}
                </p>
            )}

            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 flex gap-3">
                <TbAlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                    <h4 className="font-semibold text-amber-800">
                        Important
                    </h4>

                    <ul className="mt-2 text-sm text-amber-700 space-y-1 list-disc ml-5">
                        <li>Only PDF files are accepted.</li>
                        <li>Maximum file size is <strong>5 MB</strong>.</li>
                        <li>Ensure this is the final camera-ready version.</li>
                        <li>The uploaded file should match the paper title submitted during registration.</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}