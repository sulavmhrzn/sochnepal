import { MapPin, Users, CheckCircle, AlertTriangle } from "lucide-react";
import CountUp from "../ui/CountUp";

const StatsSection = () => {
    const stats = [
        { icon: MapPin, label: "Reports Filed", value: 1247 },
        { icon: CheckCircle, label: "Issues Resolved", value: 892 },
        { icon: Users, label: "Active Citizens", value: 3456 },
        { icon: AlertTriangle, label: "Pending Issues", value: 355 },
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 text-center shadow-sm border"
                        >
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                                <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <p className="mt-4 text-2xl font-bold text-gray-900">
                                <CountUp
                                    from={0}
                                    to={stat.value}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text"
                                />
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatsSection;
