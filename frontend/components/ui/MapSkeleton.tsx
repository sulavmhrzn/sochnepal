import { MapIcon } from "lucide-react";

const MapSkeleton = () => {
    return (
        <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 flex items-center justify-center relative overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    animation: "shimmer 2s ease-in-out infinite",
                }}
            />

            <div className="text-center z-10">
                <div className="relative mb-4">
                    <MapIcon className="h-16 w-16 text-blue-300 mx-auto animate-pulse" />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0ms" }}
                        />
                        <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                            style={{ animationDelay: "200ms" }}
                        />
                        <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                            style={{ animationDelay: "400ms" }}
                        />
                    </div>
                    <p className="text-gray-500 font-medium">Loading map</p>
                    <p className="text-sm text-gray-400">
                        Fetching location data...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MapSkeleton;
