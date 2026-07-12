"use client";

import {
    FiBook,
    FiFileText,
    FiGlobe,
    FiMail,
    FiUser,
    FiUsers,
} from "react-icons/fi";
import { RegistrationFormData } from "../types/registration";
import { LuBuilding2, LuGraduationCap } from "react-icons/lu";
import { FaRegBuilding } from "react-icons/fa";

type Props = {
    formData: RegistrationFormData;
};

export default function ReviewStep({ formData }: Props) {
    return (
        <div className="space-y-8 px-8 py-6">

            <div>
                <h2 className="text-2xl font-bold text-slate-900">
                    Review Your Registration
                </h2>

                <p className="text-slate-500 mt-1">
                    Please verify that all the information below is correct before
                    proceeding to payment.
                </p>
            </div>

            {/* Personal Information */}

            <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 flex items-center gap-3">
                    <FiUser className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-slate-900">
                        Personal Information
                    </h3>
                </div>

                <div className="divide-y">

                    <ReviewRow
                        label="Full Name"
                        value={`${formData.firstName} ${formData.lastName}`}
                    />

                    <ReviewRow
                        label="Email Address"
                        value={formData.email}
                        icon={<FiMail />}
                    />

                </div>
            </div>

            {/* Academic Information */}

            <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 flex items-center gap-3">
                    <LuBuilding2 className="text-blue-600 w-5 h-5" />
                    <h3 className="font-semibold">
                        Academic Information
                    </h3>
                </div>

                <div className="divide-y">

                    <ReviewRow
                        label="Institution"
                        value={formData.institution}
                        icon={<LuBuilding2 />}
                    />

                    <ReviewRow
                        label="Department"
                        value={formData.department}
                        icon={<FaRegBuilding />}
                    />

                    <ReviewRow
                        label="Country"
                        value={formData.country}
                        icon={<FiGlobe />}
                    />

                    <ReviewRow
                        label="Degree"
                        value={formData.degree}
                        icon={<LuGraduationCap className="w-4 h-4" />}
                    />

                    <ReviewRow
                        label="Uploaded Paper"
                        value={
                            formData.paperFile
                                ? `${formData.paperFile.name} (${(
                                    formData.paperFile.size /
                                    1024 /
                                    1024
                                ).toFixed(2)} MB)`
                                : "No file uploaded"
                        }
                        icon={<FiFileText className="w-5 h-5" />}
                    />

                </div>
            </div>

            {/* Paper */}

            <div className="rounded-2xl border border-slate-200 overflow-hidden">

                <div className="bg-blue-50 px-6 py-4 flex items-center gap-3">
                    <FiBook className="text-blue-600" />
                    <h3 className="font-semibold">
                        Paper Information
                    </h3>
                </div>

                <div className="divide-y">

                    <ReviewRow
                        label="Paper Title"
                        value={formData.paperTitle}
                        icon={<FiFileText />}
                    />

                    {/* Uncomment when implemented */}

                    {/*

                    <ReviewRow
                        label="Conference Track"
                        value={formData.track}
                    />

                    <ReviewRow
                        label="Keywords"
                        value={formData.keywords.join(", ")}
                    />

                    */}

                </div>
            </div>

            {/* Co-authors */}

            <div className="rounded-2xl border border-slate-200 overflow-hidden">

                <div className="bg-blue-50 px-6 py-4 flex items-center gap-3">
                    <FiUsers className="text-blue-600" />
                    <h3 className="font-semibold">
                        Co-authors
                    </h3>
                </div>

                <div className="p-6">

                    {formData.coAuthors.length === 0 ? (
                        <p className="text-slate-500">
                            No co-authors added.
                        </p>
                    ) : (
                        <div className="space-y-4">

                            {formData.coAuthors.map((author, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border border-slate-200 p-5 bg-slate-50"
                                >
                                    <div className="font-semibold text-blue-700 mb-3">
                                        Co-author {index + 1}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3 text-sm">

                                        <Info
                                            title="Full Name"
                                            value={`${author.firstName} ${author.lastName}`}
                                        />

                                        <Info
                                            title="Email"
                                            value={author.email}
                                        />

                                        <Info
                                            title="Institution"
                                            value={author.institution}
                                        />

                                        <Info
                                            title="Department"
                                            value={author.department}
                                        />

                                        <Info
                                            title="Country"
                                            value={author.country}
                                        />

                                        <Info
                                            title="Degree"
                                            value={author.degree}
                                        />

                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </div>

            {/* Payment */}

            <div className="rounded-2xl bg-linear-to-r from-blue-600 to-blue-700 text-white p-8">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-blue-100">
                            Registration Category
                        </p>

                        <h3 className="text-2xl font-bold">
                            Author
                        </h3>

                    </div>

                    <div className="text-right">

                        <p className="text-blue-100">
                            Amount Payable
                        </p>

                        <h2 className="text-4xl font-bold">
                            ₦30,000
                        </h2>

                    </div>

                </div>

            </div>

        </div>
    );
}

function ReviewRow({
    label,
    value,
    icon,
}: {
    label: string;
    value: React.ReactNode;
    icon?: React.ReactNode;
}) {
    return (
        <div className="flex justify-between items-center px-6 py-4">

            <div className="flex items-center gap-2 text-slate-600">
                {icon}
                <span>{label}</span>
            </div>

            <div className="font-semibold text-slate-900 text-right">
                {value || "-"}
            </div>

        </div>
    );
}

function Info({
    title,
    value,
}: {
    title: string;
    value: React.ReactNode;
}) {
    return (
        <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
                {title}
            </p>

            <p className="font-medium text-slate-900 mt-1">
                {value || "-"}
            </p>

        </div>
    );
}