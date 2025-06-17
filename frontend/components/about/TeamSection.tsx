const TeamSection = () => {
    const team = [
        {
            name: "Sulav Maharjan",
            role: "Founder & CEO",
            description:
                "Former civil engineer passionate about using tech for social good.",
        },
        {
            name: "Laxmi Maharjan",
            role: "Community Manager",
            description:
                "Dedicated to building bridges between citizens and local authorities.",
        },
        {
            name: "Sweta Lama",
            role: "Lead Developer",
            description:
                "Full-stack developer committed to creating user-friendly civic tools.",
        },
    ];

    return (
        <div className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Meet Our Team
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Passionate individuals working to make Nepal better
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 text-center shadow-sm"
                        >
                            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 mb-4"></div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {member.name}
                            </h3>
                            <p className="text-primary font-medium mb-2">
                                {member.role}
                            </p>
                            <p className="text-gray-600 text-sm">
                                {member.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
