import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="text-center">
                <div className="mb-6">
                    <Badge
                        variant="outline"
                        className="px-4 py-2 border-primary text-sm font-medium"
                    >
                        🇳🇵 Empowering Citizens Across Nepal
                    </Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    Report Civic Issues in{" "}
                    <span className="text-primary">Nepal</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                    SochNepal is a social accountability platform where citizens
                    can report civic issues like broken roads, garbage piles,
                    power outages, and more. Together, we can make our
                    communities better.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                        <Link href="/reports/submit">Report an Issue</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/reports">View Reports</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
