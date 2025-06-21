import { Report } from "@/lib/types";
import { Badge } from "../ui/badge";
import { Calendar, Flag, MapPin, User } from "lucide-react";
import { formatDate, getStatusConfig } from "@/lib/utils";

const ReportHeroSection = ({ report }: { report: Report }) => {
    const statusConfig = getStatusConfig(report.status);
    const StatusIcon = statusConfig.icon;

    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
                <div className="space-y-6">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge
                            className={statusConfig.className}
                            variant="outline"
                        >
                            <StatusIcon className="h-3 w-3 mr-2" />
                            {statusConfig.label}
                        </Badge>
                        <Badge
                            variant="outline"
                            style={{
                                borderColor: report.category.color,
                                color: report.category.color,
                                backgroundColor: `${report.category.color}10`,
                            }}
                        >
                            {report.category.name}
                        </Badge>
                        {report.is_flagged && (
                            <Badge variant="destructive">
                                <Flag className="h-3 w-3 mr-2" />
                                Flagged
                            </Badge>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                        {report.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            <span className="font-medium">
                                {report.address}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span>
                                Reported on {formatDate(report.created_at)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            <span>By {report.created_by.full_name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportHeroSection;
