import { Card, CardContent } from "@/components/ui/card";

const ReportCardSkeleton = () => {
    return (
        <Card className="overflow-hidden">
            {/* Image skeleton with status badge placeholder */}
            <div className="aspect-video bg-gray-200 animate-pulse relative">
                <div className="absolute top-3 right-3">
                    <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse" />
                </div>
            </div>

            <CardContent className="p-4">
                <div className="space-y-3">
                    {/* Title skeleton - 2 lines */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                    </div>

                    {/* Location with icon */}
                    <div className="flex items-center mt-1">
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mr-2 flex-shrink-0" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse flex-1" />
                    </div>

                    {/* Date and category row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mr-1" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
                        </div>
                        <div className="h-5 bg-gray-200 rounded-full animate-pulse w-24" />
                    </div>

                    {/* Votes and button row */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                        <div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportCardSkeleton;
