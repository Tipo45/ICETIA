"use client";

import Link from "next/link";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { IoHomeOutline, IoMailOutline } from "react-icons/io5";
import { LuTicketPercent } from "react-icons/lu";

export default function RegistrationSuccessPage() {
    return (
        <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 p-10">

                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                        <FaRegCheckCircle className="h-14 w-14 text-green-600" />
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mt-6">
                    <h1 className="text-4xl font-bold text-slate-900">
                        Registration Successful!
                    </h1>

                    <p className="mt-3 text-slate-600 text-lg leading-relaxed">
                        Thank you for registering for
                        <span className="font-semibold text-blue-700">
                            {" "}ICETIA 2027
                        </span>.
                    </p>
                </div>

                {/* Information */}
                <div className="mt-10 space-y-5">

                    <div className="flex gap-4 rounded-xl bg-blue-50 p-5">
                        <IoMailOutline className="text-blue-700 h-6 w-6 mt-1" />
                        <div>
                            <h3 className="font-semibold text-slate-900">
                                Confirmation Email
                            </h3>
                            <p className="text-sm text-slate-600">
                                We've sent a confirmation email containing your
                                registration details.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 rounded-xl bg-amber-50 p-5">
                        <FaRegClock className="text-amber-600 h-6 w-6 mt-1" />
                        <div>
                            <h3 className="font-semibold text-slate-900">
                                Ticket Processing
                            </h3>
                            <p className="text-sm text-slate-600">
                                Your conference ticket is being generated and
                                will be emailed to you in approximately
                                <span className="font-semibold">
                                    {" "}2 minutes.
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 rounded-xl bg-green-50 p-5">
                        <LuTicketPercent className="text-green-600 h-6 w-6 mt-1" />
                        <div>
                            <h3 className="font-semibold text-slate-900">
                                Keep Your Ticket Safe
                            </h3>
                            <p className="text-sm text-slate-600">
                                You'll need your ticket during conference
                                check-in. Please keep it for future reference.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Notice */}
                <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-5">
                    <p className="text-sm text-yellow-800">
                        <strong>Didn't receive the email?</strong>
                        <br />
                        Please check your Spam or Junk folder. If you still
                        don't receive it after a few minutes, contact the
                        conference support team.
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex flex-col lg:flex-row gap-4">

                    <Link
                        href="/"
                        className="flex-1 rounded-xl bg-blue-700 hover:bg-blue-800 text-white py-3 font-semibold flex items-center justify-center gap-2 transition"
                    >
                        <IoHomeOutline className="h-5 w-5" />
                        Return Home
                    </Link>

                    <Link
                        href="/contact"
                        className="flex-1 rounded-xl border border-slate-300 hover:bg-slate-100 py-3 font-semibold text-slate-700 flex items-center justify-center transition"
                    >
                        Contact Support
                    </Link>

                </div>
            </div>
        </main>
    );
}