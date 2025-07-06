// app/(general)/reports/submit/page.tsx
"use client";

import { useAuthStore } from "@/store/authStore";
import SubmitReportHeader from "@/components/reports/SubmitReportHeader";
import EmailVerificationRequired from "@/components/auth/EmailVerificationRequired";
import dynamic from "next/dynamic";

const SubmitReportForm = dynamic(
    () => import("@/components/reports/SubmitReportForm"),
    { ssr: false }
);

const SubmitReport = () => {
    const { user } = useAuthStore();

    // Show verification required if email not verified
    if (user && !user.is_verified) {
        return (
            <div>
                <SubmitReportHeader />
                <EmailVerificationRequired
                    action="submit reports"
                    title="Verify Email to Submit Reports"
                />
            </div>
        );
    }

    return (
        <div>
            <SubmitReportHeader />
            <SubmitReportForm />
        </div>
    );
};

export default SubmitReport;
