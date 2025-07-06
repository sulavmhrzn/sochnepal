"use client";
import { useParams } from "next/navigation";
import ReporterInfo from "@/components/reports/ReporterInfo";
import ReportDetailSide from "@/components/reports/ReportDetailSide";
import ReportActionSide from "@/components/reports/ReportActionSide";
import ReportHeroSection from "@/components/reports/ReportHeroSection";
import ReportContent from "@/components/reports/ReportContent";
import ReportNavigation from "@/components/reports/ReportNavigation";
import { useReport } from "@/hooks/use-reports";
import CommentsList from "@/components/comments/CommentsList";
import CommentAdd from "@/components/comments/CommentAdd";
import EmailVerificationRequired from "@/components/auth/EmailVerificationRequired";
import { useAuthStore } from "@/store/authStore";

const ReportDetailPage = () => {
    const params = useParams();
    const reportId = params.id as string;
    const { data: report } = useReport(+reportId);
    const { user } = useAuthStore();
    return (
        <div className="min-h-screen bg-gray-50">
            <ReportNavigation />
            <ReportHeroSection report={report} />
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ReportContent report={report} />
                    <div className="space-y-6">
                        <ReportActionSide report={report} />
                        <ReportDetailSide report={report} />
                        <ReporterInfo fullName={report.created_by.full_name} />
                    </div>
                </div>
                <div className="mt-4 space-y-4 bg-white border rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="font-semibold text-2xl text-gray-900">
                            Community Discussion
                        </h1>
                        <span className="text-sm text-gray-500">
                            Join the conversation about this civic issue
                        </span>
                    </div>
                    {!user?.is_verified ? (
                        <EmailVerificationRequired action="comment on a report" />
                    ) : (
                        <CommentAdd reportId={report.id} />
                    )}
                    <CommentsList reportId={report.id} />
                </div>
            </div>
        </div>
    );
};

export default ReportDetailPage;
