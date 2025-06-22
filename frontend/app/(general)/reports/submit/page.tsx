"use client";
import SubmitReportHeader from "@/components/reports/SubmitReportHeader";
import dynamic from "next/dynamic";

const SubmitReportForm = dynamic(
    () => import("@/components/reports/SubmitReportForm"),
    { ssr: false }
);

const SubmitReport = () => {
    return (
        <div>
            <SubmitReportHeader />
            <SubmitReportForm />
        </div>
    );
};

export default SubmitReport;
