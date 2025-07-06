// app/verify-email-notice/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useResendVerificationEmail } from "@/hooks/use-resend-verification-email-";

const VerifyEmailNoticePage = () => {
    const { user } = useAuthStore();

    const { mutate, status } = useResendVerificationEmail();
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Verify Your Email
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">
                            We&apos;ve sent a verification email to:
                        </p>
                        <p className="font-semibold text-gray-900 mb-4">
                            {user?.email}
                        </p>
                        <p className="text-sm text-gray-500">
                            Please click the verification link in the email to
                            activate your account.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={() => mutate()}
                            disabled={status === "pending"}
                            className="w-full"
                            variant="outline"
                        >
                            {status === "pending" ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Resend Verification Email
                                </>
                            )}
                        </Button>

                        <Button variant="ghost" asChild className="w-full">
                            <Link href="/login">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Login
                            </Link>
                        </Button>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            Didn&apos;t receive the email? Check your spam
                            folder or try resending.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default VerifyEmailNoticePage;
