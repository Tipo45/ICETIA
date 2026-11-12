"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    LuArrowLeft,
    LuArrowRight,
    LuShieldCheck,
} from "react-icons/lu"
import { MdOutlineEmail } from "react-icons/md"
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner"
import { useAuthActions } from "@convex-dev/auth/react"
import { useRouter } from "next/navigation"
import { TbLockPassword } from "react-icons/tb"



export default function ReviewerLoginPage() {

    const { signIn } = useAuthActions();
    const [step, setStep] = useState<"signUp" | "signIn">("signIn");
    const convex = useConvex();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const router = useRouter();

    const validateEmail = (email: string): string | null => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            return "Email is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            return "Please enter a valid email address";
        }

        return null;
    };

    const validatePassword = (password: string): string | null => {
        if (!password) {
            return "Password is required";
        } else if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        else {
            return "";
        }
    }

    const handleEmailChange = (value: string) => {
        setEmail(value);

        if (emailTouched) {
            const error = validateEmail(value);
            setEmailError(error || "");
        }
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);

        if (passwordTouched) {
            const error = validatePassword(value);
            setPasswordError(error || "");
        }
    };

    const isFormValid = () => {
        return (
            !validateEmail(email) &&
            !validatePassword(password)
        )
    }

    const handleLogin = async () => {
        const emailValidationError = validateEmail(email);
        const passwordValidationError = validatePassword(password);

        setMessage("");
        setEmailTouched(true);
        setEmailError(emailValidationError || "");
        setPasswordTouched(true);
        setPasswordError(passwordValidationError || "");

        if (emailValidationError || passwordValidationError) return;

        setIsSubmitting(true);

        try {
            const formData = new FormData();

            formData.set("email", email.trim());
            formData.set("password", password);
            formData.set("flow", "signIn");

            await signIn("password", formData);

            const editor = await convex.query(api.registration.getCurrentEditor);

            const editorId = editor?.id.slice(0, 10)

            toast.success("Login successful!");

            router.replace(`/admin/reviewer/admin-${editorId}`);
            router.refresh();
        } catch (err) {
            const rawMessage =
                err instanceof Error ? err.message : "";

            const errorMessage =
                rawMessage.toLowerCase().includes("password") ||
                    rawMessage.toLowerCase().includes("credential")
                    ? "Invalid email or password."
                    : "Unable to sign in. Please check your credentials and try again.";

            setMessage(errorMessage);
            setPasswordError(errorMessage);

            toast.error(errorMessage);

        } finally {
            setIsSubmitting(false);

        }
    };


    return (
        <main className="min-h-screen bg-[#07111f] text-white">
            <div className="relative flex min-h-screen overflow-hidden">

                {/* Background accents */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/5 blur-3xl" />

                    <div className="absolute inset-0 opacity-[0.035]">
                        <div
                            className="h-full w-full"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                                backgroundSize: "48px 48px",
                            }}
                        />
                    </div>
                </div>

                {/* Left branding panel */}
                <section className="relative hidden flex-1 xl:flex">
                    <div className="flex w-full flex-col justify-between p-10 2xl:p-14">

                        {/* Brand */}
                        <div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3"
                            >
                                <div className="flex h-11 w-11 items-center justify-center border border-blue-400/30 bg-blue-500/10">
                                    <span className="text-lg font-bold tracking-tight text-blue-400">
                                        I
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold tracking-[0.18em]">
                                        ICETIA
                                    </p>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                                        International Conference
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Main message */}
                        <div className="max-w-2xl pb-10">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="h-px w-10 bg-blue-500" />
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                                    ICETIA 2027
                                </span>
                            </div>

                            <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight 2xl:text-6xl">
                                Emerging technologies.
                                <br />
                                <span className="text-blue-400">
                                    Advancing possibilities.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 2xl:text-base">
                                Administrative access for the International
                                Conference on Emerging Technologies, Innovations
                                and Applications.
                            </p>

                            {/* Theme */}
                            <div className="mt-10 border-l border-blue-500/50 pl-5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                                    Conference Theme
                                </p>

                                <p className="mt-2 max-w-lg text-sm font-medium leading-6 text-white/80">
                                    Emerging Technologies, Innovations &
                                    Applications: Advancing Research,
                                    Industry & Society
                                </p>
                            </div>
                        </div>

                        {/* Footer information */}
                        <div className="flex items-end justify-between border-t border-white/10 pt-5">
                            <div>
                                <p className="text-xs font-medium text-white/70">
                                    28–30 April 2027
                                </p>
                                <p className="mt-1 text-[11px] text-white/35">
                                    Federal University Otuoke, Nigeria
                                </p>
                            </div>

                            <p className="text-[10px] uppercase tracking-[0.16em] text-white/25">
                                Administration Portal
                            </p>
                        </div>
                    </div>
                </section>

                {/* Login side */}
                <section className="relative flex w-full items-center justify-center px-5 py-10 lg:px-8 xl:w-130 xl:shrink-0 xl:border-l xl:border-white/10 xl:bg-[#0a1625] 2xl:w-140">
                    <div className="w-full max-w-md">

                        {/* Mobile brand */}
                        <div className="mb-10 xl:hidden">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3"
                            >
                                <div className="flex h-10 w-10 items-center justify-center border border-blue-400/30 bg-blue-500/10">
                                    <span className="font-bold text-blue-400">
                                        I
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold tracking-[0.18em]">
                                        ICETIA 2027
                                    </p>
                                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/35">
                                        Admin Portal
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Login heading */}
                        <div className="mb-8">
                            <div className="mb-5 inline-flex items-center gap-2 border border-blue-400/20 bg-blue-400/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                                <LuShieldCheck className="h-3.5 w-3.5" />
                                Secure Access
                            </div>

                            <h2 className="text-3xl font-semibold tracking-tight">
                                Welcome back
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-white/45">
                                Sign in to manage ICETIA 2027 registrations
                                and conference administration.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                            className="space-y-6"
                        >

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.12em] text-white/65"
                                >
                                    Email
                                </label>

                                <div className="relative flex items-center">
                                    <MdOutlineEmail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

                                    <Input
                                        id="email"
                                        value={email}
                                        onChange={(e) => {
                                            handleEmailChange(e.target.value);
                                            setMessage("");
                                            setEmailError("");
                                        }}
                                        onBlur={() => {
                                            setEmailTouched(true);
                                            setEmailError(validateEmail(email) || "");
                                        }}
                                        type="email"
                                        placeholder="johndoe@email.com"
                                        autoComplete="email"
                                        className={`h-12 rounded-none border-white/10 bg-white/[0.035] pl-11 text-sm text-white placeholder:text-white/25 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500/30 ${emailTouched && emailError ? 'border-red-500 focus:ring-red-500' : emailTouched && !emailError ? 'border-blue-500 focus:ring-blue-500' : ''}`}
                                    />

                                </div>
                                {emailTouched && emailError && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.12em] text-white/65"
                                >
                                    Password
                                </label>

                                <div className="relative flex items-center">
                                    <TbLockPassword className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

                                    <Input
                                        id="password"
                                        value={password}
                                        onChange={(e) => {
                                            handlePasswordChange(e.target.value);
                                            setMessage("");
                                            setPasswordError("");
                                        }}
                                        onBlur={() => {
                                            setPasswordTouched(true);
                                            setPasswordError(validatePassword(password) || "");
                                        }}
                                        type="password"
                                        placeholder="••••••••"
                                        className={`h-12 rounded-none border-white/10 bg-white/[0.035] pl-11 text-sm text-white placeholder:text-white/25 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500/30 ${passwordTouched && passwordError ? 'border-red-500 focus:ring-red-500' : passwordTouched && !passwordError ? 'border-blue-500 focus:ring-blue-500' : ''}`}
                                    />

                                </div>
                                {passwordTouched && passwordError && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {passwordError}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="group h-12 w-full rounded-none bg-blue-600 text-sm font-semibold text-white transition-all hover:bg-blue-500 flex items-center justify-center gap-2 px-4 py-3 tracking-[0.12em] uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                                disabled={!isFormValid() || isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : (<>Submit
                                    <LuArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
                            </Button>
                        </form>


                        {/* Security note */}
                        <div className="mt-8 border border-white/8 bg-white/2.5 p-4">
                            <div className="flex gap-3">
                                <LuShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                                <div>
                                    <p className="text-xs font-semibold text-white/70">
                                        Restricted access
                                    </p>

                                    <p className="mt-1 text-[11px] leading-5 text-white/35">
                                        This portal is intended for authorised
                                        ICETIA 2027 administrators and
                                        committee personnel only.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Back to website */}
                        <Link
                            href="/"
                            className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-white/35 transition-colors hover:text-white/70"
                        >
                            <LuArrowLeft className="h-3.5 w-3.5" />
                            Back to ICETIA 2027 website
                        </Link>

                    </div>
                </section>
            </div>
        </main>
    )
}