import { Heart, Eye, Users, Lightbulb } from "lucide-react";

const OurValues = () => {
    const values = [
        {
            icon: Heart,
            title: "Community First",
            description:
                "We believe in the power of collective action and putting community needs at the center of everything we do.",
        },
        {
            icon: Eye,
            title: "Transparency",
            description:
                "Open data, clear processes, and honest communication build trust between citizens and authorities.",
        },
        {
            icon: Users,
            title: "Inclusivity",
            description:
                "Every voice matters. We strive to make our platform accessible to all citizens across Nepal.",
        },
        {
            icon: Lightbulb,
            title: "Innovation",
            description:
                "Using technology to solve real-world problems and make civic engagement more effective.",
        },
    ];

    return (
        <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Our Values
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        The principles that guide everything we do
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {values.map((value, index) => {
                        const IconComponent = value.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <IconComponent className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                                    {value.title}
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OurValues;
