import { Report } from "@/lib/types";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { MapIcon, MapPin } from "lucide-react";

const ReportContent = ({ report }: { report: Report }) => {
    return (
        <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            {report.image && (
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="relative">
                            <Image
                                src={report.image}
                                alt={report.title}
                                width={600}
                                height={600}
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Description */}
            <Card>
                <CardContent className="p-8">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900">
                        Description
                    </h2>
                    <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                            {report.description}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Location */}
            <Card>
                <CardContent className="p-8">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900">
                        Location
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                            <div>
                                <p className="font-medium text-gray-900">
                                    {report.address}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Coordinates: {report.location_lat}°,{" "}
                                    {report.location_lng}°
                                </p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border border-gray-200">
                            <div className="text-center">
                                <MapIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">
                                    Interactive Map
                                </p>
                                <p className="text-sm text-gray-400">
                                    Coming Soon
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReportContent;
