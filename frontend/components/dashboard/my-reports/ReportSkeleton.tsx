const ReportSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="animate-pulse space-y-6">
                    {/* Header skeleton */}
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>

                    {/* Stats skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-24 bg-gray-200 rounded-lg"
                            ></div>
                        ))}
                    </div>

                    {/* Reports skeleton */}
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-32 bg-gray-200 rounded-lg"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportSkeleton;
