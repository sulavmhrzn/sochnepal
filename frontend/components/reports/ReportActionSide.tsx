"use client";
import { ArrowUpIcon, Flag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui/card";
import { Report } from "@/lib/types";
import { useAuthStore } from "@/store/authStore";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import ReportIssue from "./ReportIssue";
import ReportUpVote from "./ReportUpVote";
import EmailVerificationRequired from "../auth/EmailVerificationRequired";

const ReportActionSide = ({ report }: { report: Report }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && !user?.is_verified) {
        return <EmailVerificationRequired action="upvote reports" />;
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="space-y-4">
                    {!isAuthenticated ? (
                        <>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-12 text-lg bg-secondary cursor-not-allowed"
                                        size="lg"
                                    >
                                        <ArrowUpIcon className="size-5 mr-3" />
                                        Upvote ({report.up_votes})
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>You must be logged in to upvote</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-12 text-lg bg-secondary cursor-not-allowed"
                                        size="lg"
                                    >
                                        <Flag className="size-5 mr-3" />
                                        Report Issue
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        You must be logged in to report an issue
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <ReportUpVote report={report} />
                            <ReportIssue report={report} />
                        </>
                    )}
                    <Button variant="outline" className="w-full h-12">
                        <Share2 className="h-5 w-5 mr-3" />
                        Share Report
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportActionSide;
