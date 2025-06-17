import { MapPin, Users, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
    const steps = [
        {
            icon: MapPin,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            title: "Report Issues",
            description:
                "Spot a civic issue? Take a photo, add location, and submit your report in minutes.",
        },
        {
            icon: Users,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            title: "Community Support",
            description:
                "Other citizens can upvote and comment on reports to show support and add more information.",
        },
        {
            icon: CheckCircle,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            title: "Track Progress",
            description:
                "Follow the status of your reports as authorities work to resolve the issues.",
        },
    ];

    return (
        <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        How SochNepal Works
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Making civic reporting simple and effective
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {steps.map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                            <div key={index} className="text-center">
                                <div
                                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${step.iconBg}`}
                                >
                                    <IconComponent
                                        className={`h-8 w-8 ${step.iconColor}`}
                                    />
                                </div>
                                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;
