"use client";

import {
    MapPin,
    Calendar,
    Clock,
    AlertTriangle,
    CheckCircle,
    Eye,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Report } from "@/lib/types";

const ReportCard = ({ report }: { report: Report }) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case "pending":
                return {
                    label: "Pending",
                    variant: "secondary" as const,
                    icon: Clock,
                    color: "text-gray-600",
                };
            case "in_progress":
                return {
                    label: "In Progress",
                    variant: "default" as const,
                    icon: AlertTriangle,
                    color: "text-blue-600",
                };
            case "resolved":
                return {
                    label: "Resolved",
                    variant: "default" as const,
                    icon: CheckCircle,
                    color: "text-green-600",
                };
            default:
                return {
                    label: status,
                    variant: "secondary" as const,
                    icon: Clock,
                    color: "text-gray-600",
                };
        }
    };
    const statusConfig = getStatusConfig(report.status);
    const StatusIcon = statusConfig.icon;

    return (
        <Card
            key={report.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
            <div className="aspect-video bg-gray-200 relative">
                <Image
                    src={report.image || "/images/cleaning-river.jpg"}
                    alt={report.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                    <Badge
                        variant={statusConfig.variant}
                        className={`${statusConfig.color} bg-white/90 backdrop-blur-sm`}
                    >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4">
                <div className="space-y-3">
                    <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                            {report.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span className="line-clamp-1">
                                {report.address}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(report.created_at).toLocaleDateString()}
                        </div>
                        <Badge variant="outline" className="text-xs">
                            {report.category.name}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-gray-600">
                            👍 {Math.round(Math.random() * 100)} votes
                        </span>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/reports/${report.id}`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportCard;
