"use client";

import {
    FiBook,
    FiFileText,
    FiGlobe,
    FiMail,
    FiUser,
    FiUsers,
} from "react-icons/fi";

import {
    RegistrationFormData,
} from "../types/registration";

import {
    LuBuilding2,
    LuGraduationCap,
    LuBadgeCheck,
} from "react-icons/lu";

import {
    FaRegBuilding,
} from "react-icons/fa";

type Props = {
    formData: RegistrationFormData;
};

export default function ReviewStep({
    formData,
}: Props) {
    const paymentValue = 40000;

    return (
        <div className="space-y-7 px-6 py-7 lg:px-8 lg:py-8">
            <div className="border-b border-slate-200 pb-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center bg-slate-100">
                        <LuBadgeCheck className="h-4 w-4 text-blue-600" />
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Step 05
                        </p>

                        <h3 className="mt-1 text-lg font-semibold">
                            Review & submit
                        </h3>
                    </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                    Review the information below carefully before completing
                    your author registration.
                </p>
            </div>

            {/* Personal */}
            <ReviewSection
                icon={<FiUser />}
                title="Personal Information"
            >
                <ReviewRow
                    label="Full Name"
                    value={`${formData.firstName} ${formData.lastName}`}
                />

                <ReviewRow
                    label="Email Address"
                    value={formData.email}
                    icon={<FiMail />}
                />
            </ReviewSection>

            {/* Academic */}
            <ReviewSection
                icon={<LuBuilding2 />}
                title="Academic Information"
            >
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
                    icon={<LuGraduationCap />}
                />
            </ReviewSection>

            {/* Paper */}
            <ReviewSection
                icon={<FiBook />}
                title="Paper Information"
            >
                <ReviewRow
                    label="Paper Title"
                    value={formData.paperTitle}
                    icon={<FiFileText />}
                    stacked
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
                    icon={<FiFileText />}
                    stacked
                />
            </ReviewSection>

            {/* Co-authors */}
            <ReviewSection
                icon={<FiUsers />}
                title="Co-authors"
            >
                <div className="p-5">
                    {formData.coAuthors.length === 0 ? (
                        <p className="text-sm text-slate-500">
                            No co-authors added.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {formData.coAuthors.map(
                                (author, index) => (
                                    <div
                                        key={index}
                                        className="border border-slate-200 bg-slate-50"
                                    >
                                        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
                                            <div className="flex h-7 w-7 items-center justify-center bg-[#07111f] text-[10px] font-semibold text-white">
                                                {String(
                                                    index + 1
                                                ).padStart(2, "0")}
                                            </div>

                                            <p className="text-sm font-semibold">
                                                Co-author{" "}
                                                {index + 1}
                                            </p>
                                        </div>

                                        <div className="grid gap-4 p-4 tablet:grid-cols-2">
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
                                                value={
                                                    author.institution
                                                }
                                            />

                                            <Info
                                                title="Department"
                                                value={
                                                    author.department
                                                }
                                            />

                                            <Info
                                                title="Country"
                                                value={
                                                    author.country
                                                }
                                            />

                                            <Info
                                                title="Degree"
                                                value={
                                                    author.degree
                                                }
                                            />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </ReviewSection>

            {/* Payment summary */}
            <div className="bg-[#07111f] p-6 text-white lg:p-7">
                <div className="flex flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                            Registration Category
                        </p>

                        <h3 className="mt-2 text-2xl font-semibold">
                            Author
                        </h3>

                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                            Confirm the registration category and amount before
                            completing your registration.
                        </p>
                    </div>

                    <div className="tablet:text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Amount Payable
                        </p>

                        <p className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">
                            ₦ {(paymentValue - paymentValue *0.125).toLocaleString()} {" "}
                            <span className="text-slate-400 line-through">₦{paymentValue.toLocaleString()}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs leading-5 text-blue-800">
                    By completing registration, you are submitting the
                    information displayed above as your author registration
                    record.
                </p>
            </div>
        </div>
    );
}

function ReviewSection({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="overflow-hidden border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex h-8 w-8 items-center justify-center bg-white text-blue-600">
                    {icon}
                </div>

                <h4 className="text-sm font-semibold">
                    {title}
                </h4>
            </div>

            <div className="divide-y divide-slate-200">
                {children}
            </div>
        </section>
    );
}

function ReviewRow({
    label,
    value,
    icon,
    stacked = false,
}: {
    label: string;
    value: React.ReactNode;
    icon?: React.ReactNode;
    stacked?: boolean;
}) {
    return (
        <div
            className={`flex gap-4 px-5 py-4 ${
                stacked
                    ? "flex-col"
                    : "flex-col tablet:flex-row tablet:items-center tablet:justify-between"
            }`}
        >
            <div className="flex items-center gap-2 text-slate-500">
                {icon}
                <span className="text-xs font-medium">
                    {label}
                </span>
            </div>

            <div
                className={`text-sm font-semibold text-slate-900 ${
                    stacked
                        ? "wrap-break-word"
                        : "tablet:text-right"
                }`}
            >
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {title}
            </p>

            <p className="mt-1 wrap-break-word text-sm font-medium text-slate-900">
                {value || "-"}
            </p>
        </div>
    );
}