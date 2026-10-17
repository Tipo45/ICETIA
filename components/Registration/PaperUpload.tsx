"use client";

import {
    RegistrationFormData,
    RegistrationFormErrors,
    RegistrationFormTouched,
} from "../types/registration";

import {
    LuCloudUpload,
    LuFileCheck2,
    LuFileText,
} from "react-icons/lu";

import {
    TbAlertTriangle,
} from "react-icons/tb";

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

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function PaperUploadStep({
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    setFormTouched,
    formTouched,
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
                paperFile:
                    "File size must not exceed 5 MB.",
            }));

            return;
        }

        const allowedTypes = [
            "application/pdf",
        ];

        if (!allowedTypes.includes(file.type)) {
            setFormErrors((prev) => ({
                ...prev,
                paperFile:
                    "Only PDF files are allowed.",
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
        <div className="space-y-7 px-6 py-7 lg:px-8 lg:py-8">
            <div className="border-b border-slate-200 pb-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center bg-slate-100">
                        <LuFileText className="h-4 w-4 text-blue-600" />
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Step 04
                        </p>

                        <h3 className="mt-1 text-lg font-semibold">
                            Camera-ready paper
                        </h3>
                    </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                    Upload the final version of your accepted paper for
                    conference processing.
                </p>
            </div>

            <div className="border border-slate-200 bg-slate-50 p-2">
                <label
                    htmlFor="paper-upload"
                    className="flex min-h-64 cursor-pointer flex-col items-center justify-center border border-dashed border-slate-300 bg-white px-6 py-10 text-center transition hover:border-blue-500 hover:bg-blue-50/30"
                >
                    <div className="flex h-14 w-14 items-center justify-center bg-slate-100">
                        <LuCloudUpload className="h-7 w-7 text-blue-600" />
                    </div>

                    <h4 className="mt-5 text-base font-semibold">
                        Upload your camera-ready paper
                    </h4>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        Click this area to select the final document from your
                        device.
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <span className="border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                            PDF
                        </span>

                        <span className="border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                            Max 5 MB
                        </span>
                    </div>

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
                <div className="flex items-center gap-4 border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white">
                        <LuFileCheck2 className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                            {formData.paperFile.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            {(
                                formData.paperFile.size /
                                1024 /
                                1024
                            ).toFixed(2)}{" "}
                            MB
                        </p>
                    </div>

                    <span className="hidden text-xs font-semibold text-emerald-700 tablet:block">
                        File selected
                    </span>
                </div>
            )}

            {formTouched.paperFile &&
                formErrors.paperFile && (
                    <div className="border border-red-200 bg-red-50 p-4">
                        <p className="text-sm font-medium text-red-700">
                            {formErrors.paperFile}
                        </p>
                    </div>
                )}

            <div className="border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                    <TbAlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                    <div>
                        <h4 className="text-sm font-semibold text-amber-900">
                            Before uploading
                        </h4>

                        <ul className="mt-3 space-y-2 text-xs leading-5 text-amber-800">
                            <li>
                                • Only PDF files are accepted.
                            </li>

                            <li>
                                • Maximum file size is{" "}
                                <strong>5 MB</strong>.
                            </li>

                            <li>
                                • Ensure this is the final camera-ready
                                version.
                            </li>

                            <li>
                                • The uploaded file should match the paper
                                title provided during registration.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}