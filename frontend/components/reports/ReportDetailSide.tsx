import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Report } from "@/lib/types";
import { formatDateTime, getStatusConfig } from "@/lib/utils";

const ReportDetailSide = ({ report }: { report: Report }) => {
    const statusConfig = getStatusConfig(report.status);

    return (
        <Card>
            <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">
                    Report Details
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Report ID</span>
                        <span className="font-medium">#{report.id}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Category</span>
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
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Status</span>
                        <Badge
                            className={statusConfig.className}
                            variant="outline"
                        >
                            {statusConfig.label}
                        </Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Submitted</span>
                        <span className="font-medium text-sm">
                            {formatDateTime(report.created_at)}
                        </span>
                    </div>
                    {report.updated_at !== report.created_at && (
                        <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600">Last Updated</span>
                            <span className="font-medium text-sm">
                                {formatDateTime(report.updated_at)}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportDetailSide;
