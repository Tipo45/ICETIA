
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { LuEye, LuEyeOff, LuLoader, LuLockKeyhole, LuShieldCheck } from "react-icons/lu";


export default function AcceptInvitationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    const { signIn } = useAuthActions();

    const invitation = useQuery(
        api.admin.getInvitation,
        token ? { token } : "skip"
    );

    const acceptInvitation = useMutation(
        api.admin.acceptInvitation
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignUp = async () => {

        if (!token || !invitation?.valid) {
            toast.error("This invitation is invalid or has expired.");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        try {

            if (!invitation.email) {
                throw new Error("Email is required.")
            }
            // Create the Convex Auth password account.
            const formData = new FormData();

            formData.set("email", invitation.email);
            formData.set("password", password);
            formData.set("flow", "signUp");
            formData.set("invitationToken", token);

            await signIn("password", formData);

        
            const result = await acceptInvitation({ token });

            toast.success("Your account has been created successfully!");

            if (result.role === "editor") {
                router.replace(`/admin/editor/${result.userId}`);
            } else {
                router.replace(`/admin/reviewer/${result.userId}`);
            }

            router.refresh();
        } catch (err) {
            const rawMessage =
                err instanceof Error ? err.message : "";

            const errorMessage =
                rawMessage.toLowerCase().includes("password") ||
                    rawMessage.toLowerCase().includes("credential")
                    ? "Invalid email or password."
                    : "Unable to sign in. Please check your credentials and try again.";

            toast.error(errorMessage);

        } finally {
            setIsSubmitting(false);

        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">
                        Invalid invitation link
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        No invitation token was provided.
                    </p>
                </div>
            </div>
        );
    }

    if (invitation === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LuLoader className="animate-spin" size={30} />
            </div>
        );
    }

    if (!invitation.valid) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">
                        Invitation unavailable
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        This invitation has expired, already been used, or is invalid.
                        Please contact the ICETIA administrator.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900 text-white">
                        <LuShieldCheck size={30} />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        ICETIA 2027
                    </h1>

                    <p className="text-sm text-muted-foreground mt-1">
                        Administrator Portal
                    </p>
                </div>

                <div className="rounded-2xl border bg-white dark:bg-slate-900 p-6 shadow-sm">

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">
                            Complete your account setup
                        </h2>

                        <p className="text-sm text-muted-foreground mt-2">
                            Welcome, {invitation.name}. Create a password
                            to activate your administrator account.
                        </p>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSignUp();
                    }} className="space-y-5">

                        <div>
                            <label className="text-sm font-medium">
                                Full name
                            </label>

                            <input
                                value={invitation.name}
                                disabled
                                className="mt-2 w-full rounded-lg border bg-slate-100 dark:bg-slate-800 px-3 py-3 text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Email address
                            </label>

                            <input
                                value={invitation.email}
                                disabled
                                className="mt-2 w-full rounded-lg border bg-slate-100 dark:bg-slate-800 px-3 py-3 text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Assigned role
                            </label>

                            <div className="mt-2 flex items-center justify-between rounded-lg border px-3 py-3">
                                <span className="capitalize font-medium">
                                    {invitation.role}
                                </span>

                                <span className="text-xs rounded-full bg-blue-100 text-blue-800 px-3 py-1">
                                    Invited role
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Create password
                            </label>

                            <div className="relative mt-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full rounded-lg border px-3 py-3 pr-11 text-sm bg-transparent"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Confirm password
                            </label>

                            <div className="relative mt-2">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    required
                                    disabled={isSubmitting}
                                    className="w-full rounded-lg border px-3 py-3 pr-11 text-sm bg-transparent"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showConfirmPassword ? (
                                        <LuEyeOff size={18} />
                                    ) : (
                                        <LuEye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-3">
                            <div className="flex gap-2">
                                <LuLockKeyhole
                                    size={17}
                                    className="text-blue-700 dark:text-blue-400 shrink-0 mt-0.5"
                                />

                                <p className="text-xs text-blue-800 dark:text-blue-300">
                                    Your password will be securely stored by Convex Auth.
                                    Do not share your password with anyone.
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <LuLoader size={18} className="animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Activate account"
                            )}
                        </button>

                    </form>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    International Conference on Emerging Technologies,
                    Innovations & Applications
                </p>

            </div>
        </div>
    );
}
