import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutCta = () => {
    return (
        <div className="bg-primary">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">
                        Join Our Mission
                    </h2>
                    <p className="mt-4 text-lg text-blue-100">
                        Ready to help build better communities across Nepal?
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white text-primary hover:bg-gray-50"
                            asChild
                        >
                            <Link href="/reports/submit">
                                Report Your First Issue
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white hover:bg-gray-50 "
                            asChild
                        >
                            <Link href="/contact">Get In Touch</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutCta;
