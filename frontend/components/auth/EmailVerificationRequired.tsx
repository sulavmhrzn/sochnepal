"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Shield, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useResendVerificationEmail } from "@/hooks/use-resend-verification-email-";
import { useEffect, useState } from "react";

const EmailVerificationRequired = ({
    action = "submit reports",
    title = "Email Verification Required",
}: {
    action?: string;
    title?: string;
}) => {
    const { user } = useAuthStore();
    const [emailSent, setEmailSent] = useState(false);
    const { mutate, status } = useResendVerificationEmail();
    useEffect(() => {
        if (status === "success") setEmailSent(true);
    }, [status]);
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="h-8 w-8 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert className="border-blue-200 bg-blue-50">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                            To {action} and ensure account security, please
                            verify your email address first.
                        </AlertDescription>
                    </Alert>

                    {!emailSent && (
                        <div className="text-center space-y-4">
                            <p className="text-gray-600">
                                We&apos;ll send a verification email to:
                            </p>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-semibold text-gray-900 break-all">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    )}

                    {emailSent && (
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                New verification email sent! Please check your
                                inbox and spam folder.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-3">
                        <Button
                            onClick={() => mutate()}
                            disabled={status === "pending"}
                            className="w-full"
                            variant={
                                status === "success" ? "outline" : "default"
                            }
                        >
                            {status === "pending" ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Sending Email...
                                </>
                            ) : (
                                <>
                                    <Mail className="h-4 w-4 mr-2" />
                                    {status === "success"
                                        ? "Send Another Email"
                                        : "Send Verification Email"}
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-800 mb-2">
                            Next steps:
                        </h4>
                        <ol className="text-sm text-yellow-700 space-y-1">
                            <li>1. Check your email inbox (and spam folder)</li>
                            <li>2. Click the verification link</li>
                            <li>
                                3. Return here to continue{" "}
                                {action.replace("submit ", "submitting ")}
                            </li>
                        </ol>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            This verification helps keep our community safe and
                            ensures you receive important updates about your
                            reports.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmailVerificationRequired;
