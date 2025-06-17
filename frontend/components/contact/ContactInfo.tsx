import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactInfo = () => {
    const contactDetails = [
        {
            icon: Mail,
            title: "Email",
            details: ["hello@sochnepal.org", "support@sochnepal.org"],
            description: "Send us an email anytime",
        },
        {
            icon: Phone,
            title: "Phone",
            details: ["+977-XXX-XXXX"],
            description: "Mon-Fri from 9am to 6pm",
        },
        {
            icon: MapPin,
            title: "Office",
            details: ["Kathmandu, Nepal"],
            description: "Come say hello at our office",
        },
        {
            icon: Clock,
            title: "Response Time",
            details: ["24-48 hours"],
            description: "We'll get back to you quickly",
        },
    ];

    return (
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Contact Information
                </h2>
                <div className="space-y-8">
                    {contactDetails.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-start space-x-4"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <IconComponent className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {item.title}
                                    </h3>
                                    <div className="mt-1">
                                        {item.details.map((detail, idx) => (
                                            <p
                                                key={idx}
                                                className="text-gray-600"
                                            >
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Follow Us
                    </h3>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-primary transition-colors"
                        >
                            <span className="sr-only">Facebook</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-primary transition-colors"
                        >
                            <span className="sr-only">Twitter</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-primary transition-colors"
                        >
                            <span className="sr-only">GitHub</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
