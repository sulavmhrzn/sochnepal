import { Badge } from "@/components/ui/badge";

const ContactHero = () => {
    return (
        <div className="bg-gradient-to-br from-orange-50 to-indigo-100">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="text-center">
                    <Badge
                        variant="outline"
                        className="px-4 py-2 border-primary text-sm font-medium mb-6"
                    >
                        📞 Get In Touch
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        We&apos;re Here to{" "}
                        <span className="text-primary">Help</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                        Have questions about SochNepal? Need help reporting an
                        issue? Want to collaborate with us? We&apos;d love to
                        hear from you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactHero;
