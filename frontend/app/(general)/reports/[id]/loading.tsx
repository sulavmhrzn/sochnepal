// app/reports/[id]/loading.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Navigation */}
            <div className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/reports">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Reports
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Hero Section Skeleton */}
            <div className="bg-white">
                <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
                    <div className="space-y-6">
                        {/* Badges Skeleton */}
                        <div className="flex gap-3">
                            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-24" />
                            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-32" />
                        </div>

                        {/* Title Skeleton */}
                        <div className="space-y-3">
                            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
                            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
                        </div>

                        {/* Meta Information Skeleton */}
                        <div className="flex gap-6">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Skeleton */}
                        <Card>
                            <CardContent className="p-0">
                                <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg" />
                            </CardContent>
                        </Card>

                        {/* Description Skeleton */}
                        <Card>
                            <CardContent className="p-8">
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-6" />
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Location Skeleton */}
                        <Card>
                            <CardContent className="p-8">
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-24 mb-6" />
                                <div className="space-y-4">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                                    <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Action Buttons Skeleton */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="h-12 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-12 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-12 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Report Details Skeleton */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-4" />
                                <div className="space-y-4">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between"
                                        >
                                            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                                            <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Reporter Info Skeleton */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-28 mb-4" />
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                                        <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
