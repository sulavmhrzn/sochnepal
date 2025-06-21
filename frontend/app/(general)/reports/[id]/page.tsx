"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { useParams } from "next/navigation";
import ReporterInfo from "@/components/reports/ReporterInfo";
import ReportDetailSide from "@/components/reports/ReportDetailSide";
import ReportActionSide from "@/components/reports/ReportActionSide";
import { Report } from "@/lib/types";
import ReportHeroSection from "@/components/reports/ReportHeroSection";
import ReportContent from "@/components/reports/ReportContent";
import ReportNavigation from "@/components/reports/ReportNavigation";

const ReportDetailPage = () => {
    const params = useParams();
    const reportId = params.id as string;

    const { data: report } = useSuspenseQuery({
        queryKey: ["report", reportId],
        queryFn: async () => {
            const response = await customAxios.get(`/reports/${reportId}/`);
            return response.data as Report;
        },
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <ReportNavigation />
            <ReportHeroSection report={report} />
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ReportContent report={report} />
                    <div className="space-y-6">
                        <ReportActionSide id={report.id} />
                        <ReportDetailSide report={report} />
                        <ReporterInfo fullName={report.created_by.full_name} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailPage;
