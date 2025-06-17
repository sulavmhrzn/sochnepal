import { Badge } from "@/components/ui/badge";

const AboutHero = () => {
    return (
        <div className="bg-gradient-to-br from-orange-50 to-indigo-100">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="text-center">
                    <Badge
                        variant="outline"
                        className="px-4 py-2 border-primary text-sm font-medium mb-6"
                    >
                        🇳🇵 About SochNepal
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        Building Better Communities{" "}
                        <span className="text-primary">Together</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
                        SochNepal was born from a simple belief: when citizens
                        have the tools to report civic issues and hold
                        authorities accountable, communities become stronger,
                        cleaner, and more livable for everyone.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutHero;
