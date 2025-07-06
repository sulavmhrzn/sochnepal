"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";

const VerifyEmailPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<
        "loading" | "success" | "error" | "expired"
    >("loading");

    const token = searchParams.get("token");
    const uid = searchParams.get("uid");

    const verifyMutation = useMutation({
        mutationFn: async ({ token, uid }: { token: string; uid: string }) => {
            const response = await customAxios.post("/accounts/email/verify/", {
                token,
                uid,
            });
            return response.data;
        },
        onSuccess: () => {
            setStatus("success");
            toast.success(
                "Email verified successfully! You can now access all features."
            );

            setTimeout(() => {
                router.push("/dashboard");
            }, 3000);
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    setStatus("expired");
                }
            } else {
                setStatus("error");
            }
            toast.error("Email verification failed. Please try again.");
        },
    });

    useEffect(() => {
        if (!token || !uid) {
            setStatus("error");
            return;
        }

        verifyMutation.mutate({ token, uid });
    }, [token, uid]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Email Verification
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {status === "loading" && (
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Verifying your email...
                                </h3>
                                <p className="text-gray-600">
                                    Please wait while we verify your email
                                    address.
                                </p>
                            </div>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Email verified successfully!
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Your account is now activated. You&apos;ll
                                    be redirected to your dashboard shortly.
                                </p>
                                <Button asChild className="w-full">
                                    <Link href="/dashboard">Back to Login</Link>
                                </Button>
                            </div>
                        </div>
                    )}

                    {status === "expired" && (
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                                <Mail className="h-8 w-8 text-yellow-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Verification link expired
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    This verification link has expired. Please
                                    login and navigate to your account settings
                                    to resend an email verification
                                </p>
                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        asChild
                                        className="w-full"
                                    >
                                        <Link href="/login">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Back to Login
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <XCircle className="h-8 w-8 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Verification failed
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    We couldn&apos;t verify your email address.
                                    The link may be invalid or expired.
                                </p>
                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        asChild
                                        className="w-full"
                                    >
                                        <Link href="/login">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Back to Login
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default VerifyEmailPage;
