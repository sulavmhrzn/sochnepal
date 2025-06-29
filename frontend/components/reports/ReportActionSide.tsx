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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { toast } from "sonner";
import ReportIssue from "./ReportIssue";

const ReportActionSide = ({ report }: { report: Report }) => {
    const { isAuthenticated } = useAuthStore();
    const queryClient = useQueryClient();
    const { mutate, status } = useMutation({
        mutationFn: async (id: number) => {
            await customAxios.post("/reports/upvotes/", {
                report: id,
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["report"],
            });
        },
        onError() {
            toast.error("Failed to up vote the report. Please try again");
        },
    });
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
                            <Button
                                variant={
                                    report.up_voted ? "default" : "outline"
                                }
                                className="w-full h-12 text-lg"
                                size="lg"
                                disabled={
                                    !isAuthenticated || status === "pending"
                                }
                                onClick={() => mutate(report.id)}
                            >
                                <ArrowUpIcon
                                    className={`size-5 mr-3 ${
                                        report.up_voted ? "fill-current" : ""
                                    }`}
                                />
                                {report.up_voted ? "Upvoted" : "Upvote"} (
                                {report.up_votes})
                            </Button>
                            <ReportIssue reportId={report.id} />
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
