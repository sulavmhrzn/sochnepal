// components/comments/CommentSkeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CommentSkeleton = () => {
    return (
        <Card className="transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />

                    <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-4 w-24" /> {/* Name */}
                                <Skeleton className="h-3 w-1 rounded-full" />{" "}
                                <Skeleton className="h-3 w-16" /> {/* Time */}
                            </div>
                            <Skeleton className="h-8 w-8 rounded" />{" "}
                        </div>

                        <div className="flex items-center space-x-1">
                            <Skeleton className="h-3 w-3" /> {/* User icon */}
                            <Skeleton className="h-3 w-32" /> {/* Email */}
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-3/5" />
                        </div>

                        <div className="flex items-center space-x-4 pt-2 border-t border-gray-100">
                            <Skeleton className="h-6 w-12" /> {/* Reply */}
                            <Skeleton className="h-6 w-14" /> {/* Report */}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CommentSkeleton;
