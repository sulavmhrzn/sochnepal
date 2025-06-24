"use client";
import { customAxios } from "@/lib/customAxios";
import { Report } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    FileText,
    Plus,
    Search,
    Calendar,
    MapPin,
    Eye,
    Edit3,
    Trash2,
    TrendingUp,
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatDateTime, getStatusConfig } from "@/lib/utils";
import ReportSkeleton from "@/components/dashboard/my-reports/ReportSkeleton";
import { toast } from "sonner";

const MyReportsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const queryClient = useQueryClient();
    const {
        data: reports,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["my-reports", selectedStatus],
        queryFn: async () => {
            const response = await customAxios.get("/reports/my", {
                params: {
                    status:
                        selectedStatus !== "all" ? selectedStatus : undefined,
                },
            });
            return response.data as Report[];
        },
    });
    const { mutate: deleteMutate, status: deleteStatus } = useMutation({
        mutationFn: async (id: number) => {
            await customAxios.delete(`/reports/${id}/`);
        },
        onSuccess: () => {
            toast.success("Your report has been deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["my-reports"],
            });
        },
        onError() {
            toast.error("Could not delete your report at the moment");
        },
    });

    const filteredReports = reports?.filter((report) => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    // Calculate stats
    const stats = reports
        ? {
              total: reports.length,
              pending: reports.filter((r) => r.status === "pending").length,
              inProgress: reports.filter((r) => r.status === "in_progress")
                  .length,
              resolved: reports.filter((r) => r.status === "resolved").length,
          }
        : { total: 0, pending: 0, inProgress: 0, resolved: 0 };

    if (isLoading) <ReportSkeleton />;

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-16">
                        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Failed to load reports
                        </h2>
                        <p className="text-gray-600 mb-6">
                            There was an error loading your reports. Please try
                            again.
                        </p>
                        <Button onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            My Reports
                        </h1>
                        <p className="text-gray-600">
                            Track and manage your submitted civic reports
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/reports/submit">
                            <Plus className="h-4 w-4 mr-2" />
                            Submit New Report
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Total Reports
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats.total}
                                    </p>
                                </div>
                                <FileText className="h-8 w-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Pending
                                    </p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {stats.pending}
                                    </p>
                                </div>
                                <Clock className="h-8 w-8 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        In Progress
                                    </p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {stats.inProgress}
                                    </p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Resolved
                                    </p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {stats.resolved}
                                    </p>
                                </div>
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search your reports..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>

                            {/* Status Filter */}
                            <select
                                value={selectedStatus}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Reports List */}
                {filteredReports?.length === 0 ? (
                    <Card>
                        <CardContent className="p-12">
                            <div className="text-center">
                                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {reports?.length === 0
                                        ? "No reports yet"
                                        : "No matching reports"}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {reports?.length === 0
                                        ? "Start making a difference by submitting your first civic report."
                                        : "Try adjusting your search or filter criteria."}
                                </p>
                                {reports?.length === 0 && (
                                    <Button asChild>
                                        <Link href="/reports/submit">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Submit Your First Report
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {filteredReports?.map((report) => {
                            const statusConfig = getStatusConfig(report.status);

                            return (
                                <Card
                                    key={report.id}
                                    className="hover:shadow-md transition-shadow"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                            {/* Left: Report Info */}
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex items-start gap-4">
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                            {report.title}
                                                        </h3>
                                                        <Badge
                                                            className={
                                                                statusConfig.className
                                                            }
                                                            variant="outline"
                                                        >
                                                            {statusConfig.label}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-gray-600 line-clamp-2 mb-3">
                                                        {report.description}
                                                    </p>
                                                </div>

                                                {/* Meta Info */}
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>
                                                            {report.address}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>
                                                            {formatDateTime(
                                                                report.created_at
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Badge
                                                            variant="outline"
                                                            style={{
                                                                borderColor:
                                                                    report
                                                                        .category
                                                                        .color,
                                                                color: report
                                                                    .category
                                                                    .color,
                                                                backgroundColor: `${report.category.color}10`,
                                                            }}
                                                        >
                                                            {
                                                                report.category
                                                                    .name
                                                            }
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: Actions */}
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/reports/${report.id}`}
                                                    >
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Edit3 className="h-4 w-4 mr-2" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700"
                                                    onClick={() => {
                                                        deleteMutate(report.id);
                                                    }}
                                                    disabled={
                                                        deleteStatus ===
                                                        "pending"
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReportsPage;
