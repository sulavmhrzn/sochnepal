"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    Filter,
    AlertTriangle,
    Plus,
    FileText,
    CircleX,
} from "lucide-react";
import ReportCardSkeleton from "@/components/reports/ReportCardSkeleton";
import ReportCard from "@/components/reports/ReportCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCategories } from "@/hooks/use-categories";
import { useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useReports } from "@/hooks/use-reports";

const ReportsPage = () => {
    const params = useSearchParams();
    const currentPage = params.get("page") || 1;
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const {
        data: reports,
        isError,
        isLoading,
        refetch,
    } = useReports({
        selectedStatus: selectedStatus,
        selectedCategory: selectedCategory,
        currentPage: +currentPage,
        searchQuery,
    });

    const { data: categories, isLoading: categoriesLoading } = useCategories();
    useEffect(() => {
        const timeout = setTimeout(() => {
            refetch();
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchQuery, refetch]);

    const hasFilters =
        searchQuery || selectedStatus !== "all" || selectedCategory !== "all";
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Community Reports
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Track civic issues reported by citizens across Nepal
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-3">
                <div className="bg-white rounded-lg border p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search reports by title or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Status Filter */}
                        <Select
                            value={selectedStatus}
                            onValueChange={setSelectedStatus}
                            disabled={categoriesLoading}
                        >
                            <SelectTrigger className="w-full sm:w-48">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">
                                    In Progress
                                </SelectItem>
                                <SelectItem value="resolved">
                                    Resolved
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Category Filter */}
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="w-full sm:w-48">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                {categories?.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.slug}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        category.color,
                                                }}
                                            />
                                            <span className="capitalize">
                                                {category.name.toLowerCase()}
                                            </span>
                                            <span>
                                                {" "}
                                                - {category.name_nepali}
                                            </span>

                                            <span className="text-xs text-gray-500">
                                                ({category.report_count})
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {hasFilters && (
                    <div>
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                                setSelectedStatus("all");
                            }}
                        >
                            <CircleX /> Clear Filter
                        </Button>
                    </div>
                )}
            </div>

            {/* Reports Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <ReportCardSkeleton key={index} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-16">
                        <div className="mx-auto h-24 w-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <AlertTriangle className="h-12 w-12 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Unable to load reports
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            We&apos;re having trouble fetching the reports right
                            now. Please try again later.
                        </p>
                        <Button onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                ) : reports?.results.length === 0 && !hasFilters ? (
                    <div className="text-center py-16">
                        <div className="mx-auto h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <FileText className="h-12 w-12 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No reports yet
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Be the first to report a civic issue in your
                            community. Your voice can make a difference!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button asChild>
                                <Link href="/submit">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Submit First Report
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/dashboard">Go to Dashboard</Link>
                            </Button>
                        </div>
                    </div>
                ) : reports?.results.length === 0 && hasFilters ? (
                    <div className="text-center py-16">
                        <div className="mx-auto h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Search className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No reports match your filters
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Try adjusting your search terms or filters to find
                            what you&apos;re looking for.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedStatus("all");
                                    setSelectedCategory("all");
                                }}
                            >
                                Clear All Filters
                            </Button>
                            <Button asChild>
                                <Link href="/submit">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Submit New Report
                                </Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reports?.results.map((report) => (
                            <ReportCard report={report} key={report.id} />
                        ))}
                    </div>
                )}
            </div>
            {/* Minimalist Styled Pagination */}
            {reports && reports.results.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 pb-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-4">
                        {/* Results Summary */}
                        <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full border shadow-sm">
                            <span className="font-medium text-gray-900">
                                {reports.results.length}
                            </span>{" "}
                            {reports.results.length === 1
                                ? "result"
                                : "results"}{" "}
                            on this page •{" "}
                            <span className="font-medium text-gray-900">
                                {reports.count}
                            </span>{" "}
                            total reports
                        </div>

                        {/* Pagination */}
                        <div className="bg-white rounded-full shadow-sm border p-2">
                            <Pagination>
                                <PaginationContent className="gap-1">
                                    <PaginationItem>
                                        {reports?.previous ? (
                                            <PaginationPrevious
                                                href={`?page=${
                                                    +currentPage - 1
                                                }`}
                                                className="rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            />
                                        ) : (
                                            <PaginationPrevious
                                                href="#"
                                                className="pointer-events-none opacity-40 rounded-full"
                                            />
                                        )}
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationLink
                                            href={`?page=${currentPage}`}
                                            isActive
                                            className="rounded-full bg-primary text-white min-w-[40px] h-10 font-semibold"
                                        >
                                            {currentPage}
                                        </PaginationLink>
                                    </PaginationItem>

                                    <PaginationItem>
                                        {reports?.next ? (
                                            <PaginationNext
                                                href={`?page=${
                                                    +currentPage + 1
                                                }`}
                                                className="rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            />
                                        ) : (
                                            <PaginationNext
                                                href="#"
                                                className="pointer-events-none opacity-40 rounded-full"
                                            />
                                        )}
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsPage;
